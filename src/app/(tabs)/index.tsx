import HomeHeader from "@/components/HomeHeader";
import RecentTrackings from "@/components/RecentTrackings";
import TrackingGrid from "@/components/TrackingGrid";
import { getTracks, Track } from "@/storage/tracks";
import { globalStyles } from "@/styles/global";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, Text } from "react-native";

export default function HomeScreen() {
  const [tracking, setTracking] = useState<Track[]>([]);

  const loadTracking = async () => {
    const data = await getTracks();
    setTracking(data);
    console.log("Loaded tracking:", data);
  };

  useFocusEffect(
    useCallback(() => {
      loadTracking();
    }, []),
  );

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>React Tracker</Text>
      <HomeHeader />
      <TrackingGrid />
      <RecentTrackings tracks={tracking} />
    </ScrollView>
  );
}
