import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Animated,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/ui/Header";
import ContributionBanner from "@/components/ui/ContributionBanner";
import MediaPlayer from "@/components/ui/MediaPlayer";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { PlaylistCard } from "@/components/ui/cards/PlaylistCard";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";

interface LastSession {
  id: string;
  title: string;
  image: string;
}

// Mock data for last sessions - Updated with Unsplash images
const lastSessionsData: LastSession[] = [
  {
    id: "ls1",
    title: "Be A Better Friend",
    image:
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Replace with actual image URL
  },
  {
    id: "ls2",
    title: "Be Happy",
    image:
      "https://images.unsplash.com/photo-1494783367193-149034c05e8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "ls3",
    title: "Enjoy Reading",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "ls4",
    title: "Feeling Bold", // Reuse image from explore data or find a new one
    image:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "ls5",
    title: "Save Money",
    image:
      "https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "ls6",
    title: "Get Out Of Debt",
    image:
      "https://images.unsplash.com/photo-1611995901659-a75a6c10f735?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
];

// Mock data for "Just for You"
const justForYouData = {
  id: "jfy1",
  title: "Find Your Happiness",
  image:
    "https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Replace with actual image URL
  author: "MindTune", // Example author
  description: "Discover the path to true happiness within yourself.", // Example description
};

// Mock data for Mini Player
const miniPlayerData = {
  id: "player1",
  title: "Be A Better Friend",
  author: "Innertune",
  image:
    "https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Replace with actual image URL
};

// Mock data for "Money Manifestation" (formerly Explore Playlists)
const moneyManifestationData = [
  {
    id: "exp1", // Keeping IDs for simplicity, rename if needed
    title: "Money Manifestation",
    image:
      "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    author: "Wealth Vibes",
  },
  {
    id: "exp2",
    title: "Abundance Mindset",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    author: "Prosperity Now",
  },
  {
    id: "exp3",
    title: "Attract Wealth Hypnosis",
    image:
      "https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    author: "MindTune Finance",
  },
  // Add more if desired
];

// Mock data for "Brain Power"
const brainPowerData = [
  {
    id: "bp1",
    title: "Focus Enhancement",
    image:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    author: "Cognitive Boost",
  },
  {
    id: "bp2",
    title: "Memory Improvement",
    image:
      "https://images.unsplash.com/photo-1580894908361-967195033215?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    author: "Mind Sharpener",
  },
  {
    id: "bp3",
    title: "Creative Thinking Flow",
    image:
      "https://images.unsplash.com/photo-1509966756634-9c23dd6e6815?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    author: "Idea Spark",
  },
];

// Mock data for "Exam Affirmations"
const examAffirmationsData = [
  {
    id: "ea1",
    title: "Confident Test Taking",
    image:
      "https://images.unsplash.com/photo-1453928582365-b6ad33cb1289?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    author: "Study Success",
  },
  {
    id: "ea2",
    title: "Calm Exam Nerves",
    image:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    author: "Academic Peace",
  },
  {
    id: "ea3",
    title: "Recall Information Easily",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    author: "Test Ace",
  },
];

// Extract CARD_WIDTH calculation from PlaylistCard
const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.42;
const HORIZONTAL_CARD_SPACING = 16; // Define spacing here

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const headerSlideDown = useRef(new Animated.Value(-50)).current;
  const sectionSlideUp = useRef(new Animated.Value(50)).current;
  const bannerSlideUp = useRef(new Animated.Value(100)).current;

  // Start entrance animations when component mounts
  useEffect(() => {
    // Sequence of entrance animations
    Animated.stagger(150, [
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(headerSlideDown, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(sectionSlideUp, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(bannerSlideUp, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Function to navigate to search screen
  const goToSearch = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/search");
  };

  // Handler for "See All" press (takes section title as identifier)
  const handleSeeAll = (sectionTitle: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    console.log(`See All pressed for: ${sectionTitle}`);
    // Navigate to the category page, passing the title as the ID
    router.push(`/category/${encodeURIComponent(sectionTitle)}`);
  };

  // Helper function to render playlist sections with animations
  const renderPlaylistSection = (title: string, data: any[], index: number) => {
    // Calculate staggered delay for each section
    const delay = index * 100;

    return (
      <Animated.View
        style={[
          styles.section,
          {
            opacity: fadeAnim,
            transform: [
              {
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <TouchableOpacity
            style={styles.seeAllButton}
            onPress={() => handleSeeAll(title)}
          >
            <Text style={styles.seeAllText}>See All</Text>
            <Ionicons
              name="chevron-forward-outline"
              size={18}
              color={Colors.light.textSecondary}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScrollContainer}
          decelerationRate="fast"
          snapToInterval={CARD_WIDTH + HORIZONTAL_CARD_SPACING}
          snapToAlignment="start"
          style={styles.horizontalScrollView}
        >
          {data.map((item, idx) => (
            <Animated.View
              key={item.id}
              style={{
                opacity: fadeAnim,
                transform: [
                  {
                    translateX: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50 + idx * 20, 0],
                    }),
                  },
                ],
              }}
            >
              <PlaylistCard
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                author={item.author}
                style={styles.horizontalCard}
                isFavorited={idx % 3 === 0} // Just for demo
                onFavoritePress={() =>
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                }
              />
            </Animated.View>
          ))}
        </ScrollView>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#2A1840", "#050812", "#050812", "#050812", "#050812"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <BlurView
        intensity={20}
        style={StyleSheet.absoluteFill}
        tint="dark"
      />

      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {/* Large Header Title */}
        <Animated.View
          style={[
            styles.headerContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: headerSlideDown }],
            },
          ]}
        >
          <BlurView
            intensity={20}
            tint="dark"
            style={StyleSheet.absoluteFill}
          />
          <Text style={styles.headerTitle}>Discover</Text>
          <TouchableOpacity style={styles.iconButton} onPress={goToSearch}>
            <BlurView
              intensity={20}
              tint="dark"
              style={StyleSheet.absoluteFill}
            />
            <Ionicons name="search" size={24} color={Colors.light.text} />
          </TouchableOpacity>
        </Animated.View>

        {/* Last Sessions Section */}
        {renderPlaylistSection("Last Sessions", lastSessionsData, 0)}

        {/* Contribution Banner Section */}
        <Animated.View
          style={[
            styles.bannerContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: bannerSlideUp }],
            },
          ]}
        >
          <ContributionBanner />
        </Animated.View>

        {/* Other Sections */}
        {renderPlaylistSection(
          "Money Manifestation",
          moneyManifestationData,
          1
        )}
        {renderPlaylistSection("Brain Power", brainPowerData, 2)}
        {renderPlaylistSection("Exam Affirmations", examAffirmationsData, 3)}
      </Animated.ScrollView>
      <MediaPlayer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 0,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 32,
    paddingTop: 8,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: "800",
    color: Colors.light.text,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  searchButtonBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.light.text,
    letterSpacing: 0.3,
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  seeAllText: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.light.textSecondary,
  },
  horizontalScrollView: {
    paddingLeft: 24,
  },
  horizontalScrollContainer: {
    paddingRight: 24,
  },
  horizontalCard: {
    marginRight: HORIZONTAL_CARD_SPACING,
  },
  justForYouCard: {
    marginHorizontal: 24,
  },
  bannerContainer: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
});
