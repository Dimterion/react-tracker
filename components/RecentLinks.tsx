import { globalStyles } from "@/styles/global";
import { Text, View } from "react-native";
import LinkItem from "./LinkItem";

export default function RecentLinks() {
  return (
    <View style={{ marginTop: 30 }}>
      <Text style={globalStyles.sectionTitle}>Recent Links</Text>
      <LinkItem name="Link 1" link={0} />
      <LinkItem name="Link 2" link={0} />
      <LinkItem name="Link 3" link={0} />
    </View>
  );
}
