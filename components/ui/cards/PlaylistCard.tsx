import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ViewStyle,
  Animated,
} from "react-native";
import { IconSymbol } from "../IconSymbol";
import Colors from "@/constants/Colors";
import { CardBase } from "./CardBase";
import { useRef, useCallback } from "react";

interface PlaylistCardProps {
  title: string;
  image: string;
  author?: string;
  duration?: string;
  style?: ViewStyle;
  onPress?: () => void;
  onOptionsPress?: () => void;
}

export function PlaylistCard({
  title,
  image,
  author = "by Innertune",
  duration,
  style,
  onPress,
  onOptionsPress,
}: PlaylistCardProps) {
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
        style={[styles.container, style]}
        onPress={onPress}
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
              style={styles.optionsButton}
              onPress={onOptionsPress}
              hitSlop={8}
            >
              <IconSymbol
                name="ellipsis"
                size={20}
                color="rgba(255, 255, 255, 0.6)"
              />
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
  optionsButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.pill,
  },
});
