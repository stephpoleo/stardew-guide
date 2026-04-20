import { useState } from "react";
import { Text, View } from "react-native";
import { FISH, FISH_SEASONS, FISH_SC } from "../data/fish";
import { fmtG, pColor } from "../utils/format";
import Pill from "../components/Pill";
import Toggle from "../components/Toggle";
import Badge from "../components/Badge";
import Tip from "../components/Tip";
import DataTable, { Cell } from "../components/DataTable";

export default function FishSection() {
  const [season, setSeason] = useState("Spring");
  const [artisan, setArtisan] = useState(false);
  const sc = FISH_SC[season];

  function bestBadge(b) {
    if (b === "pond") return { label: "\ud83d\udc20 Fish Pond", bg: "#e0f2f1", border: "#004d40", color: "#004d40" };
    if (b === "raw")  return { label: "\ud83d\udcb0 Raw", bg: "#fff8e1", border: "#e65100", color: "#e65100" };
    return { label: "\ud83d\udd25 Smoker", bg: "#fce4ec", border: "#b71c1c", color: "#b71c1c" };
  }

  const columns = [
    { label: "Pez", width: 120, align: "left" },
    { label: "D\u00f3nde", width: 120, align: "left" },
    { label: "Clima", width: 80 },
    { label: "Horario", width: 100 },
    { label: "\ud83d\udcb0 Raw", width: 65 },
    { label: "\ud83d\udd25 Smoker", width: 75 },
    { label: "\ud83d\udc20 Pond", width: 140, align: "left" },
    { label: "Mejor", width: 90 },
  ];

  return (
    <View>
      <Toggle on={artisan} onChange={setArtisan} label={`Artisan \u2014 Smoker \u00d7${artisan ? "2.8" : "2"} del raw`} color={sc.accent} />
      <View style={{ flexDirection: "row", gap: 8, justifyContent: "center", marginBottom: 20, flexWrap: "wrap" }}>
        {FISH_SEASONS.map((s) => (
          <Pill key={s} on={season === s} onPress={() => setSeason(s)} activeColor={FISH_SC[s].accent}>
            {FISH_SC[s].icon} {s}
          </Pill>
        ))}
      </View>

      <DataTable
        headerBg={sc.accent}
        columns={columns}
        data={FISH[season] || []}
        renderRow={(row) => {
          const sp = artisan ? row.smoker.a : row.smoker.g;
          const bb = bestBadge(row.best);
          return [
            <Cell key="fish" width={120} align="left">
              <Text style={{ fontWeight: "700", color: "#1a237e" }}>{row.icon} {row.fish}</Text>
              {row.note && <Text style={{ fontSize: 10, color: "#aaa" }}>{row.note}</Text>}
            </Cell>,
            <Cell key="where" width={120} align="left">
              <Text style={{ fontSize: 11, color: "#555" }}>{row.where}</Text>
            </Cell>,
            <Cell key="weather" width={80}>
              <Text style={{ fontSize: 11, color: "#555" }}>{row.weather}</Text>
            </Cell>,
            <Cell key="time" width={100}>
              <Text style={{ fontSize: 11, color: "#777" }}>{row.time}</Text>
            </Cell>,
            <Cell key="raw" width={65}>
              <Text style={{ fontWeight: "600", color: "#555" }}>{fmtG(row.sell)}</Text>
            </Cell>,
            <Cell key="smoker" width={75}>
              <Text style={{ fontWeight: "700", color: pColor(sp) }}>{fmtG(sp)}</Text>
            </Cell>,
            <Cell key="pond" width={140} align="left">
              {row.pond === null
                ? <Text style={{ color: "#ccc" }}>{"\u2014"}</Text>
                : <Text style={{ color: row.pond.rec ? "#00695c" : "#aaa", fontWeight: row.pond.rec ? "700" : "400", fontSize: 11 }}>
                    {row.pond.out}
                  </Text>}
            </Cell>,
            <Cell key="best" width={90}>
              <Badge label={bb.label} bg={bb.bg} border={bb.border} color={bb.color} />
            </Cell>,
          ];
        }}
      />

      <View style={{ marginTop: 14, gap: 10 }}>
        <Tip icon="\ud83e\udd88" title="Sturgeon \u2192 Caviar" text="Mejor Fish Pond. Roe \u2192 Caviar 500g (700g Artisan). Ingreso pasivo diario." bg="#e0f7fa" tc="#006064" />
        <Tip icon="\ud83d\udd25" title="Smoker (v1.6)" text="Para casi todos los peces. \u00d72 el raw, \u00d72.8 con Artisan." bg="#fce4ec" tc="#880e4f" />
        <Tip icon="\ud83d\udc51" title="Peces Legendarios" text="5 legendarios no van en estanque. V\u00e9ndelos siempre directo." bg="#fff8e1" tc="#e65100" />
      </View>
    </View>
  );
}
