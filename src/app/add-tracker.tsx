import { globalStyles } from "@/styles/global";
import { ScrollView, Text } from "react-native";

export default function AddTrackerScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Add Tracker</Text>
    </ScrollView>
  );
}
