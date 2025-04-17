import { StyleSheet, View, ViewStyle } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";

interface CardBaseProps {
  children: React.ReactNode;
  style?: ViewStyle;
  gradient?: boolean;
}

export function CardBase({ children, style, gradient = true }: CardBaseProps) {
  return (
    <BlurView intensity={10} tint="dark" style={[styles.card, style]}>
      {gradient ? (
        <LinearGradient
          colors={Colors.gradients.card}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
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
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  gradient: {
    flex: 1,
  },
});
