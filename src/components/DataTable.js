import { Text, View, ScrollView } from "react-native";

export default function DataTable({ headerBg, columns, data, renderRow }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={{
        backgroundColor: "white",
        borderRadius: 10,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 10,
        elevation: 3,
      }}>
        {/* Header */}
        <View style={{ flexDirection: "row", backgroundColor: headerBg }}>
          {columns.map((col, i) => (
            <View key={i} style={{ width: col.width || 90, padding: 11, alignItems: col.align === "left" ? "flex-start" : "center" }}>
              <Text style={{ color: "white", fontSize: 11, fontWeight: "700" }}>{col.label}</Text>
            </View>
          ))}
        </View>
        {/* Rows */}
        {data.map((item, i) => (
          <View key={i} style={{
            flexDirection: "row",
            backgroundColor: i % 2 === 0 ? "#fafaf9" : "white",
            borderBottomWidth: 1,
            borderBottomColor: "#f0f0f0",
          }}>
            {renderRow(item, i)}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export function Cell({ children, width = 90, align = "center", style }) {
  return (
    <View style={[{ width, padding: 10, justifyContent: "center", alignItems: align === "left" ? "flex-start" : "center" }, style]}>
      {typeof children === "string" ? <Text style={{ fontSize: 12, color: "#555" }}>{children}</Text> : children}
    </View>
  );
}
