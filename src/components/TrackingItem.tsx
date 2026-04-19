import { StyleSheet, Text, View } from "react-native";

type TrackingItemProps = {
  name: string;
  el1: number;
  el2: number;
  el3: number;
  el4: number;
};

export default function TrackingItem({
  name,
  el1,
  el2,
  el3,
  el4,
}: TrackingItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.elements}>
        {el1} • {el2} • {el3} • {el4}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fefae0",
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#03045e",
  },
  elements: {
    fontSize: 13,
    color: "#0077b6",
    marginTop: 4,
  },
});
