import { useAuth } from "@/context/auth-context";
import { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { Button } from "react-native-paper";
import {
  SettingsHeader,
  SettingsSection,
  SettingsItem,
} from "@/components";

const Settings = () => {
  const { logout } = useAuth();
  
  // Settings state
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [workoutReminders, setWorkoutReminders] = useState(true);
  const [shareData, setShareData] = useState(false);

  const handleLogout = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: logout,
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account", 
      "This action cannot be undone. All your data will be permanently deleted.", 
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => console.log("Delete account"),
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      <SettingsHeader />

      <ScrollView className="flex-1">
        {/* Account Section */}
        <SettingsSection title="Account">
          <SettingsItem
            icon="account-edit"
            title="Edit Profile"
            description="Update your personal information"
            onPress={() => console.log("Edit Profile")}
          />
          <SettingsItem
            icon="lock"
            title="Change Password"
            description="Update your account password"
            onPress={() => console.log("Change Password")}
          />
          <SettingsItem
            icon="shield-key"
            title="Two-Factor Authentication"
            description="Add extra security to your account"
            onPress={() => console.log("2FA")}
            showDivider={false}
          />
        </SettingsSection>

        {/* Notifications Section */}
        <SettingsSection title="Notifications">
          <SettingsItem
            icon="bell"
            title="Push Notifications"
            description="Receive notifications on your device"
            type="switch"
            switchValue={pushNotifications}
            onSwitchChange={setPushNotifications}
          />
          <SettingsItem
            icon="email"
            title="Email Notifications"
            description="Receive updates via email"
            type="switch"
            switchValue={emailNotifications}
            onSwitchChange={setEmailNotifications}
          />
          <SettingsItem
            icon="dumbbell"
            title="Workout Reminders"
            description="Get reminded about scheduled workouts"
            type="switch"
            switchValue={workoutReminders}
            onSwitchChange={setWorkoutReminders}
            showDivider={false}
          />
        </SettingsSection>

        {/* Privacy & Data Section */}
        <SettingsSection title="Privacy & Data">
          <SettingsItem
            icon="shield-account"
            title="Privacy Settings"
            description="Control who can see your profile"
            onPress={() => console.log("Privacy Settings")}
          />
          <SettingsItem
            icon="chart-line"
            title="Data Sharing"
            description="Share anonymized data for insights"
            type="switch"
            switchValue={shareData}
            onSwitchChange={setShareData}
          />
          <SettingsItem
            icon="download"
            title="Export Data"
            description="Download your workout data"
            onPress={() => console.log("Export Data")}
            showDivider={false}
          />
        </SettingsSection>

        {/* App Preferences Section */}
        <SettingsSection title="App Preferences">
          <SettingsItem
            icon="scale-balance"
            title="Units"
            description="Metric (kg) or Imperial (lbs)"
            onPress={() => console.log("Units")}
          />
          <SettingsItem
            icon="palette"
            title="Theme"
            description="Light or Dark mode"
            onPress={() => console.log("Theme")}
          />
          <SettingsItem
            icon="translate"
            title="Language"
            description="English"
            onPress={() => console.log("Language")}
            showDivider={false}
          />
        </SettingsSection>

        {/* Support Section */}
        <SettingsSection title="Support">
          <SettingsItem
            icon="help-circle"
            title="Help Center"
            description="Get help and find answers"
            onPress={() => console.log("Help Center")}
          />
          <SettingsItem
            icon="message"
            title="Contact Support"
            description="Report issues or get assistance"
            onPress={() => console.log("Contact Support")}
          />
          <SettingsItem
            icon="star"
            title="Rate App"
            description="Share your feedback"
            onPress={() => console.log("Rate App")}
            showDivider={false}
          />
        </SettingsSection>

        {/* About Section */}
        <SettingsSection title="About">
          <SettingsItem
            icon="file-document"
            title="Terms of Service"
            onPress={() => console.log("Terms of Service")}
          />
          <SettingsItem
            icon="shield-check"
            title="Privacy Policy"
            onPress={() => console.log("Privacy Policy")}
          />
          <SettingsItem
            icon="information"
            title="App Version"
            description="1.0.0"
            type="info"
            showDivider={false}
          />
        </SettingsSection>

        {/* Action Buttons */}
        <View className="px-6 py-4 gap-3">
          {/* Sign Out Button */}
          <Button
            mode="outlined"
            onPress={handleLogout}
            style={{ borderColor: "#d32f2f", borderRadius: 12 }}
            contentStyle={{ paddingVertical: 8 }}
            textColor="#d32f2f"
          >
            Sign Out
          </Button>

          {/* Delete Account Button */}
          <Button
            mode="text"
            onPress={handleDeleteAccount}
            contentStyle={{ paddingVertical: 8 }}
            textColor="#d32f2f"
          >
            Delete Account
          </Button>
        </View>

        {/* Bottom spacing */}
        <View className="h-8" />
      </ScrollView>
    </View>
  );
};

export default Settings;