import { toAbs, fromAbs } from "../utils/dateHelpers";

export const AGING = {
  "Wine":        { silver: 14, gold: 28, iridium: 56 },
  "Juice":       { silver: 14, gold: 28, iridium: 56 },
  "Pale Ale":    { silver: 8,  gold: 17, iridium: 34 },
  "Beer":        { silver: 6,  gold: 12, iridium: 24 },
  "Mead":        { silver: 4,  gold: 8,  iridium: 16 },
  "Cheese":      { silver: 4,  gold: 8,  iridium: 14 },
  "Goat Cheese": { silver: 4,  gold: 8,  iridium: 14 },
};

export const PROD_ICON = {
  "Wine": "\ud83c\udf77", "Juice": "\ud83e\uddc3", "Pale Ale": "\ud83c\udf7a",
  "Beer": "\ud83c\udf7b", "Mead": "\ud83c\udf6f", "Cheese": "\ud83e\uddc0", "Goat Cheese": "\ud83d\udc10",
};

export const QUALITY_META = {
  Silver:  { icon: "\u2b50", color: "#546e7a", bg: "#eceff1", label: "Silver"  },
  Gold:    { icon: "\ud83c\udf1f", color: "#f9a825", bg: "#fffde7", label: "Gold"    },
  Iridium: { icon: "\ud83d\udc9c", color: "#7b1fa2", bg: "#f3e5f5", label: "Iridium" },
};

export function getUpgrades(entry) {
  const a = AGING[entry.product];
  if (!a) return [];
  const placedAbs = toAbs(
    Number(entry.placedYear),
    entry.placedSeason,
    Number(entry.placedDay)
  );
  const startOffset = entry.startQuality === "Gold" ? a.gold
    : entry.startQuality === "Silver" ? a.silver : 0;

  const upgrades = [];
  const tiers = [
    { quality: "Silver",  days: a.silver  },
    { quality: "Gold",    days: a.gold    },
    { quality: "Iridium", days: a.iridium },
  ];
  for (const t of tiers) {
    if (t.days > startOffset) {
      const abs = placedAbs + t.days - startOffset;
      upgrades.push({ quality: t.quality, abs, date: fromAbs(abs) });
    }
  }
  return upgrades;
}
