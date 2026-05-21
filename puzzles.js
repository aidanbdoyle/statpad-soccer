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
    target: 450,
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
    target: 50,
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
    target: 50,
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
          { type: "max_peak_season", key: "goals", value: 10, display: "MAX 10 GOALS IN A SEASON", scopeDisplay: "CAREER" }
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
    target: 500,
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
    target: 200,
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
    target: 50,
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
    target: 2050,
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
    target: 300,
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
    category: "Goals",
    categoryKey: "goals",
    categoryUnit: "goal",
    categoryMode: "career",
    target: 300,
    rows: [
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "nationality", value: "Czech Republic", display: "CZECH", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "max_stat", key: "assists", value: 25, scope: "career", display: "MAX 25 CAREER ASSISTS", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "last_name_starts_with", value: "V", display: "LAST NAME STARTS WITH V", scopeDisplay: "CAREER" }
      },
      {
        clubs: ["Stoke", "Middlesbrough"],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 2010,
        seasonEnd: 2019,
        qualifier: [
          { type: "position", value: "M", display: "MIDFIELDER", scopeDisplay: "CAREER" },
          { type: "non_european", display: "NON-EUROPEAN", scopeDisplay: "CAREER" }
        ]
      }
    ]
  },

  // ── Puzzle 10 ────────────────────────────────────────────────
  {
    puzzleNumber: 10,
    date: "2026-04-24",
    category: "Assists",
    categoryKey: "assists",
    categoryUnit: "assist",
    categoryMode: "career",
    target: 100,
    rows: [
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "nationality", value: "Scotland", display: "SCOTTISH", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 2020,
        seasonEnd: 2026,
        qualifier: { type: "nationality", value: "England", display: "ENGLISH", scopeDisplay: "CAREER" }
      },
      {
        clubs: ["Blackburn Rovers", "Bolton"],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "last_name_starts_with", value: "B", display: "LAST NAME STARTS WITH B", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: [
          { type: "max_stat", key: "goals", value: 10, scope: "career", display: "MAX 10 CAREER GOALS", scopeDisplay: "CAREER" },
          { type: "outfield", display: "OUTFIELD PLAYER", scopeDisplay: "CAREER" }
        ]
      }
    ]
  },

  // ── Puzzle 11 ────────────────────────────────────────────────
  {
    puzzleNumber: 11,
    date: "2026-04-25",
    category: "Tackles Won",
    categoryKey: "tackles_won",
    categoryUnit: "tackle won",
    categoryMode: "career",
    target: 1200,
    rows: [
      {
        clubs: [],
        seasonStart: 2024,
        seasonEnd: 2024,
        qualifier: { type: "position", value: "D", display: "DEFENDER", scopeDisplay: "SEASON" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "nationality", value: "Belgium", display: "BELGIAN", scopeDisplay: "CAREER" }
      },
      {
        clubs: ["Manchester City", "Manchester United"],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "nationality_one_of", values: ["Nigeria", "Senegal"], display: "NIGERIAN / SENEGALESE", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "continent", value: ["Asian", "Oceanian"], display: "ASIAN / OCEANIAN", scopeDisplay: "CAREER" }
      }
    ]
  },

  // ── Puzzle 12 ────────────────────────────────────────────────
  {
    puzzleNumber: 12,
    date: "2026-04-26",
    category: "Saves",
    categoryKey: "saves",
    categoryUnit: "save",
    categoryMode: "career",
    target: 2350,
    rows: [
      {
        clubs: [],
        seasonStart: 2006,
        seasonEnd: 2026,
        qualifier: [
          { type: "nationality_one_of", values: ["Netherlands", "Belgium"], display: "DUTCH / BELGIAN", scopeDisplay: "CAREER" },
          { type: "position", value: "GK", display: "GOALKEEPER", scopeDisplay: "CAREER" }
        ]
      },
      {
        clubs: ["Chelsea", "Tottenham"],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "position", value: "GK", display: "GOALKEEPER", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: [
          { type: "last_name_starts_with", value: "F", display: "LAST NAME STARTS WITH F", scopeDisplay: "CAREER" },
          { type: "position", value: "GK", display: "GOALKEEPER", scopeDisplay: "CAREER" }
        ]
      },
      {
        clubs: [],
        seasonStart: 2016,
        seasonEnd: 2016,
        qualifier: { type: "position", value: "GK", display: "GOALKEEPER", scopeDisplay: "SEASON" }
      },
      {
        clubs: ["Southampton"],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "position", value: "GK", display: "GOALKEEPER", scopeDisplay: "CAREER" }
      }
    ]
  },

  // ── Puzzle 13 ────────────────────────────────────────────────
  {
    puzzleNumber: 13,
    date: "2026-04-27",
    category: "Assists",
    categoryKey: "assists",
    categoryUnit: "assist",
    categoryMode: "season",
    target: 50,
    rows: [
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "nationality", value: "Spain", display: "SPANISH", scopeDisplay: "CAREER" }
      },
      {
        clubs: ["Tottenham"],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "nationality", value: "Germany", display: "GERMAN", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "position", value: "F", display: "FORWARD", scopeDisplay: "CAREER" }
      },
      {
        clubs: ["Wolves", "Norwich"],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: null
      }
    ]
  },

  // ── Puzzle 14 ────────────────────────────────────────────────
  {
    puzzleNumber: 14,
    date: "2026-04-28",
    category: "Goals",
    categoryKey: "goals",
    categoryUnit: "goal",
    categoryMode: "career",
    target: 100,
    rows: [
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "nationality_one_of", values: ["Switzerland", "Austria"], display: "SWISS / AUSTRIAN", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: [
          { type: "nationality", value: "England", display: "ENGLISH", scopeDisplay: "CAREER" },
          { type: "position", value: "D", display: "DEFENDER", scopeDisplay: "CAREER" }
        ]
      },
      {
        clubs: ["Brighton", "Brentford"],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 2008,
        seasonEnd: 2013,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "min_stat", key: "red_cards", value: 5, scope: "career", display: "MIN 5 CAREER RED CARDS", scopeDisplay: "CAREER" }
      }
    ]
  },

  // ── Puzzle 15 ────────────────────────────────────────────────
  {
    puzzleNumber: 15,
    date: "2026-04-29",
    category: "Goals",
    categoryKey: "goals",
    categoryUnit: "goal",
    categoryMode: "season",
    target: 100,
    rows: [
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "nationality_one_of", values: ["United States", "Canada", "Mexico"], display: "AMERICAN / CANADIAN / MEXICAN", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "continent", value: "South American", display: "SOUTH AMERICAN", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 1992,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "position", value: "M", display: "MIDFIELDER", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "award", award: "golden_boot", scope: "season", display: "WON GOLDEN BOOT", scopeDisplay: "SAME SEASON" }
      }
    ]
  },

  // ── Puzzle 16 ────────────────────────────────────────────────
  {
    puzzleNumber: 16,
    date: "2026-04-30",
    category: "Appearances",
    categoryKey: "apps",
    categoryUnit: "appearance",
    categoryMode: "career",
    target: 450,
    rows: [
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "nationality_one_of", values: ["Croatia", "Serbia"], display: "CROATIAN / SERBIAN", scopeDisplay: "CAREER" }
      },
      {
        clubs: ["Wolves"],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "exclude_nationality", value: "Portugal", display: "NON-PORTUGUESE", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: [
          { type: "outfield", display: "OUTFIELD", scopeDisplay: "CAREER" },
          { type: "max_stat", key: "won_pl_title", value: 0, scope: "career", display: "NEVER WON PL TITLE", scopeDisplay: "CAREER" },
          { type: "exclude_nationality", value: "England", display: "NON-ENGLISH", scopeDisplay: "CAREER" }
        ]
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "last_name_starts_with", value: "C", display: "LAST NAME STARTS WITH C", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 2014,
        seasonEnd: 2026,
        qualifier: null
      }
    ]
  },
  {
    puzzleNumber: 17,
    date: "2026-05-01",
    category: "Goals",
    categoryKey: "goals",
    categoryUnit: "goal",
    categoryMode: "career",
    target: 300,
    rows: [
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "first_last_same_letter", display: "FIRST & LAST NAME SAME INITIAL", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 2020,
        seasonEnd: 2026,
        qualifier: { type: "nationality", value: "Brazil", display: "BRAZILIAN", scopeDisplay: "SEASON" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: [
          { type: "nationality", value: "Wales", display: "WELSH", scopeDisplay: "CAREER" },
          { type: "max_peak_season", key: "goals", value: 10, display: "MAX 10 GOALS IN A SEASON", scopeDisplay: "CAREER" }
        ]
      },
      {
        clubs: ["Crystal Palace"],
        seasonStart: 2015,
        seasonEnd: 2025,
        qualifier: null
      },
      {
        clubs: ["Bournemouth", "West Brom"],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: null
      }
    ]
  },
  {
    puzzleNumber: 18,
    date: "2026-05-02",
    category: "Assists",
    categoryKey: "assists",
    categoryUnit: "assist",
    categoryMode: "career",
    target: 250,
    rows: [
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "continent", value: "South American", display: "SOUTH AMERICAN", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "last_name_starts_with", value: "G", display: "LAST NAME STARTS WITH G", scopeDisplay: "CAREER" }
      },
      {
        clubs: ["Liverpool"],
        seasonStart: 2010,
        seasonEnd: 2019,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "last_name_matches_nationality", display: "LAST NAME STARTS WITH SAME LETTER AS NATIONALITY", scopeDisplay: "CAREER" }
      },
      {
        clubs: ["Everton"],
        seasonStart: 2010,
        seasonEnd: 2019,
        qualifier: null
      }
    ]
  },
  {
    puzzleNumber: 19,
    date: "2026-05-03",
    category: "Tackles Won",
    categoryKey: "tackles_won",
    categoryUnit: "tackle won",
    categoryMode: "season",
    target: 200,
    rows: [
      {
        clubs: ["Manchester City","Manchester United","Liverpool","Chelsea"],
        seasonStart: 2020,
        seasonEnd: 2020,
        qualifier: null
      },
      {
        clubs: ["Leicester","West Ham","Tottenham","Arsenal"],
        seasonStart: 2020,
        seasonEnd: 2020,
        qualifier: null
      },
      {
        clubs: ["Leeds United","Everton","Aston Villa","Newcastle"],
        seasonStart: 2020,
        seasonEnd: 2020,
        qualifier: null
      },
      {
        clubs: ["Wolves","Crystal Palace","Southampton","Brighton"],
        seasonStart: 2020,
        seasonEnd: 2020,
        qualifier: null
      },
      {
        clubs: ["Burnley","Fulham","West Brom","Sheffield United"],
        seasonStart: 2020,
        seasonEnd: 2020,
        qualifier: null
      }
    ]
  },
  {
    puzzleNumber: 20,
    date: "2026-05-04",
    category: "Saves",
    categoryKey: "saves",
    categoryUnit: "save",
    categoryMode: "career",
    target: 1800,
    rows: [
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: [
          { type: "continent", value: "South American", display: "SOUTH AMERICAN", scopeDisplay: "CAREER" },
          { type: "position", value: "GK", display: "GOALKEEPER", scopeDisplay: "CAREER" }
        ]
      },
      {
        clubs: ["Liverpool", "Everton"],
        seasonStart: 2006,
        seasonEnd: 2026,
        qualifier: { type: "position", value: "GK", display: "GOALKEEPER", scopeDisplay: "CAREER" }
      },
      {
        clubs: ["Newcastle", "Sunderland"],
        seasonStart: 2006,
        seasonEnd: 2026,
        qualifier: { type: "position", value: "GK", display: "GOALKEEPER", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 2010,
        seasonEnd: 2019,
        qualifier: { type: "position", value: "GK", display: "GOALKEEPER", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 2025,
        seasonEnd: 2026,
        qualifier: { type: "position", value: "GK", display: "GOALKEEPER", scopeDisplay: "CAREER" }
      }
    ]
  },

  // ── Puzzle 21 ────────────────────────────────────────────────
  {
    puzzleNumber: 21,
    date: "2026-05-05",
    category: "Goal Contributions",
    categoryKey: "goal_contributions",
    categoryUnit: "goal contribution",
    categoryMode: "career",
    target: 350,
    rows: [
      {
        clubs: ["Brighton", "Brentford"],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "nationality_one_of", values: ["Netherlands", "Belgium"], display: "DUTCH / BELGIAN", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 2000,
        seasonEnd: 2009,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "last_name_starts_with", value: "T", display: "LAST NAME STARTS WITH T", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: [
          { type: "last_name_length", value: 4, display: "4-LETTER LAST NAME", scopeDisplay: "CAREER" },
          { type: "exclude_nationality", value: "England", display: "NON-ENGLISH", scopeDisplay: "CAREER" }
        ]
      }
    ]
  },
  {
    puzzleNumber: 22,
    date: "2026-05-06",
    category: "Goals",
    categoryKey: "goals",
    categoryUnit: "goal",
    categoryMode: "season",
    target: 50,
    rows: [
      {
        clubs: [],
        seasonStart: 2020,
        seasonEnd: 2020,
        excludeClubs: ["Arsenal","Chelsea","Liverpool","Manchester City","Manchester United","Tottenham"],
        qualifier: null
      },
      {
        clubs: ["West Ham", "Everton"],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "last_name_starts_with", value: "J", display: "LAST NAME STARTS WITH J", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "max_stat", key: "apps", value: 90, scope: "career", display: "MAX 90 CAREER APPS", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: [
          {
            type: "nationality_one_of",
            values: ["Denmark","Finland","Japan","Poland","Sweden","Ukraine","Switzerland","Nigeria","Scotland","Morocco","Georgia","Greece","Austria","Latvia","Canada","Israel","Albania","Turkiye","Peru","Honduras","Tunisia","North Macedonia","Indonesia","Qatar","Bahrain","Bangladesh","China","Kazakhstan","Kyrgyzstan","Micronesia","Monaco","Pakistan","Palau","Saudi Arabia","Singapore","Somalia","Tonga","Vietnam"],
            display: "MAXIMUM OF TWO COLORS IN COUNTRY FLAG",
            scopeDisplay: "CAREER",
            showAsText: true
          },
          { type: "exclude_nationality", value: "England", display: "EXCLUDING ENGLAND", scopeDisplay: "CAREER" }
        ]
      }
    ]
  },
  {
    puzzleNumber: 23,
    date: "2026-05-07",
    category: "Saves",
    categoryKey: "saves",
    categoryUnit: "save",
    categoryMode: "career",
    target: 2000,
    rows: [
      {
        clubs: ["Burnley","Watford","Stoke"],
        seasonStart: 2006,
        seasonEnd: 2026,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 2006,
        seasonEnd: 2026,
        qualifier: { type: "nationality_one_of", values: ["Czech Republic","Slovakia","Poland"], display: "CZECH / SLOVAK / POLISH", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 2006,
        seasonEnd: 2026,
        qualifier: { type: "nationality_one_of", values: ["Germany","Netherlands"], display: "GERMAN / DUTCH", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 2006,
        seasonEnd: 2026,
        qualifier: { type: "continent", value: "South American", display: "SOUTH AMERICAN", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 2006,
        seasonEnd: 2026,
        qualifier: { type: "first_last_same_length", display: "SAME NUMBER OF LETTERS IN FIRST & LAST NAME", scopeDisplay: "CAREER" }
      }
    ]
  },
  {
    puzzleNumber: 24,
    date: "2026-05-08",
    category: "Appearances",
    categoryKey: "apps",
    categoryUnit: "appearance",
    categoryMode: "career",
    target: 1100,
    rows: [
      {
        clubs: ["Leeds United", "Burnley"],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 2000,
        seasonEnd: 2019,
        qualifier: { type: "exclude_nationality", value: "England", display: "NON-ENGLISH", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "nationality_one_of", values: ["Denmark","Sweden","Norway","Finland","Iceland"], display: "SCANDINAVIAN", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "award", award: "pl_title", scope: "career", display: "WON PL TITLE", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: [
          { type: "outfield", display: "OUTFIELD PLAYER", scopeDisplay: "CAREER" },
          { type: "max_stat", key: "assists", value: 25, scope: "career", display: "MAX 25 CAREER ASSISTS", scopeDisplay: "CAREER" }
        ]
      }
    ]
  }

  ,
  {
    puzzleNumber: 25,
    date: "2026-05-09",
    category: "Assists",
    categoryKey: "assists",
    categoryUnit: "assist",
    categoryMode: "career",
    target: 145,
    rows: [
      {
        clubs: ["Fulham"],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 2018,
        seasonEnd: 2018,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "continent", value: "South American", display: "SOUTH AMERICAN", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "nationality_one_of", values: ["Italy","Netherlands","France"], display: "ITALIAN / DUTCH / FRENCH", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "last_name_length", value: 7, display: "7-LETTER LAST NAME", scopeDisplay: "CAREER" }
      }
    ]
  }

  ,
  {
    puzzleNumber: 26,
    date: "2026-05-10",
    category: "Goals",
    categoryKey: "goals",
    categoryUnit: "goal",
    categoryMode: "career",
    target: 220,
    rows: [
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2010,
        qualifier: { type: "continent", value: "African", display: "AFRICAN", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "nationality_one_of", values: ["Colombia","Peru","Ecuador","Chile"], display: "COLOMBIAN / PERUVIAN / ECUADORIAN / CHILEAN", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "last_name_starts_with", value: "N", display: "LAST NAME STARTS WITH N", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "last_name_starts_with", value: "P", display: "LAST NAME STARTS WITH P", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "exact_clubs_count", value: 4, display: "PLAYED FOR EXACTLY 4 PL CLUBS", scopeDisplay: "CAREER" }
      }
    ]
  },

  // ── Puzzle 27 ───────────────────────────────────────────────
  {
    puzzleNumber: 27,
    date: "2026-05-11",
    category: "Shots",
    categoryKey: "shots",
    categoryUnit: "shot",
    categoryMode: "career",
    target: 1400,
    rows: [
      {
        clubs: ["West Ham", "Crystal Palace"],
        seasonStart: 2006,
        seasonEnd: 2026,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 2010,
        seasonEnd: 2020,
        qualifier: { type: "nationality", value: "France", display: "FRENCH", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 2006,
        seasonEnd: 2026,
        qualifier: { type: "nationality", value: "Ireland", display: "IRISH", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 2006,
        seasonEnd: 2026,
        qualifier: { type: "last_name_starts_with", value: "J", display: "LAST NAME STARTS WITH J", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 2015,
        seasonEnd: 2025,
        qualifier: { type: "position", value: "M", display: "MIDFIELDER", scopeDisplay: "CAREER" }
      }
    ]
  },

  // ── Puzzle 28 ───────────────────────────────────────────────
  {
    puzzleNumber: 28,
    date: "2026-05-12",
    category: "Appearances",
    categoryKey: "apps",
    categoryUnit: "appearance",
    categoryMode: "career",
    target: 1000,
    rows: [
      {
        clubs: ["Liverpool"],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "exclude_nationality", value: "England", display: "NON-ENGLISH", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "nationality", value: "Argentina", display: "ARGENTINIAN", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "position", value: "G", display: "GOALKEEPER", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "last_name_starts_with", value: "E", display: "LAST NAME STARTS WITH E", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "exact_clubs_count", value: 2, display: "PLAYED FOR EXACTLY 2 PL CLUBS", scopeDisplay: "CAREER" }
      }
    ]
  },

  // ── Puzzle 29 ───────────────────────────────────────────────
  {
    puzzleNumber: 29,
    date: "2026-05-13",
    category: "Tackles Won",
    categoryKey: "tackles_won",
    categoryUnit: "tackle won",
    categoryMode: "career",
    target: 1350,
    rows: [
      {
        clubs: ["Leicester"],
        seasonStart: 2006,
        seasonEnd: 2026,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 2006,
        seasonEnd: 2026,
        qualifier: { type: "nationality", value: "Spain", display: "SPANISH", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 2020,
        seasonEnd: 2025,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 2006,
        seasonEnd: 2026,
        qualifier: { type: "last_name_starts_with", value: "K", display: "LAST NAME STARTS WITH K", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 2006,
        seasonEnd: 2026,
        qualifier: { type: "continent", value: "South American", display: "SOUTH AMERICAN", scopeDisplay: "CAREER" }
      }
    ]
  },

  // ── Puzzle 30 ───────────────────────────────────────────────
  {
    puzzleNumber: 30,
    date: "2026-05-14",
    category: "Goals",
    categoryKey: "goals",
    categoryUnit: "goal",
    categoryMode: "career",
    target: 245,
    rows: [
      {
        clubs: ["Tottenham"],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "exclude_nationality", value: "England", display: "NON-ENGLISH", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2000,
        qualifier: { type: "exclude_nationality", value: "England", display: "NON-ENGLISH", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "nationality_one_of", values: ["Ghana", "Cameroon", "DR Congo"], display: "GHANAIAN / CAMEROONIAN / CONGOLESE", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "last_name_starts_with", value: "M", display: "LAST NAME STARTS WITH M", scopeDisplay: "CAREER" }
      },
      {
        clubs: ["Southampton", "Crystal Palace"],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: null
      }
    ]
  },

  // ── Puzzle 31 ───────────────────────────────────────────────
  {
    puzzleNumber: 31,
    date: "2026-05-15",
    category: "Accurate Passes",
    categoryKey: "accurate_passes",
    categoryUnit: "accurate pass",
    categoryMode: "career",
    target: 35000,
    rows: [
      {
        clubs: ["Arsenal", "Manchester United"],
        seasonStart: 2006,
        seasonEnd: 2026,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 2006,
        seasonEnd: 2026,
        qualifier: { type: "nationality_one_of", values: ["Spain", "Portugal"], display: "SPANISH / PORTUGUESE", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 2006,
        seasonEnd: 2026,
        qualifier: { type: "continent", value: "African", display: "AFRICAN", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 2010,
        seasonEnd: 2020,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 2006,
        seasonEnd: 2026,
        qualifier: { type: "first_last_same_letter", display: "FIRST & LAST NAME SAME INITIAL", scopeDisplay: "CAREER" }
      }
    ]
  },

  // ── Puzzle 32 ───────────────────────────────────────────────
  {
    puzzleNumber: 32,
    date: "2026-05-16",
    category: "Saves",
    categoryKey: "saves",
    categoryUnit: "save",
    categoryMode: "career",
    target: 2400,
    rows: [
      {
        clubs: [],
        seasonStart: 2010,
        seasonEnd: 2020,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 2006,
        seasonEnd: 2026,
        qualifier: { type: "exclude_nationality", value: "England", display: "NON-ENGLISH", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 2015,
        seasonEnd: 2026,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 2006,
        seasonEnd: 2015,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 2006,
        seasonEnd: 2011,
        qualifier: null
      }
    ]
  },

  // ── Puzzle 33 ───────────────────────────────────────────────
  {
    puzzleNumber: 33,
    date: "2026-05-17",
    category: "Assists",
    categoryKey: "assists",
    categoryUnit: "assist",
    categoryMode: "career",
    target: 215,
    rows: [
      {
        clubs: ["Southampton", "Everton"],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: null
      },
      {
        clubs: ["Manchester United"],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "exclude_nationality_one_of", values: ["England", "Scotland", "Wales", "Northern Ireland"], display: "NOT BRITISH", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 2000,
        seasonEnd: 2026,
        qualifier: { type: "nationality", value: "Spain", display: "SPANISH", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 2015,
        seasonEnd: 2026,
        qualifier: { type: "exclude_nationality", value: "England", display: "NON-ENGLISH", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 2006,
        seasonEnd: 2026,
        qualifier: { type: "last_name_starts_with", value: "S", display: "LAST NAME STARTS WITH S", scopeDisplay: "CAREER" }
      }
    ]
  },

  // ── Puzzle 34 ───────────────────────────────────────────────
  {
    puzzleNumber: 34,
    date: "2026-05-18",
    category: "Yellow Cards",
    categoryKey: "yellow_cards",
    categoryUnit: "yellow card",
    categoryMode: "career",
    target: 185,
    rows: [
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "nationality", value: "France", display: "FRENCH", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "nationality_one_of", values: ["Netherlands", "Belgium"], display: "DUTCH / BELGIAN", scopeDisplay: "CAREER" }
      },
      {
        clubs: ["West Ham", "Crystal Palace"],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "last_name_starts_with", value: "P", display: "LAST NAME STARTS WITH P", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "award", award: "golden_boot", scope: "career", display: "WON GOLDEN BOOT", scopeDisplay: "CAREER" }
      }
    ]
  },

  // ── Puzzle 35 ───────────────────────────────────────────────
  {
    puzzleNumber: 35,
    date: "2026-05-19",
    category: "Clean Sheets",
    categoryKey: "clean_sheets",
    categoryUnit: "clean sheet",
    categoryMode: "career",
    target: 230,
    rows: [
      {
        clubs: ["Burnley", "Leicester"],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "position", value: "D", display: "DEFENDERS", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: [
          { type: "nationality", value: "Wales", display: "WELSH", scopeDisplay: "CAREER" },
          { type: "position", value: "D", display: "DEFENDERS", scopeDisplay: "CAREER" }
        ]
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: [
          { type: "continent", value: "African", display: "AFRICAN", scopeDisplay: "CAREER" },
          { type: "position", value: "D", display: "DEFENDERS", scopeDisplay: "CAREER" }
        ]
      },
      {
        clubs: [],
        seasonStart: 2020,
        seasonEnd: 2025,
        qualifier: { type: "position", value: "D", display: "DEFENDERS", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: [
          { type: "last_name_starts_with", value: "C", display: "LAST NAME STARTS WITH C", scopeDisplay: "CAREER" },
          { type: "position", value: "D", display: "DEFENDERS", scopeDisplay: "CAREER" }
        ]
      }
    ]
  },

  // ── Puzzle 36 ───────────────────────────────────────────────
  {
    puzzleNumber: 36,
    date: "2026-05-20",
    category: "Appearances",
    categoryKey: "apps",
    categoryUnit: "appearance",
    categoryMode: "career",
    target: 825,
    rows: [
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "nationality", value: "Germany", display: "GERMAN", scopeDisplay: "CAREER" }
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "nationality_one_of", values: ["Nigeria", "Ghana", "Senegal"], display: "NIGERIAN / GHANAIAN / SENEGALESE", scopeDisplay: "CAREER" }
      },
      {
        clubs: ["Wolves", "Fulham"],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 2010,
        seasonEnd: 2020,
        qualifier: null
      },
      {
        clubs: [],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: [
          { type: "non_european", display: "NON-EUROPEAN", scopeDisplay: "CAREER" },
          { type: "min_two_stats", keys: ["goals", "assists"], values: [25, 25], scope: "career", display: "25+ GOALS & 25+ ASSISTS", scopeDisplay: "CAREER" }
        ]
      }
    ]
  }

  // ── Puzzle 37 ───────────────────────────────────────────────
  {
    puzzleNumber: 37,
    date: "2026-05-21",
    category: "Goals",
    categoryKey: "goals",
    categoryUnit: "goal",
    categoryMode: "career",
    target: 55,
    rows: [
      {
        clubs: ["Arsenal"],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "max_stat", key: "apps", value: 100, scope: "career", display: "MAX 100 CAREER APPEARANCES", scopeDisplay: "CAREER" }
      },
      {
        clubs: ["Chelsea"],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "max_stat", key: "apps", value: 100, scope: "career", display: "MAX 100 CAREER APPEARANCES", scopeDisplay: "CAREER" }
      },
      {
        clubs: ["Liverpool"],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "max_stat", key: "apps", value: 100, scope: "career", display: "MAX 100 CAREER APPEARANCES", scopeDisplay: "CAREER" }
      },
      {
        clubs: ["Manchester City"],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "max_stat", key: "apps", value: 100, scope: "career", display: "MAX 100 CAREER APPEARANCES", scopeDisplay: "CAREER" }
      },
      {
        clubs: ["Manchester United"],
        seasonStart: 1992,
        seasonEnd: 2026,
        qualifier: { type: "max_stat", key: "apps", value: 100, scope: "career", display: "MAX 100 CAREER APPEARANCES", scopeDisplay: "CAREER" }
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
