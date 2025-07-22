import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  children,
}) => {
  return (
    <View className="px-6 py-4">
      <View>
        <View className="pb-2 px-4">
          <Text variant="titleMedium" className="font-bold mb-3">
            {title}
          </Text>
        </View>
        {children}
      </View>
    </View>
  );
};