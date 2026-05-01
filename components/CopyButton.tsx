import { Link } from "@/storage/links";
import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";

type CopyButtonProps = {
  links: Link[];
};

export default function CopyButton({ links }: CopyButtonProps) {
  const handleCopy = async () => {
    const totals = links.reduce(
      (acc, link) => ({
        reglink: acc.reglink + link.reglink,
      }),
      { reglink: 0 },
    );

    const summary = `Summary\n\nLinks: ${totals.reglink} logged.`;

    await Clipboard.setStringAsync(summary);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert("Copied!", "Summary copied to clipboard.");
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleCopy}>
      <Ionicons name="copy-outline" size={18} color={colors.primary} />
      <Text style={styles.text}>Copy Summary</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 16,
  },
  text: {
    color: colors.primary,
    fontSize: 14,
  },
});
