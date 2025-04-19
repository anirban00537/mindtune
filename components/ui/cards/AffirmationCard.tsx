import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  Platform,
} from "react-native";
import { IconSymbol } from "../IconSymbol";
import Colors from "@/constants/Colors";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

interface AffirmationCardProps {
  text: string;
  isSaved?: boolean;
  onSavePress?: () => void;
  style?: ViewStyle;
}

export function AffirmationCard({
  text,
  isSaved,
  onSavePress,
  style,
}: AffirmationCardProps) {
  return (
    <BlurView
      intensity={60}
      tint="dark"
      style={[styles.cardBase, style]}
    >
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View style={styles.content}>
        <Text style={styles.text}>{text}</Text>
        {onSavePress && (
          <TouchableOpacity onPress={onSavePress} style={styles.saveButton}>
            <View style={styles.saveGlass}>
              <IconSymbol
                name={isSaved ? "heart.fill" : "heart"}
                size={20}
                color={isSaved ? Colors.light.primary : "rgba(255, 255, 255, 0.6)"}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  cardBase: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  text: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text,
    marginRight: 12,
  },
  saveButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  saveGlass: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 0.5,
  },
});
