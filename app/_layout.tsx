import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { MediaPlayerProvider } from "@/context/MediaPlayerContext";
import MediaPlayer from "@/components/ui/MediaPlayer";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Customize the DarkTheme to have a transparent background
const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "transparent",
    card: "transparent",
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <MediaPlayerProvider>
      <ThemeProvider
        value={colorScheme === "dark" ? CustomDarkTheme : DefaultTheme}
      >
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#050812" },
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="playlist/[id]" />
          <Stack.Screen name="search" />
          <Stack.Screen name="create" />
        </Stack>
        <StatusBar style="light" />
      </ThemeProvider>
      <MediaPlayer />
    </MediaPlayerProvider>
  );
}
