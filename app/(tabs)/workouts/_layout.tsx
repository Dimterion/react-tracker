import { colors } from "@/styles/global";
import { Stack } from "expo-router";

export default function WorkoutsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.primary,
        headerTitleStyle: {
          color: colors.text,
          fontWeight: "700",
        },
        headerShadowVisible: false,
        headerBackButtonDisplayMode: "minimal",
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="new" options={{ title: "New Workout" }} />
      <Stack.Screen name="[id]" options={{ title: "Workout Details" }} />
      <Stack.Screen name="edit/[id]" options={{ title: "Edit Workout" }} />
    </Stack>
  );
}
