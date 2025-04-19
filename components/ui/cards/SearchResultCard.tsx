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
import { useRef, useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

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
      toValue: 0.96,
      useNativeDriver: Platform.OS !== 'web',
    }).start();
  }, [scale]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: Platform.OS !== 'web',
    }).start();
  }, [scale]);

  const handleCombinedPress = () => {
    Animated.sequence([
      Animated.timing(playScale, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.spring(playScale, {
        toValue: 1,
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]).start(onPress ? onPress : undefined);
  };

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <TouchableOpacity
        onPress={handleCombinedPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <BlurView
          intensity={60}
          tint="dark"
          style={styles.cardBase}
        >
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
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
            <Animated.View style={[styles.playButtonContainer, { transform: [{ scale: playScale }] }]}>
              <TouchableOpacity
                style={styles.playButton}
                onPress={handleCombinedPress}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <BlurView
                  intensity={20}
                  tint="dark"
                  style={StyleSheet.absoluteFill}
                />
                <LinearGradient
                  colors={Colors.gradients.primary}
                  style={styles.playButtonGradient}
                  start={{ x: 0.2, y: 0 }}
                  end={{ x: 0.8, y: 1 }}
                >
                  <Ionicons name="play" size={20} color="#FFFFFF" />
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </BlurView>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardBase: {
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    margin: 8,
  },
  textContainer: {
    flex: 1,
    paddingVertical: 12,
    paddingLeft: 4,
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
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 6,
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  durationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  duration: {
    fontSize: 13,
    color: Colors.light.textSecondary,
    opacity: 0.8,
    letterSpacing: 0.1,
  },
  playButtonContainer: {
    marginLeft: 8,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  playButtonGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
