import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";
import { CardBase } from "./CardBase";
import { BlurView } from "expo-blur";

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
  isPremium?: boolean;
}

export function FeaturedCard({
  title,
  description,
  actionText = "Start",
  meta,
  style,
  onPress,
  onActionPress,
  isPremium,
}: FeaturedCardProps) {
  return (
    <TouchableOpacity style={style} onPress={onPress} activeOpacity={0.95}>
      <CardBase gradient={false}>
        <LinearGradient
          colors={
            isPremium
              ? [
                  "rgba(124, 58, 237, 0.5)",
                  "rgba(99, 102, 241, 0.3)",
                  "rgba(124, 58, 237, 0.1)",
                ]
              : ["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.05)"]
          }
          style={StyleSheet.absoluteFill}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 0.8, y: 1 }}
        />
        {isPremium && (
          <View style={styles.sparkleContainer}>
            <Text style={styles.sparkle}>✨</Text>
          </View>
        )}
        <View style={styles.container}>
          <View style={[styles.content, isPremium && styles.premiumContent]}>
            <View style={styles.textContent}>
              <Text style={[styles.title, isPremium && styles.premiumTitle]}>
                {title}
              </Text>
              <Text
                style={[
                  styles.description,
                  isPremium && styles.premiumDescription,
                ]}
              >
                {description}
              </Text>
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
          </View>

          {actionText && (
            <View style={styles.actionContainer}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  isPremium && styles.premiumActionButton,
                ]}
                onPress={onActionPress ?? onPress}
              >
                <BlurView
                  intensity={isPremium ? 25 : 15}
                  tint="dark"
                  style={StyleSheet.absoluteFill}
                />
                <LinearGradient
                  colors={
                    isPremium
                      ? ["rgba(124, 58, 237, 1)", "rgba(99, 102, 241, 0.9)"]
                      : Colors.gradients.button
                  }
                  style={styles.actionGradient}
                  start={{ x: 0.2, y: 0 }}
                  end={{ x: 0.8, y: 1 }}
                >
                  <Text
                    style={[
                      styles.actionText,
                      isPremium && styles.premiumActionText,
                    ]}
                  >
                    {actionText}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </CardBase>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    padding: 20,
  },
  premiumContent: {
    padding: 20,
    paddingBottom: 16,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    color: Colors.light.text,
    fontWeight: "700",
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  premiumTitle: {
    fontSize: 24,
    letterSpacing: 0.3,
  },
  description: {
    fontSize: 15,
    color: Colors.light.text,
    opacity: 0.8,
    marginBottom: 12,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  premiumDescription: {
    fontSize: 16,
    lineHeight: 22,
    opacity: 0.9,
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
  actionContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  actionButton: {
    borderRadius: 14,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  premiumActionButton: {
    borderRadius: 14,
  },
  actionGradient: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  actionText: {
    color: Colors.light.text,
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  premiumActionText: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  sparkleContainer: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
  },
  sparkle: {
    fontSize: 20,
  },
});
