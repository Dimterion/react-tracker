import AsyncStorage from "@react-native-async-storage/async-storage";

export type Track = {
  id: string;
  name: string;
  el1: number;
  el2: number;
  el3: number;
  el4: number;
  createdAt: string;
};

const TRACKS_KEY = "tracks";

export const getTracks = async (): Promise<Track[]> => {
  const data = await AsyncStorage.getItem(TRACKS_KEY);
  return data ? JSON.parse(data) : [];
};

export const addTracker = async (
  track: Omit<Track, "id" | "createdAt">,
): Promise<Track> => {
  const tracks = await getTracks();
  const newTrack: Track = {
    ...track,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  await AsyncStorage.setItem(TRACKS_KEY, JSON.stringify([newTrack, ...tracks]));
  return newTrack;
};
