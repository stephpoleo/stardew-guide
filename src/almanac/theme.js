import { createContext, useContext, useMemo } from "react";

export const SEASONS = ["spring", "summer", "fall", "winter"];

const PALETTES = {
  spring: {
    bg: "#f2f5d7",
    surface: "#fbfce8",
    surface2: "#e9f0c4",
    ink: "#33401c",
    ink2: "#5e703a",
    ink3: "#8fa464",
    line: "#cddc9c",
    accent: "#6aa84f",
    accent2: "#e27aa8",
    gold: "#d9a441",
    danger: "#c85a4b",
    water: "#5ba8c9",
    sky: "#cfe8d4",
  },
  summer: {
    bg: "#fdf2d0",
    surface: "#fffaea",
    surface2: "#fde7a8",
    ink: "#4a2c12",
    ink2: "#7a4e22",
    ink3: "#b58450",
    line: "#eacf84",
    accent: "#e07a2a",
    accent2: "#2aa7b5",
    gold: "#d9a441",
    danger: "#c85a4b",
    water: "#5ba8c9",
    sky: "#ffe7a2",
  },
  fall: {
    bg: "#f1dcc0",
    surface: "#fcecd2",
    surface2: "#e9c8a0",
    ink: "#3d1f10",
    ink2: "#6e3a1c",
    ink3: "#a56a3c",
    line: "#c79a68",
    accent: "#b84a20",
    accent2: "#7a3f1a",
    gold: "#c98a2b",
    danger: "#c85a4b",
    water: "#5ba8c9",
    sky: "#e4b883",
  },
  winter: {
    bg: "#dceaf1",
    surface: "#f1f7fb",
    surface2: "#c3d9e5",
    ink: "#1f324a",
    ink2: "#3f5c7a",
    ink3: "#6a87a6",
    line: "#a4bfd1",
    accent: "#3b7ab8",
    accent2: "#8aa0b8",
    gold: "#b9b36b",
    danger: "#c85a4b",
    water: "#5ba8c9",
    sky: "#eaf3f8",
  },
};

const ThemeCtx = createContext(PALETTES.spring);

export function ThemeProvider({ season, children }) {
  const palette = useMemo(() => PALETTES[season] || PALETTES.spring, [season]);
  return <ThemeCtx.Provider value={palette}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  return useContext(ThemeCtx);
}
