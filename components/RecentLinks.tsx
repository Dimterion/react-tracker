import { WorkoutSession } from "@/features/workouts/storage/workouts";
import { globalStyles } from "@/styles/global";
import { Text, View } from "react-native";
import LinkItem from "./LinkItem";

type RecentLinksProps = {
  links: WorkoutSession[];
  onDelete: () => void;
};

export default function RecentLinks({ links, onDelete }: RecentLinksProps) {
  return (
    <View style={{ marginTop: 30 }}>
      <Text style={globalStyles.sectionTitle}>Recent Workouts</Text>
      {links.length === 0 ? (
        <Text style={globalStyles.empty}>No workouts logged yet.</Text>
      ) : (
        links
          .slice(0, 5)
          .map((link) => (
            <LinkItem
              key={link.id}
              id={link.id}
              name={link.name}
              link={link.reglink}
              onDelete={onDelete}
            />
          ))
      )}
    </View>
  );
}
