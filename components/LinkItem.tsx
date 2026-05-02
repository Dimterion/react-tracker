import { deleteLink } from "@/features/workouts/storage/workouts";
import * as Haptics from "expo-haptics";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";

type LinkItemProps = {
  id: string;
  name: string;
  link: number;
  onDelete: () => void;
};

export default function LinkItem({ id, name, link, onDelete }: LinkItemProps) {
  const handleLongPress = () => {
    Alert.alert(
      "Delete workout",
      `Are you sure you want to delete "${name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteLink(id);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            onDelete();
          },
        },
      ],
    );
  };

  return (
    <TouchableOpacity style={styles.container} onLongPress={handleLongPress}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.links}>{link}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#16213e",
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  links: {
    fontSize: 13,
    color: "#a0a0b0",
    marginTop: 4,
  },
});
