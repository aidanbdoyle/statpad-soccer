/* ============================================================
   StatpadGame — Premier League Edition
   game.js  — core game logic
   ============================================================ */

'use strict';

// ── Percentile tier system ────────────────────────────────────
// Purple=100%, Blue=95-99.9%, Gold=80-94.9%, Silver=70-79.9%, Bronze=60-69.9%
function getPercentileTier(pct) {
  if (pct >= 100) return 'purple';
  if (pct >= 95)  return 'blue';
  if (pct >= 80)  return 'gold';
  if (pct >= 70)  return 'silver';
  if (pct >= 60)  return 'bronze';
  return '';
}

// ── Club display data (colours + abbreviations) ──────────────
const CLUB_STYLES = {
  "Arsenal":            { bg: "#EF0107", fg: "#FFFFFF", abbr: "ARS" },
  "Chelsea":            { bg: "#034694", fg: "#FFFFFF", abbr: "CHE" },
  "Liverpool":          { bg: "#C8102E", fg: "#FFFFFF", abbr: "LIV" },
  "Manchester City":    { bg: "#6CABDD", fg: "#1C2C5B", abbr: "MCI" },
  "Manchester United":  { bg: "#DA291C", fg: "#FFFFFF", abbr: "MUN" },
  "Tottenham":          { bg: "#132257", fg: "#FFFFFF", abbr: "TOT" },
  "Newcastle":          { bg: "#241F20", fg: "#FFFFFF", abbr: "NEW" },
  "Everton":            { bg: "#003399", fg: "#FFFFFF", abbr: "EVE" },
  "Leicester":          { bg: "#0053A0", fg: "#FDBE11", abbr: "LEI" },
  "Aston Villa":        { bg: "#95BFE5", fg: "#670E36", abbr: "AVL" },
  "Leeds United":       { bg: "#1D428A", fg: "#FFFFFF", abbr: "LEE" },
  "Blackburn Rovers":   { bg: "#009EE0", fg: "#FFFFFF", abbr: "BLB" },
  "West Ham":           { bg: "#7A263A", fg: "#1BB1E7", abbr: "WHU" },
  "Southampton":        { bg: "#D71920", fg: "#FFFFFF", abbr: "SOU" },
  "Nott'm Forest":      { bg: "#DD0000", fg: "#FFFFFF", abbr: "NFO" },
  "Wolves":             { bg: "#FDB913", fg: "#231F20", abbr: "WOL" },
  "Crystal Palace":     { bg: "#1B458F", fg: "#C4122F", abbr: "CRY" },
  "Fulham":             { bg: "#FFFFFF", fg: "#000000", abbr: "FUL" },
  "Brentford":          { bg: "#E30613", fg: "#FFFFFF", abbr: "BRE" },
  "Bournemouth":        { bg: "#DA291C", fg: "#000000", abbr: "BOU" },
  "Brighton":           { bg: "#0057B8", fg: "#FFFFFF", abbr: "BHA" },
  "Burnley":            { bg: "#6C1D45", fg: "#99D6EA", abbr: "BUR" },
  "Watford":            { bg: "#FBEE23", fg: "#ED2127", abbr: "WAT" },
  "Norwich":            { bg: "#00A650", fg: "#FFF200", abbr: "NOR" },
  "Sheffield United":   { bg: "#EE2737", fg: "#FFFFFF", abbr: "SHU" },
  "Sheffield Wednesday":{ bg: "#0066B2", fg: "#FFFFFF", abbr: "SHW" },
  "Coventry":           { bg: "#50B1E8", fg: "#FFFFFF", abbr: "COV" },
  "Middlesbrough":      { bg: "#D71920", fg: "#FFFFFF", abbr: "MID" },
  "Sunderland":         { bg: "#EB172B", fg: "#FFFFFF", abbr: "SUN" },
  "Derby":              { bg: "#FFFFFF", fg: "#231F20", abbr: "DER" },
  "Bolton":             { bg: "#FFFFFF", fg: "#1D3E6F", abbr: "BOL" },
  "Ipswich":            { bg: "#0044A9", fg: "#FFFFFF", abbr: "IPS" },
  "Charlton":           { bg: "#D71920", fg: "#FFFFFF", abbr: "CHA" },
  "Blackpool":          { bg: "#F68712", fg: "#FFFFFF", abbr: "BLP" },
  "QPR":                { bg: "#1D5BA4", fg: "#FFFFFF", abbr: "QPR" },
  "West Brom":          { bg: "#122F67", fg: "#FFFFFF", abbr: "WBA" },
  "Wigan":              { bg: "#1D3E6F", fg: "#FFFFFF", abbr: "WIG" },
  "Swansea":            { bg: "#FFFFFF", fg: "#000000", abbr: "SWA" },
  "Stoke":              { bg: "#E03A3E", fg: "#FFFFFF", abbr: "STK" },
  "Huddersfield":       { bg: "#0E63AD", fg: "#FFFFFF", abbr: "HUD" },
  "Cardiff":            { bg: "#0070B5", fg: "#FFFFFF", abbr: "CAR" },
  "Reading":            { bg: "#004494", fg: "#FFFFFF", abbr: "REA" },
  "Hull":               { bg: "#F5A12E", fg: "#000000", abbr: "HUL" },
  "Birmingham":         { bg: "#0000FF", fg: "#FFFFFF", abbr: "BIR" },
  "Portsmouth":         { bg: "#001489", fg: "#FFFFFF", abbr: "POR" },
  "Wimbledon":          { bg: "#0D2B57", fg: "#FFFFFF", abbr: "WIM" },
  "Bradford":           { bg: "#801644", fg: "#FFBF00", abbr: "BRA" },
  "Swindon":            { bg: "#EB172B", fg: "#FFFFFF", abbr: "SWI" },
  "Oldham":             { bg: "#004A97", fg: "#FFFFFF", abbr: "OLD" },
  "Luton":              { bg: "#F78F1E", fg: "#FFFFFF", abbr: "LUT" },
};

function clubStyle(name) {
  return CLUB_STYLES[name] || { bg: "#555555", fg: "#FFFFFF", abbr: name.slice(0, 3).toUpperCase() };
}

// ── Club crest logo URLs (Wikipedia Commons SVGs) ────────────
const CLUB_LOGOS = {
  "Arsenal":             "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
  "Chelsea":             "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
  "Liverpool":           "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
  "Manchester City":     "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
  "Manchester United":   "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
  "Tottenham":           "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg",
  "Newcastle":           "https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg",
  "Everton":             "https://upload.wikimedia.org/wikipedia/en/7/7c/Everton_FC_logo.svg",
  "Leicester":           "https://upload.wikimedia.org/wikipedia/en/2/2d/Leicester_City_crest.svg",
  "Aston Villa":         "https://upload.wikimedia.org/wikipedia/en/9/9a/Aston_Villa_FC_new_crest.svg",
  "Leeds United":        "https://upload.wikimedia.org/wikipedia/en/5/54/Leeds_United_F.C._logo.svg",
  "Blackburn Rovers":    "https://upload.wikimedia.org/wikipedia/en/0/0f/Blackburn_Rovers.svg",
  "West Ham":            "https://upload.wikimedia.org/wikipedia/en/c/c2/West_Ham_United_FC_logo.svg",
  "Southampton":         "https://upload.wikimedia.org/wikipedia/en/c/c9/FC_Southampton.svg",
  "Nott'm Forest":       "https://upload.wikimedia.org/wikipedia/en/e/e5/Nottingham_Forest_F.C._logo.svg",
  "Wolves":              "https://upload.wikimedia.org/wikipedia/en/f/fc/Wolverhampton_Wanderers.svg",
  "Crystal Palace":      "https://upload.wikimedia.org/wikipedia/en/a/a2/Crystal_Palace_FC_logo_%282022%29.svg",
  "Fulham":              "https://upload.wikimedia.org/wikipedia/en/e/eb/Fulham_FC_%28shield%29.svg",
  "Brentford":           "https://upload.wikimedia.org/wikipedia/en/2/2a/Brentford_FC_crest.svg",
  "Bournemouth":         "https://upload.wikimedia.org/wikipedia/en/e/e5/AFC_Bournemouth_logo.svg",
  "Brighton":            "https://upload.wikimedia.org/wikipedia/en/f/fd/Brighton_%26_Hove_Albion_logo.svg",
  "Burnley":             "https://upload.wikimedia.org/wikipedia/en/6/62/Burnley_F.C._Logo.svg",
  "Watford":             "https://upload.wikimedia.org/wikipedia/en/e/e2/Watford.svg",
  "Norwich":             "https://upload.wikimedia.org/wikipedia/en/8/8c/Norwich_City.svg",
  "Sheffield United":    "https://upload.wikimedia.org/wikipedia/en/9/9c/Sheffield_United_FC_logo.svg",
  "Sheffield Wednesday": "https://upload.wikimedia.org/wikipedia/en/6/6a/Sheffield_Wednesday_logo.svg",
  "Coventry":            "https://upload.wikimedia.org/wikipedia/en/8/8e/Coventry_City_FC_logo.svg",
  "Middlesbrough":       "https://upload.wikimedia.org/wikipedia/en/b/b2/Middlesbrough_FC_crest.svg",
  "Sunderland":          "https://upload.wikimedia.org/wikipedia/en/8/81/Sunderland_AFC_logo.svg",
  "Derby":               "https://upload.wikimedia.org/wikipedia/en/4/4a/Derby_County_Football_Club.svg",
  "Bolton":              "https://upload.wikimedia.org/wikipedia/en/3/3a/Bolton_Wanderers_FC_logo.svg",
  "Ipswich":             "https://upload.wikimedia.org/wikipedia/en/4/43/Ipswich_Town.svg",
  "Charlton":            "https://upload.wikimedia.org/wikipedia/en/e/e3/Charlton_Athletic_FC_logo.svg",
  "Blackpool":           "https://upload.wikimedia.org/wikipedia/en/d/d9/Blackpool_FC_logo.svg",
  "QPR":                 "https://upload.wikimedia.org/wikipedia/en/3/31/Queens_Park_Rangers_crest.svg",
  "West Brom":           "https://upload.wikimedia.org/wikipedia/en/8/8b/West_Bromwich_Albion.svg",
  "Wigan":               "https://upload.wikimedia.org/wikipedia/en/4/43/Wigan_Athletic.svg",
  "Swansea":             "https://upload.wikimedia.org/wikipedia/en/f/f9/Swansea_City_AFC_logo.svg",
  "Stoke":               "https://upload.wikimedia.org/wikipedia/en/2/29/Stoke_City_FC.svg",
  "Huddersfield":        "https://upload.wikimedia.org/wikipedia/en/c/c9/Huddersfield_Town_A.F.C._logo.svg",
  "Cardiff":             "https://upload.wikimedia.org/wikipedia/en/3/3c/Cardiff_City_crest_2015.svg",
  "Reading":             "https://upload.wikimedia.org/wikipedia/en/1/11/Reading_FC.svg",
  "Hull":                "https://upload.wikimedia.org/wikipedia/en/5/54/Hull_City_A.F.C._logo.svg",
  "Birmingham":          "https://upload.wikimedia.org/wikipedia/en/6/68/Birmingham_City_FC_logo.svg",
  "Portsmouth":          "https://upload.wikimedia.org/wikipedia/en/5/5c/Portsmouth_FC_logo.svg",
  "Wimbledon":           "https://upload.wikimedia.org/wikipedia/en/7/72/Wimbledon_FC_-_Badge.svg",
  "Bradford":            "https://upload.wikimedia.org/wikipedia/en/0/06/Bradford_City_AFC.svg",
  "Swindon":             "https://upload.wikimedia.org/wikipedia/en/e/eb/Swindon_Town_FC.svg",
  "Oldham":              "https://upload.wikimedia.org/wikipedia/en/8/8e/Oldham_Athletic_AFC.svg",
  "Luton":               "https://upload.wikimedia.org/wikipedia/en/9/9d/Luton_Town_logo.svg",
};

// ── Continent groupings (for nationality qualifier) ──────────
const CONTINENT_MAP = {
  // Europe
  "England":"European","Wales":"European","Scotland":"European",
  "Northern Ireland":"European","Republic of Ireland":"European","Ireland":"European",
  "France":"European","Germany":"European","Spain":"European","Italy":"European",
  "Portugal":"European","Netherlands":"European","Belgium":"European",
  "Sweden":"European","Norway":"European","Denmark":"European","Finland":"European",
  "Iceland":"European","Switzerland":"European","Austria":"European",
  "Czech Republic":"European","Slovakia":"European","Poland":"European",
  "Hungary":"European","Romania":"European","Bulgaria":"European",
  "Croatia":"European","Serbia":"European","Slovenia":"European",
  "Bosnia and Herzegovina":"European","Bosnia & Herzegovina":"European","Montenegro":"European",
  "North Macedonia":"European","Albania":"European","Kosovo":"European",
  "Greece":"European","Turkey":"European","Russia":"European",
  "Ukraine":"European","Belarus":"European","Georgia":"European",
  "Armenia":"European","Azerbaijan":"European","Estonia":"European",
  "Latvia":"European","Lithuania":"European","Moldova":"European",
  "Luxembourg":"European","Malta":"European","Cyprus":"European",
  // South America
  "Argentina":"South American","Brazil":"South American","Colombia":"South American",
  "Uruguay":"South American","Chile":"South American","Peru":"South American",
  "Ecuador":"South American","Venezuela":"South American","Paraguay":"South American",
  "Bolivia":"South American",
  // Africa
  "Cameroon":"African","Nigeria":"African","Ivory Coast":"African",
  "Cote D'Ivoire":"African","Cote d'Ivoire":"African",
  "Cote D\u2019Ivoire":"African","Cote d\u2019Ivoire":"African",
  "Ghana":"African","Senegal":"African","Mali":"African","Guinea":"African",
  "Togo":"African","South Africa":"African","Morocco":"African","Algeria":"African",
  "Tunisia":"African","Egypt":"African","DR Congo":"African","Congo":"African",
  "Zambia":"African","Zimbabwe":"African","Cape Verde":"African",
  "Burkina Faso":"African","Gabon":"African","Angola":"African",
  "Liberia":"African","Sierra Leone":"African","Sudan":"African",
  "Ethiopia":"African","Kenya":"African","Tanzania":"African",
  "Uganda":"African","Rwanda":"African","Mozambique":"African",
  "Equatorial Guinea":"African","Guinea-Bissau":"African","Benin":"African",
  "Seychelles":"African","Mauritania":"African","Gambia":"African",
  "Burundi":"African","Central African Republic":"African",
  // North/Central America & Caribbean
  "United States":"North American","USA":"North American","Canada":"North American",
  "Mexico":"North American","Jamaica":"North American",
  "Trinidad and Tobago":"North American","Trinidad & Tobago":"North American",
  "Costa Rica":"North American","Honduras":"North American",
  "Antigua and Barbuda":"North American","Antigua & Barbuda":"North American",
  "Grenada":"North American","Haiti":"North American","Curacao":"North American",
  "Bermuda":"North American","Barbados":"North American",
  "Dominican Republic":"North American","El Salvador":"North American",
  "Guatemala":"North American","Panama":"North American",
  "St Kitts and Nevis":"North American","St. Kitts & Nevis":"North American",
  "Guyana":"North American","Suriname":"North American",
  "Cuba":"North American","Guadeloupe":"North American","Martinique":"North American",
  "Montserrat":"North American",
  // Asia
  "South Korea":"Asian","Japan":"Asian","China":"Asian","Iran":"Asian",
  "Saudi Arabia":"Asian","Iraq":"Asian","Lebanon":"Asian","Jordan":"Asian",
  "Israel":"Asian","India":"Asian","Thailand":"Asian","Indonesia":"Asian",
  "Philippines":"Asian","Vietnam":"Asian","Malaysia":"Asian",
  "Uzbekistan":"Asian","Kazakhstan":"Asian","Syria":"Asian",
  "Pakistan":"Asian","Oman":"Asian","Bangladesh":"Asian",
  // Europe (extras)
  "Turkiye":"European","Turkey":"European","Gibraltar":"European",
  "Faroe Islands":"European",
  // Oceania
  "Australia":"Oceanian","New Zealand":"Oceanian",
};

// ── Relegated clubs per season ────────────────────────────────
const RELEGATED = {
  "1992-93": ["Crystal Palace","Middlesbrough","Nott'm Forest"],
  "1993-94": ["Sheffield United","Oldham","Swindon"],
  "1994-95": ["Crystal Palace","Norwich","Leicester","Ipswich"],
  "1995-96": ["Manchester City","QPR","Bolton"],
  "1996-97": ["Sunderland","Middlesbrough","Nott'm Forest"],
  "1997-98": ["Bolton","Barnsley","Crystal Palace"],
  "1998-99": ["Charlton","Blackburn Rovers","Nott'm Forest"],
  "1999-00": ["Wimbledon","Sheffield Wednesday","Watford"],
  "2000-01": ["Manchester City","Coventry","Bradford"],
  "2001-02": ["Ipswich","Derby","Leicester"],
  "2002-03": ["West Ham","West Brom","Sunderland"],
  "2003-04": ["Leicester","Leeds United","Wolves"],
  "2004-05": ["Crystal Palace","Norwich","Southampton"],
  "2005-06": ["Birmingham","West Brom","Sunderland"],
  "2006-07": ["Sheffield United","Charlton","Watford"],
  "2007-08": ["Reading","Birmingham","Derby"],
  "2008-09": ["Newcastle","Middlesbrough","West Brom"],
  "2009-10": ["Burnley","Hull","Portsmouth"],
  "2010-11": ["Birmingham","Blackpool","West Ham"],
  "2011-12": ["Bolton","Blackburn Rovers","Wolves"],
  "2012-13": ["Wigan","Reading","QPR"],
  "2013-14": ["Norwich","Fulham","Cardiff"],
  "2014-15": ["Hull","Burnley","QPR"],
  "2015-16": ["Newcastle","Norwich","Aston Villa"],
  "2016-17": ["Hull","Middlesbrough","Sunderland"],
  "2017-18": ["West Brom","Stoke","Swansea"],
  "2018-19": ["Huddersfield","Fulham","Cardiff"],
  "2019-20": ["Bournemouth","Watford","Norwich"],
  "2020-21": ["Fulham","West Brom","Sheffield United"],
  "2021-22": ["Norwich","Watford","Burnley"],
  "2022-23": ["Leicester","Leeds United","Southampton"],
  "2023-24": ["Burnley","Sheffield United","Luton"],
  "2024-25": ["Southampton","Ipswich","Leicester"],
  "2025-26": [],
};

// ── PL Title winners (used for qualifier checks) ─────────────
const PL_TITLE_WINNERS = {
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
  "2014-15": "Chelsea",           "2015-16": "Leicester",
  "2016-17": "Chelsea",           "2017-18": "Manchester City",
  "2018-19": "Manchester City",   "2019-20": "Liverpool",
  "2020-21": "Manchester City",   "2021-22": "Manchester City",
  "2022-23": "Manchester City",   "2023-24": "Manchester City",
  "2024-25": "Liverpool",
};

// Known award winners (expanded over time)
const GOLDEN_BOOT_WINNERS = {
  "1992-93": ["Teddy Sheringham","Les Ferdinand"],
  "1993-94": ["Andrew Cole"],
  "1994-95": ["Alan Shearer"],
  "1995-96": ["Alan Shearer"],
  "1996-97": ["Alan Shearer"],
  "1997-98": ["Dion Dublin","Michael Owen","Chris Sutton"],
  "1998-99": ["Jimmy Floyd Hasselbaink","Michael Owen","Dwight Yorke"],
  "1999-00": ["Kevin Phillips"],
  "2000-01": ["Jimmy Floyd Hasselbaink"],
  "2001-02": ["Thierry Henry"],
  "2002-03": ["Ruud van Nistelrooy"],
  "2003-04": ["Thierry Henry"],
  "2004-05": ["Thierry Henry"],
  "2005-06": ["Thierry Henry"],
  "2006-07": ["Didier Drogba"],
  "2007-08": ["Cristiano Ronaldo"],
  "2008-09": ["Nicolas Anelka"],
  "2009-10": ["Didier Drogba"],
  "2010-11": ["Carlos Tevez","Dimitar Berbatov"],
  "2011-12": ["Robin van Persie"],
  "2012-13": ["Robin van Persie"],
  "2013-14": ["Luis Suarez"],
  "2014-15": ["Harry Kane"],
  "2015-16": ["Harry Kane"],
  "2016-17": ["Harry Kane"],
  "2017-18": ["Mohamed Salah"],
  "2018-19": ["Mohamed Salah","Sadio Mane","Pierre-Emerick Aubameyang"],
  "2019-20": ["Jamie Vardy"],
  "2020-21": ["Harry Kane"],
  "2021-22": ["Son Heung-min","Mohamed Salah"],
  "2022-23": ["Erling Haaland"],
  "2023-24": ["Erling Haaland"],
  "2024-25": ["Mohamed Salah"],
};

// ── Built-in sample dataset (used until scraper is run) ──────
const SAMPLE_PLAYERS = [
  {
    id: "thierry-henry", name: "Thierry Henry",
    nationality: "France", position: "FW",
    seasons: [
      { season:"1999-00", seasonYear:1999, club:"Arsenal", apps:31, goals:17, assists:6,  minutes:2601, yellow_cards:2, red_cards:0, shots:89,  clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2000-01", seasonYear:2000, club:"Arsenal", apps:35, goals:17, assists:10, minutes:2979, yellow_cards:3, red_cards:0, shots:102, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2001-02", seasonYear:2001, club:"Arsenal", apps:33, goals:24, assists:8,  minutes:2753, yellow_cards:2, red_cards:0, shots:110, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"2002-03", seasonYear:2002, club:"Arsenal", apps:37, goals:24, assists:20, minutes:3178, yellow_cards:3, red_cards:0, shots:120, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2003-04", seasonYear:2003, club:"Arsenal", apps:37, goals:30, assists:13, minutes:3005, yellow_cards:2, red_cards:0, shots:130, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"2004-05", seasonYear:2004, club:"Arsenal", apps:32, goals:25, assists:14, minutes:2780, yellow_cards:4, red_cards:0, shots:115, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2005-06", seasonYear:2005, club:"Arsenal", apps:32, goals:27, assists:10, minutes:2758, yellow_cards:3, red_cards:0, shots:118, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2006-07", seasonYear:2006, club:"Arsenal", apps:17, goals:10, assists:6,  minutes:1417, yellow_cards:1, red_cards:0, shots:58,  clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
    ]
  },
  {
    id: "alan-shearer", name: "Alan Shearer",
    nationality: "England", position: "FW",
    seasons: [
      { season:"1992-93", seasonYear:1992, club:"Blackburn Rovers", apps:21, goals:16, assists:4, minutes:1780, yellow_cards:1, red_cards:0, shots:70, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"1993-94", seasonYear:1993, club:"Blackburn Rovers", apps:40, goals:31, assists:5, minutes:3476, yellow_cards:3, red_cards:0, shots:125, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"1994-95", seasonYear:1994, club:"Blackburn Rovers", apps:42, goals:34, assists:9, minutes:3700, yellow_cards:2, red_cards:0, shots:140, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"1995-96", seasonYear:1995, club:"Blackburn Rovers", apps:35, goals:31, assists:7, minutes:3032, yellow_cards:4, red_cards:0, shots:122, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"1996-97", seasonYear:1996, club:"Newcastle",        apps:31, goals:25, assists:6, minutes:2698, yellow_cards:2, red_cards:0, shots:105, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"1997-98", seasonYear:1997, club:"Newcastle",        apps:17, goals:2,  assists:2, minutes:1398, yellow_cards:1, red_cards:0, shots:42,  clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"1998-99", seasonYear:1998, club:"Newcastle",        apps:30, goals:14, assists:3, minutes:2498, yellow_cards:3, red_cards:0, shots:88,  clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"1999-00", seasonYear:1999, club:"Newcastle",        apps:37, goals:23, assists:4, minutes:3198, yellow_cards:2, red_cards:0, shots:112, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2000-01", seasonYear:2000, club:"Newcastle",        apps:19, goals:5,  assists:2, minutes:1498, yellow_cards:1, red_cards:0, shots:55,  clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2001-02", seasonYear:2001, club:"Newcastle",        apps:37, goals:23, assists:8, minutes:3198, yellow_cards:2, red_cards:0, shots:108, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2002-03", seasonYear:2002, club:"Newcastle",        apps:35, goals:17, assists:4, minutes:2998, yellow_cards:3, red_cards:0, shots:90,  clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2003-04", seasonYear:2003, club:"Newcastle",        apps:37, goals:22, assists:4, minutes:3098, yellow_cards:2, red_cards:0, shots:102, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2004-05", seasonYear:2004, club:"Newcastle",        apps:28, goals:7,  assists:2, minutes:2198, yellow_cards:1, red_cards:0, shots:62,  clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2005-06", seasonYear:2005, club:"Newcastle",        apps:30, goals:10, assists:3, minutes:2498, yellow_cards:2, red_cards:0, shots:78,  clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
    ]
  },
  {
    id: "wayne-rooney", name: "Wayne Rooney",
    nationality: "England", position: "FW",
    seasons: [
      { season:"2002-03", seasonYear:2002, club:"Everton",          apps:33, goals:6,  assists:4, minutes:2298, yellow_cards:4, red_cards:0, shots:72, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2003-04", seasonYear:2003, club:"Everton",          apps:34, goals:9,  assists:4, minutes:2598, yellow_cards:5, red_cards:0, shots:85, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2004-05", seasonYear:2004, club:"Manchester United", apps:29, goals:11, assists:9, minutes:2198, yellow_cards:5, red_cards:0, shots:88, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2005-06", seasonYear:2005, club:"Manchester United", apps:36, goals:16, assists:9, minutes:3012, yellow_cards:6, red_cards:0, shots:102, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2006-07", seasonYear:2006, club:"Manchester United", apps:35, goals:14, assists:8, minutes:2898, yellow_cards:7, red_cards:0, shots:98, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"2007-08", seasonYear:2007, club:"Manchester United", apps:27, goals:12, assists:6, minutes:2198, yellow_cards:4, red_cards:0, shots:85, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"2008-09", seasonYear:2008, club:"Manchester United", apps:30, goals:12, assists:4, minutes:2498, yellow_cards:5, red_cards:0, shots:88, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"2009-10", seasonYear:2009, club:"Manchester United", apps:32, goals:26, assists:9, minutes:2798, yellow_cards:4, red_cards:0, shots:112, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2010-11", seasonYear:2010, club:"Manchester United", apps:28, goals:11, assists:9, minutes:2298, yellow_cards:3, red_cards:0, shots:85, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"2011-12", seasonYear:2011, club:"Manchester United", apps:34, goals:27, assists:7, minutes:3012, yellow_cards:4, red_cards:0, shots:118, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2012-13", seasonYear:2012, club:"Manchester United", apps:27, goals:12, assists:8, minutes:2298, yellow_cards:3, red_cards:0, shots:88, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"2013-14", seasonYear:2013, club:"Manchester United", apps:29, goals:17, assists:9, minutes:2498, yellow_cards:4, red_cards:0, shots:102, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2014-15", seasonYear:2014, club:"Manchester United", apps:33, goals:12, assists:8, minutes:2798, yellow_cards:3, red_cards:0, shots:92, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2015-16", seasonYear:2015, club:"Manchester United", apps:28, goals:8,  assists:5, minutes:2198, yellow_cards:2, red_cards:0, shots:72, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2016-17", seasonYear:2016, club:"Manchester United", apps:25, goals:5,  assists:4, minutes:1898, yellow_cards:3, red_cards:0, shots:58, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2017-18", seasonYear:2017, club:"Everton",          apps:31, goals:10, assists:3, minutes:2498, yellow_cards:5, red_cards:0, shots:82, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
    ]
  },
  {
    id: "frank-lampard", name: "Frank Lampard",
    nationality: "England", position: "MF",
    seasons: [
      { season:"1995-96", seasonYear:1995, club:"West Ham", apps:1,  goals:0, assists:0, minutes:55,   yellow_cards:0, red_cards:0, shots:2,   clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"1996-97", seasonYear:1996, club:"West Ham", apps:18, goals:0, assists:2, minutes:1098, yellow_cards:2, red_cards:0, shots:22,  clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"1997-98", seasonYear:1997, club:"West Ham", apps:31, goals:4, assists:5, minutes:2498, yellow_cards:3, red_cards:0, shots:55,  clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"1998-99", seasonYear:1998, club:"West Ham", apps:38, goals:5, assists:6, minutes:3112, yellow_cards:4, red_cards:0, shots:68,  clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"1999-00", seasonYear:1999, club:"West Ham", apps:34, goals:7, assists:5, minutes:2798, yellow_cards:3, red_cards:0, shots:72,  clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2000-01", seasonYear:2000, club:"West Ham", apps:30, goals:7, assists:4, minutes:2398, yellow_cards:5, red_cards:0, shots:65,  clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2001-02", seasonYear:2001, club:"Chelsea",  apps:37, goals:5, assists:4, minutes:3012, yellow_cards:4, red_cards:0, shots:72,  clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2002-03", seasonYear:2002, club:"Chelsea",  apps:38, goals:6, assists:8, minutes:3212, yellow_cards:5, red_cards:0, shots:85,  clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2003-04", seasonYear:2003, club:"Chelsea",  apps:38, goals:10,assists:7, minutes:3312, yellow_cards:6, red_cards:0, shots:95,  clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2004-05", seasonYear:2004, club:"Chelsea",  apps:38, goals:13,assists:8, minutes:3312, yellow_cards:4, red_cards:0, shots:108, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"2005-06", seasonYear:2005, club:"Chelsea",  apps:35, goals:16,assists:8, minutes:3012, yellow_cards:3, red_cards:0, shots:115, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"2006-07", seasonYear:2006, club:"Chelsea",  apps:37, goals:11,assists:6, minutes:3112, yellow_cards:4, red_cards:0, shots:102, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2007-08", seasonYear:2007, club:"Chelsea",  apps:37, goals:10,assists:8, minutes:3112, yellow_cards:5, red_cards:0, shots:98,  clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2008-09", seasonYear:2008, club:"Chelsea",  apps:35, goals:12,assists:5, minutes:2898, yellow_cards:4, red_cards:0, shots:95,  clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2009-10", seasonYear:2009, club:"Chelsea",  apps:36, goals:22,assists:11,minutes:3012, yellow_cards:3, red_cards:0, shots:128, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"2010-11", seasonYear:2010, club:"Chelsea",  apps:30, goals:10,assists:5, minutes:2498, yellow_cards:4, red_cards:0, shots:88,  clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2011-12", seasonYear:2011, club:"Chelsea",  apps:25, goals:11,assists:3, minutes:2098, yellow_cards:5, red_cards:0, shots:85,  clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2012-13", seasonYear:2012, club:"Chelsea",  apps:29, goals:15,assists:6, minutes:2398, yellow_cards:4, red_cards:0, shots:98,  clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2013-14", seasonYear:2013, club:"Chelsea",  apps:13, goals:3, assists:4, minutes:898,  yellow_cards:2, red_cards:0, shots:35,  clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2014-15", seasonYear:2014, club:"Manchester City", apps:14, goals:6, assists:2, minutes:898, yellow_cards:1, red_cards:0, shots:38, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
    ]
  },
  {
    id: "steven-gerrard", name: "Steven Gerrard",
    nationality: "England", position: "MF",
    seasons: [
      { season:"1998-99", seasonYear:1998, club:"Liverpool", apps:12, goals:0, assists:3, minutes:688,  yellow_cards:1, red_cards:0, shots:15, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"1999-00", seasonYear:1999, club:"Liverpool", apps:29, goals:1, assists:5, minutes:2298, yellow_cards:4, red_cards:0, shots:45, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2000-01", seasonYear:2000, club:"Liverpool", apps:33, goals:7, assists:8, minutes:2698, yellow_cards:5, red_cards:0, shots:72, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2001-02", seasonYear:2001, club:"Liverpool", apps:28, goals:3, assists:5, minutes:2198, yellow_cards:3, red_cards:0, shots:55, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2002-03", seasonYear:2002, club:"Liverpool", apps:34, goals:5, assists:6, minutes:2798, yellow_cards:6, red_cards:0, shots:68, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2003-04", seasonYear:2003, club:"Liverpool", apps:34, goals:4, assists:7, minutes:2798, yellow_cards:5, red_cards:0, shots:65, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2004-05", seasonYear:2004, club:"Liverpool", apps:30, goals:7, assists:4, minutes:2498, yellow_cards:4, red_cards:0, shots:72, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2005-06", seasonYear:2005, club:"Liverpool", apps:32, goals:10,assists:8, minutes:2698, yellow_cards:4, red_cards:0, shots:85, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2006-07", seasonYear:2006, club:"Liverpool", apps:36, goals:7, assists:6, minutes:2998, yellow_cards:5, red_cards:0, shots:82, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2007-08", seasonYear:2007, club:"Liverpool", apps:34, goals:11,assists:5, minutes:2798, yellow_cards:6, red_cards:0, shots:90, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2008-09", seasonYear:2008, club:"Liverpool", apps:31, goals:16,assists:5, minutes:2598, yellow_cards:4, red_cards:0, shots:95, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2009-10", seasonYear:2009, club:"Liverpool", apps:33, goals:9, assists:6, minutes:2698, yellow_cards:5, red_cards:0, shots:82, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2010-11", seasonYear:2010, club:"Liverpool", apps:21, goals:4, assists:5, minutes:1598, yellow_cards:3, red_cards:0, shots:55, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2011-12", seasonYear:2011, club:"Liverpool", apps:25, goals:5, assists:8, minutes:1998, yellow_cards:4, red_cards:0, shots:65, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2012-13", seasonYear:2012, club:"Liverpool", apps:36, goals:9, assists:11,minutes:2998, yellow_cards:5, red_cards:0, shots:88, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2013-14", seasonYear:2013, club:"Liverpool", apps:34, goals:13,assists:10,minutes:2798, yellow_cards:3, red_cards:0, shots:92, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2014-15", seasonYear:2014, club:"Liverpool", apps:35, goals:9, assists:5, minutes:2898, yellow_cards:5, red_cards:0, shots:80, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
    ]
  },
  {
    id: "didier-drogba", name: "Didier Drogba",
    nationality: "Ivory Coast", position: "FW",
    seasons: [
      { season:"2004-05", seasonYear:2004, club:"Chelsea", apps:26, goals:10, assists:9, minutes:2298, yellow_cards:5, red_cards:0, shots:85, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"2005-06", seasonYear:2005, club:"Chelsea", apps:29, goals:12, assists:5, minutes:2498, yellow_cards:8, red_cards:1, shots:90, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"2006-07", seasonYear:2006, club:"Chelsea", apps:36, goals:20, assists:9, minutes:3012, yellow_cards:6, red_cards:1, shots:112, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2007-08", seasonYear:2007, club:"Chelsea", apps:24, goals:8,  assists:4, minutes:1898, yellow_cards:5, red_cards:0, shots:78, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2008-09", seasonYear:2008, club:"Chelsea", apps:24, goals:5,  assists:4, minutes:1798, yellow_cards:4, red_cards:0, shots:72, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2009-10", seasonYear:2009, club:"Chelsea", apps:32, goals:29, assists:8, minutes:2798, yellow_cards:7, red_cards:1, shots:128, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"2010-11", seasonYear:2010, club:"Chelsea", apps:36, goals:11, assists:6, minutes:2998, yellow_cards:5, red_cards:0, shots:95, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2011-12", seasonYear:2011, club:"Chelsea", apps:32, goals:5,  assists:8, minutes:2398, yellow_cards:3, red_cards:0, shots:72, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2014-15", seasonYear:2014, club:"Chelsea", apps:28, goals:3,  assists:4, minutes:1498, yellow_cards:3, red_cards:0, shots:55, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
    ]
  },
  {
    id: "sergio-aguero", name: "Sergio Aguero",
    nationality: "Argentina", position: "FW",
    seasons: [
      { season:"2011-12", seasonYear:2011, club:"Manchester City", apps:34, goals:23, assists:8,  minutes:2898, yellow_cards:4, red_cards:0, shots:120, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"2012-13", seasonYear:2012, club:"Manchester City", apps:30, goals:12, assists:4,  minutes:2198, yellow_cards:3, red_cards:0, shots:98,  clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2013-14", seasonYear:2013, club:"Manchester City", apps:23, goals:17, assists:5,  minutes:1798, yellow_cards:2, red_cards:0, shots:88,  clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"2014-15", seasonYear:2014, club:"Manchester City", apps:33, goals:26, assists:7,  minutes:2798, yellow_cards:5, red_cards:0, shots:128, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2015-16", seasonYear:2015, club:"Manchester City", apps:30, goals:24, assists:5,  minutes:2398, yellow_cards:4, red_cards:0, shots:115, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2016-17", seasonYear:2016, club:"Manchester City", apps:25, goals:20, assists:5,  minutes:2098, yellow_cards:3, red_cards:0, shots:105, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2017-18", seasonYear:2017, club:"Manchester City", apps:25, goals:21, assists:3,  minutes:2098, yellow_cards:2, red_cards:0, shots:108, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"2018-19", seasonYear:2018, club:"Manchester City", apps:33, goals:21, assists:8,  minutes:2698, yellow_cards:3, red_cards:0, shots:112, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"2019-20", seasonYear:2019, club:"Manchester City", apps:20, goals:16, assists:4,  minutes:1698, yellow_cards:2, red_cards:0, shots:88,  clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2020-21", seasonYear:2020, club:"Manchester City", apps:22, goals:10, assists:4,  minutes:1598, yellow_cards:1, red_cards:0, shots:72,  clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
    ]
  },
  {
    id: "harry-kane", name: "Harry Kane",
    nationality: "England", position: "FW",
    seasons: [
      { season:"2012-13", seasonYear:2012, club:"Tottenham", apps:3,  goals:0, assists:0, minutes:145,  yellow_cards:0, red_cards:0, shots:5,   clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2013-14", seasonYear:2013, club:"Tottenham", apps:10, goals:3, assists:1, minutes:398,  yellow_cards:0, red_cards:0, shots:22,  clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2014-15", seasonYear:2014, club:"Tottenham", apps:34, goals:21,assists:6, minutes:2798, yellow_cards:1, red_cards:0, shots:118, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2015-16", seasonYear:2015, club:"Tottenham", apps:38, goals:25,assists:5, minutes:3312, yellow_cards:4, red_cards:0, shots:130, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2016-17", seasonYear:2016, club:"Tottenham", apps:30, goals:29,assists:5, minutes:2698, yellow_cards:3, red_cards:0, shots:138, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2017-18", seasonYear:2017, club:"Tottenham", apps:37, goals:30,assists:2, minutes:3198, yellow_cards:3, red_cards:0, shots:145, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2018-19", seasonYear:2018, club:"Tottenham", apps:28, goals:17,assists:2, minutes:2298, yellow_cards:2, red_cards:0, shots:102, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2019-20", seasonYear:2019, club:"Tottenham", apps:29, goals:18,assists:2, minutes:2398, yellow_cards:4, red_cards:0, shots:108, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2020-21", seasonYear:2020, club:"Tottenham", apps:35, goals:23,assists:14,minutes:3012, yellow_cards:3, red_cards:0, shots:128, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2021-22", seasonYear:2021, club:"Tottenham", apps:34, goals:17,assists:9, minutes:2798, yellow_cards:5, red_cards:0, shots:112, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2022-23", seasonYear:2022, club:"Tottenham", apps:28, goals:30,assists:3, minutes:2398, yellow_cards:4, red_cards:0, shots:138, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
    ]
  },
  {
    id: "mohamed-salah", name: "Mohamed Salah",
    nationality: "Egypt", position: "FW",
    seasons: [
      { season:"2017-18", seasonYear:2017, club:"Liverpool", apps:36, goals:32, assists:10, minutes:3012, yellow_cards:1, red_cards:0, shots:138, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2018-19", seasonYear:2018, club:"Liverpool", apps:38, goals:22, assists:8,  minutes:3212, yellow_cards:1, red_cards:0, shots:115, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2019-20", seasonYear:2019, club:"Liverpool", apps:34, goals:19, assists:10, minutes:2798, yellow_cards:2, red_cards:0, shots:105, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"2020-21", seasonYear:2020, club:"Liverpool", apps:37, goals:22, assists:5,  minutes:3012, yellow_cards:3, red_cards:0, shots:118, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2021-22", seasonYear:2021, club:"Liverpool", apps:35, goals:23, assists:13, minutes:2798, yellow_cards:1, red_cards:0, shots:120, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2022-23", seasonYear:2022, club:"Liverpool", apps:32, goals:19, assists:12, minutes:2598, yellow_cards:2, red_cards:0, shots:108, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2023-24", seasonYear:2023, club:"Liverpool", apps:32, goals:18, assists:10, minutes:2598, yellow_cards:2, red_cards:0, shots:105, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2024-25", seasonYear:2024, club:"Liverpool", apps:37, goals:29, assists:18, minutes:3012, yellow_cards:2, red_cards:0, shots:140, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
    ]
  },
  {
    id: "kevin-de-bruyne", name: "Kevin De Bruyne",
    nationality: "Belgium", position: "MF",
    seasons: [
      { season:"2012-13", seasonYear:2012, club:"Chelsea",          apps:3,  goals:0, assists:0, minutes:88,   yellow_cards:0, red_cards:0, shots:5,   clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2015-16", seasonYear:2015, club:"Manchester City",  apps:25, goals:7, assists:16,minutes:2198, yellow_cards:4, red_cards:0, shots:88,  clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2016-17", seasonYear:2016, club:"Manchester City",  apps:36, goals:6, assists:18,minutes:3012, yellow_cards:5, red_cards:0, shots:95,  clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2017-18", seasonYear:2017, club:"Manchester City",  apps:37, goals:8, assists:16,minutes:3098, yellow_cards:2, red_cards:0, shots:102, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"2018-19", seasonYear:2018, club:"Manchester City",  apps:19, goals:2, assists:2, minutes:1398, yellow_cards:2, red_cards:0, shots:45,  clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"2019-20", seasonYear:2019, club:"Manchester City",  apps:35, goals:13,assists:20,minutes:2998, yellow_cards:2, red_cards:0, shots:115, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2020-21", seasonYear:2020, club:"Manchester City",  apps:25, goals:6, assists:12,minutes:1998, yellow_cards:1, red_cards:0, shots:85,  clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"2021-22", seasonYear:2021, club:"Manchester City",  apps:30, goals:15,assists:8, minutes:2498, yellow_cards:3, red_cards:0, shots:112, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"2022-23", seasonYear:2022, club:"Manchester City",  apps:32, goals:7, assists:16,minutes:2598, yellow_cards:2, red_cards:0, shots:95,  clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"2023-24", seasonYear:2023, club:"Manchester City",  apps:18, goals:3, assists:10,minutes:1398, yellow_cards:1, red_cards:0, shots:55,  clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
    ]
  },
  {
    id: "ryan-giggs", name: "Ryan Giggs",
    nationality: "Wales", position: "MF",
    seasons: [
      { season:"1992-93", seasonYear:1992, club:"Manchester United", apps:41, goals:9,  assists:12, minutes:3498, yellow_cards:2, red_cards:0, shots:75, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"1993-94", seasonYear:1993, club:"Manchester United", apps:38, goals:13, assists:12, minutes:3012, yellow_cards:3, red_cards:0, shots:82, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"1994-95", seasonYear:1994, club:"Manchester United", apps:29, goals:1,  assists:6,  minutes:2098, yellow_cards:4, red_cards:0, shots:55, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"1995-96", seasonYear:1995, club:"Manchester United", apps:33, goals:11, assists:10, minutes:2598, yellow_cards:3, red_cards:0, shots:72, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"1996-97", seasonYear:1996, club:"Manchester United", apps:26, goals:3,  assists:8,  minutes:1998, yellow_cards:2, red_cards:0, shots:55, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"1997-98", seasonYear:1997, club:"Manchester United", apps:29, goals:8,  assists:9,  minutes:2298, yellow_cards:2, red_cards:0, shots:65, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"1998-99", seasonYear:1998, club:"Manchester United", apps:24, goals:3,  assists:8,  minutes:1698, yellow_cards:3, red_cards:0, shots:52, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"1999-00", seasonYear:1999, club:"Manchester United", apps:30, goals:6,  assists:8,  minutes:2298, yellow_cards:2, red_cards:0, shots:62, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"2000-01", seasonYear:2000, club:"Manchester United", apps:31, goals:5,  assists:8,  minutes:2398, yellow_cards:4, red_cards:0, shots:58, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"2001-02", seasonYear:2001, club:"Manchester United", apps:25, goals:7,  assists:7,  minutes:1998, yellow_cards:3, red_cards:0, shots:62, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2002-03", seasonYear:2002, club:"Manchester United", apps:36, goals:8,  assists:10, minutes:2898, yellow_cards:2, red_cards:0, shots:68, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"2006-07", seasonYear:2006, club:"Manchester United", apps:30, goals:4,  assists:6,  minutes:2298, yellow_cards:2, red_cards:0, shots:52, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"2007-08", seasonYear:2007, club:"Manchester United", apps:26, goals:2,  assists:8,  minutes:1798, yellow_cards:3, red_cards:0, shots:42, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
    ]
  },
  {
    id: "peter-schmeichel", name: "Peter Schmeichel",
    nationality: "Denmark", position: "GK",
    seasons: [
      { season:"1992-93", seasonYear:1992, club:"Manchester United", apps:42, goals:0, assists:0, minutes:3780, yellow_cards:1, red_cards:0, shots:0, clean_sheets:22, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"1993-94", seasonYear:1993, club:"Manchester United", apps:40, goals:0, assists:0, minutes:3600, yellow_cards:2, red_cards:0, shots:0, clean_sheets:20, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"1994-95", seasonYear:1994, club:"Manchester United", apps:32, goals:0, assists:0, minutes:2880, yellow_cards:1, red_cards:0, shots:0, clean_sheets:14, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"1995-96", seasonYear:1995, club:"Manchester United", apps:36, goals:0, assists:0, minutes:3240, yellow_cards:0, red_cards:0, shots:0, clean_sheets:17, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"1996-97", seasonYear:1996, club:"Manchester United", apps:36, goals:0, assists:0, minutes:3240, yellow_cards:1, red_cards:0, shots:0, clean_sheets:18, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"1997-98", seasonYear:1997, club:"Manchester United", apps:32, goals:0, assists:0, minutes:2880, yellow_cards:0, red_cards:0, shots:0, clean_sheets:14, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"1998-99", seasonYear:1998, club:"Manchester United", apps:34, goals:0, assists:0, minutes:3060, yellow_cards:1, red_cards:0, shots:0, clean_sheets:16, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
    ]
  },
  {
    id: "jamie-vardy", name: "Jamie Vardy",
    nationality: "England", position: "FW",
    seasons: [
      { season:"2014-15", seasonYear:2014, club:"Leicester", apps:34, goals:5,  assists:4, minutes:2098, yellow_cards:3, red_cards:0, shots:65, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2015-16", seasonYear:2015, club:"Leicester", apps:36, goals:24, assists:6, minutes:3012, yellow_cards:5, red_cards:0, shots:118, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"2016-17", seasonYear:2016, club:"Leicester", apps:35, goals:13, assists:6, minutes:2798, yellow_cards:4, red_cards:0, shots:88, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2017-18", seasonYear:2017, club:"Leicester", apps:37, goals:20, assists:3, minutes:3012, yellow_cards:3, red_cards:0, shots:102, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2018-19", seasonYear:2018, club:"Leicester", apps:34, goals:18, assists:2, minutes:2698, yellow_cards:5, red_cards:0, shots:95, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2019-20", seasonYear:2019, club:"Leicester", apps:35, goals:23, assists:6, minutes:2898, yellow_cards:4, red_cards:0, shots:108, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2020-21", seasonYear:2020, club:"Leicester", apps:34, goals:15, assists:5, minutes:2698, yellow_cards:3, red_cards:0, shots:88, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2021-22", seasonYear:2021, club:"Leicester", apps:25, goals:14, assists:2, minutes:1898, yellow_cards:3, red_cards:0, shots:75, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
    ]
  },
  {
    id: "erling-haaland", name: "Erling Haaland",
    nationality: "Norway", position: "FW",
    seasons: [
      { season:"2022-23", seasonYear:2022, club:"Manchester City", apps:35, goals:36, assists:8, minutes:2798, yellow_cards:2, red_cards:0, shots:140, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"2023-24", seasonYear:2023, club:"Manchester City", apps:31, goals:27, assists:5, minutes:2498, yellow_cards:3, red_cards:0, shots:128, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"2024-25", seasonYear:2024, club:"Manchester City", apps:33, goals:22, assists:4, minutes:2698, yellow_cards:2, red_cards:0, shots:118, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
    ]
  },
  {
    id: "dennis-bergkamp", name: "Dennis Bergkamp",
    nationality: "Netherlands", position: "FW",
    seasons: [
      { season:"1995-96", seasonYear:1995, club:"Arsenal", apps:33, goals:11, assists:10, minutes:2798, yellow_cards:3, red_cards:0, shots:88, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"1996-97", seasonYear:1996, club:"Arsenal", apps:29, goals:12, assists:8,  minutes:2298, yellow_cards:2, red_cards:0, shots:85, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"1997-98", seasonYear:1997, club:"Arsenal", apps:28, goals:16, assists:7,  minutes:2198, yellow_cards:4, red_cards:0, shots:95, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"1998-99", seasonYear:1998, club:"Arsenal", apps:29, goals:12, assists:6,  minutes:2298, yellow_cards:2, red_cards:0, shots:85, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"1999-00", seasonYear:1999, club:"Arsenal", apps:28, goals:6,  assists:9,  minutes:2198, yellow_cards:3, red_cards:0, shots:72, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2000-01", seasonYear:2000, club:"Arsenal", apps:27, goals:9,  assists:6,  minutes:2098, yellow_cards:2, red_cards:0, shots:75, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2001-02", seasonYear:2001, club:"Arsenal", apps:33, goals:9,  assists:10, minutes:2698, yellow_cards:3, red_cards:0, shots:80, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"2002-03", seasonYear:2002, club:"Arsenal", apps:29, goals:4,  assists:8,  minutes:2098, yellow_cards:2, red_cards:0, shots:65, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"2003-04", seasonYear:2003, club:"Arsenal", apps:28, goals:4,  assists:9,  minutes:2098, yellow_cards:1, red_cards:0, shots:62, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
    ]
  },
  {
    id: "andrew-cole", name: "Andrew Cole",
    nationality: "England", position: "FW",
    seasons: [
      { season:"1992-93", seasonYear:1992, club:"Newcastle", apps:12, goals:12, assists:3, minutes:998,  yellow_cards:1, red_cards:0, shots:60,  clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"1993-94", seasonYear:1993, club:"Newcastle", apps:40, goals:34, assists:5, minutes:3412, yellow_cards:2, red_cards:0, shots:148, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"1994-95", seasonYear:1994, club:"Newcastle", apps:18, goals:9,  assists:3, minutes:1498, yellow_cards:1, red_cards:0, shots:72,  clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"1994-95", seasonYear:1994, club:"Manchester United", apps:18, goals:12, assists:4, minutes:1498, yellow_cards:1, red_cards:0, shots:65, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"1995-96", seasonYear:1995, club:"Manchester United", apps:34, goals:11, assists:6, minutes:2698, yellow_cards:3, red_cards:0, shots:88, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"1996-97", seasonYear:1996, club:"Manchester United", apps:19, goals:6,  assists:4, minutes:1298, yellow_cards:1, red_cards:0, shots:52, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"1997-98", seasonYear:1997, club:"Manchester United", apps:24, goals:16, assists:5, minutes:1898, yellow_cards:2, red_cards:0, shots:85, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:false },
      { season:"1998-99", seasonYear:1998, club:"Manchester United", apps:32, goals:17, assists:6, minutes:2498, yellow_cards:3, red_cards:0, shots:90, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"1999-00", seasonYear:1999, club:"Manchester United", apps:28, goals:19, assists:5, minutes:2298, yellow_cards:2, red_cards:0, shots:95, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
      { season:"2000-01", seasonYear:2000, club:"Manchester United", apps:19, goals:9,  assists:3, minutes:1298, yellow_cards:1, red_cards:0, shots:55, clean_sheets:null, saves:0, tackles_won:0, interceptions:0, clearances:0, big_chances_created:0, penalties_scored:0, hit_woodwork:0, accurate_passes:0, won_pl_title:true  },
    ]
  },
];

// ── Game State ────────────────────────────────────────────────
let players = [];
let rowValidAnswers = [];   // per-row sorted arrays of {player, season, statValue}
let activeRow = null;
let selectedPlayer = null;

const state = {
  rows: [],       // {submitted, givenUp, player, season, statValue, percentile}
  totalScore: 0,
  totalGuesses: 0,
  gameMode: 'normal',   // 'normal' = maximise | 'target' = hit the target
};

// ── History & Streak (localStorage) ──────────────────────────
const HISTORY_KEY = 'statpad_history';

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function loadHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '{}'); }
  catch { return {}; }
}

function saveHistory(history) {
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history)); } catch {}
}

function isGameComplete() {
  return state.rows.every(r => r.submitted || r.givenUp);
}

function saveResult() {
  if (!isGameComplete()) return;
  const TIER_EMOJI = { purple:'🟣', blue:'🔵', gold:'🟠', silver:'⬜', bronze:'🟫', '':'⬛' };
  const emojis = state.rows.map(r => {
    if (r.givenUp)   return '❌';
    if (!r.submitted) return '⬜';
    return TIER_EMOJI[getPercentileTier(r.percentile)] || '⬛';
  }).join('');

  const submitted = state.rows.filter(r => r.submitted && r.percentile !== null);
  const avgPct = submitted.length
    ? (submitted.reduce((s,r) => s + r.percentile, 0) / submitted.length).toFixed(1)
    : '0';

  const history = loadHistory();
  history[todayKey()] = {
    puzzleNumber: PUZZLE.puzzleNumber || '?',
    score:        state.totalScore,
    guesses:      state.totalGuesses,
    avgPct,
    emojis,
    mode:         PUZZLE.categoryMode || 'season',
    category:     PUZZLE.category,
    completed:    true,
  };
  saveHistory(history);
  updateStreakDisplay();
}

function getStreak() {
  const history = loadHistory();
  let streak = 0;
  const d = new Date();
  for (let i = 0; i < 365; i++) {
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    if (history[key] && history[key].completed) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

function updateStreakDisplay() {
  const streak = getStreak();
  const el = document.getElementById('streak-display');
  if (!el) return;
  el.textContent = streak > 0 ? `🔥 ${streak}` : '';
  el.title = streak === 1 ? '1 day streak' : `${streak} day streak`;
}

function renderHistoryInModal() {
  const el = document.getElementById('htp-history');
  if (!el) return;
  const history = loadHistory();
  const entries = [];
  const d = new Date();
  for (let i = 6; i >= 0; i--) {
    const dd = new Date(d);
    dd.setDate(d.getDate() - i);
    const key = `${dd.getFullYear()}-${String(dd.getMonth()+1).padStart(2,'0')}-${String(dd.getDate()).padStart(2,'0')}`;
    entries.push({ key, data: history[key] || null });
  }

  el.innerHTML = '';
  const hasAny = entries.some(e => e.data);
  if (!hasAny) {
    el.innerHTML = '<p style="color:#888;font-size:0.85rem">No history yet — play a puzzle to start tracking!</p>';
    return;
  }

  entries.forEach(({ key, data }) => {
    const row = document.createElement('div');
    row.className = 'htp-history-row';

    const dateEl = document.createElement('span');
    dateEl.className = 'htp-history-date';
    const [,mm,dd] = key.split('-');
    dateEl.textContent = `${mm}/${dd}`;

    const emojisEl = document.createElement('span');
    emojisEl.className = 'htp-history-emojis';
    emojisEl.textContent = data ? data.emojis : '· · · · ·';

    const scoreEl = document.createElement('span');
    scoreEl.className = 'htp-history-score';
    scoreEl.textContent = data ? data.score.toLocaleString() : '—';

    row.appendChild(dateEl);
    row.appendChild(emojisEl);
    row.appendChild(scoreEl);
    el.appendChild(row);
  });
}

// ── Utility ───────────────────────────────────────────────────
function seasonLabel(year) {
  // e.g. 2023 → "2023-24"
  const short = String(year + 1).slice(-2);
  return `${year}-${short}`;
}

function getCareerRange(player) {
  const years = player.seasons.map(s => s.seasonYear);
  return { min: Math.min(...years), max: Math.max(...years) };
}

function formatStatValue(val, categoryKey) {
  if (val === null || val === undefined) return '—';
  return String(val);
}

// ── Qualifier Checking ────────────────────────────────────────
function playerWonPLTitle(player) {
  return player.seasons.some(s => s.won_pl_title);
}

function playerWonGoldenBoot(player) {
  return player.seasons.some(s => {
    const winners = GOLDEN_BOOT_WINNERS[s.season] || [];
    return winners.includes(player.name);
  });
}

function seasonWonGoldenBoot(player, season) {
  const winners = GOLDEN_BOOT_WINNERS[season.season] || [];
  return winners.includes(player.name);
}

function checkQualifier(player, season, qualifier) {
  if (!qualifier) return true;
  // Support arrays of qualifiers — all must pass
  if (Array.isArray(qualifier)) {
    return qualifier.every(q => checkQualifier(player, season, q));
  }

  switch (qualifier.type) {
    case 'award': {
      const isTitle   = qualifier.award === 'pl_title';
      const isGBoot   = qualifier.award === 'golden_boot';
      if (qualifier.scope === 'career') {
        if (isTitle) return playerWonPLTitle(player);
        if (isGBoot) return playerWonGoldenBoot(player);
      } else {
        if (isTitle) return season.won_pl_title === true;
        if (isGBoot) return seasonWonGoldenBoot(player, season);
      }
      return false;
    }
    case 'min_stat': {
      const val = season[qualifier.key];
      return val !== null && val !== undefined && val >= qualifier.value;
    }
    case 'max_stat': {
      if (qualifier.scope === 'career') {
        const total = player.seasons.reduce((sum, s) => sum + (s[qualifier.key] || 0), 0);
        return total <= qualifier.value;
      }
      const val = season[qualifier.key];
      return val !== null && val !== undefined && val <= qualifier.value;
    }
    case 'nationality':
      return (player.nationality || '').toLowerCase() === qualifier.value.toLowerCase();
    case 'continent': {
      const playerContinent = CONTINENT_MAP[player.nationality] || '';
      return playerContinent.toLowerCase() === qualifier.value.toLowerCase();
    }
    case 'relegated': {
      const relegated = RELEGATED[season.season] || [];
      return relegated.includes(season.club);
    }
    case 'position': {
      const pPos = (player.position || '').toUpperCase();
      const pVal = qualifier.value.toUpperCase();
      // API stores 'G' for goalkeeper; also accept 'GK' in puzzle config
      if (pVal === 'GK') return pPos === 'G' || pPos === 'GK';
      return pPos.startsWith(pVal);
    }
    case 'outfield': {
      const pos = (player.position || '').toUpperCase();
      return pos !== 'G' && pos !== 'GK';
    }
    default:
      return true;
  }
}

// ── Player Matching ───────────────────────────────────────────
function getValidSeasons(player, rowConfig) {
  return player.seasons.filter(s => {
    if (rowConfig.clubs.length > 0 && !rowConfig.clubs.includes(s.club)) return false;
    if (s.seasonYear < rowConfig.seasonStart) return false;
    if (s.seasonYear > rowConfig.seasonEnd)   return false;
    if (!checkQualifier(player, s, rowConfig.qualifier)) return false;
    const statVal = s[PUZZLE.categoryKey];
    return statVal !== null && statVal !== undefined;
  });
}

function getBestSeason(validSeasons) {
  return validSeasons.reduce((best, s) => {
    return (!best || s[PUZZLE.categoryKey] > best[PUZZLE.categoryKey]) ? s : best;
  }, null);
}

// Returns {season, statValue} for the active mode.
// "season" mode  → best single season object + that season's stat.
// "career" mode  → null season (no single season to highlight) + sum across all valid seasons.
function getScoringResult(validSeasons) {
  const mode = (PUZZLE.categoryMode || 'season');
  if (mode === 'career') {
    const total = validSeasons.reduce((sum, s) => sum + (s[PUZZLE.categoryKey] || 0), 0);
    // Attach the year range for display purposes
    const years = validSeasons.map(s => s.seasonYear).sort((a, b) => a - b);
    return { season: { _careerMode: true, _firstYear: years[0], _lastYear: years[years.length - 1] }, statValue: total };
  }
  const best = getBestSeason(validSeasons);
  return { season: best, statValue: best[PUZZLE.categoryKey] };
}

// ── Pre-compute Valid Answers (for percentile) ────────────────
function computeAllValidAnswers() {
  rowValidAnswers = PUZZLE.rows.map(rowConfig => {
    const answers = [];
    for (const player of players) {
      const valid = getValidSeasons(player, rowConfig);
      if (!valid.length) continue;
      const { season, statValue } = getScoringResult(valid);
      answers.push({ player, season, statValue });
    }
    answers.sort((a, b) => a.statValue - b.statValue);
    return answers;
  });
}

function getPercentile(rowIdx, statValue) {
  const answers = rowValidAnswers[rowIdx];
  if (!answers || !answers.length) return 50;
  // If the submitted value matches the highest possible, it's always 100th percentile
  const maxVal = answers[answers.length - 1].statValue;
  if (statValue >= maxVal) return 100;
  const below = answers.filter(a => a.statValue < statValue).length;
  return Math.min(99, Math.round((below / answers.length) * 100));
}

function getBestPossible(rowIdx) {
  const answers = rowValidAnswers[rowIdx];
  if (!answers || !answers.length) return null;
  return answers[answers.length - 1];
}

// ── Grid Rendering ────────────────────────────────────────────
function renderGrid() {
  const grid = document.getElementById('game-grid');
  grid.innerHTML = '';

  PUZZLE.rows.forEach((rowConfig, i) => {
    const row = document.createElement('div');
    row.className = 'grid-row';
    row.dataset.rowIdx = i;

    row.appendChild(makeClubCell(rowConfig));
    row.appendChild(makeSeasonCell(rowConfig));
    row.appendChild(makeQualifierCell(rowConfig));
    row.appendChild(makeActionCell(i));

    grid.appendChild(row);
  });
}

function makeClubCell(rowConfig) {
  const cell = document.createElement('div');
  cell.className = 'grid-cell club-cell';

  const wrap = document.createElement('div');
  wrap.className = `club-badges-wrap${rowConfig.clubs.length > 1 ? ' multi' : ''}`;

  rowConfig.clubs.forEach(clubName => {
    const s = clubStyle(clubName);
    const logoUrl = CLUB_LOGOS[clubName];

    if (logoUrl) {
      // ── Crest image badge ───────────────────────────────────
      const badge = document.createElement('div');
      badge.className = 'club-badge club-badge-logo';
      badge.title = clubName;

      const img = document.createElement('img');
      img.src = logoUrl;
      img.alt = clubName;
      img.className = 'club-crest-img';

      // If the image fails to load, fall back to the coloured text badge
      img.onerror = function () {
        badge.classList.remove('club-badge-logo');
        badge.style.backgroundColor = s.bg;
        badge.style.color = s.fg;
        badge.textContent = s.abbr;
        badge.removeChild(img);
      };

      badge.appendChild(img);
      wrap.appendChild(badge);
    } else {
      // ── Fallback: coloured circle with abbreviation ─────────
      const badge = document.createElement('div');
      badge.className = 'club-badge';
      badge.style.backgroundColor = s.bg;
      badge.style.color = s.fg;
      badge.textContent = s.abbr;
      badge.title = clubName;
      wrap.appendChild(badge);
    }
  });

  cell.appendChild(wrap);
  return cell;
}

function makeSeasonCell(rowConfig) {
  const cell = document.createElement('div');
  cell.className = 'grid-cell season-cell';

  const text = document.createElement('div');
  text.className = 'season-text';

  if (rowConfig.seasonStart === rowConfig.seasonEnd || rowConfig.seasonEnd - rowConfig.seasonStart <= 1) {
    text.textContent = seasonLabel(rowConfig.seasonStart);
  } else {
    text.innerHTML = `${rowConfig.seasonStart}<span class="season-to">to</span>${rowConfig.seasonEnd}`;
  }

  cell.appendChild(text);
  return cell;
}

function makeQualifierCell(rowConfig) {
  const cell = document.createElement('div');
  cell.className = 'grid-cell qualifier-cell';

  const quals = !rowConfig.qualifier ? []
    : Array.isArray(rowConfig.qualifier) ? rowConfig.qualifier
    : [rowConfig.qualifier];

  quals.forEach(q => {
    const main = document.createElement('div');
    main.className = 'qualifier-main';
    main.textContent = q.display;

    const scope = document.createElement('div');
    scope.className = 'qualifier-scope';
    scope.textContent = q.scopeDisplay;

    cell.appendChild(main);
    cell.appendChild(scope);
  });

  return cell;
}

function makeActionCell(rowIdx) {
  const cell = document.createElement('div');
  cell.className = 'grid-cell add-player-cell';
  cell.dataset.rowIdx = rowIdx;

  const icon  = document.createElement('div');
  icon.className = 'add-player-icon';
  icon.textContent = '+';

  const label = document.createElement('div');
  label.className = 'add-player-label';
  label.textContent = 'add player';

  cell.appendChild(icon);
  cell.appendChild(label);

  cell.addEventListener('click', () => openModal(rowIdx));
  return cell;
}

function updateActionCell(rowIdx) {
  const row  = document.querySelector(`.grid-row[data-row-idx="${rowIdx}"]`);
  if (!row) return;

  const old  = row.querySelector('[data-row-idx]');
  const rowState = state.rows[rowIdx];

  let newCell;
  if (rowState.givenUp) {
    newCell = makeGaveUpCell(rowIdx);
  } else if (rowState.submitted) {
    newCell = makeResultCell(rowIdx);
  } else {
    newCell = makeActionCell(rowIdx);
  }
  old.replaceWith(newCell);
}

function makeResultCell(rowIdx) {
  const { player, season, statValue, percentile } = state.rows[rowIdx];
  const tier = getPercentileTier(percentile);

  const cell = document.createElement('div');
  cell.className = `grid-cell result-cell${tier ? ' tier-' + tier : ''}`;
  cell.dataset.rowIdx = rowIdx;

  // Chevron toggle
  const chevron = document.createElement('div');
  chevron.className = 'result-expand-btn';
  chevron.textContent = '▼';

  // Photo + name row
  const topRow = document.createElement('div');
  topRow.className = 'result-top-row';

  const avatar = makePlayerAvatar(player);

  const nameWrap = document.createElement('div');
  nameWrap.className = 'result-name-wrap';

  const name = document.createElement('div');
  name.className = 'result-player-name';
  name.textContent = player.name;

  nameWrap.appendChild(name);
  topRow.appendChild(avatar);
  topRow.appendChild(nameWrap);

  const seasonEl = document.createElement('div');
  seasonEl.className = 'result-season';
  if (season._careerMode) {
    const endYr = season._lastYear + 1;
    seasonEl.textContent = season._firstYear === season._lastYear
      ? `${season._firstYear}-${String(season._firstYear + 1).slice(-2)} · Career`
      : `${season._firstYear}–${endYr} · Career`;
  } else {
    seasonEl.textContent = season.season;
  }

  const statRow = document.createElement('div');
  statRow.className = 'result-stat-row';

  const val = document.createElement('div');
  val.className = 'result-stat-value';
  val.textContent = statValue;

  const unit = document.createElement('div');
  unit.className = 'result-stat-unit';
  unit.textContent = PUZZLE.categoryUnit + (statValue !== 1 ? 's' : '');

  statRow.appendChild(val);
  statRow.appendChild(unit);

  // Percentile bar
  const pWrap = document.createElement('div');
  pWrap.className = 'percentile-wrap';

  const pBg = document.createElement('div');
  pBg.className = 'percentile-bar-bg';
  const pFill = document.createElement('div');
  pFill.className = 'percentile-bar-fill';
  pFill.style.width = `${percentile}%`;
  pBg.appendChild(pFill);

  const pLabel = document.createElement('div');
  pLabel.className = 'percentile-label';
  const ordinal = (n) => {
    if (n >= 11 && n <= 13) return 'th';
    const s = ['th','st','nd','rd'];
    return s[n % 10] || 'th';
  };
  pLabel.textContent = `${percentile}${ordinal(percentile)} PERCENTILE`;

  pWrap.appendChild(pBg);
  pWrap.appendChild(pLabel);

  cell.appendChild(chevron);
  cell.appendChild(topRow);
  cell.appendChild(seasonEl);
  cell.appendChild(statRow);
  cell.appendChild(pWrap);

  // Click toggles the top-5 panel
  cell.addEventListener('click', () => toggleTop5Panel(rowIdx));

  return cell;
}

// ── Top-5 panel ───────────────────────────────────────────────
let openPanelRowIdx = null;

function toggleTop5Panel(rowIdx) {
  const grid = document.getElementById('game-grid');

  // Close any currently open panel
  if (openPanelRowIdx !== null) {
    const existingPanel = grid.querySelector(`.top5-panel[data-row-idx="${openPanelRowIdx}"]`);
    if (existingPanel) existingPanel.classList.remove('open');
    const existingCell = grid.querySelector(`.result-cell[data-row-idx="${openPanelRowIdx}"]`);
    if (existingCell) existingCell.classList.remove('expanded');

    if (openPanelRowIdx === rowIdx) {
      openPanelRowIdx = null;
      return;
    }
  }

  openPanelRowIdx = rowIdx;

  // Mark cell as expanded
  const cell = grid.querySelector(`.result-cell[data-row-idx="${rowIdx}"]`);
  if (cell) cell.classList.add('expanded');

  // Find or create the panel (inserted right after the grid-row)
  let panel = grid.querySelector(`.top5-panel[data-row-idx="${rowIdx}"]`);
  if (!panel) {
    panel = buildTop5Panel(rowIdx);
    const gridRow = grid.querySelector(`.grid-row[data-row-idx="${rowIdx}"]`);
    gridRow.insertAdjacentElement('afterend', panel);
  }

  requestAnimationFrame(() => panel.classList.add('open'));
}

function buildTop5Panel(rowIdx) {
  const rowConfig  = PUZZLE.rows[rowIdx];
  const submitted  = state.rows[rowIdx];
  const top5       = [...(rowValidAnswers[rowIdx] || [])].reverse().slice(0, 5);

  const panel = document.createElement('div');
  panel.className = 'top5-panel';
  panel.dataset.rowIdx = rowIdx;

  // Row constraint summary
  const constraints = document.createElement('div');
  constraints.className = 'top5-constraints';
  const clubStr = rowConfig.clubs.length ? rowConfig.clubs.join(' / ') : 'Any';
  const yrStr   = rowConfig.seasonStart === rowConfig.seasonEnd
    ? seasonLabel(rowConfig.seasonStart)
    : `${rowConfig.seasonStart}–${rowConfig.seasonEnd}`;
  const qualArr = !rowConfig.qualifier ? [] : Array.isArray(rowConfig.qualifier) ? rowConfig.qualifier : [rowConfig.qualifier];
  const qualStr = qualArr.length ? qualArr.map(q => q.display).join(' + ') : 'None';
  constraints.textContent = `Clubs: ${clubStr}  ·  Years: ${yrStr}  ·  Qual: ${qualStr}`;

  // Top-5 list
  const list = document.createElement('div');
  list.className = 'top5-list';

  top5.forEach((answer, i) => {
    const isSubmitted = answer.player.name === submitted.player.name;
    const item = document.createElement('div');
    item.className = `top5-item${isSubmitted ? ' is-submitted' : ''}`;

    const rank  = document.createElement('span');
    rank.className = 'top5-rank';
    rank.textContent = `${i + 1}.`;

    const name = document.createElement('span');
    name.className = 'top5-name';
    name.textContent = answer.player.name;

    const szn = document.createElement('span');
    szn.className = 'top5-szn';
    if (answer.season._careerMode) {
      const end = answer.season._lastYear + 1;
      szn.textContent = answer.season._firstYear === answer.season._lastYear
        ? `${answer.season._firstYear}`
        : `${answer.season._firstYear}–${end}`;
    } else {
      szn.textContent = answer.season.season;
    }

    const club = document.createElement('span');
    club.className = 'top5-club';
    club.textContent = answer.season._careerMode ? 'Career' : clubStyle(answer.season.club).abbr;

    const valEl = document.createElement('span');
    valEl.className = 'top5-val';
    valEl.textContent = answer.statValue;

    item.appendChild(rank);
    item.appendChild(name);
    item.appendChild(szn);
    item.appendChild(club);
    item.appendChild(valEl);
    list.appendChild(item);
  });

  panel.appendChild(constraints);
  panel.appendChild(list);
  return panel;
}

function makeGaveUpCell(rowIdx) {
  const cell = document.createElement('div');
  cell.className = 'grid-cell gave-up-cell';

  const label = document.createElement('div');
  label.className = 'gave-up-label';
  label.textContent = 'SKIPPED';

  const best = getBestPossible(rowIdx);
  if (best) {
    const hint = document.createElement('div');
    hint.className = 'gave-up-best';
    hint.textContent = `Best: ${best.player.name} (${best.statValue})`;
    cell.appendChild(label);
    cell.appendChild(hint);
  } else {
    cell.appendChild(label);
  }

  return cell;
}

// ── Score Display ─────────────────────────────────────────────
function updateScoreDisplay() {
  const target  = PUZZLE.target;
  const score   = state.totalScore;
  const offByEl = document.getElementById('off-by-display');
  const offByLb = document.getElementById('off-by-label');

  document.getElementById('total-score').textContent = score.toLocaleString();

  if (state.gameMode === 'target' && target != null) {
    // ── Target mode: show how far off the target you are ──
    const diff = target - score;
    if (score === 0) {
      offByEl.textContent = '—';
      offByEl.style.color = '';
      offByLb.textContent = 'OFF BY';
    } else if (diff === 0) {
      offByEl.textContent = '🎯';
      offByEl.style.color = '#22c55e';
      offByLb.textContent = 'EXACT!';
    } else if (diff > 0) {
      offByEl.textContent = '+' + diff.toLocaleString();
      offByEl.style.color = '#94a3b8';
      offByLb.textContent = 'REMAINING';
    } else {
      offByEl.textContent = diff.toLocaleString();
      offByEl.style.color = '#ef4444';
      offByLb.textContent = 'OVER BY';
    }
  } else {
    // ── Normal mode: show guesses ──
    offByEl.textContent = state.totalGuesses;
    offByEl.style.color = '';
    offByLb.textContent = 'GUESSES';
  }
}

// ── Player Search ─────────────────────────────────────────────
// Strip accents so "Ruben" matches "Rúben", "Seamus" matches "Séamus", etc.
function normaliseSearch(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

// ── Player photo ─────────────────────────────────────────────
function playerPhotoUrl(playerId) {
  return `https://resources.premierleague.com/premierleague/photos/players/110x140/p${playerId}.png`;
}

function makePlayerAvatar(player) {
  const wrap = document.createElement('div');
  wrap.className = 'player-avatar';

  const img = document.createElement('img');
  img.src     = playerPhotoUrl(player.id);
  img.alt     = player.name;
  img.className = 'player-avatar-img';

  // On error show initials fallback
  img.onerror = () => {
    img.remove();
    const initials = player.name
      .split(' ')
      .map(w => w[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase();
    wrap.textContent = initials;
    wrap.classList.add('player-avatar-initials');
  };

  wrap.appendChild(img);
  return wrap;
}

function searchPlayers(query) {
  if (!query || query.length < 2) return [];
  const q = normaliseSearch(query);
  return players
    .filter(p => normaliseSearch(p.name).includes(q))
    .slice(0, 8);
}

function renderSearchResults(results) {
  const container = document.getElementById('search-results');
  const hint      = document.getElementById('search-hint');
  container.innerHTML = '';
  selectedPlayer = null;
  document.getElementById('btn-submit').disabled = true;

  if (!results.length) {
    hint.textContent = 'No players found. Try a different spelling.';
    hint.style.display = 'block';
    return;
  }

  hint.style.display = 'none';

  results.forEach(player => {
    const item = document.createElement('div');
    item.className = 'search-result-item';
    item.dataset.playerId = player.id;

    const range = getCareerRange(player);
    const endYear = range.max + 1; // e.g. seasonYear 2023 → "2024" displayed

    const name = document.createElement('span');
    name.className = 'result-name';
    name.textContent = player.name;

    const years = document.createElement('span');
    years.className = 'result-years';
    years.textContent = `${range.min} – ${endYear}`;

    item.appendChild(name);
    item.appendChild(years);

    item.addEventListener('click', () => selectPlayer(player, item));
    container.appendChild(item);
  });
}

function selectPlayer(player, el) {
  document.querySelectorAll('.search-result-item').forEach(i => i.classList.remove('selected'));
  el.classList.add('selected');
  selectedPlayer = player;
  document.getElementById('btn-submit').disabled = false;
  clearError();
}

// ── Modal ─────────────────────────────────────────────────────
function openModal(rowIdx) {
  if (state.rows[rowIdx].submitted || state.rows[rowIdx].givenUp) return;
  activeRow = rowIdx;
  selectedPlayer = null;

  const overlay = document.getElementById('modal-overlay');
  overlay.classList.remove('hidden');

  document.getElementById('player-search').value = '';
  document.getElementById('search-results').innerHTML = '';
  document.getElementById('search-hint').textContent = 'Start typing to search all Premier League players.';
  document.getElementById('search-hint').style.display = 'block';
  document.getElementById('search-clear').classList.add('hidden');
  document.getElementById('btn-submit').disabled = true;
  clearError();

  setTimeout(() => document.getElementById('player-search').focus(), 80);
}

function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
  activeRow = null;
  selectedPlayer = null;
}

function showError(msg) {
  const el = document.getElementById('search-error');
  el.textContent = msg;
  el.classList.remove('hidden');
}

function clearError() {
  document.getElementById('search-error').classList.add('hidden');
}

function handleSubmit() {
  if (!selectedPlayer || activeRow === null) return;
  clearError();

  const rowConfig = PUZZLE.rows[activeRow];
  const validSeasons = getValidSeasons(selectedPlayer, rowConfig);

  if (!validSeasons.length) {
    const clubs = rowConfig.clubs.length ? rowConfig.clubs.join(' / ') : 'any Premier League club';
    const qualArr = !rowConfig.qualifier ? [] : Array.isArray(rowConfig.qualifier) ? rowConfig.qualifier : [rowConfig.qualifier];
    const qual  = qualArr.length ? ` and meets the "${qualArr.map(q => q.display).join(' + ')}" requirement` : '';
    showError(`${selectedPlayer.name} didn't play for ${clubs} in that season range${qual}.`);
    return;
  }

  const { season: bestSeason, statValue } = getScoringResult(validSeasons);
  const percentile = getPercentile(activeRow, statValue);

  state.rows[activeRow] = {
    submitted: true,
    givenUp: false,
    player: selectedPlayer,
    season: bestSeason,
    statValue,
    percentile,
  };

  state.totalScore  += statValue;
  state.totalGuesses += 1;

  updateActionCell(activeRow);
  updateScoreDisplay();
  if (isGameComplete()) saveResult();
  closeModal();
}

function handleGiveUp() {
  if (activeRow === null) return;
  state.rows[activeRow] = { submitted: false, givenUp: true, player: null, season: null, statValue: null, percentile: null };
  updateActionCell(activeRow);
  updateScoreDisplay();
  if (isGameComplete()) saveResult();
  closeModal();
}

// ── Target Modal ──────────────────────────────────────────────
function renderTargetModal() {
  const el = document.getElementById('target-display-modal');
  el.innerHTML = '';

  const target = PUZZLE.target;
  const mode   = (PUZZLE.categoryMode || 'season') === 'career' ? 'Career' : 'Season';
  const score  = state.totalScore;

  if (target == null) {
    el.innerHTML = '<p style="color:#aaa;text-align:center">No target set for this puzzle.</p>';
    return;
  }

  const big = document.createElement('div');
  big.className = 'target-big-number';
  big.textContent = target.toLocaleString();
  el.appendChild(big);

  const sub = document.createElement('div');
  sub.className = 'target-big-unit';
  sub.textContent = `${mode} ${PUZZLE.category}`;
  el.appendChild(sub);

  if (score > 0) {
    const diff    = target - score;
    const absDiff = Math.abs(diff);
    const status  = document.createElement('div');
    status.className = 'target-status';
    if (diff === 0) {
      status.textContent = '🎯 Perfect! You hit the target exactly.';
      status.style.color = '#22c55e';
    } else if (diff > 0) {
      status.textContent = `Your score: ${score.toLocaleString()} · ${diff.toLocaleString()} short`;
      status.style.color = '#94a3b8';
    } else {
      status.textContent = `Your score: ${score.toLocaleString()} · ${absDiff.toLocaleString()} over`;
      status.style.color = '#ef4444';
    }
    el.appendChild(status);
  } else {
    const hint = document.createElement('div');
    hint.className = 'target-status';
    hint.textContent = 'Pick players to get as close to this number as possible.';
    hint.style.color = '#aaa';
    el.appendChild(hint);
  }
}

// ── Share ─────────────────────────────────────────────────────
function handleShare() {
  const TIER_EMOJI = {
    purple: '🟣',
    blue:   '🔵',
    gold:   '🟠',
    silver: '⬜',
    bronze: '🟫',
    '':     '⬛',
  };

  const puzzleNum = PUZZLE.puzzleNumber || '?';
  const mode      = (PUZZLE.categoryMode || 'season') === 'career' ? 'Career' : 'Season';
  const score     = state.totalScore.toLocaleString();
  const guesses   = state.totalGuesses;

  // Average percentile across submitted rows only
  const submitted = state.rows.filter(r => r.submitted && r.percentile !== null);
  const avgPct    = submitted.length
    ? (submitted.reduce((s, r) => s + r.percentile, 0) / submitted.length).toFixed(1)
    : '—';

  // One emoji per row
  const emojis = state.rows.map(r => {
    if (r.givenUp) return '❌';
    if (!r.submitted) return '⬜';
    return TIER_EMOJI[getPercentileTier(r.percentile)] || '⬛';
  }).join('');

  const lines = [
    `⚽ StatpadGame #${puzzleNum}`,
    ``,
    `Score: ${score} ${mode} ${PUZZLE.category}`,
  ];
  if (state.gameMode === 'target' && PUZZLE.target != null) {
    const diff = PUZZLE.target - state.totalScore;
    lines.push(`Target: ${PUZZLE.target.toLocaleString()}`);
    lines.push(diff === 0 ? `Result: 🎯 Exact!` : `Off by: ${Math.abs(diff).toLocaleString()}${diff < 0 ? ' (over)' : ''}`);
  }
  lines.push(`Guesses: ${guesses}`);
  lines.push(`Percentile: ${avgPct}%`);
  lines.push(emojis);
  const text = lines.join('\n');

  const label = document.getElementById('share-btn-label');

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      label.textContent = 'COPIED!';
      setTimeout(() => { label.textContent = 'SHARE'; }, 2000);
    });
  } else {
    // Fallback for browsers without clipboard API
    prompt('Copy your result:', text);
  }
}

// ── Initialisation ────────────────────────────────────────────
function init() {
  // Load player data: prefer scraped data, fall back to sample
  if (window.PLAYERS_DATA && window.PLAYERS_DATA.players && window.PLAYERS_DATA.players.length) {
    players = window.PLAYERS_DATA.players;
  } else {
    players = SAMPLE_PLAYERS;
    console.info('StatpadGame: using built-in sample dataset. Run scraper.py to load full data.');
  }

  // Initialise row state
  state.rows = PUZZLE.rows.map(() => ({
    submitted: false, givenUp: false,
    player: null, season: null, statValue: null, percentile: null,
  }));

  // Set category display
  // Score bar target display
  const targetEl = document.getElementById('target-display');
  const targetLb = document.getElementById('target-label');
  if (PUZZLE.target != null) {
    targetEl.textContent = PUZZLE.target.toLocaleString();
    targetLb.textContent = PUZZLE.category.toUpperCase();
  } else {
    targetEl.textContent = '—';
    targetLb.textContent = 'TARGET';
  }

  // Render
  renderGrid();
  computeAllValidAnswers();
  updateScoreDisplay();
  updateStreakDisplay();
  setupEventListeners();
}

function setupEventListeners() {
  // Search input
  const searchInput = document.getElementById('player-search');
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim();
    document.getElementById('search-clear').classList.toggle('hidden', q.length === 0);
    clearError();
    if (q.length < 2) {
      document.getElementById('search-results').innerHTML = '';
      document.getElementById('search-hint').textContent = 'Type at least 2 characters…';
      document.getElementById('search-hint').style.display = 'block';
      selectedPlayer = null;
      document.getElementById('btn-submit').disabled = true;
      return;
    }
    renderSearchResults(searchPlayers(q));
  });

  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && selectedPlayer) handleSubmit();
  });

  document.getElementById('search-clear').addEventListener('click', () => {
    searchInput.value = '';
    searchInput.focus();
    document.getElementById('search-results').innerHTML = '';
    document.getElementById('search-hint').style.display = 'block';
    document.getElementById('search-clear').classList.add('hidden');
    selectedPlayer = null;
    document.getElementById('btn-submit').disabled = true;
  });

  // Modal buttons
  document.getElementById('btn-submit').addEventListener('click', handleSubmit);
  document.getElementById('btn-give-up').addEventListener('click', handleGiveUp);
  document.getElementById('modal-close-btn').addEventListener('click', closeModal);

  // Close overlay on backdrop click
  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modal-overlay')) closeModal();
  });

  // How To Play
  document.getElementById('btn-how-to-play').addEventListener('click', () => {
    renderHistoryInModal();
    document.getElementById('htp-overlay').classList.remove('hidden');
  });
  document.getElementById('htp-close-btn').addEventListener('click', () => {
    document.getElementById('htp-overlay').classList.add('hidden');
  });
  document.getElementById('htp-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('htp-overlay'))
      document.getElementById('htp-overlay').classList.add('hidden');
  });

  // Target
  document.getElementById('btn-target').addEventListener('click', () => {
    if (PUZZLE.target == null) return;   // no target configured — do nothing
    state.gameMode = state.gameMode === 'target' ? 'normal' : 'target';
    const btn = document.getElementById('btn-target');
    btn.classList.toggle('active-mode', state.gameMode === 'target');
    updateScoreDisplay();
  });

  // Share
  document.getElementById('btn-share').addEventListener('click', handleShare);

  // Keyboard: Escape closes any open modal
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal();
      document.getElementById('htp-overlay').classList.add('hidden');
    }
  });
}

// ── Entry Point ───────────────────────────────────────────────
// Wait for players_data.js to (potentially) load before init
window.addEventListener('DOMContentLoaded', () => {
  // Give async script tag a moment to execute if present
  setTimeout(init, 150);
});
