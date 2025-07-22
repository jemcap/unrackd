import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { SimpleCard } from "../ui/Card";

interface PowerliftingStats {
  yearsOfExperience: number;
  meetsCompleted: number;
}

interface ExperienceStatsCardProps {
  stats: PowerliftingStats;
}

export const ExperienceStatsCard: React.FC<ExperienceStatsCardProps> = ({
  stats,
}) => {
  return (
    <SimpleCard style={{ padding: 20 }}>
      <Text variant="titleMedium" className="font-bold mb-4">
        Experience
      </Text>
      <View className="flex-row justify-around">
        <View className="items-center">
          <Text variant="headlineLarge" className="font-bold text-[#20226F] mb-1">
            {stats.yearsOfExperience}
          </Text>
          <Text variant="bodyMedium" className="text-gray-600">
            Years Training
          </Text>
        </View>
        <View className="items-center">
          <Text variant="headlineLarge" className="font-bold text-[#20226F] mb-1">
            {stats.meetsCompleted}
          </Text>
          <Text variant="bodyMedium" className="text-gray-600">
            Meets Completed
          </Text>
        </View>
      </View>
    </SimpleCard>
  );
};