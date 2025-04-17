import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  FlatList,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";
import { SessionCard } from "@/components/ui/cards/SessionCard";
import { FeaturedCard } from "@/components/ui/cards/FeaturedCard";
import { CardBase } from "@/components/ui/cards/CardBase";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import ExploreBar from "@/components/ui/ExploreBar";



const allSessions = [
  {
    id: "1",
    title: "Morning Ritual",
    description: "Start your day mindfully",
    duration: "10 min",
    category: "Self Love",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "2",
    title: "Stress Relief",
    description: "Find your calm",
    duration: "15 min",
    category: "Healing",
    image:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "3",
    title: "Evening Wind Down",
    description: "Prepare for restful sleep",
    duration: "12 min",
    category: "Healing",
    image:
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "4",
    title: "Abundance Mindset",
    description: "Attract prosperity",
    duration: "8 min",
    category: "Abundance",
    image:
      "https://images.unsplash.com/photo-1515894203077-2cd25148ae14?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "5",
    title: "Gratitude Practice",
    description: "Cultivate thankfulness",
    duration: "5 min",
    category: "Gratitude",
    image:
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
];

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSessions = allSessions.filter(session => {
    return session.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           session.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(7, 10, 20, 0.9)", "rgba(7, 10, 20, 0)"]}
        style={[styles.headerGradient, { paddingTop: insets.top }]}
      >
        <Text style={styles.title}>Explore</Text>
        <ExploreBar />
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Sessions</Text>
          
          <FlatList
            data={filteredSessions}
            renderItem={({ item }) => (
              <SessionCard
                {...item}
                style={styles.sessionCard}
                imageHeight={180}
              />
            )}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const { width } = Dimensions.get("window");
const cardWidth = width - 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  headerGradient: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 16,
  },
  categoryScroll: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  categoryCard: {
    marginRight: 12,
    width: 120,
  },
  selectedCategory: {
    borderWidth: 2,
    borderColor: Colors.light.primary,
    borderRadius: 12,
  },
  categoryContent: {
    alignItems: "center",
    paddingVertical: 16,
  },
  categoryEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.light.text,
  },
  section: {
    paddingHorizontal: 16,
  },
  sessionCard: {
    marginBottom: 16,
  },
});
