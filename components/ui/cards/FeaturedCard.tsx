import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";
import { CardBase } from "./CardBase";

interface FeaturedCardProps {
  title: string;
  description: string;
  actionText?: string;
  meta?: {
    duration?: string;
    difficulty?: string;
  };
  style?: ViewStyle;
  onPress?: () => void;
  onActionPress?: () => void;
}

export function FeaturedCard({
  title,
  description,
  actionText = "Start",
  meta,
  style,
  onPress,
  onActionPress,
}: FeaturedCardProps) {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <CardBase>
        <View style={styles.content}>
          <View style={styles.textContent}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            {meta && (
              <View style={styles.meta}>
                {meta.duration && (
                  <Text style={styles.metaText}>{meta.duration}</Text>
                )}
                {meta.difficulty && (
                  <>
                    <Text style={styles.metaSeparator}>•</Text>
                    <Text style={styles.metaText}>{meta.difficulty}</Text>
                  </>
                )}
              </View>
            )}
          </View>
          {actionText && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={onActionPress ?? onPress}
            >
              <LinearGradient
                colors={Colors.gradients.button}
                style={styles.actionGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.actionText}>{actionText}</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </CardBase>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContent: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    color: Colors.light.text,
    fontWeight: "700",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: Colors.light.text,
    opacity: 0.8,
    marginBottom: 16,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaText: {
    fontSize: 14,
    color: Colors.light.text,
    opacity: 0.7,
  },
  metaSeparator: {
    fontSize: 14,
    color: Colors.light.text,
    opacity: 0.7,
    marginHorizontal: 8,
  },
  actionButton: {
    borderRadius: 28,
    overflow: "hidden",
  },
  actionGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  actionText: {
    color: Colors.light.text,
    fontSize: 16,
    fontWeight: "600",
  },
});
