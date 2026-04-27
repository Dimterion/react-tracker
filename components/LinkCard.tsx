import { StyleSheet, Text, View } from "react-native";

type LinkCardProps = {
  label: string;
  value: string;
  source: string;
  color: string;
};

export default function LinkCard({ label, value, source, color }: LinkCardProps) {
  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.source}>/ {source}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#16213e",
    borderRadius: 12,
    padding: 16,
    width: "47%",
    borderLeftWidth: 4,
  },
  label: {
    fontSize: 14,
    color: "#a0a0b0",
  },
  value: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 4,
  },
  source: {
    fontSize: 14,
    color: "#a0a0b0",
    marginTop: 2,
  },
});
