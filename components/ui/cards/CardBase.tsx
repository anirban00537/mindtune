import { StyleSheet, ViewStyle } from "react-native";
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
    <BlurView intensity={15} tint="dark" style={[styles.card, style]}>
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
  },
  gradient: {
    flex: 1,
  },
});
