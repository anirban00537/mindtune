import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
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
import { LastSessionCard } from "@/components/ui/cards/LastSessionCard";

interface LastSession {
  id: string;
  title: string;
  image: string;
}

const lastSessions: LastSession[] = [
  {
    id: "1",
    title: "Awaken Your Money Power",
    image:
      "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "2",
    title: "Deep Sleep",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "3",
    title: "Billionaire Mind",
    image:
      "https://images.unsplash.com/photo-1515894203077-2cd25148ae14?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "4",
    title: "Control Stress",
    image:
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
];

const categories = [
  {
    id: "money",
    title: "Money Mastery",
    sessions: [
      {
        id: "1",
        title: "Billionaire Mind",
        description: "Develop abundance mindset",
        duration: "15 min",
        image:
          "https://images.unsplash.com/photo-1515894203077-2cd25148ae14?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
      {
        id: "2",
        title: "Wealth Attraction",
        description: "Manifest prosperity",
        duration: "10 min",
        image:
          "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
    ],
  },
  {
    id: "sleep",
    title: "Sleep & Relaxation",
    sessions: [
      {
        id: "1",
        title: "Deep Sleep",
        description: "Fall asleep faster",
        duration: "20 min",
        image:
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
      {
        id: "2",
        title: "Stress Relief",
        description: "Let go of tension",
        duration: "15 min",
        image:
          "https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
    ],
  },
];

const justForYou = {
  title: "Find Your Happiness",
  description: "Start your journey to inner peace",
  duration: "10 min",
  image:
    "https://images.unsplash.com/photo-1533910534207-90f31029a78e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { width } = Dimensions.get("window");

  // Calculate card width for the grid
  const paddingHorizontal = 16;
  const gap = 12;
  const numColumns = 2;
  const availableWidth = width - paddingHorizontal * 2 - gap * (numColumns - 1);
  const cardWidth = availableWidth / numColumns;

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
          { paddingTop: insets.top },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Header />

        {/* Last Sessions */}
        <View style={[styles.section, styles.sectionSpacing]}>
          <Text style={styles.sectionTitle}>Last sessions</Text>
          <View style={styles.gridContainer}>
            {lastSessions.map((session) => (
              <LastSessionCard
                key={session.id}
                {...session}
                style={{ width: cardWidth }} // Pass calculated width
              />
            ))}
          </View>
        </View>

        {/* Contribution Banner */}
        <View style={[styles.section, styles.sectionSpacing]}>
          <ContributionBanner />
        </View>

      

        {/* Categories */}
        {categories.map((category) => (
          <View key={category.id} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{category.title}</Text>
              <TouchableOpacity style={styles.seeAllButton}>
                <Text style={styles.seeAllText}>See all</Text>
                <IconSymbol
                  name="chevron.right"
                  size={16}
                  color={Colors.light.primary}
                />
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScroll}
            >
              {category.sessions.map((session) => (
                <PlaylistCard
                  key={session.id}
                  {...session}
                  style={styles.categoryCard}
                />
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>

      <MediaPlayer />
    </View>
  );
}

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
    paddingBottom: 120,
  },
  section: {
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  sectionSpacing: {
    marginTop: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  horizontalScroll: {
    paddingBottom: 12,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // Remove paddingHorizontal here as it's handled by the section
    gap: 12,
  },
  categoryCard: {
    width: 280,
    marginRight: 16,
  },
  featuredCard: {
    marginHorizontal: 0,
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  seeAllText: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.light.primary,
  },
});
