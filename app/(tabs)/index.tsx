import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  ViewStyle,
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

  // Function to navigate to search screen
  const goToSearch = () => {
    router.push("/search");
  };

  // Handler for "See All" press (takes section title as identifier)
  const handleSeeAll = (sectionTitle: string) => {
    console.log(`See All pressed for: ${sectionTitle}`);
    // Add navigation logic here, e.g., router.push(`/section/${sectionTitle}`);
  };

  // Helper function to render playlist sections
  const renderPlaylistSection = (title: string, data: any[]) => (
    <View style={styles.section}>
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
        // Updated snapToInterval to use imported CARD_WIDTH and spacing
        snapToInterval={CARD_WIDTH + HORIZONTAL_CARD_SPACING}
        snapToAlignment="start"
        style={styles.horizontalScrollView}
      >
        {data.map((item) => (
          <PlaylistCard
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image}
            author={item.author}
            // Removed custom style prop to use original card size
            style={styles.horizontalCard} // Keep margin
          />
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#2A1840", "#050812", "#050812", "#050812", "#050812"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Large Header Title */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Discover</Text>
          <TouchableOpacity style={styles.iconButton} onPress={goToSearch}>
            <BlurView
              intensity={30}
              tint="light"
              style={StyleSheet.absoluteFill}
            />
            <Ionicons name="search" size={24} color={Colors.light.text} />
          </TouchableOpacity>
        </View>

        {/* Last Sessions Section */}
        {renderPlaylistSection("Last Sessions", lastSessionsData)}

        {/* Contribution Banner Section */}
        <View style={styles.bannerContainer}>
          <ContributionBanner />
        </View>

        {/* Just for You Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Just for You</Text>
          </View>
          <PlaylistCard
            id={justForYouData.id}
            title={justForYouData.title}
            image={justForYouData.image}
            author={justForYouData.author}
            // Removed custom style prop for the Just for You card
            style={styles.justForYouCard} // Keep margin
          />
        </View>

        {/* Other Sections */}
        {renderPlaylistSection("Money Manifestation", moneyManifestationData)}
        {renderPlaylistSection("Brain Power", brainPowerData)}
        {renderPlaylistSection("Exam Affirmations", examAffirmationsData)}
      </ScrollView>
      <MediaPlayer />
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
    paddingHorizontal: 0,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: Colors.light.text,
    letterSpacing: 0.4,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "500",
    color: Colors.light.text,
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.light.textSecondary,
  },
  horizontalScrollView: {
    paddingLeft: 20,
  },
  horizontalScrollContainer: {
    paddingRight: 20,
  },
  horizontalCard: {
    // Keep only the margin style
    marginRight: HORIZONTAL_CARD_SPACING,
  },
  justForYouCard: {
    // Keep only the margin style
    marginHorizontal: 20,
  },
  bannerContainer: {
    marginHorizontal: 20,
    marginBottom: 12,
  },
});
