import { newWorkout } from "@/storage/links";
import { colors, globalStyles } from "@/styles/global";
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

export default function NewWorkoutScreen() {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleNewWorkout = async () => {
    if (!name || !link) {
      Alert.alert("Error", "Please enter a link.");
      return;
    }

    await newWorkout({
      name,
      reglink: Number(link),
    });

    setName("");
    setLink("");

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    Alert.alert("Success", "Link added successfully!");

    router.push("/");
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>New Workout</Text>

      <TextInput
        style={styles.input}
        placeholder="Link name"
        placeholderTextColor={colors.textSecondary}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Link"
        placeholderTextColor={colors.textSecondary}
        keyboardType="numeric"
        value={link}
        onChangeText={setLink}
      />

      <TouchableOpacity style={styles.button} onPress={handleNewWorkout}>
        <Text style={styles.buttonText}>New Workout</Text>
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
  row: {
    flexDirection: "row",
    gap: 10,
  },
  rowInput: {
    flex: 1,
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
