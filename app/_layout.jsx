import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import { Colors } from "../constants/Colors";
import { useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'] ?? Colors.light;

  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.navBackground },
          headerTintColor: theme.title,
        }}
      >
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="about" options={{ title: "About" }} />
        <Stack.Screen name="contact" options={{ title: "Contact", headerShown: false }} />
        <Stack.Screen name="new_inquiry" options={{ title: "New Inquiry" }} />
        <Stack.Screen name="inquiries" options={{ title: "My Inquiries" }} />
        <Stack.Screen name="signIn" options={{ title: "Sign In" }} />
        <Stack.Screen name="signUp" options={{ title: "Sign Up" }} />
      </Stack>
    </AuthProvider>
  );
}
