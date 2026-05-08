import { ScrollView, Text, View } from "react-native";
import { CardPixel, Chip, pixelShadow } from "../components/primitives";
import { GIFTS } from "../data";
import { useT } from "../i18n";
import { useTheme } from "../theme";

const PIXEL = "monospace";

const TIER_ORDER = ["universal", "liked", "cooked", "avoid"];
const TIER_TONE = { universal: "accent", liked: "gold", cooked: "water", avoid: "danger" };
const TIER_GLYPH = { universal: "★", liked: "👍", cooked: "🍳", avoid: "🚫" };

export function GiftsScreen({ state }) {
  const { lang } = state;
  const t = useT(lang);
  const theme = useTheme();

  const grouped = TIER_ORDER.map((tier) => ({
    tier,
    items: GIFTS.filter((g) => g.tier === tier),
  }));

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 14, gap: 12 }}>
      <View>
        <Text style={{ fontSize: 18, fontWeight: "800", color: theme.ink }}>
          {t("gifts.title")}
        </Text>
        <Text style={{ fontFamily: PIXEL, fontSize: 11, color: theme.ink2, marginTop: 2 }}>
          {t("gifts.subtitle")}
        </Text>
      </View>

      <View
        style={[
          {
            backgroundColor: theme.ink,
            paddingVertical: 10,
            paddingHorizontal: 12,
            borderWidth: 2,
            borderColor: theme.ink,
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
          },
          pixelShadow(theme.gold, 3),
        ]}
      >
        <Text style={{ fontSize: 18, color: theme.gold }}>💡</Text>
        <Text style={{ flex: 1, color: theme.surface, fontSize: 11, lineHeight: 15 }}>
          {t("gifts.tip")}
        </Text>
      </View>

      {grouped.map(({ tier, items }) => (
        <View key={tier} style={{ gap: 6 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 2 }}>
            <Text style={{ fontSize: 14 }}>{TIER_GLYPH[tier]}</Text>
            <Text
              style={{
                fontFamily: PIXEL,
                fontSize: 11,
                letterSpacing: 1.0,
                color: theme.ink2,
                textTransform: "uppercase",
                fontWeight: "700",
              }}
            >
              {t(`gifts.tier.${tier}`)}
            </Text>
            <View style={{ flex: 1, height: 1, backgroundColor: theme.line, marginLeft: 4 }} />
          </View>

          {items.map((g) => (
            <CardPixel
              key={g.id}
              soft={tier !== "universal"}
              style={{ padding: 10, flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <View
                style={{
                  width: 38,
                  height: 38,
                  backgroundColor: theme.surface2,
                  borderWidth: 2,
                  borderColor: theme.ink,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 2,
                }}
              >
                <Text style={{ fontSize: 20 }}>{g.emoji}</Text>
              </View>
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text style={{ fontSize: 13, fontWeight: "700", color: theme.ink }}>
                  {g.name[lang]}
                </Text>
                {g.note ? (
                  <Text style={{ fontFamily: PIXEL, fontSize: 10, color: theme.ink2, marginTop: 2 }}>
                    {g.note[lang]}
                  </Text>
                ) : null}
              </View>
              <Chip tone={TIER_TONE[tier]}>{t(`gifts.tier.${tier}`).split(" ")[0]}</Chip>
            </CardPixel>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}
