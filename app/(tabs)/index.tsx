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

const playlists = [
  {
    id: "1",
    title: "Morning Empowerment",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "2",
    title: "Wealth & Abundance",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "3",
    title: "Self-Love Journey",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "4",
    title: "Career Success",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "5",
    title: "Inner Peace",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
];

const recentSessions = Array.from({ length: 18 }, (_, i) => ({
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
              source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <TouchableOpacity 
          style={styles.searchContainer}
          onPress={() => router.push('/explore')}
        >
          <Text style={styles.searchText}>Search affirmations, categories, or playlists</Text>
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
              <BlurView intensity={20} tint="light" style={styles.recentSessionCard} key={session.id}>
                <Image source={{ uri: session.image }} style={styles.recentSessionImage} />
                <Text style={styles.recentSessionTitle} numberOfLines={1}>{session.title}</Text>
              </BlurView>
            ))}
          </View>
        </ScrollView>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Browse All</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryRow}
        >
          {categories.map((category, index) => (
            <BlurView intensity={25} tint="light" style={styles.categoryCard} key={index}>
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryText}>{category.name}</Text>
            </BlurView>
          ))}
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
            <BlurView intensity={20} tint="light" style={styles.card} key={playlist.id}>
              <Image source={{ uri: playlist.image }} style={styles.cardImage} />
              <Text style={styles.cardTitle} numberOfLines={1}>{playlist.title}</Text>
              <TouchableOpacity style={styles.playButton}>
                <LinearGradient colors={["#ffffff", "#f5f5f5"]} style={styles.playButtonGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                  <Text style={styles.playButtonText}>▶</Text>
                </LinearGradient>
              </TouchableOpacity>
            </BlurView>
          ))}
        </ScrollView>

        {/* Top Artists */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Speakers</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.artistRow}
        >
          {[1, 2, 3, 4, 5].map((artist) => (
            <BlurView intensity={15} tint="light" style={styles.artistCard} key={artist}>
              <Image source={{ uri: `https://randomuser.me/api/portraits/men/${artist}.jpg` }} style={styles.artistImage} />
              <Text style={styles.artistName}>Speaker {artist}</Text>
            </BlurView>
          ))}
        </ScrollView>

        {/* Recently Played */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recently Played</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.recentContainer}>
          {[1, 2, 3, 4].map((item) => (
            <BlurView intensity={15} tint="light" style={styles.recentCard} key={item}>
              <Image source={{ uri: "https://i.scdn.co/image/ab67706f00000002b1b3c4e2e7e6e7e6e7e6e7e6" }} style={styles.recentImage} />
              <View style={styles.recentInfo}>
                <Text style={styles.recentTitle}>Daily Affirmation {item}</Text>
                <Text style={styles.recentArtist}>5 min • Meditation</Text>
              </View>
              <TouchableOpacity style={styles.recentPlayButton}>
                <Text style={styles.recentPlayText}>▶</Text>
              </TouchableOpacity>
            </BlurView>
          ))}
        </View>

        {/* New Releases */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>New Releases</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.newReleaseRow}
        >
          {[1, 2, 3, 4].map((release) => (
            <BlurView intensity={20} tint="light" style={styles.newReleaseCard} key={release}>
              <Image source={{ uri: `https://i.scdn.co/image/ab67706f00000002b1b3c4e2e7e6e7e6e7e6e7e${release}` }} style={styles.newReleaseImage} />
              <Text style={styles.newReleaseTitle}>New Affirmations {release}</Text>
              <Text style={styles.newReleaseArtist}>Added Today</Text>
            </BlurView>
          ))}
        </ScrollView>
      </ScrollView>
    </LinearGradient>
  );
}

const CARD_WIDTH = Dimensions.get('window').width * 0.38;
const ARTIST_SIZE = Dimensions.get('window').width * 0.2;
const SCREEN_WIDTH = Dimensions.get('window').width;
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 25,
    padding: 15,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  searchText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
  },
  recentSessionsScroll: {
    marginBottom: 30, // Increased bottom margin
    paddingLeft: 20, // Add left padding to align with section title
    marginLeft: -20, // Counteract the container's padding
  },
  recentSessionsContainer: { // Renamed from recentSessionsGrid
    flexDirection: 'row',
    paddingRight: 20, // Add padding to the right end of the scroll
    // Removed flexWrap and justifyContent
  },
  recentSessionCard: {
    width: RECENT_SESSION_CARD_WIDTH,
    marginRight: 15,
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  recentSessionImage: {
    width: '100%',
    height: RECENT_SESSION_CARD_WIDTH - 20,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  recentSessionTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    width: 120,
    height: 120,
    marginRight: 15,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  categoryIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  categoryText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: 'center',
  },
  playlistRow: {
    marginBottom: 25,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderRadius: 16,
    width: CARD_WIDTH,
    height: CARD_WIDTH + 60,
    marginRight: 15,
    padding: 15,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  cardImage: {
    width: "100%",
    height: CARD_WIDTH,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  playButton: {
    borderRadius: 20,
    overflow: 'hidden',
    width: 40,
    height: 40,
    alignSelf: "flex-end",
  },
  playButtonGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
  },
  artistRow: {
    marginBottom: 25,
  },
  artistCard: {
    alignItems: 'center',
    marginRight: 20,
  },
  artistImage: {
    width: ARTIST_SIZE,
    height: ARTIST_SIZE,
    borderRadius: ARTIST_SIZE / 2,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  artistName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  recentContainer: {
    marginBottom: 25,
  },
  recentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    overflow: 'hidden',
  },
  recentImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 15,
  },
  recentInfo: {
    flex: 1,
  },
  recentTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  recentArtist: {
    color: "#b3b3b3",
    fontSize: 14,
  },
  recentPlayButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentPlayText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  newReleaseRow: {
    marginBottom: 30,
  },
  newReleaseCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    width: 160,
    height: 220,
    marginRight: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    overflow: 'hidden',
  },
  newReleaseImage: {
    width: '100%',
    height: 130,
    borderRadius: 8,
    marginBottom: 15,
  },
  newReleaseTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },
  newReleaseArtist: {
    color: "#b3b3b3",
    fontSize: 13,
  },
});
