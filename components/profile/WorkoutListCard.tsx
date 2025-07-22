import React from "react";
import { View } from "react-native";
import { Button, Divider, IconButton, List, Text } from "react-native-paper";
import { SimpleCard } from "../ui/Card";

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

interface Workout {
  id: number;
  type: string;
  date: string;
  exercises: Exercise[];
  duration: number;
}

interface WorkoutListCardProps {
  workouts: Workout[];
  title?: string;
  maxItems?: number;
  onViewAll?: () => void;
  onWorkoutPress?: (workoutId: number) => void;
}

export const WorkoutListCard: React.FC<WorkoutListCardProps> = ({
  workouts,
  title = "Recent Workouts",
  maxItems = 3,
  onViewAll,
  onWorkoutPress,
}) => {
  const displayedWorkouts = workouts.slice(0, maxItems);

  return (
    <SimpleCard>
      <View className="pb-2">
        <View className="flex-row justify-between items-center mb-3">
          <Text variant="titleMedium" className="font-bold">
            {title}
          </Text>
          {onViewAll && (
            <Button mode="text" textColor="#20226F" onPress={onViewAll}>
              View All
            </Button>
          )}
        </View>
      </View>

      {displayedWorkouts.map((workout, index) => (
        <View key={workout.id}>
          <List.Item
            title={workout.type}
            titleStyle={{ fontWeight: "600" }}
            description={`${workout.date} • ${workout.duration} min • ${workout.exercises.length} exercises`}
            descriptionStyle={{ color: "#666" }}
            right={() => <IconButton icon="chevron-right" iconColor="#ccc" />}
            onPress={() => onWorkoutPress?.(workout.id)}
            style={{ paddingHorizontal: 16 }}
          />
          {index < displayedWorkouts.length - 1 && (
            <Divider style={{ marginLeft: 72 }} />
          )}
        </View>
      ))}
    </SimpleCard>
  );
};