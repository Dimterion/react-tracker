import { colors } from "@/styles/global";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.header },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="links" options={{ title: "Links" }} />
      <Stack.Screen name="add-link" options={{ title: "Add Link" }} />
    </Stack>
  );
}
