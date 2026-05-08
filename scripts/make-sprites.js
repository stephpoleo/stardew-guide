#!/usr/bin/env node
// Generate per-item pixel-art sprites for crops, fish, minerals and eggs.
// Each sprite is rendered from a 16×16 hand-authored template, scaled to a
// 64×64 PNG, and saved under assets/sprites/<id>.png. Items not listed here
// keep the emoji + tile fallback in PixelSprite.

const fs = require("fs");
const path = require("path");
const { PNG } = require("pngjs");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "assets", "sprites");
fs.mkdirSync(outDir, { recursive: true });

// ── helpers ─────────────────────────────────────────────────────────
const hex = (h) => {
  const m = h.replace("#", "");
  return [parseInt(m.slice(0, 2), 16), parseInt(m.slice(2, 4), 16), parseInt(m.slice(4, 6), 16), 255];
};
const dark = (c, k = 0.6) => [Math.round(c[0] * k), Math.round(c[1] * k), Math.round(c[2] * k), 255];
const lite = (c, k = 1.4) => [
  Math.min(255, Math.round(c[0] * k)),
  Math.min(255, Math.round(c[1] * k)),
  Math.min(255, Math.round(c[2] * k)),
  255,
];

function render(template, palette, outPath, size = 64) {
  const grid = template.length;
  const cell = size / grid;
  const png = new PNG({ width: size, height: size });
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const ch = template[Math.floor(y / cell)][Math.floor(x / cell)];
      const rgba = palette[ch] || [0, 0, 0, 0];
      const idx = (y * size + x) * 4;
      png.data[idx + 0] = rgba[0];
      png.data[idx + 1] = rgba[1];
      png.data[idx + 2] = rgba[2];
      png.data[idx + 3] = rgba[3];
    }
  }
  fs.writeFileSync(outPath, PNG.sync.write(png));
}

// ── templates (16×16) ───────────────────────────────────────────────
// F = fruit, f = fruit shadow, W = highlight, L = leaf, l = leaf shadow
// D = dark outline, S = stem
const FRUIT_ROUND = [
  "................",
  ".......L........",
  "......LLLS......",
  ".....LLlLLS.....",
  "......LLL.S.....",
  ".....FFFFF......",
  "...FFFFFFFFF....",
  "..FFFFWFFFFFF...",
  "..FFFFFFFFFFFF..",
  "..FFFWFFFFFfFF..",
  "..FFFFFFFFFFFF..",
  "..fFFFFFFFFFFf..",
  "...fFFFFFFFFf...",
  "....fFFFFFFf....",
  ".....fFFFf......",
  ".......f........",
];

const FRUIT_BERRY = [
  "................",
  ".......L........",
  "......LLLS......",
  ".....LLlLLS.....",
  "......LLLS......",
  "....FFFFFFF.....",
  "...FFFWFFFFF....",
  "..FFFFFFFFFFF...",
  "..FFFFFFFFFFF...",
  "..FFFWFFFWFFF...",
  "..FFFFFFFFFFF...",
  "...FFFFFFFFf....",
  "....fFFFFFf.....",
  ".....fFFff......",
  "......ff........",
  "................",
];

const ROOT_VEG = [
  "................",
  "....L...L.......",
  "....LLLLL.......",
  ".....LLL........",
  ".....LSL........",
  "....FFSFF.......",
  "...FFFSFFF......",
  "..FFFFFFFFF.....",
  "..FFFWFFFFF.....",
  "..FFFFFFFFF.....",
  "...FFFFFFf......",
  "....FFFFFf......",
  ".....FFFf.......",
  "......FFf.......",
  ".......ff.......",
  "................",
];

const LEAFY_VEG = [
  "................",
  "......LLL.......",
  ".....LLLLL......",
  "....LLLLLLL.....",
  "...LLLLlLLLL....",
  "..LLLLLLLLLLL...",
  "..LLLlLLLLlLL...",
  "..LLLLLLLLLLL...",
  "...LLLLLLLLL....",
  "...LLLlLLLLL....",
  "....LLLLLLL.....",
  ".....LLLLL......",
  "......LLL.......",
  "......LLL.......",
  "......LLL.......",
  "................",
];

const FISH = [
  "................",
  "................",
  "................",
  "........FFFFD...",
  "......FFFFFFFD..",
  ".....FFFWFFFFFD.",
  "...FFFFFFFFFFFFD",
  "..FFFFFFFFFFFFFD",
  "..FFFFFFFFFFFFFD",
  "...FFFFFFFFFFFFD",
  ".....FFFWFFFFFD.",
  "......FFFFFFFD..",
  "........FFFFD...",
  "................",
  "................",
  "................",
];

const GEM_DIAMOND = [
  "................",
  "................",
  ".....DDDDDD.....",
  "....DFFWFFFD....",
  "...DFFFFFFFFD...",
  "..DFFWFFFFFFFD..",
  "..DFFFFFFFFFFD..",
  "..DFFFFFFFFFfD..",
  "...DFFFFFFFfD...",
  "....DFFFFFfD....",
  ".....DFFFfD.....",
  "......DFfD......",
  ".......DD.......",
  "................",
  "................",
  "................",
];

const ORE_CHUNK = [
  "................",
  ".......DDD......",
  "......DFFFD.....",
  ".....DFFWFFD....",
  "....DFFFFFFFD...",
  "...DFFFWFFFFD...",
  "..DFFFFFFFFFFD..",
  "..DFFWFFFFfFFD..",
  "..DFFFFFFFfFFD..",
  "..DFFFFWFFFfFD..",
  "...DFFFFFffFD...",
  "....DFFFFffD....",
  ".....DFFffD.....",
  "......DffD......",
  ".......DD.......",
  "................",
];

const EGG_OVAL = [
  "................",
  "......DDDD......",
  ".....DFFFFD.....",
  "....DFWFFFFD....",
  "...DFFFFFFFFD...",
  "..DFFFFFFFFFFD..",
  "..DFFFFFFFFFFD..",
  "..DFFFFFFFFFFD..",
  "..DFFFFFFFFFFD..",
  "..DFFFFFFFFFFD..",
  "...DFFFFFFFFD...",
  "...DFFFFFFFFD...",
  "....DFFFFFFD....",
  ".....DFFFFD.....",
  "......DDDD......",
  "................",
];

// ── items ───────────────────────────────────────────────────────────
// Per-item: id, template, base hex, accent hex (optional override)
const ITEMS = [
  // Crops — fruit-shaped
  ["strawberry", FRUIT_BERRY,  "#d94a5a", "#76a845"],
  ["blueberry",  FRUIT_BERRY,  "#4a6fb8", "#76a845"],
  ["cranberry",  FRUIT_BERRY,  "#b83a3a", "#76a845"],
  ["grape",      FRUIT_BERRY,  "#7a4a9c", "#76a845"],
  ["hotpepper",  FRUIT_ROUND,  "#c84a3a", "#76a845"],
  ["sweetgem",   FRUIT_ROUND,  "#a060c0", "#76a845"],
  // Crops — round/melon
  ["melon",      FRUIT_ROUND,  "#9bbf3f", "#5e7034"],
  ["pumpkin",    FRUIT_ROUND,  "#d97a2a", "#5e7034"],
  ["starfruit",  FRUIT_ROUND,  "#e8c547", "#76a845"],
  // Crops — root
  ["parsnip",    ROOT_VEG,     "#e8d48a", "#76a845"],
  ["potato",     ROOT_VEG,     "#b8955c", "#76a845"],
  ["wintroot",   ROOT_VEG,     "#c2a070", "#5e7034"],
  // Crops — leafy
  ["cauliflower",LEAFY_VEG,    "#f4efd8", "#76a845"],
  ["greenbean",  LEAFY_VEG,    "#76a845", "#5e7034"],
  ["hops",       LEAFY_VEG,    "#a8c060", "#5e7034"],
  ["artichoke",  LEAFY_VEG,    "#7a9848", "#5e7034"],

  // Fish (single template, variant body color)
  ["sunfish",    FISH, "#e8c547"],
  ["catfish",    FISH, "#5e4a3a"],
  ["rainbow",    FISH, "#c870b0"],
  ["sardine",    FISH, "#9caab8"],
  ["tuna",       FISH, "#3d6a8c"],
  ["pufferfish", FISH, "#dab455"],
  ["largemouth", FISH, "#5e7048"],
  ["eel",        FISH, "#3a4a3a"],
  ["sturgeon",   FISH, "#6a5a4a"],
  ["lenny",      FISH, "#7a8aa0"],
  ["perch",      FISH, "#8aa450"],
  ["squid",      FISH, "#b86a8a"],

  // Minerals — gem-shaped
  ["diamond",    GEM_DIAMOND, "#cfeaf0"],
  ["ruby",       GEM_DIAMOND, "#d83a4a"],
  ["emerald",    GEM_DIAMOND, "#3aac6a"],
  ["topaz",      GEM_DIAMOND, "#e89030"],
  ["aquamarine", GEM_DIAMOND, "#5cb6d4"],
  ["jade",       GEM_DIAMOND, "#6abc7a"],
  ["amethyst",   GEM_DIAMOND, "#a060c0"],
  ["prismatic",  GEM_DIAMOND, "#ff8ad6"],
  // Minerals — ore chunks
  ["iridium",    ORE_CHUNK, "#a060c0"],
  ["gold",       ORE_CHUNK, "#e8c547"],
  ["iron",       ORE_CHUNK, "#a8aab0"],
  ["copper",     ORE_CHUNK, "#c87a2a"],
  ["quartz",     ORE_CHUNK, "#e0e0e8"],
  ["firequartz", ORE_CHUNK, "#d04a3a"],
  ["frozentear", ORE_CHUNK, "#5cb6d4"],
  ["earthcrystal",ORE_CHUNK, "#8c7a4a"],

  // Eggs (animal products)
  ["egg",        EGG_OVAL, "#fbe6c0"],
  ["biggegg",    EGG_OVAL, "#fbe6a0"],
  ["duckegg",    EGG_OVAL, "#bfdaf0"],
];

let count = 0;
for (const [id, template, baseHex, accentHex] of ITEMS) {
  const F = hex(baseHex);
  const L = accentHex ? hex(accentHex) : hex("#76a845");
  const palette = {
    ".": [0, 0, 0, 0],
    "F": F,
    "f": dark(F, 0.65),
    "W": lite(F, 1.5),
    "L": L,
    "l": dark(L, 0.6),
    "S": dark(L, 0.4),
    "D": [38, 28, 18, 255],
  };
  render(template, palette, path.join(outDir, `${id}.png`));
  count++;
}

console.log(`make-sprites: wrote ${count} sprites to ${path.relative(root, outDir)}`);

// Emit a sprite map module so Metro can statically resolve each require().
const ids = ITEMS.map(([id]) => id).sort();
const mapPath = path.join(root, "src", "almanac", "sprites.js");
const lines = [
  "// AUTO-GENERATED by scripts/make-sprites.js. Do not edit by hand.",
  "// Run `node scripts/make-sprites.js` to regenerate.",
  "",
  "export const SPRITES = {",
  ...ids.map((id) => `  ${JSON.stringify(id)}: require("../../assets/sprites/${id}.png"),`),
  "};",
  "",
];
fs.writeFileSync(mapPath, lines.join("\n"));
console.log(`make-sprites: wrote ${path.relative(root, mapPath)} (${ids.length} entries)`);
