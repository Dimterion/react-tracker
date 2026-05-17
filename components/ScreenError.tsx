import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../styles/global";

type ScreenErrorProps = {
  message?: string;
  onRetry: () => void;
};

export default function ScreenError({
  message = "Something went wrong while loading this screen.",
  onRetry,
}: ScreenErrorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Couldn’t load data</Text>
      <Text style={styles.message}>{message}</Text>

      <TouchableOpacity style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 220,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: colors.background,
    fontSize: 15,
    fontWeight: "600",
  },
});
