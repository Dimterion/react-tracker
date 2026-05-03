import AsyncStorage from "@react-native-async-storage/async-storage";
import { NewWorkoutInput, WorkoutSession } from "./types";

const WORKOUTS_KEY = "workouts";

export const getWorkouts = async (): Promise<WorkoutSession[]> => {
  const data = await AsyncStorage.getItem(WORKOUTS_KEY);
  return data ? JSON.parse(data) : [];
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

export const deleteWorkout = async (id: string): Promise<void> => {
  const workouts = await getWorkouts();
  const filtered = workouts.filter((workout) => workout.id !== id);

  await AsyncStorage.setItem(WORKOUTS_KEY, JSON.stringify(filtered));
};

export const clearAllWorkouts = async (): Promise<void> => {
  await AsyncStorage.removeItem(WORKOUTS_KEY);
};
