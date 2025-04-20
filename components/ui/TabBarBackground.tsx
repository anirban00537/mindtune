import { BlurView } from "expo-blur";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabBarBackground() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* Glow Effect */}
      <LinearGradient
        colors={["rgba(124, 58, 237, 0)", "rgba(124, 58, 237, 0.12)"]}
        style={[styles.glow, { height: 60 + insets.bottom }]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* Glass Effect with Blur */}
      <BlurView
        intensity={30}
        tint="dark"
        style={[styles.blurContainer, { height: 60 + insets.bottom }]}
      >
        {/* Subtle Gradient Overlay */}
        <LinearGradient
          colors={[
            "rgba(5, 8, 18, 0.8)",
            "rgba(5, 8, 18, 0.85)",
            "rgba(5, 8, 18, 0.9)",
          ]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />

        {/* Border Top */}
        <View style={styles.borderTop} />
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  blurContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
  },
  glow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.8,
  },
  borderTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
  },
});

// Helper function to handle bottom tab overflow
export function useBottomTabOverflow() {
  return 0;
}
