import { colors, globalStyles } from "@/styles/global";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddTrackerScreen() {
  const [name, setName] = useState("");
  const [el1, setEl1] = useState("");
  const [el2, setEl2] = useState("");
  const [el3, setEl3] = useState("");
  const [el4, setEl4] = useState("");

  const handleAddTracker = () => {
    console.log({ name, el1, el2, el3, el4 });
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Add Tracker</Text>

      <TextInput
        style={styles.input}
        placeholder="Tracker name"
        placeholderTextColor={colors.textSecondary}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="El1"
        placeholderTextColor={colors.textSecondary}
        keyboardType="numeric"
        value={el1}
        onChangeText={setEl1}
      />

      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder="El2"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          value={el2}
          onChangeText={setEl2}
        />
        <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder="El3"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          value={el3}
          onChangeText={setEl3}
        />
        <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder="El4"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          value={el4}
          onChangeText={setEl4}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAddTracker}>
        <Text style={styles.buttonText}>Add Tracker</Text>
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
