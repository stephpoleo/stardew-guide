import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { CardPixel, Chip, Coin, PixelSprite, pixelShadow } from "../components/primitives";
import { ANIMALS, CROPS, MACHINES, RECIPES } from "../data";
import { useT } from "../i18n";
import { useTheme } from "../theme";

const PIXEL = "monospace";

export function ProcessScreen({ state, addCask }) {
  const { lang } = state;
  const t = useT(lang);
  const theme = useTheme();
  const [machineId, setMachineId] = useState("keg");
  const machine = MACHINES.find((m) => m.id === machineId);
  const recipes = RECIPES[machineId] || {};

  const items = useMemo(() => {
    if (machineId === "cask") {
      // Cask ages already-fermented products (wines from kegs + cheeses).
      // RECIPES.cask uses parent-relative ids that don't exist in CROPS,
      // so build the list from the outputs of keg + cheese instead.
      const wines = Object.entries(RECIPES.keg)
        .filter(([, r]) => r.mult >= 3)
        .map(([cropId, r]) => {
          const crop = CROPS.find((c) => c.id === cropId);
          const winePrice = crop ? Math.round(crop.sellPrice * r.mult) : 100;
          return {
            key: `aged_${cropId}`,
            src: {
              id: cropId,
              name: r.out,
              emoji: "🍷",
              sellPrice: winePrice,
              color: crop?.color,
            },
            r: {
              out: {
                es: `${r.out.es} iridio`,
                en: `Iridium ${r.out.en}`,
              },
              mult: 2,
              hours: 56 * 24,
            },
          };
        });
      const cheeses = Object.entries(RECIPES.cheese).map(([k, r]) => ({
        key: `aged_${k}`,
        src: {
          id: k,
          name: r.out,
          emoji: "🧀",
          sellPrice: r.flat || 230,
          color: "#fde7a8",
        },
        r: {
          out: { es: `${r.out.es} iridio`, en: `Iridium ${r.out.en}` },
          mult: 2,
          hours: 56 * 24,
        },
      }));
      return [...wines, ...cheeses];
    }
    const products = ANIMALS.flatMap((a) => a.produces);
    return Object.keys(recipes)
      .map((k) => {
        const src = [...CROPS, ...products].find((x) => x.id === k);
        return { key: k, src, r: recipes[k] };
      })
      .filter((x) => x.src);
  }, [machineId, recipes]);

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 14, gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: "800", color: theme.ink }}>{t("process.title")}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 6, paddingRight: 14 }}
      >
        {MACHINES.map((m) => {
          const active = machineId === m.id;
          return (
            <Pressable
              key={m.id}
              onPress={() => setMachineId(m.id)}
              style={[
                {
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  backgroundColor: active ? theme.ink : theme.surface,
                  borderWidth: 2,
                  borderColor: theme.ink,
                  borderRadius: 2,
                  alignItems: "center",
                  gap: 4,
                  minWidth: 72,
                },
                pixelShadow(active ? theme.ink3 : theme.line, 2),
              ]}
            >
              <Text style={{ fontSize: 18 }}>{m.emoji}</Text>
              <Text
                style={{
                  fontFamily: PIXEL,
                  fontSize: 9,
                  letterSpacing: 0.4,
                  textTransform: "uppercase",
                  fontWeight: "700",
                  color: active ? theme.surface : theme.ink,
                }}
              >
                {m.name[lang]}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <CardPixel style={{ padding: 12, backgroundColor: theme.surface2 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Text style={{ fontSize: 26 }}>{machine.emoji}</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, fontWeight: "800", color: theme.ink }}>
              {machine.name[lang]}
            </Text>
            <Text style={{ fontFamily: PIXEL, fontSize: 11, color: theme.ink2, marginTop: 2 }}>
              {machine.desc[lang]}
            </Text>
          </View>
        </View>
      </CardPixel>

      <View style={{ gap: 8 }}>
        {items.length === 0 ? (
          <Text
            style={{
              fontFamily: PIXEL,
              fontSize: 12,
              color: theme.ink2,
              textAlign: "center",
              paddingVertical: 20,
            }}
          >
            {t("process.pick")}
          </Text>
        ) : null}
        {items.map(({ key, src, r }) => (
          <ProcessRow
            key={key}
            src={src}
            recipe={r}
            lang={lang}
            t={t}
            isCask={machineId === "cask"}
            onStartCask={() => {
              addCask({
                itemId: key,
                label: r.out,
                basePrice: src.sellPrice || src.price || 100,
                mult: r.mult,
              });
            }}
          />
        ))}
      </View>
    </ScrollView>
  );
}

function ProcessRow({ src, recipe, lang, t, isCask, onStartCask }) {
  const theme = useTheme();
  const basePrice = src.sellPrice || src.price || 0;
  const out = recipe.mult ? Math.round(basePrice * recipe.mult) : basePrice + (recipe.flat || 0);
  const gain = out - basePrice;
  const hours = recipe.hours;
  const timeLabel = hours >= 24 ? `${Math.round(hours / 24)}d` : `${hours}h`;

  return (
    <CardPixel style={{ padding: 10 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <PixelSprite id={src.id} color={src.color || theme.gold} emoji={src.emoji} size={40} />
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text style={{ fontSize: 13, fontWeight: "700", color: theme.ink }}>{src.name[lang]}</Text>
          <Text style={{ fontFamily: PIXEL, fontSize: 11, color: theme.ink2, marginTop: 2 }}>
            →{" "}
            <Text style={{ color: theme.ink, fontWeight: "700" }}>{recipe.out[lang]}</Text>
          </Text>
        </View>
        <Text style={{ fontSize: 18, opacity: 0.4 }}>→</Text>
        <View style={{ alignItems: "flex-end" }}>
          <Text
            style={{ fontFamily: PIXEL, fontSize: 10, color: theme.accent, fontWeight: "700" }}
          >
            +{gain}g
          </Text>
          <Coin value={out} size={12} />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 6,
          marginTop: 8,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Chip tone="neutral">⏱ {timeLabel}</Chip>
        {recipe.mult ? <Chip tone="accent">×{recipe.mult}</Chip> : null}
        {recipe.flat && !recipe.mult ? <Chip tone="gold">+{recipe.flat}g</Chip> : null}
        {isCask ? (
          <Pressable
            onPress={onStartCask}
            style={[
              {
                marginLeft: "auto",
                paddingHorizontal: 10,
                paddingVertical: 5,
                backgroundColor: theme.accent,
                borderWidth: 2,
                borderColor: theme.ink,
                borderRadius: 2,
              },
              pixelShadow(theme.ink, 2),
            ]}
          >
            <Text
              style={{
                fontFamily: PIXEL,
                fontSize: 10,
                letterSpacing: 0.6,
                textTransform: "uppercase",
                color: "#fff",
                fontWeight: "700",
              }}
            >
              🪵 {t("process.addToCask")}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </CardPixel>
  );
}
