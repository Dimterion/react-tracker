import AsyncStorage from "@react-native-async-storage/async-storage";

export type Link = {
  id: string;
  name: string;
  reglink: number;
  createdAt: string;
};

const LINKS_KEY = "links";

export const getLinks = async (): Promise<Link[]> => {
  const data = await AsyncStorage.getItem(LINKS_KEY);
  return data ? JSON.parse(data) : [];
};

export const newWorkout = async (
  link: Omit<Link, "id" | "createdAt">,
): Promise<Link> => {
  const links = await getLinks();
  const newLink: Link = {
    ...link,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  await AsyncStorage.setItem(LINKS_KEY, JSON.stringify([newLink, ...links]));
  return newLink;
};

export const deleteLink = async (id: string): Promise<void> => {
  const links = await getLinks();
  const filtered = links.filter((link) => link.id !== id);
  await AsyncStorage.setItem(LINKS_KEY, JSON.stringify(filtered));
};

export const clearAllLinks = async (): Promise<void> => {
  await AsyncStorage.removeItem(LINKS_KEY);
};
