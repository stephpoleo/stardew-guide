export const SEASON_COLORS = {
  Spring:       { bg: "#fce4ec", accent: "#c2185b", text: "#880e4f", icon: "\ud83c\udf38" },
  Summer:       { bg: "#e3f2fd", accent: "#1565c0", text: "#0d47a1", icon: "\u2600\ufe0f" },
  Fall:         { bg: "#fff3e0", accent: "#e65100", text: "#bf360c", icon: "\ud83c\udf42" },
  "Year-Round": { bg: "#f3e5f5", accent: "#6a1b9a", text: "#4a148c", icon: "\ud83c\udfe1" },
};

export const CROPS = {
  Spring: [
    { crop: "Rhubarb",     buy: 100, sell: 220, keg: { p:"Wine",g:660,a:924 },    jar: { p:"Jelly",g:490,a:686 },    cask: "\u2705", dehy: { p:"Dried",g:550,a:770 },  best: "keg" },
    { crop: "Strawberry",  buy: 100, sell: 120, keg: { p:"Wine",g:360,a:504 },    jar: { p:"Jelly",g:290,a:406 },    cask: "\u2705", dehy: { p:"Dried",g:300,a:420 },  best: "keg",  note: "Multi-harvest \u00b7 Egg Festival" },
    { crop: "Cauliflower", buy: 80,  sell: 175, keg: { p:"Juice",g:394,a:551 },   jar: { p:"Pickles",g:400,a:560 },  cask: "\u2014",  dehy: null,                         best: "jar" },
    { crop: "Kale",        buy: 70,  sell: 110, keg: { p:"Juice",g:248,a:347 },   jar: { p:"Pickles",g:270,a:378 },  cask: "\u2014",  dehy: null,                         best: "jar" },
    { crop: "Garlic",      buy: 40,  sell: 60,  keg: { p:"Juice",g:135,a:189 },   jar: { p:"Pickles",g:170,a:238 },  cask: "\u2014",  dehy: null,                         best: "jar" },
    { crop: "Potato",      buy: 50,  sell: 80,  keg: { p:"Juice",g:180,a:252 },   jar: { p:"Pickles",g:210,a:294 },  cask: "\u2014",  dehy: null,                         best: "jar",  note: "Chance \u00d72 cosecha" },
    { crop: "Green Beans", buy: 60,  sell: 40,  keg: { p:"Juice",g:90,a:126 },    jar: { p:"Pickles",g:130,a:182 },  cask: "\u2014",  dehy: null,                         best: "jar",  note: "Multi-harvest" },
    { crop: "Parsnip",     buy: 20,  sell: 35,  keg: { p:"Juice",g:79,a:111 },    jar: { p:"Pickles",g:120,a:168 },  cask: "\u2014",  dehy: null,                         best: "jar",  note: "El m\u00e1s barato \u00b7 inicio del a\u00f1o" },
    { crop: "Rice",        buy: 20,  sell: 100, keg: { p:"Juice",g:225,a:315 },   jar: { p:"Pickles",g:250,a:350 },  cask: "\u2014",  dehy: null,                         best: "jar",  note: "Requiere terreno inundado / Mill \u2192 Harina" },
  ],
  Summer: [
    { crop: "Starfruit",   buy: 400, sell: 750,  keg: { p:"Wine",g:2250,a:3150 },  jar: { p:"Jelly",g:1550,a:2170 },  cask: "\u2705\u21926300g", dehy: { p:"Dried",g:1875,a:2625 }, best: "keg", note: "\ud83c\udfc6 Mejor verano" },
    { crop: "Melon",       buy: 80,  sell: 250,  keg: { p:"Wine",g:750,a:1050 },   jar: { p:"Jelly",g:550,a:770 },    cask: "\u2705",       dehy: { p:"Dried",g:625,a:875 },   best: "keg" },
    { crop: "Blueberry",   buy: 80,  sell: 50,   keg: { p:"Wine",g:150,a:210 },    jar: { p:"Jelly",g:150,a:210 },    cask: "\u2705",       dehy: { p:"Dried",g:125,a:175 },   best: "jar", note: "3\u00d7 por cosecha" },
    { crop: "Red Cabbage", buy: 100, sell: 260,  keg: { p:"Juice",g:585,a:819 },   jar: { p:"Pickles",g:570,a:798 },  cask: "\u2014",        dehy: null,                         best: "keg", note: "A\u00f1o 2+" },
    { crop: "Hot Pepper",  buy: 40,  sell: 40,   keg: { p:"Juice",g:90,a:126 },    jar: { p:"Pickles",g:130,a:182 },  cask: "\u2014",        dehy: { p:"Dried",g:100,a:140 },   best: "jar", note: "Multi-harvest" },
    { crop: "Radish",      buy: 40,  sell: 90,   keg: { p:"Juice",g:203,a:284 },   jar: { p:"Pickles",g:230,a:322 },  cask: "\u2014",        dehy: null,                         best: "jar" },
    { crop: "Wheat",       buy: 10,  sell: 25,   keg: { p:"Beer",g:200,a:280 },    jar: { p:"Pickles",g:100,a:140 },  cask: "\u2705",       dehy: null,                         best: "keg", note: "Tmb en Oto\u00f1o \u00b7 Mill \u2192 Harina" },
    { crop: "Corn",        buy: 150, sell: 50,   keg: { p:"Juice",g:113,a:158 },   jar: { p:"Pickles",g:150,a:210 },  cask: "\u2014",        dehy: null,                         best: "jar", note: "Multi-harvest \u00b7 contin\u00faa en Fall" },
    { crop: "Tomato",      buy: 50,  sell: 60,   keg: { p:"Juice",g:135,a:189 },   jar: { p:"Pickles",g:170,a:238 },  cask: "\u2014",        dehy: null,                         best: "jar", note: "Multi-harvest" },
    { crop: "Poppy",       buy: 100, sell: 140,  keg: { p:"Juice",g:315,a:441 },   jar: { p:"Pickles",g:330,a:462 },  cask: "\u2014",        dehy: null,                         best: "jar", note: "\ud83c\udf38 Flor \u2192 Miel 380g" },
    { crop: "Sunflower",   buy: 200, sell: 80,   keg: { p:"Juice",g:180,a:252 },   jar: { p:"Pickles",g:210,a:294 },  cask: "\u2014",        dehy: null,                         best: "raw", note: "\ud83c\udf38 Flor \u2192 Miel 260g \u00b7 tmb en Fall \u00b7 drops semillas" },
  ],
  Fall: [
    { crop: "Cranberry",    buy: 240, sell: 75,  keg: { p:"Wine",g:225,a:315 },    jar: { p:"Jelly",g:200,a:280 },    cask: "\u2705", dehy: { p:"Dried",g:188,a:262 },   best: "keg", note: "2\u00d7 por cosecha" },
    { crop: "Pumpkin",      buy: 100, sell: 320, keg: { p:"Juice",g:720,a:1008 },  jar: { p:"Pickles",g:690,a:966 },  cask: "\u2014",  dehy: null,                          best: "keg" },
    { crop: "Yam",          buy: 60,  sell: 160, keg: { p:"Juice",g:360,a:504 },   jar: { p:"Pickles",g:370,a:518 },  cask: "\u2014",  dehy: null,                          best: "jar" },
    { crop: "Beet",         buy: 20,  sell: 100, keg: { p:"Juice",g:225,a:315 },   jar: { p:"Pickles",g:250,a:350 },  cask: "\u2014",  dehy: null,                          best: "jar", note: "Muy barato \u00b7 Desert Trader" },
    { crop: "Amaranth",     buy: 70,  sell: 150, keg: { p:"Juice",g:338,a:473 },   jar: { p:"Pickles",g:350,a:490 },  cask: "\u2014",  dehy: null,                          best: "jar" },
    { crop: "Bok Choy",     buy: 50,  sell: 80,  keg: { p:"Juice",g:180,a:252 },   jar: { p:"Pickles",g:210,a:294 },  cask: "\u2014",  dehy: null,                          best: "jar" },
    { crop: "Artichoke",    buy: 30,  sell: 160, keg: { p:"Juice",g:360,a:504 },   jar: { p:"Pickles",g:370,a:518 },  cask: "\u2014",  dehy: null,                          best: "jar", note: "A\u00f1o 2+" },
    { crop: "Grape",        buy: 60,  sell: 80,  keg: { p:"Wine",g:240,a:336 },    jar: { p:"Jelly",g:210,a:294 },    cask: "\u2705", dehy: { p:"Dried",g:200,a:280 },   best: "keg", note: "Multi-harvest" },
    { crop: "Sweet Potato", buy: 30,  sell: 130, keg: { p:"Juice",g:293,a:410 },   jar: { p:"Pickles",g:310,a:434 },  cask: "\u2014",  dehy: null,                          best: "jar", note: "v1.6" },
    { crop: "Corn",         buy: 150, sell: 50,  keg: { p:"Juice",g:113,a:158 },   jar: { p:"Pickles",g:150,a:210 },  cask: "\u2014",  dehy: null,                          best: "jar", note: "Contin\u00faa desde verano" },
    { crop: "Sunflower",    buy: 200, sell: 80,  keg: { p:"Juice",g:180,a:252 },   jar: { p:"Pickles",g:210,a:294 },  cask: "\u2014",  dehy: null,                          best: "raw", note: "\ud83c\udf38 Flor \u2192 Miel 260g \u00b7 drops semillas" },
    { crop: "Fairy Rose",   buy: 200, sell: 290, keg: { p:"Juice",g:653,a:914 },   jar: { p:"Jelly",g:630,a:882 },    cask: "\u2014",  dehy: null,                          best: "keg", note: "\ud83c\udf38 Flor \u2192 Miel 680g \u2190 MEJOR MIEL" },
  ],
  "Year-Round": [
    { crop: "Ancient Fruit",   buy: "Seed Maker", sell: 550,  keg: { p:"Wine",g:1650,a:2310 },  jar: { p:"Jelly",g:1150,a:1610 },  cask: "\u2705\u21924620g", dehy: { p:"Dried",g:1375,a:1925 }, best: "keg", note: "\ud83c\udfc6 Mejor ingreso global" },
    { crop: "Sweet Gem Berry", buy: "Rare Seed",  sell: 3000, keg: { p:"Wine",g:9000,a:12600 }, jar: { p:"Jelly",g:6050,a:8470 },  cask: "\u2705",       dehy: { p:"Dried",g:7500,a:10500 }, best: "keg", note: "56 d\u00edas \u00b7 max valor" },
    { crop: "Hops",            buy: 60,           sell: 25,   keg: { p:"Pale Ale",g:300,a:420 },jar: { p:"Pickles",g:100,a:140 },  cask: "\u2705",       dehy: null,                          best: "keg", note: "Verano \u00b7 multi-harvest" },
    { crop: "Coffee Bean",     buy: "Traveling",  sell: 15,   keg: { p:"Coffee",g:150,a:null }, jar: null,                          cask: "\u2014",        dehy: null,                          best: "keg", note: "Speed boost \u00b7 multi-harvest" },
  ],
};

export const FLOWERS = [
  { flower:"Tulip",        icon:"\ud83c\udf37", season:"Spring", buy:20,  sell:30,  honey:{ g:160, a:224 },  rank:2, note:"M\u00e1s barata de Spring \u00b7 f\u00e1cil de plantar en masa" },
  { flower:"Blue Jazz",    icon:"\ud83d\udc99", season:"Spring", buy:50,  sell:50,  honey:{ g:200, a:280 },  rank:1, note:"\ud83c\udfc6 Mejor miel de Spring" },
  { flower:"Poppy",        icon:"\ud83c\udf3a", season:"Summer", buy:100, sell:140, honey:{ g:380, a:532 },  rank:1, note:"\ud83c\udfc6 Mejor miel de Summer \u00b7 tambi\u00e9n vende bien raw" },
  { flower:"Summer Spangle",icon:"\ud83c\udf3c",season:"Summer", buy:50,  sell:90,  honey:{ g:280, a:392 },  rank:2, note:"Segunda opci\u00f3n en verano \u00b7 m\u00e1s barata que Poppy" },
  { flower:"Sunflower",    icon:"\ud83c\udf3b", season:"Summer/Fall", buy:200, sell:80, honey:{ g:260, a:364 }, rank:3, note:"Drops semillas \u00b7 menos rentable para miel" },
  { flower:"Fairy Rose",   icon:"\ud83c\udf39", season:"Fall",   buy:200, sell:290, honey:{ g:680, a:952 },  rank:1, note:"\ud83c\udfc6 MEJOR miel del juego \u00b7 tambi\u00e9n vende bien raw" },
  { flower:"Wild Honey",   icon:"\ud83c\udf6f", season:"Winter / sin flor", buy:0, sell:100, honey:{ g:100, a:140 }, rank:0, note:"Sin flor cercana al Bee House" },
];
