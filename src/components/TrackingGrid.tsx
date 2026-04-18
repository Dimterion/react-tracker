import { StyleSheet, View } from "react-native";
import TrackingCard from "./TrackingCard";

export default function TrackingGrid() {
  return (
    <View style={styles.grid}>
      <TrackingCard label="" value="0" goal="" color="#ff6b6b" />
      <TrackingCard label="" value="0" goal="" color="#4ecdc4" />
      <TrackingCard label="" value="0" goal="" color="#ffd93d" />
      <TrackingCard label="" value="0" goal="" color="#6bcb77" />
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
