import React from "react";
import { StyleSheet, ViewStyle, Platform } from "react-native";
import { BlurView } from "expo-blur";
import Colors from "@/constants/Colors";

interface CardBaseProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
}

export function CardBase({
  children,
  style,
  intensity = 30,
}: CardBaseProps) {
  return (
    <BlurView intensity={intensity} tint="dark" style={[styles.card, style]}>
      <>{children}</>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "rgba(30, 30, 40, 0.2)",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.12)",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});
