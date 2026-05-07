import { useWorkoutForm } from "@/features/workouts/hooks/useWorkoutForm";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
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
import { colors, globalStyles } from "../../styles/global";

export default function NewWorkoutScreen() {
  const {
    title,
    setTitle,
    durationMinutes,
    setDurationMinutes,
    notes,
    setNotes,
    category,
    exercises,
    addExercise,
    removeExercise,
    updateExerciseName,
    addSetToExercise,
    updateSetField,
    removeSetFromExercise,
    getCleanedExercises,
  } = useWorkoutForm();

  const handleSaveWorkout = async () => {
    const parsedDuration = Number(durationMinutes);

    if (!title.trim() || !durationMinutes || Number.isNaN(parsedDuration)) {
      Alert.alert("Error", "Please enter a valid workout title and duration.");
      return;
    }

    const cleanedExercises = getCleanedExercises();

    if (cleanedExercises.length === 0) {
      Alert.alert(
        "Error",
        "Please add at least one valid exercise with at least one set.",
      );
      return;
    }

    await addWorkout({
      title: title.trim(),
      category,
      durationMinutes: parsedDuration,
      completedAt: new Date().toISOString(),
      notes: notes.trim(),
      exercises: cleanedExercises,
    });

    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert("Success", "Workout added successfully!");
    router.back();
  };

  return (
    <ScrollView
      style={globalStyles.container}
      contentContainerStyle={{ paddingBottom: 32 }}
    >
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
