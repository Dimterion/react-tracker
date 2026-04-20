import { Track } from "@/storage/tracks";
import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { Share, TouchableOpacity } from "react-native";

type ShareButtonProps = {
  tracks: Track[];
};

export default function ShareButton({ tracks }: ShareButtonProps) {
  const handleShare = async () => {
    const totals = tracks.reduce(
      (acc, track) => ({
        el1: acc.el1 + track.el1,
        el2: acc.el2 + track.el2,
        el3: acc.el3 + track.el3,
        el4: acc.el4 + track.el4,
      }),
      { el1: 0, el2: 0, el3: 0, el4: 0 },
    );

    await Share.share({
      message: `Summary\n\nEl1: ${totals.el1}\nEl2: ${totals.el2}\nEl3: ${totals.el3}\nEl4: ${totals.el4}\n\nTracks: ${tracks.length} logged today`,
    });
  };

  return (
    <TouchableOpacity onPress={handleShare}>
      <Ionicons name="share-outline" size={24} color={colors.primary} />
    </TouchableOpacity>
  );
}
