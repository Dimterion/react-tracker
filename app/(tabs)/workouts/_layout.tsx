import { Stack } from "expo-router";

export default function WorkoutsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="new" options={{ title: "New Workout" }} />
      <Stack.Screen name="[id]" options={{ title: "Workout Details" }} />
      <Stack.Screen name="edit/[id]" options={{ title: "Edit Workout" }} />
    </Stack>
  );
}
