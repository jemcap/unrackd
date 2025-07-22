import React from "react";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { SimpleCard } from "../ui/Card";

interface PersonalBests {
  squat: number;
  bench: number;
  deadlift: number;
}

interface PersonalBestsCardProps {
  personalBests: PersonalBests;
  onEdit?: () => void;
}

export const PersonalBestsCard: React.FC<PersonalBestsCardProps> = ({
  personalBests,
  onEdit,
}) => {
  const total = personalBests.squat + personalBests.bench + personalBests.deadlift;

  return (
    <SimpleCard style={{ padding: 20 }}>
      <View className="flex-row justify-between items-center mb-4">
        <Text variant="titleMedium" className="font-bold">
          Personal Bests
        </Text>
        {onEdit && (
          <IconButton
            icon="pencil"
            size={20}
            iconColor="#20226F"
            onPress={onEdit}
          />
        )}
      </View>
      
      <View className="flex-row justify-around">
        <View className="items-center">
          <Text variant="titleSmall" className="text-gray-600 mb-1">
            SQUAT
          </Text>
          <Text variant="headlineSmall" className="font-bold text-[#20226F]">
            {personalBests.squat}kg
          </Text>
        </View>
        <View className="items-center">
          <Text variant="titleSmall" className="text-gray-600 mb-1">
            BENCH
          </Text>
          <Text variant="headlineSmall" className="font-bold text-[#20226F]">
            {personalBests.bench}kg
          </Text>
        </View>
        <View className="items-center">
          <Text variant="titleSmall" className="text-gray-600 mb-1">
            DEADLIFT
          </Text>
          <Text variant="headlineSmall" className="font-bold text-[#20226F]">
            {personalBests.deadlift}kg
          </Text>
        </View>
      </View>
      
      <View className="mt-4 pt-4 border-t border-gray-200">
        <View className="items-center">
          <Text variant="titleSmall" className="text-gray-600 mb-1">
            TOTAL
          </Text>
          <Text variant="headlineMedium" className="font-bold text-[#20226F]">
            {total}kg
          </Text>
        </View>
      </View>
    </SimpleCard>
  );
};