#!/usr/bin/env python3
"""
Patch script: scrapes ONLY the 1996-97 season (API ID 5) and merges
it into the existing data/players.json + regenerates players_data.js.
"""

import json, os, time
import requests

DATA_DIR  = "data"
JSON_FILE = os.path.join(DATA_DIR, "players.json")
JS_FILE   = os.path.join(DATA_DIR, "players_data.js")

SEASON_ID   = 5
SEASON_KEY  = "1996-97"
SEASON_YEAR = 1996
TITLE_WINNER = "Manchester United"

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
    return [{"id": int(t["id"]), "name": t["name"]} for t in data.get("content", [])]

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

def lookup(id_map, name_map, pid, name):
    if pid in id_map:
        return id_map[pid]
    return name_map.get(name, 0)

# ── Step 1: Scrape 1996-97 ──────────────────────────────────────
print("=== Scraping 1996-97 season ===")

print("Fetching teams…")
teams = fetch_teams()
print(f"  {len(teams)} clubs: {[t['name'] for t in teams]}")
time.sleep(DELAY)

squad_map = {}
for team in teams:
    print(f"  Fetching squad: {team['name']}")
    players = fetch_squad(team["id"])
    time.sleep(DELAY)
    for p in players:
        if p is None:
            continue
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
        nat_obj  = p.get("nationalTeam") or {}
        nationality = nat_obj.get("country", "")
        info_obj = p.get("info") or {}
        position = info_obj.get("position") or p.get("latestPosition") or ""
        club_name = norm_club(team["name"])

        if pid not in squad_map:
            squad_map[pid] = {"name": name, "nationality": nationality, "position": position, "clubs": []}
        squad_map[pid]["clubs"].append({"club": club_name, "apps": apps, "clean_sheets": cs})

print(f"\n{len(squad_map)} players found with appearances")

print("Fetching stats…")
goals_id,   goals_name   = fetch_stat("goals");             time.sleep(DELAY)
assists_id, assists_name = fetch_stat("goal_assist");       time.sleep(DELAY)
yellow_id,  yellow_name  = fetch_stat("yellow_card");      time.sleep(DELAY)
red_id,     red_name     = fetch_stat("red_card");         time.sleep(DELAY)
shots_id,   shots_name   = fetch_stat("total_scoring_att");time.sleep(DELAY)
saves_id,   saves_name   = fetch_stat("saves");            time.sleep(DELAY)
tack_id,    tack_name    = fetch_stat("won_tackle");        time.sleep(DELAY)
inter_id,   inter_name   = fetch_stat("interception");     time.sleep(DELAY)
clear_id,   clear_name   = fetch_stat("total_clearance");  time.sleep(DELAY)
bcc_id,     bcc_name     = fetch_stat("big_chance_created");time.sleep(DELAY)
pen_id,     pen_name     = fetch_stat("penalty_scored");   time.sleep(DELAY)
wood_id,    wood_name    = fetch_stat("hit_woodwork");      time.sleep(DELAY)
pass_id,    pass_name    = fetch_stat("accurate_pass");    time.sleep(DELAY)
print("  Stats fetched.")

# Build season records
new_records = []
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
        new_records.append({
            "api_id":      pid,
            "name":        name,
            "nationality": pdata["nationality"],
            "position":    pdata["position"],
            "season":      SEASON_KEY,
            "seasonYear":  SEASON_YEAR,
            "club":        club_entry["club"],
            "apps":        club_entry["apps"],
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
            "clean_sheets":       club_entry["clean_sheets"] or None,
            "won_pl_title":       club_entry["club"] == TITLE_WINNER,
        })

print(f"\n{len(new_records)} season records built for 1996-97")

# ── Step 2: Merge into existing players.json ────────────────────
print("\n=== Merging into players.json ===")
with open(JSON_FILE) as f:
    db = json.load(f)

existing_players = db["players"]

# Build lookup maps for existing players
by_name = {}
for p in existing_players:
    name = p["name"].strip()
    if name not in by_name:
        by_name[name] = []
    by_name[name].append(p)

matched = 0
new_players = 0
already_had = 0

for rec in new_records:
    season_entry = {
        "season":              rec["season"],
        "seasonYear":          rec["seasonYear"],
        "club":                rec["club"],
        "apps":                rec["apps"],
        "goals":               rec["goals"],
        "assists":             rec["assists"],
        "yellow_cards":        rec["yellow_cards"],
        "red_cards":           rec["red_cards"],
        "shots":               rec["shots"],
        "saves":               rec["saves"],
        "tackles_won":         rec["tackles_won"],
        "interceptions":       rec["interceptions"],
        "clearances":          rec["clearances"],
        "big_chances_created": rec["big_chances_created"],
        "penalties_scored":    rec["penalties_scored"],
        "hit_woodwork":        rec["hit_woodwork"],
        "accurate_passes":     rec["accurate_passes"],
        "clean_sheets":        rec["clean_sheets"],
        "won_pl_title":        rec["won_pl_title"],
    }

    name = rec["name"].strip()
    candidates = by_name.get(name, [])

    # Check if this player+club season already exists (shouldn't, but be safe)
    matched_player = None
    for cand in candidates:
        existing_seasons = {(s["season"], s["club"]) for s in cand["seasons"]}
        if (rec["season"], rec["club"]) in existing_seasons:
            already_had += 1
            matched_player = cand
            break
        # Match by name — pick first compatible candidate
        matched_player = cand
        break

    if matched_player:
        # Check not already added
        existing_seasons = {(s["season"], s["club"]) for s in matched_player["seasons"]}
        if (rec["season"], rec["club"]) not in existing_seasons:
            matched_player["seasons"].append(season_entry)
            # Re-sort seasons chronologically
            matched_player["seasons"].sort(key=lambda s: (s["seasonYear"], s["club"]))
            matched += 1
            # Update nationality/position if missing
            if not matched_player.get("nationality") and rec["nationality"]:
                matched_player["nationality"] = rec["nationality"]
            if not matched_player.get("position") and rec["position"]:
                matched_player["position"] = rec["position"]
    else:
        # Brand new player not in DB at all
        new_player = {
            "id":          str(rec["api_id"]),
            "name":        name,
            "nationality": rec["nationality"],
            "position":    rec["position"],
            "seasons":     [season_entry],
        }
        existing_players.append(new_player)
        by_name[name] = [new_player]
        new_players += 1

print(f"  Merged:      {matched} season records into existing players")
print(f"  New players: {new_players} players added to DB")
print(f"  Skipped:     {already_had} already present")
print(f"  Total players in DB: {len(existing_players)}")

# Update metadata
db["generated"] = db.get("generated", "") + " + 1996-97 patch"

# ── Step 3: Save updated players.json ──────────────────────────
print("\nSaving players.json…")
with open(JSON_FILE, "w") as f:
    json.dump(db, f, separators=(",", ":"))
print("  Saved.")

# ── Step 4: Regenerate players_data.js ─────────────────────────
print("Regenerating players_data.js…")

# Read the existing JS file preamble logic from the original scraper approach
players_list = existing_players

js_lines = ["/* Auto-generated by scraper.py + 1996-97 patch. Do not edit. */"]
js_lines.append("window.PLAYERS_DATA = [")

for p in players_list:
    js_lines.append(json.dumps(p, separators=(",", ":")) + ",")

js_lines.append("];")

with open(JS_FILE, "w") as f:
    f.write("\n".join(js_lines))

print(f"  players_data.js written ({len(players_list)} players).")

# ── Step 5: Spot-check some key players ────────────────────────
print("\n=== Spot checks ===")
checks = ["Dion Dublin", "Alan Shearer", "Robbie Fowler", "Ian Wright", "Andy Cole"]
for name in checks:
    for p in existing_players:
        if p["name"] == name:
            total = sum(s.get("goals", 0) or 0 for s in p["seasons"])
            s9697 = next((s for s in p["seasons"] if s["season"] == "1996-97"), None)
            g9697 = s9697["goals"] if s9697 else "MISSING"
            print(f"  {name}: 1996-97 goals={g9697}, career total={total}")
            break

print("\nDone! Commit players.json and players_data.js to deploy.")
