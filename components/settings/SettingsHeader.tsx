import React from "react";
import { Appbar } from "react-native-paper";
import { useRouter } from "expo-router";

interface SettingsHeaderProps {
  title?: string;
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({
  title = "Settings",
}) => {
  const router = useRouter();

  return (
    <Appbar.Header style={{ backgroundColor: "#fff" }}>
      <Appbar.BackAction onPress={() => router.back()} />
      <Appbar.Content title={title} titleStyle={{ fontWeight: "bold" }} />
    </Appbar.Header>
  );
};