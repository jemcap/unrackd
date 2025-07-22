import React from "react";
import { Divider, IconButton, List, Switch } from "react-native-paper";

interface SettingsItemProps {
  icon: string;
  title: string;
  description?: string;
  value?: string;
  type?: "navigate" | "switch" | "info";
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  onPress?: () => void;
  showDivider?: boolean;
}

export const SettingsItem: React.FC<SettingsItemProps> = ({
  icon,
  title,
  description,
  value,
  type = "navigate",
  switchValue,
  onSwitchChange,
  onPress,
  showDivider = true,
}) => {
  const renderRight = () => {
    switch (type) {
      case "switch":
        return (
          <Switch
            value={switchValue}
            onValueChange={onSwitchChange}
            color="#20226F"
          />
        );
      case "info":
        return null;
      default:
        return <IconButton icon="chevron-right" iconColor="#ccc" />;
    }
  };

  const getDescription = () => {
    if (value) return `${description} • ${value}`;
    return description;
  };

  return (
    <>
      <List.Item
        title={title}
        description={getDescription()}
        left={() => <List.Icon icon={icon} color="#20226F" />}
        right={renderRight}
        onPress={type !== "info" ? onPress : undefined}
      />
      {showDivider && <Divider style={{ marginLeft: 56 }} />}
    </>
  );
};