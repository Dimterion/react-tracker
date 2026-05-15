import { getStartOfWeek } from "@/utils/date";
import { WorkoutCategory, WorkoutSession } from "../types";

export function getTopCategory(workouts: WorkoutSession[]): string {
  const counts: Record<string, number> = {};

  for (const workout of workouts) {
    counts[workout.category] = (counts[workout.category] ?? 0) + 1;
  }

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  return sorted.length > 0
    ? sorted[0][0].charAt(0).toUpperCase() + sorted[0][0].slice(1)
    : "—";
}

export function getRecentWorkouts(
  workouts: WorkoutSession[],
  limit = 3,
): WorkoutSession[] {
  return [...workouts]
    .sort(
      (a, b) =>
        new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime(),
    )
    .slice(0, limit);
}

export function getWeeklyStats(workouts: WorkoutSession[]) {
  const weekStart = getStartOfWeek();

  const thisWeek = workouts.filter(
    (workout) => new Date(workout.completedAt) >= weekStart,
  );

  const minutes = thisWeek.reduce(
    (sum, workout) => sum + workout.durationMinutes,
    0,
  );

  return {
    count: thisWeek.length,
    minutes,
  };
}

export function getProgressStats(workouts: WorkoutSession[]) {
  const weekStart = getStartOfWeek();

  const thisWeek = workouts.filter(
    (workout) => new Date(workout.completedAt) >= weekStart,
  );

  const totalMinutes = workouts.reduce(
    (sum, workout) => sum + workout.durationMinutes,
    0,
  );

  const thisWeekMinutes = thisWeek.reduce(
    (sum, workout) => sum + workout.durationMinutes,
    0,
  );

  const categoryCounts: Record<WorkoutCategory, number> = {
    strength: 0,
    cardio: 0,
    mobility: 0,
    other: 0,
  };

  for (const workout of workouts) {
    categoryCounts[workout.category] += 1;
  }

  return {
    total: workouts.length,
    totalMinutes,
    thisWeekCount: thisWeek.length,
    thisWeekMinutes,
    topCategory: getTopCategory(workouts),
    categoryCounts,
  };
}
