import { Text, View } from "react-native";
import { globalStyles } from "../../styles/global";

export default function ProgressScreen() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Progress</Text>
      <Text style={globalStyles.empty}>Progress charts and stats.</Text>
    </View>
  );
}
