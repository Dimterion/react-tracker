import * as Device from "expo-device";
import { Platform, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={{ backgroundColor: "red" }}>
      <Text>Welcome.</Text>
      <Text>React Tracker: {Platform.OS}</Text>
      <Text>React Tracker: {Device.modelName}</Text>
      <Text>React Tracker: {Device.brand}</Text>
      <Text>React Tracker: {Device.osVersion}</Text>
    </View>
  );
}
