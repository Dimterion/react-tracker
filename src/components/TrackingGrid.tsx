import { Track } from "@/storage/tracks";
import { StyleSheet, View } from "react-native";
import TrackingCard from "./TrackingCard";

type TrackingGridProps = {
  tracks: Track[];
};

export default function TrackingGrid({ tracks }: TrackingGridProps) {
  const totals = tracks.reduce(
    (acc, track) => ({
      el1: acc.el1 + track.el1,
      el2: acc.el2 + track.el2,
      el3: acc.el3 + track.el3,
      el4: acc.el4 + track.el4,
    }),
    { el1: 0, el2: 0, el3: 0, el4: 0 },
  );

  return (
    <View style={styles.grid}>
      <TrackingCard
        label="El1"
        value={`${totals.el1}`}
        goal=""
        color="#ff6b6b"
      />
      <TrackingCard
        label="El2"
        value={`${totals.el2}`}
        goal=""
        color="#4ecdc4"
      />
      <TrackingCard
        label="El3"
        value={`${totals.el3}`}
        goal=""
        color="#ffd93d"
      />
      <TrackingCard
        label="El4"
        value={`${totals.el4}`}
        goal=""
        color="#6bcb77"
      />
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
