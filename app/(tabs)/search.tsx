import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import ExploreBar from "@/components/ui/ExploreBar";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { PlaylistCard } from "@/components/ui/cards/PlaylistCard";
import { AffirmationCard } from "@/components/ui/cards/AffirmationCard";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useState } from "react";

const filterTabs = [
  { id: "all", label: "All" },
  { id: "playlists", label: "Playlists" },
  { id: "affirmations", label: "Affirmations" },
];

const playlists = [
  {
    id: "1",
    title: "Morning Meditation",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    duration: "10 min",
  },
  {
    id: "2",
    title: "Peaceful Sleep",
    image:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    duration: "15 min",
  },
  {
    id: "3",
    title: "Mindful Living",
    image:
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    duration: "12 min",
  },
];

const affirmations = [
  {
    id: "1",
    text: "Being present allows me to fully experience life",
  },
  {
    id: "2",
    text: "By being present, I enhance every experience",
  },
  {
    id: "3",
    text: "By observing my thoughts, I gain control over them",
  },
];

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedAffirmations, setSavedAffirmations] = useState<string[]>([]);

  const toggleSaveAffirmation = (id: string) => {
    setSavedAffirmations((prev) =>
      prev.includes(id)
        ? prev.filter((savedId) => savedId !== id)
        : [...prev, id]
    );
  };

  const renderContent = () => {
    if (activeTab === "affirmations") {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Affirmations</Text>
          {affirmations.map((affirmation) => (
            <AffirmationCard
              key={affirmation.id}
              text={affirmation.text}
              isSaved={savedAffirmations.includes(affirmation.id)}
              onSavePress={() => toggleSaveAffirmation(affirmation.id)}
            />
          ))}
        </View>
      );
    }

    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Playlists</Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>See all playlists</Text>
            <IconSymbol
              name="chevron.down"
              size={16}
              color={Colors.light.primary}
            />
          </TouchableOpacity>
        </View>
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist.id} {...playlist} />
        ))}
      </View>
    );
  };

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
          { paddingTop: insets.top + 16 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <ExploreBar onChangeText={setSearchQuery} />
        <FilterTabs
          tabs={filterTabs}
          activeTab={activeTab}
          onTabPress={setActiveTab}
          style={styles.filterTabs}
        />
        {renderContent()}
      </ScrollView>
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
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  filterTabs: {
    marginTop: 24,
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.light.text,
    letterSpacing: 0.3,
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
