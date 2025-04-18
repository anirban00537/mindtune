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
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { AffirmationCard } from "@/components/ui/cards/AffirmationCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState, useRef, useCallback } from "react";

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
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  const playlist = playlists[id as string];

  if (!playlist) {
    return (
      <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.title}>Playlist not found</Text>
      </View>
    );
  }

  const handlePressIn = useCallback(() => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressOut = useCallback(() => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, []);

  // Header Animations
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
    inputRange: [-HEADER_HEIGHT, 0],
    outputRange: [2, 1],
    extrapolateRight: "clamp",
  });

  const imageTranslateY = scrollY.interpolate({
    inputRange: [-HEADER_HEIGHT, 0, HEADER_SCROLL_DISTANCE],
    outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_SCROLL_DISTANCE * 0.75],
    extrapolate: "clamp",
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_STICKY_THRESHOLD, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.8, 0.6],
    extrapolate: "clamp",
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE * 0.5],
    outputRange: [1, 0.8],
    extrapolate: "clamp",
  });

  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -8],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={Colors.gradients.background}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />

      <Animated.ScrollView
        style={styles.scrollView}
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
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>Shuffle</Text>
              <IconSymbol
                name="shuffle"
                size={16}
                color={Colors.light.primary}
              />
            </TouchableOpacity>
          </View>
          {playlist.affirmations.map((affirmation) => (
            <AffirmationCard
              key={affirmation.id}
              text={affirmation.text}
              style={styles.affirmationCard}
            />
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
        <Animated.Image
          source={{ uri: playlist.image }}
          style={[
            StyleSheet.absoluteFill,
            {
              transform: [
                { scale: imageScale },
                { translateY: imageTranslateY },
              ],
              opacity: imageOpacity,
            },
          ]}
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
            {
              transform: [
                { scale: titleScale },
                { translateY: titleTranslateY },
              ],
            },
          ]}
        >
          <Text style={styles.headerTitle} numberOfLines={1}>
            {playlist.title}
          </Text>
          <Text style={styles.headerAuthor} numberOfLines={1}>
            {playlist.author}
          </Text>
        </Animated.View>

        <View style={styles.floatingButtonsContainer}>
          <TouchableOpacity
            style={styles.floatingPlayButton}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
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
            <Ionicons name="play" size={32} color="#FFFFFF" />
          </TouchableOpacity>


        </View>
      </Animated.View>

      <TouchableOpacity
        style={[styles.backButton, { marginTop: insets.top }]}
        onPress={() => router.back()}
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
    backgroundColor: Colors.light.background,
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
    backgroundColor: Colors.light.background,
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
    fontSize: 24,
    fontWeight: "800",
    color: Colors.light.text,
    marginBottom: 4,
  },
  headerAuthor: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    opacity: 0.9,
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
  },
  floatingSaveButton: {
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
  },
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
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
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
