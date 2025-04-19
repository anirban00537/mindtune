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
import { Ionicons } from "@expo/vector-icons";

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
          <TouchableOpacity 
            onPress={onSavePress} 
            style={styles.saveButton} 
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <BlurView
                intensity={20}
                tint="dark"
                style={StyleSheet.absoluteFill}
            />
            <IconSymbol
              name={isSaved ? "heart.fill" : "heart"}
              size={20}
              color={isSaved ? Colors.light.primary : "#FFFFFF"}
              style={styles.saveIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  cardBase: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
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
    gap: 12,
  },
  text: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text,
  },
  saveButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveIcon: {
  },
});
