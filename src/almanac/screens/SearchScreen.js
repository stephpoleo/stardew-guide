import { Pressable, ScrollView, Text, View } from "react-native";
import { Coin, PixelSprite, SearchBar, pixelShadow } from "../components/primitives";
import { ANIMALS, CROPS, FISH, MACHINES } from "../data";
import { I18N, useT } from "../i18n";
import { useTheme } from "../theme";

const PIXEL = "monospace";

export function SearchScreen({
  state,
  query,
  setQuery,
  setPage,
  setSelectedFish,
  goToWorkshop,
}) {
  const { lang } = state;
  const t = useT(lang);
  const theme = useTheme();
  const misc = I18N[lang].misc;
  const q = query.trim().toLowerCase();
  const matches = (s) => s.toLowerCase().includes(q);

  const results = q.length === 0
    ? null
    : {
        crops: CROPS.filter((c) => matches(c.name.es) || matches(c.name.en) || matches(c.id)),
        fish: FISH.filter((f) => matches(f.name.es) || matches(f.name.en) || matches(f.id)),
        products: ANIMALS.flatMap((a) => a.produces.map((p) => ({ ...p, animal: a }))).filter(
          (p) => matches(p.name.es) || matches(p.name.en) || matches(p.id),
        ),
        machines: MACHINES.filter((m) => matches(m.name.es) || matches(m.name.en)),
      };
  const total = results
    ? results.crops.length +
      results.fish.length +
      results.products.length +
      results.machines.length
    : 0;

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingVertical: 14, gap: 10 }}>
      <SearchBar value={query} onChange={setQuery} placeholder={t("home.search")} autoFocus />

      {q && total > 0 ? (
        <Text
          style={{
            fontFamily: PIXEL,
            fontSize: 11,
            color: theme.ink2,
            paddingHorizontal: 14,
          }}
        >
          {total} {misc.results}
        </Text>
      ) : null}

      {!q ? (
        <View style={{ paddingVertical: 20, paddingHorizontal: 14, alignItems: "center" }}>
          <Text style={{ fontSize: 32 }}>🔍</Text>
          <Text
            style={{
              fontFamily: PIXEL,
              fontSize: 11,
              color: theme.ink2,
              marginTop: 6,
              textAlign: "center",
              lineHeight: 16,
            }}
          >
            {misc.searchHint}
          </Text>
        </View>
      ) : null}

      {q && total === 0 ? (
        <View style={{ paddingVertical: 30, alignItems: "center" }}>
          <Text style={{ fontSize: 32 }}>🌾</Text>
          <Text style={{ fontFamily: PIXEL, fontSize: 12, color: theme.ink2, marginTop: 8 }}>
            {t("home.noResults")}
          </Text>
        </View>
      ) : null}

      {results && results.crops.length > 0 ? (
        <SearchGroup title={t("nav.seeds")} icon="🌱">
          {results.crops.map((c) => (
            <SearchResultRow
              key={c.id}
              icon={<PixelSprite id={c.id} color={c.color} emoji={c.emoji} size={32} />}
              title={c.name[lang]}
              meta={`${t(`season.${c.season}`)} · ${c.days}d`}
              right={<Coin value={c.sellPrice} />}
              onPress={() => setPage("seeds")}
            />
          ))}
        </SearchGroup>
      ) : null}

      {results && results.fish.length > 0 ? (
        <SearchGroup title={t("nav.fish")} icon="🎣">
          {results.fish.map((f) => (
            <SearchResultRow
              key={f.id}
              icon={
                <PixelSprite id={f.id} color="#5ba8c9" emoji={f.emoji} size={32} bg="#cfe4ef" />
              }
              title={f.name[lang]}
              meta={`${f.location[lang]} · ${f.time}`}
              right={<Coin value={f.price} />}
              onPress={() => {
                setSelectedFish(f.id);
                setPage("fishDetail");
              }}
            />
          ))}
        </SearchGroup>
      ) : null}

      {results && results.products.length > 0 ? (
        <SearchGroup title={misc.products} icon="🥚">
          {results.products.map((p) => (
            <SearchResultRow
              key={p.id}
              icon={<EmojiBox emoji={p.emoji} />}
              title={p.name[lang]}
              meta={p.animal.name[lang]}
              right={<Coin value={p.price} />}
              onPress={() => setPage("animals")}
            />
          ))}
        </SearchGroup>
      ) : null}

      {results && results.machines.length > 0 ? (
        <SearchGroup title={t("nav.workshop")} icon="🛠️">
          {results.machines.map((m) => (
            <SearchResultRow
              key={m.id}
              icon={<EmojiBox emoji={m.emoji} />}
              title={m.name[lang]}
              meta={m.desc[lang]}
              onPress={() => goToWorkshop("process")}
            />
          ))}
        </SearchGroup>
      ) : null}
    </ScrollView>
  );
}

function EmojiBox({ emoji }) {
  const theme = useTheme();
  return (
    <View
      style={{
        width: 32,
        height: 32,
        backgroundColor: theme.surface2,
        borderWidth: 2,
        borderColor: theme.ink,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 18 }}>{emoji}</Text>
    </View>
  );
}

function SearchGroup({ title, icon, children }) {
  const theme = useTheme();
  return (
    <View>
      <View
        style={{
          paddingHorizontal: 18,
          paddingBottom: 6,
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
        }}
      >
        <Text style={{ fontSize: 12 }}>{icon}</Text>
        <Text
          style={{
            fontFamily: PIXEL,
            fontSize: 10,
            letterSpacing: 1.2,
            color: theme.ink2,
            textTransform: "uppercase",
          }}
        >
          {title}
        </Text>
      </View>
      <View style={{ gap: 4, paddingHorizontal: 14 }}>{children}</View>
    </View>
  );
}

function SearchResultRow({ icon, title, meta, right, onPress }) {
  const theme = useTheme();
  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            paddingHorizontal: 10,
            paddingVertical: 8,
            backgroundColor: theme.surface,
            borderWidth: 2,
            borderColor: theme.ink,
            borderRadius: 2,
          },
          pixelShadow(theme.line, 2),
        ]}
      >
        {icon}
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text style={{ fontSize: 13, fontWeight: "700", color: theme.ink }}>{title}</Text>
          {meta ? (
            <Text style={{ fontFamily: PIXEL, fontSize: 10, color: theme.ink2, marginTop: 1 }}>
              {meta}
            </Text>
          ) : null}
        </View>
        {right}
      </View>
    </Pressable>
  );
}
