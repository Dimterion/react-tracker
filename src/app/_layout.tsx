import { colors } from "@/styles/global";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.header },
        headerTintColor: "#03045e",
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "Home" }}
      />
      <Stack.Screen options={{ title: "Tracking" }} name="tracking" />
      <Stack.Screen options={{ title: "Add Tracker" }} name="add-tracker" />
    </Stack>
  );
}
