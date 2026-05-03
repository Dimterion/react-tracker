import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { addWorkout } from "../../features/workouts/storage";
import { WorkoutCategory } from "../../features/workouts/types";
import { colors, globalStyles } from "../../styles/global";

export default function NewWorkoutScreen() {
  const [title, setTitle] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");
  const [notes, setNotes] = useState("");
  const [category] = useState<WorkoutCategory>("strength");

  const handleAddWorkout = async () => {
    if (!title || !durationMinutes) {
      Alert.alert("Error", "Please enter a workout title and duration.");
      return;
    }

    await addWorkout({
      title,
      category,
      durationMinutes: Number(durationMinutes),
      completedAt: new Date().toISOString(),
      notes,
    });

    setTitle("");
    setDurationMinutes("");
    setNotes("");

    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    Alert.alert("Success", "Workout added successfully!");
    router.back();
  };

  return (
    <View style={globalStyles.container}>
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
        style={[styles.input, styles.notesInput]}
        placeholder="Notes"
        placeholderTextColor={colors.textSecondary}
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleAddWorkout}>
        <Text style={styles.buttonText}>Save Workout</Text>
      </TouchableOpacity>
    </View>
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
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: "bold",
  },
});
