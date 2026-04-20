import { useState } from "react";
import { Text, View } from "react-native";
import { MUSHROOMS } from "../data/mushrooms";
import { fmtG, pColor } from "../utils/format";
import Toggle from "../components/Toggle";
import Badge from "../components/Badge";
import DataTable, { Cell } from "../components/DataTable";

export default function MushroomsSection() {
  const [artisan, setArtisan] = useState(false);

  const columns = [
    { label: "Hongo", width: 130, align: "left" },
    { label: "Raw", width: 65 },
    { label: "\ud83e\udead Jar", width: 75 },
    { label: "\ud83c\udf77 Keg", width: 75 },
    { label: "\u2600\ufe0f Dehy", width: 75 },
    { label: "Mejor", width: 80 },
    { label: "Fuente", width: 160, align: "left" },
  ];

  function bestBadge(b) {
    if (b === "dehy") return { label: "\u2600\ufe0f Dehy", bg: "#fff3e0", border: "#e65100", color: "#e65100" };
    if (b === "keg")  return { label: "\ud83c\udf77 Keg", bg: "#fce4ec", border: "#c62828", color: "#c62828" };
    return { label: "\ud83e\udead Jar", bg: "#f1f8e9", border: "#33691e", color: "#33691e" };
  }

  return (
    <View>
      <Toggle on={artisan} onChange={setArtisan} label="Con Artisan (+40%)" color="#4e342e" />

      <DataTable
        headerBg="#4e342e"
        columns={columns}
        data={MUSHROOMS}
        renderRow={(row) => {
          const bb = bestBadge(row.best);
          return [
            <Cell key="name" width={130} align="left">
              <Text style={{ fontWeight: "700", color: "#3e2723" }}>{row.icon} {row.name}</Text>
            </Cell>,
            <Cell key="raw" width={65}>
              <Text style={{ fontWeight: "600", color: "#5d4037" }}>{fmtG(row.sell)}</Text>
            </Cell>,
            ...["jar", "keg", "dehy"].map((k) => (
              <Cell key={k} width={75}>
                <Text style={{ fontWeight: "700", color: pColor(artisan ? row[k].a : row[k].g) }}>
                  {fmtG(artisan ? row[k].a : row[k].g)}
                </Text>
              </Cell>
            )),
            <Cell key="best" width={80}>
              <Badge label={bb.label} bg={bb.bg} border={bb.border} color={bb.color} />
            </Cell>,
            <Cell key="source" width={160} align="left">
              <Text style={{ fontSize: 11, color: "#8d6e63" }}>{row.source}</Text>
            </Cell>,
          ];
        }}
      />
    </View>
  );
}
