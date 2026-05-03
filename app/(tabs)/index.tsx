import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../styles/global";

export default function HomeScreen() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Workout Tracker</Text>
      <Text style={globalStyles.subtitle}>Log sessions, review progress.</Text>

      <TouchableOpacity onPress={() => router.push("/workouts/new")}>
        <Text style={{ color: "#0ea5e9", marginTop: 20, fontSize: 16 }}>
          Start a new workout
        </Text>
      </TouchableOpacity>
    </View>
  );
}
