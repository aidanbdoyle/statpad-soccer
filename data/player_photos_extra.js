/* player_photos_extra.js
   PL CDN photo URL overrides for players where the standard code lookup would
   return the wrong player (shared surnames, etc.).
   Keys: accent-stripped, lowercased player names.
   Only resources.premierleague.com URLs are used — all other sources are
   rejected by the game in favour of the silhouette.
*/
(function () {
  window.EXTRA_PLAYER_PHOTOS = {
    // Welsh Aaron Ramsey — overrides the Burnley player of the same name in fpl_codes
    'aaron ramsey': 'https://resources.premierleague.com/premierleague/photos/players/110x140/p41792.png',
    // David Silva — manually pinned PL CDN code
    'david silva':  'https://resources.premierleague.com/premierleague/photos/players/110x140/p20664.png',
    // Tim Howard — pre-vaastav era, manually added
    'tim howard':   'https://resources.premierleague.com/premierleague/photos/players/110x140/p15337.png',
    // Alisson — PL CDN uses premierleague25 path (no 'p' prefix) for this player
    'alisson':        'https://resources.premierleague.com/premierleague25/photos/players/110x140/116535.png',
    'alisson becker': 'https://resources.premierleague.com/premierleague25/photos/players/110x140/116535.png',
  };
})();
