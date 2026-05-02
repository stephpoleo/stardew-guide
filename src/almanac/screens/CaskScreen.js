import { Pressable, ScrollView, Text, View } from "react-native";
import { CardPixel, Chip, Coin, ProgressBar, pixelShadow } from "../components/primitives";
import { useT } from "../i18n";
import { useTheme } from "../theme";

const PIXEL = "monospace";

export function CaskScreen({ state, collectCask }) {
  const { lang, casks } = state;
  const t = useT(lang);
  const theme = useTheme();

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 14, gap: 12 }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 18, fontWeight: "800", color: theme.ink }}>{t("cask.title")}</Text>
        <Chip tone="gold">{`${casks.length} 🪵`}</Chip>
      </View>

      {casks.length === 0 ? (
        <CardPixel style={{ padding: 24, alignItems: "center", backgroundColor: theme.surface2 }}>
          <Text style={{ fontSize: 42 }}>🪵</Text>
          <Text style={{ fontSize: 14, fontWeight: "700", color: theme.ink, marginTop: 8 }}>
            {t("cask.empty")}
          </Text>
          <Text
            style={{
              fontFamily: PIXEL,
              fontSize: 11,
              color: theme.ink2,
              marginTop: 6,
              textAlign: "center",
            }}
          >
            {t("cask.emptyHint")}
          </Text>
        </CardPixel>
      ) : null}

      {casks.map((c) => (
        <CaskCard key={c.uid} cask={c} lang={lang} t={t} onCollect={() => collectCask(c.uid)} />
      ))}
    </ScrollView>
  );
}

function CaskCard({ cask, lang, t, onCollect }) {
  const theme = useTheme();
  const pct = Math.min(1, cask.progress);
  const done = pct >= 1;
  const remainSec = Math.ceil(Math.max(0, cask.durationMs * (1 - pct)) / 1000);
  const inGameDays = Math.round(56 * pct);
  const totalDays = 56;
  const daysLeft = totalDays - inGameDays;
  const stage = inGameDays >= 35 ? "iridium" : inGameDays >= 14 ? "gold" : "silver";
  const stageColor = { silver: "#b8c0c8", gold: theme.gold, iridium: "#a060c0" }[stage];
  const stageName = {
    silver: t("cask.stageIron"),
    gold: t("cask.stageGold"),
    iridium: t("cask.stageIridium"),
  }[stage];
  const currentPrice = Math.round(cask.basePrice * (1 + pct));

  return (
    <CardPixel style={{ padding: 12, backgroundColor: done ? theme.surface2 : theme.surface }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <View
          style={{
            width: 46,
            height: 46,
            backgroundColor: "#8a5a2e",
            borderWidth: 2,
            borderColor: theme.ink,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 24 }}>🪵</Text>
        </View>
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text style={{ fontSize: 14, fontWeight: "800", color: theme.ink }}>
            {cask.label[lang]}
          </Text>
          <Text style={{ fontFamily: PIXEL, fontSize: 11, color: theme.ink2, marginTop: 2 }}>
            {done ? (
              <Text style={{ color: theme.accent, fontWeight: "700" }}>✔ {t("cask.ready")}</Text>
            ) : (
              `⏳ ${t("cask.ending")} ${daysLeft}${t("cask.day")}  (${remainSec}s demo)`
            )}
          </Text>
        </View>
        {done ? (
          <Pressable
            onPress={onCollect}
            style={[
              {
                paddingHorizontal: 12,
                paddingVertical: 8,
                backgroundColor: theme.accent,
                borderWidth: 2,
                borderColor: theme.ink,
                borderRadius: 2,
              },
              pixelShadow(theme.ink, 3),
            ]}
          >
            <Text
              style={{
                fontFamily: PIXEL,
                fontSize: 11,
                letterSpacing: 0.8,
                textTransform: "uppercase",
                color: "#fff",
                fontWeight: "700",
              }}
            >
              {t("cask.collect")}
            </Text>
          </Pressable>
        ) : null}
      </View>

      <View style={{ position: "relative", height: 28, marginBottom: 4 }}>
        <View style={{ position: "absolute", top: 7, left: 0, right: 0 }}>
          <ProgressBar pct={pct * 100} color={stageColor} />
        </View>
        {[0.25, 0.625, 1].map((p, i) => (
          <View
            key={i}
            style={{
              position: "absolute",
              top: 0,
              left: `${p * 100}%`,
              marginLeft: -1,
              width: 2,
              height: 28,
              backgroundColor: pct >= p ? theme.ink : theme.ink3,
            }}
          />
        ))}
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
        {["0d", "14d", "35d", "56d"].map((label) => (
          <Text
            key={label}
            style={{ fontFamily: PIXEL, fontSize: 9, color: theme.ink2, letterSpacing: 0.4 }}
          >
            {label}
          </Text>
        ))}
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 8,
          backgroundColor: theme.surface2,
          borderWidth: 1,
          borderColor: theme.ink3,
          borderStyle: "dashed",
          borderRadius: 2,
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: PIXEL,
              fontSize: 9,
              letterSpacing: 0.6,
              color: theme.ink2,
              textTransform: "uppercase",
            }}
          >
            {t("cask.qualityAt")}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 2 }}>
            <View
              style={{
                width: 10,
                height: 10,
                backgroundColor: stageColor,
                borderWidth: 1,
                borderColor: theme.ink,
              }}
            />
            <Text style={{ fontSize: 13, fontWeight: "700", color: theme.ink }}>{stageName}</Text>
          </View>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text
            style={{
              fontFamily: PIXEL,
              fontSize: 9,
              letterSpacing: 0.6,
              color: theme.ink2,
              textTransform: "uppercase",
            }}
          >
            {t("price")}
          </Text>
          <Coin value={currentPrice} size={14} />
        </View>
      </View>
    </CardPixel>
  );
}
