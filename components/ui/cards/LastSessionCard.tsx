import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ViewStyle,
  Animated,
  Platform
} from "react-native";
import Colors from "@/constants/Colors";
import { useRef, useCallback } from "react";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

interface LastSessionCardProps {
  id: string;
  title: string;
  image: string;
  author?: string;
  duration?: string;
  style?: ViewStyle;
  onPress?: () => void;
}

export function LastSessionCard({
  id,
  title,
  image,
  author = "by MindTune",
  duration,
  style,
  onPress,
}: LastSessionCardProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(() => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressOut = useCallback(() => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
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
            <Image
              source={{ uri: image }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.title}>
                {title}
              </Text>
              <Text style={styles.author}>{author}</Text>
              {duration && (
                <View style={styles.durationContainer}>
                  <Text style={styles.duration}>◷ {duration}</Text>
                </View>
              )}
            </View>
          </View>
        </BlurView>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardBase: {
    width: "100%",
    marginBottom: 12,
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
    padding: 5,
    gap: 12,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 12,
  },
  textContent: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
    letterSpacing: 0.2,
  },
  author: {
    fontSize: 14,
    color: Colors.light.text,
    opacity: 0.6,
  },
  durationContainer: {
    marginTop: 2,
  },
  duration: {
    fontSize: 13,
    color: Colors.light.text,
    opacity: 0.5,
    letterSpacing: 0.1,
  },
});
