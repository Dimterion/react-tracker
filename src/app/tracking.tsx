import { globalStyles } from "@/styles/global";
import { ScrollView, Text } from "react-native";

export default function TrackingScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Tracking</Text>
    </ScrollView>
  );
}
