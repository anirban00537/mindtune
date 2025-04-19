import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ViewStyle,
  Platform,
  Animated,
} from "react-native";
import { BlurView } from "expo-blur";
import Colors from "@/constants/Colors";
import { CardBase } from "./CardBase";
import { useRef, useCallback } from "react";

interface SearchResultCardProps {
  title: string;
  description: string;
  duration: string;
  image: string;
  style?: ViewStyle;
  onPress?: () => void;
}

export function SearchResultCard({
  title,
  description,
  duration,
  image,
  style,
  onPress,
}: SearchResultCardProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const playScale = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(() => {
    Animated.spring(scale, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressOut = useCallback(() => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePlayPress = useCallback(() => {
    Animated.sequence([
      Animated.timing(playScale, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(playScale, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
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
          <View style={styles.contentContainer}>
            <Image
              source={{ uri: image }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.textContainer}>
              <Text numberOfLines={1} style={styles.title}>
                {title}
              </Text>
              <Text numberOfLines={2} style={styles.description}>
                {description}
              </Text>
              <View style={styles.durationContainer}>
                <Text style={styles.duration}>◷ {duration}</Text>
              </View>
            </View>
            <Animated.View style={{ transform: [{ scale: playScale }] }}>
              <TouchableOpacity
                style={styles.playButton}
                onPress={handlePlayPress}
              >
                <View style={styles.playGlass}>
                  <Text style={styles.playText}>▶</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </CardBase>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: "100%",
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  textContainer: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    color: Colors.light.text,
    fontWeight: "600",
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  description: {
    fontSize: 13,
    color: Colors.light.text,
    opacity: 0.8,
    marginBottom: 6,
    letterSpacing: 0.1,
    lineHeight: 18,
  },
  durationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  duration: {
    fontSize: 12,
    color: Colors.light.text,
    opacity: 0.6,
    letterSpacing: 0.2,
  },
  playButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    overflow: "hidden",
    marginRight: 12,
  },
  playGlass: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 17,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.12)",
  },
  playText: {
    color: Colors.light.text,
    fontSize: 15,
  },
});
