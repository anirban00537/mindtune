import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";

export default function TabBarBackground() {
  return (
    <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill}>
      <LinearGradient
        colors={Colors.gradients.tabBar}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
    </BlurView>
  );
}

export function useBottomTabOverflow() {
  return 0;
}
