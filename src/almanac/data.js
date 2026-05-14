export const SEASONS = ["spring", "summer", "fall", "winter"];

export const CROPS = [
  { id: "parsnip",     emoji: "🌱", name: { es: "Chirivía",     en: "Parsnip" },        season: "spring", days: 4,  regrow: 0, seedCost: 20,   sellPrice: 35,   color: "#e8d48a" },
  { id: "cauliflower", emoji: "🥦", name: { es: "Coliflor",     en: "Cauliflower" },    season: "spring", days: 12, regrow: 0, seedCost: 80,   sellPrice: 175,  color: "#f4efd8" },
  { id: "strawberry",  emoji: "🍓", name: { es: "Fresa",        en: "Strawberry" },     season: "spring", days: 8,  regrow: 4, seedCost: 100,  sellPrice: 120,  color: "#d94a5a" },
  { id: "potato",      emoji: "🥔", name: { es: "Patata",       en: "Potato" },         season: "spring", days: 6,  regrow: 0, seedCost: 50,   sellPrice: 80,   color: "#b8955c" },
  { id: "greenbean",   emoji: "🫛", name: { es: "Judía verde",  en: "Green Bean" },     season: "spring", days: 10, regrow: 3, seedCost: 60,   sellPrice: 40,   color: "#76a845" },
  { id: "tulip",       emoji: "🌷", name: { es: "Tulipán",      en: "Tulip" },          season: "spring", days: 6,  regrow: 0, seedCost: 20,   sellPrice: 30,   honeyPrice: 160, color: "#d83a7a", flower: true },
  { id: "bluejazz",    emoji: "🌸", name: { es: "Jazz azul",    en: "Blue Jazz" },      season: "spring", days: 7,  regrow: 0, seedCost: 30,   sellPrice: 50,   honeyPrice: 200, color: "#5c8ad4", flower: true },
  { id: "blueberry",   emoji: "🫐", name: { es: "Arándano",     en: "Blueberry" },      season: "summer", days: 13, regrow: 4, seedCost: 80,   sellPrice: 50,   color: "#4a6fb8" },
  { id: "melon",       emoji: "🍈", name: { es: "Melón",        en: "Melon" },          season: "summer", days: 12, regrow: 0, seedCost: 80,   sellPrice: 250,  color: "#c7d68a" },
  { id: "starfruit",   emoji: "⭐", name: { es: "Fruta estrella", en: "Starfruit" },    season: "summer", days: 13, regrow: 0, seedCost: 400,  sellPrice: 750,  color: "#e8c547" },
  { id: "hops",        emoji: "🌾", name: { es: "Lúpulo",       en: "Hops" },           season: "summer", days: 11, regrow: 1, seedCost: 60,   sellPrice: 25,   color: "#a8c060" },
  { id: "hotpepper",   emoji: "🌶️", name: { es: "Pimiento picante", en: "Hot Pepper" },season: "summer", days: 5,  regrow: 3, seedCost: 40,   sellPrice: 40,   color: "#c84a3a" },
  { id: "summerspangle", emoji: "🌼", name: { es: "Lentejuela",  en: "Summer Spangle" }, season: "summer", days: 8,  regrow: 0, seedCost: 50,   sellPrice: 90,   honeyPrice: 280, color: "#e8c547", flower: true },
  { id: "poppy",       emoji: "🌺", name: { es: "Amapola",      en: "Poppy" },          season: "summer", days: 7,  regrow: 0, seedCost: 100,  sellPrice: 140,  honeyPrice: 380, color: "#d63a3a", flower: true },
  { id: "sunflower",   emoji: "🌻", name: { es: "Girasol",      en: "Sunflower" },      season: "summer", days: 8,  regrow: 0, seedCost: 200,  sellPrice: 80,   honeyPrice: 260, color: "#e8a847", flower: true,
    note: { es: "También crece en otoño", en: "Also grows in fall" } },
  { id: "pumpkin",     emoji: "🎃", name: { es: "Calabaza",     en: "Pumpkin" },        season: "fall",   days: 13, regrow: 0, seedCost: 100,  sellPrice: 320,  color: "#d97a2a" },
  { id: "cranberry",   emoji: "🍒", name: { es: "Arándano rojo", en: "Cranberry" },     season: "fall",   days: 7,  regrow: 5, seedCost: 240,  sellPrice: 75,   color: "#b83a3a" },
  { id: "grape",       emoji: "🍇", name: { es: "Uva",          en: "Grape" },          season: "fall",   days: 10, regrow: 3, seedCost: 60,   sellPrice: 80,   color: "#7a4a9c" },
  { id: "artichoke",   emoji: "🌿", name: { es: "Alcachofa",    en: "Artichoke" },      season: "fall",   days: 8,  regrow: 0, seedCost: 30,   sellPrice: 160,  color: "#7a9848" },
  { id: "sweetgem",    emoji: "💎", name: { es: "Gema dulce",   en: "Sweet Gem" },      season: "fall",   days: 24, regrow: 0, seedCost: 1000, sellPrice: 3000, color: "#a060c0" },
  { id: "fairyrose",   emoji: "🌹", name: { es: "Rosa hada",    en: "Fairy Rose" },     season: "fall",   days: 12, regrow: 0, seedCost: 200,  sellPrice: 290,  honeyPrice: 680, color: "#e060c0", flower: true,
    note: { es: "★ La mejor miel del año", en: "★ Highest-value honey" } },
  { id: "wintroot",    emoji: "🥕", name: { es: "Raíz invernal", en: "Wintroot" },      season: "winter", days: 0,  regrow: 0, seedCost: 0,    sellPrice: 70,   color: "#c2a070",
    note: { es: "Se obtiene cavando", en: "Forage by digging" } },
  { id: "ancient",     emoji: "🍇", name: { es: "Fruta antigua", en: "Ancient Fruit" }, season: "all",    days: 28, regrow: 7, seedCost: 0,    sellPrice: 550,  color: "#7a4a9c",
    note: { es: "Crece en cualquier estación una vez plantada", en: "Once grown, regrows every 7 days in any season" } },
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
  { id: "bee",       emoji: "🐝", name: { es: "Casa de abejas",    en: "Bee House" },    desc: { es: "Flor cercana → miel con sabor (cada 4 días).", en: "Adjacent flower → flavored honey (every 4 days)." } },
];

export const RECIPES = {
  keg: {
    strawberry: { out: { es: "Vino fresa",    en: "Strawberry Wine" }, mult: 3,    hours: 168 },
    blueberry:  { out: { es: "Vino arándano", en: "Blueberry Wine" },  mult: 3,    hours: 168 },
    starfruit:  { out: { es: "Vino estrella", en: "Starfruit Wine" },  mult: 3,    hours: 168 },
    melon:      { out: { es: "Vino melón",    en: "Melon Wine" },      mult: 3,    hours: 168 },
    grape:      { out: { es: "Vino tinto",    en: "Grape Wine" },      mult: 3,    hours: 168 },
    cranberry:  { out: { es: "Vino rojo",     en: "Cranberry Wine" },  mult: 3,    hours: 168 },
    ancient:    { out: { es: "Vino antiguo",  en: "Ancient Fruit Wine" }, mult: 3, hours: 168 },
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
  bee: {
    // flat is the honey markup over the flower's sell price.
    // Formula: honey price = 100 + 2 × flower price.
    tulip:         { out: { es: "Miel de tulipán",   en: "Tulip Honey" },         flat: 130, hours: 96 },
    bluejazz:      { out: { es: "Miel de jazz azul", en: "Blue Jazz Honey" },     flat: 150, hours: 96 },
    summerspangle: { out: { es: "Miel de lentejuela",en: "Summer Spangle Honey" }, flat: 190, hours: 96 },
    sunflower:     { out: { es: "Miel de girasol",   en: "Sunflower Honey" },     flat: 180, hours: 96 },
    poppy:         { out: { es: "Miel de amapola",   en: "Poppy Honey" },         flat: 240, hours: 96 },
    fairyrose:     { out: { es: "Miel de rosa hada", en: "Fairy Rose Honey" },    flat: 390, hours: 96 },
  },
};

// ── MINERALS ────────────────────────────────────────────────
// tier: gem | ore | forage | special
// action: sell | crystal | smelt | gift | refine | forge
export const MINERALS = [
  { id: "diamond",     emoji: "💎", name: { es: "Diamante",         en: "Diamond" },        tier: "gem",     price: 750,  where: { es: "Mina (50+), geodas",        en: "Mines (50+), geodes" },        action: "crystal", note: { es: "★ Mejor en Crystalarium", en: "★ Best in Crystalarium" } },
  { id: "ruby",        emoji: "❤️", name: { es: "Rubí",             en: "Ruby" },           tier: "gem",     price: 250,  where: { es: "Mina del cráneo, geoda magma", en: "Skull mines, magma geode" },   action: "crystal" },
  { id: "emerald",     emoji: "💚", name: { es: "Esmeralda",        en: "Emerald" },        tier: "gem",     price: 250,  where: { es: "Mina (80+), geodas",        en: "Mines (80+), geodes" },        action: "crystal" },
  { id: "topaz",       emoji: "🟧", name: { es: "Topacio",          en: "Topaz" },          tier: "gem",     price: 80,   where: { es: "Mina (5+), geodas",         en: "Mines (5+), geodes" },         action: "forge",   note: { es: "Mejor para anillos / forjas", en: "Best for rings / forging" } },
  { id: "aquamarine",  emoji: "🟦", name: { es: "Aguamarina",       en: "Aquamarine" },     tier: "gem",     price: 180,  where: { es: "Mina (20+), geodas",        en: "Mines (20+), geodes" },        action: "crystal" },
  { id: "jade",        emoji: "🟢", name: { es: "Jade",             en: "Jade" },           tier: "gem",     price: 200,  where: { es: "Mina (60+), geodas",        en: "Mines (60+), geodes" },        action: "gift",    note: { es: "🎁 Cambiable por Estrella en feria", en: "🎁 Trade for Star Shards" } },
  { id: "amethyst",    emoji: "💜", name: { es: "Amatista",         en: "Amethyst" },       tier: "gem",     price: 100,  where: { es: "Mina (1+), geodas",         en: "Mines (1+), geodes" },         action: "crystal" },
  { id: "iridium",     emoji: "🟣", name: { es: "Iridio",           en: "Iridium Ore" },    tier: "ore",     price: 100,  where: { es: "Mina del cráneo, vulcán",   en: "Skull mines, volcano" },       action: "smelt",   note: { es: "→ Barra ×5 = 1000g", en: "→ Bar ×5 = 1000g" } },
  { id: "gold",        emoji: "🟡", name: { es: "Oro",              en: "Gold Ore" },       tier: "ore",     price: 25,   where: { es: "Mina (80+)",                en: "Mines (80+)" },                action: "smelt",   note: { es: "→ Barra = 250g", en: "→ Bar = 250g" } },
  { id: "iron",        emoji: "⚙️", name: { es: "Hierro",           en: "Iron Ore" },       tier: "ore",     price: 10,   where: { es: "Mina (40+)",                en: "Mines (40+)" },                action: "smelt",   note: { es: "→ Barra = 120g", en: "→ Bar = 120g" } },
  { id: "copper",      emoji: "🟠", name: { es: "Cobre",            en: "Copper Ore" },     tier: "ore",     price: 5,    where: { es: "Mina (1+)",                 en: "Mines (1+)" },                 action: "smelt",   note: { es: "→ Barra = 60g", en: "→ Bar = 60g" } },
  { id: "quartz",      emoji: "🤍", name: { es: "Cuarzo",           en: "Quartz" },         tier: "forage",  price: 25,   where: { es: "Mina (5+), forrajeo",       en: "Mines (5+), forage" },         action: "refine",  note: { es: "→ Cuarzo refinado en Horno", en: "→ Refined Quartz in furnace" } },
  { id: "firequartz",  emoji: "🟥", name: { es: "Cuarzo de fuego",  en: "Fire Quartz" },    tier: "forage",  price: 100,  where: { es: "Mina (80+)",                en: "Mines (80+)" },                action: "refine" },
  { id: "frozentear",  emoji: "🔵", name: { es: "Lágrima helada",   en: "Frozen Tear" },    tier: "forage",  price: 75,   where: { es: "Mina (40+)",                en: "Mines (40+)" },                action: "gift" },
  { id: "earthcrystal",emoji: "🟫", name: { es: "Cristal de tierra", en: "Earth Crystal" }, tier: "forage",  price: 50,   where: { es: "Mina (1-39), geoda terrestre", en: "Mines (1–39), earth geode" }, action: "sell" },
  { id: "prismatic",   emoji: "🌈", name: { es: "Fragmento prismático", en: "Prismatic Shard" }, tier: "special", price: 2000, where: { es: "Mina del cráneo, raro",   en: "Skull cavern, very rare" },     action: "gift",    note: { es: "★ Amado por todos · No vender", en: "★ Loved by all · don't sell" } },
];

// ── GIFTS ───────────────────────────────────────────────────
// tier: universal (loved by nearly all) | liked | cooked | avoid
export const GIFTS = [
  { id: "prismatic",   emoji: "🌈", name: { es: "Fragmento prismático", en: "Prismatic Shard" }, tier: "universal", note: { es: "Lo mejor que existe — guárdalo para regalos", en: "Best gift in the game — save for gifting" } },
  { id: "pearl",       emoji: "🦪", name: { es: "Perla",            en: "Pearl" },          tier: "universal", note: { es: "Ostras del mar, raro",        en: "From night market or rare drops" } },
  { id: "rabbitfoot",  emoji: "🐇", name: { es: "Pata de conejo",   en: "Rabbit's Foot" },  tier: "universal", note: { es: "Conejo amistad alta",         en: "High-friendship rabbits" } },
  { id: "magicrock",   emoji: "🍬", name: { es: "Caramelo mágico",  en: "Magic Rock Candy" }, tier: "universal", note: { es: "Mina del cráneo, raro",   en: "Rare from skull cavern" } },
  { id: "truffle",     emoji: "🍄", name: { es: "Trufa",            en: "Truffle" },        tier: "universal", note: { es: "Cerdos al pastoreo",          en: "From pigs foraging outside" } },
  { id: "diamond",     emoji: "💎", name: { es: "Diamante",         en: "Diamond" },        tier: "universal", note: { es: "Crystalarium o mina",         en: "From Crystalarium or mines" } },

  { id: "wine",        emoji: "🍷", name: { es: "Vino (cualquiera)", en: "Wine (any)" },    tier: "liked",     note: { es: "Especialmente Vino de fresa o estrella", en: "Especially Strawberry/Starfruit Wine" } },
  { id: "coffee",      emoji: "☕", name: { es: "Café",             en: "Coffee" },         tier: "liked",     note: { es: "Frijol de café en deshidratador", en: "From coffee beans" } },
  { id: "honey",       emoji: "🍯", name: { es: "Miel (de flor)",   en: "Honey (flower)" }, tier: "liked",     note: { es: "Casas de abeja junto a flores", en: "Bee houses next to flowers" } },
  { id: "anyfruit",    emoji: "🍓", name: { es: "Frutas dulces",    en: "Sweet fruits" },   tier: "liked",     note: { es: "Fresa, melón, arándano, uva", en: "Strawberry, melon, blueberry, grape" } },

  { id: "pumpkinsoup", emoji: "🍲", name: { es: "Sopa de calabaza", en: "Pumpkin Soup" },   tier: "cooked",    note: { es: "Calabaza + Leche",            en: "Pumpkin + Milk" } },
  { id: "lobsterbisque", emoji: "🦞", name: { es: "Bisque de langosta", en: "Lobster Bisque" }, tier: "cooked", note: { es: "Langosta + Leche",          en: "Lobster + Milk" } },
  { id: "pancakes",    emoji: "🥞", name: { es: "Tortitas",         en: "Pancakes" },       tier: "cooked",    note: { es: "Harina + Huevo",              en: "Wheat flour + Egg" } },
  { id: "cheesecauli", emoji: "🥦", name: { es: "Coliflor con queso", en: "Cheese Cauliflower" }, tier: "cooked", note: { es: "Coliflor + Queso",         en: "Cauliflower + Cheese" } },

  { id: "algaesoup",   emoji: "🥣", name: { es: "Sopa de algas",    en: "Algae Soup" },     tier: "avoid",     note: { es: "Casi todos la odian",         en: "Almost everyone hates it" } },
  { id: "holly",       emoji: "🌿", name: { es: "Acebo",            en: "Holly" },          tier: "avoid",     note: { es: "Forrajeo invierno — odiado",  en: "Winter forage — hated" } },
  { id: "rawquartz",   emoji: "🤍", name: { es: "Cuarzo crudo",     en: "Quartz" },         tier: "avoid",     note: { es: "Casi todos lo odian sin pulir", en: "Hated raw — refine first" } },
  { id: "trash",       emoji: "🗑️", name: { es: "Basura / pesca floja", en: "Trash / junk fish" }, tier: "avoid", note: { es: "Obvio, pero no lo intentes", en: "Obvious, don't even try" } },
];

// ── ARTIFACTS ───────────────────────────────────────────────
// rec: donate | sell | both | keep
export const ARTIFACTS = [
  { id: "dwarf1",      emoji: "📜", name: { es: "Pergamino enano I",  en: "Dwarf Scroll I" },   price: 50,   where: { es: "Excavar en mina (1-19)",      en: "Dig in mines (1–19)" },          rec: "both",   note: { es: "Donar primero, vender duplicados", en: "Donate first, sell dupes" } },
  { id: "dwarf2",      emoji: "📜", name: { es: "Pergamino enano II", en: "Dwarf Scroll II" },  price: 100,  where: { es: "Mina (20-79), monstruos",     en: "Mines (20–79), monsters" },      rec: "both" },
  { id: "dwarf3",      emoji: "📜", name: { es: "Pergamino enano III", en: "Dwarf Scroll III" }, price: 250, where: { es: "Mina del cráneo",             en: "Skull cavern" },                 rec: "both" },
  { id: "dwarf4",      emoji: "📜", name: { es: "Pergamino enano IV", en: "Dwarf Scroll IV" },  price: 500,  where: { es: "Mina del cráneo, raro",        en: "Skull cavern, rare" },           rec: "both" },
  { id: "ancientseed", emoji: "🌰", name: { es: "Semilla antigua",   en: "Ancient Seed" },     price: 5,    where: { es: "Excavar, monstruos antiguos", en: "Dig, ancient monsters" },        rec: "keep",   note: { es: "★ Donar 1, plantar resto → Fruta antigua (mejor para vino)", en: "★ Donate 1, plant the rest → Ancient Fruit (best for wine)" } },
  { id: "dinoegg",     emoji: "🥚", name: { es: "Huevo de dinosaurio", en: "Dinosaur Egg" },   price: 350,  where: { es: "Excavar tundra, dino fósil",  en: "Dig tundra, dino remains" },     rec: "keep",   note: { es: "★ Incubar → Dinosaurio → Mayonesa de dino (800g)", en: "★ Incubate → Dinosaur → Dino Mayo (800g)" } },
  { id: "amphora",     emoji: "🏺", name: { es: "Ánfora rota",       en: "Chipped Amphora" },  price: 100,  where: { es: "Excavar (parche)",            en: "Dig (artifact spot)" },          rec: "both" },
  { id: "arrowhead",   emoji: "🔻", name: { es: "Punta de flecha",   en: "Arrowhead" },        price: 100,  where: { es: "Excavar (mte/playa)",         en: "Dig (mountain/beach)" },         rec: "both" },
  { id: "ancientdoll", emoji: "🪆", name: { es: "Muñeca antigua",    en: "Ancient Doll" },     price: 100,  where: { es: "Excavar, monstruos",          en: "Dig, monsters" },                rec: "both" },
  { id: "elvish",      emoji: "💍", name: { es: "Joya élfica",       en: "Elvish Jewelry" },   price: 200,  where: { es: "Excavar bosque",              en: "Dig forest" },                   rec: "both" },
  { id: "fan",         emoji: "🪭", name: { es: "Abanico ornamental", en: "Ornamental Fan" }, price: 300,  where: { es: "Excavar playa, geoda",        en: "Dig beach, geode" },             rec: "both" },
  { id: "raredisc",    emoji: "🥏", name: { es: "Disco raro",        en: "Rare Disc" },        price: 300,  where: { es: "Excavar, monstruos",          en: "Dig, monsters" },                rec: "both" },
  { id: "goldmask",    emoji: "👑", name: { es: "Máscara dorada",    en: "Golden Mask" },      price: 500,  where: { es: "Excavar desierto",            en: "Dig desert" },                   rec: "both" },
  { id: "goldrelic",   emoji: "🏆", name: { es: "Reliquia dorada",   en: "Golden Relic" },     price: 500,  where: { es: "Excavar desierto",            en: "Dig desert" },                   rec: "both" },
  { id: "strangedoll", emoji: "🎎", name: { es: "Muñeca extraña",    en: "Strange Doll" },     price: 1000, where: { es: "Pesca de basura, raro",       en: "Trash fishing, rare" },          rec: "donate", note: { es: "Solo se vende a 1000g si ya donaste", en: "Sells 1000g only after donating" } },
  { id: "rustyspoon",  emoji: "🥄", name: { es: "Cuchara oxidada",   en: "Rusty Spoon" },      price: 25,   where: { es: "Pesca de basura",             en: "Trash from fishing" },           rec: "donate" },
  { id: "rustycog",    emoji: "⚙️", name: { es: "Engranaje oxidado", en: "Rusty Cog" },        price: 25,   where: { es: "Pesca de basura",             en: "Trash from fishing" },           rec: "donate" },
  { id: "fossil",      emoji: "🦴", name: { es: "Fósiles (varios)",  en: "Fossils (various)" }, price: 100, where: { es: "Excavar tundra/desierto",     en: "Dig tundra/desert" },            rec: "donate", note: { es: "Set completo → recompensa Curador", en: "Full set → curator reward" } },
];

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
