#!/usr/bin/env node
// Generate the app icon as a pixel-art strawberry (original art, drawn
// pixel-by-pixel here). Outputs assets/icon.png at 1024×1024 and
// assets/favicon.png at 64×64. Each logical pixel from the GRID below
// gets scaled into a square block.

const fs = require("fs");
const path = require("path");
const { PNG } = require("pngjs");

const root = path.resolve(__dirname, "..");

const PALETTE = {
  ".": [0, 0, 0, 0],          // transparent
  "C": [251, 252, 232, 255],  // cream background
  "D": [58, 42, 26, 255],     // dark frame
  "R": [217, 74, 90, 255],    // strawberry red
  "r": [165, 50, 65, 255],    // red shadow
  "W": [255, 250, 234, 255],  // seed highlight
  "L": [118, 168, 69, 255],   // leaf green
  "l": [78, 110, 45, 255],    // leaf shadow
};

// 16×16 hand-drawn grid. Each row MUST be 16 chars.
const GRID = [
  "DDDDDDDDDDDDDDDD",
  "DCCCCCCCLCCCCCCD",
  "DCCCCCCLlLCCCCCD",
  "DCCCCCLLlLLCCCCD",
  "DCCCCLLlLlLLCCCD",
  "DCCCrRRRRRRRrCCD",
  "DCCRRWRRRRRWRRCD",
  "DCRRRRRRRRRRRRRD",
  "DCRRRRWRRRWRRRrD",
  "DCRRWRRRRRRRRrCD",
  "DCCrRRRRWRRRrCCD",
  "DCCCrRRRRRRrCCCD",
  "DCCCCrRRRRrCCCCD",
  "DCCCCCrRRrCCCCCD",
  "DCCCCCCrrCCCCCCD",
  "DDDDDDDDDDDDDDDD",
];

if (GRID.some((row) => row.length !== 16)) {
  console.error("post-build: GRID rows must be exactly 16 chars.");
  process.exit(1);
}

function render(outPath, size) {
  const cell = size / 16;
  const png = new PNG({ width: size, height: size });
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const ch = GRID[Math.floor(y / cell)][Math.floor(x / cell)];
      const rgba = PALETTE[ch] || PALETTE["."];
      const idx = (y * size + x) * 4;
      png.data[idx + 0] = rgba[0];
      png.data[idx + 1] = rgba[1];
      png.data[idx + 2] = rgba[2];
      png.data[idx + 3] = rgba[3];
    }
  }
  fs.writeFileSync(outPath, PNG.sync.write(png));
  console.log(`make-icon: wrote ${path.relative(root, outPath)} (${size}×${size})`);
}

render(path.join(root, "assets", "icon.png"), 1024);
render(path.join(root, "assets", "favicon.png"), 64);
render(path.join(root, "assets", "adaptive-icon.png"), 1024);
render(path.join(root, "assets", "splash-icon.png"), 1024);
