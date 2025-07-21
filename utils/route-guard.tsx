import { useAuth } from "@/context/auth-context";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function RouteGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/landing");
    }
  }, [isAuthenticated, loading]);

  if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

  return <>{children}</>;
}