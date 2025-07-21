import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, StatusBar, View } from "react-native";
import { Button, Text } from "react-native-paper";

// const { width, height } = Dimensions.get('window');

export default function AuthLanding() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      // TODO: Implement Google OAuth sign up
      console.log("Google sign up");
    } catch (error) {
      console.error("Google sign up error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignUp = () => {
    router.push("/register");
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View className="flex-1 justify-center items-center px-8 py-12">
        <View className="items-center mb-16">
          <Image
            source={require("@/assets/images/unrackd_logo_black.png")}
            className=" max-w-96 max-h-96"
            resizeMode="contain"
          />
        </View>

        <View className="w-full max-w-80 space-y-4">
          <Button
            mode="contained"
            onPress={handleGoogleSignUp}
            className="rounded-xl py-3 px-4"
            style={{
              backgroundColor: "#20226F",
              elevation: 2,
              boxShadow: "0 2px 2px rgba(0, 0, 0, 0.1)",
            }}
            loading={loading}
            disabled={loading}
            icon="google"
          >
            Sign up with Google
          </Button>

          <Button
            mode="outlined"
            onPress={handleEmailSignUp}
            className="rounded-xl mt-4 py-3 px-4"
            style={{
              borderColor: "#20226F",
              borderWidth: 1.5,
              boxShadow: "0 2px 2px rgba(0, 0, 0, 0.1)",
            }}
            textColor="#20226F"
          >
            Sign Up With Email
          </Button>
        </View>

        <View className="mt-8 items-center">
          <Text variant="bodySmall" className="text-gray-600 text-center">
            Already have an account?{" "}
            <Text
              className="font-semibold underline"
              onPress={() => router.push("/login")}
              style={{ color: "#20226F" }}
            >
              Sign in
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
