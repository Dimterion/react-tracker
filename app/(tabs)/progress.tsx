import { getStartOfWeek } from "@/utils/date";
import { useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { getWorkouts } from "../../features/workouts/storage";
import { WorkoutSession } from "../../features/workouts/types";
import { colors, globalStyles } from "../../styles/global";

function getTopCategory(workouts: WorkoutSession[]): string {
  const counts: Record<string, number> = {};

  for (const w of workouts) {
    counts[w.category] = (counts[w.category] ?? 0) + 1;
  }

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return sorted.length > 0
    ? sorted[0][0].charAt(0).toUpperCase() + sorted[0][0].slice(1)
    : "—";
}

export default function ProgressScreen() {
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

  const stats = useMemo(() => {
    const weekStart = getStartOfWeek();

    const thisWeek = workouts.filter(
      (w) => new Date(w.completedAt) >= weekStart,
    );

    const totalMinutes = workouts.reduce(
      (sum, w) => sum + w.durationMinutes,
      0,
    );

    const weekMinutes = thisWeek.reduce((sum, w) => sum + w.durationMinutes, 0);

    const categoryCounts: Record<string, number> = {};
    for (const w of workouts) {
      categoryCounts[w.category] = (categoryCounts[w.category] ?? 0) + 1;
    }

    return {
      total: workouts.length,
      totalMinutes,
      thisWeekCount: thisWeek.length,
      thisWeekMinutes: weekMinutes,
      topCategory: getTopCategory(workouts),
      categoryCounts,
    };
  }, [workouts]);

  const hasData = workouts.length > 0;

  return (
    <ScrollView style={globalStyles.container}>
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
              <Text style={styles.statValue}>{stats.total}</Text>
              <Text style={styles.statLabel}>Workouts</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.totalMinutes}</Text>
              <Text style={styles.statLabel}>Minutes</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.topCategory}</Text>
              <Text style={styles.statLabel}>Top Category</Text>
            </View>
          </View>

          <Text style={styles.sectionLabel}>This Week</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.thisWeekCount}</Text>
              <Text style={styles.statLabel}>Workouts</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.thisWeekMinutes}</Text>
              <Text style={styles.statLabel}>Minutes</Text>
            </View>
          </View>

          <Text style={styles.sectionLabel}>By Category</Text>
          <View style={styles.statsGrid}>
            {Object.entries(stats.categoryCounts).map(([cat, count]) => (
              <View key={cat} style={styles.statCard}>
                <Text style={styles.statValue}>{count}</Text>
                <Text style={styles.statLabel}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Text>
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
  },
  statLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  emptyState: {
    marginTop: 48,
    alignItems: "center",
  },
});
