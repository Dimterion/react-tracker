import CopyButton from "@/components/CopyButton";
import Header from "@/components/Header";
import LinkGrid from "@/components/LinkGrid";
import RecentLinks from "@/components/RecentLinks";
import ReminderToggle from "@/components/ReminderToggle";
import ShareButton from "@/components/ShareButton";
import { getLinks, WorkoutSession } from "@/storage/workouts";
import { globalStyles } from "@/styles/global";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
  const [links, setLinks] = useState<WorkoutSession[]>([]);

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
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>Workout Log</Text>
        <ShareButton links={links} />
      </View>
      <Header />
      <LinkGrid links={links} />
      <CopyButton links={links} />
      <ReminderToggle />
      <RecentLinks links={links} onDelete={loadLinks} />
    </ScrollView>
  );
}
