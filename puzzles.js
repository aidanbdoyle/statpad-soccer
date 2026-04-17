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
          { type: "nationality_one_of", values: ["Ireland", "Northern Ireland", "Scotland", "Wales"], display: "IRISH / N. IRISH / SCOTTISH / WELSH", scopeDisplay: "CAREER" },
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
  },

  // ── Puzzle 5 ────────────────────────────────────────────────
  {
    puzzleNumber: 5,
    date: "2026-04-19",
    category: "Assists",
    categoryKey: "assists",
    categoryUnit: "assist",
    categoryMode: "season",
    target: 55,
    rows: [
      {
        clubs: ["Arsenal"],
        seasonStart: 2000,
        seasonEnd: 2015,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "nationality", value: "Belgium", display: "BELGIAN", scopeDisplay: "CAREER" }
      },
      {
        clubs: ["Manchester City"],
        seasonStart: 2015,
        seasonEnd: 2026,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "nationality", value: "Wales", display: "WELSH", scopeDisplay: "CAREER" }
      },
      {
        clubs: ["Chelsea"],
        seasonStart: 2010,
        seasonEnd: 2026,
        qualifier: null
      }
    ]
  },

  // ── Puzzle 6 ────────────────────────────────────────────────
  {
    puzzleNumber: 6,
    date: "2026-04-20",
    category: "Appearances",
    categoryKey: "apps",
    categoryUnit: "appearance",
    categoryMode: "career",
    target: 900,
    rows: [
      {
        clubs: ["Everton"],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: null
      },
      {
        clubs: ["West Ham"],
        seasonStart: 1992,
        seasonEnd: 2015,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "nationality", value: "Ireland", display: "IRISH", scopeDisplay: "CAREER" }
      },
      {
        clubs: ["Aston Villa"],
        seasonStart: 1992,
        seasonEnd: 2016,
        qualifier: null
      },
      {
        clubs: ["Newcastle"],
        seasonStart: 1992,
        seasonEnd: 2020,
        qualifier: null
      }
    ]
  },

  // ── Puzzle 7 ────────────────────────────────────────────────
  {
    puzzleNumber: 7,
    date: "2026-04-21",
    category: "Goals",
    categoryKey: "goals",
    categoryUnit: "goal",
    categoryMode: "season",
    target: 80,
    rows: [
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "continent", value: "African", display: "AFRICAN", scopeDisplay: "CAREER" }
      },
      {
        clubs: ["Arsenal"],
        seasonStart: 1992,
        seasonEnd: 2015,
        qualifier: null
      },
      {
        clubs: ["Manchester United"],
        seasonStart: 1992,
        seasonEnd: 2014,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 2010,
        seasonEnd: 2026,
        qualifier: { type: "continent", value: "South American", display: "SOUTH AMERICAN", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2002,
        qualifier: { type: "award", award: "pl_title", scope: "season", display: "WON PL TITLE", scopeDisplay: "SAME SEASON" }
      }
    ]
  },

  // ── Puzzle 8 ────────────────────────────────────────────────
  {
    puzzleNumber: 8,
    date: "2026-04-22",
    category: "Assists",
    categoryKey: "assists",
    categoryUnit: "assist",
    categoryMode: "career",
    target: 160,
    rows: [
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "position", value: "M", display: "MIDFIELDER", scopeDisplay: "CAREER" }
      },
      {
        clubs: ["Chelsea"],
        seasonStart: 2003,
        seasonEnd: 2020,
        qualifier: null
      },
      {
        clubs: ["Liverpool"],
        seasonStart: 2015,
        seasonEnd: 2026,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "continent", value: "European", display: "EUROPEAN", scopeDisplay: "CAREER" }
      },
      {
        clubs: ["Tottenham"],
        seasonStart: 2000,
        seasonEnd: 2020,
        qualifier: null
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
