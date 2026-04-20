import { Track } from "@/storage/tracks";
import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";

type CopyButtonProps = {
  tracks: Track[];
};

export default function CopyButton({ tracks }: CopyButtonProps) {
  const handleCopy = async () => {
    const totals = tracks.reduce(
      (acc, track) => ({
        el1: acc.el1 + track.el1,
        el2: acc.el2 + track.el2,
        el3: acc.el3 + track.el3,
        el4: acc.el4 + track.el4,
      }),
      { el1: 0, el2: 0, el3: 0, el4: 0 },
    );

    const summary = `Summary\n\nEl1: ${totals.el1}\nEl2: ${totals.el2}\nEl3: ${totals.el3}\nEl4: ${totals.el4}\n\nTracks: ${tracks.length} logged today`;

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
