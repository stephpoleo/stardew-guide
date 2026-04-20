import { useState } from "react";
import { Text, View, ScrollView, Pressable } from "react-native";
import { CROPS, SEASON_COLORS, FLOWERS } from "../data/crops";
import { fmtG, pColor } from "../utils/format";
import Pill from "../components/Pill";
import Toggle from "../components/Toggle";
import Badge from "../components/Badge";
import Tip from "../components/Tip";
import DataTable, { Cell } from "../components/DataTable";

function ValCell({ val, artisan, width = 90 }) {
  if (!val) return <Cell width={width}><Text style={{ color: "#ccc", fontSize: 12 }}>{"\u2014"}</Text></Cell>;
  const price = artisan ? val.a : val.g;
  return (
    <Cell width={width}>
      <Text style={{ fontSize: 10, color: "#aaa", marginBottom: 1 }}>{val.p}</Text>
      <Text style={{ color: pColor(price ?? 0), fontSize: 13, fontWeight: "700" }}>{fmtG(price)}</Text>
    </Cell>
  );
}

export default function CropsSection() {
  const [season, setSeason] = useState("Spring");
  const [artisan, setArtisan] = useState(false);
  const [showHoney, setShowHoney] = useState(false);
  const sc = SEASON_COLORS[season];

  const flowersBySeason = {
    Spring:       FLOWERS.filter(f => f.season === "Spring"),
    Summer:       FLOWERS.filter(f => f.season === "Summer" || f.season === "Summer/Fall"),
    Fall:         FLOWERS.filter(f => f.season === "Fall"   || f.season === "Summer/Fall"),
    "Year-Round": FLOWERS.filter(f => f.season === "Winter / sin flor"),
  };
  const seasonFlowers = flowersBySeason[season] || [];

  const bestLabel = (b) => b === "keg" ? "\ud83c\udf77 Keg" : b === "jar" ? "\ud83e\udead Jar" : b === "raw" ? "\ud83d\udcb0 Raw" : "\u2600\ufe0f Dehy";

  const columns = [
    { label: "Cultivo", width: 110, align: "left" },
    { label: "Raw", width: 70 },
    { label: "\ud83c\udf77 Keg", width: 90 },
    { label: "\ud83e\udead Jar", width: 90 },
    { label: "\ud83e\udea3 Cask", width: 70 },
    { label: "\u2600\ufe0f Dehy", width: 90 },
    { label: "Mejor", width: 80 },
    { label: "Notas", width: 140, align: "left" },
  ];

  return (
    <View>
      <Toggle on={artisan} onChange={setArtisan} label="Con Artisan (+40%)" />
      <View style={{ flexDirection: "row", gap: 8, justifyContent: "center", marginBottom: 20, flexWrap: "wrap" }}>
        {Object.entries(SEASON_COLORS).map(([name, s]) => (
          <Pill key={name} on={season === name} onPress={() => setSeason(name)} activeColor={s.accent}>
            {s.icon} {name}
          </Pill>
        ))}
      </View>

      <DataTable
        headerBg={sc.accent}
        columns={columns}
        data={CROPS[season]}
        renderRow={(row) => [
          <Cell key="crop" width={110} align="left">
            <Text style={{ fontWeight: "700", color: "#3e2723" }}>{row.crop}</Text>
            <Text style={{ fontSize: 10, color: "#bbb" }}>
              Comprar: {typeof row.buy === "number" ? fmtG(row.buy) : row.buy}
            </Text>
          </Cell>,
          <Cell key="raw" width={70}>
            <Text style={{ fontWeight: "600", color: "#555" }}>{fmtG(row.sell)}</Text>
          </Cell>,
          <ValCell key="keg" val={row.keg} artisan={artisan} />,
          <ValCell key="jar" val={row.jar} artisan={artisan} />,
          <Cell key="cask" width={70}>
            <Text style={{ fontSize: 11, color: "#666" }}>{row.cask}</Text>
          </Cell>,
          <ValCell key="dehy" val={row.dehy} artisan={artisan} />,
          <Cell key="best" width={80}>
            <Badge label={bestLabel(row.best)} bg={sc.bg} border={sc.accent} color={sc.text} />
          </Cell>,
          <Cell key="note" width={140} align="left">
            <Text style={{ fontSize: 11, color: "#888" }}>{row.note || ""}</Text>
          </Cell>,
        ]}
      />

      {/* Honey section */}
      <Pressable
        onPress={() => setShowHoney(!showHoney)}
        style={{
          marginTop: 16, padding: 12, borderRadius: 10,
          borderWidth: 2, borderColor: showHoney ? "#f9a825" : "#ffe082",
          backgroundColor: showHoney ? "#fff8e1" : "white",
          flexDirection: "row", justifyContent: "space-between", alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 13, fontWeight: "700", color: "#e65100" }}>
          \ud83c\udf6f Flores y Miel \u2014 \u00bfqu\u00e9 plantar cerca del Bee House?
        </Text>
        <Text style={{ fontSize: 11, color: "#f9a825" }}>{showHoney ? "\u25b2 Ocultar" : "\u25bc Ver"}</Text>
      </Pressable>

      {showHoney && (
        <View style={{ marginTop: 10 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 14 }}>
            <View style={{ flexDirection: "row", gap: 8 }}>
              {seasonFlowers.length === 0 && (
                <View style={{ backgroundColor: "#f5f5f5", borderRadius: 10, padding: 14 }}>
                  <Text style={{ fontSize: 13, color: "#aaa" }}>
                    \u2744\ufe0f En invierno no crecen flores \u2014 solo Wild Honey (100g, 140g Artisan)
                  </Text>
                </View>
              )}
              {seasonFlowers.map((f) => {
                const honey = artisan ? f.honey.a : f.honey.g;
                const isTop = f.rank === 1;
                return (
                  <View key={f.flower} style={{
                    backgroundColor: isTop ? "#fff8e1" : "white",
                    borderWidth: 2, borderColor: isTop ? "#f9a825" : "#e0e0e0",
                    borderRadius: 12, padding: 14, minWidth: 160,
                  }}>
                    <Text style={{ fontSize: 20, marginBottom: 4 }}>{f.icon}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                      <Text style={{ fontWeight: "700", fontSize: 13, color: "#3e2723" }}>{f.flower}</Text>
                      {isTop && (
                        <View style={{ backgroundColor: "#f9a825", borderRadius: 6, paddingHorizontal: 5, paddingVertical: 1 }}>
                          <Text style={{ fontSize: 10, color: "white", fontWeight: "700" }}>TOP</Text>
                        </View>
                      )}
                    </View>
                    <Text style={{ fontSize: 11, color: "#888", marginTop: 2 }}>
                      Semilla: {f.buy > 0 ? fmtG(f.buy) : "\u2014"} \u00b7 Raw: {fmtG(f.sell)}
                    </Text>
                    <View style={{ marginTop: 6, flexDirection: "row", alignItems: "baseline", gap: 6 }}>
                      <Text style={{ fontSize: 11, color: "#a0522d" }}>\ud83c\udf6f Miel:</Text>
                      <Text style={{ fontSize: 16, fontWeight: "700", color: pColor(honey) }}>{fmtG(honey)}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>

          <View style={{ gap: 10 }}>
            <Tip icon="\ud83c\udf39" title="Fairy Rose \u2014 la reina" text="680g por cosecha del Bee House (952g Artisan). Planta en Fall lo antes posible." bg="#fff8e1" tc="#a0522d" />
            <Tip icon="\ud83d\udcd0" title="Radio del Bee House" text="La flor debe estar dentro de 5 tiles del Bee House para activar el bono." bg="#fff3e0" tc="#e65100" />
            <Tip icon="\ud83c\udf6f" title="Producci\u00f3n de miel" text="Cada Bee House produce miel cada 4 d\u00edas. Con Artisan sube un 40%." bg="#fffde7" tc="#f57f17" />
          </View>
        </View>
      )}
    </View>
  );
}
