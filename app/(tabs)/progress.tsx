import ScreenError from "@/components/ScreenError";
import ScreenLoader from "@/components/ScreenLoader";
import { getProgressStats } from "@/features/workouts/utils/stats";
import { useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { getWorkouts } from "../../features/workouts/storage";
import { WorkoutSession } from "../../features/workouts/types";
import { colors, globalStyles } from "../../styles/global";

export default function ProgressScreen() {
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

  const stats = useMemo(() => getProgressStats(workouts), [workouts]);

  const hasData = workouts.length > 0;

  if (isLoading) {
    return (
      <ScrollView
        style={globalStyles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={globalStyles.title}>Progress</Text>
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
        <Text style={globalStyles.title}>Progress</Text>
        <ScreenError message={error} onRetry={loadWorkouts} />
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={globalStyles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={globalStyles.title}>Progress</Text>

      {!hasData ? (
        <View style={styles.emptyState}>
          <Text style={globalStyles.empty}>
            Log some workouts to see your progress.
          </Text>
        </View>
      ) : (
        <>
          <Text style={styles.sectionLabel}>All Time</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={styles.statCardInner}>
                <Text style={styles.statValue}>{stats.total}</Text>
                <Text style={styles.statLabel}>Workouts</Text>
              </View>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statCardInner}>
                <Text style={styles.statValue}>{stats.totalMinutes}</Text>
                <Text style={styles.statLabel}>Minutes</Text>
              </View>
            </View>
            <View style={[styles.statCard, { width: "100%" }]}>
              <View style={styles.statCardInner}>
                <Text style={[styles.statValue, styles.topCategoryValue]}>
                  {stats.topCategory}
                </Text>
                <Text style={styles.statLabel}>Top Category</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionLabel}>This Week</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={styles.statCardInner}>
                <Text style={styles.statValue}>{stats.thisWeekCount}</Text>
                <Text style={styles.statLabel}>Workouts</Text>
              </View>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statCardInner}>
                <Text style={styles.statValue}>{stats.thisWeekMinutes}</Text>
                <Text style={styles.statLabel}>Minutes</Text>
              </View>
            </View>

            <View style={[styles.statCard, { width: "100%" }]}>
              <View style={styles.statCardInner}>
                <Text style={styles.statValue}>
                  {stats.currentWeeklyStreak}
                </Text>
                <Text style={styles.statLabel}>
                  {stats.currentWeeklyStreak === 1
                    ? "Active Week Streak"
                    : "Active Weeks Streak"}
                </Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionLabel}>By Category</Text>
          <View style={styles.statsGrid}>
            {Object.entries(stats.categoryCounts)
              .filter(([, count]) => count > 0)
              .map(([cat, count]) => (
                <View key={cat} style={styles.statCard}>
                  <View style={styles.statCardInner}>
                    <Text style={styles.statValue}>{count}</Text>
                    <Text style={styles.statLabel}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </Text>
                  </View>
                </View>
              ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 24,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 28,
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -6,
  },
  statCard: {
    width: "50%",
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  statCardInner: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 110,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
  },
  statLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: "500",
    marginTop: 6,
    textAlign: "center",
  },
  emptyState: {
    marginTop: 48,
    alignItems: "center",
  },
  topCategoryValue: {
    fontSize: 24,
  },
});
