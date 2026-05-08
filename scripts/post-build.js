#!/usr/bin/env node
// Post-process the Expo web export to make the site installable as a PWA.
// Runs after `expo export --platform web` populates dist/.
//
//   1. Copy public/manifest.webmanifest and assets/icon.png into dist/
//      so the manifest and icon are reachable at /manifest.webmanifest
//      and /icon.png.
//   2. Inject PWA <meta>/<link> tags into dist/index.html so iOS Safari
//      "Add to Home Screen" and Android Chrome "Install" both work.

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const indexPath = path.join(distDir, "index.html");

if (!fs.existsSync(indexPath)) {
  console.error("post-build: dist/index.html not found, skipping.");
  process.exit(0);
}

// 1. Copy static assets into dist.
const copies = [
  { from: path.join(root, "public", "manifest.webmanifest"), to: path.join(distDir, "manifest.webmanifest") },
  { from: path.join(root, "assets", "icon.png"), to: path.join(distDir, "icon.png") },
];
for (const { from, to } of copies) {
  if (!fs.existsSync(from)) {
    console.warn(`post-build: missing ${from}, skipping.`);
    continue;
  }
  fs.copyFileSync(from, to);
  console.log(`post-build: copied ${path.relative(root, from)} → ${path.relative(root, to)}`);
}

// 2. Inject PWA meta/link tags into <head>.
const PWA_TAGS = [
  '<link rel="manifest" href="/manifest.webmanifest" />',
  '<meta name="theme-color" content="#2b2216" />',
  '<meta name="apple-mobile-web-app-capable" content="yes" />',
  '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />',
  '<meta name="apple-mobile-web-app-title" content="Almanac" />',
  '<link rel="apple-touch-icon" href="/icon.png" />',
].join("\n  ");

let html = fs.readFileSync(indexPath, "utf8");
if (html.includes("manifest.webmanifest")) {
  console.log("post-build: PWA tags already present, skipping injection.");
} else {
  html = html.replace(/<\/head>/i, `  ${PWA_TAGS}\n</head>`);
  console.log("post-build: injected PWA tags into dist/index.html");
}
html = html.replace(/<title>[^<]*<\/title>/i, "<title>Harvest Almanac</title>");
fs.writeFileSync(indexPath, html);
