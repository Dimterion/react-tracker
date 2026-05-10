import { router, useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import WorkoutListItem from "../../features/workouts/components/WorkoutListItem";
import { clearAllWorkouts, getWorkouts } from "../../features/workouts/storage";
import { WorkoutCategory, WorkoutSession } from "../../features/workouts/types";
import { colors, globalStyles } from "../../styles/global";

type FilterOption = "all" | WorkoutCategory;

const FILTER_OPTIONS: FilterOption[] = [
  "all",
  "strength",
  "cardio",
  "mobility",
];

export default function WorkoutsScreen() {
  const [workouts, setWorkouts] = useState<WorkoutSession[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>("all");

  const loadWorkouts = async () => {
    const data = await getWorkouts();
    setWorkouts(data);
  };

  const handleClearAll = () => {
    Alert.alert(
      "Clear all workouts",
      "This will permanently remove all logged workouts.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear All",
          style: "destructive",
          onPress: async () => {
            await clearAllWorkouts();
            loadWorkouts();
          },
        },
      ],
      { cancelable: true },
    );
  };

  useFocusEffect(
    useCallback(() => {
      loadWorkouts();
    }, []),
  );

  const filteredWorkouts = useMemo(() => {
    if (selectedFilter === "all") {
      return workouts;
    }

    return workouts.filter((workout) => workout.category === selectedFilter);
  }, [workouts, selectedFilter]);

  const hasWorkouts = workouts.length > 0;
  const isFilteredEmpty = hasWorkouts && filteredWorkouts.length === 0;

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>Workout History</Text>

        <TouchableOpacity onPress={() => router.push("/workouts/new")}>
          <Text style={styles.addText}>Add New</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filtersRow}>
        {FILTER_OPTIONS.map((option) => {
          const isSelected = selectedFilter === option;

          return (
            <TouchableOpacity
              key={option}
              style={[
                styles.filterChip,
                isSelected && styles.filterChipSelected,
              ]}
              onPress={() => setSelectedFilter(option)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  isSelected && styles.filterChipTextSelected,
                ]}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <FlatList
        data={filteredWorkouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <WorkoutListItem workout={item} onDelete={loadWorkouts} />
        )}
        ListEmptyComponent={
          isFilteredEmpty ? (
            <View style={styles.emptyState}>
              <Text style={globalStyles.empty}>
                No workouts found for the selected category.
              </Text>
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={globalStyles.empty}>No workouts logged yet.</Text>
              <TouchableOpacity
                style={styles.emptyButton}
                onPress={() => router.push("/workouts/new")}
              >
                <Text style={styles.emptyButtonText}>
                  Add your first workout
                </Text>
              </TouchableOpacity>
            </View>
          )
        }
        contentContainerStyle={{
          paddingTop: 24,
          paddingBottom: 24,
          flexGrow: 1,
        }}
        extraData={selectedFilter}
      />

      {hasWorkouts ? (
        <TouchableOpacity onPress={handleClearAll} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  addText: {
    color: colors.primary,
    fontSize: 16,
  },
  filtersRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 16,
    marginBottom: 8,
  },
  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.surface,
  },
  filterChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: "600",
  },
  filterChipTextSelected: {
    color: colors.background,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    gap: 16,
  },
  emptyButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  emptyButtonText: {
    color: colors.background,
    fontSize: 15,
    fontWeight: "600",
  },
  clearButton: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
  clearButtonText: {
    color: "#ef4444",
    fontSize: 16,
  },
});
