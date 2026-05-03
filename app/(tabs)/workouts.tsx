import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import WorkoutListItem from "../../features/workouts/components/WorkoutListItem";
import { clearAllWorkouts, getWorkouts } from "../../features/workouts/storage";
import { WorkoutSession } from "../../features/workouts/types";
import { globalStyles } from "../../styles/global";

export default function WorkoutsScreen() {
  const [workouts, setWorkouts] = useState<WorkoutSession[]>([]);

  const loadWorkouts = async () => {
    const data = await getWorkouts();
    setWorkouts(data);
  };

  const handleClearAll = async () => {
    await clearAllWorkouts();
    loadWorkouts();
  };

  useFocusEffect(
    useCallback(() => {
      loadWorkouts();
    }, []),
  );

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>Workout History</Text>

        <TouchableOpacity onPress={() => router.push("/workouts/new")}>
          <Text style={{ color: "#0ea5e9", fontSize: 16 }}>Add New</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 24 }}>
        {workouts.length === 0 ? (
          <Text style={globalStyles.empty}>No workouts logged yet.</Text>
        ) : (
          workouts.map((workout) => (
            <WorkoutListItem
              key={workout.id}
              workout={workout}
              onDelete={loadWorkouts}
            />
          ))
        )}
      </View>

      <TouchableOpacity onPress={handleClearAll} style={{ marginTop: 20 }}>
        <Text style={{ color: "red", fontSize: 16 }}>Clear All</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
