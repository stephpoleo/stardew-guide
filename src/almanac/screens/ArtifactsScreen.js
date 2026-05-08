import { ScrollView, Text, View } from "react-native";
import { CardPixel, Chip, Coin, pixelShadow } from "../components/primitives";
import { ARTIFACTS } from "../data";
import { useT } from "../i18n";
import { useTheme } from "../theme";

const PIXEL = "monospace";

const REC_TONE = {
  donate: "water",
  sell: "gold",
  both: "accent",
  keep: "danger",
};

export function ArtifactsScreen({ state }) {
  const { lang } = state;
  const t = useT(lang);
  const theme = useTheme();

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 14, gap: 10 }}>
      <View>
        <Text style={{ fontSize: 18, fontWeight: "800", color: theme.ink }}>
          {t("artifacts.title")}
        </Text>
        <Text style={{ fontFamily: PIXEL, fontSize: 11, color: theme.ink2, marginTop: 2 }}>
          {t("artifacts.subtitle")}
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
        <Text style={{ fontSize: 18, color: theme.gold }}>🏛️</Text>
        <Text style={{ flex: 1, color: theme.surface, fontSize: 11, lineHeight: 15 }}>
          {t("artifacts.tip")}
        </Text>
      </View>

      {ARTIFACTS.map((a) => {
        const recLabel = t(`artifacts.${a.rec === "both" ? "both" : a.rec === "keep" ? "keep" : a.rec === "sell" ? "sell" : "donate"}`);
        return (
          <CardPixel
            key={a.id}
            style={{ padding: 10, flexDirection: "row", alignItems: "center", gap: 10 }}
          >
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
              <Text style={{ fontSize: 22 }}>{a.emoji}</Text>
            </View>
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={{ fontSize: 14, fontWeight: "700", color: theme.ink }}>
                {a.name[lang]}
              </Text>
              <Text
                style={{ fontFamily: PIXEL, fontSize: 11, color: theme.ink2, marginTop: 2 }}
              >
                📍 {a.where[lang]}
              </Text>
              {a.note ? (
                <Text
                  style={{ fontFamily: PIXEL, fontSize: 10, color: theme.accent2, marginTop: 3 }}
                >
                  {a.note[lang]}
                </Text>
              ) : null}
              <View style={{ flexDirection: "row", gap: 4, marginTop: 6 }}>
                <Chip tone={REC_TONE[a.rec]}>{recLabel}</Chip>
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
                {t("artifacts.sell")}
              </Text>
              <Coin value={a.price} size={13} />
            </View>
          </CardPixel>
        );
      })}
    </ScrollView>
  );
}
