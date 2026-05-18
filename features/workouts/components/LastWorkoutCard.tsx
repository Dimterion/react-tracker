import { colors } from "@/styles/global";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { WorkoutSession } from "../types";

type LastWorkoutCardProps = {
  workout: WorkoutSession;
  onPress: () => void;
};

export default function LastWorkoutCard({
  workout,
  onPress,
}: LastWorkoutCardProps) {
  return (
    <TouchableOpacity style={styles.lastWorkoutCard} onPress={onPress}>
      <Text style={styles.lastWorkoutLabel}>Last workout</Text>
      <Text style={styles.lastWorkoutTitle}>{workout.title}</Text>
      <Text style={styles.lastWorkoutMeta}>
        {workout.category} • {workout.durationMinutes} min
      </Text>
      <Text style={styles.lastWorkoutDate}>{workout.completedAt}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  lastWorkoutCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 18,
    marginBottom: 20,
  },
  lastWorkoutLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  lastWorkoutTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 6,
  },
  lastWorkoutMeta: {
    fontSize: 14,
    color: colors.textSecondary,
    textTransform: "capitalize",
    marginBottom: 4,
  },
  lastWorkoutDate: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: "600",
  },
});
