export type WorkoutCategory = "strength" | "cardio" | "mobility" | "other";

export type WorkoutSession = {
  id: string;
  title: string;
  category: WorkoutCategory;
  durationMinutes: number;
  completedAt: string;
  notes?: string;
};

export type NewWorkoutInput = Omit<WorkoutSession, "id">;
