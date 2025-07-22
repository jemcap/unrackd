import { useAuth } from "@/context/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import {
  ProfileHeader,
  PersonalBestsCard,
  WorkoutListCard,
  NextMeetCard,
  MeetHistoryCard,
  ExperienceStatsCard,
  ProgressPlaceholderCard,
} from "@/components";
import type {
  TabValue,
  PersonalBests,
  PowerliftingStats,
  Workout,
  UpcomingMeet,
  CompletedMeet,
  PersonalStats,
} from "@/types";

const Profile = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabValue>("overview");
  const [refreshing, setRefreshing] = useState(false);

  // Mock data — Make an API call to fetch real data in production
  const [powerliftingStats] = useState<PowerliftingStats>({
    yearsOfExperience: 3,
    weightClass: "U93kg",
    ageCategory: "Open",
    meetsCompleted: 12,
  });

  const [personalBests] = useState<PersonalBests>({
    squat: 180,
    bench: 125,
    deadlift: 220,
  });

  const [upcomingMeets] = useState<UpcomingMeet[]>([
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

  const [completedMeets] = useState<CompletedMeet[]>([
    {
      id: 1,
      name: "Summer Classic 2024",
      date: "2024-06-22",
      location: "London, UK",
      total: 525,
      weightCategory: "U93kg",
      placing: "2nd",
    },
    {
      id: 2,
      name: "Spring Open 2024",
      date: "2024-03-15",
      location: "Leeds, UK",
      total: 512.5,
      weightCategory: "U93kg",
      placing: "3rd",
    },
  ]);

  const [recentWorkouts] = useState<Workout[]>([
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

  const [personalStats] = useState<PersonalStats>({
    workouts: recentWorkouts.length,
    followers: 1223,
    following: 567,
  });

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh - replace with actual API call
    setTimeout(() => setRefreshing(false), 1500);
  };

  const handleEditProfile = () => {
    console.log("Edit Profile");
  };

  const handleShareProfile = () => {
    console.log("Share Profile");
  };

  const renderOverviewTab = () => (
    <View className="px-6 py-4 gap-4">
      <PersonalBestsCard 
        personalBests={personalBests}
        onEdit={() => console.log("Edit PBs")}
      />
      
      <WorkoutListCard
        workouts={recentWorkouts}
        onViewAll={() => console.log("View All")}
        onWorkoutPress={(id) => router.push(`/workout/${id}`)}
      />

      {upcomingMeets.length > 0 && (
        <NextMeetCard 
          meet={upcomingMeets[0]}
          onViewDetails={() => console.log("View Meet")}
        />
      )}
    </View>
  );

  const renderStatsTab = () => (
    <View className="px-6 py-4 gap-4">
      <ExperienceStatsCard stats={powerliftingStats} />
      <ProgressPlaceholderCard />
    </View>
  );

  const renderHistoryTab = () => (
    <View className="px-6 py-4 gap-4">
      <MeetHistoryCard
        meets={completedMeets}
        totalMeets={powerliftingStats.meetsCompleted}
        onMeetPress={(id) => console.log(`View meet ${id}`)}
      />
    </View>
  );

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#20226F"]}
        />
      }
    >
      <ProfileHeader
        user={user}
        powerliftingStats={powerliftingStats}
        personalStats={personalStats}
        activeTab={activeTab}
        onTabChange={(value) => setActiveTab(value as TabValue)}
        onEditProfile={handleEditProfile}
        onShareProfile={handleShareProfile}
      />

      {activeTab === "overview" && renderOverviewTab()}
      {activeTab === "stats" && renderStatsTab()}
      {activeTab === "history" && renderHistoryTab()}
    </ScrollView>
  );
};

export default Profile;