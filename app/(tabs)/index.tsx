import Header from "@/components/Header";
import LinkGrid from "@/components/LinkGrid";
import RecentLinks from "@/components/RecentLinks";
import { getLinks, Link } from "@/storage/links";
import { globalStyles } from "@/styles/global";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, Text } from "react-native";

export default function HomeScreen() {
  const [links, setLinks] = useState<Link[]>([]);

  const loadLinks = async () => {
    const data = await getLinks();
    setLinks(data);
    console.log("Loaded links:", data);
  };

  useFocusEffect(
    useCallback(() => {
      loadLinks();
    }, []),
  );

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>React Native Playground</Text>
      <Header />
      <LinkGrid links={links} />
      <RecentLinks links={links} />
    </ScrollView>
  );
}
