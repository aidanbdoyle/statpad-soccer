#!/usr/bin/env python3
"""
Premier League stats scraper — uses the official Premier League API.
Covers ALL seasons: 1992/93 through 2025/26 (34 seasons).

Usage:
    python3 scraper.py          # full run (~20-30 min)
    python3 scraper.py --test   # scrape only 2 seasons to verify

Output:
    data/players.json      — raw JSON backup
    data/players_data.js   — loaded automatically by index.html

Stats collected per player-season:
    goals, assists, appearances, clean_sheets, shots,
    yellow_cards, red_cards, saves, tackles_won, interceptions,
    clearances, big_chances_created, penalties_scored, hit_woodwork,
    accurate_passes, nationality, position, club, won_pl_title
"""

import json, os, re, sys, time
import requests

# ── Config ─────────────────────────────────────────────────────
DATA_DIR      = "data"
PROGRESS_FILE = os.path.join(DATA_DIR, "scrape_progress.json")
JSON_FILE     = os.path.join(DATA_DIR, "players.json")
JS_FILE       = os.path.join(DATA_DIR, "players_data.js")

API_BASE = "https://footballapi.pulselive.com/football"
HEADERS  = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    "Origin":     "https://www.premierleague.com",
    "Referer":    "https://www.premierleague.com/",
}
DELAY = 1.5   # seconds between API calls — polite but fast

# ── All 34 PL seasons: (API season ID, season key, start year) ─
SEASONS = [
    (1,   "1992-93", 1992), (2,   "1993-94", 1993), (3,   "1994-95", 1994),
    (4,   "1995-96", 1995), (5,   "1996-97", 1996), (6,   "1997-98", 1997),
    (7,   "1998-99", 1998), (8,   "1999-00", 1999), (9,   "2000-01", 2000),
    (10,  "2001-02", 2001), (11,  "2002-03", 2002), (12,  "2003-04", 2003),
    (13,  "2004-05", 2004), (14,  "2005-06", 2005), (15,  "2006-07", 2006),
    (16,  "2007-08", 2007), (17,  "2008-09", 2008), (18,  "2009-10", 2009),
    (19,  "2010-11", 2010), (20,  "2011-12", 2011), (21,  "2012-13", 2012),
    (22,  "2013-14", 2013), (27,  "2014-15", 2014), (42,  "2015-16", 2015),
    (54,  "2016-17", 2016), (79,  "2017-18", 2017), (210, "2018-19", 2018),
    (274, "2019-20", 2019), (363, "2020-21", 2020), (418, "2021-22", 2021),
    (489, "2022-23", 2022), (578, "2023-24", 2023), (719, "2024-25", 2024),
    (777, "2025-26", 2025),
]

# ── PL title winners per season ────────────────────────────────
PL_TITLE_WINNERS = {
    "1992-93": "Manchester United", "1993-94": "Manchester United",
    "1994-95": "Blackburn Rovers",  "1995-96": "Manchester United",
    "1996-97": "Manchester United", "1997-98": "Arsenal",
    "1998-99": "Manchester United", "1999-00": "Manchester United",
    "2000-01": "Manchester United", "2001-02": "Arsenal",
    "2002-03": "Manchester United", "2003-04": "Arsenal",
    "2004-05": "Chelsea",           "2005-06": "Chelsea",
    "2006-07": "Manchester United", "2007-08": "Manchester United",
    "2008-09": "Manchester United", "2009-10": "Chelsea",
    "2010-11": "Manchester United", "2011-12": "Manchester City",
    "2012-13": "Manchester United", "2013-14": "Manchester City",
    "2014-15": "Chelsea",           "2015-16": "Leicester City",
    "2016-17": "Chelsea",           "2017-18": "Manchester City",
    "2018-19": "Manchester City",   "2019-20": "Liverpool",
    "2020-21": "Manchester City",   "2021-22": "Manchester City",
    "2022-23": "Manchester City",   "2023-24": "Manchester City",
    "2024-25": "Liverpool",         "2025-26": "TBD",
}

# Normalise PL API club names → our display names
CLUB_MAP = {
    "Wolverhampton Wanderers": "Wolves",
    "Nottingham Forest":       "Nott'm Forest",
    "West Bromwich Albion":    "West Brom",
    "Queens Park Rangers":     "QPR",
    "Huddersfield Town":       "Huddersfield",
    "Sheffield United":        "Sheffield United",
    "Sheffield Wednesday":     "Sheffield Wednesday",
    "Coventry City":           "Coventry",
    "Ipswich Town":            "Ipswich",
    "Bolton Wanderers":        "Bolton",
    "Charlton Athletic":       "Charlton",
    "Wigan Athletic":          "Wigan",
    "Derby County":            "Derby",
    "Stoke City":              "Stoke",
    "Swansea City":            "Swansea",
    "Cardiff City":            "Cardiff",
    "Hull City":               "Hull",
    "Bradford City":           "Bradford",
    "Swindon Town":            "Swindon",
    "Oldham Athletic":         "Oldham",
    "Luton Town":              "Luton",
    "Leicester City":          "Leicester",
    "Norwich City":            "Norwich",
    "Newcastle United":        "Newcastle",
    "Leeds United":            "Leeds United",
    "Brighton & Hove Albion":  "Brighton",
    "West Ham United":         "West Ham",
    "Blackburn Rovers":        "Blackburn Rovers",
    "Aston Villa":             "Aston Villa",
    "Tottenham Hotspur":       "Tottenham",
    "Tottenham":               "Tottenham",
    "Birmingham City":         "Birmingham",
    "Blackpool":               "Blackpool",
    "Wimbledon":               "Wimbledon",
    "AFC Wimbledon":           "Wimbledon",
    "Crystal Palace":          "Crystal Palace",
    "Middlesbrough":           "Middlesbrough",
    "Sunderland":              "Sunderland",
    "Portsmouth":              "Portsmouth",
    "Reading":                 "Reading",
    "Burnley":                 "Burnley",
    "Fulham":                  "Fulham",
    "Brentford":               "Brentford",
    "Bournemouth":             "Bournemouth",
    "Watford":                 "Watford",
    "Everton":                 "Everton",
    "Southampton":             "Southampton",
    "Chelsea":                 "Chelsea",
    "Arsenal":                 "Arsenal",
    "Liverpool":               "Liverpool",
    "Manchester City":         "Manchester City",
    "Manchester United":       "Manchester United",
}

def norm_club(name):
    return CLUB_MAP.get(name, name)


# ── HTTP helper ────────────────────────────────────────────────
SESSION = requests.Session()
SESSION.headers.update(HEADERS)

def get(url, params=None, retries=3):
    for attempt in range(retries):
        try:
            r = SESSION.get(url, params=params, timeout=20)
            if r.status_code == 429:
                wait = 60 * (attempt + 1)
                print(f"    Rate-limited — waiting {wait}s…")
                time.sleep(wait)
                continue
            r.raise_for_status()
            return r.json()
        except Exception as e:
            if attempt < retries - 1:
                print(f"    Retry {attempt+1}/{retries}: {e}")
                time.sleep(5)
            else:
                print(f"    FAILED: {e}")
    return None


# ── Per-season data fetchers ───────────────────────────────────

def fetch_teams(season_id):
    """Return list of {id, name} for all clubs in this season."""
    data = get(f"{API_BASE}/teams", {"compSeasons": season_id, "page": 0, "pageSize": 30})
    if not data:
        return []
    return [{"id": int(t["id"]), "name": t["name"]} for t in data.get("content", [])]


def fetch_squad(team_id, season_id):
    """Return list of player dicts for one club in one season."""
    data = get(
        f"{API_BASE}/teams/{team_id}/compseasons/{season_id}/staff",
        {"page": 0, "pageSize": 100, "compSeasons": season_id, "comps": 1, "type": "player"},
    )
    if not data:
        return []
    return data.get("players", [])


def fetch_stat(stat_name, season_id, max_entries=700):
    """
    Return (id_map, name_map) for one stat in one season.
    id_map   : {int(playerId) -> value}
    name_map : {player_display_name -> value}  — fallback for old seasons
                where squad and stats endpoints use different ID systems.
    """
    data = get(
        f"{API_BASE}/stats/ranked/players/{stat_name}",
        {"page": 0, "pageSize": max_entries, "compSeasons": season_id, "comps": 1},
    )
    if not data:
        return {}, {}
    id_map, name_map = {}, {}
    for item in data.get("stats", {}).get("content", []):
        owner = item.get("owner", {})
        pid   = owner.get("playerId")
        name  = owner.get("name", {}).get("display", "")
        val   = int(item.get("value", 0) or 0)
        if pid is not None:
            id_map[int(pid)] = val
        if name:
            name_map[name] = val
    return id_map, name_map


# ── Season scraper ─────────────────────────────────────────────

def scrape_season(season_id, season_key, season_year):
    print(f"  Fetching teams…")
    teams = fetch_teams(season_id)
    print(f"  {len(teams)} clubs found")
    time.sleep(DELAY)

    # Build squad map: player_id -> base info + list of club stints
    squad_map = {}   # int(playerId) -> dict

    for team in teams:
        players = fetch_squad(team["id"], season_id)
        time.sleep(DELAY)
        for p in players:
            pid = p.get("playerId")
            if pid is None:
                continue
            pid = int(pid)
            apps = int(p.get("appearances") or 0)
            cs   = int(p.get("cleanSheets") or 0)

            # Only include players who actually played
            if apps == 0 and cs == 0:
                continue

            name_obj = p.get("name", {})
            name = name_obj.get("display") or (
                (name_obj.get("first", "") + " " + name_obj.get("last", "")).strip()
            )

            nat_obj = p.get("nationalTeam") or {}
            nationality = nat_obj.get("country", "")

            info_obj = p.get("info") or {}
            position = info_obj.get("position") or p.get("latestPosition") or ""

            club_name = norm_club(team["name"])

            if pid not in squad_map:
                squad_map[pid] = {
                    "name":        name,
                    "nationality": nationality,
                    "position":    position,
                    "clubs":       [],
                }

            squad_map[pid]["clubs"].append({
                "club":         club_name,
                "apps":         apps,
                "clean_sheets": cs,
            })

    print(f"  {len(squad_map)} players with appearances across all clubs")

    # Fetch season-level stats (totals across all clubs)
    print(f"  Fetching goals, assists, cards, shots, and extended stats…")
    goals_id,   goals_name   = fetch_stat("goals",            season_id); time.sleep(DELAY)
    assists_id, assists_name = fetch_stat("goal_assist",        season_id); time.sleep(DELAY)
    yellow_id,  yellow_name  = fetch_stat("yellow_card",       season_id); time.sleep(DELAY)
    red_id,     red_name     = fetch_stat("red_card",          season_id); time.sleep(DELAY)
    shots_id,   shots_name   = fetch_stat("total_scoring_att", season_id); time.sleep(DELAY)
    saves_id,   saves_name   = fetch_stat("saves",             season_id); time.sleep(DELAY)
    tack_id,    tack_name    = fetch_stat("won_tackle",         season_id); time.sleep(DELAY)
    inter_id,   inter_name   = fetch_stat("interception",      season_id); time.sleep(DELAY)
    clear_id,   clear_name   = fetch_stat("total_clearance",   season_id); time.sleep(DELAY)
    bcc_id,     bcc_name     = fetch_stat("big_chance_created",season_id); time.sleep(DELAY)
    pen_id,     pen_name     = fetch_stat("penalty_scored",    season_id); time.sleep(DELAY)
    wood_id,    wood_name    = fetch_stat("hit_woodwork",       season_id); time.sleep(DELAY)
    pass_id,    pass_name    = fetch_stat("accurate_pass",      season_id); time.sleep(DELAY)

    def lookup(id_map, name_map, pid, name):
        """Try player ID first; fall back to display name for old seasons."""
        if pid in id_map:
            return id_map[pid]
        return name_map.get(name, 0)

    title_winner = PL_TITLE_WINNERS.get(season_key, "TBD")

    # Build records — one per (player, club) stint
    records = []
    for pid, pdata in squad_map.items():
        name = pdata["name"]
        g  = lookup(goals_id,   goals_name,   pid, name)
        a  = lookup(assists_id, assists_name, pid, name)
        y  = lookup(yellow_id,  yellow_name,  pid, name)
        r  = lookup(red_id,     red_name,     pid, name)
        sh = lookup(shots_id,   shots_name,   pid, name)
        sv = lookup(saves_id,   saves_name,   pid, name)
        tw = lookup(tack_id,    tack_name,    pid, name)
        it = lookup(inter_id,   inter_name,   pid, name)
        cl = lookup(clear_id,   clear_name,   pid, name)
        bc = lookup(bcc_id,     bcc_name,     pid, name)
        ps = lookup(pen_id,     pen_name,     pid, name)
        hw = lookup(wood_id,    wood_name,    pid, name)
        ap = lookup(pass_id,    pass_name,    pid, name)

        for club_entry in pdata["clubs"]:
            records.append({
                "id":           pid,
                "name":         pdata["name"],
                "nationality":  pdata["nationality"],
                "position":     pdata["position"],
                "season":       season_key,
                "seasonYear":   season_year,
                "club":         club_entry["club"],
                "apps":         club_entry["apps"],
                "goals":              g,
                "assists":            a,
                "yellow_cards":       y,
                "red_cards":          r,
                "shots":              sh,
                "saves":              sv,
                "tackles_won":        tw,
                "interceptions":      it,
                "clearances":         cl,
                "big_chances_created":bc,
                "penalties_scored":   ps,
                "hit_woodwork":       hw,
                "accurate_passes":    ap,
                "clean_sheets": club_entry["clean_sheets"] or None,
                "won_pl_title": club_entry["club"] == title_winner,
            })

    return records


# ── Aggregation ────────────────────────────────────────────────

def _compatible(a, b):
    """Return True if two non-empty strings are equal, or either is empty."""
    if not a or not b:
        return True
    return a.strip().lower() == b.strip().lower()

def _is_gk(pos):
    return (pos or "").strip().upper() == "GK"

def aggregate(all_records):
    # ── Pass 1: merge by player ID (handles mid-season transfers correctly) ──
    by_id = {}
    for rec in all_records:
        pid = str(rec["id"])
        if pid not in by_id:
            by_id[pid] = {
                "id":          pid,
                "name":        rec["name"],
                "nationality": rec["nationality"],
                "position":    rec["position"],
                "seasons":     [],
            }
        p = by_id[pid]
        if rec["nationality"]:
            p["nationality"] = rec["nationality"]
        if rec["position"]:
            p["position"] = rec["position"]

        existing = {(s["season"], s["club"]) for s in p["seasons"]}
        if (rec["season"], rec["club"]) in existing:
            continue
        p["seasons"].append({
            "season":             rec["season"],
            "seasonYear":         rec["seasonYear"],
            "club":               rec["club"],
            "apps":               rec["apps"],
            "goals":              rec["goals"],
            "assists":            rec["assists"],
            "yellow_cards":       rec["yellow_cards"],
            "red_cards":          rec["red_cards"],
            "shots":              rec["shots"],
            "saves":              rec["saves"],
            "tackles_won":        rec["tackles_won"],
            "interceptions":      rec["interceptions"],
            "clearances":         rec["clearances"],
            "big_chances_created":rec["big_chances_created"],
            "penalties_scored":   rec["penalties_scored"],
            "hit_woodwork":       rec["hit_woodwork"],
            "accurate_passes":    rec["accurate_passes"],
            "clean_sheets":       rec["clean_sheets"],
            "won_pl_title":       rec["won_pl_title"],
        })

    for p in by_id.values():
        p["seasons"].sort(key=lambda s: (s["seasonYear"], s["club"]))

    id_list = list(by_id.values())

    # ── Pass 2: merge cross-era duplicates (same player, different API IDs) ──
    #
    # Two entries are merged ONLY when ALL of the following hold:
    #   1. Identical display name
    #   2. Compatible nationality  (same, or at least one is unknown)
    #   3. Compatible position     (both GK, or both non-GK, or at least one unknown)
    #
    # This keeps genuinely different players with the same name separate
    # when they have different nationalities or one is a GK and one is not.

    from collections import defaultdict
    name_groups = defaultdict(list)
    for p in id_list:
        name_groups[p["name"].strip()].append(p)

    merged_players = []
    for name, group in name_groups.items():
        if len(group) == 1:
            merged_players.append(group[0])
            continue

        # Greedily merge compatible entries
        buckets = []  # each bucket = one merged player
        for entry in group:
            placed = False
            for bucket in buckets:
                nat_ok = _compatible(bucket["nationality"], entry["nationality"])
                pos_ok = _compatible(bucket["position"], entry["position"]) or \
                         (_is_gk(bucket["position"]) == _is_gk(entry["position"]))
                if nat_ok and pos_ok:
                    # Merge into this bucket
                    if entry["nationality"] and not bucket["nationality"]:
                        bucket["nationality"] = entry["nationality"]
                    if entry["position"] and not bucket["position"]:
                        bucket["position"] = entry["position"]
                    existing = {(s["season"], s["club"]) for s in bucket["seasons"]}
                    for s in entry["seasons"]:
                        if (s["season"], s["club"]) not in existing:
                            bucket["seasons"].append(s)
                            existing.add((s["season"], s["club"]))
                    placed = True
                    break
            if not placed:
                buckets.append({
                    "id":          entry["id"],
                    "name":        name,
                    "nationality": entry["nationality"],
                    "position":    entry["position"],
                    "seasons":     list(entry["seasons"]),
                })

        for bucket in buckets:
            bucket["seasons"].sort(key=lambda s: (s["seasonYear"], s["club"]))
            merged_players.append(bucket)

    print(f"  Pass 1 (by ID):   {len(id_list)} entries")
    print(f"  Pass 2 (by name): {len(merged_players)} unique players")
    return merged_players


# ── Output ─────────────────────────────────────────────────────

def write_outputs(players_list):
    os.makedirs(DATA_DIR, exist_ok=True)
    payload = {
        "generated":     "2026-04-13",
        "source":        "premierleague.com official API",
        "seasons":       "1992-93 to 2025-26",
        "total_players": len(players_list),
        "players":       players_list,
    }
    with open(JSON_FILE, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
    print(f"  Wrote {JSON_FILE}")
    with open(JS_FILE, "w", encoding="utf-8") as f:
        f.write("/* Auto-generated by scraper.py */\n")
        f.write(f"window.PLAYERS_DATA = {json.dumps(payload, ensure_ascii=False)};\n")
    print(f"  Wrote {JS_FILE}")


# ── Main ───────────────────────────────────────────────────────

def main():
    test_mode = "--test" in sys.argv
    os.makedirs(DATA_DIR, exist_ok=True)

    seasons_to_run = SEASONS[:2] if test_mode else SEASONS
    if test_mode:
        print("TEST MODE — scraping 1992-93 and 2023-24 only\n")

    # Resume from saved progress
    completed   = set()
    all_records = []
    if os.path.exists(PROGRESS_FILE):
        try:
            with open(PROGRESS_FILE, encoding="utf-8") as f:
                prog = json.load(f)
            completed   = set(prog.get("completed", []))
            all_records = prog.get("records", [])
            print(f"Resuming — {len(completed)}/{len(seasons_to_run)} seasons done\n")
        except Exception:
            print("Progress file unreadable — starting fresh\n")

    total = len(seasons_to_run)

    for season_id, season_key, season_year in seasons_to_run:
        if season_key in completed:
            print(f"Skipping {season_key} (done)")
            continue

        print(f"\n[{len(completed)+1}/{total}] {season_key} (API id={season_id})")
        try:
            records = scrape_season(season_id, season_key, season_year)
        except Exception as e:
            print(f"  ERROR: {e} — skipping season")
            records = []

        all_records.extend(records)
        completed.add(season_key)

        with open(PROGRESS_FILE, "w", encoding="utf-8") as f:
            json.dump({"completed": sorted(completed), "records": all_records}, f)
        print(f"  Saved progress ({len(completed)}/{total})")

    print(f"\nAggregating {len(all_records)} player-season records…")
    players_list = aggregate(all_records)
    print(f"Unique players: {len(players_list)}")

    write_outputs(players_list)

    if os.path.exists(PROGRESS_FILE):
        os.remove(PROGRESS_FILE)

    print("\nDone! Open index.html in a browser to play.")


if __name__ == "__main__":
    main()
