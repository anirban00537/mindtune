import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ViewStyle,
  Animated,
  Platform,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useRef, useCallback } from "react";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.42;
const CARD_ASPECT_RATIO = 1;
const CARD_HEIGHT = CARD_WIDTH * CARD_ASPECT_RATIO;

interface PlaylistCardProps {
  id: string;
  title: string;
  image: string;
  author?: string;
  duration?: string;
  style?: ViewStyle;
  onOptionsPress?: () => void;
  isFavorited?: boolean;
  onFavoritePress?: () => void;
}

export function PlaylistCard({
  id,
  title,
  image,
  author = "by Mindtune",
  duration,
  style,
  onOptionsPress,
  isFavorited = false,
  onFavoritePress,
}: PlaylistCardProps) {
  const router = useRouter();
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(() => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: Platform.OS !== "web",
    }).start();
  }, [scale]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 5,
      useNativeDriver: Platform.OS !== "web",
    }).start();
  }, [scale]);

  const handlePress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({
      pathname: "/playlist/[id]",
      params: { id },
    });
  }, [id, router]);

  return (
    <Animated.View
      style={[
        { transform: [{ scale }] },
        styles.touchableWrapper,
        { width: CARD_WIDTH, height: CARD_HEIGHT },
        style,
      ]}
    >
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.95}
        style={styles.cardInnerContainer}
      >
        <ImageBackground
          source={{ uri: image }}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          {/* Simple gradient overlay for better text readability */}
          <LinearGradient
            colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.9)"]}
            style={styles.overlayGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            locations={[0.3, 1] as const}
          />

          {/* Favorite Button */}
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              onFavoritePress?.();
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={isFavorited ? "heart" : "heart-outline"}
              size={18}
              color={isFavorited ? "#FF3B30" : "#FFFFFF"}
            />
          </TouchableOpacity>

          <View style={styles.contentOverlay}>
            <View style={styles.textContent}>
              <Text numberOfLines={2} style={styles.title}>
                {title}
              </Text>
              <Text numberOfLines={1} style={styles.author}>
                {author}
              </Text>
              {duration && (
                <View style={styles.durationContainer}>
                  <Ionicons
                    name="time-outline"
                    size={12}
                    color="rgba(255,255,255,0.7)"
                    style={{ marginRight: 3 }}
                  />
                  <Text style={styles.duration}>{duration}</Text>
                </View>
              )}
            </View>

            {/* Play button */}
            <TouchableOpacity
              style={styles.playButton}
              onPress={handlePress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <View style={styles.playButtonBg}>
                <Ionicons
                  name="play"
                  size={18}
                  color="#FFFFFF"
                  style={{ marginLeft: 1 }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  touchableWrapper: {
    borderRadius: 16,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    backgroundColor: "transparent",
  },
  cardInnerContainer: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: Colors.dark.card,
    borderWidth: 0,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlayGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  contentOverlay: {
    padding: 14,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  textContent: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "left",
    marginBottom: 4,
  },
  author: {
    fontSize: 13,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "500",
    textAlign: "left",
    marginBottom: 3,
  },
  durationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  duration: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    fontWeight: "500",
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  playButtonBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
});
