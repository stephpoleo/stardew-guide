import { Pressable, Text, View } from "react-native";
import { useTheme } from "../theme";

const PIXEL = "monospace";

export function TabBar({ page, setPage, t }) {
  const theme = useTheme();
  const items = [
    { id: "home",     label: t("nav.home"),     glyph: "🏡", matches: ["home"] },
    { id: "seeds",    label: t("nav.seeds"),    glyph: "🌱", matches: ["seeds"] },
    { id: "fish",     label: t("nav.fish"),     glyph: "🎣", matches: ["fish", "fishDetail"] },
    { id: "animals",  label: t("nav.animals"),  glyph: "🐄", matches: ["animals"] },
    { id: "codex",    label: t("nav.codex"),    glyph: "🏪", matches: ["codex", "minerals", "gifts", "artifacts"] },
    { id: "workshop", label: t("nav.workshop"), glyph: "🛠️", matches: ["workshop", "process", "cask", "compare"] },
  ];
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: theme.surface,
        borderTopWidth: 2,
        borderTopColor: theme.ink,
        paddingBottom: 2,
      }}
    >
      {items.map((it) => {
        const active = it.matches.includes(page);
        return (
          <Pressable
            key={it.id}
            onPress={() => setPage(it.id)}
            style={{
              flex: 1,
              paddingVertical: 8,
              paddingHorizontal: 2,
              alignItems: "center",
              gap: 3,
            }}
          >
            {active ? (
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: "20%",
                  right: "20%",
                  height: 3,
                  backgroundColor: theme.accent,
                }}
              />
            ) : null}
            <Text
              style={{
                fontSize: 18,
                opacity: active ? 1 : 0.55,
              }}
            >
              {it.glyph}
            </Text>
            <Text
              style={{
                fontFamily: PIXEL,
                fontSize: 9,
                letterSpacing: 0.4,
                textTransform: "uppercase",
                fontWeight: active ? "700" : "500",
                color: active ? theme.accent : theme.ink3,
              }}
            >
              {it.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
