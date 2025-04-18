import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "../IconSymbol";
import Colors from "@/constants/Colors";

interface AffirmationCardProps {
  text: string;
  style?: ViewStyle;
  onPress?: () => void;
  onSavePress?: () => void;
  isSaved?: boolean;
}

export function AffirmationCard({
  text,
  style,
  onPress,
  onSavePress,
  isSaved,
}: AffirmationCardProps) {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <BlurView intensity={8} tint="dark" style={StyleSheet.absoluteFill} />
      <LinearGradient
        colors={Colors.gradients.pill}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
      />
      <View style={styles.content}>
        <Text style={styles.text}>{text}</Text>
        <TouchableOpacity
          style={[styles.saveButton, isSaved && styles.savedButton]}
          onPress={onSavePress}
          hitSlop={8}
        >
          <IconSymbol
            name={isSaved ? "heart.fill" : "heart"}
            size={16}
            color={isSaved ? Colors.light.primary : "rgba(255, 255, 255, 0.6)"}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.light.border,
    overflow: "hidden",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  text: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.light.text,
    fontWeight: "500",
    letterSpacing: 0.2,
  },
  saveButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.pill,
  },
  savedButton: {
    backgroundColor: Colors.light.pillActive,
  },
});
