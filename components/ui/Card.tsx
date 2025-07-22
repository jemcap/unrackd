import React from "react";
import { View, ViewStyle } from "react-native";
import { Card as PaperCard } from "react-native-paper";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  style, 
  contentStyle,
  className = "bg-white"
}) => {
  return (
    <PaperCard className={className} style={style} contentStyle={contentStyle}>
      <PaperCard.Content>
        {children}
      </PaperCard.Content>
    </PaperCard>
  );
};

export const SimpleCard: React.FC<CardProps> = ({ 
  children, 
  style, 
  className = "bg-white p-5 rounded-lg shadow-sm"
}) => {
  return (
    <View className={className} style={style}>
      {children}
    </View>
  );
};