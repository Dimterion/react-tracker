import { StyleSheet, View } from "react-native";
import LinkCard from "./LinkCard";

export default function LinkGrid() {
  return (
    <View style={styles.grid}>
      <LinkCard label="" value="0" source="0" color="#ff6b6b" />
      <LinkCard label="" value="0" source="0" color="#4ecdc4" />
      <LinkCard label="" value="0" source="0" color="#ffd93d" />
      <LinkCard label="" value="0" source="0" color="#6bcb77" />
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
});
