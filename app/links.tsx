import { globalStyles } from "@/styles/global";
import { ScrollView, Text } from "react-native";

export default function LinksScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>All Links</Text>
    </ScrollView>
  );
}
