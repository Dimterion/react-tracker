import { colors } from "@/styles/global";
import { formatWorkoutDate } from "@/utils/date";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { WorkoutSession } from "../types";

type RecentWorkoutsSectionProps = {
  recentWorkouts: WorkoutSession[];
  onPressWorkout: (workoutId: string) => void;
};

export default function RecentWorkoutsSection({
  recentWorkouts,
  onPressWorkout,
}: RecentWorkoutsSectionProps) {
  if (recentWorkouts.length === 0) {
    return (
      <Text style={styles.recentEmpty}>
        Your latest workouts will appear here.
      </Text>
    );
  }

  return (
    <View>
      {recentWorkouts.map((workout) => (
        <TouchableOpacity
          key={workout.id}
          style={styles.recentCard}
          onPress={() => onPressWorkout(workout.id)}
        >
          <Text style={styles.recentTitle}>{workout.title}</Text>
          <Text style={styles.recentMeta}>
            {workout.category} • {workout.durationMinutes} min •{" "}
            {formatWorkoutDate(workout.completedAt)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  recentCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  recentTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  recentMeta: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
    textTransform: "capitalize",
  },
  recentEmpty: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
