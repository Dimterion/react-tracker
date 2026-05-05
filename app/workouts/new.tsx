import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { addWorkout } from "../../features/workouts/storage";
import { WorkoutCategory, WorkoutSet } from "../../features/workouts/types";
import { colors, globalStyles } from "../../styles/global";

export default function NewWorkoutScreen() {
  const [title, setTitle] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");
  const [notes, setNotes] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [category] = useState<WorkoutCategory>("strength");

  const [sets, setSets] = useState<WorkoutSet[]>([
    { id: Date.now().toString(), reps: 10, weightKg: 20 },
  ]);

  const updateSet = (id: string, field: "reps" | "weightKg", value: string) => {
    setSets((currentSets) =>
      currentSets.map((set) =>
        set.id === id
          ? {
              ...set,
              [field]: value === "" ? undefined : Number(value),
            }
          : set,
      ),
    );
  };

  const addSetField = () => {
    setSets((currentSets) => [
      ...currentSets,
      { id: `${Date.now()}-${currentSets.length}`, reps: 0, weightKg: 0 },
    ]);
  };

  const handleSaveWorkout = async () => {
    if (!title || !durationMinutes || !exerciseName) {
      Alert.alert(
        "Error",
        "Please enter a workout title, duration, and exercise name.",
      );
      return;
    }

    await addWorkout({
      title,
      category,
      durationMinutes: Number(durationMinutes),
      completedAt: new Date().toISOString(),
      notes,
      exercises: [
        {
          id: `exercise-${Date.now()}`,
          name: exerciseName,
          sets,
        },
      ],
    });

    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    Alert.alert("Success", "Workout added successfully!");
    router.back();
  };

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>New Workout</Text>

      <TextInput
        style={styles.input}
        placeholder="Workout title"
        placeholderTextColor={colors.textSecondary}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Duration in minutes"
        placeholderTextColor={colors.textSecondary}
        keyboardType="numeric"
        value={durationMinutes}
        onChangeText={setDurationMinutes}
      />

      <TextInput
        style={styles.input}
        placeholder="Exercise name"
        placeholderTextColor={colors.textSecondary}
        value={exerciseName}
        onChangeText={setExerciseName}
      />

      <View style={{ marginTop: 20 }}>
        <Text style={styles.sectionTitle}>Sets</Text>

        {sets.map((set, index) => (
          <View key={set.id} style={styles.setRow}>
            <Text style={styles.setLabel}>Set {index + 1}</Text>

            <TextInput
              style={[styles.input, styles.setInput]}
              placeholder="Reps"
              placeholderTextColor={colors.textSecondary}
              keyboardType="numeric"
              value={set.reps?.toString() ?? ""}
              onChangeText={(value) => updateSet(set.id, "reps", value)}
            />

            <TextInput
              style={[styles.input, styles.setInput]}
              placeholder="Kg"
              placeholderTextColor={colors.textSecondary}
              keyboardType="numeric"
              value={set.weightKg?.toString() ?? ""}
              onChangeText={(value) => updateSet(set.id, "weightKg", value)}
            />
          </View>
        ))}

        <TouchableOpacity onPress={addSetField}>
          <Text style={styles.linkText}>+ Add set</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={[styles.input, styles.notesInput]}
        placeholder="Notes"
        placeholderTextColor={colors.textSecondary}
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSaveWorkout}>
        <Text style={styles.buttonText}>Save Workout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    marginTop: 16,
  },
  notesInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 32,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  setRow: {
    marginTop: 12,
  },
  setLabel: {
    fontSize: 14,
    marginBottom: 4,
    color: colors.textSecondary,
  },
  setInput: {
    marginTop: 8,
  },
  linkText: {
    color: colors.primary,
    fontSize: 16,
    marginTop: 12,
  },
});
