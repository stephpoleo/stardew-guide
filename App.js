import { SafeAreaView, StatusBar, View } from "react-native";
import { Almanac } from "./src/almanac/Prototype";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#2b2216" }}>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1 }}>
        <Almanac />
      </View>
    </SafeAreaView>
  );
}
