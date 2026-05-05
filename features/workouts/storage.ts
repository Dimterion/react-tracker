import AsyncStorage from "@react-native-async-storage/async-storage";
import { NewWorkoutInput, WorkoutSession } from "./types";

const WORKOUTS_KEY = "workouts";

export const getWorkouts = async (): Promise<WorkoutSession[]> => {
  const data = await AsyncStorage.getItem(WORKOUTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const getWorkoutById = async (id: string) => {
  const workouts = await getWorkouts();
  return workouts.find((workout) => workout.id === id) ?? null;
};

export const addWorkout = async (
  workout: NewWorkoutInput,
): Promise<WorkoutSession> => {
  const workouts = await getWorkouts();

  const newWorkout: WorkoutSession = {
    ...workout,
    id: Date.now().toString(),
  };

  await AsyncStorage.setItem(
    WORKOUTS_KEY,
    JSON.stringify([newWorkout, ...workouts]),
  );

  return newWorkout;
};

export const updateWorkout = async (updatedWorkout: WorkoutSession) => {
  const workouts = await getWorkouts();

  const updatedWorkouts = workouts.map((workout) =>
    workout.id === updatedWorkout.id ? updatedWorkout : workout,
  );

  await AsyncStorage.setItem(WORKOUTS_KEY, JSON.stringify(updatedWorkouts));
};

export const deleteWorkout = async (id: string): Promise<void> => {
  const workouts = await getWorkouts();
  const filtered = workouts.filter((workout) => workout.id !== id);

  await AsyncStorage.setItem(WORKOUTS_KEY, JSON.stringify(filtered));
};

export const clearAllWorkouts = async (): Promise<void> => {
  await AsyncStorage.removeItem(WORKOUTS_KEY);
};
