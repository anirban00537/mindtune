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
  ImageBackground,
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
  "ls1": {
    id: "ls1",
    title: "Be A Better Friend",
    author: "MindTune",
    description: "Improve your relationships through daily affirmations",
    image: "https://images.unsplash.com/photo-1508672115270-a8f55e83f9b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    duration: "10 min",
    affirmations: [
      { id: "1", text: "I am a caring and supportive friend" },
      { id: "2", text: "I listen with empathy and understanding" },
      { id: "3", text: "I bring joy and positivity to my friendships" },
      { id: "4", text: "I respect and value my friends" },
      { id: "5", text: "I attract meaningful friendships" },
    ],
  },
  "ls2": {
    id: "ls2",
    title: "Be Happy",
    author: "MindTune",
    description: "Cultivate happiness and joy in your daily life",
    image: "https://images.unsplash.com/photo-1494783367193-149034c05e8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    duration: "12 min",
    affirmations: [
      { id: "1", text: "I choose happiness in every moment" },
      { id: "2", text: "I am worthy of joy and happiness" },
      { id: "3", text: "I radiate positive energy" },
      { id: "4", text: "I find joy in the simple things" },
      { id: "5", text: "My happiness comes from within" },
    ],
  },
  "exp1": {
    id: "exp1",
    title: "Money Manifestation",
    author: "Wealth Vibes",
    description: "Manifest abundance and prosperity in your life",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    duration: "15 min",
    affirmations: [
      { id: "1", text: "I am a money magnet" },
      { id: "2", text: "Wealth flows to me easily" },
      { id: "3", text: "I deserve financial abundance" },
      { id: "4", text: "Money comes to me in expected and unexpected ways" },
      { id: "5", text: "I am worthy of all the abundance the universe offers" },
    ],
  },
  "bp1": {
    id: "bp1",
    title: "Focus Enhancement",
    author: "Cognitive Boost",
    description: "Enhance your focus and mental clarity",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    duration: "10 min",
    affirmations: [
      { id: "1", text: "My mind is clear and focused" },
      { id: "2", text: "I concentrate easily on any task" },
      { id: "3", text: "I am present and mindful" },
      { id: "4", text: "My attention is sharp and precise" },
      { id: "5", text: "I accomplish tasks with ease and focus" },
    ],
  },
  "ea1": {
    id: "ea1",
    title: "Confident Test Taking",
    author: "Study Success",
    description: "Build confidence for exams and assessments",
    image: "https://images.unsplash.com/photo-1453928582365-b6ad33cb1289?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    duration: "12 min",
    affirmations: [
      { id: "1", text: "I am well-prepared and confident" },
      { id: "2", text: "I recall information easily" },
      { id: "3", text: "I remain calm during tests" },
      { id: "4", text: "I trust in my knowledge and abilities" },
      { id: "5", text: "I perform excellently under pressure" },
    ],
  }
};

export default function PlaylistDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isSaved, setIsSaved] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

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
  }, []);

  const togglePlay = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsPlaying((prev) => !prev);
  }, []);

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
      <ImageBackground
        source={{ uri: playlist.image }}
        style={[StyleSheet.absoluteFill]}
        imageStyle={{ opacity: 0.7 }}
        resizeMode="cover"
      >
        <BlurView intensity={90} tint="dark" style={StyleSheet.absoluteFill}>
          <LinearGradient
            colors={[
              'rgba(5, 8, 18, 0.3)',
              'rgba(5, 8, 18, 0.7)',
              'rgba(5, 8, 18, 0.95)',
            ]}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        </BlurView>
      </ImageBackground>

      <Animated.ScrollView
        style={[styles.scrollView, { opacity: fadeAnim }]}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: insets.top },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              router.back();
            }}
          >
            <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
            <Ionicons name="chevron-back" size={24} color={Colors.light.text} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={toggleSave}
          >
            <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
            <Ionicons
              name={isSaved ? "heart" : "heart-outline"}
              size={24}
              color={isSaved ? Colors.light.primary : Colors.light.text}
            />
          </TouchableOpacity>
        </View>

        {/* Cover Art Section */}
        <View style={styles.coverArtSection}>
          <BlurView intensity={30} tint="dark" style={styles.coverArtContainer}>
            <Image
              source={{ uri: playlist.image }}
              style={styles.coverArt}
              resizeMode="cover"
            />
          </BlurView>
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>{playlist.title}</Text>
          <Text style={styles.author}>{playlist.author}</Text>
          <Text style={styles.description}>{playlist.description}</Text>
          
          <TouchableOpacity
            style={[styles.playButton, isPlaying && styles.playButtonActive]}
            onPress={togglePlay}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
            <LinearGradient
              colors={Colors.gradients.primary}
              style={StyleSheet.absoluteFill}
              start={{ x: 0.2, y: 0 }}
              end={{ x: 0.8, y: 1 }}
            />
            <Ionicons 
              name={isPlaying ? "pause" : "play"} 
              size={24} 
              color="#FFFFFF" 
            />
            <Text style={styles.playButtonText}>
              {isPlaying ? "Pause" : "Play"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Affirmations Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Affirmations</Text>
            <TouchableOpacity 
              style={styles.shuffleButton}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
            >
              <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
              <Text style={styles.shuffleText}>Shuffle</Text>
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
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  coverArtSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  coverArtContainer: {
    width: SCREEN_WIDTH * 0.6,
    height: SCREEN_WIDTH * 0.6,
    borderRadius: 24,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  coverArt: {
    width: '100%',
    height: '100%',
  },
  titleSection: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: Colors.light.text,
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.4,
  },
  author: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.light.textSecondary,
    marginBottom: 16,
    textAlign: 'center',
    opacity: 0.9,
  },
  description: {
    fontSize: 17,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    opacity: 0.8,
    maxWidth: '90%',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 180,
    height: 56,
    borderRadius: 28,
    overflow: "hidden",
    gap: 8,
  },
  playButtonActive: {
    transform: [{ scale: 0.98 }],
  },
  playButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
    letterSpacing: 0.3,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.light.text,
    letterSpacing: 0.3,
  },
  shuffleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    overflow: 'hidden',
  },
  shuffleText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.primary,
  },
  affirmationCard: {
    marginBottom: 16,
  },
});
