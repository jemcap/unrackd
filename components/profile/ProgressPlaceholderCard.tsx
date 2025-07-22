import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { SimpleCard } from "../ui/Card";

export const ProgressPlaceholderCard: React.FC = () => {
  return (
    <SimpleCard style={{ padding: 20 }}>
      <Text variant="titleMedium" className="font-bold mb-4">
        Progress Over Time
      </Text>
      <View className="h-40 bg-gray-100 rounded-lg items-center justify-center">
        <Text variant="bodyMedium" className="text-gray-500 text-center">
          📊 Progress charts coming soon!
        </Text>
      </View>
    </SimpleCard>
  );
};