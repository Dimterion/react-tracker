import { Track } from "@/storage/tracks";
import { globalStyles } from "@/styles/global";
import { Text, View } from "react-native";
import TrackingItem from "./TrackingItem";

type RecentTrackingsProps = {
  tracks: Track[];
  onDelete: () => void;
};

export default function RecentTrackings({
  tracks,
  onDelete,
}: RecentTrackingsProps) {
  return (
    <View style={{ marginTop: 30 }}>
      <Text style={globalStyles.sectionTitle}>Recent Trackings</Text>
      {tracks.length === 0 ? (
        <Text style={globalStyles.empty}>No tracks logged yet.</Text>
      ) : (
        tracks
          .slice(0, 5)
          .map((track) => (
            <TrackingItem
              key={track.id}
              id={track.id}
              name={track.name}
              el1={track.el1}
              el2={track.el2}
              el3={track.el3}
              el4={track.el4}
              onDelete={onDelete}
            />
          ))
      )}
    </View>
  );
}
