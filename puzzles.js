/* ============================================================
   PUZZLES — add new puzzles to the array below.
   The game auto-selects by days since START_DATE.
   Increment puzzleNumber each time you add a new puzzle.
   ============================================================ */

const PUZZLE_START_DATE = new Date('2026-04-15');

const PUZZLES = [

  // ── Puzzle 1 ────────────────────────────────────────────────
  {
    puzzleNumber: 1,
    date: "2026-04-15",
    category: "Appearances",
    categoryKey: "apps",
    categoryUnit: "appearance",
    categoryMode: "career",
    target: 750,
    rows: [
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "continent", value: "African", display: "AFRICAN", scopeDisplay: "CAREER" }
      },
      {
        clubs: ["Manchester United"],
        seasonStart: 2013,
        seasonEnd: 2026,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "award", award: "golden_boot", scope: "career", display: "WON GOLDEN BOOT", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 2020,
        seasonEnd: 2026,
        qualifier: [
          { type: "max_stat", key: "goals", value: 5, scope: "career", display: "MAX 5 CAREER GOALS", scopeDisplay: "CAREER" },
          { type: "outfield", display: "OUTFIELD PLAYER", scopeDisplay: "CAREER" }
        ]
      },
      {
        clubs: ["Everton"],
        seasonStart: 2010,
        seasonEnd: 2015,
        qualifier: null
      }
    ]
  },

  // ── Puzzle 2 ────────────────────────────────────────────────
  {
    puzzleNumber: 2,
    date: "2026-04-16",
    category: "Goals",
    categoryKey: "goals",
    categoryUnit: "goal",
    categoryMode: "season",
    target: 75,
    rows: [
      {
        clubs: ["West Ham","Southampton"],
        seasonStart: 2012,
        seasonEnd: 2022,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2008,
        qualifier: { type: "continent", value: "South American", display: "SOUTH AMERICAN", scopeDisplay: "SEASON" }
      },
      {
        clubs: ["Arsenal","Chelsea"],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "nationality_one_of", values: ["Spain","Italy","Portugal"], display: "SPANISH / ITALIAN / PORTUGUESE", scopeDisplay: "SEASON" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "relegated", display: "RELEGATED", scopeDisplay: "SEASON" }
      },
      {
        clubs: ["Manchester City", "Manchester United"],
        seasonStart: 2010,
        seasonEnd: 2015,
        qualifier: [
          { type: "position", value: "M", display: "MIDFIELDER", scopeDisplay: "SEASON" },
          { type: "continent", value: "European", display: "EUROPEAN", scopeDisplay: "SEASON" }
        ]
      }
    ]
  },

  // ── Puzzle 3 ────────────────────────────────────────────────
  {
    puzzleNumber: 3,
    date: "2026-04-17",
    category: "Assists",
    categoryKey: "assists",
    categoryUnit: "assist",
    categoryMode: "career",
    target: 175,
    rows: [
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "nationality", value: "Norway", display: "NORWEGIAN", scopeDisplay: "CAREER" }
      },
      {
        clubs: ["Aston Villa", "Leicester", "Newcastle"],
        seasonStart: 2012,
        seasonEnd: 2026,
        qualifier: { type: "position", value: "M", display: "MIDFIELDER", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 2000,
        seasonEnd: 2026,
        qualifier: { type: "nationality_one_of", values: ["Ireland", "Cote D'Ivoire"], display: "IRISH / IVORIAN", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 2010,
        seasonEnd: 2026,
        qualifier: [
          { type: "nationality_one_of", values: ["Northern Ireland", "Scotland", "Wales"], display: "N. IRISH / SCOTTISH / WELSH", scopeDisplay: "CAREER", showAsText: true },
          { type: "position", value: "M", display: "MIDFIELDER", scopeDisplay: "CAREER" }
        ]
      },
      {
        clubs: [],
        seasonStart: 2006,
        seasonEnd: 2026,
        qualifier: [
          { type: "nationality", value: "France", display: "FRENCH", scopeDisplay: "CAREER" },
          { type: "max_stat", key: "goals", value: 10, scope: "season", display: "MAX 10 GOALS IN A SEASON", scopeDisplay: "SEASON" }
        ]
      }
    ]
  },

  // ── Puzzle 4 ────────────────────────────────────────────────
  {
    puzzleNumber: 4,
    date: "2026-04-18",
    category: "Appearances",
    categoryKey: "apps",
    categoryUnit: "appearance",
    categoryMode: "career",
    target: 950,
    rows: [
      {
        clubs: ["Newcastle"],
        seasonStart: 1992,
        seasonEnd: 2015,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: [
          { type: "nationality_one_of", values: ["Netherlands", "Denmark"], display: "DUTCH / DANISH", scopeDisplay: "CAREER" },
          { type: "outfield", display: "OUTFIELD PLAYER", scopeDisplay: "CAREER" }
        ]
      },
      {
        clubs: ["Chelsea"],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "nationality", value: "Brazil", display: "BRAZILIAN", scopeDisplay: "CAREER" }
      },
      {
        clubs: ["Aston Villa"],
        seasonStart: 2000,
        seasonEnd: 2026,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: [
          { type: "nationality", value: "Portugal", display: "PORTUGUESE", scopeDisplay: "CAREER" },
          { type: "position", value: "D", display: "DEFENDER", scopeDisplay: "CAREER" }
        ]
      }
    ]
  },

  // ── Puzzle 5 ────────────────────────────────────────────────
  {
    puzzleNumber: 5,
    date: "2026-04-19",
    category: "Goals",
    categoryKey: "goals",
    categoryUnit: "goal",
    categoryMode: "career",
    target: 225,
    rows: [
      {
        clubs: [],
        seasonStart: 2005,
        seasonEnd: 2009,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "nationality", value: "Germany", display: "GERMAN", scopeDisplay: "CAREER" }
      },
      {
        clubs: ["Sunderland", "Leeds United"],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "last_name_starts_with", value: "W", display: "LAST NAME STARTS WITH W", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: [
          { type: "max_stat", key: "apps", value: 100, scope: "career", display: "MAX 100 CAREER APPS", scopeDisplay: "CAREER" },
          { type: "outfield", display: "OUTFIELD PLAYER", scopeDisplay: "CAREER" }
        ]
      }
    ]
  },

  // ── Puzzle 6 ────────────────────────────────────────────────
  {
    puzzleNumber: 6,
    date: "2026-04-20",
    category: "Assists",
    categoryKey: "assists",
    categoryUnit: "assist",
    categoryMode: "career",
    target: 175,
    rows: [
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 1999,
        qualifier: null
      },
      {
        clubs: ["Crystal Palace", "Swansea"],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "continent", value: "North American", display: "NORTH AMERICAN", scopeDisplay: "CAREER" }
      },
      {
        clubs: ["Fulham"],
        seasonStart: 2020,
        seasonEnd: 2026,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "min_stat", key: "red_cards", value: 2, scope: "career", display: "MIN 2 CAREER RED CARDS", scopeDisplay: "CAREER" }
      }
    ]
  },

  // ── Puzzle 7 ────────────────────────────────────────────────
  {
    puzzleNumber: 7,
    date: "2026-04-21",
    category: "Saves",
    categoryKey: "saves",
    categoryUnit: "save",
    categoryMode: "career",
    target: 2000,
    rows: [
      {
        clubs: ["Arsenal", "Southampton"],
        seasonStart: 2006,
        seasonEnd: 2026,
        qualifier: { type: "position", value: "GK", display: "GOALKEEPER", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 2006,
        seasonEnd: 2026,
        qualifier: [
          { type: "position", value: "GK", display: "GOALKEEPER", scopeDisplay: "CAREER" },
          { type: "non_european", display: "NON-EUROPEAN", scopeDisplay: "CAREER" }
        ]
      },
      {
        clubs: [],
        seasonStart: 2020,
        seasonEnd: 2026,
        qualifier: { type: "position", value: "GK", display: "GOALKEEPER", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 2006,
        seasonEnd: 2026,
        qualifier: [
          { type: "position", value: "GK", display: "GOALKEEPER", scopeDisplay: "CAREER" },
          { type: "award", award: "pl_title", scope: "season", display: "WON PL TITLE", scopeDisplay: "SAME SEASON" }
        ]
      },
      {
        clubs: [],
        seasonStart: 2006,
        seasonEnd: 2026,
        qualifier: [
          { type: "position", value: "GK", display: "GOALKEEPER", scopeDisplay: "CAREER" },
          { type: "nationality_one_of", values: ["Norway", "Sweden", "Denmark", "Finland"], display: "SCANDINAVIAN", scopeDisplay: "CAREER" }
        ]
      }
    ]
  },

  // ── Puzzle 8 ────────────────────────────────────────────────
  {
    puzzleNumber: 8,
    date: "2026-04-22",
    category: "Shots",
    categoryKey: "shots",
    categoryUnit: "shot",
    categoryMode: "season",
    target: 450,
    rows: [
      {
        clubs: ["Arsenal", "Tottenham"],
        seasonStart: 2010,
        seasonEnd: 2019,
        qualifier: { type: "position", value: "M", display: "MIDFIELDER", scopeDisplay: "SEASON" }
      },
      {
        clubs: [],
        seasonStart: 2020,
        seasonEnd: 2026,
        qualifier: { type: "relegated", display: "RELEGATED", scopeDisplay: "SEASON" }
      },
      {
        clubs: ["Leicester", "West Ham", "Aston Villa"],
        seasonStart: 2006,
        seasonEnd: 2026,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 2016,
        seasonEnd: 2026,
        qualifier: { type: "continent", value: "African", display: "AFRICAN", scopeDisplay: "SEASON" }
      },
      {
        clubs: [],
        seasonStart: 2006,
        seasonEnd: 2026,
        qualifier: [
          { type: "nationality", value: "England", display: "ENGLISH", scopeDisplay: "SEASON" },
          { type: "position", value: "D", display: "DEFENDER", scopeDisplay: "SEASON" }
        ]
      }
    ]
  },

  // ── Puzzle 9 ────────────────────────────────────────────────
  {
    puzzleNumber: 9,
    date: "2026-04-23",
    category: "Clean Sheets",
    categoryKey: "clean_sheets",
    categoryUnit: "clean sheet",
    categoryMode: "career",
    target: 225,
    rows: [
      {
        clubs: ["Liverpool"],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: null
      },
      {
        clubs: ["Chelsea"],
        seasonStart: 2004,
        seasonEnd: 2026,
        qualifier: null
      },
      {
        clubs: ["Manchester City"],
        seasonStart: 2008,
        seasonEnd: 2026,
        qualifier: null
      },
      {
        clubs: ["Arsenal"],
        seasonStart: 1992,
        seasonEnd: 2020,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2005,
        qualifier: { type: "position", value: "GK", display: "GOALKEEPER", scopeDisplay: "CAREER" }
      }
    ]
  }

];

// ── Auto-select today's puzzle ───────────────────────────────
// Puzzles roll over at noon EST (17:00 UTC) each day.
(function () {
  const msPerDay  = 1000 * 60 * 60 * 24;
  const rollover  = Date.UTC(2026, 3, 15, 17, 0, 0); // April 15 2026 12:00 EST = 17:00 UTC
  const daysSince = Math.max(0, Math.floor((Date.now() - rollover) / msPerDay));
  window.PUZZLE   = PUZZLES[daysSince % PUZZLES.length];
})();
