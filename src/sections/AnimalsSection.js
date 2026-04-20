import { useState } from "react";
import { Text, View } from "react-native";
import { ANIMALS_COOP, ANIMALS_BARN } from "../data/animals";
import { fmtG, pColor } from "../utils/format";
import Pill from "../components/Pill";
import { SmallToggle } from "../components/Toggle";
import Badge from "../components/Badge";
import Tip from "../components/Tip";
import DataTable, { Cell } from "../components/DataTable";

const STAR_MULTS = [1, 1.25, 1.5, 2];
const STAR_LABELS = ["\u26aa Normal", "\u2b50 Silver", "\ud83c\udf1f Gold", "\ud83d\udc9c Iridium"];

export default function AnimalsSection() {
  const [tab, setTab] = useState("coop");
  const [artisan, setArtisan] = useState(false);
  const [rancher, setRancher] = useState(false);
  const tabColor = tab === "coop" ? "#558b2f" : "#795548";
  const rows = tab === "coop" ? ANIMALS_COOP : ANIMALS_BARN;

  function rawP(base, mult) {
    const r = Math.floor(base * mult);
    return rancher ? Math.floor(r * 1.2) : r;
  }

  const columns = [
    { label: "Animal", width: 100, align: "left" },
    { label: "Producto", width: 100, align: "left" },
    ...STAR_LABELS.map(l => ({ label: l, width: 75 })),
    { label: "\u2699\ufe0f Procesado", width: 90 },
    { label: "\ud83e\udea3 Cask", width: 75 },
    { label: "Mejor", width: 90 },
    { label: "Notas", width: 130, align: "left" },
  ];

  return (
    <View>
      <View style={{ flexDirection: "row", gap: 8, justifyContent: "center", marginBottom: 16, flexWrap: "wrap" }}>
        {[["coop", "\ud83d\udc14 Coop", "#558b2f"], ["barn", "\ud83d\udc04 Barn", "#795548"]].map(([id, label, color]) => (
          <Pill key={id} on={tab === id} onPress={() => setTab(id)} activeColor={color}>{label}</Pill>
        ))}
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center", gap: 28, marginBottom: 18, flexWrap: "wrap" }}>
        <SmallToggle on={rancher} onChange={setRancher} label="Rancher (+20%)" color={tabColor} />
        <SmallToggle on={artisan} onChange={setArtisan} label="Artisan (+40%)" color="#6a1b9a" />
      </View>

      <DataTable
        headerBg={tabColor}
        columns={columns}
        data={rows}
        renderRow={(row) => {
          const mp = row.mp != null ? (artisan ? row.ma : row.mp) : null;
          const cp = row.cask != null ? (artisan ? Math.floor(row.cask * 1.4) : row.cask) : null;
          const bestBg = row.best === "machine" ? "#e8f5e9" : "#fff8e1";
          const bestC = row.best === "machine" ? "#1b5e20" : "#e65100";
          return [
            <Cell key="animal" width={100} align="left">
              <Text style={{ fontWeight: "700", color: tabColor }}>{row.icon} {row.animal}</Text>
            </Cell>,
            <Cell key="product" width={100} align="left">
              <Text style={{ fontSize: 12, color: "#333" }}>{row.product}</Text>
            </Cell>,
            ...STAR_MULTS.map((mult, j) => (
              <Cell key={`star${j}`} width={75}>
                <Text style={{ color: pColor(rawP(row.base, mult)), fontSize: 13, fontWeight: "700" }}>
                  {fmtG(rawP(row.base, mult))}
                </Text>
              </Cell>
            )),
            <Cell key="proc" width={90}>
              {mp != null ? (
                <View>
                  <Text style={{ fontSize: 10, color: "#aaa", marginBottom: 1 }}>{row.out}</Text>
                  <Text style={{ color: pColor(mp), fontSize: 13, fontWeight: "700" }}>{fmtG(mp)}</Text>
                </View>
              ) : <Text style={{ color: "#ccc", fontSize: 12 }}>{"\u2014"}</Text>}
            </Cell>,
            <Cell key="cask" width={75}>
              {cp != null
                ? <Text style={{ color: pColor(cp), fontSize: 13, fontWeight: "700" }}>{fmtG(cp)}</Text>
                : <Text style={{ color: "#ccc", fontSize: 12 }}>{"\u2014"}</Text>}
            </Cell>,
            <Cell key="best" width={90}>
              <Badge label={row.best === "machine" ? `\u2699\ufe0f ${row.out}` : "\ud83d\udcb0 Raw"} bg={bestBg} border={bestC} color={bestC} small />
            </Cell>,
            <Cell key="note" width={130} align="left">
              <Text style={{ fontSize: 11, color: "#888" }}>{row.note || ""}</Text>
            </Cell>,
          ];
        }}
      />

      <View style={{ marginTop: 14, gap: 10 }}>
        {tab === "coop" ? (
          <>
            <Tip icon="\ud83e\udd95" title="Dinosaur Mayo" text="Dino Egg \u2192 Mayo = 800g (1,120g Artisan). El mejor del Coop." bg="#e8f5e9" tc="#1b5e20" />
            <Tip icon="\ud83d\udc07" title="Rabbit's Foot" text="565g base. No procesable pero es el regalo universal m\u00e1s efectivo." bg="#fce4ec" tc="#880e4f" />
          </>
        ) : (
          <>
            <Tip icon="\ud83d\udc37" title="Pig \u2192 Truffle Oil" text="1,065g (1,491g Artisan). Los cerdos buscan trufas solos. El rey del Barn." bg="#efebe9" tc="#3e2723" />
            <Tip icon="\ud83e\udda4" title="Ostrich \u2192 \u00d710 Mayo" text="1 Ostrich Egg \u2192 10 Mayonnaises = 1,900g (2,660g Artisan)." bg="#f3e5f5" tc="#4a148c" />
            <Tip icon="\ud83e\uddc0" title="Cheese + Cask" text="Large Milk \u2192 Large Cheese \u2192 Cask Iridium = 690g (966g Artisan)." bg="#fff8e1" tc="#795548" />
          </>
        )}
      </View>
    </View>
  );
}
