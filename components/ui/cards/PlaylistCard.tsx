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
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.42;
const CARD_ASPECT_RATIO = 1.5;
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
          {/* Black Overlay */}
          <View style={styles.blackOverlay} />

          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.7)", "rgba(0,0,0,0.9)"]}
            style={styles.overlayGradient}
            start={{ x: 0.5, y: 0.3 }}
            end={{ x: 0.5, y: 1 }}
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
            <BlurView
              intensity={40}
              tint="dark"
              style={styles.favoriteButtonBlur}
            >
              <Ionicons
                name={isFavorited ? "heart" : "heart-outline"}
                size={20}
                color={isFavorited ? Colors.dark.primary : Colors.dark.text}
              />
            </BlurView>
          </TouchableOpacity>

          <View style={styles.contentOverlay}>
            <TouchableOpacity
              style={styles.playButton}
              onPress={handlePress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <BlurView
                intensity={40}
                tint="dark"
                style={styles.playButtonBlur}
              />
              <LinearGradient
                colors={Colors.gradients.primary}
                style={styles.playButtonGradient}
                start={{ x: 0.2, y: 0 }}
                end={{ x: 0.8, y: 1 }}
              >
                <Ionicons
                  name="play"
                  size={18}
                  color="#FFFFFF"
                  style={{ marginLeft: 2 }}
                />
              </LinearGradient>
            </TouchableOpacity>

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
                    size={13}
                    color={Colors.dark.textSecondary}
                    style={{ marginRight: 4 }}
                  />
                  <Text style={styles.duration}>{duration}</Text>
                </View>
              )}
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  touchableWrapper: {
    borderRadius: 20,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    backgroundColor: "transparent",
  },
  cardInnerContainer: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: Colors.dark.card,
    borderWidth: 1,
    borderColor: Colors.dark.cardBorder,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  blackOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  overlayGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteButtonBlur: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  contentOverlay: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  textContent: {
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.dark.text,
    letterSpacing: 0.1,
    textAlign: "left",
  },
  author: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    fontWeight: "500",
    letterSpacing: 0.1,
    textAlign: "left",
  },
  durationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  duration: {
    fontSize: 13,
    color: Colors.dark.textSecondary,
    letterSpacing: 0.1,
    fontWeight: "500",
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  playButtonBlur: {
    ...StyleSheet.absoluteFillObject,
  },
  playButtonGradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
