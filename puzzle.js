// ============================================================
//  PUZZLE CONFIGURATION  — edit this file to change the puzzle
// ============================================================
//
//  category     : display name shown top-left (e.g. "Appearances")
//  categoryKey  : key in player season data  (e.g. "apps")
//  categoryUnit : singular unit label        (e.g. "appearance")
//  categoryMode : "season"  → score = player's single best season stat (default)
//                 "career"  → score = sum of stat across ALL valid seasons
//
//  ── Available categoryKey values ─────────────────────────────
//  Attacking:   "goals"  "assists"  "shots"  "big_chances_created"
//               "penalties_scored"  "hit_woodwork"
//  Defensive:   "clean_sheets"  "saves"  "tackles_won"
//               "interceptions"  "clearances"
//  Passing:     "accurate_passes"
//  General:     "apps"  "yellow_cards"  "red_cards"
//
//  ── Each row has ─────────────────────────────────────────────
//    clubs        : array of club names (empty array [] = any club)
//    seasonStart  : earliest season start year (inclusive)
//    seasonEnd    : latest   season start year (inclusive)
//    qualifier    : null  OR  a qualifier object  OR  an array of
//                   qualifier objects (all must be satisfied)
//
//  ── Qualifier types ──────────────────────────────────────────
//
//  Award (career or same season):
//    { type: "award", award: "pl_title" | "golden_boot",
//      scope: "career" | "season",
//      display: "WON GOLDEN BOOT", scopeDisplay: "CAREER" }
//
//  Minimum stat threshold (season only):
//    { type: "min_stat", key: "goals" | "assists" | "apps" | "saves" | …,
//      value: 20, scope: "season",
//      display: "20+ GOALS", scopeDisplay: "SAME SEASON" }
//
//  Maximum stat threshold (season or career):
//    { type: "max_stat", key: "goals", value: 10,
//      scope: "career" | "season",
//      display: "MAX 10 GOALS", scopeDisplay: "SAME SEASON" }
//
//  Exact nationality:
//    { type: "nationality", value: "England",
//      display: "ENGLISH", scopeDisplay: "CAREER" }
//
//  Continent (groups all nationalities by region):
//    { type: "continent", value: "European" | "African" | "South American"
//                               | "North American" | "Asian" | "Oceanian",
//      display: "AFRICAN", scopeDisplay: "CAREER" }
//
//  Relegated same season:
//    { type: "relegated", scope: "season",
//      display: "RELEGATED", scopeDisplay: "SAME SEASON" }
//
//  Position:
//    { type: "position", value: "GK" | "DF" | "MF" | "FW",
//      display: "GOALKEEPER", scopeDisplay: "CAREER" }
//
//  Outfield player (excludes goalkeepers):
//    { type: "outfield",
//      display: "OUTFIELD PLAYER", scopeDisplay: "CAREER" }
//
//  Multi-qualifier example (all conditions must be met):
//    qualifier: [
//      { type: "max_stat", key: "goals", value: 10, scope: "season",
//        display: "MAX 10 GOALS", scopeDisplay: "SAME SEASON" },
//      { type: "outfield", display: "OUTFIELD PLAYER", scopeDisplay: "CAREER" }
//    ]
//
// ============================================================

const PUZZLE = {
  date: "2026-04-15",
  puzzleNumber: 1,
  target: 750,        // players try to get total career appearances as close to this as possible
  category: "Appearances",
  categoryKey: "apps",
  categoryUnit: "appearance",
  categoryMode: "career",

  rows: [
    {
      // Row 1: Any club, 1992–2026, African players only
      clubs: [],
      seasonStart: 1992,
      seasonEnd: 2026,
      qualifier: {
        type: "continent",
        value: "African",
        display: "AFRICAN",
        scopeDisplay: "CAREER"
      }
    },
    {
      // Row 2: Man United, 2013–2026, no qualifier
      clubs: ["Manchester United"],
      seasonStart: 2013,
      seasonEnd: 2026,
      qualifier: null
    },
    {
      // Row 3: Any club, 1992–2026, won Golden Boot (career)
      clubs: [],
      seasonStart: 1992,
      seasonEnd: 2026,
      qualifier: {
        type: "award",
        award: "golden_boot",
        scope: "career",
        display: "WON GOLDEN BOOT",
        scopeDisplay: "CAREER"
      }
    },
    {
      // Row 4: Any club, 2020–2026, outfield player with max 10 goals that season
      clubs: [],
      seasonStart: 2020,
      seasonEnd: 2026,
      qualifier: [
        {
          type: "max_stat",
          key: "goals",
          value: 5,
          scope: "career",
          display: "MAX 5 CAREER GOALS",
          scopeDisplay: "CAREER"
        },
        {
          type: "outfield",
          display: "OUTFIELD PLAYER",
          scopeDisplay: "CAREER"
        }
      ]
    },
    {
      // Row 5: Everton, 2010–2015, no qualifier
      clubs: ["Everton"],
      seasonStart: 2010,
      seasonEnd: 2015,
      qualifier: null
    }
  ]
};
