import React from "react";
import { View } from "react-native";
import { Divider, IconButton, List, Text } from "react-native-paper";
import { SimpleCard } from "../ui/Card";

interface Meet {
  id: number;
  name: string;
  date: string;
  location: string;
  weightCategory: string;
  placing: string;
  total: number;
}

interface MeetHistoryCardProps {
  meets: Meet[];
  totalMeets: number;
  onMeetPress?: (meetId: number) => void;
}

export const MeetHistoryCard: React.FC<MeetHistoryCardProps> = ({
  meets,
  totalMeets,
  onMeetPress,
}) => {
  return (
    <SimpleCard>
      <View className="pb-2">
        <Text variant="titleMedium" className="font-bold mb-3">
          Meet History ({totalMeets})
        </Text>
      </View>

      {meets.map((meet, index) => (
        <View key={meet.id}>
          <List.Item
            title={meet.name}
            titleStyle={{ fontWeight: "600" }}
            description={`${meet.date} • ${meet.weightCategory} • ${meet.placing} place`}
            right={() => (
              <View className="items-end">
                <Text variant="titleSmall" className="font-bold text-[#20226F]">
                  {meet.total}kg
                </Text>
                <IconButton icon="chevron-right" iconColor="#ccc" size={16} />
              </View>
            )}
            onPress={() => onMeetPress?.(meet.id)}
          
          />
          {index < meets.length - 1 && (
            <Divider />
          )}
        </View>
      ))}
    </SimpleCard>
  );
};