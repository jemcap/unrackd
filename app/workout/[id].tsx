import { Workout } from "@/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, Divider, IconButton, List, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { formatDate } from "@/utils/format";
import { recentWorkouts } from "../(tabs)/profile";

const WorkoutDetail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [workout, setWorkout] = useState<Workout | null>(null);

  useEffect(() => {
    const foundWorkout = recentWorkouts.find(
      (w) => w.id === parseInt(id as string)
    );
    setWorkout(foundWorkout || null);
  }, [id]);

  if (!workout) {
    return (
      <ScrollView
        className="flex-1 bg-white"
        style={{ paddingTop: insets.top }}
      >
        <View className="p-5">
          <View className="flex-row items-center mb-5">
            <IconButton
              icon="arrow-left"
              size={24}
              onPress={() => router.back()}
            />
            <Text variant="headlineSmall" className="font-bold ml-2">
              Workout Not Found
            </Text>
          </View>
          <Text variant="bodyLarge" className="text-center text-gray-600">
            The requested workout could not be found.
          </Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <View className="p-5">
        {/* Header with Back Button */}
        <View className="flex-row items-center mb-5">
          <IconButton
            icon="arrow-left"
            size={24}
            onPress={() => router.back()}
          />
          <View className="flex-1 ml-2">
            <Text variant="headlineSmall" className="font-bold">
              {workout.type}
            </Text>
            <Text variant="bodyMedium" className="text-gray-600">
              {formatDate(workout.date)}
            </Text>
          </View>
        </View>
        <View>
          <View className="p-4">
            <Text variant="titleLarge" className="font-bold mb-4">
              Exercises
            </Text>
            {workout.exercises.map((exercise, index) => (
              <View key={index}>
                <List.Item
                  title={exercise.name}
                  description={`${exercise.sets} x ${exercise.reps} ${exercise.weight > 0 ? ` @ ${exercise.weight}kg` : ""}`}
                  right={() => (
                    <View className="items-end justify-center">
                      {exercise.weight > 0 && (
                        <Text
                          variant="bodyLarge"
                          className="font-bold text-[#20226F]"
                        >
                          {exercise.weight}kg
                        </Text>
                      )}
                    </View>
                  )}
                />
                {index < workout.exercises.length - 1 && <Divider />}
              </View>
            ))}
          </View>
        </View>
        <View className="flex-row gap-4 mt-6">
          <Button
            mode="contained"
            className="flex-1 rounded-lg"
            contentStyle={{ paddingVertical: 2 }}
            style={{ backgroundColor: "#20226F", elevation: 2 }}
            onPress={() => console.log("Edit Workout")}
          >
            Edit Workout
          </Button>
          <Button
            mode="outlined"
            className="flex-1 rounded-lg"
            contentStyle={{ paddingVertical: 2 }}
            style={{ borderColor: "#FF3B30", borderWidth: 2, elevation: 2 }}
            textColor="#FF3B30"
            onPress={() => console.log("Delete Workout")}
          >
            Delete
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default WorkoutDetail;
