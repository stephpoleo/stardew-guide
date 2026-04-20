import { useState } from "react";
import { Text, View } from "react-native";
import { GEMS } from "../data/gems";
import { fmtG } from "../utils/format";
import Pill from "../components/Pill";
import Tip from "../components/Tip";
import DataTable, { Cell } from "../components/DataTable";

export default function GemsSection() {
  const [sort, setSort] = useState("gpd");
  const sorted = [...GEMS].sort((a, b) =>
    sort === "gpd" ? b.gpd - a.gpd : sort === "sell" ? b.sell - a.sell : a.gem.localeCompare(b.gem)
  );

  const columns = [
    { label: "#", width: 35 },
    { label: "Mineral", width: 120, align: "left" },
    { label: "Venta", width: 70 },
    { label: "\u23f1 D\u00edas", width: 60 },
    { label: "\ud83d\udcb0 G/D\u00eda", width: 110 },
    { label: "Zona", width: 100, align: "left" },
    { label: "Usos especiales", width: 180, align: "left" },
  ];

  return (
    <View>
      <View style={{ flexDirection: "row", gap: 8, justifyContent: "center", marginBottom: 18, flexWrap: "wrap", alignItems: "center" }}>
        <Text style={{ fontSize: 13, color: "#777" }}>Ordenar:</Text>
        {[["gpd", "\ud83d\udcb0 G/D\u00eda"], ["sell", "\ud83d\udc8e Venta"], ["name", "\ud83d\udd24 A-Z"]].map(([k, l]) => (
          <Pill key={k} on={sort === k} onPress={() => setSort(k)} activeColor="#37474f">{l}</Pill>
        ))}
      </View>

      <DataTable
        headerBg="#263238"
        columns={columns}
        data={sorted}
        renderRow={(row, i) => [
          <Cell key="n" width={35}><Text style={{ color: "#90a4ae", fontWeight: "700", fontSize: 12 }}>{i + 1}</Text></Cell>,
          <Cell key="gem" width={120} align="left">
            <Text style={{ fontWeight: "700", color: "#263238" }}>{row.dot} {row.gem}</Text>
          </Cell>,
          <Cell key="sell" width={70}>
            <Text style={{ fontWeight: "600" }}>{fmtG(row.sell)}</Text>
          </Cell>,
          <Cell key="days" width={60}>
            <Text style={{ color: "#78909c" }}>{row.days}d</Text>
          </Cell>,
          <Cell key="gpd" width={110}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <Text style={{ color: row.gpd >= 130 ? "#b71c1c" : row.gpd >= 80 ? "#2e7d32" : "#37474f", fontWeight: "700", minWidth: 35 }}>
                {row.gpd}g
              </Text>
              <View style={{ flex: 1, height: 6, backgroundColor: "#eceff1", borderRadius: 3 }}>
                <View style={{
                  width: `${Math.round(row.gpd / 150 * 100)}%`, height: 6, borderRadius: 3,
                  backgroundColor: row.gpd >= 130 ? "#e53935" : row.gpd >= 80 ? "#43a047" : "#78909c",
                }} />
              </View>
            </View>
          </Cell>,
          <Cell key="zone" width={100} align="left">
            <Text style={{ fontSize: 11, color: "#78909c" }}>{row.zone}</Text>
          </Cell>,
          <Cell key="special" width={180} align="left">
            <Text style={{
              fontSize: 11,
              color: row.special.includes("\u2190") ? "#c62828" : "#555",
              fontWeight: row.special.includes("\u2190") ? "700" : "400",
            }}>{row.special}</Text>
          </Cell>,
        ]}
      />

      <View style={{ marginTop: 14, gap: 10 }}>
        <Tip icon="\ud83d\udc8e" title="Diamond Strategy" text="150g/d\u00eda c/u. Mejor g/d\u00eda puro y regalo universal." bg="#eceff1" tc="#263238" />
        <Tip icon="\ud83d\udfe2" title="Jade Hack" text="El domingo Desert Trader acepta Jade por Staircases 1:1. Ahorra horas en Skull Cavern." bg="#e8f5e9" tc="#1b5e20" />
        <Tip icon="\ud83d\udd36" title="Fire Quartz" text="En Furnace \u2192 3\u00d7 Refined Quartz. Ideal para sprinklers y lightning rods." bg="#fff3e0" tc="#e65100" />
      </View>
    </View>
  );
}
