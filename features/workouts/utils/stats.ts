import { getStartOfWeek } from "@/utils/date";
import { WorkoutCategory, WorkoutSession } from "../types";

function getWeekKey(dateInput: string): string {
  const date = new Date(dateInput);
  const start = new Date(date);
  const day = start.getDay();
  const diff = start.getDate() - day + (day === 0 ? -6 : 1);
  start.setDate(diff);
  start.setHours(0, 0, 0, 0);
  return start.toISOString();
}

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

export function getWeeklyWorkoutStreak(workouts: WorkoutSession[]): number {
  if (workouts.length === 0) return 0;

  const workoutWeeks = new Set(
    workouts.map((workout) => getWeekKey(workout.completedAt)),
  );

  let streak = 0;
  let currentWeek = getStartOfWeek();

  while (workoutWeeks.has(currentWeek.toISOString())) {
    streak += 1;
    currentWeek = new Date(currentWeek);
    currentWeek.setDate(currentWeek.getDate() - 7);
    currentWeek.setHours(0, 0, 0, 0);
  }

  return streak;
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
    currentWeeklyStreak: getWeeklyWorkoutStreak(workouts),
    categoryCounts,
  };
}
