import { Stack } from "expo-router"
import { Colors } from "../constants/colors"
import { useColorScheme } from "react-native"
import { StatusBar } from "expo-status-bar"

export default function RootLayout() {
  const colorScheme = useColorScheme() // 'light' | 'dark' | null
  const theme = Colors[colorScheme ?? 'light'] ?? Colors.light

  return (
    <>
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
        <Stack.Screen name="new_inquiry" options={{ title: "New Inquiry" }} /> {/* add this */}
      </Stack>
    </>
  )
}