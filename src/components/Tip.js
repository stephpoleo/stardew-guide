import { Text, View } from "react-native";

export default function Tip({ icon, title, text, bg = "#fff8e1", tc = "#3e2723" }) {
  return (
    <View style={{ backgroundColor: bg, borderRadius: 10, padding: 12 }}>
      <Text style={{ fontSize: 18, marginBottom: 4 }}>{icon}</Text>
      <Text style={{ fontSize: 13, fontWeight: "700", color: tc }}>{title}</Text>
      <Text style={{ marginTop: 4, fontSize: 12, color: tc, opacity: 0.8, lineHeight: 18 }}>{text}</Text>
    </View>
  );
}
