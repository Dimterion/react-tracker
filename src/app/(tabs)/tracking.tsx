import TrackItem from "@/components/TrackingItem";
import { clearAllTracks, getTracks, Track } from "@/storage/tracks";
import { globalStyles } from "@/styles/global";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function TrackingScreen() {
  const [tracks, setTracks] = useState<Track[]>([]);

  const loadTracks = async () => {
    const data = await getTracks();
    setTracks(data);
  };

  const handleClearAll = async () => {
    await clearAllTracks();
    loadTracks();
  };

  useFocusEffect(
    useCallback(() => {
      loadTracks();
    }, []),
  );

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>Tracking</Text>
        <TouchableOpacity onPress={handleClearAll}>
          <Text style={styles.clearButton}>Clear All</Text>
        </TouchableOpacity>
      </View>
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

const styles = {
  clearButton: {
    color: "red",
    fontSize: 16,
  },
};
