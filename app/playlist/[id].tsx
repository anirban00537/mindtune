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
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { AffirmationCard } from "@/components/ui/cards/AffirmationCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState, useRef, useCallback, useEffect } from "react";
import * as Haptics from "expo-haptics";
import MediaPlayer from "@/components/ui/MediaPlayer";
import { useMediaPlayer } from "@/context/MediaPlayerContext";

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

const COVER_IMAGE_SIZE = Dimensions.get("window").width * 0.45;

export default function PlaylistDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isSaved, setIsSaved] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { showPlayer } = useMediaPlayer();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const imageScale = useRef(new Animated.Value(0)).current;

  const playlist = playlists[id as string];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(imageScale, {
        toValue: 1,
        tension: 40,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.spring(buttonScale, {
      toValue: 0.95,
      tension: 50,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressOut = useCallback(() => {
    Animated.spring(buttonScale, {
      toValue: 1,
      tension: 50,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, []);

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
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#2A1840", "#050812", "#050812", "#050812", "#050812"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <Animated.ScrollView
        style={[styles.scrollView, { opacity: fadeAnim }]}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: insets.top + 10, paddingBottom: insets.bottom + 120 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              router.back();
            }}
          >
            <Ionicons name="chevron-back" size={24} color={Colors.light.text} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={toggleSave}>
            <Ionicons
              name={isSaved ? "heart" : "heart-outline"}
              size={24}
              color={isSaved ? Colors.light.primary : Colors.light.text}
            />
          </TouchableOpacity>
        </View>

        <Animated.View
          style={[
            styles.coverImageContainer,
            { transform: [{ scale: imageScale }] },
          ]}
        >
          <Image source={{ uri: playlist.image }} style={styles.coverImage} />
        </Animated.View>

        <View style={styles.titleSection}>
          <Text style={styles.title}>{playlist.title}</Text>
          <Text style={styles.author}>by {playlist.author}</Text>
          <Text style={styles.description}>{playlist.description}</Text>
        </View>

        <View style={styles.playButtonContainer}>
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity
              style={styles.playButton}
              onPress={handlePlayPress}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              activeOpacity={0.9}
            >
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
              <Text style={styles.playButtonText}>
                {isPlaying ? "Pause" : "Play"}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Affirmations</Text>
            <TouchableOpacity
              style={styles.shuffleButton}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
            >
              <Ionicons name="shuffle" size={18} color={Colors.light.text} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  coverImageContainer: {
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 12,
  },
  coverImage: {
    width: COVER_IMAGE_SIZE,
    height: COVER_IMAGE_SIZE,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  titleSection: {
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: Colors.light.text,
    textAlign: "center",
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  author: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.light.textSecondary,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    color: Colors.light.textSecondary,
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  playButtonContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  playButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 170,
    height: 52,
    borderRadius: 26,
    overflow: "hidden",
    gap: 8,
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  playButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: Colors.light.text,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: Colors.light.text,
    letterSpacing: 0.2,
  },
  shuffleButton: {
    padding: 6,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  affirmationCard: {
    marginBottom: 12,
  },
  notFoundTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.light.text,
    textAlign: "center",
  },
});
