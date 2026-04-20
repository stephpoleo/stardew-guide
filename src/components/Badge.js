import { Text, View } from "react-native";

export default function Badge({ label, bg = "#eee", border = "#ccc", color = "#555", small = false }) {
  return (
    <View style={{
      backgroundColor: bg,
      borderColor: border,
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: small ? 7 : 9,
      paddingVertical: small ? 2 : 3,
      alignSelf: "flex-start",
    }}>
      <Text style={{ color, fontSize: small ? 10 : 11, fontWeight: "700" }}>{label}</Text>
    </View>
  );
}
