import { StyleSheet, Text, View } from "react-native";

type TrackingCardProps = {
  label: string;
  value: string;
  goal: string;
  color: string;
};

export default function TrackingCard({
  label,
  value,
  goal,
  color,
}: TrackingCardProps) {
  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.goal}>/ {goal}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fefae0",
    borderRadius: 12,
    padding: 16,
    width: "47%",
    borderLeftWidth: 4,
  },
  label: {
    fontSize: 14,
    color: "#0077b6",
  },
  value: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#03045e",
    marginTop: 4,
  },
  goal: {
    fontSize: 14,
    color: "#0077b6",
    marginTop: 2,
  },
});
