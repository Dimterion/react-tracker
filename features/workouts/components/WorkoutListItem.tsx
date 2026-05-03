import * as Haptics from "expo-haptics";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";

import { deleteWorkout } from "../storage";
import { WorkoutSession } from "../types";

type WorkoutListItemProps = {
  workout: WorkoutSession;
  onDelete: () => void;
};

export default function WorkoutListItem({
  workout,
  onDelete,
}: WorkoutListItemProps) {
  const handleLongPress = () => {
    Alert.alert(
      "Delete workout",
      `Are you sure you want to delete "${workout.title}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteWorkout(workout.id);
            await Haptics.notificationAsync(
              Haptics.NotificationFeedbackType.Success,
            );
            onDelete();
          },
        },
      ],
    );
  };

  return (
    <TouchableOpacity style={styles.container} onLongPress={handleLongPress}>
      <Text style={styles.title}>{workout.title}</Text>
      <Text style={styles.meta}>
        {workout.category} • {workout.durationMinutes} min
      </Text>
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
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  meta: {
    fontSize: 13,
    color: "#a0a0b0",
    marginTop: 4,
  },
});
