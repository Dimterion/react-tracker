import { WorkoutSession } from "@/features/workouts/storage/workouts";
import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { Share, TouchableOpacity } from "react-native";

type ShareButtonProps = {
  links: WorkoutSession[];
};

export default function ShareButton({ links }: ShareButtonProps) {
  const handleShare = async () => {
    const totals = links.reduce(
      (acc, link) => ({
        reglink: acc.reglink + link.reglink,
      }),
      { reglink: 0 },
    );

    await Share.share({
      message: `Summary\n\nLinks: ${totals.reglink} logged.`,
    });
  };

  return (
    <TouchableOpacity onPress={handleShare}>
      <Ionicons name="share-outline" size={24} color={colors.primary} />
    </TouchableOpacity>
  );
}
