/* player_photos_extra.js
   Supplemental photo URLs for historical Premier League players
   not covered by the current-season FPL photo database.
   Keys: accent-stripped, lowercased player names.
   Falls back gracefully to initials if any URL fails to load.
*/
(function () {
  var BASE = 'https://en.wikipedia.org/w/index.php?title=Special:Redirect/file/';
  var W    = '&width=110';

  window.EXTRA_PLAYER_PHOTOS = {
    // ── 1990s legends ──────────────────────────────────────────
    'alan shearer':           BASE + 'Alan_Shearer.jpg'               + W,
    'thierry henry':          BASE + 'Thierry_Henry.jpg'              + W,
    'eric cantona':           BASE + 'Eric_Cantona.jpg'               + W,
    'ryan giggs':             BASE + 'Ryan_Giggs.jpg'                 + W,
    'paul scholes':           BASE + 'Paul_Scholes.jpg'               + W,
    'roy keane':              BASE + 'Roy_Keane.jpg'                  + W,
    'peter schmeichel':       BASE + 'Peter_Schmeichel.jpg'           + W,
    'dennis bergkamp':        BASE + 'Dennis_Bergkamp.jpg'            + W,
    'patrick vieira':         BASE + 'Patrick_Vieira.jpg'             + W,
    'robbie fowler':          BASE + 'Robbie_Fowler.jpg'              + W,
    'les ferdinand':          BASE + 'Les_Ferdinand.jpg'              + W,
    'ian wright':             BASE + 'Ian_Wright.jpg'                 + W,
    'gianfranco zola':        BASE + 'Gianfranco_Zola.jpg'            + W,
    'david ginola':           BASE + 'David_Ginola.jpg'               + W,
    'teddy sheringham':       BASE + 'Teddy_Sheringham.jpg'           + W,
    'peter beardsley':        BASE + 'Peter_Beardsley.jpg'            + W,
    'matt le tissier':        BASE + 'Matt_Le_Tissier.jpg'            + W,
    'brian deane':            BASE + 'Brian_Deane.jpg'                + W,
    'stan collymore':         BASE + 'Stan_Collymore.jpg'             + W,
    'dion dublin':            BASE + 'Dion_Dublin.jpg'                + W,
    // ── 2000s legends ──────────────────────────────────────────
    'michael owen':           BASE + 'Michael_Owen.jpg'               + W,
    'david beckham':          BASE + 'David_Beckham.jpg'              + W,
    'ruud van nistelrooy':    BASE + 'Ruud_van_Nistelrooy.jpg'        + W,
    'emile heskey':           BASE + 'Emile_Heskey.jpg'               + W,
    'nicolas anelka':         BASE + 'Nicolas_Anelka.jpg'             + W,
    'robert pires':           BASE + 'Robert_Pires.jpg'               + W,
    'freddie ljungberg':      BASE + 'Freddie_Ljungberg.jpg'          + W,
    'sylvain wiltord':        BASE + 'Sylvain_Wiltord.jpg'            + W,
    'jimmy floyd hasselbaink':BASE + 'Jimmy_Floyd_Hasselbaink.jpg'    + W,
    'andy cole':              BASE + 'Andrew_Cole.jpg'                + W,
    'andrew cole':            BASE + 'Andrew_Cole.jpg'                + W,
    'dwight yorke':           BASE + 'Dwight_Yorke.jpg'               + W,
    'steve mcmanaman':        BASE + 'Steve_McManaman.jpg'            + W,
    'chris sutton':           BASE + 'Chris_Sutton.jpg'               + W,
    'kevin phillips':         BASE + 'Kevin_Phillips.jpg'             + W,
    'darren anderton':        BASE + 'Darren_Anderton.jpg'            + W,
    'ledley king':            BASE + 'Ledley_King.jpg'                + W,
    'sol campbell':           BASE + 'Sol_Campbell.jpg'               + W,
    // ── 2005–2015 era ──────────────────────────────────────────
    'wayne rooney':           BASE + 'Wayne_Rooney.jpg'               + W,
    'frank lampard':          BASE + 'Frank_Lampard.jpg'              + W,
    'steven gerrard':         BASE + 'Steven_Gerrard.jpg'             + W,
    'didier drogba':          BASE + 'Didier_Drogba.jpg'              + W,
    'john terry':             BASE + 'John_Terry.jpg'                 + W,
    'rio ferdinand':          BASE + 'Rio_Ferdinand.jpg'              + W,
    'ashley cole':            BASE + 'Ashley_Cole.jpg'                + W,
    'peter crouch':           BASE + 'Peter_Crouch.jpg'               + W,
    'darren bent':            BASE + 'Darren_Bent.jpg'                + W,
    'shaun wright-phillips':  BASE + 'Shaun_Wright-Phillips.jpg'      + W,
    'james milner':           BASE + 'James_Milner.jpg'               + W,
    'dimitar berbatov':       BASE + 'Dimitar_Berbatov.jpg'           + W,
    'carlos tevez':           BASE + 'Carlos_Tevez.jpg'               + W,
    'michael ballack':        BASE + 'Michael_Ballack.jpg'            + W,
    'robinho':                BASE + 'Robinho.jpg'                    + W,
    'samir nasri':            BASE + 'Samir_Nasri.jpg'                + W,
    'gareth barry':           BASE + 'Gareth_Barry.jpg'               + W,
    'scott parker':           BASE + 'Scott_Parker.jpg'               + W,
    'michael carrick':        BASE + 'Michael_Carrick.jpg'            + W,
    'louis saha':             BASE + 'Louis_Saha.jpg'                 + W,
    'darius vassell':         BASE + 'Darius_Vassell.jpg'             + W,
  };
})();
