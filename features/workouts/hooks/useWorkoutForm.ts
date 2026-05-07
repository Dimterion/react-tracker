import { useCallback, useState } from "react";
import { ExerciseEntry, WorkoutCategory, WorkoutSession } from "../types";

export function useWorkoutForm() {
  const createId = () =>
    `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  const [title, setTitle] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState<WorkoutCategory>("strength");
  const [completedAt, setCompletedAt] = useState("");
  const [exercises, setExercises] = useState<ExerciseEntry[]>([
    {
      id: `exercise-${createId()}`,
      name: "",
      sets: [{ id: `set-${createId()}`, reps: 10, weightKg: 20 }],
    },
  ]);

  const initializeForm = useCallback((workout: WorkoutSession) => {
    setTitle(workout.title);
    setDurationMinutes(workout.durationMinutes.toString());
    setNotes(workout.notes ?? "");
    setCategory(workout.category);
    setCompletedAt(workout.completedAt);
    setExercises(workout.exercises);
  }, []);

  const resetForm = useCallback(() => {
    setTitle("");
    setDurationMinutes("");
    setNotes("");
    setCategory("strength");
    setCompletedAt("");
    setExercises([
      {
        id: `exercise-${createId()}`,
        name: "",
        sets: [{ id: `set-${createId()}`, reps: 10, weightKg: 20 }],
      },
    ]);
  }, []);

  const addExercise = () => {
    setExercises((current) => [
      ...current,
      {
        id: `exercise-${createId()}`,
        name: "",
        sets: [{ id: `set-${createId()}`, reps: 0, weightKg: 0 }],
      },
    ]);
  };

  const removeExercise = (exerciseId: string) => {
    setExercises((current) =>
      current.filter((exercise) => exercise.id !== exerciseId),
    );
  };

  const updateExerciseName = (exerciseId: string, value: string) => {
    setExercises((current) =>
      current.map((exercise) =>
        exercise.id === exerciseId ? { ...exercise, name: value } : exercise,
      ),
    );
  };

  const addSetToExercise = (exerciseId: string) => {
    setExercises((current) =>
      current.map((exercise) =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: [
                ...exercise.sets,
                { id: `set-${createId()}`, reps: 0, weightKg: 0 },
              ],
            }
          : exercise,
      ),
    );
  };

  const updateSetField = (
    exerciseId: string,
    setId: string,
    field: "reps" | "weightKg",
    value: string,
  ) => {
    setExercises((current) =>
      current.map((exercise) =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: exercise.sets.map((set) =>
                set.id === setId
                  ? {
                      ...set,
                      [field]: value === "" ? undefined : Number(value),
                    }
                  : set,
              ),
            }
          : exercise,
      ),
    );
  };

  const removeSetFromExercise = (exerciseId: string, setId: string) => {
    setExercises((current) =>
      current.map((exercise) =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: exercise.sets.filter((set) => set.id !== setId),
            }
          : exercise,
      ),
    );
  };

  const getCleanedExercises = useCallback(() => {
    return exercises
      .map((exercise) => ({
        ...exercise,
        name: exercise.name.trim(),
        sets: exercise.sets.filter(
          (set) =>
            set.reps !== undefined ||
            set.weightKg !== undefined ||
            set.durationSeconds !== undefined ||
            set.distanceKm !== undefined,
        ),
      }))
      .filter(
        (exercise) => exercise.name.length > 0 && exercise.sets.length > 0,
      );
  }, [exercises]);

  return {
    title,
    setTitle,
    durationMinutes,
    setDurationMinutes,
    notes,
    setNotes,
    category,
    setCategory,
    completedAt,
    setCompletedAt,
    exercises,
    setExercises,
    initializeForm,
    resetForm,
    addExercise,
    removeExercise,
    updateExerciseName,
    addSetToExercise,
    updateSetField,
    removeSetFromExercise,
    getCleanedExercises,
  };
}
