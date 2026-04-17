# Puzzle Template — Stat of the Day

Copy the JS block below into `puzzles.js`, fill in the blanks, and push.

---

## Quick Checklist
- [ ] `puzzleNumber` = previous puzzle + 1
- [ ] `date` = the calendar date this puzzle will run (YYYY-MM-DD)
- [ ] All club names copied exactly from the approved list
- [ ] Position values use single letters: `G`, `D`, `M`, `F`
- [ ] `target` is a plausible but hard-to-hit number
- [ ] `scopeDisplay` matches `categoryMode` (`"SEASON"` or `"CAREER"`)

---

## Template

```js
// ── Puzzle N ────────────────────────────────────────────────
{
  puzzleNumber: N,
  date: "YYYY-MM-DD",

  // ── Category ──────────────────────────────────────────────
  // Pick ONE combination:
  //   Goals (season):       category:"Goals",       categoryKey:"goals",       categoryUnit:"goal",        categoryMode:"season"
  //   Goals (career):       category:"Goals",       categoryKey:"goals",       categoryUnit:"goal",        categoryMode:"career"
  //   Appearances (season): category:"Appearances", categoryKey:"apps",        categoryUnit:"appearance",  categoryMode:"season"
  //   Appearances (career): category:"Appearances", categoryKey:"apps",        categoryUnit:"appearance",  categoryMode:"career"
  //   Assists (season):     category:"Assists",     categoryKey:"assists",     categoryUnit:"assist",      categoryMode:"season"
  //   Assists (career):     category:"Assists",     categoryKey:"assists",     categoryUnit:"assist",      categoryMode:"career"
  //   Clean Sheets (season):category:"Clean Sheets",categoryKey:"clean_sheets",categoryUnit:"clean sheet", categoryMode:"season"
  //   Clean Sheets (career):category:"Clean Sheets",categoryKey:"clean_sheets",categoryUnit:"clean sheet", categoryMode:"career"
  category:     "Goals",
  categoryKey:  "goals",
  categoryUnit: "goal",
  categoryMode: "season",   // "season" | "career"

  // Target Mode number — should be achievable but tricky to hit exactly.
  // Rough guides: Goals/season=60-100, Appearances/career=700-1000, Assists/season=40-70
  target: 75,

  rows: [

    // ── Row 1 ──────────────────────────────────────────────
    {
      clubs: ["Club Name"],         // [] = any club. Multiple clubs = player must have played for at least one
      seasonStart: 2010,            // Start year of earliest valid season (2019 = the 2019-20 season)
      seasonEnd: 2020,              // Start year of latest valid season (2026 = includes 2025-26)
      qualifier: null               // See qualifier options below
    },

    // ── Row 2 ──────────────────────────────────────────────
    {
      clubs: [],
      seasonStart: 1992,
      seasonEnd: 2026,
      qualifier: null
    },

    // ── Row 3 ──────────────────────────────────────────────
    {
      clubs: [],
      seasonStart: 1992,
      seasonEnd: 2026,
      qualifier: null
    },

    // ── Row 4 ──────────────────────────────────────────────
    {
      clubs: [],
      seasonStart: 1992,
      seasonEnd: 2026,
      qualifier: null
    },

    // ── Row 5 ──────────────────────────────────────────────
    {
      clubs: [],
      seasonStart: 1992,
      seasonEnd: 2026,
      qualifier: null
    }

  ]
},
```

---

## Qualifier Reference

Replace `qualifier: null` with any of the following.

### No qualifier
```js
qualifier: null
```

---

### Nationality (single country)
```js
qualifier: { type: "nationality", value: "France", display: "FRENCH", scopeDisplay: "CAREER" }
```
Common values: `"England"`, `"France"`, `"Germany"`, `"Spain"`, `"Italy"`, `"Portugal"`,
`"Netherlands"`, `"Belgium"`, `"Brazil"`, `"Argentina"`, `"Republic of Ireland"`,
`"Scotland"`, `"Wales"`, `"Nigeria"`, `"Senegal"`, `"Ghana"`, `"Ivory Coast"`,
`"Denmark"`, `"Sweden"`, `"Norway"`, `"Croatia"`, `"Serbia"`, `"Colombia"`, `"Uruguay"`

---

### Nationality — OR across multiple countries
```js
qualifier: {
  type: "nationality_one_of",
  values: ["Spain", "Italy", "Portugal"],
  display: "SPANISH / ITALIAN / PORTUGUESE",
  scopeDisplay: "SEASON"
}
```
Displays as flag emojis side by side. Hover shows country names.

---

### Continent
```js
qualifier: { type: "continent", value: "European", display: "EUROPEAN", scopeDisplay: "CAREER" }
```
`value` options: `"European"` | `"South American"` | `"African"` | `"Asian"` | `"North American"`

---

### Position
```js
qualifier: { type: "position", value: "M", display: "MIDFIELDER", scopeDisplay: "SEASON" }
```
| value | display |
|---|---|
| `"G"` | `"GOALKEEPER"` |
| `"D"` | `"DEFENDER"` |
| `"M"` | `"MIDFIELDER"` |
| `"F"` | `"FORWARD"` |

⚠️ **Must use single letters** (`G`, `D`, `M`, `F`) — not `GK`, `DF`, `MF`, `FW`.

---

### Outfield player only (no goalkeepers)
```js
qualifier: { type: "outfield", display: "OUTFIELD PLAYER", scopeDisplay: "CAREER" }
```

---

### Won Golden Boot
```js
// Must have won it in the same season they played for the club:
qualifier: { type: "award", award: "golden_boot", scope: "season", display: "WON GOLDEN BOOT", scopeDisplay: "SAME SEASON" }

// Must have won it at any point in their PL career:
qualifier: { type: "award", award: "golden_boot", scope: "career", display: "WON GOLDEN BOOT", scopeDisplay: "CAREER" }
```

---

### Won PL Title
```js
// Won the title in that same season:
qualifier: { type: "award", award: "pl_title", scope: "season", display: "WON PL TITLE", scopeDisplay: "SAME SEASON" }

// Won it at any point in PL career:
qualifier: { type: "award", award: "pl_title", scope: "career", display: "WON PL TITLE", scopeDisplay: "CAREER" }
```

---

### Relegated (player's team was relegated that season)
```js
qualifier: { type: "relegated", display: "RELEGATED", scopeDisplay: "SEASON" }
```
Best used with `categoryMode: "season"`.

---

### Max stat cap (restrict to low-volume players)
```js
qualifier: { type: "max_stat", key: "goals", value: 5, scope: "career", display: "MAX 5 CAREER GOALS", scopeDisplay: "CAREER" }
// key: "goals" | "apps" | "assists" | "clean_sheets"
```

---

### Multiple qualifiers — AND logic (player must satisfy all)
```js
qualifier: [
  { type: "position", value: "M", display: "MIDFIELDER", scopeDisplay: "SEASON" },
  { type: "continent", value: "European", display: "EUROPEAN", scopeDisplay: "SEASON" }
]
```
Both conditions must be true simultaneously.

---

## Club Names (exact spelling required)

### "Big Six" + frequent PL clubs
```
Arsenal          Chelsea          Liverpool        Manchester City
Manchester United  Tottenham      Newcastle        Everton
Leicester        Aston Villa      West Ham         Southampton
Leeds United     Blackburn Rovers  Nott'm Forest   Wolves
Crystal Palace   Fulham           Brentford        Bournemouth
Brighton         Burnley          Watford          Norwich
```

### Less frequent but valid
```
Sheffield United   Sheffield Wednesday   Coventry        Middlesbrough
Sunderland         Derby                 Bolton          Ipswich
Charlton           Blackpool             QPR             West Brom
Wigan              Swansea               Stoke           Huddersfield
Cardiff            Reading               Hull            Birmingham
Portsmouth         Wimbledon             Bradford        Swindon
Oldham             Luton
```

---

## Design Tips

**Row variety** — mix these patterns across 5 rows for a good puzzle:
- Club(s) only, no qualifier (broadest — tests club knowledge)
- Nationality/continent only, any club (tests international knowledge)
- Club + qualifier (tightest — tests overlap knowledge)
- Award/relegated (historical events test)
- Era-restricted (limits to a specific decade)

**Season ranges**
- Full PL era: `1992` to `2026`
- Modern era: `2010` to `2026`
- Early PL: `1992` to `2005`
- Specific window: e.g. `2012` to `2018`

**Target number calibration**
- For Goals/season: think 5 rows × ~12-20 goals = ~75-100. Round to a memorable number.
- For Appearances/career: think 5 rows × ~150-200 apps = ~750-1000. Round to hundreds.
- For Assists/season: think 5 rows × ~8-14 = ~50-70. Round to nearest 5.
- For Clean Sheets/career: think 5 rows × ~40-60 = ~225-300.

**Avoiding trivial answers** — if a row has one obvious answer (e.g. "Man City 2019-2026, no qualifier" → Aguero/De Bruyne/Silva), add a qualifier or narrow the year range to force more thought.
