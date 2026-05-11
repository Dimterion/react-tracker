import { useWorkoutForm } from "@/features/workouts/hooks/useWorkoutForm";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { Alert, ScrollView, Text } from "react-native";
import WorkoutForm from "../../features/workouts/components/WorkoutForm";
import { addWorkout } from "../../features/workouts/storage";
import { globalStyles } from "../../styles/global";

export default function NewWorkoutScreen() {
  const {
    title,
    setTitle,
    durationMinutes,
    setDurationMinutes,
    notes,
    setNotes,
    category,
    setCategory,
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
      <WorkoutForm
        title={title}
        onTitleChange={setTitle}
        durationMinutes={durationMinutes}
        onDurationChange={setDurationMinutes}
        category={category}
        onCategoryChange={setCategory}
        notes={notes}
        onNotesChange={setNotes}
        exercises={exercises}
        onAddExercise={addExercise}
        onRemoveExercise={removeExercise}
        onUpdateExerciseName={updateExerciseName}
        onAddSet={addSetToExercise}
        onUpdateSetField={updateSetField}
        onRemoveSet={removeSetFromExercise}
        onSubmit={handleSaveWorkout}
        submitLabel="Save Workout"
      />
    </ScrollView>
  );
}
