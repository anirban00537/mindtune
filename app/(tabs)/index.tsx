import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";

const categories = [
  { name: "Self-Love", icon: "💖" },
  { name: "Success", icon: "⭐" },
  { name: "Confidence", icon: "💪" },
  { name: "Healing", icon: "🌿" },
  { name: "Abundance", icon: "✨" },
  { name: "Gratitude", icon: "🙏" },
  { name: "Peace", icon: "🕊️" },
  { name: "Growth", icon: "🌱" },
];

// Remove categories array

const playlists = [
  {
    id: "1",
    title: "Morning Empowerment",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "2",
    title: "Wealth & Abundance",
    image:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "3",
    title: "Self-Love Journey",
    image:
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "4",
    title: "Career Success",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "5",
    title: "Inner Peace",
    image:
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
];

const recentSessions = Array.from({ length: 6 }, (_, i) => ({
  id: `${i + 1}`,
  title: `Session ${i + 1}`,
  image: `https://picsum.photos/seed/${i + 100}/100/100`,
}));

export default function HomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#000000", "#010001", "#0d000d"]}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.greeting}>Good Evening</Text>
            <Text style={styles.username}>Anirban</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <TouchableOpacity
          style={styles.searchContainer}
          onPress={() => router.push("/explore")}
        >
          <Text style={styles.searchText}>
            Search affirmations, categories, or playlists
          </Text>
        </TouchableOpacity>

        {/* Recent Sessions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Sessions</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.recentSessionsScroll}
        >
          <View style={styles.recentSessionsContainer}>
            {recentSessions.map((session) => (
              <BlurView
                intensity={30}
                tint="light"
                style={styles.recentSessionCard}
                key={session.id}
              >
                <Image
                  source={{ uri: session.image }}
                  style={styles.recentSessionImage}
                />
                <Text style={styles.recentSessionTitle} numberOfLines={1}>
                  {session.title}
                </Text>
              </BlurView>
            ))}
          </View>
        </ScrollView>

        {/* Premium Purchase Card */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Go Premium</Text>
        </View>
        <BlurView
          intensity={30}
          tint="light"
          style={styles.premiumCard}
        >
          <Text style={styles.premiumTitle}>Unlock Premium Features</Text>
          <Text style={styles.premiumText}>Access all affirmations, remove ads, and get exclusive content</Text>
          <TouchableOpacity style={styles.premiumButton}>
            <LinearGradient
              colors={["#9c27b0", "#673ab7"]}
              style={styles.premiumButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.premiumButtonText}>Upgrade Now</Text>
            </LinearGradient>
          </TouchableOpacity>
        </BlurView>

        {/* Featured Playlists */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Playlists</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.playlistRow}
        >
          {playlists.map((playlist) => (
            <BlurView
              intensity={20}
              tint="light"
              style={styles.card}
              key={playlist.id}
            >
              <Image
                source={{ uri: playlist.image }}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle} numberOfLines={1}>
                {playlist.title}
              </Text>
              <TouchableOpacity style={styles.playButton}>
                <LinearGradient
                  colors={["#9c27b0", "#673ab7"]}
                  style={styles.playButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.playButtonText}>▶</Text>
                </LinearGradient>
              </TouchableOpacity>
            </BlurView>
          ))}
        </ScrollView>




      </ScrollView>
    </LinearGradient>
  );
}

const CARD_WIDTH = Dimensions.get("window").width * 0.8;
const SCREEN_WIDTH = Dimensions.get("window").width;
const RECENT_SESSION_CARD_WIDTH = SCREEN_WIDTH * 0.32;
const ARTIST_SIZE = SCREEN_WIDTH * 0.2;
const CARD_PADDING = 16;
const CARD_HEIGHT = CARD_WIDTH * 0.4;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    paddingHorizontal: 8,
  },
  greeting: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "400",
    letterSpacing: 0.5,
    opacity: 0.9,
  },
  username: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "700",
    marginTop: 6,
    letterSpacing: 0.25,
  },
  profileButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  searchContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 28,
    padding: 12,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 15,
    backdropFilter: 'blur(12px)',
  },
  searchText: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 17,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  recentSessionsScroll: {
    marginBottom: 30,
    paddingLeft: 20,
    marginLeft: -20,
  },
  recentSessionsContainer: {
    flexDirection: "row",
    paddingRight: 20,
  },
  recentSessionCard: {
    width: RECENT_SESSION_CARD_WIDTH,
    marginRight: 15,
    borderRadius: 12,
    overflow: "hidden",
    alignItems: "flex-start",
    padding: 0,
    backgroundColor: "transparent",
    borderWidth: 0,
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  recentSessionImage: {
    width: "100%",
    height: RECENT_SESSION_CARD_WIDTH,
    borderRadius: 0,
  },
  recentSessionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    padding: 12,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    minHeight: 50,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  seeAll: {
    color: "#b3b3b3",
    fontSize: 14,
    fontWeight: "600",
  },
  categoryRow: {
    marginBottom: 25,
  },
  categoryCard: {
    borderRadius: 24,
    width: CARD_WIDTH,
    height: CARD_WIDTH + 70,
    marginRight: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 10,
    textAlign: "center",
  },
  categoryText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    paddingHorizontal: 10,
  },
  artistRow: {
    marginBottom: 25,
  },
  artistCard: {
    alignItems: "center",
    marginRight: 20,
  },
  artistImage: {
    width: ARTIST_SIZE,
    height: ARTIST_SIZE,
    borderRadius: ARTIST_SIZE / 2,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  artistName: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },


  playlistRow: {
    marginBottom: 25,
  },
  premiumCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  premiumTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  premiumText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginBottom: 16,
  },
  premiumButton: {
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#9c27b0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
  },
  premiumButtonGradient: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#9c27b0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 15,
  },
  premiumButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  card: {
    backgroundColor: "transparent",
    borderRadius: 16,
    width: CARD_WIDTH,
    height: CARD_HEIGHT + 60,
    marginRight: CARD_PADDING,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 15,
  },
  cardImage: {
    width: "100%",
    height: CARD_HEIGHT,
    borderRadius: 16,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    padding: 16,
    paddingBottom: 8,
    letterSpacing: 0.5,
    minHeight: 60,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  playButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  playButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  playButtonGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.9,
  },
});
