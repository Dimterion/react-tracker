import HomeHeader from "@/components/HomeHeader";
import { globalStyles } from "@/styles/global";
import * as Device from "expo-device";
import { Platform, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={globalStyles.container}>
      <HomeHeader />
      <Text style={styles.title}>Welcome.</Text>
      <Text style={{ backgroundColor: "red", marginTop: 30 }}>
        React Tracker: {Platform.OS}
      </Text>
      <Text>React Tracker: {Device.modelName}</Text>
      <Text>React Tracker: {Device.brand}</Text>
      <Text>React Tracker: {Device.osVersion}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
  },
});
