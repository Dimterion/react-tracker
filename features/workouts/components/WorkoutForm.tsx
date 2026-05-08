import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../../styles/global";
import { ExerciseEntry } from "../types";

type WorkoutFormProps = {
  title: string;
  onTitleChange: (value: string) => void;
  durationMinutes: string;
  onDurationChange: (value: string) => void;
  notes: string;
  onNotesChange: (value: string) => void;
  exercises: ExerciseEntry[];
  onAddExercise: () => void;
  onRemoveExercise: (exerciseId: string) => void;
  onUpdateExerciseName: (exerciseId: string, value: string) => void;
  onAddSet: (exerciseId: string) => void;
  onUpdateSetField: (
    exerciseId: string,
    setId: string,
    field: "reps" | "weightKg",
    value: string,
  ) => void;
  onRemoveSet: (exerciseId: string, setId: string) => void;
  onSubmit: () => void;
  submitLabel: string;
};

export default function WorkoutForm({
  title,
  onTitleChange,
  durationMinutes,
  onDurationChange,
  notes,
  onNotesChange,
  exercises,
  onAddExercise,
  onRemoveExercise,
  onUpdateExerciseName,
  onAddSet,
  onUpdateSetField,
  onRemoveSet,
  onSubmit,
  submitLabel,
}: WorkoutFormProps) {
  return (
    <>
      <TextInput
        style={styles.input}
        placeholder="Workout title"
        placeholderTextColor={colors.textSecondary}
        value={title}
        onChangeText={onTitleChange}
      />

      <TextInput
        style={styles.input}
        placeholder="Duration in minutes"
        placeholderTextColor={colors.textSecondary}
        keyboardType="numeric"
        value={durationMinutes}
        onChangeText={onDurationChange}
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
                <TouchableOpacity onPress={() => onRemoveExercise(exercise.id)}>
                  <Text style={styles.removeText}>Remove exercise</Text>
                </TouchableOpacity>
              ) : null}
            </View>

            <TextInput
              style={styles.input}
              placeholder="Exercise name"
              placeholderTextColor={colors.textSecondary}
              value={exercise.name}
              onChangeText={(value) => onUpdateExerciseName(exercise.id, value)}
            />

            {exercise.sets.map((set, setIndex) => (
              <View key={set.id} style={styles.setCard}>
                <View style={styles.exerciseHeader}>
                  <Text style={styles.setLabel}>Set {setIndex + 1}</Text>

                  {exercise.sets.length > 1 ? (
                    <TouchableOpacity
                      onPress={() => onRemoveSet(exercise.id, set.id)}
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
                    onUpdateSetField(exercise.id, set.id, "reps", value)
                  }
                />

                <TextInput
                  style={[styles.input, styles.setInput]}
                  placeholder="Kg"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="numeric"
                  value={set.weightKg?.toString() ?? ""}
                  onChangeText={(value) =>
                    onUpdateSetField(exercise.id, set.id, "weightKg", value)
                  }
                />
              </View>
            ))}

            <TouchableOpacity onPress={() => onAddSet(exercise.id)}>
              <Text style={styles.linkText}>+ Add set</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity onPress={onAddExercise}>
          <Text style={styles.linkText}>+ Add exercise</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={[styles.input, styles.notesInput]}
        placeholder="Notes"
        placeholderTextColor={colors.textSecondary}
        value={notes}
        onChangeText={onNotesChange}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>{submitLabel}</Text>
      </TouchableOpacity>
    </>
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
