import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/ui/Header";
import ContributionBanner from "@/components/ui/ContributionBanner";
import MediaPlayer from "@/components/ui/MediaPlayer";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { PlaylistCard } from "@/components/ui/cards/PlaylistCard";

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
    image: "https://images.unsplash.com/photo-1508672115270-a8f55e83f9b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", 
  },
  {
    id: "ls2",
    title: "Be Happy",
    image: "https://images.unsplash.com/photo-1494783367193-149034c05e8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "ls3",
    title: "Enjoy Reading",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "ls4",
    title: "Feeling Bold", // Reuse image from explore data or find a new one
    image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", 
  },
  {
    id: "ls5",
    title: "Save Money",
    image: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "ls6",
    title: "Get Out Of Debt",
    image: "https://images.unsplash.com/photo-1611995901659-a75a6c10f735?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
];

// Mock data for "Just for You"
const justForYouData = {
  id: "jfy1",
  title: "Find Your Happiness",
  image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Replace with actual image URL
  author: "MindTune", // Example author
  description: "Discover the path to true happiness within yourself.", // Example description
};

// Mock data for Mini Player
const miniPlayerData = {
    id: "player1",
    title: "Be A Better Friend",
    author: "Innertune",
    image: "https://via.placeholder.com/150/771796" // Replace with actual image URL
}

// Mock data for "Money Manifestation" (formerly Explore Playlists)
const moneyManifestationData = [
  {
    id: "exp1", // Keeping IDs for simplicity, rename if needed
    title: "Money Manifestation",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    author: "Wealth Vibes",
  },
  {
    id: "exp2",
    title: "Abundance Mindset",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    author: "Prosperity Now",
  },
  {
    id: "exp3",
    title: "Attract Wealth Hypnosis",
    image: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", 
    author: "MindTune Finance",
  },
  // Add more if desired
];

// Mock data for "Brain Power"
const brainPowerData = [
  {
    id: "bp1",
    title: "Focus Enhancement",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    author: "Cognitive Boost",
  },
  {
    id: "bp2",
    title: "Memory Improvement",
    image: "https://images.unsplash.com/photo-1580894908361-967195033215?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    author: "Mind Sharpener",
  },
  {
    id: "bp3",
    title: "Creative Thinking Flow",
    image: "https://images.unsplash.com/photo-1509966756634-9c23dd6e6815?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    author: "Idea Spark",
  },
];

// Mock data for "Exam Affirmations"
const examAffirmationsData = [
  {
    id: "ea1",
    title: "Confident Test Taking",
    image: "https://images.unsplash.com/photo-1453928582365-b6ad33cb1289?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    author: "Study Success",
  },
  {
    id: "ea2",
    title: "Calm Exam Nerves",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    author: "Academic Peace",
  },
  {
    id: "ea3",
    title: "Recall Information Easily",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    author: "Test Ace",
  },
];

const { width } = Dimensions.get("window");
const EXPLORE_CARD_WIDTH = width * 0.7;
// const LAST_SESSION_CARD_WIDTH = width * 0.4; // Removed unused constant

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#050812", "#101830", "#1A304A", "#2A1840", "#03040A"]} // Example gradient, adjust as needed
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View style={{ paddingTop: insets.top }}>
          <Header /> 
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: insets.bottom + 80 }, // Add padding for MediaPlayer + tabs
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Last Sessions Section - Updated width and images */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Last sessions</Text>
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContainer}
            // Optional: Add snapping consistent with Explore section
            decelerationRate="fast"
            snapToInterval={EXPLORE_CARD_WIDTH + styles.horizontalCardMargin.marginRight}
            snapToAlignment="start"
          >
            {lastSessionsData.map((session) => (
              <PlaylistCard 
                key={session.id}
                id={session.id} 
                title={session.title}
                image={session.image}
                style={StyleSheet.flatten([styles.horizontalCard, { width: EXPLORE_CARD_WIDTH }])} // Use EXPLORE_CARD_WIDTH
              />
            ))}
          </ScrollView>
        </View>

        {/* Contribution Banner Section */}
        <ContributionBanner />

        {/* Just for You Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Just for You</Text>
            <TouchableOpacity style={styles.arrowButton}>
              <IconSymbol name="arrow.right" size={20} color={Colors.light.textSecondary} />
            </TouchableOpacity>
          </View>
          <PlaylistCard
            id={justForYouData.id}
            title={justForYouData.title}
            image={justForYouData.image}
            author={justForYouData.author}
            style={styles.justForYouCard}
          />
        </View>

        {/* Money Manifestation Section (Renamed) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Money Manifestation</Text>
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContainer}
            decelerationRate="fast"
            snapToInterval={EXPLORE_CARD_WIDTH + styles.horizontalCardMargin.marginRight}
            snapToAlignment="start"
          >
            {moneyManifestationData.map((playlist) => (
              <PlaylistCard 
                key={playlist.id}
                id={playlist.id}
                title={playlist.title}
                image={playlist.image}
                author={playlist.author}
                style={StyleSheet.flatten([styles.horizontalCard, { width: EXPLORE_CARD_WIDTH }])}
              />
            ))}
          </ScrollView>
        </View>

        {/* Brain Power Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Brain Power</Text>
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContainer}
            decelerationRate="fast"
            snapToInterval={EXPLORE_CARD_WIDTH + styles.horizontalCardMargin.marginRight}
            snapToAlignment="start"
          >
            {brainPowerData.map((playlist) => (
              <PlaylistCard 
                key={playlist.id}
                id={playlist.id}
                title={playlist.title}
                image={playlist.image}
                author={playlist.author}
                style={StyleSheet.flatten([styles.horizontalCard, { width: EXPLORE_CARD_WIDTH }])}
              />
            ))}
          </ScrollView>
        </View>

        {/* Exam Affirmations Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exam Affirmations</Text>
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContainer}
            decelerationRate="fast"
            snapToInterval={EXPLORE_CARD_WIDTH + styles.horizontalCardMargin.marginRight}
            snapToAlignment="start"
          >
            {examAffirmationsData.map((playlist) => (
              <PlaylistCard 
                key={playlist.id}
                id={playlist.id}
                title={playlist.title}
                image={playlist.image}
                author={playlist.author}
                style={StyleSheet.flatten([styles.horizontalCard, { width: EXPLORE_CARD_WIDTH }])}
              />
            ))}
          </ScrollView>
        </View>

      </ScrollView>
      <MediaPlayer 
            // title and image props removed as they are likely derived from state
            // Add other necessary props like isPlaying, onPressPlay, etc., if required by the component
          />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background, // Fallback background
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16, // Add some padding below the header
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16, // Keep marginBottom for spacing
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.light.text,
    letterSpacing: 0.3,
    marginBottom: 16, // Keep space below title
    marginTop: 16,
  },
  arrowButton: {
    padding: 4,
  },
  justForYouCard: {
    // Keep this style if specific adjustments needed for the large card
  },
  horizontalScrollContainer: {
    paddingRight: 16, // Add padding to the right for the last card
  },
  horizontalCard: {
    marginRight: 12, // Consistent spacing between horizontal cards
  },
  horizontalCardMargin: { // Helper style for snapToInterval calculation
    marginRight: 12,
  },
  mediaPlayerContainer: {
    position: "absolute",
    left: 8,
    right: 8,
    zIndex: 10,
  } as ViewStyle,
});
