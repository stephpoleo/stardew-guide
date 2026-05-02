import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { CardPixel, Chip, Coin, PixelSprite, pixelShadow } from "../components/primitives";
import { FISH, fishRecommendation } from "../data";
import { useT, I18N } from "../i18n";
import { useTheme } from "../theme";

const PIXEL = "monospace";

export function FishScreen({ state, setSelectedFish }) {
  const { lang, season } = state;
  const t = useT(lang);
  const theme = useTheme();
  const [filter, setFilter] = useState("all");

  const list = useMemo(() => {
    let arr = FISH.filter((f) => f.seasons.includes(season));
    if (filter !== "all") {
      arr = arr.filter((f) => {
        const loc = f.location.en.toLowerCase();
        if (filter === "river") return loc.includes("river");
        if (filter === "ocean") return loc.includes("ocean");
        if (filter === "lake") return loc.includes("lake");
        return true;
      });
    }
    return [...arr].sort((a, b) => b.price - a.price);
  }, [season, filter]);

  const filterLabels = I18N[lang].misc.filter;

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 14, gap: 10 }}>
      <View>
        <Text style={{ fontSize: 18, fontWeight: "800", color: theme.ink }}>{t("fish.title")}</Text>
        <Text style={{ fontFamily: PIXEL, fontSize: 11, color: theme.ink2, marginTop: 2 }}>
          {t(`season.${season}`)} · {t("fish.whereWhen")}
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 6, paddingRight: 14 }}
      >
        {[
          { id: "all", label: filterLabels.all },
          { id: "river", label: filterLabels.river },
          { id: "ocean", label: filterLabels.ocean },
          { id: "lake", label: filterLabels.lake },
        ].map((f) => {
          const active = filter === f.id;
          return (
            <Pressable
              key={f.id}
              onPress={() => setFilter(f.id)}
              style={[
                {
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderWidth: 2,
                  borderColor: theme.ink,
                  borderRadius: 2,
                  backgroundColor: active ? theme.water : theme.surface,
                },
                pixelShadow(active ? theme.ink : theme.line, 2),
              ]}
            >
              <Text
                style={{
                  fontFamily: PIXEL,
                  fontSize: 10,
                  letterSpacing: 0.8,
                  textTransform: "uppercase",
                  fontWeight: "700",
                  color: active ? "#fff" : theme.ink,
                }}
              >
                {f.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={{ gap: 8 }}>
        {list.map((f) => (
          <FishRow
            key={f.id}
            fish={f}
            lang={lang}
            onPress={() => setSelectedFish(f.id)}
          />
        ))}
        {list.length === 0 ? (
          <View style={{ paddingVertical: 30, alignItems: "center" }}>
            <Text style={{ fontSize: 28 }}>🐚</Text>
            <Text style={{ fontFamily: PIXEL, fontSize: 12, color: theme.ink2, marginTop: 8 }}>
              {I18N[lang].misc.nothingBiting}
            </Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

function FishRow({ fish, lang, onPress }) {
  const theme = useTheme();
  const diffColor = { easy: theme.accent, medium: theme.gold, hard: theme.danger }[fish.difficulty];
  const rec = fishRecommendation(fish);
  const bestLabel =
    rec.best.id === "raw"
      ? I18N[lang].misc.raw
      : rec.best.id === "grill"
      ? I18N[lang].misc.grill
      : I18N[lang].misc.pond;
  const bestTone = rec.best.id === "raw" ? "gold" : rec.best.id === "grill" ? "danger" : "accent";

  return (
    <Pressable onPress={onPress}>
      <CardPixel style={{ padding: 10, flexDirection: "row", alignItems: "center", gap: 10 }}>
        <PixelSprite id={fish.id} color="#5ba8c9" emoji={fish.emoji} size={44} bg="#cfe4ef" />
        <View style={{ flex: 1, minWidth: 0 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Text style={{ fontSize: 14, fontWeight: "700", color: theme.ink }}>
              {fish.name[lang]}
            </Text>
            <View
              style={{
                width: 8,
                height: 8,
                backgroundColor: diffColor,
                borderWidth: 1,
                borderColor: theme.ink,
                borderRadius: 4,
              }}
            />
          </View>
          <Text style={{ fontFamily: PIXEL, fontSize: 11, color: theme.ink2, marginTop: 2 }}>
            📍 {fish.location[lang]} · 🕐 {fish.time}
          </Text>
          <View style={{ flexDirection: "row", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
            <Chip tone="water">{fish.weather[lang]}</Chip>
            <Chip tone={bestTone}>★ {bestLabel}</Chip>
          </View>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Coin value={fish.price} size={13} />
          <Text style={{ fontFamily: PIXEL, fontSize: 12, color: theme.ink3, marginTop: 2 }}>›</Text>
        </View>
      </CardPixel>
    </Pressable>
  );
}
