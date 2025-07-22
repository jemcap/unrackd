import React from "react";
import { View, ViewStyle } from "react-native";
import { Text } from "react-native-paper";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  style?: ViewStyle;
  variant?: "primary" | "secondary" | "success" | "warning" | "error";
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  className,
  style,
  variant = "primary"
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-[#e8eaf6]";
      case "secondary":
        return "bg-gray-200";
      case "success":
        return "bg-green-100";
      case "warning":
        return "bg-yellow-100";
      case "error":
        return "bg-red-100";
      default:
        return "bg-[#e8eaf6]";
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case "primary":
        return "#20226F";
      case "secondary":
        return "#666";
      case "success":
        return "#059669";
      case "warning":
        return "#d97706";
      case "error":
        return "#dc2626";
      default:
        return "#20226F";
    }
  };

  return (
    <View 
      className={`px-2 py-1 rounded ${getVariantStyles()} ${className || ""}`}
      style={style}
    >
      <Text className="font-semibold text-xs" style={{ color: getTextColor() }}>
        {children}
      </Text>
    </View>
  );
};