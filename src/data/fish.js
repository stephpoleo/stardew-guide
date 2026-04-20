function mkSmoker(sell) { return { g: sell * 2, a: Math.floor(sell * 2 * 1.4) }; }

export const FISH_SEASONS = ["Spring", "Summer", "Fall", "Winter", "Especiales"];

export const FISH_SC = {
  Spring:     { accent: "#00897b", icon: "\ud83c\udf38" },
  Summer:     { accent: "#0288d1", icon: "\u2600\ufe0f" },
  Fall:       { accent: "#6d4c41", icon: "\ud83c\udf42" },
  Winter:     { accent: "#3949ab", icon: "\u2744\ufe0f" },
  Especiales: { accent: "#6a1b9a", icon: "\u2b50" },
};

export const FISH = {
  Spring: [
    { fish:"Catfish",      icon:"\ud83d\udc1f", where:"R\u00edo / Secret Woods",       weather:"\ud83c\udf27 Lluvia",  time:"6am-12am",         sell:200,  smoker:mkSmoker(200),  pond:{out:"Aged Roe ~260g",rec:false},           best:"smoker", note:"Dif\u00edcil" },
    { fish:"Eel",          icon:"\ud83d\udc0d", where:"Oc\u00e9ano",                   weather:"\ud83c\udf27 Lluvia",  time:"4pm-2am",          sell:85,   smoker:mkSmoker(85),   pond:{out:"Aged Roe ~130g",rec:false},           best:"smoker" },
    { fish:"Shad",         icon:"\ud83d\udc20", where:"R\u00edo",                      weather:"Cualquiera", time:"9am-2am",          sell:60,   smoker:mkSmoker(60),   pond:{out:"Aged Roe ~90g",rec:false},            best:"smoker" },
    { fish:"Sardine",      icon:"\ud83d\udc1f", where:"Oc\u00e9ano",                   weather:"Cualquiera", time:"6am-7pm",          sell:40,   smoker:mkSmoker(40),   pond:null,                                       best:"smoker", note:"Muy abundante" },
    { fish:"Sunfish",      icon:"\ud83c\udf1e", where:"R\u00edo",                      weather:"\u2600\ufe0f Soleado", time:"6am-7pm",          sell:30,   smoker:mkSmoker(30),   pond:null,                                       best:"smoker", note:"F\u00e1cil" },
    { fish:"Tiger Trout",  icon:"\ud83d\udc05", where:"R\u00edo",                      weather:"Cualquiera", time:"6am-7pm",          sell:150,  smoker:mkSmoker(150),  pond:{out:"No puede",rec:false},                 best:"smoker" },
  ],
  Summer: [
    { fish:"Sturgeon",       icon:"\ud83e\udd88", where:"Lago Monta\u00f1a",           weather:"Cualquiera", time:"6am-7pm",          sell:200,  smoker:mkSmoker(200),  pond:{out:"\u2b50 CAVIAR 500g (700 Artisan)",rec:true},best:"pond",   note:"\ud83c\udfc6 Mejor Pond" },
    { fish:"Super Cucumber", icon:"\ud83e\udd52", where:"Oc\u00e9ano",                 weather:"Cualquiera", time:"6pm-2am",          sell:250,  smoker:mkSmoker(250),  pond:{out:"Aged Roe ~330g",rec:false},           best:"smoker", note:"Solo noche" },
    { fish:"Pufferfish",     icon:"\ud83d\udc21", where:"Oc\u00e9ano",                 weather:"\u2600\ufe0f Soleado", time:"12pm-4pm",         sell:200,  smoker:mkSmoker(200),  pond:{out:"Aged Roe ~260g",rec:false},           best:"smoker" },
    { fish:"Octopus",        icon:"\ud83d\udc19", where:"Oc\u00e9ano",                 weather:"Cualquiera", time:"6am-1pm",          sell:150,  smoker:mkSmoker(150),  pond:{out:"Aged Roe ~210g",rec:false},           best:"smoker" },
    { fish:"Tuna",           icon:"\ud83d\udc1f", where:"Oc\u00e9ano",                 weather:"Cualquiera", time:"6am-7pm",          sell:100,  smoker:mkSmoker(100),  pond:{out:"Aged Roe ~160g",rec:false},           best:"smoker" },
    { fish:"Tilapia",        icon:"\ud83d\udc20", where:"Oc\u00e9ano",                 weather:"Cualquiera", time:"6am-2pm",          sell:75,   smoker:mkSmoker(75),   pond:null,                                       best:"smoker" },
    { fish:"Red Snapper",    icon:"\ud83d\udd34", where:"Oc\u00e9ano",                 weather:"\ud83c\udf27 Lluvia",  time:"6am-7pm",          sell:50,   smoker:mkSmoker(50),   pond:null,                                       best:"smoker" },
  ],
  Fall: [
    { fish:"Catfish",     icon:"\ud83d\udc1f", where:"R\u00edo / Secret Woods",        weather:"\ud83c\udf27 Lluvia",  time:"6am-12am",         sell:200,  smoker:mkSmoker(200),  pond:{out:"Aged Roe ~260g",rec:false},           best:"smoker" },
    { fish:"Walleye",     icon:"\ud83d\udc1f", where:"R\u00edo",                       weather:"\ud83c\udf27 Lluvia",  time:"12pm-2am",         sell:105,  smoker:mkSmoker(105),  pond:{out:"Aged Roe ~160g",rec:false},           best:"smoker" },
    { fish:"Tiger Trout", icon:"\ud83d\udc05", where:"R\u00edo",                       weather:"Cualquiera", time:"6am-7pm",          sell:150,  smoker:mkSmoker(150),  pond:{out:"No puede",rec:false},                 best:"smoker" },
    { fish:"Salmon",      icon:"\ud83c\udf63", where:"R\u00edo",                       weather:"Cualquiera", time:"6am-7pm",          sell:75,   smoker:mkSmoker(75),   pond:{out:"Aged Roe ~120g",rec:false},           best:"smoker", note:"Abundante" },
    { fish:"Albacore",    icon:"\ud83d\udc1f", where:"Oc\u00e9ano",                    weather:"Cualquiera", time:"6am-11am/6pm-2am", sell:75,   smoker:mkSmoker(75),   pond:null,                                       best:"smoker" },
    { fish:"Eel",         icon:"\ud83d\udc0d", where:"Oc\u00e9ano",                    weather:"\ud83c\udf27 Lluvia",  time:"4pm-2am",          sell:85,   smoker:mkSmoker(85),   pond:null,                                       best:"smoker" },
  ],
  Winter: [
    { fish:"Squid",        icon:"\ud83e\udd91", where:"Oc\u00e9ano",                   weather:"Cualquiera", time:"6pm-2am",          sell:80,   smoker:mkSmoker(80),   pond:{out:"\u2b50 Squid Ink 60g",rec:true},          best:"pond",   note:"Ink para recetas" },
    { fish:"Midnight Carp",icon:"\ud83c\udf19", where:"R\u00edo / Lago",               weather:"Cualquiera", time:"10pm-2am",         sell:150,  smoker:mkSmoker(150),  pond:{out:"Aged Roe ~210g",rec:false},           best:"smoker", note:"Solo noche" },
    { fish:"Lingcod",      icon:"\ud83d\udc1f", where:"R\u00edo",                      weather:"Cualquiera", time:"Todo d\u00eda",         sell:120,  smoker:mkSmoker(120),  pond:{out:"Aged Roe ~180g",rec:false},           best:"smoker" },
    { fish:"Albacore",     icon:"\ud83d\udc1f", where:"Oc\u00e9ano",                   weather:"Cualquiera", time:"6am-11am/6pm-2am", sell:75,   smoker:mkSmoker(75),   pond:null,                                       best:"smoker" },
    { fish:"Blobfish",     icon:"\ud83d\ude15", where:"Submarino (festival)",     weather:"\u2014",          time:"Noche",            sell:500,  smoker:mkSmoker(500),  pond:{out:"\ud83c\udf1f Pearl 2,500g (rara)",rec:true},    best:"pond",   note:"Pearl muy valiosa" },
  ],
  Especiales: [
    { fish:"Lava Eel",    icon:"\ud83c\udf0b", where:"Mine lv100 / Volcano",      weather:"Cualquiera", time:"Todo d\u00eda",         sell:700,  smoker:mkSmoker(700),  pond:{out:"Aged Roe ~810g",rec:true},            best:"smoker", note:"Muy dif\u00edcil" },
    { fish:"Legend",      icon:"\ud83d\udc51", where:"Lago Monta\u00f1a (Spring)",      weather:"\ud83c\udf27 Lluvia",  time:"6am-11pm",         sell:5000, smoker:mkSmoker(5000), pond:{out:"No reproducible",rec:false},          best:"raw",    note:"LEGENDARIO" },
    { fish:"Crimsonfish", icon:"\ud83d\udd34", where:"Oc\u00e9ano (Summer)",            weather:"Cualquiera", time:"6am-8pm",          sell:1500, smoker:mkSmoker(1500), pond:{out:"No reproducible",rec:false},          best:"raw",    note:"LEGENDARIO" },
    { fish:"Angler",      icon:"\ud83c\udfa3", where:"R\u00edo N Jodi (Fall)",          weather:"Cualquiera", time:"6am-7pm",          sell:900,  smoker:mkSmoker(900),  pond:{out:"No reproducible",rec:false},          best:"raw",    note:"LEGENDARIO" },
    { fish:"Glacierfish", icon:"\ud83e\uddca", where:"Arrowhead Is. (Winter)",     weather:"Cualquiera", time:"6am-8pm",          sell:1000, smoker:mkSmoker(1000), pond:{out:"No reproducible",rec:false},          best:"raw",    note:"LEGENDARIO" },
    { fish:"Mutant Carp", icon:"\u2622\ufe0f", where:"Alcantarilla",              weather:"Cualquiera", time:"Todo d\u00eda",         sell:1000, smoker:mkSmoker(1000), pond:{out:"No reproducible",rec:false},          best:"raw",    note:"LEGENDARIO" },
    { fish:"Woodskip",    icon:"\ud83c\udf32", where:"Secret Woods",               weather:"Cualquiera", time:"6am-7pm",          sell:75,   smoker:mkSmoker(75),   pond:{out:"Aged Roe ~120g",rec:false},           best:"smoker" },
  ],
};
