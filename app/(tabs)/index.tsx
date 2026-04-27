import Header from "@/components/Header";
import LinkGrid from "@/components/LinkGrid";
import { globalStyles } from "@/styles/global";
import { ScrollView, Text } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>React Native Playground</Text>
      <Header />
      <LinkGrid />
    </ScrollView>
  );
}
