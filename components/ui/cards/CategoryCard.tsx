import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Animated,
  Dimensions,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");
const SPACING = 16;
const CARD_WIDTH = width - SPACING * 2;
const CARD_HEIGHT = 90;

interface CategoryCardProps {
  id: string;
  title: string;
  image: string;
  author: string;
  duration?: string;
  style?: ViewStyle;
  index?: number;
  onPress?: () => void;
}

export function CategoryCard({
  id,
  title,
  image,
  author,
  duration,
  style,
  index = 0,
  onPress,
}: CategoryCardProps) {
  const router = useRouter();
  const scale = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onPress) {
      onPress();
    } else {
      router.push({
        pathname: "/playlist/[id]",
        params: { id },
      });
    }
  };

  return (
    <Animated.View
      style={[
        {
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          marginBottom: 12,
          opacity: fadeAnim,
          transform: [{ scale }],
        },
        style,
      ]}
    >
      <TouchableOpacity
        style={styles.categoryCard}
        activeOpacity={0.95}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View style={styles.cardContent}>
          {/* Left side - Image */}
          <View style={styles.imageContainer}>
            <ImageBackground
              source={{ uri: image }}
              style={styles.cardImage}
              imageStyle={styles.cardImageStyle}
            >
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.3)"]}
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
              />
            </ImageBackground>
          </View>

          {/* Right side - Content */}
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle} numberOfLines={2}>
              {title}
            </Text>
            <Text style={styles.cardSubtitle} numberOfLines={1}>
              {author}
            </Text>
            {duration && (
              <View style={styles.durationContainer}>
                <Ionicons
                  name="time-outline"
                  size={12}
                  color={Colors.light.textSecondary}
                />
                <Text style={styles.durationText}>{duration}</Text>
              </View>
            )}
          </View>

          {/* Play button */}
          <TouchableOpacity style={styles.playButton} onPress={handlePress}>
            <LinearGradient
              colors={Colors.gradients.primary}
              style={styles.playButtonGradient}
              start={{ x: 0.2, y: 0 }}
              end={{ x: 0.8, y: 1 }}
            >
              <Ionicons
                name="play"
                size={20}
                color="#FFFFFF"
                style={{ marginLeft: 2 }}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  categoryCard: {
    width: "100%",
    height: "100%",
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: Colors.dark.card,
    borderWidth: 1,
    borderColor: Colors.dark.cardBorder,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 16,
    height: "100%",
  },
  imageContainer: {
    width: CARD_HEIGHT,
    height: "100%",
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  cardImageStyle: {
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 16,
    paddingRight: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 3,
  },
  cardSubtitle: {
    fontSize: 13,
    color: Colors.light.textSecondary,
    marginBottom: 4,
  },
  durationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  durationText: {
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  playButtonGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});
