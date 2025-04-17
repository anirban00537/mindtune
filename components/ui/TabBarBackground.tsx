import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function TabBarBackground() {
  return (
    <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill}>
      <LinearGradient
        colors={["rgba(13, 71, 161, 0.15)", "rgba(0, 33, 113, 0.25)"]}
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
