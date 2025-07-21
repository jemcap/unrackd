import { account, databases } from "@/lib/appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { Models, Query } from "react-native-appwrite";

interface AuthContextType {
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  checkExistingUser: (username: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkExistingUser = async (username: string): Promise<boolean> => {
    try {
      const result = await databases.listDocuments(
        process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!,
        [Query.equal("username", username)]
      );
      return result.documents.length > 0;
    } catch (error) {
      console.error("Error checking username:", error);
      return false;
    }
  };

  const checkAuthState = async () => {
    try {
      const currentUser = await account.get();
      if (!currentUser) throw new Error("User not authenticated");
      setUser(currentUser);
    } catch (error) {
      console.error("Error checking auth state:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };   

  const login = async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const currentUser = await account.get();
      setUser(currentUser);
    } catch (error) {
      console.error("Error logging in:", error);
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const isUsernameExists = await checkExistingUser(name);
      if (isUsernameExists) {
        Alert.alert("Error", "Username already exists");
        return;
      }
      const newUser = await account.create("unique()", email, password, name);
      await databases.createDocument(
        process.env.EXPO_PUBLIC_APPWRITE_USERNAME_DATABASE_ID!,
        process.env.EXPO_PUBLIC_APPWRITE_USERNAME_COLLECTION_ID!,
        "unique()",
        {
          username: name,
          email: email,
          userId: newUser.$id,
          createdAt: new Date().toISOString(),
        }
      );
      await login(email, password);
    } catch (error) {
      console.error("Error registering:", error);
      throw error;
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated, login, logout, register, checkExistingUser }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
