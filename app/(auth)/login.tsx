import { useAuth } from "@/context/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { Button, Divider, Text, TextInput } from "react-native-paper";

export default function AuthLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const router = useRouter();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      await login(email, password);
      router.push("/(tabs)");
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google OAuth
    console.log("Google sign in");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center px-8 py-12">
          {/* Header */}
          <View className="mb-8">
            <Text
              variant="headlineMedium"
              className="text-center mb-2"
              style={{ fontWeight: "bold" }}
            >
              Welcome Back
            </Text>
          </View>

          {error ? (
            <View className="mb-4 p-3 bg-red-50 rounded-lg">
              <Text className="text-red-600 text-center">{error}</Text>
            </View>
          ) : null}

          <View className="mb-6" style={{ gap: 16 }}>
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              left={<TextInput.Icon icon="email" />}
              error={email.length > 0 && !validateEmail(email)}
            />
            {email.length > 0 && !validateEmail(email) && (
              <Text className="text-red-600 text-sm ml-2 -mt-3">
                Please enter a valid email address
              </Text>
            )}

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              secureTextEntry={!showPassword}
              autoComplete="current-password"
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon
                  icon={showPassword ? "eye-off" : "eye"}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />
          </View>

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            disabled={loading || !email || !password}
            className="rounded-xl"
            style={{
              backgroundColor: "#20226F",
              elevation: 2,
            }}
            contentStyle={{ paddingVertical: 10 }}
            labelStyle={{ color: "#fff", fontWeight: "800" }}
          >
            Login
          </Button>

          <View className="mb-8 mt-10 justify-center items-center">
            <Text variant="bodyMedium" className="text-center text-gray-600">
              Don't have an account?{" "}
              <Text
                style={{ color: "#20226F", fontWeight: "600" }}
                onPress={() => router.replace("/register")}
              >
                Sign up
              </Text>
            </Text>
          </View>

          <View className="flex-row items-center mb-6">
            <Divider className="flex-1" />
            <Text variant="bodySmall" className="mx-4 text-gray-500">
              or
            </Text>
            <Divider className="flex-1" />
          </View>

          <Button
            mode="outlined"
            onPress={handleGoogleSignIn}
            icon="google"
            className="rounded-xl"
            style={{
              borderColor: "#20226F",
              borderWidth: 1.5,
            }}
            contentStyle={{
              paddingVertical: 12,
            }}
          >
            Sign in with Google
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
