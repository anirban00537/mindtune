import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Platform,
  Animated,
  StatusBar,
  ViewStyle,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { AffirmationCard } from "@/components/ui/cards/AffirmationCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState, useRef, useCallback, useEffect } from "react";
import * as Haptics from 'expo-haptics';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const HEADER_HEIGHT = SCREEN_WIDTH;
const HEADER_MIN_HEIGHT = 300; // Fixed minimum height
const HEADER_SCROLL_DISTANCE = HEADER_HEIGHT - HEADER_MIN_HEIGHT;
const HEADER_STICKY_THRESHOLD = HEADER_SCROLL_DISTANCE * 0.6;

interface Affirmation {
  id: string;
  text: string;
}

interface PlaylistDetail {
  id: string;
  title: string;
  author: string;
  description: string;
  image: string;
  duration: string;
  affirmations: Affirmation[];
}

// Mock data following the same pattern as home screen
const playlists: Record<string, PlaylistDetail> = {
  "1": {
    id: "1",
    title: "Daily Money Affirmations",
    author: "MindTune",
    description:
      "Transform your relationship with wealth through powerful daily affirmations",
    image:
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    duration: "15 min",
    affirmations: [
      {
        id: "1",
        text: "I am a money magnet, and prosperity flows to me easily",
      },
      { id: "2", text: "I deserve abundance and welcome wealth into my life" },
      { id: "3", text: "Money comes to me in expected and unexpected ways" },
      { id: "4", text: "I am worthy of all the abundance the universe offers" },
      { id: "5", text: "My actions create constant prosperity" },
    ],
  },
};

export default function PlaylistDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isSaved, setIsSaved] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  
  const scrollY = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const saveButtonRotation = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const playlist = playlists[id as string];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressIn = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.spring(buttonScale, {
      toValue: 0.92,
      tension: 40,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressOut = useCallback(() => {
    Animated.spring(buttonScale, {
      toValue: 1,
      tension: 40,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, []);

  const toggleSave = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsSaved((prev) => !prev);
    Animated.sequence([
      Animated.timing(saveButtonRotation, {
        toValue: isSaved ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isSaved]);

  const togglePlay = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsPlaying((prev) => !prev);
  }, []);

  // Enhanced Header Animations
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: "clamp",
  });

  const imageScale = scrollY.interpolate({
    inputRange: [-100, 0],
    outputRange: [1.2, 1],
    extrapolateRight: "clamp",
  });

  const imageBlur = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 10],
    extrapolate: "clamp",
  });

  const headerContentOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE * 0.8],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const saveButtonRotateInterpolate = saveButtonRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  if (!playlist) {
    return (
      <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.title}>Playlist not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#050812", "#101830", "#1A304A", "#2A1840", "#03040A"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <Animated.ScrollView
        style={[styles.scrollView, { opacity: fadeAnim }]}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: HEADER_HEIGHT + 32 },
        ]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        bounces={true}
        overScrollMode="always"
      >
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Affirmations</Text>
            <TouchableOpacity 
              style={styles.seeAllButton}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
            >
              <Text style={styles.seeAllText}>Shuffle</Text>
              <IconSymbol
                name="shuffle"
                size={16}
                color={Colors.light.primary}
              />
            </TouchableOpacity>
          </View>
          {playlist.affirmations.map((affirmation, index) => (
            <Animated.View
              key={affirmation.id}
              style={{
                opacity: fadeAnim,
                transform: [{
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                }],
              }}
            >
              <AffirmationCard
                text={affirmation.text}
                style={styles.affirmationCard}
              />
            </Animated.View>
          ))}
        </View>
      </Animated.ScrollView>

      <Animated.View
        style={[
          styles.header,
          {
            height: headerHeight,
            transform: [{ translateY: headerTranslateY }],
          },
        ]}
      >
        {imageLoading && (
          <View style={styles.imageLoadingContainer}>
            <ActivityIndicator size="large" color={Colors.light.primary} />
          </View>
        )}
        
        <Animated.Image
          source={{ uri: playlist.image }}
          style={[
            StyleSheet.absoluteFill,
            {
              transform: [{ scale: imageScale }],
              opacity: headerContentOpacity,
            },
          ]}
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
          onError={() => setImageError(true)}
          resizeMode="cover"
        />

        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)", "rgba(0,0,0,0.9)"]}
          style={[StyleSheet.absoluteFill, styles.headerGradient]}
          start={{ x: 0.5, y: 0.4 }}
          end={{ x: 0.5, y: 1 }}
        />

        <Animated.View
          style={[
            styles.headerContent,
            { opacity: headerContentOpacity },
          ]}
        >
          <Text style={styles.headerTitle} numberOfLines={2}>
            {playlist.title}
          </Text>
          <Text style={styles.headerAuthor} numberOfLines={1}>
            {playlist.author}
          </Text>
          <Text style={styles.headerDescription} numberOfLines={2}>
            {playlist.description}
          </Text>
        </Animated.View>

        <View style={styles.floatingButtonsContainer}>
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity
              style={[styles.floatingPlayButton, isPlaying && styles.floatingPlayButtonActive]}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={togglePlay}
            >
              <BlurView
                intensity={25}
                tint="dark"
                style={StyleSheet.absoluteFill}
              />
              <LinearGradient
                colors={Colors.gradients.primary}
                style={StyleSheet.absoluteFill}
                start={{ x: 0.2, y: 0 }}
                end={{ x: 0.8, y: 1 }}
              />
              <Ionicons 
                name={isPlaying ? "pause" : "play"} 
                size={32} 
                color="#FFFFFF" 
              />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            style={{
              transform: [
                { scale: buttonScale },
                { rotate: saveButtonRotateInterpolate },
              ],
            }}
          >
            <TouchableOpacity
              style={[styles.floatingSaveButton, isSaved && styles.floatingSaveButtonActive]}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={toggleSave}
            >
              <BlurView
                intensity={25}
                tint="dark"
                style={StyleSheet.absoluteFill}
              />
              <Ionicons
                name={isSaved ? "heart" : "heart-outline"}
                size={24}
                color={isSaved ? Colors.light.primary : "#FFFFFF"}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Animated.View>

      <TouchableOpacity
        style={[styles.backButton, { marginTop: insets.top }]}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          router.back();
        }}
      >
        <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
        <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
    zIndex: 1,
  },
  headerGradient: {
    opacity: 0.9,
  },
  headerContent: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 88,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.light.text,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  headerAuthor: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.textSecondary,
    opacity: 0.9,
    marginBottom: 8,
  },
  headerDescription: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    opacity: 0.8,
    lineHeight: 20,
  },
  imageLoadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  floatingButtonsContainer: {
    position: "absolute",
    right: 16,
    bottom: 20,
    flexDirection: "row",
    gap: 12,
    zIndex: 2,
  },
  floatingPlayButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.light.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  } as ViewStyle,
  floatingPlayButtonActive: {
    transform: [{ scale: 1.05 }],
  } as ViewStyle,
  floatingSaveButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  } as ViewStyle,
  floatingSaveButtonActive: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderColor: Colors.light.primary,
  } as ViewStyle,
  backButton: {
    position: "absolute",
    top: 0,
    left: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    overflow: "hidden",
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.light.text,
    letterSpacing: 0.3,
  },
  affirmationCard: {
    marginBottom: 12,
  } as ViewStyle,
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  seeAllText: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.light.primary,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.light.text,
    textAlign: "center",
  },
});
