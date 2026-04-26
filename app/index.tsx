import HomeHeader from "@/components/Header";
import { globalStyles } from "@/styles/global";
import { ScrollView, Text } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>React Native Playground</Text>
      <HomeHeader />
    </ScrollView>
  );
}
