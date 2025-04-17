import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";
import { SessionCard } from "@/components/ui/cards/SessionCard";
import { FeaturedCard } from "@/components/ui/cards/FeaturedCard";
import { CardBase } from "@/components/ui/cards/CardBase";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const categories = [
  { id: "1", name: "Self Love", emoji: "💝" },
  { id: "2", name: "Success", emoji: "🌟" },
  { id: "3", name: "Confidence", emoji: "💪" },
  { id: "4", name: "Healing", emoji: "🌿" },
  { id: "5", name: "Abundance", emoji: "✨" },
  { id: "6", name: "Gratitude", emoji: "🙏" },
];

const trendingSessions = [
  {
    id: "1",
    title: "Morning Ritual",
    description: "Start your day mindfully",
    duration: "10 min",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "2",
    title: "Stress Relief",
    description: "Find your calm",
    duration: "15 min",
    image:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "3",
    title: "Evening Wind Down",
    description: "Prepare for restful sleep",
    duration: "12 min",
    image:
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
];

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.light.background, "rgba(7, 10, 20, 0)"]}
        style={[styles.searchGradientContainer, { paddingTop: insets.top }]}
      >
        <Text style={styles.title}>Explore</Text>
        <View style={styles.searchWrapper}>
          <BlurView intensity={10} tint="dark" style={styles.searchContainer}>
            <LinearGradient
              colors={["rgba(124, 58, 237, 0.12)", "rgba(99, 102, 241, 0.08)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.searchInputWrapper}
            >
              <TextInput
                style={styles.searchInput}
                placeholder="Search meditations..."
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
              />
            </LinearGradient>
          </BlurView>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoryGrid}>
            {categories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryCard}>
                <CardBase>
                  <View style={styles.categoryContent}>
                    <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                    <Text style={styles.categoryName}>{category.name}</Text>
                  </View>
                </CardBase>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Now</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllButton}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {trendingSessions.map((session) => (
              <SessionCard
                key={session.id}
                {...session}
                style={styles.trendingCard}
                imageHeight={120}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Collection</Text>
          <FeaturedCard
            title="Mindfulness Journey"
            description="A curated collection of meditations for inner peace"
            actionText="Start Journey"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const { width } = Dimensions.get("window");
const cardWidth = (width - 60) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  searchGradientContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  searchWrapper: {
    marginTop: 10,
  },
  searchContainer: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  searchInputWrapper: {
    padding: Platform.OS === "ios" ? 12 : 8,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  scrollView: {
    flex: 1,
    paddingTop: 140, // Adjust this value based on your search container height
  },
  contentContainer: {
    padding: 20,
    paddingTop: 160,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  categoriesContainer: {
    marginBottom: 44,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 44,
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
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.5,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
    marginTop: 8,
  },
  categoryCard: {
    width: cardWidth,
    height: 120,
  },
  categoryContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  categoryEmoji: {
    fontSize: 32,
    marginBottom: 12,
  },
  categoryName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  seeAllButton: {
    color: Colors.light.primary,
    fontSize: 16,
    fontWeight: "600",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  horizontalScroll: {
    paddingRight: 20,
    paddingBottom: 8,
  },
  trendingCard: {
    width: cardWidth * 1.6,
    marginLeft: 20,
    marginBottom: 4,
  },
});
