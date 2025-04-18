import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ViewStyle,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { CardBase } from "./CardBase";
import { useRef, useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

interface PlaylistCardProps {
  id: string;
  title: string;
  image: string;
  author?: string;
  duration?: string;
  style?: ViewStyle;
  onOptionsPress?: () => void;
}

export function PlaylistCard({
  id,
  title,
  image,
  author = "by Mindtune",
  duration,
  style,
  onOptionsPress,
}: PlaylistCardProps) {
  const router = useRouter();
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

  const handlePress = () => {
    router.push(`/playlist/${id}`);
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        style={[styles.container, style]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <CardBase intensity={20}>
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
            <TouchableOpacity
              style={styles.playButton}
              onPress={handlePress}
              hitSlop={8}
            >
              <LinearGradient
                colors={Colors.gradients.button}
                style={styles.playGradient}
                start={{ x: 0.2, y: 0 }}
                end={{ x: 0.8, y: 1 }}
              >
                <Ionicons
                  name="play"
                  size={20}
                  color="rgba(255, 255, 255, 0.6)"
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </CardBase>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 12,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
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
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: "hidden",
  },
  playGradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
