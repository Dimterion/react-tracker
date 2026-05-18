import { colors } from "@/styles/global";
import { StyleSheet, Text, View } from "react-native";

type WeeklySnapshotCardProps = {
  weekStats: {
    count: number;
    minutes: number;
  };
  weeklyStreak: number;
};

export default function WeeklySnapshotCard({
  weekStats,
  weeklyStreak,
}: WeeklySnapshotCardProps) {
  const hasActivity = weekStats.count > 0;

  return (
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

      {weeklyStreak > 0 ? (
        <Text style={styles.streakText}>
          Current streak: {weeklyStreak} active{" "}
          {weeklyStreak === 1 ? "week" : "weeks"}
        </Text>
      ) : (
        <Text style={styles.streakTextMuted}>
          Start a workout this week to begin your streak.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
  streakText: {
    marginTop: 16,
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
    textAlign: "center",
  },
  streakTextMuted: {
    marginTop: 16,
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
  },
});
