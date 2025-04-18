import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  ImageBackground,
  Animated,
  Platform
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import Colors from "@/constants/Colors";
import { useRef, useCallback } from "react";

interface LastSessionCardProps {
  id: string;
  title: string;
  image: string;
  style?: ViewStyle;
  onPress?: () => void;
}

export function LastSessionCard({
  id,
  title,
  image,
  style,
  onPress,
}: LastSessionCardProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(() => {
    Animated.spring(scale, {
      toValue: 0.97,
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
    <Animated.View style={{ transform: [{ scale }], ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.12, shadowRadius: 3.84 }, android: { elevation: 2 } }) }}>
      <TouchableOpacity
        style={[styles.container, style]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <ImageBackground
          source={{ uri: image }}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.55)", "rgba(0,0,0,0.15)"]}
            style={styles.gradientOverlay}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          <View style={styles.textContainer}>
            <Text numberOfLines={1} style={styles.title}>
              {title}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    marginBottom: 10,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  imageBackground: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  imageStyle: {
    borderRadius: 14,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 14,
  },
  topContent: {
    display: "none"
  },
  bottomContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingBottom: 8,
    justifyContent: "flex-start",
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  playGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  playText: {
    color: Colors.light.text,
    fontSize: 15,
    fontWeight: "bold",
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.light.text,
    letterSpacing: 0.2,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
