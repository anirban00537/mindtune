import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  TextInput,
  Animated,
  Dimensions,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import { PlaylistCard } from "@/components/ui/cards/PlaylistCard";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { BlurView } from "expo-blur";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const GRID_SPACING = 12;
const NUM_COLUMNS = 2;
const CARD_WIDTH = (width - GRID_SPACING * 3) / NUM_COLUMNS;
const CARD_ASPECT_RATIO = 1.5; // Using the same aspect ratio as in PlaylistCard

interface Playlist {
  id: string;
  title: string;
  image: string;
  duration: string;
  author: string;
}

const playlists: Playlist[] = [
  {
    id: "1",
    title: "Morning Meditation",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    duration: "10 min",
    author: "MindTune",
  },
  {
    id: "2",
    title: "Peaceful Sleep",
    image:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    duration: "15 min",
    author: "Sleep Sounds",
  },
  {
    id: "3",
    title: "Mindful Living",
    image:
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    duration: "12 min",
    author: "Present Moment",
  },
  {
    id: "4",
    title: "Stress Relief",
    image:
      "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    duration: "8 min",
    author: "Calm Mind",
  },
  {
    id: "5",
    title: "Focus & Productivity",
    image:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    duration: "20 min",
    author: "Brain Power",
  },
  {
    id: "6",
    title: "Positive Affirmations",
    image:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    duration: "15 min",
    author: "Self Growth",
  },
];

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPlaylists, setFilteredPlaylists] =
    useState<Playlist[]>(playlists);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const searchBarSlideDown = useRef(new Animated.Value(-50)).current;
  const contentSlideUp = useRef(new Animated.Value(50)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  // Filter playlists based on search query
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = playlists.filter(
      (playlist) =>
        playlist.title.toLowerCase().includes(query) ||
        playlist.author.toLowerCase().includes(query)
    );
    setFilteredPlaylists(filtered);
  }, [searchQuery]);

  // Start entrance animations when component mounts
  useEffect(() => {
    Animated.stagger(150, [
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(searchBarSlideDown, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(contentSlideUp, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const renderGridItem = ({
    item,
    index,
  }: {
    item: Playlist;
    index: number;
  }) => {
    return (
      <Animated.View
        style={{
          width: CARD_WIDTH,
          margin: GRID_SPACING / 2,
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50 + index * 10, 0],
              }),
            },
          ],
        }}
      >
        <PlaylistCard
          id={item.id}
          title={item.title}
          image={item.image}
          author={item.author}
          duration={item.duration}
          style={{ width: CARD_WIDTH }}
          isFavorited={index % 2 === 0}
          onFavoritePress={() =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
          }
        />
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#2A1840", "#050812", "#050812", "#050812", "#050812"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <Animated.View
        style={[
          styles.searchContainer,
          {
            marginTop: insets.top + 16,
            opacity: fadeAnim,
            transform: [{ translateY: searchBarSlideDown }],
          },
        ]}
      >
        <View style={styles.searchRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              router.back();
            }}
          >
            <BlurView
              intensity={20}
              tint="dark"
              style={StyleSheet.absoluteFill}
            />
            <Ionicons name="chevron-back" size={24} color={Colors.light.text} />
          </TouchableOpacity>

          <View style={styles.searchInputContainer}>
            <Ionicons
              name="search"
              size={20}
              color={Colors.light.textSecondary}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search playlists..."
              placeholderTextColor={Colors.light.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
              returnKeyType="search"
              selectionColor={Colors.light.primary}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setSearchQuery("");
                }}
              >
                <Ionicons
                  name="close-circle"
                  size={20}
                  color={Colors.light.textSecondary}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.contentContainer,
          {
            paddingBottom: insets.bottom + 80,
            opacity: fadeAnim,
            transform: [{ translateY: contentSlideUp }],
            flex: 1,
          },
        ]}
      >
        {filteredPlaylists.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>
              {searchQuery ? "Search Results" : "Popular Playlists"}
            </Text>

            <FlatList
              data={filteredPlaylists}
              renderItem={renderGridItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.gridContainer}
              columnWrapperStyle={styles.columnWrapper}
            />
          </>
        ) : (
          <Animated.View
            style={[
              styles.noResultsContainer,
              {
                opacity: fadeAnim,
                transform: [{ scale: fadeAnim }],
              },
            ]}
          >
            <Ionicons
              name="search"
              size={48}
              color={Colors.light.textSecondary}
            />
            <Text style={styles.noResultsText}>No playlists found</Text>
            <Text style={styles.noResultsSubtext}>
              Try searching with different keywords
            </Text>
          </Animated.View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: Colors.light.text,
    fontSize: 16,
    paddingVertical: 8,
  },
  clearButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    flex: 1,
  },
  section: {
    marginBottom: 24,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.light.text,
    letterSpacing: 0.3,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  cardMargin: {
    marginBottom: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  noResultsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
    marginTop: 16,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginTop: 8,
  },
  gridContainer: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});
