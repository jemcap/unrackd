import { useAuth } from "@/context/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  Button,
  Card,
  HelperText,
  Snackbar,
  Text,
  TextInput,
} from "react-native-paper";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const { login, register } = useAuth();
  const router = useRouter();

  // Email validation
  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation
  const isPasswordValid = (password: string) => {
    return password.length >= 8;
  };

  // Form validation
  const isFormValid = () => {
    if (!email || !password) return false;
    if (!isEmailValid(email)) return false;
    if (!isPasswordValid(password)) return false;
    if (!isLogin && password !== confirmPassword) return false;
    return true;
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        await login(email, password);
        router.push("/(tabs)");
      } else {
        await register(name, email, password);
        router.push("/(tabs)");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setShowError(false);
    // Reset form when switching modes
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="headlineMedium" style={styles.title}>
                {isLogin ? "Welcome Back" : "Create Account"}
              </Text>
              <Text variant="bodyMedium" style={styles.subtitle}>
                {isLogin
                  ? "Sign in to your account"
                  : "Join us and start your journey"}
              </Text>

              {!isLogin && (
                <TextInput
                  label="Username"
                  value={name}
                  onChangeText={setName}
                  mode="outlined"
                  autoCapitalize="words"
                  style={styles.input}
                  left={<TextInput.Icon icon="account" />}
                />
              )}

              <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                style={styles.input}
                left={<TextInput.Icon icon="email" />}
                error={email.length > 0 && !isEmailValid(email)}
              />
              <HelperText
                type="error"
                visible={email.length > 0 && !isEmailValid(email)}
              >
                Please enter a valid email address
              </HelperText>

              <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                secureTextEntry={!showPassword}
                autoComplete={isLogin ? "current-password" : "new-password"}
                style={styles.input}
                left={<TextInput.Icon icon="lock" />}
                right={
                  <TextInput.Icon
                    icon={showPassword ? "eye-off" : "eye"}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
                error={password.length > 0 && !isPasswordValid(password)}
              />
              <HelperText
                type="error"
                visible={password.length > 0 && !isPasswordValid(password)}
              >
                Password must be at least 8 characters long
              </HelperText>

              {!isLogin && (
                <>
                  <TextInput
                    label="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    mode="outlined"
                    secureTextEntry={!showConfirmPassword}
                    autoComplete="new-password"
                    style={styles.input}
                    left={<TextInput.Icon icon="lock-check" />}
                    right={
                      <TextInput.Icon
                        icon={showConfirmPassword ? "eye-off" : "eye"}
                        onPress={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      />
                    }
                    error={
                      confirmPassword.length > 0 && password !== confirmPassword
                    }
                  />
                  <HelperText
                    type="error"
                    visible={
                      confirmPassword.length > 0 && password !== confirmPassword
                    }
                  >
                    Passwords do not match
                  </HelperText>
                </>
              )}

              <Button
                mode="contained"
                onPress={handleSubmit}
                loading={loading}
                disabled={!isFormValid() || loading}
                style={styles.submitButton}
                contentStyle={styles.buttonContent}
              >
                {isLogin ? "Sign In" : "Create Account"}
              </Button>

              <Button
                mode="text"
                onPress={toggleMode}
                disabled={loading}
                style={styles.toggleButton}
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </Button>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>

      <Snackbar
        visible={showError}
        onDismiss={() => setShowError(false)}
        duration={4000}
        action={{
          label: "Dismiss",
          onPress: () => setShowError(false),
        }}
      >
        {error}
      </Snackbar>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    padding: 20,
    borderRadius: 12,
    elevation: 4,
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
    fontWeight: "bold",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 32,
    opacity: 0.7,
  },
  input: {
    marginBottom: 4,
  },
  submitButton: {
    marginTop: 16,
    marginBottom: 16,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  toggleButton: {
    marginTop: 8,
  },
});
