import { globalStyles } from "@/styles/global";
import { Text, View } from "react-native";
import TrackingItem from "./TrackingItem";

export default function RecentTrackings() {
  return (
    <View style={{ marginTop: 30 }}>
      <Text style={globalStyles.sectionTitle}>Recent Trackings</Text>
      <TrackingItem name="El1" el1={540} el2={45} el3={50} el4={12} />
      <TrackingItem name="El2" el1={280} el2={30} el3={20} el4={8} />
      <TrackingItem name="El3" el1={430} el2={35} el3={10} el4={25} />
    </View>
  );
}
