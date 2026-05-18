import ScreenError from "@/components/ScreenError";
import LastWorkoutCard from "@/features/workouts/components/LastWorkoutCard";
import RecentWorkoutsSection from "@/features/workouts/components/RecentWorkoutsSection";
import WeeklySnapshotCard from "@/features/workouts/components/WeeklySnapshotCard";
import {
  getRecentWorkouts,
  getWeeklyStats,
  getWeeklyWorkoutStreak,
} from "@/features/workouts/utils/stats";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ScreenLoader from "../../components/ScreenLoader";
import { getWorkouts } from "../../features/workouts/storage";
import { WorkoutSession } from "../../features/workouts/types";
import { colors, globalStyles } from "../../styles/global";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [workouts, setWorkouts] = useState<WorkoutSession[]>([]);

  const loadWorkouts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getWorkouts();
      setWorkouts(data);
    } catch (error) {
      console.error("Failed to load workouts:", error);
      setError("Unable to load data.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadWorkouts();
    }, [loadWorkouts]),
  );

  const weekStats = useMemo(() => getWeeklyStats(workouts), [workouts]);
  const recentWorkouts = useMemo(() => getRecentWorkouts(workouts), [workouts]);
  const lastWorkout = recentWorkouts[0] ?? null;
  const weeklyStreak = useMemo(
    () => getWeeklyWorkoutStreak(workouts),
    [workouts],
  );

  if (isLoading) {
    return (
      <ScrollView
        style={globalStyles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={globalStyles.title}>Workout Tracker</Text>
        <ScreenLoader message="Loading..." />
      </ScrollView>
    );
  }

  if (error) {
    return (
      <ScrollView
        style={globalStyles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={globalStyles.title}>Workout Tracker</Text>
        <ScreenError message={error} onRetry={loadWorkouts} />
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={globalStyles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={globalStyles.title}>Workout Tracker</Text>
      <Text style={[globalStyles.subtitle, { marginBottom: 32 }]}>
        Track your workouts and monitor your progress.
      </Text>

      <WeeklySnapshotCard weekStats={weekStats} weeklyStreak={weeklyStreak} />

      {lastWorkout ? (
        <LastWorkoutCard
          workout={lastWorkout}
          onPress={() => router.push(`/workouts/${lastWorkout.id}`)}
        />
      ) : null}

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

      <RecentWorkoutsSection
        recentWorkouts={recentWorkouts}
        onPressWorkout={(workoutId) => router.push(`/workouts/${workoutId}`)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 24,
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
