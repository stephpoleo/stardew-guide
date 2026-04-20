import { Text, View, Pressable } from "react-native";

export default function Toggle({ on, onChange, label, color = "#6a1b9a" }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10, marginBottom: 16 }}>
      <Text style={{ fontSize: 13, color: "#777" }}>Sin</Text>
      <Pressable onPress={() => onChange(!on)}>
        <View style={{
          width: 44, height: 24, borderRadius: 12,
          backgroundColor: on ? color : "#ccc",
          justifyContent: "center",
        }}>
          <View style={{
            width: 20, height: 20, borderRadius: 10, backgroundColor: "white",
            position: "absolute", left: on ? 22 : 2,
            shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.3, shadowRadius: 3,
            elevation: 3,
          }} />
        </View>
      </Pressable>
      <Text style={{ fontSize: 13, color: "#777" }}>{label}</Text>
    </View>
  );
}

export function SmallToggle({ on, onChange, label, color = "#6a1b9a" }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      <Text style={{ fontSize: 12, color: "#777" }}>{label}</Text>
      <Pressable onPress={() => onChange(!on)}>
        <View style={{
          width: 38, height: 20, borderRadius: 10,
          backgroundColor: on ? color : "#ccc",
          justifyContent: "center",
        }}>
          <View style={{
            width: 16, height: 16, borderRadius: 8, backgroundColor: "white",
            position: "absolute", left: on ? 20 : 2,
            shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.3, shadowRadius: 3,
            elevation: 3,
          }} />
        </View>
      </Pressable>
    </View>
  );
}
