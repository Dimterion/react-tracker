import { globalStyles } from "@/styles/global";
import { Link } from "expo-router";
import { ScrollView, Text } from "react-native";
import HomeHeader from "../components/HomeHeader";

export default function HomeScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>React Tracker</Text>
      <HomeHeader />
      <Link href="/tracking" style={{ fontSize: 18, color: "#00b4d8" }}>
        Go to Tracking
      </Link>
    </ScrollView>
  );
}
