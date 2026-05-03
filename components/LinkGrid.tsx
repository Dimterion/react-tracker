/* TO-DO: refactor or delete later */
import { WorkoutSession } from "@/features/workouts/storage/workouts";
import { StyleSheet, View } from "react-native";
import LinkCard from "./LinkCard";

type LinkGridProps = {
  links: WorkoutSession[];
};

export default function LinkGrid({ links }: LinkGridProps) {
  const totals = links.reduce(
    (acc, link) => ({
      reglink: acc.reglink + link.reglink,
    }),
    { reglink: 0 },
  );

  return (
    <View style={styles.grid}>
      <LinkCard
        label=""
        value={`${totals.reglink}`}
        source="0"
        color="#ff6b6b"
      />
      <LinkCard
        label=""
        value={`${totals.reglink}`}
        source="0"
        color="#4ecdc4"
      />
      <LinkCard
        label=""
        value={`${totals.reglink}`}
        source="0"
        color="#ffd93d"
      />
      <LinkCard
        label=""
        value={`${totals.reglink}`}
        source="0"
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
