import { useState } from "react";
import { Text, View, ScrollView, Pressable, SafeAreaView, StatusBar } from "react-native";
import CropsSection from "./src/sections/CropsSection";
import GemsSection from "./src/sections/GemsSection";
import MushroomsSection from "./src/sections/MushroomsSection";
import FishSection from "./src/sections/FishSection";
import AnimalsSection from "./src/sections/AnimalsSection";
import CaskTracker from "./src/sections/CaskTracker";

const TABS = [
  { id: "crops",   label: "\ud83c\udf3e Cultivos",  sub: "Por temporada" },
  { id: "gems",    label: "\ud83d\udc8e Minerales", sub: "Crystalarium" },
  { id: "mush",    label: "\ud83c\udf44 Hongos",    sub: "Cueva & Forrajeo" },
  { id: "fish",    label: "\ud83d\udc1f Peces",     sub: "Smoker & Fish Pond" },
  { id: "animals", label: "\ud83d\udc04 Animales",  sub: "Coop & Barn" },
  { id: "cask",    label: "\ud83e\udea3 Barriles",  sub: "Calendario" },
];

export default function App() {
  const [tab, setTab] = useState("crops");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f3ef" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f3ef" />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 14, paddingBottom: 40 }}>
        {/* Header */}
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Text style={{ fontSize: 30 }}>{"\ud83c\udf3e"}</Text>
          <Text style={{ fontSize: 21, fontWeight: "700", color: "#3e2723", letterSpacing: 0.5, marginTop: 4 }}>
            Stardew Valley
          </Text>
          <Text style={{ color: "#8d6e63", fontSize: 12 }}>Gu\u00eda de Rentabilidad Completa</Text>
        </View>

        {/* Tab bar */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 22 }}>
          <View style={{ flexDirection: "row", gap: 5 }}>
            {TABS.map((t) => (
              <Pressable
                key={t.id}
                onPress={() => setTab(t.id)}
                style={{
                  paddingVertical: 8, paddingHorizontal: 15, borderRadius: 10,
                  borderWidth: 2,
                  borderColor: tab === t.id ? "#3e2723" : "#d7ccc8",
                  backgroundColor: tab === t.id ? "#3e2723" : "white",
                  shadowColor: tab === t.id ? "#3e2723" : "transparent",
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: tab === t.id ? 0.25 : 0,
                  shadowRadius: 10,
                  elevation: tab === t.id ? 5 : 0,
                }}
              >
                <Text style={{ fontWeight: "700", fontSize: 12, color: tab === t.id ? "white" : "#5d4037" }}>
                  {t.label}
                </Text>
                <Text style={{ fontSize: 9, color: tab === t.id ? "rgba(255,255,255,0.7)" : "#aaa", marginTop: 1 }}>
                  {t.sub}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        {/* Content */}
        <View style={{ maxWidth: 1020 }}>
          {tab === "crops"   && <CropsSection />}
          {tab === "gems"    && <GemsSection />}
          {tab === "mush"    && <MushroomsSection />}
          {tab === "fish"    && <FishSection />}
          {tab === "animals" && <AnimalsSection />}
          {tab === "cask"    && <CaskTracker />}
        </View>

        {/* Footer tip */}
        <View style={{
          marginTop: 16, backgroundColor: "#fff8e1", borderRadius: 12,
          padding: 14, borderWidth: 1, borderColor: "#ffe082",
        }}>
          <Text style={{ color: "#e65100", fontSize: 12, fontWeight: "700" }}>\ud83d\udca1 Regla de oro</Text>
          <Text style={{ marginTop: 4, fontSize: 11, color: "#5d4037", lineHeight: 20 }}>
            <Text style={{ fontWeight: "700" }}>Cultivos:</Text> Ancient Fruit + Keg + Cask  \u00b7  <Text style={{ fontWeight: "700" }}>Minerales:</Text> Diamond en Crystalariums; Jade los domingos  \u00b7  <Text style={{ fontWeight: "700" }}>Hongos:</Text> Magma Cap + Dehydrator  \u00b7  <Text style={{ fontWeight: "700" }}>Peces:</Text> Sturgeon \u2192 Caviar; resto \u2192 Smoker  \u00b7  <Text style={{ fontWeight: "700" }}>Animales:</Text> Pig \u2192 Truffle Oil; Ostrich \u2192 \u00d710 Mayo
          </Text>
        </View>

        <Text style={{ textAlign: "center", fontSize: 10, color: "#ccc", marginTop: 10 }}>
          Calidades: \u26aa Normal \u00b7 \u2b50 Silver \u00d71.25 \u00b7 \ud83c\udf1f Gold \u00d71.5 \u00b7 \ud83d\udc9c Iridium \u00d72  \u00b7  Rancher +20% raw \u00b7 Artisan +40% procesado
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
