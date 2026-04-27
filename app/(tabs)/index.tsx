import Header from "@/components/Header";
import { globalStyles } from "@/styles/global";
import { Link } from "expo-router";
import { ScrollView, Text } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>React Native Playground</Text>
      <Header />
      <Link href="/links" style={{ fontSize: 18, color: "#007bff" }}>
        Go to Links
      </Link>
    </ScrollView>
  );
}
