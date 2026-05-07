import { useWorkoutForm } from "@/features/workouts/hooks/useWorkoutForm";
import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import WorkoutForm from "../../../features/workouts/components/WorkoutForm";
import {
  getWorkoutById,
  updateWorkout,
} from "../../../features/workouts/storage";
import { globalStyles } from "../../../styles/global";

export default function EditWorkoutScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [loading, setLoading] = useState(true);

  const {
    title,
    setTitle,
    durationMinutes,
    setDurationMinutes,
    notes,
    setNotes,
    category,
    completedAt,
    exercises,
    initializeForm,
    addExercise,
    removeExercise,
    updateExerciseName,
    addSetToExercise,
    updateSetField,
    removeSetFromExercise,
    getCleanedExercises,
  } = useWorkoutForm();

  useEffect(() => {
    const loadWorkout = async () => {
      if (!id) return;

      const workout = await getWorkoutById(id);

      if (!workout) {
        Alert.alert("Error", "Workout not found.");
        router.back();
        return;
      }

      initializeForm(workout);
      setLoading(false);
    };

    loadWorkout();
  }, [id, initializeForm]);

  const handleUpdateWorkout = async () => {
    if (!id) {
      Alert.alert("Error", "Workout ID is missing.");
      return;
    }

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

    await updateWorkout({
      id,
      title: title.trim(),
      category,
      durationMinutes: parsedDuration,
      completedAt,
      notes: notes.trim(),
      exercises: cleanedExercises,
    });

    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert("Success", "Workout updated successfully!");
    router.back();
  };

  if (loading) {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.title}>Loading workout...</Text>
      </View>
    );
  }

  return (
    <>
      <Text style={globalStyles.title}>Edit Workout</Text>
      <WorkoutForm
        title={title}
        onTitleChange={setTitle}
        durationMinutes={durationMinutes}
        onDurationChange={setDurationMinutes}
        notes={notes}
        onNotesChange={setNotes}
        exercises={exercises}
        onAddExercise={addExercise}
        onRemoveExercise={removeExercise}
        onUpdateExerciseName={updateExerciseName}
        onAddSet={addSetToExercise}
        onUpdateSetField={updateSetField}
        onRemoveSet={removeSetFromExercise}
        onSubmit={handleUpdateWorkout}
        submitLabel="Update Workout"
      />
    </>
  );
}
