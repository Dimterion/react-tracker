import { formatWorkoutDate, getStartOfWeek } from "@/utils/date";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getWorkouts } from "../../features/workouts/storage";
import { WorkoutSession } from "../../features/workouts/types";
import { colors, globalStyles } from "../../styles/global";

export default function HomeScreen() {
  const [workouts, setWorkouts] = useState<WorkoutSession[]>([]);

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const data = await getWorkouts();
        setWorkouts(data);
      };
      load();
    }, []),
  );

  const weekStats = useMemo(() => {
    const weekStart = getStartOfWeek();
    const thisWeek = workouts.filter(
      (w) => new Date(w.completedAt) >= weekStart,
    );
    const minutes = thisWeek.reduce((sum, w) => sum + w.durationMinutes, 0);
    return { count: thisWeek.length, minutes };
  }, [workouts]);

  const hasActivity = weekStats.count > 0;

  const recentWorkouts = useMemo(() => {
    return [...workouts]
      .sort(
        (a, b) =>
          new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime(),
      )
      .slice(0, 3);
  }, [workouts]);

  return (
    <ScrollView
      style={globalStyles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={globalStyles.title}>Workout Tracker</Text>
      <Text style={[globalStyles.subtitle, { marginBottom: 32 }]}>
        Track your workouts and monitor your progress.
      </Text>

      <View style={styles.snapshotCard}>
        <Text style={styles.snapshotTitle}>This week</Text>

        {hasActivity ? (
          <View style={styles.snapshotRow}>
            <View style={styles.snapshotStat}>
              <Text style={styles.snapshotValue}>{weekStats.count}</Text>
              <Text style={styles.snapshotLabel}>
                {weekStats.count === 1 ? "workout" : "workouts"}
              </Text>
            </View>
            <View style={styles.snapshotDivider} />
            <View style={styles.snapshotStat}>
              <Text style={styles.snapshotValue}>{weekStats.minutes}</Text>
              <Text style={styles.snapshotLabel}>minutes</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.snapshotEmpty}>
            No workouts logged yet this week.
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.push("/workouts/new")}
      >
        <Text style={styles.primaryButtonText}>+ Log a Workout</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.push("/workouts")}
      >
        <Text style={styles.secondaryButtonText}>View History</Text>
      </TouchableOpacity>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Workouts</Text>
        {workouts.length > 0 ? (
          <TouchableOpacity onPress={() => router.push("/workouts")}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {recentWorkouts.length > 0 ? (
        recentWorkouts.map((workout) => (
          <TouchableOpacity
            key={workout.id}
            style={styles.recentCard}
            onPress={() => router.push(`/workouts/${workout.id}`)}
          >
            <Text style={styles.recentTitle}>{workout.title}</Text>
            <Text style={styles.recentMeta}>
              {workout.category} • {workout.durationMinutes} min •{" "}
              {formatWorkoutDate(workout.completedAt)}
            </Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.recentEmpty}>
          Your latest workouts will appear here.
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 24,
  },
  snapshotCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 20,
    marginBottom: 28,
  },
  snapshotTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 16,
  },
  snapshotRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  snapshotStat: {
    alignItems: "center",
    gap: 4,
  },
  snapshotValue: {
    fontSize: 36,
    fontWeight: "700",
    color: colors.text,
  },
  snapshotLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  snapshotDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.textSecondary,
    opacity: 0.2,
  },
  snapshotEmpty: {
    color: colors.textSecondary,
    fontSize: 15,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },
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
