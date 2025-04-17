import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";

const categories = [
  { id: "1", name: "Self Love", emoji: "💝" },
  { id: "2", name: "Success", emoji: "🌟" },
  { id: "3", name: "Confidence", emoji: "💪" },
  { id: "4", name: "Healing", emoji: "🌿" },
  { id: "5", name: "Abundance", emoji: "✨" },
  { id: "6", name: "Gratitude", emoji: "🙏" },
];

export default function ExploreScreen() {
  return (
    <LinearGradient
      colors={Colors.gradients.background}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.title}>Explore</Text>

        <BlurView intensity={20} tint="light" style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search affirmations..."
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
          />
        </BlurView>

        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoryGrid}>
            {categories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryCard}>
                <BlurView
                  intensity={20}
                  tint="light"
                  style={styles.categoryCardInner}
                >
                  <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <LinearGradient
                    colors={Colors.gradients.button}
                    style={styles.categoryGlow}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  />
                </BlurView>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.trendingContainer}>
          <Text style={styles.sectionTitle}>Trending Now</Text>
          <BlurView intensity={20} tint="light" style={styles.trendingCard}>
            <LinearGradient
              colors={Colors.gradients.card}
              style={styles.trendingGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.trendingTitle}>Daily Boost</Text>
              <Text style={styles.trendingDescription}>
                Start your day with positive energy
              </Text>
              <TouchableOpacity
                style={[
                  styles.trendingButton,
                  { backgroundColor: Colors.light.primary },
                ]}
              >
                <Text style={styles.trendingButtonText}>Get Started</Text>
              </TouchableOpacity>
            </LinearGradient>
          </BlurView>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const { width } = Dimensions.get("window");
const cardWidth = (width - 60) / 2;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  searchContainer: {
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  searchInput: {
    padding: 15,
    color: "#fff",
    fontSize: 16,
  },
  categoriesContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    width: cardWidth,
    height: 120,
    marginBottom: 20,
    borderRadius: 20,
    overflow: "hidden",
  },
  categoryCardInner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  categoryEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  categoryGlow: {
    position: "absolute",
    bottom: -20,
    left: -20,
    right: -20,
    height: 40,
    opacity: 0.15,
    transform: [{ rotate: "-5deg" }],
  },
  trendingContainer: {
    marginBottom: 30,
  },
  trendingCard: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  trendingGradient: {
    padding: 25,
  },
  trendingTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  trendingDescription: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 20,
  },
  trendingButton: {
    backgroundColor: "#4caf50",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignSelf: "flex-start",
  },
  trendingButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
