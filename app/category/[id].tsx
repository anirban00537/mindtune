import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  StatusBar,
  Animated,
  Dimensions,
  FlatList,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { CategoryCard } from "@/components/ui/cards/CategoryCard";

const { width } = Dimensions.get("window");
const SPACING = 16;
const CARD_WIDTH = width - SPACING * 2;
const CARD_HEIGHT = 90; // Reduced from 120 for more compact cards

interface Playlist {
  id: string;
  title: string;
  image: string;
  duration: string;
  author: string;
}

// Mock data for demonstration - replace with actual data fetching later
const categoryPlaylists: Record<string, Playlist[]> = {
  "Last Sessions": [
    {
      id: "ls1",
      title: "Be A Better Friend",
      image:
        "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=300",
      duration: "10 min",
      author: "MindTune",
    },
    {
      id: "ls2",
      title: "Be Happy",
      image:
        "https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=300",
      duration: "12 min",
      author: "MindTune",
    },
    {
      id: "ls3",
      title: "Enjoy Reading",
      image:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=300",
      duration: "8 min",
      author: "MindTune",
    },
    {
      id: "ls4",
      title: "Feeling Bold",
      image:
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=300",
      duration: "11 min",
      author: "MindTune",
    },
    {
      id: "ls5",
      title: "Save Money",
      image:
        "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=300",
      duration: "9 min",
      author: "MindTune",
    },
    {
      id: "ls6",
      title: "Get Out Of Debt",
      image:
        "https://images.unsplash.com/photo-1611995901659-a75a6c10f735?w=300",
      duration: "13 min",
      author: "MindTune",
    },
  ],
  "Money Manifestation": [
    {
      id: "exp1",
      title: "Money Manifestation",
      image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=300",
      duration: "15 min",
      author: "Wealth Vibes",
    },
    {
      id: "exp2",
      title: "Abundance Mindset",
      image:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=300",
      duration: "14 min",
      author: "Prosperity Now",
    },
    {
      id: "exp3",
      title: "Attract Wealth Hypnosis",
      image:
        "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=300",
      duration: "18 min",
      author: "MindTune Finance",
    },
  ],
  "Brain Power": [
    {
      id: "bp1",
      title: "Focus Enhancement",
      image:
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=300",
      duration: "10 min",
      author: "Cognitive Boost",
    },
    {
      id: "bp2",
      title: "Memory Improvement",
      image:
        "https://images.unsplash.com/photo-1580894908361-967195033215?w=300",
      duration: "12 min",
      author: "Mind Sharpener",
    },
    {
      id: "bp3",
      title: "Creative Thinking Flow",
      image:
        "https://images.unsplash.com/photo-1509966756634-9c23dd6e6815?w=300",
      duration: "11 min",
      author: "Idea Spark",
    },
  ],
  "Exam Affirmations": [
    {
      id: "ea1",
      title: "Confident Test Taking",
      image:
        "https://images.unsplash.com/photo-1453928582365-b6ad33cb1289?w=300",
      duration: "12 min",
      author: "Study Success",
    },
    {
      id: "ea2",
      title: "Calm Exam Nerves",
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=300",
      duration: "10 min",
      author: "Academic Peace",
    },
    {
      id: "ea3",
      title: "Recall Information Easily",
      image:
        "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=300",
      duration: "14 min",
      author: "Test Ace",
    },
  ],
};

export default function CategoryPlaylistScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id: categoryId } = useLocalSearchParams<{ id: string }>();
  const categoryName = categoryId ? decodeURIComponent(categoryId) : "Category";
  const [playlistsToShow, setPlaylistsToShow] = useState<Playlist[]>([]);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const headerSlideDown = useRef(new Animated.Value(-50)).current;
  const contentSlideUp = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    if (categoryId) {
      setPlaylistsToShow(categoryPlaylists[categoryName] || []);
    }
  }, [categoryId, categoryName]);

  // Start entrance animations when component mounts
  useEffect(() => {
    Animated.stagger(150, [
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(headerSlideDown, {
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

  const renderItem = ({ item, index }: { item: Playlist; index: number }) => (
    <CategoryCard
      id={item.id}
      title={item.title}
      image={item.image}
      author={item.author}
      duration={item.duration}
      index={index}
      style={{
        opacity: fadeAnim,
        transform: [
          {
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [20 + index * 10, 0],
            }),
          },
        ],
      }}
    />
  );

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
          styles.headerContainer,
          {
            paddingTop: insets.top + 16,
            opacity: fadeAnim,
            transform: [{ translateY: headerSlideDown }],
          },
        ]}
      >
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
        <Text style={styles.headerTitle}>{categoryName}</Text>
        <View style={styles.placeholder} />
      </Animated.View>

      <Animated.View
        style={[
          styles.contentContainer,
          {
            paddingBottom: insets.bottom + 20,
            opacity: fadeAnim,
            transform: [{ translateY: contentSlideUp }],
            flex: 1,
          },
        ]}
      >
        {playlistsToShow.length > 0 ? (
          <FlatList
            data={playlistsToShow}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
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
              name="list"
              size={48}
              color={Colors.light.textSecondary}
            />
            <Text style={styles.noResultsText}>No playlists found</Text>
            <Text style={styles.noResultsSubtext}>
              This category is currently empty
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
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.light.text,
    letterSpacing: 0.3,
    textAlign: "center",
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
  placeholder: {
    width: 44, // Same width as back button for balance
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: SPACING,
  },
  listContainer: {
    paddingTop: 8,
    paddingBottom: 20,
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
});
