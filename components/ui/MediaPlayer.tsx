import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Modal,
  ImageBackground,
  Dimensions,
  FlatList,
  ViewToken,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import Colors from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useMediaPlayer } from "@/context/MediaPlayerContext";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Dummy data for testing
const dummyData = {
  id: "dummy",
  title: "Mindful Moments",
  description: "A collection of calming affirmations for your daily practice.",
  duration: "~20 min read",
  affirmationCount: 25,
  coverImage:
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80",
  affirmations: [
    {
      id: "dt1",
      title: "I embrace this moment with peace and calm.",
      duration: "",
    },
    {
      id: "dt2",
      title: "I am centered, grounded, and balanced.",
      duration: "",
    },
    {
      id: "dt3",
      title: "My mind is clear and focused on the present.",
      duration: "",
    },
    {
      id: "dt4",
      title: "I release tension and welcome tranquility.",
      duration: "",
    },
    {
      id: "dt5",
      title: "I am grateful for this time to nurture myself.",
      duration: "",
    },
  ],
};

export default function MediaPlayer() {
  const { isVisible, currentPlaylist, hidePlayer } = useMediaPlayer();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const playlist = currentPlaylist || dummyData;

  // Debug log to check data
  console.log("Current Playlist:", playlist);
  console.log("Affirmations:", playlist.affirmations);

  const scrollToIndex = useCallback(
    (index: number, animated = true) => {
      if (
        flatListRef.current &&
        index >= 0 &&
        index < playlist.affirmations.length
      ) {
        flatListRef.current.scrollToIndex({ index, animated });
        setCurrentIndex(index);
      }
    },
    [playlist]
  );

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex < playlist.affirmations.length) {
            scrollToIndex(nextIndex);
            return nextIndex;
          } else {
            setIsPlaying(false);
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            return prevIndex;
          }
        });
      }, 2000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, playlist, scrollToIndex]);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        const newIndex = viewableItems[0].index;
        if (!isPlaying) {
          setCurrentIndex(newIndex);
        }
      }
    },
    [isPlaying]
  );

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: { viewAreaCoveragePercentThreshold: 50 },
      onViewableItemsChanged,
    },
  ]);

  const renderAffirmation = useCallback(
    ({ item }: { item: { id: string; text: string } }) => {
      return (
        <View style={styles.affirmationPage}>
          <View style={styles.affirmationContent}>
            <Text style={styles.affirmationText}>{item.text}</Text>
          </View>
        </View>
      );
    },
    []
  );

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prevIsPlaying) => {
      const newState = !prevIsPlaying;
      if (newState && currentIndex === playlist.affirmations.length - 1) {
        scrollToIndex(0);
      }
      return newState;
    });
  }, [currentIndex, playlist, scrollToIndex]);

  if (!isVisible) {
    return null;
  }

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={hidePlayer}
    >
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={{ uri: playlist.image || playlist.coverImage }}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        />
        <BlurView intensity={95} tint="dark" style={StyleSheet.absoluteFill} />

        <SafeAreaView style={styles.safeAreaContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={hidePlayer} style={styles.headerButton}>
              <Ionicons name="chevron-down" size={28} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {playlist.title}
            </Text>
            <View style={styles.headerButton} />
          </View>

          <View style={styles.contentContainer}>
            <FlatList
              ref={flatListRef}
              data={playlist.affirmations}
              renderItem={renderAffirmation}
              keyExtractor={(item) => item.id}
              pagingEnabled
              horizontal={false}
              showsVerticalScrollIndicator={false}
              style={styles.swiperList}
              contentContainerStyle={styles.swiperContentContainer}
              initialScrollIndex={currentIndex}
              onScrollToIndexFailed={(info) => {
                const wait = new Promise((resolve) => setTimeout(resolve, 500));
                wait.then(() => {
                  flatListRef.current?.scrollToIndex({
                    index: info.index,
                    animated: true,
                  });
                });
              }}
              viewabilityConfigCallbackPairs={
                viewabilityConfigCallbackPairs.current
              }
            />
          </View>

          <View style={styles.controlsContainer}>
            <View style={styles.topControlsRow}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => console.log("Repeat")}
              >
                <Ionicons
                  name="repeat"
                  size={24}
                  color="rgba(255, 255, 255, 0.8)"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => console.log("Add")}
              >
                <Ionicons
                  name="add-circle-outline"
                  size={26}
                  color="rgba(255, 255, 255, 0.8)"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => console.log("More")}
              >
                <Ionicons
                  name="ellipsis-horizontal"
                  size={26}
                  color="rgba(255, 255, 255, 0.8)"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.playPauseButton}
              onPress={togglePlayPause}
            >
              <Ionicons
                name={isPlaying ? "pause" : "play"}
                size={40}
                color="#000000"
              />
            </TouchableOpacity>

            <View style={styles.bottomOptionsRow}>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => console.log("Voice")}
              >
                <View style={styles.optionIconPlaceholder} />
                <Text style={styles.optionText}>Voice</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => console.log("Timer")}
              >
                <Ionicons
                  name="timer-outline"
                  size={22}
                  color="rgba(255, 255, 255, 0.8)"
                  style={styles.optionIcon}
                />
                <Text style={styles.optionText}>2 hours</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => console.log("Music")}
              >
                <View style={styles.optionIconPlaceholder} />
                <Text style={styles.optionText}>Music</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  safeAreaContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    height: 50,
  },
  headerButton: {
    padding: 5,
    minWidth: 40,
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginHorizontal: 10,
  },
  swiperList: {
    flex: 1,
  },
  swiperContentContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  affirmationPage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - 270,
    justifyContent: "center",
    alignItems: "center",
  },
  affirmationContent: {
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  affirmationText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 38,
    backgroundColor: "transparent",
  },
  controlsContainer: {
    height: 220,
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
  topControlsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
  },
  controlButton: {
    padding: 10,
  },
  playPauseButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bottomOptionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  optionIconPlaceholder: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  optionText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  optionIcon: {
    marginRight: 5,
  },
});
