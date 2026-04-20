import TrackItem from "@/components/TrackingItem";
import { getTracks, Track } from "@/storage/tracks";
import { globalStyles } from "@/styles/global";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function TrackingScreen() {
  const [tracks, setTracks] = useState<Track[]>([]);

  const loadTracks = async () => {
    const data = await getTracks();
    setTracks(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadTracks();
    }, []),
  );

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Tracking</Text>
      <View style={{ marginTop: 30 }}>
        {tracks.length === 0 ? (
          <Text style={globalStyles.empty}>No tracks logged yet.</Text>
        ) : (
          tracks.map((track) => (
            <TrackItem
              key={track.id}
              id={track.id}
              name={track.name}
              el1={track.el1}
              el2={track.el2}
              el3={track.el3}
              el4={track.el4}
              onDelete={loadTracks}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
}
