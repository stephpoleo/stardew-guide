import { useState, useEffect } from "react";
import { Text, View, TextInput, Pressable, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SEASON_LIST, toAbs, fromAbs, fmtDate } from "../utils/dateHelpers";
import { AGING, PROD_ICON, QUALITY_META, getUpgrades } from "../data/cask";
import Pill from "../components/Pill";
import DataTable, { Cell } from "../components/DataTable";

const SI = { Spring: "\ud83c\udf38", Summer: "\u2600\ufe0f", Fall: "\ud83c\udf42", Winter: "\u2744\ufe0f" };

const EMPTY_FORM = {
  label: "", product: "Wine", qty: "1", startQuality: "Normal",
  placedSeason: "Spring", placedDay: "1", placedYear: "1",
};

function Sel({ value, onChange, options }) {
  return (
    <View style={{ borderWidth: 1, borderColor: "#d7ccc8", borderRadius: 6, overflow: "hidden" }}>
      {options.map((o) => (
        <Pressable key={o} onPress={() => onChange(o)} style={{
          padding: 8, backgroundColor: value === o ? "#5d4037" : "white",
        }}>
          <Text style={{ fontSize: 12, color: value === o ? "white" : "#333", fontWeight: value === o ? "700" : "400" }}>{o}</Text>
        </Pressable>
      ))}
    </View>
  );
}

function NumInput({ value, onChangeText, placeholder }) {
  return (
    <TextInput
      value={String(value)}
      onChangeText={onChangeText}
      keyboardType="numeric"
      placeholder={placeholder}
      style={{
        borderWidth: 1, borderColor: "#d7ccc8", borderRadius: 6,
        padding: 8, fontSize: 12, width: 65, textAlign: "center",
      }}
    />
  );
}

export default function CaskTracker() {
  const [today, setToday] = useState({ season: "Spring", day: 1, year: 1 });
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("all");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const t = await AsyncStorage.getItem("sv-cask-today");
        if (t) setToday(JSON.parse(t));
      } catch (_) {}
      try {
        const e = await AsyncStorage.getItem("sv-cask-entries");
        if (e) setEntries(JSON.parse(e));
      } catch (_) {}
      setReady(true);
    })();
  }, []);

  async function saveToday(next) {
    setToday(next);
    try { await AsyncStorage.setItem("sv-cask-today", JSON.stringify(next)); } catch (_) {}
  }

  async function saveEntries(next) {
    setEntries(next);
    try { await AsyncStorage.setItem("sv-cask-entries", JSON.stringify(next)); } catch (_) {}
  }

  const todayAbs = toAbs(today.year, today.season, today.day);

  function advanceDay(delta) {
    const abs = Math.max(0, todayAbs + delta);
    saveToday(fromAbs(abs));
  }

  function openForm() {
    setForm({ ...EMPTY_FORM, placedSeason: today.season, placedDay: String(today.day), placedYear: String(today.year) });
    setShowForm(true);
  }

  function addEntry() {
    if (!form.label.trim()) return;
    const entry = {
      ...form,
      qty: Math.max(1, Number(form.qty) || 1),
      placedDay: Number(form.placedDay),
      placedYear: Number(form.placedYear),
      id: String(Date.now()),
    };
    saveEntries([...entries, entry]);
    setShowForm(false);
  }

  function removeEntry(id) {
    saveEntries(entries.filter((e) => e.id !== id));
  }

  const allEvents = [];
  for (const entry of entries) {
    for (const upgrade of getUpgrades(entry)) {
      allEvents.push({ ...upgrade, entry });
    }
  }
  allEvents.sort((a, b) => a.abs - b.abs);

  const readyEvents = allEvents.filter((e) => e.abs <= todayAbs);
  const pendingEvents = allEvents.filter((e) => e.abs > todayAbs);
  const displayed = filter === "ready" ? readyEvents : filter === "pending" ? pendingEvents : allEvents;

  const grouped = {};
  for (const ev of displayed) {
    if (!grouped[ev.abs]) grouped[ev.abs] = { abs: ev.abs, date: ev.date, items: [] };
    grouped[ev.abs].items.push(ev);
  }
  const groups = Object.values(grouped).sort((a, b) => a.abs - b.abs);

  const previewUpgrades = showForm ? getUpgrades({
    ...form,
    placedDay: Number(form.placedDay),
    placedYear: Number(form.placedYear),
  }) : [];

  if (!ready) {
    return <View style={{ padding: 40, alignItems: "center" }}><Text style={{ color: "#aaa" }}>Cargando...</Text></View>;
  }

  return (
    <View>
      {/* Today header */}
      <View style={{
        backgroundColor: "white", borderRadius: 12, padding: 16, marginBottom: 16,
        borderWidth: 2, borderColor: "#5d4037",
        shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 10, elevation: 3,
      }}>
        <Text style={{ fontSize: 11, color: "#8d6e63", fontWeight: "700", marginBottom: 4 }}>\ud83d\udcc5 D\u00cdA ACTUAL EN JUEGO</Text>
        <Text style={{ fontSize: 22, fontWeight: "700", color: "#3e2723" }}>
          {SI[today.season]} {today.season} {today.day}, A\u00f1o {today.year}
        </Text>
        <Text style={{ fontSize: 11, marginTop: 3 }}>
          {readyEvents.length > 0
            ? <Text style={{ color: "#2e7d32", fontWeight: "700" }}>\ud83c\udf89 {readyEvents.length} evento(s) listo(s)</Text>
            : <Text style={{ color: "#aaa" }}>Sin lotes listos por ahora</Text>}
        </Text>

        {/* Season picker */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }}>
          <View style={{ flexDirection: "row", gap: 6 }}>
            {SEASON_LIST.map((s) => (
              <Pressable key={s} onPress={() => saveToday({ ...today, season: s })} style={{
                paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8,
                backgroundColor: today.season === s ? "#5d4037" : "#f5f5f5",
              }}>
                <Text style={{ fontSize: 12, color: today.season === s ? "white" : "#555", fontWeight: today.season === s ? "700" : "400" }}>
                  {SI[s]} {s}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        {/* Day/Year inputs */}
        <View style={{ flexDirection: "row", gap: 10, marginTop: 10, alignItems: "center" }}>
          <Text style={{ fontSize: 12, color: "#777" }}>D\u00eda:</Text>
          <NumInput value={today.day} onChangeText={(v) => {
            const d = Math.min(28, Math.max(1, Number(v) || 1));
            saveToday({ ...today, day: d });
          }} />
          <Text style={{ fontSize: 12, color: "#777" }}>A\u00f1o:</Text>
          <NumInput value={today.year} onChangeText={(v) => {
            const y = Math.max(1, Number(v) || 1);
            saveToday({ ...today, year: y });
          }} />
        </View>

        {/* Quick advance buttons */}
        <View style={{ flexDirection: "row", gap: 5, marginTop: 10 }}>
          {[-7, -1].map((d) => (
            <Pressable key={d} onPress={() => advanceDay(d)} style={{
              flex: 1, padding: 6, borderRadius: 6,
              borderWidth: 1, borderColor: "#d7ccc8", backgroundColor: "white", alignItems: "center",
            }}>
              <Text style={{ fontSize: 12, color: "#5d4037" }}>{d}d</Text>
            </Pressable>
          ))}
          {[1, 7, 28].map((d) => (
            <Pressable key={d} onPress={() => advanceDay(d)} style={{
              flex: 1, padding: 6, borderRadius: 6,
              borderWidth: 1, borderColor: "#a5d6a7", backgroundColor: "#f1f8e9", alignItems: "center",
            }}>
              <Text style={{ fontSize: 12, fontWeight: "700", color: "#2e7d32" }}>+{d}d</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Add button */}
      {!showForm && (
        <Pressable onPress={openForm} style={{
          padding: 12, borderRadius: 10, borderWidth: 2, borderStyle: "dashed",
          borderColor: "#bcaaa4", backgroundColor: "white", alignItems: "center", marginBottom: 14,
        }}>
          <Text style={{ fontSize: 13, color: "#8d6e63", fontWeight: "700" }}>+ Agregar lote al barril</Text>
        </Pressable>
      )}

      {/* Form */}
      {showForm && (
        <View style={{
          backgroundColor: "white", borderRadius: 12, padding: 18,
          borderWidth: 1, borderColor: "#d7ccc8", marginBottom: 14,
          shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 10, elevation: 3,
        }}>
          <Text style={{ fontSize: 14, fontWeight: "700", color: "#3e2723", marginBottom: 14 }}>\ud83e\udea3 Nuevo lote</Text>

          <Text style={{ fontSize: 12, color: "#555", fontWeight: "700", marginBottom: 4 }}>Nombre</Text>
          <TextInput
            value={form.label}
            onChangeText={(v) => setForm({ ...form, label: v })}
            placeholder="ej. Starfruit Wine #1"
            style={{
              borderWidth: 1, borderColor: "#d7ccc8", borderRadius: 6,
              padding: 8, fontSize: 12, marginBottom: 12,
            }}
          />

          <Text style={{ fontSize: 12, color: "#555", fontWeight: "700", marginBottom: 4 }}>Producto</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: "row", gap: 6 }}>
              {Object.keys(AGING).map((p) => (
                <Pressable key={p} onPress={() => setForm({ ...form, product: p })} style={{
                  paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8,
                  backgroundColor: form.product === p ? "#5d4037" : "#f5f5f5",
                }}>
                  <Text style={{ fontSize: 12, color: form.product === p ? "white" : "#333" }}>
                    {PROD_ICON[p]} {p}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>

          <View style={{ flexDirection: "row", gap: 12, marginBottom: 12 }}>
            <View>
              <Text style={{ fontSize: 12, color: "#555", fontWeight: "700", marginBottom: 4 }}># Barriles</Text>
              <NumInput value={form.qty} onChangeText={(v) => setForm({ ...form, qty: v })} />
            </View>
            <View>
              <Text style={{ fontSize: 12, color: "#555", fontWeight: "700", marginBottom: 4 }}>Calidad inicial</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: "row", gap: 4 }}>
                  {["Normal", "Silver", "Gold"].map((q) => (
                    <Pressable key={q} onPress={() => setForm({ ...form, startQuality: q })} style={{
                      paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6,
                      backgroundColor: form.startQuality === q ? "#5d4037" : "#f5f5f5",
                    }}>
                      <Text style={{ fontSize: 11, color: form.startQuality === q ? "white" : "#333" }}>{q}</Text>
                    </Pressable>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>

          <Text style={{ fontSize: 12, fontWeight: "700", color: "#5d4037", marginBottom: 8 }}>\ud83d\udcc5 Fecha en que lo pusiste</Text>
          <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 16 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: "row", gap: 4 }}>
                {SEASON_LIST.map((s) => (
                  <Pressable key={s} onPress={() => setForm({ ...form, placedSeason: s })} style={{
                    paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6,
                    backgroundColor: form.placedSeason === s ? "#5d4037" : "#f5f5f5",
                  }}>
                    <Text style={{ fontSize: 11, color: form.placedSeason === s ? "white" : "#333" }}>{SI[s]} {s}</Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
            <Text style={{ fontSize: 12, color: "#777" }}>D\u00eda:</Text>
            <NumInput value={form.placedDay} onChangeText={(v) => setForm({ ...form, placedDay: v })} />
            <Text style={{ fontSize: 12, color: "#777" }}>A\u00f1o:</Text>
            <NumInput value={form.placedYear} onChangeText={(v) => setForm({ ...form, placedYear: v })} />
          </View>

          {/* Preview */}
          {form.label.trim() && previewUpgrades.length > 0 && (
            <View style={{ backgroundColor: "#fafaf7", borderRadius: 8, padding: 12, marginBottom: 14, borderWidth: 1, borderColor: "#ede0d4" }}>
              <Text style={{ fontSize: 11, color: "#8d6e63", marginBottom: 8, fontWeight: "700" }}>
                Vista previa \u2014 {form.qty}\u00d7 {PROD_ICON[form.product]} {form.product}
              </Text>
              <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
                {previewUpgrades.map((u) => {
                  const q = QUALITY_META[u.quality];
                  const dLeft = u.abs - todayAbs;
                  return (
                    <View key={u.quality} style={{
                      backgroundColor: q.bg, borderWidth: 1, borderColor: q.color,
                      borderRadius: 8, padding: 10, minWidth: 110,
                    }}>
                      <Text style={{ fontWeight: "700", color: q.color, fontSize: 13 }}>{q.icon} {u.quality}</Text>
                      <Text style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{fmtDate(u.date)}</Text>
                      <Text style={{ fontSize: 10, color: dLeft <= 0 ? "#2e7d32" : "#888", marginTop: 2 }}>
                        {dLeft <= 0 ? "\u2705 Ya listo" : `En ${dLeft} d\u00eda(s)`}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          <View style={{ flexDirection: "row", gap: 8 }}>
            <Pressable onPress={addEntry} style={{
              paddingVertical: 10, paddingHorizontal: 22, borderRadius: 8,
              backgroundColor: "#5d4037",
            }}>
              <Text style={{ color: "white", fontWeight: "700", fontSize: 13 }}>Agregar</Text>
            </Pressable>
            <Pressable onPress={() => setShowForm(false)} style={{
              paddingVertical: 10, paddingHorizontal: 18, borderRadius: 8,
              borderWidth: 1, borderColor: "#d7ccc8", backgroundColor: "white",
            }}>
              <Text style={{ color: "#888", fontSize: 13 }}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      )}

      {/* Filter tabs */}
      {entries.length > 0 && (
        <View style={{ flexDirection: "row", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
          {[["all", "\ud83d\udccb Todos", allEvents.length], ["ready", "\u2705 Listos", readyEvents.length], ["pending", "\u23f3 Pendientes", pendingEvents.length]].map(([id, lbl, count]) => (
            <Pill key={id} on={filter === id} onPress={() => setFilter(id)} activeColor="#5d4037">
              {lbl} ({count})
            </Pill>
          ))}
        </View>
      )}

      {/* Empty state */}
      {entries.length === 0 && (
        <View style={{ alignItems: "center", padding: 40, backgroundColor: "white", borderRadius: 12 }}>
          <Text style={{ fontSize: 36, marginBottom: 8 }}>\ud83e\udea3</Text>
          <Text style={{ fontSize: 14, color: "#bbb" }}>Sin lotes registrados</Text>
          <Text style={{ fontSize: 12, color: "#bbb", marginTop: 4, textAlign: "center" }}>
            Agrega lo que metiste al barril y el calendario calcula todo
          </Text>
        </View>
      )}

      {entries.length > 0 && groups.length === 0 && (
        <View style={{ alignItems: "center", padding: 30 }}>
          <Text style={{ color: "#bbb" }}>Sin eventos en esta categor\u00eda</Text>
        </View>
      )}

      {/* Event list */}
      <View style={{ gap: 8 }}>
        {groups.map((group) => {
          const isReady = group.abs <= todayAbs;
          const daysLeft = group.abs - todayAbs;
          const isToday = daysLeft === 0;
          return (
            <View key={group.abs} style={{
              backgroundColor: isReady ? "#f1f8e9" : "white",
              borderWidth: 2, borderColor: isReady ? "#a5d6a7" : isToday ? "#ffcc02" : "#ede0d4",
              borderRadius: 10, padding: 14,
            }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View>
                  <Text style={{ fontWeight: "700", fontSize: 14, color: "#3e2723" }}>
                    {SI[group.date.season] || ""} {fmtDate(group.date)}
                  </Text>
                  <Text style={{
                    fontSize: 11, marginTop: 2,
                    color: isReady ? "#2e7d32" : "#888",
                    fontWeight: isReady ? "700" : "400",
                  }}>
                    {isReady
                      ? (isToday ? "\u2b50 \u00a1Hoy est\u00e1 listo!" : `\u2705 Listo hace ${-daysLeft} d\u00eda(s)`)
                      : `\u23f3 En ${daysLeft} d\u00eda(s)`}
                  </Text>
                </View>
                <Text style={{ fontSize: 22 }}>{isReady ? "\ud83c\udf89" : "\u23f3"}</Text>
              </View>

              <View style={{ marginTop: 10, gap: 5 }}>
                {group.items.map((ev, idx) => {
                  const q = QUALITY_META[ev.quality];
                  return (
                    <View key={idx} style={{
                      flexDirection: "row", alignItems: "center", gap: 10,
                      backgroundColor: q.bg, borderRadius: 7, padding: 8,
                    }}>
                      <Text style={{ fontSize: 18 }}>{PROD_ICON[ev.entry.product] || "\ud83c\udf77"}</Text>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: "700", fontSize: 13, color: "#3e2723" }}>{ev.entry.label}</Text>
                        <Text style={{ fontSize: 11, color: "#8d6e63" }}>
                          {ev.entry.qty}\u00d7 {ev.entry.product} \u00b7 entr\u00f3 como {ev.entry.startQuality}
                        </Text>
                      </View>
                      <Text style={{ fontWeight: "700", color: q.color, fontSize: 13 }}>{q.icon} {ev.quality}</Text>
                      <Pressable onPress={() => removeEntry(ev.entry.id)} style={{ padding: 4 }}>
                        <Text style={{ fontSize: 14, color: "#ccc" }}>\u2715</Text>
                      </Pressable>
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>

      {/* Reference table */}
      <View style={{ marginTop: 20, backgroundColor: "white", borderRadius: 12, padding: 16, borderWidth: 1, borderColor: "#ede0d4" }}>
        <Text style={{ fontSize: 13, fontWeight: "700", color: "#5d4037", marginBottom: 10 }}>
          \ud83d\udcd6 Tiempos de maduraci\u00f3n desde calidad Normal
        </Text>
        <DataTable
          headerBg="#5d4037"
          columns={[
            { label: "Producto", width: 120, align: "left" },
            { label: "\u2b50 Silver", width: 70 },
            { label: "\ud83c\udf1f Gold", width: 70 },
            { label: "\ud83d\udc9c Iridium", width: 80 },
          ]}
          data={Object.entries(AGING).map(([p, a]) => ({ p, ...a }))}
          renderRow={(row) => [
            <Cell key="p" width={120} align="left">
              <Text style={{ fontWeight: "700" }}>{PROD_ICON[row.p]} {row.p}</Text>
            </Cell>,
            <Cell key="s" width={70}><Text style={{ color: "#546e7a" }}>{row.silver}d</Text></Cell>,
            <Cell key="g" width={70}><Text style={{ color: "#f9a825" }}>{row.gold}d</Text></Cell>,
            <Cell key="i" width={80}><Text style={{ color: "#7b1fa2", fontWeight: "700" }}>{row.iridium}d</Text></Cell>,
          ]}
        />
        <Text style={{ marginTop: 8, fontSize: 11, color: "#aaa" }}>
          Si el producto entra como Silver o Gold, el tracker descuenta los d\u00edas previos autom\u00e1ticamente.
        </Text>
      </View>
    </View>
  );
}
