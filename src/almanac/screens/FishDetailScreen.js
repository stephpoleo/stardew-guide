import { ScrollView, Text, View } from "react-native";
import { CardPixel, Chip, Coin, PixelSprite, pixelShadow } from "../components/primitives";
import { FISH, FISH_PREP, fishRecommendation } from "../data";
import { I18N, useT } from "../i18n";
import { useTheme } from "../theme";

const PIXEL = "monospace";

export function FishDetailScreen({ state, fishId }) {
  const { lang } = state;
  const t = useT(lang);
  const theme = useTheme();
  const fish = FISH.find((f) => f.id === fishId);
  if (!fish) return null;
  const prep = FISH_PREP[fish.id] || {};
  const rec = fishRecommendation(fish);
  const misc = I18N[lang].misc;

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 14, gap: 12 }}>
      <CardPixel style={{ padding: 14, backgroundColor: theme.surface2, flexDirection: "row", alignItems: "center", gap: 12 }}>
        <PixelSprite id={fish.id} color="#5ba8c9" emoji={fish.emoji} size={64} bg="#cfe4ef" />
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text style={{ fontSize: 18, fontWeight: "800", color: theme.ink }}>{fish.name[lang]}</Text>
          <Text style={{ fontFamily: PIXEL, fontSize: 11, color: theme.ink2, marginTop: 2 }}>
            📍 {fish.location[lang]} · 🕐 {fish.time}
          </Text>
          <View style={{ flexDirection: "row", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
            <Chip tone="water">{fish.weather[lang]}</Chip>
            {fish.seasons.map((s) => (
              <Chip key={s} tone="neutral">
                {t(`season.${s}`)}
              </Chip>
            ))}
          </View>
        </View>
      </CardPixel>

      <View
        style={[
          {
            backgroundColor: theme.ink,
            padding: 12,
            borderWidth: 2,
            borderColor: theme.ink,
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          },
          pixelShadow(theme.gold, 3),
        ]}
      >
        <Text style={{ fontSize: 18, color: theme.gold }}>★</Text>
        <View>
          <Text
            style={{
              fontFamily: PIXEL,
              fontSize: 9,
              letterSpacing: 1.0,
              color: theme.gold,
              textTransform: "uppercase",
            }}
          >
            {t("fish.bestUse")}
          </Text>
          <Text style={{ fontSize: 13, fontWeight: "700", color: theme.surface }}>
            {typeof rec.best.label === "string" ? rec.best.label : rec.best.label[lang]}
          </Text>
        </View>
        <View style={{ marginLeft: "auto", alignItems: "flex-end" }}>
          <Text style={{ fontFamily: PIXEL, fontSize: 9, color: theme.gold, letterSpacing: 0.6 }}>
            {t("fish.roiPerDay")}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "800", color: theme.gold }}>
            +{Math.round(rec.best.roiPerDay)}
          </Text>
        </View>
      </View>

      <Text
        style={{
          fontFamily: PIXEL,
          fontSize: 10,
          letterSpacing: 1.2,
          color: theme.ink2,
          textTransform: "uppercase",
          paddingHorizontal: 2,
        }}
      >
        {misc.compareRoutes}
      </Text>

      {rec.options.map((opt) => {
        const isBest = opt.id === rec.best.id;
        const icon = { raw: "🐟", grill: "🔥", pond: "🪣" }[opt.id];
        const color = { raw: theme.gold, grill: theme.danger, pond: theme.accent }[opt.id];
        const label = typeof opt.label === "string" ? opt.label : opt.label[lang];
        return (
          <View
            key={opt.id}
            style={[
              {
                padding: 12,
                backgroundColor: isBest ? theme.surface2 : theme.surface,
                borderWidth: 2,
                borderColor: isBest ? color : theme.ink,
                borderRadius: 2,
              },
              pixelShadow(theme.ink, 4),
            ]}
          >
            {isBest ? (
              <View
                style={{
                  position: "absolute",
                  top: -9,
                  right: 10,
                  backgroundColor: color,
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  borderWidth: 2,
                  borderColor: theme.ink,
                  borderRadius: 2,
                }}
              >
                <Text
                  style={{
                    fontFamily: PIXEL,
                    fontSize: 9,
                    color: "#fff",
                    letterSpacing: 0.6,
                    textTransform: "uppercase",
                    fontWeight: "700",
                  }}
                >
                  ★ {misc.best}
                </Text>
              </View>
            ) : null}
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <View
                style={{
                  width: 44,
                  height: 44,
                  backgroundColor: color,
                  borderWidth: 2,
                  borderColor: theme.ink,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 2,
                }}
              >
                <Text style={{ fontSize: 22 }}>{icon}</Text>
              </View>
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text style={{ fontSize: 14, fontWeight: "700", color: theme.ink }}>{label}</Text>
                {opt.extra ? (
                  <Text style={{ fontFamily: PIXEL, fontSize: 11, color: theme.ink2, marginTop: 2 }}>
                    {opt.extra[lang]}
                  </Text>
                ) : null}
                <View style={{ flexDirection: "row", gap: 14, marginTop: 6, alignItems: "center" }}>
                  <View>
                    <Text
                      style={{
                        fontFamily: PIXEL,
                        fontSize: 9,
                        color: theme.ink3,
                        letterSpacing: 0.6,
                        textTransform: "uppercase",
                      }}
                    >
                      {lang === "es" ? "Precio" : "Price"}
                    </Text>
                    <Coin value={opt.price} size={12} />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontFamily: PIXEL,
                        fontSize: 9,
                        color: theme.ink3,
                        letterSpacing: 0.6,
                        textTransform: "uppercase",
                      }}
                    >
                      {t("fish.roiPerDay")}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "800",
                        color: isBest ? color : theme.ink,
                      }}
                    >
                      +{Math.round(opt.roiPerDay)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        );
      })}

      {prep.pond ? (
        <CardPixel style={{ padding: 12 }}>
          <Text
            style={{
              fontFamily: PIXEL,
              fontSize: 10,
              letterSpacing: 1.2,
              color: theme.ink2,
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            🪣 {misc.pondDetail}
          </Text>
          <View style={{ flexDirection: "row", gap: 6 }}>
            <PondStat label={misc.capacity} value={String(prep.pond.cap)} unit={misc.fish} />
            <PondStat label={misc.every} value={String(prep.pond.every)} unit={t("seeds.days")} />
            <PondStat
              label={misc.output}
              value={prep.pond.output.name[lang]}
              unit={`${prep.pond.output.price}g`}
            />
          </View>
          {prep.pond.premium ? (
            <View style={{ marginTop: 8 }}>
              <Chip tone="accent">{misc.premium}</Chip>
            </View>
          ) : null}
        </CardPixel>
      ) : null}
    </ScrollView>
  );
}

function PondStat({ label, value, unit }) {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 6,
        paddingVertical: 8,
        backgroundColor: theme.surface2,
        borderWidth: 1,
        borderColor: theme.ink3,
        borderStyle: "dashed",
        borderRadius: 2,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontFamily: PIXEL,
          fontSize: 9,
          letterSpacing: 0.6,
          color: theme.ink2,
          textTransform: "uppercase",
        }}
      >
        {label}
      </Text>
      <Text style={{ fontSize: 13, fontWeight: "800", color: theme.ink, marginTop: 2 }}>
        {value}
      </Text>
      <Text style={{ fontFamily: PIXEL, fontSize: 10, color: theme.ink3 }}>{unit}</Text>
    </View>
  );
}
