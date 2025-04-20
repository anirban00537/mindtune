import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  Animated,
  StatusBar,
  ViewStyle,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { AffirmationCard } from "@/components/ui/cards/AffirmationCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState, useRef, useCallback, useEffect } from "react";
import * as Haptics from "expo-haptics";
import { useMediaPlayer } from "@/context/MediaPlayerContext";
import { BlurView } from "expo-blur";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

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
  ls1: {
    id: "ls1",
    title: "Be A Better Friend",
    author: "MindTune",
    description: "Improve your relationships through daily affirmations",
    image:
      "https://images.unsplash.com/photo-1508672115270-a8f55e83f9b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    duration: "10 min",
    affirmations: [
      { id: "1", text: "I am a caring and supportive friend" },
      { id: "2", text: "I listen with empathy and understanding" },
      { id: "3", text: "I bring joy and positivity to my friendships" },
      { id: "4", text: "I respect and value my friends" },
      { id: "5", text: "I attract meaningful friendships" },
    ],
  },
  ls2: {
    id: "ls2",
    title: "Be Happy",
    author: "MindTune",
    description: "Cultivate happiness and joy in your daily life",
    image:
      "https://images.unsplash.com/photo-1494783367193-149034c05e8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    duration: "12 min",
    affirmations: [
      { id: "1", text: "I choose happiness in every moment" },
      { id: "2", text: "I am worthy of joy and happiness" },
      { id: "3", text: "I radiate positive energy" },
      { id: "4", text: "I find joy in the simple things" },
      { id: "5", text: "My happiness comes from within" },
    ],
  },
  exp1: {
    id: "exp1",
    title: "Money Manifestation",
    author: "Wealth Vibes",
    description: "Manifest abundance and prosperity in your life",
    image:
      "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    duration: "15 min",
    affirmations: [
      { id: "1", text: "I am a money magnet" },
      { id: "2", text: "Wealth flows to me easily" },
      { id: "3", text: "I deserve financial abundance" },
      { id: "4", text: "Money comes to me in expected and unexpected ways" },
      { id: "5", text: "I am worthy of all the abundance the universe offers" },
    ],
  },
  bp1: {
    id: "bp1",
    title: "Focus Enhancement",
    author: "Cognitive Boost",
    description: "Enhance your focus and mental clarity",
    image:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    duration: "10 min",
    affirmations: [
      { id: "1", text: "My mind is clear and focused" },
      { id: "2", text: "I concentrate easily on any task" },
      { id: "3", text: "I am present and mindful" },
      { id: "4", text: "My attention is sharp and precise" },
      { id: "5", text: "I accomplish tasks with ease and focus" },
    ],
  },
  ea1: {
    id: "ea1",
    title: "Confident Test Taking",
    author: "Study Success",
    description: "Build confidence for exams and assessments",
    image:
      "https://images.unsplash.com/photo-1453928582365-b6ad33cb1289?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    duration: "12 min",
    affirmations: [
      { id: "1", text: "I am well-prepared and confident" },
      { id: "2", text: "I recall information easily" },
      { id: "3", text: "I remain calm during tests" },
      { id: "4", text: "I trust in my knowledge and abilities" },
      { id: "5", text: "I perform excellently under pressure" },
    ],
  },
};

export default function PlaylistDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isSaved, setIsSaved] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { showPlayer } = useMediaPlayer();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Animation values for sliding up content
  const contentSlideUp = useRef(new Animated.Value(50)).current;
  const buttonsSlideUp = useRef(new Animated.Value(50)).current;
  const cardsSlideUp = useRef(new Animated.Value(100)).current;

  // Animation values for affirmation cards
  const affirmationOpacities = useRef<Animated.Value[]>([]).current;

  const playlist = playlists[id as string];

  // Populate affirmation opacity values
  if (
    playlist &&
    affirmationOpacities.length !== playlist.affirmations.length
  ) {
    affirmationOpacities.length = 0;
    playlist.affirmations.forEach(() => {
      affirmationOpacities.push(new Animated.Value(0));
    });
  }

  // Start pulse animation for play button
  useEffect(() => {
    if (!isPlaying) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.08,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      // Stop the animation if playing
      pulseAnim.setValue(1);
    }
  }, [isPlaying]);

  // Initial entrance animations
  useEffect(() => {
    if (!playlist) return;

    const cardAnimations = affirmationOpacities.map((opacity) =>
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      })
    );

    // Sequence of entrance animations
    Animated.stagger(100, [
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(contentSlideUp, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(buttonsSlideUp, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(cardsSlideUp, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      ...cardAnimations,
    ]).start();
  }, [fadeAnim, playlist]);

  const toggleSave = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsSaved((prev) => !prev);
  }, []);

  const handlePlayPress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (playlist) {
      showPlayer(playlist);
      setIsPlaying(true);
    }
  }, [playlist, showPlayer]);

  if (!playlist) {
    return (
      <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
        <LinearGradient
          colors={["#050812", "#101830", "#1A304A", "#2A1840", "#03040A"]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <Text style={styles.notFoundTitle}>Playlist not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* Full screen background image */}
      <Image
        source={{ uri: playlist.image }}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* Overlay gradients */}
      <LinearGradient
        colors={[
          "rgba(0,0,0,0.7)",
          "rgba(5,8,18,0.85)",
          "rgba(5,8,18,0.95)",
          "#050812",
        ]}
        style={styles.overlay}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* Top navigation bar */}
      <Animated.View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.back();
          }}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton} onPress={() => {}}>
            <Ionicons name="share-outline" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={toggleSave}>
            <Ionicons
              name={isSaved ? "heart" : "heart-outline"}
              size={24}
              color={isSaved ? Colors.light.primary : "#FFFFFF"}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Main content */}
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: insets.bottom + 40 },
        ]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {/* Top spacer to position content below the image */}
        <View style={{ height: SCREEN_HEIGHT * 0.35 }} />

        {/* Content card */}
        <Animated.View
          style={[
            styles.contentCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: contentSlideUp }],
            },
          ]}
        >
          <View style={styles.titleSection}>
            <Text style={styles.title}>{playlist.title}</Text>
            <Text style={styles.author}>By {playlist.author}</Text>
            <View style={styles.metaInfo}>
              <View style={styles.durationBadge}>
                <Ionicons name="time-outline" size={14} color="#FFFFFF" />
                <Text style={styles.durationText}>{playlist.duration}</Text>
              </View>
              <Text style={styles.divider}>•</Text>
              <Text style={styles.countText}>
                {playlist.affirmations.length} affirmations
              </Text>
            </View>
            <Text style={styles.description}>{playlist.description}</Text>
          </View>

          {/* Controls section */}
          <Animated.View
            style={[
              styles.controls,
              { transform: [{ translateY: buttonsSlideUp }] },
            ]}
          >
            <View style={styles.controlButtons}>
              <TouchableOpacity style={styles.controlButton}>
                <Ionicons name="shuffle-outline" size={20} color="#FFFFFF" />
                <Text style={styles.controlText}>Shuffle</Text>
              </TouchableOpacity>

              <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                <TouchableOpacity
                  style={styles.playButton}
                  onPress={handlePlayPress}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={Colors.gradients.primary}
                    style={[StyleSheet.absoluteFill, { borderRadius: 36 }]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  />
                  <View style={styles.playButtonInner}>
                    <Ionicons
                      name={isPlaying ? "pause" : "play"}
                      size={32}
                      color="#FFFFFF"
                    />
                  </View>
                </TouchableOpacity>
              </Animated.View>

              <TouchableOpacity style={styles.controlButton}>
                <MaterialCommunityIcons
                  name="playlist-music-outline"
                  size={22}
                  color="#FFFFFF"
                />
                <Text style={styles.controlText}>Queue</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Animated.View>

        {/* Affirmations section */}
        <Animated.View
          style={[
            styles.affirmationsSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: cardsSlideUp }],
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Affirmations</Text>
            <TouchableOpacity
              style={styles.moreButton}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
            >
              <Text style={styles.moreButtonText}>View All</Text>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={Colors.light.primary}
              />
            </TouchableOpacity>
          </View>

          {playlist.affirmations.map((affirmation, index) => (
            <Animated.View
              key={affirmation.id}
              style={{
                opacity: affirmationOpacities[index],
                transform: [
                  {
                    translateX: affirmationOpacities[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              }}
            >
              <View style={styles.affirmationCardWrapper}>
                <View style={styles.affirmationNumber}>
                  <Text style={styles.affirmationNumberText}>{index + 1}</Text>
                </View>
                <View style={styles.affirmationContent}>
                  <Text style={styles.affirmationText}>{affirmation.text}</Text>
                </View>
                <TouchableOpacity style={styles.affirmationButton}>
                  <Ionicons
                    name="play-circle-outline"
                    size={24}
                    color="rgba(255,255,255,0.7)"
                  />
                </TouchableOpacity>
              </View>
            </Animated.View>
          ))}
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050812",
  },
  backgroundImage: {
    position: "absolute",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.55,
    top: 0,
  },
  overlay: {
    position: "absolute",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    top: 0,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 60,
  },
  headerActions: {
    flexDirection: "row",
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(10px)",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 0,
  },
  contentCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 24,
    backgroundColor: "rgba(30, 30, 50, 0.4)",
    backdropFilter: "blur(8px)",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  titleSection: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  author: {
    fontSize: 16,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 12,
  },
  metaInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  durationBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  durationText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  divider: {
    marginHorizontal: 8,
    color: "rgba(255, 255, 255, 0.6)",
  },
  countText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
    fontWeight: "500",
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "rgba(255, 255, 255, 0.7)",
  },
  controls: {
    paddingVertical: 24,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  controlButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  controlButton: {
    alignItems: "center",
    gap: 8,
  },
  controlText: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.8)",
  },
  playButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  playButtonInner: {
    width: 68,
    height: 68,
    borderRadius: 34,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  affirmationsSection: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  moreButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  moreButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.light.primary,
  },
  affirmationCardWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(30, 30, 50, 0.3)",
    marginBottom: 12,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  affirmationNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  affirmationNumberText: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.8)",
  },
  affirmationContent: {
    flex: 1,
  },
  affirmationText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
    lineHeight: 22,
  },
  affirmationButton: {
    padding: 8,
  },
  notFoundTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
});
