import { ScrollView, Text, View } from "react-native";
import { CardPixel, Coin } from "../components/primitives";
import { ANIMALS } from "../data";
import { I18N, useT } from "../i18n";
import { useTheme } from "../theme";

const PIXEL = "monospace";

export function AnimalsScreen({ state }) {
  const { lang } = state;
  const t = useT(lang);
  const theme = useTheme();
  const misc = I18N[lang].misc;

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 14, gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: "800", color: theme.ink }}>{t("animals.title")}</Text>
      {ANIMALS.map((a) => (
        <CardPixel key={a.id} style={{ padding: 12 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <View
              style={{
                width: 44,
                height: 44,
                backgroundColor: theme.surface2,
                borderWidth: 2,
                borderColor: theme.ink,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 24 }}>{a.emoji}</Text>
            </View>
            <View>
              <Text style={{ fontSize: 15, fontWeight: "800", color: theme.ink }}>
                {a.name[lang]}
              </Text>
              <Text
                style={{
                  fontFamily: PIXEL,
                  fontSize: 10,
                  color: theme.ink2,
                  letterSpacing: 0.6,
                  textTransform: "uppercase",
                }}
              >
                {a.produces.length} {misc.productsCount}
              </Text>
            </View>
          </View>
          <View style={{ gap: 6 }}>
            {a.produces.map((p) => (
              <View
                key={p.id}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  paddingHorizontal: 8,
                  paddingVertical: 6,
                  backgroundColor: theme.surface2,
                  borderWidth: 1,
                  borderColor: theme.ink3,
                  borderStyle: "dashed",
                  borderRadius: 2,
                }}
              >
                <Text style={{ fontSize: 18 }}>{p.emoji}</Text>
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Text style={{ fontSize: 13, fontWeight: "700", color: theme.ink }}>
                    {p.name[lang]}
                  </Text>
                  <Text style={{ fontFamily: PIXEL, fontSize: 10, color: theme.ink2 }}>
                    {t("animals.every")} {p.every} {t("animals.days")}
                    {p.note ? (
                      <Text style={{ color: theme.accent2 }}> · {p.note[lang]}</Text>
                    ) : null}
                  </Text>
                </View>
                <Coin value={p.price} size={12} />
              </View>
            ))}
          </View>
        </CardPixel>
      ))}
    </ScrollView>
  );
}
