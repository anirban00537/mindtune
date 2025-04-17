import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ExploreBar from "@/components/ui/ExploreBar";
import { SessionCard } from "@/components/ui/cards/SessionCard";
import { FeaturedCard } from "@/components/ui/cards/FeaturedCard";

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

const recentSessions = [
  {
    id: "1",
    title: "Deep Sleep",
    description: "Fall asleep faster",
    duration: "15 min",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "2",
    title: "Anxiety Relief",
    description: "Calm your mind",
    duration: "8 min",
    image:
      "https://images.unsplash.com/photo-1515894203077-2cd25148ae14?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "3",
    title: "Focus Mode",
    description: "Enhance concentration",
    duration: "10 min",
    image:
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={Colors.gradients.background}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: insets.top }} />
        <ExploreBar />

        {/* Recent Sessions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Sessions</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllButton}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {recentSessions.map((session) => (
              <SessionCard
                key={session.id}
                {...session}
                style={styles.recentCard}
                imageHeight={CARD_WIDTH * 0.4}
              />
            ))}
          </ScrollView>
        </View>

        {/* Featured Session */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Session</Text>
          <View style={{ marginTop: 16 }}>
            <FeaturedCard
              title="Deep Relaxation"
              description="Unwind and find inner peace"
              meta={{ duration: "20 min", difficulty: "Beginner" }}
              actionText="▶"
            />
          </View>
        </View>

        {/* Recommended Playlists */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllButton}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {playlists.map((playlist) => (
              <SessionCard
                key={playlist.id}
                {...playlist}
                style={styles.playlistCard}
                imageHeight={CARD_WIDTH * 0.6}
              />
            ))}
          </ScrollView>
        </View>

        {/* Premium Card */}
        <View style={styles.section}>
          <FeaturedCard
            title="Unlock Premium"
            description="Access all meditations, sleep stories, and exclusive content"
            actionText="Upgrade Now"
            style={styles.premiumCard}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH * 0.7;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 16,
  },
  section: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    color: Colors.light.text,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  seeAllButton: {
    fontSize: 16,
    color: Colors.light.primary,
    fontWeight: "600",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  horizontalScroll: {
    paddingRight: 20,
    paddingBottom: 8,
  },
  recentCard: {
    width: CARD_WIDTH * 0.8,
    marginLeft: 3,
    marginBottom: 4,
  },
  playlistCard: {
    width: CARD_WIDTH,
    marginLeft: 20,
    marginBottom: 4,
  },
  premiumCard: {
    marginTop: 20,
    marginBottom: 20,
  },
});
