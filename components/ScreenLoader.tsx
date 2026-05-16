import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors } from "../styles/global";

type ScreenLoaderProps = {
  message?: string;
};

export default function ScreenLoader({
  message = "Loading...",
}: ScreenLoaderProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 220,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  text: {
    color: colors.textSecondary,
    fontSize: 14,
  },
});
