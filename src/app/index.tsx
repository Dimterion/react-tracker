import HomeHeader from "@/components/HomeHeader";
import { globalStyles } from "@/styles/global";
import * as Device from "expo-device";
import { Link } from "expo-router";
import { Platform, ScrollView, StyleSheet, Text } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <HomeHeader />
      <Link href="/tracking">Tracking</Link>
      <Text style={styles.title}>Welcome.</Text>
      <Text style={{ backgroundColor: "red", marginTop: 30 }}>
        React Tracker: {Platform.OS}
      </Text>
      <Text>React Tracker: {Device.modelName}</Text>
      <Text>React Tracker: {Device.brand}</Text>
      <Text>React Tracker: {Device.osVersion}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
  },
});
