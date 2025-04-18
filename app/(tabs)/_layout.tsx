import { Tabs } from "expo-router";
import { Platform, StyleSheet, View } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

function CreateButton({ color }: { color: string }) {
  return (
    <View style={styles.createButton}>
      <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
      <LinearGradient
        colors={Colors.gradients.glow}
        style={styles.createGlow}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 1.5, y: 1.5 }}
      />
      <LinearGradient
        colors={Colors.gradients.primary}
        style={styles.createGradient}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
      >
        <IconSymbol size={28} name="plus.circle.fill" color="#ffffff" />
      </LinearGradient>
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? "light";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: false,
        tabBarStyle: {
          ...Platform.select({
            ios: { position: "absolute" },
            default: {},
          }),
          backgroundColor: "transparent",
          borderTopWidth: 0,
          elevation: 0,
          height: Platform.OS === "ios" ? 85 : 65,
        },
        tabBarBackground: () => <TabBarBackground />,
        tabBarLabelStyle: {
          fontWeight: "600",
          fontSize: 11,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "My Library",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="books.vertical.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ color }) => <CreateButton color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="gearshape.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  createButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -10,
    borderRadius: 22,
    overflow: "hidden",
  },
  createGlow: {
    position: "absolute",
    width: "150%",
    height: "150%",
    opacity: 0.5,
    transform: [{ scale: 1.2 }],
  },
  createGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
