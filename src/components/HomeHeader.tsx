import { colors, globalStyles } from "@/styles/global";
import { StyleSheet, Text, View } from "react-native";

export default function HomeHeader() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <View style={globalStyles.header}>
      <Text style={styles.date}>{currentDate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    fontSize: 14,
    color: colors.text,
    marginTop: 4,
    marginBottom: 30,
  },
});
