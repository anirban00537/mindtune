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
                intensity={20}
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
                  colors={["#ffffff", "#f5f5f5"]}
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

const CARD_WIDTH = Dimensions.get("window").width * 0.38;
const ARTIST_SIZE = Dimensions.get("window").width * 0.2;
const SCREEN_WIDTH = Dimensions.get("window").width;
// Remove RECENT_SESSION_ITEM_WIDTH calculation
const RECENT_SESSION_CARD_WIDTH = SCREEN_WIDTH * 0.3; // Define a width for recent session cards

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
    marginBottom: 25,
  },
  greeting: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "300",
  },
  username: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 4,
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  searchContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 25,
    padding: 15,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  searchText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 16,
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
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "flex-start",
    padding: 0,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 15,
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
    backgroundColor: "rgba(255, 255, 255, 0.08)",
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
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
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
  cardImage: {
    width: "100%",
    height: CARD_WIDTH,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    padding: 15,
    paddingBottom: 8,
  },
  playButton: {
    position: "absolute",
    bottom: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  playButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  playButtonGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
