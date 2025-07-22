import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

interface UpcomingMeet {
  id: number;
  name: string;
  date: string;
  location: string;
  federation: string;
  daysUntil: number;
}

interface NextMeetCardProps {
  meet: UpcomingMeet;
  onViewDetails?: () => void;
}

export const NextMeetCard: React.FC<NextMeetCardProps> = ({
  meet,
  onViewDetails,
}) => {
  return (
    <View
      className="bg-gradient-to-r from-[#20226F] to-[#4a4db5] p-5 rounded-lg"
      style={{ backgroundColor: "#20226F" }}
    >
      <Text
        variant="titleMedium"
        className="font-bold mb-2"
        style={{ color: "#fff" }}
      >
        Next Meet
      </Text>
      <Text
        variant="headlineSmall"
        className="font-bold mb-1"
        style={{ color: "#fff" }}
      >
        {meet.name}
      </Text>
      <Text className="mb-3" style={{ color: "#fff" }}>
        {meet.date} • {meet.location}
      </Text>
      <View className="flex-row justify-between items-center">
        <View className="px-3 py-1 rounded-full bg-slate-500">
          <Text className="font-semibold p-2 rounded-full" style={{ color: "#fff" }}>
            {meet.daysUntil} days to go
          </Text>
        </View>
        {onViewDetails && (
          <Button
            mode="outlined"
            textColor="white"
            style={{ borderColor: "white" }}
            onPress={onViewDetails}
          >
            Details
          </Button>
        )}
      </View>
    </View>
  );
};