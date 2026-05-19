import { colors } from "@/styles/global";
import { formatWorkoutDate } from "@/utils/date";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { WorkoutSession } from "../types";

type RecentWorkoutsSectionProps = {
  recentWorkouts: WorkoutSession[];
  showSeeAll: boolean;
  onSeeAllPress: () => void;
  onPressWorkout: (workoutId: string) => void;
};

export default function RecentWorkoutsSection({
  recentWorkouts,
  showSeeAll,
  onSeeAllPress,
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
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Workouts</Text>
        {showSeeAll ? (
          <TouchableOpacity onPress={onSeeAllPress}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {recentWorkouts.length === 0 ? (
        <Text style={styles.recentEmpty}>
          Your latest workouts will appear here.
        </Text>
      ) : (
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
      )}
    </>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    marginTop: 28,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },
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
