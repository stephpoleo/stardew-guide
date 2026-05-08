import { ScrollView, Text, View } from "react-native";
import { CardPixel, Chip, Coin } from "../components/primitives";
import { MINERALS } from "../data";
import { useT } from "../i18n";
import { useTheme } from "../theme";

const PIXEL = "monospace";

const ACTION_TONE = {
  sell: "neutral",
  crystal: "accent",
  smelt: "gold",
  gift: "danger",
  refine: "neutral",
  forge: "water",
};

export function MineralsScreen({ state }) {
  const { lang } = state;
  const t = useT(lang);
  const theme = useTheme();

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 14, gap: 10 }}>
      <View>
        <Text style={{ fontSize: 18, fontWeight: "800", color: theme.ink }}>
          {t("minerals.title")}
        </Text>
        <Text style={{ fontFamily: PIXEL, fontSize: 11, color: theme.ink2, marginTop: 2 }}>
          {t("minerals.subtitle")}
        </Text>
      </View>

      {MINERALS.map((m) => (
        <CardPixel key={m.id} style={{ padding: 10, flexDirection: "row", alignItems: "center", gap: 10 }}>
          <View
            style={{
              width: 44,
              height: 44,
              backgroundColor: theme.surface2,
              borderWidth: 2,
              borderColor: theme.ink,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
            }}
          >
            <Text style={{ fontSize: 22 }}>{m.emoji}</Text>
          </View>
          <View style={{ flex: 1, minWidth: 0 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <Text style={{ fontSize: 14, fontWeight: "700", color: theme.ink }}>
                {m.name[lang]}
              </Text>
              <Chip tone="neutral">{t(`minerals.tier.${m.tier}`)}</Chip>
            </View>
            <Text style={{ fontFamily: PIXEL, fontSize: 11, color: theme.ink2, marginTop: 3 }}>
              📍 {m.where[lang]}
            </Text>
            {m.note ? (
              <Text style={{ fontFamily: PIXEL, fontSize: 10, color: theme.accent2, marginTop: 3 }}>
                {m.note[lang]}
              </Text>
            ) : null}
            <View style={{ flexDirection: "row", gap: 4, marginTop: 6 }}>
              <Chip tone={ACTION_TONE[m.action] || "neutral"}>
                {t(`minerals.action.${m.action}`)}
              </Chip>
            </View>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text
              style={{
                fontFamily: PIXEL,
                fontSize: 9,
                color: theme.ink3,
                textTransform: "uppercase",
                letterSpacing: 0.6,
              }}
            >
              {t("minerals.price")}
            </Text>
            <Coin value={m.price} size={13} />
          </View>
        </CardPixel>
      ))}
    </ScrollView>
  );
}
