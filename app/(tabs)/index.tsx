import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const playlists = [
  {
    id: "1",
    title: "Morning Empowerment",
    description: "Start your day with positivity",
    duration: "10 min",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "2",
    title: "Wealth & Abundance",
    description: "Attract prosperity",
    duration: "15 min",
    image:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "3",
    title: "Self-Love Journey",
    description: "Nurture your inner self",
    duration: "12 min",
    image:
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
];

const quickActions = [
  { id: "1", title: "Daily\nAffirmation", icon: "☀️" },
  { id: "2", title: "Sleep\nWell", icon: "🌙" },
  { id: "3", title: "Quick\nBoost", icon: "⚡" },
  { id: "4", title: "Focus\nMode", icon: "🎯" },
];

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>Anirban</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <BlurView
            intensity={30}
            tint="light"
            style={styles.profileButtonBlur}
          >
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
              style={styles.profileImage}
            />
          </BlurView>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsContainer}>
        {quickActions.map((action) => (
          <TouchableOpacity key={action.id} style={styles.quickActionButton}>
            <BlurView
              intensity={20}
              tint="light"
              style={styles.quickActionBlur}
            >
              <Text style={styles.quickActionIcon}>{action.icon}</Text>
              <Text style={styles.quickActionTitle}>{action.title}</Text>
            </BlurView>
          </TouchableOpacity>
        ))}
      </View>

      {/* Featured Session */}
      <View style={styles.featuredContainer}>
        <Text style={styles.sectionTitle}>Featured Session</Text>
        <TouchableOpacity>
          <BlurView intensity={20} tint="light" style={styles.featuredCard}>
            <LinearGradient
              colors={Colors.gradients.card}
              style={styles.featuredGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.featuredContent}>
                <View>
                  <Text style={styles.featuredTitle}>Deep Relaxation</Text>
                  <Text style={styles.featuredDescription}>
                    Unwind and find inner peace
                  </Text>
                  <View style={styles.featuredMeta}>
                    <Text style={styles.duration}>20 min</Text>
                    <Text style={styles.difficulty}>Beginner</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.playButton}>
                  <LinearGradient
                    colors={Colors.gradients.button}
                    style={styles.playButtonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={styles.playButtonText}>▶</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </BlurView>
        </TouchableOpacity>
      </View>

      {/* Recommended Playlists */}
      <View style={styles.playlistsContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllButton}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.playlistsScroll}
        >
          {playlists.map((playlist) => (
            <TouchableOpacity key={playlist.id} style={styles.playlistCard}>
              <BlurView intensity={20} tint="light" style={styles.playlistBlur}>
                <Image
                  source={{ uri: playlist.image }}
                  style={styles.playlistImage}
                />
                <View style={styles.playlistContent}>
                  <View>
                    <Text style={styles.playlistTitle}>{playlist.title}</Text>
                    <Text style={styles.playlistDescription}>
                      {playlist.description}
                    </Text>
                    <Text style={styles.playlistDuration}>
                      {playlist.duration}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.miniPlayButton}>
                    <LinearGradient
                      colors={Colors.gradients.button}
                      style={styles.miniPlayGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <Text style={styles.miniPlayText}>▶</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </BlurView>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Premium Card */}
      <View style={styles.premiumContainer}>
        <BlurView intensity={20} tint="light" style={styles.premiumCard}>
          <LinearGradient
            colors={Colors.gradients.card}
            style={styles.premiumGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.premiumContent}>
              <View>
                <Text style={styles.premiumTitle}>Unlock Premium</Text>
                <Text style={styles.premiumDescription}>
                  Access all meditations, sleep stories, and exclusive content
                </Text>
              </View>
              <TouchableOpacity style={styles.premiumButton}>
                <LinearGradient
                  colors={Colors.gradients.button}
                  style={styles.premiumButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.premiumButtonText}>Upgrade Now</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </BlurView>
      </View>
    </ScrollView>
  );
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_PADDING = 20;
const CARD_WIDTH = SCREEN_WIDTH * 0.7;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  welcomeText: {
    fontSize: 16,
    color: Colors.light.text,
    opacity: 0.7,
    fontWeight: "500",
  },
  userName: {
    fontSize: 28,
    color: Colors.light.text,
    fontWeight: "700",
    marginTop: 4,
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: "hidden",
  },
  profileButtonBlur: {
    flex: 1,
    padding: 2,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 22,
  },
  quickActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  quickActionButton: {
    width: (SCREEN_WIDTH - 60) / 4,
    height: (SCREEN_WIDTH - 60) / 4,
    borderRadius: 20,
    overflow: "hidden",
  },
  quickActionBlur: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 12,
    color: Colors.light.text,
    textAlign: "center",
    fontWeight: "600",
  },
  featuredContainer: {
    paddingHorizontal: 20,
    marginTop: 40,
  },
  sectionTitle: {
    fontSize: 22,
    color: Colors.light.text,
    fontWeight: "700",
    marginBottom: 16,
  },
  featuredCard: {
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  featuredGradient: {
    padding: 20,
  },
  featuredContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  featuredTitle: {
    fontSize: 24,
    color: Colors.light.text,
    fontWeight: "700",
    marginBottom: 8,
  },
  featuredDescription: {
    fontSize: 16,
    color: Colors.light.text,
    opacity: 0.7,
    marginBottom: 16,
  },
  featuredMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  duration: {
    fontSize: 14,
    color: Colors.light.text,
    opacity: 0.6,
    marginRight: 12,
  },
  difficulty: {
    fontSize: 14,
    color: Colors.light.text,
    opacity: 0.6,
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: "hidden",
  },
  playButtonGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  playButtonText: {
    color: Colors.light.text,
    fontSize: 24,
  },
  playlistsContainer: {
    marginTop: 40,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  seeAllButton: {
    fontSize: 16,
    color: Colors.light.primary,
    fontWeight: "600",
  },
  playlistsScroll: {
    paddingHorizontal: 20,
  },
  playlistCard: {
    width: CARD_WIDTH,
    marginRight: 16,
    borderRadius: 20,
    overflow: "hidden",
  },
  playlistBlur: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  playlistImage: {
    width: "100%",
    height: CARD_WIDTH * 0.6,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  playlistContent: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  playlistTitle: {
    fontSize: 18,
    color: Colors.light.text,
    fontWeight: "600",
    marginBottom: 4,
  },
  playlistDescription: {
    fontSize: 14,
    color: Colors.light.text,
    opacity: 0.7,
    marginBottom: 8,
  },
  playlistDuration: {
    fontSize: 12,
    color: Colors.light.text,
    opacity: 0.5,
  },
  miniPlayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  miniPlayGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  miniPlayText: {
    color: Colors.light.text,
    fontSize: 18,
  },
  premiumContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  premiumCard: {
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  premiumGradient: {
    padding: 24,
  },
  premiumContent: {
    alignItems: "flex-start",
  },
  premiumTitle: {
    fontSize: 24,
    color: Colors.light.text,
    fontWeight: "700",
    marginBottom: 8,
  },
  premiumDescription: {
    fontSize: 16,
    color: Colors.light.text,
    opacity: 0.7,
    marginBottom: 24,
    lineHeight: 22,
  },
  premiumButton: {
    borderRadius: 30,
    overflow: "hidden",
    alignSelf: "stretch",
  },
  premiumButtonGradient: {
    paddingVertical: 16,
    alignItems: "center",
  },
  premiumButtonText: {
    color: Colors.light.text,
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
