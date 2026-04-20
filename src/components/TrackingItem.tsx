import { deleteTrack } from "@/storage/tracks";
import { colors } from "@/styles/global";
import * as Haptics from "expo-haptics";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";

type TrackingItemProps = {
  id: string;
  name: string;
  el1: number;
  el2: number;
  el3: number;
  el4: number;
  onDelete: () => void;
};

export default function TrackingItem({
  id,
  name,
  el1,
  el2,
  el3,
  el4,
  onDelete,
}: TrackingItemProps) {
  const handleLongPress = () => {
    Alert.alert("Delete Track", `Are you sure you want to delete "${name}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteTrack(id);
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          onDelete();
        },
      },
    ]);
  };

  return (
    <TouchableOpacity style={styles.container} onLongPress={handleLongPress}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.elements}>
        {el1} • {el2} • {el3} • {el4}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  elements: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },
});
