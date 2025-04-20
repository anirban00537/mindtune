import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  StatusBar,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PlaylistCard } from "@/components/ui/cards/PlaylistCard";

// Mock data for favorite playlists - you should replace this with real data management
const favoritePlaylists = [
  {
    id: "fav1",
    title: "Deep Focus",
    image:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    author: "MindTune",
  },
  {
    id: "fav2",
    title: "Peaceful Sleep",
    image:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    author: "Sleep Well",
  },
  {
    id: "fav3",
    title: "Morning Motivation",
    image:
      "https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    author: "Rise & Shine",
  },
];

export default function FavoritesScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#2A1840", "#050812", "#050812", "#050812", "#050812"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Favorites</Text>
        </View>

        {/* Favorites Grid */}
        <View style={styles.grid}>
          {favoritePlaylists.map((playlist) => (
            <View key={playlist.id} style={styles.gridItem}>
              <PlaylistCard
                id={playlist.id}
                title={playlist.title}
                image={playlist.image}
                author={playlist.author}
                isFavorited={true}
                onFavoritePress={() => {
                  // Implement remove from favorites functionality
                  console.log("Remove from favorites:", playlist.id);
                }}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  headerContainer: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: Colors.light.text,
    letterSpacing: 0.4,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },
  gridItem: {
    // The width will be calculated based on the PlaylistCard's width
  },
});
