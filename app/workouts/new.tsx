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
import { ExerciseEntry, WorkoutCategory } from "../../features/workouts/types";
import { colors, globalStyles } from "../../styles/global";

export default function NewWorkoutScreen() {
  const [title, setTitle] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");
  const [notes, setNotes] = useState("");
  const [category] = useState<WorkoutCategory>("strength");
  const [exercises, setExercises] = useState<ExerciseEntry[]>([
    {
      id: `exercise-${Date.now()}`,
      name: "",
      sets: [{ id: `set-${Date.now()}`, reps: 10, weightKg: 20 }],
    },
  ]);

  const addExercise = () => {
    setExercises((current) => [
      ...current,
      {
        id: `exercise-${Date.now()}-${current.length}`,
        name: "",
        sets: [
          { id: `set-${Date.now()}-${current.length}`, reps: 0, weightKg: 0 },
        ],
      },
    ]);
  };

  const removeExercise = (exerciseId: string) => {
    setExercises((current) =>
      current.filter((exercise) => exercise.id !== exerciseId),
    );
  };

  const updateExerciseName = (exerciseId: string, value: string) => {
    setExercises((current) =>
      current.map((exercise) =>
        exercise.id === exerciseId ? { ...exercise, name: value } : exercise,
      ),
    );
  };

  const addSetToExercise = (exerciseId: string) => {
    setExercises((current) =>
      current.map((exercise) =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: [
                ...exercise.sets,
                {
                  id: `set-${Date.now()}-${exercise.sets.length}`,
                  reps: 0,
                  weightKg: 0,
                },
              ],
            }
          : exercise,
      ),
    );
  };

  const updateSetField = (
    exerciseId: string,
    setId: string,
    field: "reps" | "weightKg",
    value: string,
  ) => {
    setExercises((current) =>
      current.map((exercise) =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: exercise.sets.map((set) =>
                set.id === setId
                  ? {
                      ...set,
                      [field]: value === "" ? undefined : Number(value),
                    }
                  : set,
              ),
            }
          : exercise,
      ),
    );
  };

  const removeSetFromExercise = (exerciseId: string, setId: string) => {
    setExercises((current) =>
      current.map((exercise) =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: exercise.sets.filter((set) => set.id !== setId),
            }
          : exercise,
      ),
    );
  };

  const handleSaveWorkout = async () => {
    if (!title || !durationMinutes) {
      Alert.alert("Error", "Please enter a workout title and duration.");
      return;
    }

    const cleanedExercises = exercises
      .map((exercise) => ({
        ...exercise,
        name: exercise.name.trim(),
        sets: exercise.sets.filter(
          (set) =>
            set.reps !== undefined ||
            set.weightKg !== undefined ||
            set.durationSeconds !== undefined ||
            set.distanceKm !== undefined,
        ),
      }))
      .filter(
        (exercise) => exercise.name.length > 0 && exercise.sets.length > 0,
      );

    if (cleanedExercises.length === 0) {
      Alert.alert(
        "Error",
        "Please add at least one valid exercise with at least one set.",
      );
      return;
    }

    await addWorkout({
      title,
      category,
      durationMinutes: Number(durationMinutes),
      completedAt: new Date().toISOString(),
      notes,
      exercises: cleanedExercises,
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

      <View style={{ marginTop: 20 }}>
        <Text style={styles.sectionTitle}>Exercises</Text>

        {exercises.map((exercise, exerciseIndex) => (
          <View key={exercise.id} style={styles.exerciseCard}>
            <View style={styles.exerciseHeader}>
              <Text style={styles.sectionTitle}>
                Exercise {exerciseIndex + 1}
              </Text>

              {exercises.length > 1 ? (
                <TouchableOpacity onPress={() => removeExercise(exercise.id)}>
                  <Text style={styles.removeText}>Remove exercise</Text>
                </TouchableOpacity>
              ) : null}
            </View>

            <TextInput
              style={styles.input}
              placeholder="Exercise name"
              placeholderTextColor={colors.textSecondary}
              value={exercise.name}
              onChangeText={(value) => updateExerciseName(exercise.id, value)}
            />

            {exercise.sets.map((set, setIndex) => (
              <View key={set.id} style={styles.setCard}>
                <View style={styles.exerciseHeader}>
                  <Text style={styles.setLabel}>Set {setIndex + 1}</Text>

                  {exercise.sets.length > 1 ? (
                    <TouchableOpacity
                      onPress={() => removeSetFromExercise(exercise.id, set.id)}
                    >
                      <Text style={styles.removeText}>Remove set</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>

                <TextInput
                  style={[styles.input, styles.setInput]}
                  placeholder="Reps"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="numeric"
                  value={set.reps?.toString() ?? ""}
                  onChangeText={(value) =>
                    updateSetField(exercise.id, set.id, "reps", value)
                  }
                />

                <TextInput
                  style={[styles.input, styles.setInput]}
                  placeholder="Kg"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="numeric"
                  value={set.weightKg?.toString() ?? ""}
                  onChangeText={(value) =>
                    updateSetField(exercise.id, set.id, "weightKg", value)
                  }
                />
              </View>
            ))}

            <TouchableOpacity onPress={() => addSetToExercise(exercise.id)}>
              <Text style={styles.linkText}>+ Add set</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity onPress={addExercise}>
          <Text style={styles.linkText}>+ Add exercise</Text>
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
  exerciseCard: {
    backgroundColor: "#10182b",
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  setCard: {
    marginTop: 12,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#16213e",
  },
  removeText: {
    color: "#ef4444",
    fontSize: 14,
  },
});
