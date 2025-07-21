import { useAuth } from "@/context/auth-context";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Button, Card, Divider, List, Text, TextInput } from "react-native-paper";

const Profile = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      // Here you would typically update the user profile via your API
      console.log("Updating profile:", { name, email });
      // For now, just simulate the update
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout", 
          style: "destructive",
          onPress: logout 
        }
      ]
    );
  };

  const getInitials = (name: string, email: string) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return email.slice(0, 1).toUpperCase();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Profile Header */}
        <Card style={styles.headerCard}>
          <Card.Content style={styles.headerContent}>
            <Avatar.Text 
              size={80} 
              label={getInitials(user?.name || "", user?.email || "")}
              style={styles.avatar}
            />
            <Text variant="headlineSmall" style={styles.userName}>
              {user?.name || "User"}
            </Text>
            <Text variant="bodyMedium" style={styles.userEmail}>
              {user?.email}
            </Text>
            <Text variant="bodySmall" style={styles.userStatus}>
              Account verified
            </Text>
          </Card.Content>
        </Card>

        {/* Profile Information */}
        <Card style={styles.infoCard}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Profile Information
              </Text>
              <Button
                mode={isEditing ? "contained" : "outlined"}
                onPress={() => setIsEditing(!isEditing)}
                compact
              >
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </View>

            <TextInput
              label="Full Name"
              value={name}
              onChangeText={setName}
              mode="outlined"
              style={styles.input}
              disabled={!isEditing}
              left={<TextInput.Icon icon="account" />}
            />

            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              disabled={!isEditing}
              left={<TextInput.Icon icon="email" />}
            />

            {isEditing && (
              <Button
                mode="contained"
                onPress={handleSave}
                loading={loading}
                style={styles.saveButton}
                contentStyle={styles.buttonContent}
              >
                Save Changes
              </Button>
            )}
          </Card.Content>
        </Card>

        {/* Account Settings */}
        <Card style={styles.settingsCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Account Settings
            </Text>
            
            <List.Item
              title="Change Password"
              description="Update your account password"
              left={props => <List.Icon {...props} icon="lock" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => console.log("Change password")}
            />
            
            <Divider />
            
            <List.Item
              title="Privacy Settings"
              description="Manage your privacy preferences"
              left={props => <List.Icon {...props} icon="shield-account" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => console.log("Privacy settings")}
            />
            
            <Divider />
            
            <List.Item
              title="Notifications"
              description="Configure notification preferences"
              left={props => <List.Icon {...props} icon="bell" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => console.log("Notifications")}
            />
          </Card.Content>
        </Card>

        {/* Logout Button */}
        <Button
          mode="outlined"
          onPress={handleLogout}
          style={styles.logoutButton}
          contentStyle={styles.buttonContent}
          buttonColor="#fff"
          textColor="#d32f2f"
        >
          Logout
        </Button>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
  },
  headerCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 4,
  },
  headerContent: {
    alignItems: "center",
    paddingVertical: 20,
  },
  avatar: {
    marginBottom: 16,
    backgroundColor: "#6200ee",
  },
  userName: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  userEmail: {
    opacity: 0.7,
    marginBottom: 4,
  },
  userStatus: {
    color: "#4caf50",
    fontWeight: "500",
  },
  infoCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: "bold",
  },
  input: {
    marginBottom: 16,
  },
  saveButton: {
    marginTop: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  settingsCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 4,
  },
  logoutButton: {
    marginTop: 8,
    marginBottom: 20,
    borderColor: "#d32f2f",
  },
});

export default Profile;