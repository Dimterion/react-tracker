import { Link } from "@/storage/links";
import { globalStyles } from "@/styles/global";
import { Text, View } from "react-native";
import LinkItem from "./LinkItem";

type RecentLinksProps = {
  links: Link[];
};

export default function RecentLinks({ links }: RecentLinksProps) {
  return (
    <View style={{ marginTop: 30 }}>
      <Text style={globalStyles.sectionTitle}>Recent Links</Text>
      {links.length === 0 ? (
        <Text style={globalStyles.empty}>No links logged yet.</Text>
      ) : (
        links
          .slice(0, 5)
          .map((link) => (
            <LinkItem key={link.id} name={link.name} link={link.reglink} />
          ))
      )}
    </View>
  );
}
