import AsyncStorage from "@react-native-async-storage/async-storage";

export type WorkoutSession = {
  id: string;
  name: string;
  reglink: number;
  createdAt: string;
};

const WORKOUTS_KEY = "links";

export const getLinks = async (): Promise<WorkoutSession[]> => {
  const data = await AsyncStorage.getItem(WORKOUTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const newWorkout = async (
  link: Omit<WorkoutSession, "id" | "createdAt">,
): Promise<WorkoutSession> => {
  const links = await getLinks();
  const newLink: WorkoutSession = {
    ...link,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  await AsyncStorage.setItem(WORKOUTS_KEY, JSON.stringify([newLink, ...links]));
  return newLink;
};

export const deleteLink = async (id: string): Promise<void> => {
  const links = await getLinks();
  const filtered = links.filter((link) => link.id !== id);
  await AsyncStorage.setItem(WORKOUTS_KEY, JSON.stringify(filtered));
};

export const clearAllLinks = async (): Promise<void> => {
  await AsyncStorage.removeItem(WORKOUTS_KEY);
};
