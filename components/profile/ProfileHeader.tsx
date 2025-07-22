import React from "react";
import { View, Pressable } from "react-native";
import { Avatar, Button, IconButton, SegmentedButtons, Surface, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { Badge } from "../ui/Badge";
import { formatFollowers } from "@/utils/format";

interface ProfileHeaderProps {
  user: {
    name?: string;
    email?: string;
  } | null;
  powerliftingStats: {
    weightClass: string;
    ageCategory: string;
  };
  personalStats: {
    workouts: number;
    followers: number;
    following: number;
  };
  activeTab: string;
  onTabChange: (value: string) => void;
  onEditProfile: () => void;
  onShareProfile: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  powerliftingStats,
  personalStats,
  activeTab,
  onTabChange,
  onEditProfile,
  onShareProfile,
}) => {
  const router = useRouter();

  const getInitials = (name: string) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return name ? name.slice(0, 2).toUpperCase() : "U";
  };

  return (
    <Surface elevation={1}>
      <View className="px-6 py-6">
        {/* Header with Settings Icon */}
        <View className="flex-row justify-between items-center mb-4">
          <Text variant="headlineSmall" className="font-bold">
            Profile
          </Text>
          <IconButton
            icon="cog"
            size={24}
            iconColor="#20226F"
            onPress={() => router.push("/settings" as any)}
          />
        </View>
        
        {/* Profile Header */}
        <View className="flex-row items-center mb-6">
          <View className="relative">
            <Avatar.Text
              size={88}
              label={getInitials(user?.name || "")}
              style={{ backgroundColor: "#20226F" }}
            />
          </View>

          <View className="flex-1 ml-4">
            <Text variant="headlineMedium" className="font-bold mb-1">
              {user?.name || "User"}
            </Text>
            <View className="flex-row items-center gap-2">
              <Badge variant="primary">
                {powerliftingStats.weightClass} • {powerliftingStats.ageCategory}
              </Badge>
            </View>

            {/* Stats Row */}
            <View className="flex-row gap-6 mt-3">
              <Pressable className="items-center">
                <Text variant="titleMedium" className="font-bold text-[#20226F]">
                  {personalStats.workouts}
                </Text>
                <Text variant="bodySmall" className="text-gray-600">
                  Workouts
                </Text>
              </Pressable>
              <Pressable className="items-center">
                <Text variant="titleMedium" className="font-bold text-[#20226F]">
                  {formatFollowers(personalStats.followers)}
                </Text>
                <Text variant="bodySmall" className="text-gray-600">
                  Followers
                </Text>
              </Pressable>
              <Pressable className="items-center">
                <Text variant="titleMedium" className="font-bold text-[#20226F]">
                  {formatFollowers(personalStats.following)}
                </Text>
                <Text variant="bodySmall" className="text-gray-600">
                  Following
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row gap-3">
          <Button
            mode="outlined"
            className="flex-1"
            style={{ borderColor: "#20226F", borderRadius: 12 }}
            contentStyle={{ paddingVertical: 0 }}
            textColor="#20226F"
            labelStyle={{ fontSize: 12 }}
            onPress={onEditProfile}
          >
            Edit Profile
          </Button>
          <Button
            mode="contained"
            className="flex-1"
            style={{ backgroundColor: "#20226F", borderRadius: 12 }}
            contentStyle={{ paddingVertical: 0 }}
            labelStyle={{ fontSize: 12 }}
            onPress={onShareProfile}
          >
            Share
          </Button>
        </View>

        {/* Tab Navigation */}
        <View className="mt-6">
          <SegmentedButtons
            value={activeTab}
            onValueChange={onTabChange}
            buttons={[
              { value: "overview", label: "Overview" },
              { value: "stats", label: "Stats" },
              { value: "history", label: "History" },
            ]}
            style={{ marginTop: 8 }}
          />
        </View>
      </View>
    </Surface>
  );
};