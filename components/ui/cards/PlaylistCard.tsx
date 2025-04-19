import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ViewStyle,
  Animated,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useRef, useCallback } from "react";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from 'expo-haptics';

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

  const handlePress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({
      pathname: "/playlist/[id]",
      params: { id }
    });
  }, [id, router]);

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <BlurView
          intensity={8}
          tint="light"
          style={{
            borderRadius: 16,
            overflow: 'hidden',
          }}
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
              <Text numberOfLines={1} style={styles.author}>{author}</Text>
              {duration && (
                <View style={styles.durationContainer}>
                  <Text style={styles.duration}>◷ {duration}</Text>
                </View>
              )}
            </View>
            <TouchableOpacity
              style={styles.playButton}
              onPress={handlePress}
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
    color: Colors.light.textSecondary,
    letterSpacing: 0.1,
  },
  durationContainer: {
    marginTop: 4,
  },
  duration: {
    fontSize: 13,
    color: Colors.light.textSecondary,
    opacity: 0.8,
    letterSpacing: 0.1,
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
