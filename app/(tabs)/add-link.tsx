import { addLink } from "@/storage/links";
import { colors, globalStyles } from "@/styles/global";
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

export default function AddLinkScreen() {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleAddLink = async () => {
    if (!name || !link) {
      Alert.alert("Error", "Please enter a link.");
      return;
    }

    await addLink({
      name,
      link: Number(link),
    });

    setName("");
    setLink("");

    Alert.alert("Success", "Link added successfully!");

    router.push("/");
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Add Link</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleAddLink}>
        <Text style={styles.buttonText}>Add Link</Text>
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
