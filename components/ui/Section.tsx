import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
}

export const Section: React.FC<SectionProps> = ({
  title,
  children,
  className = "px-6 py-4",
  titleClassName = "font-bold mb-3"
}) => {
  return (
    <View className={className}>
      <Text variant="titleMedium" className={titleClassName}>
        {title}
      </Text>
      {children}
    </View>
  );
};