import { globalStyles } from "@/styles/global";
import { Link } from "expo-router";
import { ScrollView, Text } from "react-native";

export default function LinksScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>All Links</Text>
      <Link href="/add-link" style={{ fontSize: 18, color: "#007bff" }}>
        Add New Link
      </Link>
    </ScrollView>
  );
}
