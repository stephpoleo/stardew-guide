import { Text, Pressable } from "react-native";

export default function Pill({ on, onPress, children, activeColor = "#3e2723" }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingVertical: 7,
        paddingHorizontal: 15,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: on ? activeColor : "#d7ccc8",
        backgroundColor: on ? activeColor : "white",
      }}
    >
      <Text style={{
        color: on ? "white" : activeColor,
        fontWeight: on ? "700" : "400",
        fontSize: 13,
      }}>
        {children}
      </Text>
    </Pressable>
  );
}
