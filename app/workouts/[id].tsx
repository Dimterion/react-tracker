import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { getWorkoutById } from "../../features/workouts/storage";
import { WorkoutSession } from "../../features/workouts/types";
import { globalStyles } from "../../styles/global";

export default function WorkoutDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [workout, setWorkout] = useState<WorkoutSession | null>(null);

  useEffect(() => {
    const loadWorkout = async () => {
      if (!id) return;
      const data = await getWorkoutById(id);
      setWorkout(data);
    };

    loadWorkout();
  }, [id]);

  if (!workout) {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.title}>Workout not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>{workout.title}</Text>
      <Text style={globalStyles.subtitle}>
        {workout.category} • {workout.durationMinutes} min
      </Text>

      <View style={{ marginTop: 24 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            marginBottom: 12,
            color: "#a0a0b0",
          }}
        >
          Exercises
        </Text>

        {workout.exercises.map((exercise) => (
          <View
            key={exercise.id}
            style={{
              backgroundColor: "#16213e",
              borderRadius: 10,
              padding: 16,
              marginBottom: 12,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#fff" }}>
              {exercise.name}
            </Text>

            {exercise.sets.map((set, index) => (
              <Text
                key={set.id}
                style={{ color: "#a0a0b0", marginTop: 6, fontSize: 14 }}
              >
                Set {index + 1}: {set.reps ?? "-"} reps • {set.weightKg ?? 0} kg
              </Text>
            ))}
          </View>
        ))}
      </View>

      {workout.notes ? (
        <View style={{ marginTop: 16 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              marginBottom: 8,
              color: "#a0a0b0",
            }}
          >
            Notes
          </Text>
          <Text style={{ fontSize: 16, color: "#a0a0b0" }}>
            {workout.notes}
          </Text>
        </View>
      ) : null}
    </ScrollView>
  );
}
