export function fmtG(v) {
  return typeof v === "number" ? `${v.toLocaleString()}g` : (v ?? "\u2014");
}

export function pColor(g) {
  if (g >= 2000) return "#b71c1c";
  if (g >= 900) return "#c62828";
  if (g >= 400) return "#2e7d32";
  if (g >= 150) return "#1565c0";
  return "#555";
}
