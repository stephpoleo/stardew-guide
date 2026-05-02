export const SEASONS = ["spring", "summer", "fall", "winter"];

export const CROPS = [
  { id: "parsnip",     emoji: "🌱", name: { es: "Chirivía",     en: "Parsnip" },        season: "spring", days: 4,  regrow: 0, seedCost: 20,   sellPrice: 35,   color: "#e8d48a" },
  { id: "cauliflower", emoji: "🥦", name: { es: "Coliflor",     en: "Cauliflower" },    season: "spring", days: 12, regrow: 0, seedCost: 80,   sellPrice: 175,  color: "#f4efd8" },
  { id: "strawberry",  emoji: "🍓", name: { es: "Fresa",        en: "Strawberry" },     season: "spring", days: 8,  regrow: 4, seedCost: 100,  sellPrice: 120,  color: "#d94a5a" },
  { id: "potato",      emoji: "🥔", name: { es: "Patata",       en: "Potato" },         season: "spring", days: 6,  regrow: 0, seedCost: 50,   sellPrice: 80,   color: "#b8955c" },
  { id: "greenbean",   emoji: "🫛", name: { es: "Judía verde",  en: "Green Bean" },     season: "spring", days: 10, regrow: 3, seedCost: 60,   sellPrice: 40,   color: "#76a845" },
  { id: "blueberry",   emoji: "🫐", name: { es: "Arándano",     en: "Blueberry" },      season: "summer", days: 13, regrow: 4, seedCost: 80,   sellPrice: 50,   color: "#4a6fb8" },
  { id: "melon",       emoji: "🍈", name: { es: "Melón",        en: "Melon" },          season: "summer", days: 12, regrow: 0, seedCost: 80,   sellPrice: 250,  color: "#c7d68a" },
  { id: "starfruit",   emoji: "⭐", name: { es: "Fruta estrella", en: "Starfruit" },    season: "summer", days: 13, regrow: 0, seedCost: 400,  sellPrice: 750,  color: "#e8c547" },
  { id: "hops",        emoji: "🌾", name: { es: "Lúpulo",       en: "Hops" },           season: "summer", days: 11, regrow: 1, seedCost: 60,   sellPrice: 25,   color: "#a8c060" },
  { id: "hotpepper",   emoji: "🌶️", name: { es: "Pimiento picante", en: "Hot Pepper" },season: "summer", days: 5,  regrow: 3, seedCost: 40,   sellPrice: 40,   color: "#c84a3a" },
  { id: "pumpkin",     emoji: "🎃", name: { es: "Calabaza",     en: "Pumpkin" },        season: "fall",   days: 13, regrow: 0, seedCost: 100,  sellPrice: 320,  color: "#d97a2a" },
  { id: "cranberry",   emoji: "🍒", name: { es: "Arándano rojo", en: "Cranberry" },     season: "fall",   days: 7,  regrow: 5, seedCost: 240,  sellPrice: 75,   color: "#b83a3a" },
  { id: "grape",       emoji: "🍇", name: { es: "Uva",          en: "Grape" },          season: "fall",   days: 10, regrow: 3, seedCost: 60,   sellPrice: 80,   color: "#7a4a9c" },
  { id: "artichoke",   emoji: "🌿", name: { es: "Alcachofa",    en: "Artichoke" },      season: "fall",   days: 8,  regrow: 0, seedCost: 30,   sellPrice: 160,  color: "#7a9848" },
  { id: "sweetgem",    emoji: "💎", name: { es: "Gema dulce",   en: "Sweet Gem" },      season: "fall",   days: 24, regrow: 0, seedCost: 1000, sellPrice: 3000, color: "#a060c0" },
  { id: "wintroot",    emoji: "🥕", name: { es: "Raíz invernal", en: "Wintroot" },      season: "winter", days: 0,  regrow: 0, seedCost: 0,    sellPrice: 70,   color: "#c2a070",
    note: { es: "Se obtiene cavando", en: "Forage by digging" } },
];

export const FISH = [
  { id: "sunfish",    emoji: "🐟", name: { es: "Pez sol",          en: "Sunfish" },         seasons: ["spring", "summer"],            location: { es: "Río", en: "River" },               time: "06–19", weather: { es: "Soleado",  en: "Sunny" }, price: 30,  difficulty: "easy" },
  { id: "catfish",    emoji: "🐠", name: { es: "Bagre",            en: "Catfish" },         seasons: ["spring", "fall"],              location: { es: "Río", en: "River" },               time: "06–00", weather: { es: "Lluvia",   en: "Rain" },  price: 200, difficulty: "hard" },
  { id: "rainbow",    emoji: "🌈", name: { es: "Trucha arcoíris",  en: "Rainbow Trout" },   seasons: ["summer"],                      location: { es: "Río", en: "River" },               time: "06–19", weather: { es: "Soleado",  en: "Sunny" }, price: 65,  difficulty: "medium" },
  { id: "sardine",    emoji: "🐟", name: { es: "Sardina",          en: "Sardine" },         seasons: ["spring", "fall", "winter"],    location: { es: "Océano", en: "Ocean" },             time: "06–19", weather: { es: "Cualquiera", en: "Any" },  price: 40,  difficulty: "easy" },
  { id: "tuna",       emoji: "🐟", name: { es: "Atún",             en: "Tuna" },            seasons: ["summer", "winter"],            location: { es: "Océano", en: "Ocean" },             time: "06–19", weather: { es: "Cualquiera", en: "Any" },  price: 100, difficulty: "medium" },
  { id: "pufferfish", emoji: "🐡", name: { es: "Pez globo",        en: "Pufferfish" },      seasons: ["summer"],                      location: { es: "Océano", en: "Ocean" },             time: "12–16", weather: { es: "Soleado",  en: "Sunny" }, price: 200, difficulty: "hard" },
  { id: "largemouth", emoji: "🐟", name: { es: "Lubina",           en: "Largemouth Bass" }, seasons: ["spring", "summer", "fall", "winter"], location: { es: "Lago montaña", en: "Mountain Lake" }, time: "06–19", weather: { es: "Cualquiera", en: "Any" }, price: 100, difficulty: "medium" },
  { id: "eel",        emoji: "🐍", name: { es: "Anguila",          en: "Eel" },             seasons: ["spring", "fall"],              location: { es: "Océano", en: "Ocean" },             time: "16–02", weather: { es: "Lluvia",   en: "Rain" },  price: 85,  difficulty: "hard" },
  { id: "sturgeon",   emoji: "🐟", name: { es: "Esturión",         en: "Sturgeon" },        seasons: ["summer", "winter"],            location: { es: "Lago montaña", en: "Mountain Lake" }, time: "06–19", weather: { es: "Cualquiera", en: "Any" }, price: 200, difficulty: "hard" },
  { id: "lenny",      emoji: "🐟", name: { es: "Arenque",          en: "Herring" },         seasons: ["spring", "winter"],            location: { es: "Océano", en: "Ocean" },             time: "06–02", weather: { es: "Cualquiera", en: "Any" },  price: 30,  difficulty: "easy" },
  { id: "perch",      emoji: "🐟", name: { es: "Perca",            en: "Perch" },           seasons: ["winter"],                      location: { es: "Río", en: "River" },               time: "06–19", weather: { es: "Cualquiera", en: "Any" },  price: 55,  difficulty: "easy" },
  { id: "squid",      emoji: "🦑", name: { es: "Calamar",          en: "Squid" },           seasons: ["winter"],                      location: { es: "Océano", en: "Ocean" },             time: "18–02", weather: { es: "Cualquiera", en: "Any" },  price: 80,  difficulty: "medium" },
];

export const FISH_PREP = {
  sunfish:    { grill: { name: { es: "Pez sol al carbón",     en: "Grilled Sunfish" }, price: 90  }, pond: { cap: 10, every: 3, output: { name: { es: "Huevo dorado",     en: "Roe" },         price: 45  } } },
  catfish:    { grill: { name: { es: "Bagre al carbón",       en: "Grilled Catfish" }, price: 330 }, pond: { cap: 10, every: 5, output: { name: { es: "Huevo de bagre",   en: "Catfish Roe" }, price: 160 } } },
  rainbow:    { grill: { name: { es: "Trucha asada",          en: "Grilled Rainbow" }, price: 160 }, pond: { cap: 10, every: 4, output: { name: { es: "Huevo arcoíris",  en: "Rainbow Roe" }, price: 80  } } },
  sardine:    { grill: { name: { es: "Sardina a la parrilla", en: "Grilled Sardine" }, price: 110 }, pond: { cap: 10, every: 2, output: { name: { es: "Huevo sardina",   en: "Sardine Roe" }, price: 55  } } },
  tuna:       { grill: { name: { es: "Atún a la plancha",     en: "Seared Tuna" },     price: 230 }, pond: { cap: 10, every: 4, output: { name: { es: "Huevo atún",      en: "Tuna Roe" },    price: 130 } } },
  pufferfish: { grill: { name: { es: "Pez globo asado",       en: "Grilled Puffer" },  price: 420 }, pond: { cap: 10, every: 5, output: { name: { es: "Huevo de globo",  en: "Puffer Roe" },  price: 220 } } },
  largemouth: { grill: { name: { es: "Lubina asada",          en: "Grilled Bass" },    price: 210 }, pond: { cap: 10, every: 4, output: { name: { es: "Huevo lubina",   en: "Bass Roe" },    price: 120 } } },
  eel:        { grill: { name: { es: "Anguila glaseada",      en: "Glazed Eel" },      price: 200 }, pond: { cap: 10, every: 5, output: { name: { es: "Huevo anguila",  en: "Eel Roe" },     price: 100 } } },
  sturgeon:   { grill: { name: { es: "Esturión asado",        en: "Roast Sturgeon" },  price: 430 }, pond: { cap: 10, every: 6, output: { name: { es: "Caviar",          en: "Caviar" },      price: 500 }, premium: true } },
  lenny:      { grill: { name: { es: "Arenque ahumado",       en: "Smoked Herring" },  price: 85  }, pond: { cap: 10, every: 2, output: { name: { es: "Huevo arenque",  en: "Herring Roe" }, price: 40  } } },
  perch:      { grill: { name: { es: "Perca frita",           en: "Fried Perch" },     price: 150 }, pond: { cap: 10, every: 3, output: { name: { es: "Huevo perca",    en: "Perch Roe" },   price: 70  } } },
  squid:      { grill: { name: { es: "Calamar a la plancha",  en: "Seared Squid" },    price: 220 }, pond: { cap: 10, every: 4, output: { name: { es: "Tinta",          en: "Squid Ink" },   price: 100 } } },
};

export function fishRecommendation(fish) {
  const prep = FISH_PREP[fish.id] || {};
  const options = [];
  options.push({
    id: "raw",
    price: fish.price,
    roiPerDay: fish.price,
    label: { es: "Vender crudo", en: "Sell raw" },
  });
  if (prep.grill) {
    options.push({
      id: "grill",
      price: prep.grill.price,
      roiPerDay: prep.grill.price,
      label: prep.grill.name,
      extra: { es: "+ 1 madera + 1 fibra", en: "+1 wood +1 fiber" },
    });
  }
  if (prep.pond) {
    const poolOut = prep.pond.cap * prep.pond.output.price;
    const perDay = poolOut / prep.pond.every;
    options.push({
      id: "pond",
      price: prep.pond.output.price,
      roiPerDay: perDay,
      label: {
        es: `Fish Pond → ${prep.pond.output.name.es}`,
        en: `Fish Pond → ${prep.pond.output.name.en}`,
      },
      extra: {
        es: `cada ${prep.pond.every}d, hasta ${prep.pond.cap} peces`,
        en: `every ${prep.pond.every}d, up to ${prep.pond.cap} fish`,
      },
    });
  }
  const best = options.reduce((a, b) => (b.roiPerDay > a.roiPerDay ? b : a), options[0]);
  return { options, best };
}

export const ANIMALS = [
  { id: "chicken", emoji: "🐔", name: { es: "Gallina", en: "Chicken" }, produces: [
    { id: "egg",       emoji: "🥚", name: { es: "Huevo",        en: "Egg" },          price: 50,  every: 1 },
    { id: "biggegg",   emoji: "🥚", name: { es: "Huevo grande", en: "Large Egg" },    price: 95,  every: 1, note: { es: "Amistad alta", en: "High friendship" } },
  ]},
  { id: "cow", emoji: "🐄", name: { es: "Vaca", en: "Cow" }, produces: [
    { id: "milk",      emoji: "🥛", name: { es: "Leche",        en: "Milk" },         price: 125, every: 1 },
    { id: "largemilk", emoji: "🥛", name: { es: "Leche grande", en: "Large Milk" },   price: 190, every: 1, note: { es: "Amistad alta", en: "High friendship" } },
  ]},
  { id: "goat", emoji: "🐐", name: { es: "Cabra", en: "Goat" }, produces: [
    { id: "goatmilk",  emoji: "🥛", name: { es: "Leche de cabra", en: "Goat Milk" }, price: 225, every: 2 },
  ]},
  { id: "sheep", emoji: "🐑", name: { es: "Oveja", en: "Sheep" }, produces: [
    { id: "wool",      emoji: "🧶", name: { es: "Lana",          en: "Wool" },        price: 340, every: 3 },
  ]},
  { id: "pig", emoji: "🐖", name: { es: "Cerdo", en: "Pig" }, produces: [
    { id: "truffle",   emoji: "🍄", name: { es: "Trufa",         en: "Truffle" },     price: 625, every: 1, note: { es: "Forrajea al exterior", en: "Forages outside" } },
  ]},
  { id: "duck", emoji: "🦆", name: { es: "Pato", en: "Duck" }, produces: [
    { id: "duckegg",   emoji: "🥚", name: { es: "Huevo de pato", en: "Duck Egg" },   price: 95,  every: 2 },
    { id: "duckfeat",  emoji: "🪶", name: { es: "Pluma",         en: "Duck Feather" }, price: 250, every: 2, note: { es: "Amistad alta", en: "High friendship" } },
  ]},
];

export const MACHINES = [
  { id: "keg",       emoji: "🛢️", name: { es: "Barril (Keg)",     en: "Keg" },           desc: { es: "Fermenta frutas y vegetales.", en: "Ferments fruit & vegetables." } },
  { id: "cask",      emoji: "🪵", name: { es: "Barrica (Cask)",   en: "Cask" },          desc: { es: "Envejece bebidas y quesos.",   en: "Ages wines & cheeses." } },
  { id: "preserves", emoji: "🫙", name: { es: "Tarro de conserva", en: "Preserves Jar" }, desc: { es: "Mermeladas y encurtidos.",     en: "Jams & pickles." } },
  { id: "mayo",      emoji: "🧴", name: { es: "Mayonesa",          en: "Mayonnaise" },   desc: { es: "Procesa huevos.",              en: "Processes eggs." } },
  { id: "cheese",    emoji: "🧀", name: { es: "Prensa de queso",   en: "Cheese Press" }, desc: { es: "Leche → queso.",               en: "Milk → cheese." } },
  { id: "loom",      emoji: "🧵", name: { es: "Telar",             en: "Loom" },         desc: { es: "Lana → tela.",                 en: "Wool → cloth." } },
  { id: "oil",       emoji: "🫒", name: { es: "Prensa de aceite",  en: "Oil Maker" },    desc: { es: "Semillas → aceite.",           en: "Seeds → oil." } },
];

export const RECIPES = {
  keg: {
    strawberry: { out: { es: "Vino fresa",    en: "Strawberry Wine" }, mult: 3,    hours: 168 },
    blueberry:  { out: { es: "Vino arándano", en: "Blueberry Wine" },  mult: 3,    hours: 168 },
    starfruit:  { out: { es: "Vino estrella", en: "Starfruit Wine" },  mult: 3,    hours: 168 },
    melon:      { out: { es: "Vino melón",    en: "Melon Wine" },      mult: 3,    hours: 168 },
    grape:      { out: { es: "Vino tinto",    en: "Grape Wine" },      mult: 3,    hours: 168 },
    cranberry:  { out: { es: "Vino rojo",     en: "Cranberry Wine" },  mult: 3,    hours: 168 },
    pumpkin:    { out: { es: "Zumo calabaza", en: "Pumpkin Juice" },   mult: 2.25, hours: 96 },
    potato:     { out: { es: "Aguardiente",   en: "Potato Spirits" },  mult: 2.25, hours: 96 },
    hops:       { out: { es: "Cerveza pale",  en: "Pale Ale" },        flat: 300,  hours: 35 },
  },
  cask: {
    winestraw: { parent: "keg.strawberry", out: { es: "Vino fresa añejo", en: "Aged Strawberry Wine" }, mult: 2, hours: 56 * 24 },
    cheese:    {                            out: { es: "Queso dorado",    en: "Iridium Cheese" },        mult: 2, hours: 56 * 24 },
  },
  preserves: {
    strawberry: { out: { es: "Mermelada fresa",    en: "Strawberry Jam" },   flat: 150, mult: 2, hours: 72 },
    blueberry:  { out: { es: "Mermelada arándano", en: "Blueberry Jam" },    flat: 150, mult: 2, hours: 72 },
    cranberry:  { out: { es: "Encurtido",          en: "Cranberry Pickle" }, flat: 150, mult: 2, hours: 72 },
    hotpepper:  { out: { es: "Encurtido picante",  en: "Pepper Pickle" },    flat: 150, mult: 2, hours: 72 },
  },
  mayo: {
    egg:     { out: { es: "Mayonesa",     en: "Mayonnaise" }, flat: 190, hours: 3 },
    duckegg: { out: { es: "Mayo de pato", en: "Duck Mayo" },  flat: 375, hours: 3 },
  },
  cheese: {
    milk:     { out: { es: "Queso",       en: "Cheese" },      flat: 230, hours: 3 },
    goatmilk: { out: { es: "Queso cabra", en: "Goat Cheese" }, flat: 400, hours: 3 },
  },
  loom: {
    wool: { out: { es: "Tela", en: "Cloth" }, flat: 470, hours: 4 },
  },
};

export function cropProfitPerDay(crop) {
  const SEASON_LEN = 28;
  if (crop.days === 0) return 0;
  if (crop.regrow > 0) {
    const firstHarvest = crop.days;
    const extraDays = SEASON_LEN - firstHarvest;
    if (extraDays < 0) return 0;
    const extra = Math.floor(extraDays / crop.regrow);
    const totalHarvests = 1 + extra;
    const revenue = totalHarvests * crop.sellPrice - crop.seedCost;
    return revenue / SEASON_LEN;
  }
  const cycles = Math.floor(SEASON_LEN / crop.days);
  const revenue = cycles * (crop.sellPrice - crop.seedCost);
  return revenue / SEASON_LEN;
}
