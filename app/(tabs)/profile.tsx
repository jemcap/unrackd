import { useAuth } from "@/context/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { Avatar, Button, Divider, List, Text } from "react-native-paper";

import { formatFollowers } from "@/utils/format";

 export const [recentWorkouts] = useState([
    {
      id: 1,
      type: "Primary Squats & Secondary Bench",
      date: "2024-07-16",
      exercises: [
        { name: "Top Set Squat", sets: 1, reps: 3, weight: 220 },
        { name: "Back Off Squat", sets: 3, reps: 5, weight: 175 },
        { name: "Tempo Bench Press", sets: 3, reps: 8, weight: 90 },
        { name: "Pull-Ups", sets: 3, reps: 8, weight: 0 },
      ],
      duration: 80,
    },
    {
      id: 2,
      type: "Primary Bench",
      date: "2024-07-16",
      exercises: [
        { name: "Top Set Bench", sets: 1, reps: 3, weight: 220 },
        { name: "Back Off Bench", sets: 3, reps: 5, weight: 175 },
        { name: "Incline Dumbbell Press", sets: 3, reps: 8, weight: 40 },
        { name: "Tricep Dips", sets: 3, reps: 10, weight: 0 },
      ],
      duration: 80,
    },
    {
      id: 3,
      type: "Primary Deadlifts & Secondary Squats",
      date: "2024-07-16",
      exercises: [
        { name: "Top Set Deadlift", sets: 1, reps: 3, weight: 220 },
        { name: "Back Off Deadlift", sets: 3, reps: 5, weight: 175 },
        { name: "Back extensions", sets: 3, reps: 8, weight: 0 },
      ],
      duration: 80,
    },
  ]);

const Profile = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);

// Mock data — Make an API call to fetch real data in production
  const [powerliftingStats] = useState({
    yearsOfExperience: 3,
    weightClass: "U93kg",
    ageCategory: "Open",
    meetsCompleted: 12,
  });

  const [personalBests] = useState({
    squat: 180,
    bench: 125,
    deadlift: 220,
    total: 525,
  });

  const [upcomingMeets] = useState([
    {
      id: 1,
      name: "Regional Championships 2024",
      date: "2024-08-15",
      location: "Manchester, UK",
      federation: "IPF",
      daysUntil: 24,
    },
    {
      id: 2,
      name: "National Open",
      date: "2024-10-12",
      location: "Birmingham, UK",
      federation: "British Powerlifting",
      daysUntil: 82,
    },
  ]);

  const [completedMeets] = useState([
    {
      id: 1,
      name: "Summer Classic 2024",
      date: "2024-06-22",
      location: "London, UK",
      squat: { attempt1: 170, attempt2: 180, attempt3: 185, best: 180 },
      bench: { attempt1: 120, attempt2: 125, attempt3: 130, best: 125 },
      deadlift: { attempt1: 210, attempt2: 220, attempt3: 225, best: 220 },
      total: 525,
      weightCategory: "U93kg",

      placing: "2nd",
    },
    {
      id: 2,
      name: "Spring Open 2024",
      date: "2024-03-15",
      location: "Leeds, UK",
      squat: { attempt1: 165, attempt2: 175, attempt3: 180, best: 175 },
      bench: { attempt1: 115, attempt2: 122.5, attempt3: 125, best: 122.5 },
      deadlift: { attempt1: 205, attempt2: 215, attempt3: 220, best: 215 },
      total: 512.5,
      weightCategory: "U93kg",

      placing: "3rd",
    },
  ]);

 

  const [personalStats] = useState({
    workouts: recentWorkouts.length,
    followers: 1223,
    following: 567,
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      // Here you would typically update the user profile via your API
      console.log("Updating profile:", { name, email });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: logout,
      },
    ]);
  };

  const getInitials = (name: string, email: string) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-5">
        {/* Profile Header */}
        <View className="py-5">
          <View className="flex-row items-center mb-5">
            <Avatar.Text
              size={80}
              label={getInitials(user?.name || "", user?.email || "")}
              style={{ backgroundColor: "#20226F", marginRight: 16 }}
            />
            <View className="flex-1">
              <Text variant="headlineSmall" className="font-bold mb-0.5">
                {user?.name || "User"}
              </Text>

              <View className="gap-1">
                <Text
                  variant="bodySmall"
                  className="text-xs font-semibold text-[#20226F] bg-[#e8eaf6] px-2 py-0.5 rounded-lg self-start"
                >
                  {powerliftingStats.weightClass} •{" "}
                  {powerliftingStats.ageCategory}
                </Text>
              </View>
              {personalStats && (
                <View className="flex-row gap-2 mt-5">
                  <Text variant="bodySmall" className="text-gray-600">
                    {personalStats.workouts} Workouts
                  </Text>
                  <Text variant="bodySmall" className="text-gray-600">
                    {formatFollowers(personalStats.followers)} Followers
                  </Text>
                  <Text variant="bodySmall" className="text-gray-600">
                    {formatFollowers(personalStats.following)} Following
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Powerlifting Stats */}
          <View className="flex-row justify-around mb-5 py-4 bg-[#f8f9fa] rounded-xl">
            <View className="items-center flex-1">
              <Text
                variant="headlineSmall"
                className="text-center text-xl font-bold text-[#20226F]"
              >
                {powerliftingStats.yearsOfExperience}
              </Text>
              <Text variant="bodySmall" className="opacity-70 mt-0.5">
                Years
              </Text>
            </View>
            <View className="w-px h-full bg-[#e0e0e0] mx-4" />
            <View className="items-center flex-1">
              <Text
                variant="headlineSmall"
                className="text-center text-xl font-bold text-[#20226F]"
              >
                {powerliftingStats.meetsCompleted}
              </Text>
              <Text variant="bodySmall" className="opacity-70 mt-0.5">
                Meets
              </Text>
            </View>
            <View className="w-px h-full bg-[#e0e0e0] mx-4" />
            <View className="items-center flex-1">
              <Text
                variant="headlineSmall"
                className="text-center text-xl font-bold text-[#20226F]"
              >
                {personalBests.total}kg
              </Text>
              <Text variant="bodySmall" className="opacity-70 mt-0.5">
                Total
              </Text>
            </View>
          </View>

          {/* Personal Bests */}
          <View className="flex-row justify-around mb-5 py-3 bg-white rounded-lg border border-[#e0e0e0]">
            <View className="items-center flex-1">
              <Text
                variant="titleSmall"
                className="font-bold text-gray-600 mb-1"
              >
                SQ
              </Text>
              <Text variant="bodyLarge" className="font-bold text-[#20226F]">
                {personalBests.squat}kg
              </Text>
            </View>
            <View className="items-center flex-1">
              <Text
                variant="titleSmall"
                className="font-bold text-gray-600 mb-1"
              >
                BP
              </Text>
              <Text variant="bodyLarge" className="font-bold text-[#20226F]">
                {personalBests.bench}kg
              </Text>
            </View>
            <View className="items-center flex-1">
              <Text
                variant="titleSmall"
                className="font-bold text-gray-600 mb-1"
              >
                DL
              </Text>
              <Text variant="bodyLarge" className="font-bold text-[#20226F]">
                {personalBests.deadlift}kg
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row gap-3">
            <Button
              mode="contained"
              className="flex-1 rounded-lg"
              style={{ backgroundColor: "#20226F" }}
              onPress={() => console.log("Edit Profile")}
            >
              Edit Profile
            </Button>
            <Button
              mode="outlined"
              className="flex-1 rounded-lg"
              style={{ borderColor: "#20226F" }}
              textColor="#20226F"
              onPress={() => console.log("Share Profile")}
            >
              Share Profile
            </Button>
          </View>
        </View>

        <Divider className="my-2.5 bg-[#e0e0e0]" />

        {/* Upcoming Meets */}
        <View className="py-5">
          <View className="flex-row justify-between items-center mb-4">
            <Text variant="titleMedium" className="font-bold">
              Upcoming Meets
            </Text>
            <Button
              mode="text"
              textColor="#20226F"
              onPress={() => console.log("View All Meets")}
            >
              View All
            </Button>
          </View>

          {upcomingMeets ? (
            upcomingMeets.map((meet, index) => (
              <View key={meet?.id}>
                <List.Item
                  title={meet?.name}
                  description={`${meet?.date} • ${meet?.location} • ${meet?.federation}`}
                  right={() => (
                    <View className="items-end">
                      <Text
                        variant="bodySmall"
                        className="font-semibold text-[#20226F]"
                      >
                        {meet?.daysUntil} days
                      </Text>
                    </View>
                  )}
                  onPress={() => console.log(`View meet ${meet?.id}`)}
                />
                {index < upcomingMeets.length - 1 && <Divider />}
              </View>
            ))
          ) : (
            <Text
              variant="bodyMedium"
              className="text-center my-5 text-gray-600"
            >
              No upcoming meets found.
            </Text>
          )}
        </View>

        <Divider className="my-2.5 bg-[#e0e0e0]" />

        {/* Meet History */}
        <View className="py-5">
          <View className="flex-row justify-between items-center mb-4">
            <Text variant="titleMedium" className="font-bold">
              Meet History ({powerliftingStats.meetsCompleted})
            </Text>
            <Button
              mode="text"
              textColor="#20226F"
              onPress={() => console.log("Expand Meet History")}
            >
              Expand
            </Button>
          </View>

          {completedMeets ? (
            completedMeets.slice(0, 2).map((meet, index) => (
              <View key={meet.id}>
                <List.Item
                  title={meet.name}
                  description={`${meet.date} • ${meet.weightCategory} • ${meet.placing}`}
                  right={() => (
                    <View className="items-end">
                      <Text
                        variant="bodySmall"
                        className="font-semibold text-[#20226F]"
                      >
                        {meet.total}kg
                      </Text>
                    </View>
                  )}
                  onPress={() => console.log(`View meet details ${meet.id}`)}
                />
                {index < completedMeets.slice(0, 2).length - 1 && <Divider />}
              </View>
            ))
          ) : (
            <View className="items-center my-5">
              <Text variant="bodyMedium" className="text-gray-600">
                No meet history found.
              </Text>
            </View>
          )}
        </View>

        <Divider className="my-2.5 bg-[#e0e0e0]" />

        {/* Recent Workout History */}
        <View className="py-5">
          <View className="flex-row justify-between items-center mb-4">
            <Text variant="titleMedium" className="font-bold">
              Recent Workouts
            </Text>
            <Button
              mode="text"
              textColor="#20226F"
              onPress={() => console.log("View All Workouts")}
            >
              View All
            </Button>
          </View>

          {recentWorkouts ? (
            recentWorkouts.slice(0, 3).map((workout, index) => (
              <View key={workout.id}>
                <List.Item
                  title={workout.type}
                  description={`${workout.date} • ${workout.duration} min • ${workout.exercises.length} exercises`}
                  right={(props) => <List.Icon {...props} icon="chevron-right" />}
                  onPress={() => router.push(`/workout/${workout.id}`)}
                />
                {index < recentWorkouts.slice(0, 3).length - 1 && <Divider />}
              </View>
            ))
          ) : (
            <Text variant="bodyMedium" className="text-center my-5">
              No recent workouts found.
            </Text>
          )}
        </View>

        <Divider className="my-2.5 bg-[#e0e0e0]" />

        <View className="py-5">
          <Text variant="titleMedium" className="font-bold">
            Account Settings
          </Text>

          <List.Item
            title="Change Password"
            description="Update your account password"
            left={(props) => <List.Icon {...props} icon="lock" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => console.log("Change password")}
          />

          <Divider />

          <List.Item
            title="Privacy Settings"
            description="Manage your privacy preferences"
            left={(props) => <List.Icon {...props} icon="shield-account" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => console.log("Privacy settings")}
          />

          <Divider />

          <List.Item
            title="Notifications"
            description="Configure notification preferences"
            left={(props) => <List.Icon {...props} icon="bell" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => console.log("Notifications")}
          />
        </View>

        {/* Logout Button */}
        <Button
          mode="outlined"
          onPress={handleLogout}
          className="mt-2 mb-5"
          style={{ borderColor: "#d32f2f" }}
          contentStyle={{ paddingVertical: 8 }}
          buttonColor="#fff"
          textColor="#d32f2f"
        >
          Logout
        </Button>
      </View>
    </ScrollView>
  );
};

export default Profile;
