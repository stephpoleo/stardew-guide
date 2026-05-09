import { ScrollView, Text, View } from "react-native";
import { CardPixel, EmptyState, PixelSprite } from "../components/primitives";
import { CROPS, RECIPES } from "../data";
import { useT } from "../i18n";
import { useTheme } from "../theme";

const PIXEL = "monospace";

export function CompareScreen({ state }) {
  const { lang, season } = state;
  const t = useT(lang);
  const theme = useTheme();

  const seasonCrops = CROPS.filter(
    (c) => (c.season === season || c.season === "all") && c.days > 0,
  );
  const rows = seasonCrops.map((c) => {
    const keg = RECIPES.keg[c.id];
    const pres = RECIPES.preserves[c.id];
    const rawPrice = c.sellPrice;
    const kegPrice = keg?.mult
      ? Math.round(rawPrice * keg.mult)
      : keg?.flat
      ? rawPrice + keg.flat
      : null;
    const presPrice = pres?.flat
      ? pres.mult
        ? rawPrice * pres.mult
        : rawPrice + pres.flat
      : null;
    const options = [
      { id: "raw", label: t("compare.raw"), price: rawPrice },
      keg && { id: "keg", label: keg.out[lang], price: kegPrice },
      pres && { id: "pres", label: pres.out[lang], price: Math.round(presPrice) },
    ].filter(Boolean);
    const best = options.reduce((a, b) => (b.price > a.price ? b : a), options[0]);
    return { crop: c, options, best };
  });

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 14, gap: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: "800", color: theme.ink }}>
        {t("compare.title")}
      </Text>
      <View style={{ gap: 8 }}>
        {rows.length === 0 ? <EmptyState glyph="❄️" title={t("compare.empty")} /> : null}
        {rows.map(({ crop, options, best }) => (
          <CardPixel key={crop.id} style={{ padding: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <PixelSprite id={crop.id} color={crop.color} emoji={crop.emoji} size={36} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 13, fontWeight: "700", color: theme.ink }}>
                  {crop.name[lang]}
                </Text>
                <Text
                  style={{
                    fontFamily: PIXEL,
                    fontSize: 10,
                    color: theme.ink2,
                    textTransform: "uppercase",
                    letterSpacing: 0.6,
                  }}
                >
                  {t("compare.bestOf")}:{" "}
                  <Text style={{ color: theme.accent, fontWeight: "700" }}>{best.label}</Text>
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", gap: 4 }}>
              {options.map((o) => {
                const isBest = o.id === best.id;
                return (
                  <View
                    key={o.id}
                    style={{
                      flex: 1,
                      paddingHorizontal: 6,
                      paddingVertical: 7,
                      backgroundColor: isBest ? theme.accent : theme.surface2,
                      borderWidth: 2,
                      borderColor: theme.ink,
                      borderRadius: 2,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: PIXEL,
                        fontSize: 9,
                        letterSpacing: 0.4,
                        textTransform: "uppercase",
                        color: isBest ? "#fff" : theme.ink,
                        opacity: 0.9,
                        textAlign: "center",
                      }}
                    >
                      {o.label}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "800",
                        marginTop: 2,
                        color: isBest ? "#fff" : theme.ink,
                      }}
                    >
                      {o.price}g
                    </Text>
                  </View>
                );
              })}
            </View>
          </CardPixel>
        ))}
      </View>
    </ScrollView>
  );
}
