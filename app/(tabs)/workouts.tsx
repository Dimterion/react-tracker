import LinkItem from "@/features/workouts/components/WorkoutListItem";
import {
  clearAllLinks,
  getLinks,
  WorkoutSession,
} from "@/features/workouts/storage/workouts";
import { globalStyles } from "@/styles/global";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function LinksScreen() {
  const [links, setLinks] = useState<WorkoutSession[]>([]);

  const loadLinks = async () => {
    const data = await getLinks();
    setLinks(data);
  };

  const handleClearAll = async () => {
    await clearAllLinks();
    loadLinks();
  };

  useFocusEffect(
    useCallback(() => {
      loadLinks();
    }, []),
  );

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>Workouts</Text>
        <TouchableOpacity onPress={handleClearAll}>
          <Text style={styles.clearButton}>Clear All</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 30 }}>
        {links.length === 0 ? (
          <Text style={globalStyles.empty}>No workouts logged yet.</Text>
        ) : (
          links.map((link) => (
            <LinkItem
              key={link.id}
              id={link.id}
              name={link.name}
              link={link.reglink}
              onDelete={loadLinks}
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
