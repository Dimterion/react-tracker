export type WorkoutCategory = "strength" | "cardio" | "mobility" | "other";

export type WorkoutSet = {
  id: string;
  reps?: number;
  weightKg?: number;
  durationSeconds?: number;
  distanceKm?: number;
};

export type ExerciseEntry = {
  id: string;
  name: string;
  sets: WorkoutSet[];
};

export type WorkoutSession = {
  id: string;
  title: string;
  category: WorkoutCategory;
  completedAt: string;
  durationMinutes: number;
  notes?: string;
  exercises: ExerciseEntry[];
};

export type NewWorkoutInput = Omit<WorkoutSession, "id">;
