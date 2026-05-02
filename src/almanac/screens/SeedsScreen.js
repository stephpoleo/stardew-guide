import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { CardPixel, Chip, EmptyState, PixelSprite, pixelShadow } from "../components/primitives";
import { CROPS, cropProfitPerDay } from "../data";
import { useT } from "../i18n";
import { useTheme } from "../theme";

const PIXEL = "monospace";

export function SeedsScreen({ state }) {
  const { lang, season } = state;
  const t = useT(lang);
  const theme = useTheme();
  const [sort, setSort] = useState("profit");

  const list = useMemo(() => {
    const arr = CROPS.filter((c) => c.season === season && c.days > 0);
    if (sort === "profit") arr.sort((a, b) => cropProfitPerDay(b) - cropProfitPerDay(a));
    else if (sort === "price") arr.sort((a, b) => b.sellPrice - a.sellPrice);
    else arr.sort((a, b) => a.days - b.days);
    return arr;
  }, [season, sort]);

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 14, gap: 10 }}>
      <View>
        <Text style={{ fontSize: 18, fontWeight: "800", color: theme.ink }}>{t("seeds.title")}</Text>
        <Text
          style={{
            fontFamily: PIXEL,
            fontSize: 11,
            color: theme.ink2,
            marginTop: 2,
            letterSpacing: 0.4,
          }}
        >
          {t("seeds.subtitle", { season: t(`season.${season}`) })}
        </Text>
      </View>

      <View style={{ flexDirection: "row", gap: 6 }}>
        {["profit", "price", "time"].map((s) => {
          const active = sort === s;
          return (
            <Pressable
              key={s}
              onPress={() => setSort(s)}
              style={[
                {
                  flex: 1,
                  paddingVertical: 7,
                  borderWidth: 2,
                  borderColor: theme.ink,
                  borderRadius: 2,
                  backgroundColor: active ? theme.ink : theme.surface,
                  alignItems: "center",
                },
                pixelShadow(active ? theme.ink3 : theme.line, 2),
              ]}
            >
              <Text
                style={{
                  fontFamily: PIXEL,
                  fontSize: 10,
                  letterSpacing: 0.8,
                  textTransform: "uppercase",
                  fontWeight: "700",
                  color: active ? theme.surface : theme.ink,
                }}
              >
                {t(`sort.${s}`)}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={{ gap: 8 }}>
        {list.length === 0 ? <EmptyState glyph="❄️" title={t("seeds.empty")} /> : null}
        {list.map((c, i) => (
          <CropRow key={c.id} crop={c} rank={i + 1} lang={lang} t={t} />
        ))}
      </View>
    </ScrollView>
  );
}

function CropRow({ crop, rank, lang, t }) {
  const theme = useTheme();
  const perDay = Math.round(cropProfitPerDay(crop));
  return (
    <CardPixel style={{ padding: 10, flexDirection: "row", alignItems: "center", gap: 10 }}>
      <View style={{ position: "relative" }}>
        <PixelSprite id={crop.id} color={crop.color} emoji={crop.emoji} size={44} />
        <View
          style={{
            position: "absolute",
            top: -6,
            left: -6,
            backgroundColor: theme.ink,
            paddingHorizontal: 4,
            paddingVertical: 1,
            borderRadius: 2,
          }}
        >
          <Text style={{ fontFamily: PIXEL, fontSize: 9, color: theme.surface, letterSpacing: 0.4 }}>
            #{rank}
          </Text>
        </View>
      </View>
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text style={{ fontSize: 14, fontWeight: "700", color: theme.ink }}>{crop.name[lang]}</Text>
        <View style={{ flexDirection: "row", gap: 6, marginTop: 2, flexWrap: "wrap" }}>
          <Text style={{ fontFamily: PIXEL, fontSize: 11, color: theme.ink2 }}>
            {crop.days} {t("seeds.days")}
          </Text>
          <Text style={{ fontFamily: PIXEL, fontSize: 11, color: theme.ink2, opacity: 0.5 }}>·</Text>
          <Text style={{ fontFamily: PIXEL, fontSize: 11, color: theme.ink2 }}>
            {crop.regrow > 0 ? `${t("seeds.regrow")} ${crop.regrow}d` : t("seeds.none")}
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 6, marginTop: 6 }}>
          <Chip tone="neutral">{`${t("seedCost")}: ${crop.seedCost}g`}</Chip>
          <Chip tone="gold">{`${t("price")}: ${crop.sellPrice}g`}</Chip>
        </View>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <Text
          style={{
            fontFamily: PIXEL,
            fontSize: 9,
            color: theme.ink2,
            textTransform: "uppercase",
            letterSpacing: 0.6,
          }}
        >
          {t("gperday")}
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "800",
            color: perDay > 0 ? theme.accent : theme.danger,
          }}
        >
          {perDay >= 0 ? "+" : ""}
          {perDay}
        </Text>
      </View>
    </CardPixel>
  );
}
