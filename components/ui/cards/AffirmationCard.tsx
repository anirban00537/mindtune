import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { IconSymbol } from "../IconSymbol";
import Colors from "@/constants/Colors";
import { CardBase } from "./CardBase";
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
    <CardBase style={style} gradient={true} intensity={25}>
      <View style={styles.content}>
        <Text style={styles.text}>{text}</Text>
        {onSavePress && (
          <TouchableOpacity onPress={onSavePress} style={styles.saveButton}>
            <LinearGradient
              colors={
                isSaved ? Colors.gradients.primary : Colors.gradients.button
              }
              style={styles.saveGradient}
              start={{ x: 0.2, y: 0 }}
              end={{ x: 0.8, y: 1 }}
            >
              <IconSymbol
                name={isSaved ? "heart.fill" : "heart"}
                size={20}
                color={isSaved ? Colors.light.text : "rgba(255, 255, 255, 0.6)"}
              />
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </CardBase>
  );
}

const styles = StyleSheet.create({
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
  saveGradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
