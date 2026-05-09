import { useMemo } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { progressFor } from "../calendar";
import { CardPixel, Chip, Coin, PixelSprite, ProgressBar, pixelShadow } from "../components/primitives";
import { CROPS, FISH, cropProfitPerDay } from "../data";
import { useT } from "../i18n";
import { useTheme } from "../theme";

const PIXEL = "monospace";

export function HomeScreen({ state, setPage, goToWorkshop }) {
  const { lang, season, casks, currentAbsDay } = state;
  const t = useT(lang);
  const theme = useTheme();

  const { topCrop, topFish, readyCasks, activeCasks } = useMemo(() => {
    const seasonCrops = CROPS.filter(
      (c) => (c.season === season || c.season === "all") && c.days > 0,
    );
    const tc = [...seasonCrops].sort((a, b) => cropProfitPerDay(b) - cropProfitPerDay(a))[0];
    const tf = FISH.filter((f) => f.seasons.includes(season)).sort((a, b) => b.price - a.price)[0];
    const ready = casks.filter((c) => progressFor(c, currentAbsDay) >= 1).length;
    return { topCrop: tc, topFish: tf, readyCasks: ready, activeCasks: casks.length };
  }, [season, casks, currentAbsDay]);

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 14, gap: 14 }}>
      <View>
        <Text
          style={{
            fontFamily: PIXEL,
            fontSize: 10,
            letterSpacing: 1.2,
            color: theme.ink2,
            textTransform: "uppercase",
            marginBottom: 8,
            paddingHorizontal: 2,
          }}
        >
          {t("home.todaysPicks")}
        </Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          {topCrop ? (
            <Pressable
              onPress={() => setPage("seeds")}
              style={[
                {
                  flex: 1,
                  flexDirection: "row",
                  gap: 8,
                  alignItems: "center",
                  backgroundColor: theme.surface,
                  borderWidth: 2,
                  borderColor: theme.ink,
                  padding: 10,
                  borderRadius: 2,
                },
                pixelShadow(theme.ink, 3),
              ]}
            >
              <PixelSprite id={topCrop.id} color={topCrop.color} emoji={topCrop.emoji} size={36} />
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text style={{ fontFamily: PIXEL, fontSize: 9, letterSpacing: 0.8, color: theme.ink2, textTransform: "uppercase" }}>
                  {t("home.topCrop")}
                </Text>
                <Text numberOfLines={1} style={{ fontSize: 12, fontWeight: "700", color: theme.ink }}>
                  {topCrop.name[lang]}
                </Text>
                <Text style={{ fontFamily: PIXEL, fontSize: 11, color: theme.accent, fontWeight: "700", marginTop: 2 }}>
                  +{Math.round(cropProfitPerDay(topCrop))} {t("gperday")}
                </Text>
              </View>
            </Pressable>
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.surface2,
                borderWidth: 2,
                borderColor: theme.ink3,
                borderStyle: "dashed",
                padding: 12,
                borderRadius: 2,
                minHeight: 72,
              }}
            >
              <Text style={{ fontSize: 22 }}>❄️</Text>
              <Text
                style={{
                  fontFamily: PIXEL,
                  fontSize: 10,
                  color: theme.ink2,
                  textAlign: "center",
                  lineHeight: 14,
                  marginTop: 4,
                }}
              >
                {t("home.winterEmpty")}
              </Text>
            </View>
          )}
          {topFish ? (
            <Pressable
              onPress={() => setPage("fish")}
              style={[
                {
                  flex: 1,
                  flexDirection: "row",
                  gap: 8,
                  alignItems: "center",
                  backgroundColor: theme.surface,
                  borderWidth: 2,
                  borderColor: theme.ink,
                  padding: 10,
                  borderRadius: 2,
                },
                pixelShadow(theme.ink, 3),
              ]}
            >
              <PixelSprite id={topFish.id} color="#5ba8c9" emoji={topFish.emoji} size={36} />
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text style={{ fontFamily: PIXEL, fontSize: 9, letterSpacing: 0.8, color: theme.ink2, textTransform: "uppercase" }}>
                  {t("home.bestFish")}
                </Text>
                <Text numberOfLines={1} style={{ fontSize: 12, fontWeight: "700", color: theme.ink }}>
                  {topFish.name[lang]}
                </Text>
                <View style={{ marginTop: 2 }}>
                  <Coin value={topFish.price} />
                </View>
              </View>
            </Pressable>
          ) : null}
        </View>
      </View>

      <CardPixel style={{ padding: 12 }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text
            style={{
              fontFamily: PIXEL,
              fontSize: 11,
              letterSpacing: 1.0,
              color: theme.ink,
              textTransform: "uppercase",
              fontWeight: "700",
            }}
          >
            🪵 {t("home.activeCasks")}
          </Text>
          <Pressable onPress={() => goToWorkshop("cask")}>
            <Text style={{ color: theme.accent, fontFamily: PIXEL, fontSize: 12, fontWeight: "700" }}>→</Text>
          </Pressable>
        </View>
        <View style={{ flexDirection: "row", gap: 6, marginTop: 8, alignItems: "baseline" }}>
          <Text style={{ fontSize: 28, fontWeight: "800", color: theme.ink }}>{activeCasks}</Text>
          {readyCasks > 0 ? (
            <Text style={{ fontFamily: PIXEL, fontSize: 11, color: theme.accent }}>
              ● {readyCasks} {t("cask.ready")}
            </Text>
          ) : null}
        </View>
        {casks.slice(0, 2).map((c) => (
          <CaskMiniBar key={c.uid} cask={c} lang={lang} currentAbsDay={currentAbsDay} />
        ))}
      </CardPixel>

      <View>
        <Text
          style={{
            fontFamily: PIXEL,
            fontSize: 10,
            letterSpacing: 1.2,
            color: theme.ink2,
            textTransform: "uppercase",
            marginBottom: 8,
            paddingHorizontal: 2,
          }}
        >
          {t("home.quickActions")}
        </Text>
        <View style={{ flexDirection: "row", gap: 6 }}>
          {[
            { id: "seeds", glyph: "🌱", label: t("nav.seeds"), c: theme.accent, go: () => setPage("seeds") },
            { id: "fish", glyph: "🎣", label: t("nav.fish"), c: theme.water, go: () => setPage("fish") },
            { id: "animals", glyph: "🐄", label: t("nav.animals"), c: theme.gold, go: () => setPage("animals") },
            { id: "workshop", glyph: "🛠️", label: t("nav.workshop"), c: theme.accent2, go: () => goToWorkshop("process") },
          ].map((a) => (
            <Pressable
              key={a.id}
              onPress={a.go}
              style={[
                {
                  flex: 1,
                  backgroundColor: theme.surface,
                  borderWidth: 2,
                  borderColor: theme.ink,
                  paddingVertical: 10,
                  paddingHorizontal: 4,
                  alignItems: "center",
                  gap: 4,
                  borderRadius: 2,
                },
                pixelShadow(theme.ink, 2),
              ]}
            >
              <View
                style={{
                  width: 32,
                  height: 32,
                  backgroundColor: a.c,
                  borderWidth: 2,
                  borderColor: theme.ink,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 2,
                }}
              >
                <Text style={{ fontSize: 16 }}>{a.glyph}</Text>
              </View>
              <Text
                style={{
                  fontFamily: PIXEL,
                  fontSize: 9,
                  letterSpacing: 0.4,
                  color: theme.ink,
                  textTransform: "uppercase",
                  fontWeight: "700",
                }}
              >
                {a.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

function CaskMiniBar({ cask, lang, currentAbsDay }) {
  const theme = useTheme();
  const p = progressFor(cask, currentAbsDay);
  const pct = p * 100;
  const done = p >= 1;
  return (
    <View style={{ marginTop: 8 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 3 }}>
        <Text style={{ fontFamily: PIXEL, fontSize: 11, color: theme.ink, fontWeight: "700" }}>
          {cask.label[lang]}
        </Text>
        <Text style={{ fontFamily: PIXEL, fontSize: 10, color: done ? theme.accent : theme.ink2 }}>
          {done ? "✔ READY" : `${Math.round(pct)}%`}
        </Text>
      </View>
      <ProgressBar pct={pct} color={done ? theme.accent : theme.gold} />
    </View>
  );
}
