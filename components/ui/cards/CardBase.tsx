import { StyleSheet, ViewStyle, Platform } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";

interface CardBaseProps {
  children: React.ReactNode;
  style?: ViewStyle;
  gradient?: boolean;
  intensity?: number;
}

export function CardBase({
  children,
  style,
  gradient = true,
  intensity = 15,
}: CardBaseProps) {
  return (
    <BlurView intensity={intensity} tint="dark" style={[styles.card, style]}>
      {gradient ? (
        <LinearGradient
          colors={Colors.gradients.card}
          style={styles.gradient}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 0.8, y: 1 }}
        >
          {children}
        </LinearGradient>
      ) : (
        children
      )}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    borderColor: Colors.light.cardBorder,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  gradient: {
    flex: 1,
  },
});
