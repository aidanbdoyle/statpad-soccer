#!/usr/bin/env python3
"""
Patch script: re-scrapes ONLY the 2025-26 season (API ID 777) and merges
it into the existing data/players.json + regenerates players_data.js.
Replaces any existing 2025-26 season entries for each player.
"""

import json, os, time
import requests

DATA_DIR  = "data"
JSON_FILE = os.path.join(DATA_DIR, "players.json")
JS_FILE   = os.path.join(DATA_DIR, "players_data.js")

SEASON_ID   = 777
SEASON_KEY  = "2025-26"
SEASON_YEAR = 2025
TITLE_WINNER = "Arsenal"  # 2025-26 PL champions

API_BASE = "https://footballapi.pulselive.com/football"
HEADERS  = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    "Origin":     "https://www.premierleague.com",
    "Referer":    "https://www.premierleague.com/",
}
DELAY = 1.5

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
    "Crystal Palace":          "Crystal Palace",
    "Middlesbrough":           "Middlesbrough",
    "Sunderland":              "Sunderland",
    "Fulham":                  "Fulham",
    "Everton":                 "Everton",
    "Southampton":             "Southampton",
    "Chelsea":                 "Chelsea",
    "Arsenal":                 "Arsenal",
    "Liverpool":               "Liverpool",
    "Manchester City":         "Manchester City",
    "Manchester United":       "Manchester United",
    "Brentford":               "Brentford",
    "Bournemouth":             "Bournemouth",
    "Burnley":                 "Burnley",
    "Watford":                 "Watford",
    "Portsmouth":              "Portsmouth",
    "Wimbledon":               "Wimbledon",
    "Blackpool":               "Blackpool",
    "Reading":                 "Reading",
}

SESSION = requests.Session()
SESSION.headers.update(HEADERS)

def get(url, params=None, retries=3):
    for attempt in range(retries):
        try:
            r = SESSION.get(url, params=params, timeout=20)
            if r.status_code == 429:
                wait = 60 * (attempt + 1)
                print(f"  Rate-limited — waiting {wait}s…")
                time.sleep(wait)
                continue
            r.raise_for_status()
            if not r.text.strip():
                return None
            return r.json()
        except Exception as e:
            if attempt < retries - 1:
                print(f"  Retry {attempt+1}/{retries}: {e}")
                time.sleep(5)
            else:
                print(f"  FAILED: {e}")
    return None

def norm_club(name):
    return CLUB_MAP.get(name, name)

def fetch_teams():
    data = get(f"{API_BASE}/teams", {"compSeasons": SEASON_ID, "page": 0, "pageSize": 30})
    if not data:
        return []
    return [{"id": int(t["id"]), "name": norm_club(t["name"])} for t in data.get("content", [])]

def fetch_squad(team_id):
    data = get(
        f"{API_BASE}/teams/{team_id}/compseasons/{SEASON_ID}/staff",
        {"page": 0, "pageSize": 100, "compSeasons": SEASON_ID, "comps": 1, "type": "player"},
    )
    if not data:
        return []
    return data.get("players", [])

def fetch_stat(stat_name, max_entries=700):
    data = get(
        f"{API_BASE}/stats/ranked/players/{stat_name}",
        {"page": 0, "pageSize": max_entries, "compSeasons": SEASON_ID, "comps": 1},
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

def scrape_season():
    print(f"Fetching teams for {SEASON_KEY}…")
    teams = fetch_teams()
    print(f"  Found {len(teams)} teams: {[t['name'] for t in teams]}")
    time.sleep(DELAY)

    # Build squad map: player_id -> base info + list of club stints
    squad_map = {}

    for team in teams:
        players_raw = fetch_squad(team["id"])
        time.sleep(DELAY)
        for p in players_raw:
            pid = p.get("playerId")
            if pid is None:
                continue
            pid = int(pid)
            apps = int(p.get("appearances") or 0)
            cs   = int(p.get("cleanSheets") or 0)

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

            club_name = team["name"]

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

    print(f"  {len(squad_map)} players with appearances")

    # Fetch ranked stats
    print(f"  Fetching ranked stats…")
    goals_id,   goals_name   = fetch_stat("goals");             time.sleep(DELAY)
    assists_id, assists_name = fetch_stat("goal_assist");       time.sleep(DELAY)
    yellow_id,  yellow_name  = fetch_stat("yellow_card");       time.sleep(DELAY)
    red_id,     red_name     = fetch_stat("red_card");          time.sleep(DELAY)
    shots_id,   shots_name   = fetch_stat("total_scoring_att"); time.sleep(DELAY)
    saves_id,   saves_name   = fetch_stat("saves");             time.sleep(DELAY)
    tack_id,    tack_name    = fetch_stat("won_tackle");         time.sleep(DELAY)
    inter_id,   inter_name   = fetch_stat("interception");      time.sleep(DELAY)
    clear_id,   clear_name   = fetch_stat("total_clearance");   time.sleep(DELAY)
    bcc_id,     bcc_name     = fetch_stat("big_chance_created");time.sleep(DELAY)
    pen_id,     pen_name     = fetch_stat("penalty_scored");    time.sleep(DELAY)
    wood_id,    wood_name    = fetch_stat("hit_woodwork");       time.sleep(DELAY)
    pass_id,    pass_name    = fetch_stat("accurate_pass");     time.sleep(DELAY)

    def lookup(id_map, name_map, pid, name):
        if pid in id_map:
            return id_map[pid]
        return name_map.get(name, 0)

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

        clubs = pdata["clubs"]
        primary_idx = max(range(len(clubs)), key=lambda i: clubs[i]["apps"])

        for i, club_entry in enumerate(clubs):
            is_primary = (i == primary_idx)
            records.append({
                "id":           pid,
                "name":         pdata["name"],
                "nationality":  pdata["nationality"],
                "position":     pdata["position"],
                "season":       SEASON_KEY,
                "seasonYear":   SEASON_YEAR,
                "club":         club_entry["club"],
                "apps":         club_entry["apps"],
                "goals":              g  if is_primary else 0,
                "assists":            a  if is_primary else 0,
                "yellow_cards":       y  if is_primary else 0,
                "red_cards":          r  if is_primary else 0,
                "shots":              sh if is_primary else 0,
                "saves":              sv if is_primary else 0,
                "tackles_won":        tw if is_primary else 0,
                "interceptions":      it if is_primary else 0,
                "clearances":         cl if is_primary else 0,
                "big_chances_created":bc if is_primary else 0,
                "penalties_scored":   ps if is_primary else 0,
                "hit_woodwork":       hw if is_primary else 0,
                "accurate_passes":    ap if is_primary else 0,
                "clean_sheets": club_entry["clean_sheets"] or None,
                "won_pl_title": (TITLE_WINNER != "TBD" and club_entry["club"] == TITLE_WINNER),
            })

    return records

def merge_into_db(records):
    print(f"\nLoading existing DB…")
    with open(JSON_FILE) as f:
        data = json.load(f)
    players = data["players"]
    print(f"  {len(players)} existing players")

    # Build lookup: normalized name -> player index
    name_lookup = {}
    for i, p in enumerate(players):
        name_lookup[p["name"].lower()] = i

    # Also build a player-ID lookup using seasons that have IDs
    # (won't apply here since players.json doesn't store IDs, but keep name-based)

    added_new = 0
    updated = 0

    # Group records by player name
    from collections import defaultdict
    by_name = defaultdict(list)
    for rec in records:
        by_name[rec["name"].lower()].append(rec)

    for name_lower, recs in by_name.items():
        if name_lower in name_lookup:
            idx = name_lookup[name_lower]
            player = players[idx]
            # Remove old 2025-26 entries
            old_seasons = [s for s in player["seasons"] if s.get("seasonYear") != SEASON_YEAR]
            player["seasons"] = old_seasons

            # Add new entries
            for rec in recs:
                player["seasons"].append({
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
            # Update nationality/position
            if recs[0]["nationality"]:
                player["nationality"] = recs[0]["nationality"]
            if recs[0]["position"]:
                player["position"] = recs[0]["position"]
            updated += 1
        else:
            # New player
            new_player = {
                "name": recs[0]["name"],
                "nationality": recs[0]["nationality"],
                "position": recs[0]["position"],
                "seasons": []
            }
            for rec in recs:
                new_player["seasons"].append({
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
            players.append(new_player)
            name_lookup[name_lower] = len(players) - 1
            added_new += 1

    print(f"  Updated existing players: {updated}")
    print(f"  Added new players: {added_new}")
    print(f"  Total players: {len(players)}")

    # Verify stats
    season_entries = []
    for p in players:
        for s in p["seasons"]:
            if s.get("seasonYear") == SEASON_YEAR:
                season_entries.append(s)
    max_apps = max((s.get("apps",0) for s in season_entries), default=0)
    total_goals = sum(s.get("goals",0) for s in season_entries)
    print(f"  2025-26 entries: {len(season_entries)}, max apps: {max_apps}, total goals: {total_goals}")

    data["players"] = players
    return data

def write_js(data):
    players = data["players"]
    print(f"\nWriting {JS_FILE}…")
    with open(JS_FILE, "w") as f:
        f.write("window.PLAYERS_DATA = ")
        json.dump(players, f, separators=(",", ":"), ensure_ascii=False)
        f.write(";")
    print(f"  Done ({os.path.getsize(JS_FILE)/1024/1024:.1f} MB)")

def write_json(data):
    print(f"Writing {JSON_FILE}…")
    with open(JSON_FILE, "w") as f:
        json.dump(data, f, separators=(",", ":"), ensure_ascii=False)
    print(f"  Done")

if __name__ == "__main__":
    print(f"=== Patching {SEASON_KEY} season ===\n")

    records = scrape_season()
    print(f"\nScraped {len(records)} player-club records for {SEASON_KEY}")

    data = merge_into_db(records)

    write_json(data)
    write_js(data)

    print("\n=== Done! ===")
    print("Bump CACHE_VER in index.html before deploying.")
