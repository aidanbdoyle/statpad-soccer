#!/usr/bin/env python3
"""
fetch_wiki_photos.py

Queries the Wikipedia API to find photo URLs for PL players not already
covered by FPL photo codes or the hand-curated player_photos_extra.js.

Outputs: data/player_photos_wiki.js  (auto-generated, do not hand-edit)
Progress: data/wiki_photos_progress.json  (allows resuming interrupted runs)

Usage:
    python3 fetch_wiki_photos.py

Run time: ~45–90 minutes for a full pass (rate-limited to respect Wikipedia).
Re-running is safe — already-fetched players are skipped.
"""

import json
import re
import time
import unicodedata
import requests
import os

# ── Config ───────────────────────────────────────────────────────────────
MIN_APPS      = 50      # Only fetch players with this many career PL apps
REQUEST_DELAY = 0.5     # Seconds between Wikipedia API calls
PROGRESS_FILE = 'data/wiki_photos_progress.json'
OUTPUT_FILE   = 'data/player_photos_wiki.js'
HEADERS = {
    'User-Agent': 'StatpadSoccer/1.0 (https://statoftheday.app; hobby puzzle game) python-requests/2'
}
FOOTBALL_TERMS = [
    'footballer', 'football player', 'soccer', 'premier league',
    'midfielder', 'striker', 'goalkeeper', 'defender', 'forward',
    'association football', 'winger', 'centre-back', 'full-back'
]

# ── Name normalisation (mirrors game.js normName) ────────────────────────
def norm_name(name):
    name = name.replace('ø', 'o').replace('Ø', 'O')
    name = name.replace('æ', 'ae').replace('Æ', 'AE')
    name = name.replace('œ', 'oe').replace('Œ', 'OE')
    name = name.replace('ð', 'd').replace('Ð', 'D')
    name = name.replace('þ', 'th').replace('Þ', 'TH')
    name = name.replace('ß', 'ss')
    name = name.replace('ł', 'l').replace('Ł', 'L')
    name = name.replace('đ', 'd').replace('Đ', 'D')
    nfkd = unicodedata.normalize('NFD', name)
    stripped = ''.join(c for c in nfkd if unicodedata.category(c) != 'Mn')
    return stripped.lower().strip()

# ── Load already-covered player names ───────────────────────────────────
def load_fpl_covered():
    """Extract all name keys from photo_codes.js."""
    covered = set()
    try:
        with open('data/photo_codes.js', encoding='utf-8') as f:
            content = f.read()
        keys = re.findall(r'"([^"]+)"\s*:', content)
        for k in keys:
            covered.add(k.strip())
    except FileNotFoundError:
        print("Warning: photo_codes.js not found")
    return covered

def load_extra_covered():
    """Extract all name keys from player_photos_extra.js."""
    covered = set()
    try:
        with open('data/player_photos_extra.js', encoding='utf-8') as f:
            content = f.read()
        keys = re.findall(r"'([^']+)'\s*:", content)
        for k in keys:
            covered.add(k.strip())
    except FileNotFoundError:
        print("Warning: player_photos_extra.js not found")
    return covered

# ── Progress file (allows resuming) ─────────────────────────────────────
def load_progress():
    if os.path.exists(PROGRESS_FILE):
        with open(PROGRESS_FILE, encoding='utf-8') as f:
            return json.load(f)
    return {'found': {}, 'not_found': [], 'checked': []}

def save_progress(progress):
    with open(PROGRESS_FILE, 'w', encoding='utf-8') as f:
        json.dump(progress, f, indent=2, ensure_ascii=False)

# ── Wikipedia API calls ──────────────────────────────────────────────────
def search_wikipedia(player_name):
    """
    Returns the most likely Wikipedia page title for this player.
    Appends 'footballer' to reduce false positives for common names.
    """
    params = {
        'action': 'query',
        'list': 'search',
        'srsearch': f'{player_name} footballer',
        'srlimit': 3,
        'format': 'json',
        'srprop': 'size'
    }
    try:
        r = requests.get(
            'https://en.wikipedia.org/w/api.php',
            params=params,
            headers=HEADERS,
            timeout=10
        )
        r.raise_for_status()
        results = r.json().get('query', {}).get('search', [])
        if results:
            return results[0]['title']
    except Exception as e:
        print(f"  [search error: {e}]", end='')
    return None

def get_page_summary(title):
    """
    Fetches the Wikipedia REST summary for a page title.
    Returns dict with 'extract' and 'thumbnail' (if present), or None.
    """
    encoded = requests.utils.quote(title.replace(' ', '_'))
    url = f'https://en.wikipedia.org/api/rest_v1/page/summary/{encoded}'
    try:
        r = requests.get(url, headers=HEADERS, timeout=10)
        if r.status_code == 404:
            return None
        r.raise_for_status()
        return r.json()
    except Exception as e:
        print(f"  [summary error: {e}]", end='')
    return None

def is_footballer(summary_data):
    """Returns True if the page extract mentions football."""
    extract = (summary_data.get('extract') or '').lower()
    return any(term in extract for term in FOOTBALL_TERMS)

def get_thumbnail_url(summary_data):
    """Extracts the thumbnail source URL from a page summary."""
    thumb = summary_data.get('thumbnail')
    if thumb and thumb.get('source'):
        return thumb['source']
    return None

# ── Career stats helper ──────────────────────────────────────────────────
def career_apps(player):
    return sum(s.get('apps', 0) for s in player.get('seasons', []))

# ── Write output JS file ─────────────────────────────────────────────────
def write_output(found_dict):
    lines = [
        '/* player_photos_wiki.js',
        '   AUTO-GENERATED by fetch_wiki_photos.py — do not edit by hand.',
        '   Wikipedia thumbnail URLs for PL players not covered by FPL codes.',
        '   Keys: accent-stripped, lowercased player names.',
        '   Re-run fetch_wiki_photos.py to refresh.',
        '*/',
        '(function () {',
        '  window.WIKI_PLAYER_PHOTOS = {'
    ]
    for name in sorted(found_dict.keys()):
        url = found_dict[name]
        escaped = name.replace("'", "\\'")
        lines.append(f"    '{escaped}': '{url}',")
    lines.append('  };')
    lines.append('})();')

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines) + '\n')
    print(f"\nWrote {len(found_dict)} entries to {OUTPUT_FILE}")

# ── Main ─────────────────────────────────────────────────────────────────
def main():
    # Load player database
    with open('data/players.json', encoding='utf-8') as f:
        data = json.load(f)
    players = data['players']
    print(f"Loaded {len(players)} players from players.json")

    # Load already-covered names
    fpl_covered   = load_fpl_covered()
    extra_covered = load_extra_covered()
    all_covered   = fpl_covered | extra_covered
    print(f"Already covered: {len(fpl_covered)} FPL + {len(extra_covered)} extra = {len(all_covered)} total")

    # Load progress from previous run
    progress = load_progress()
    already_checked = set(progress['checked'])
    print(f"Previously checked: {len(already_checked)}, found: {len(progress['found'])}")

    # Build candidate list: uncovered players with enough apps
    candidates = []
    for p in players:
        normed = norm_name(p['name'])
        if normed in all_covered:
            continue
        if career_apps(p) < MIN_APPS:
            continue
        if normed in already_checked:
            continue
        candidates.append(p)

    print(f"New candidates to fetch: {len(candidates)}")
    if not candidates:
        print("Nothing to do — writing output from existing progress.")
        write_output(progress['found'])
        return

    found_count    = 0
    not_found_count = 0

    for i, player in enumerate(candidates):
        name   = player['name']
        normed = norm_name(name)
        apps   = career_apps(player)

        print(f"[{i+1}/{len(candidates)}] {name} ({apps} apps)...", end=' ', flush=True)

        # Step 1: search for Wikipedia page title
        title = search_wikipedia(name)
        time.sleep(REQUEST_DELAY)

        if not title:
            print("no Wikipedia result")
            progress['not_found'].append(normed)
            progress['checked'].append(normed)
            not_found_count += 1
            if (i + 1) % 50 == 0:
                save_progress(progress)
            continue

        # Step 2: get page summary (validate + thumbnail in one call)
        summary = get_page_summary(title)
        time.sleep(REQUEST_DELAY)

        if not summary:
            print(f"no summary for '{title}'")
            progress['not_found'].append(normed)
            progress['checked'].append(normed)
            not_found_count += 1
            if (i + 1) % 50 == 0:
                save_progress(progress)
            continue

        if not is_footballer(summary):
            print(f"'{title}' — not a footballer, skipping")
            progress['not_found'].append(normed)
            progress['checked'].append(normed)
            not_found_count += 1
            if (i + 1) % 50 == 0:
                save_progress(progress)
            continue

        thumb_url = get_thumbnail_url(summary)
        if not thumb_url:
            print(f"'{title}' — footballer but no photo")
            progress['not_found'].append(normed)
            progress['checked'].append(normed)
            not_found_count += 1
            if (i + 1) % 50 == 0:
                save_progress(progress)
            continue

        progress['found'][normed] = thumb_url
        progress['checked'].append(normed)
        found_count += 1
        print(f"✓  {title}")

        # Save progress every 50 players
        if (i + 1) % 50 == 0:
            save_progress(progress)
            write_output(progress['found'])
            print(f"  [Progress saved: {found_count} found so far]")

    # Final save
    save_progress(progress)
    write_output(progress['found'])

    total_found = len(progress['found'])
    print(f"\n{'='*50}")
    print(f"This run:  {found_count} found, {not_found_count} not found")
    print(f"All-time:  {total_found} total in output file")
    print(f"{'='*50}")
    print("Next step: commit data/player_photos_wiki.js and deploy.")

if __name__ == '__main__':
    main()
