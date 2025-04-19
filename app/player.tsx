import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  ImageBackground,
  ViewToken,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { PlaylistItem } from '@/data/playlists'; // Assuming interfaces are still in data/playlists

// Re-define or import the dummy data (using the same data as playlist screen for now)
const dummyPlaylist: PlaylistItem = {
  id: 'dummy',
  title: 'Mindful Moments', // Title for the header
  description: 'A collection of calming affirmations for your daily practice.',
  duration: '~20 min read',
  affirmationCount: 25,
  coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80',
  affirmations: [
    { id: 'dt1', title: 'I embrace this moment with peace and calm.', duration: '' },
    { id: 'dt2', title: 'I am centered, grounded, and balanced.', duration: '' },
    { id: 'dt3', title: 'My mind is clear and focused on the present.', duration: '' },
    { id: 'dt4', title: 'I release tension and welcome tranquility.', duration: '' },
    { id: 'dt5', title: 'I am grateful for this time to nurture myself.', duration: '' },
    { id: 'dt6', title: 'I inhale peace, I exhale stress.', duration: '' },
    { id: 'dt7', title: 'My potential is limitless.', duration: '' },
    { id: 'dt8', title: 'I trust the journey of my life.', duration: '' },
    { id: 'dt9', title: 'I am worthy of love and belonging.', duration: '' },
    { id: 'dt10', title: 'I choose positivity and optimism.', duration: '' },
    { id: 'dt11', title: 'My body is healthy and strong.', duration: '' },
    { id: 'dt12', title: 'I attract abundance and prosperity.', duration: '' },
    { id: 'dt13', title: 'I am confident in my abilities.', duration: '' },
    { id: 'dt14', title: 'I forgive myself and others freely.', duration: '' },
    { id: 'dt15', title: 'I create happiness from within.', duration: '' },
    { id: 'dt16', title: 'My creativity flows effortlessly.', duration: '' },
    { id: 'dt17', title: 'I handle challenges with grace and ease.', duration: '' },
    { id: 'dt18', title: 'I am surrounded by supportive energy.', duration: '' },
    { id: 'dt19', title: 'Every day brings new opportunities.', duration: '' },
    { id: 'dt20', title: 'I am enough, just as I am.', duration: '' },
    { id: 'dt21', title: 'I listen to my intuition.', duration: '' },
    { id: 'dt22', title: 'I radiate kindness and compassion.', duration: '' },
    { id: 'dt23', title: 'I learn and grow stronger every day.', duration: '' },
    { id: 'dt24', title: 'My future is bright and full of possibilities.', duration: '' },
    { id: 'dt25', title: 'I am deserving of all good things.', duration: '' },
  ],
};

// Use a different background image for the player if desired
const playerBackgroundImage = 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&auto=format&fit=crop&q=80';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function PlayerScreen() {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const [isPlaying, setIsPlaying] = useState(false); // Start paused
  const [currentIndex, setCurrentIndex] = useState(0); // Track current index
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Ref to store interval ID

  // Function to scroll to a specific index
  const scrollToIndex = (index: number, animated = true) => {
    if (flatListRef.current && index >= 0 && index < dummyPlaylist.affirmations.length) {
      flatListRef.current.scrollToIndex({ index, animated });
      setCurrentIndex(index); // Update state when scrolling programmatically
    }
  };

  // Effect to handle auto-scrolling
  useEffect(() => {
    // Clear any existing interval first
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex < dummyPlaylist.affirmations.length) {
            scrollToIndex(nextIndex);
            return nextIndex;
          } else {
            // Reached the end: Stop playing and clear interval
            setIsPlaying(false);
            if (intervalRef.current) {
               clearInterval(intervalRef.current);
               intervalRef.current = null;
            }
            return prevIndex; // Stay on the last index
            // Or loop back: scrollToIndex(0); return 0;
          }
        });
      }, 2000); // 2 seconds interval
    }

    // Cleanup function to clear interval on unmount or when isPlaying changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying]); // Rerun effect when isPlaying changes

  // Update currentIndex when user swipes manually
  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      const newIndex = viewableItems[0].index;
      // Only update if not currently auto-playing to avoid conflicts
      if (!isPlaying) {
         setCurrentIndex(newIndex);
      }
    }
  }, [isPlaying]);

  const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig: { viewAreaCoveragePercentThreshold: 50 }, onViewableItemsChanged }]);

  const renderAffirmation = ({ item }: { item: { id: string; title: string } }) => {
    return (
      <View style={styles.affirmationPage}>
        <Text style={styles.affirmationText}>{item.title}</Text>
      </View>
    );
  };

  // Toggle Play/Pause and handle starting scroll from beginning if paused at end
  const togglePlayPause = () => {
      setIsPlaying(prevIsPlaying => {
          const newState = !prevIsPlaying;
          // If starting play and currently at the last slide, reset to beginning
          if (newState && currentIndex === dummyPlaylist.affirmations.length - 1) {
              scrollToIndex(0); 
          }
          return newState;
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Stack.Screen options={{ headerShown: false }} />

      {/* Background Image */}
      <ImageBackground
        source={{ uri: playerBackgroundImage }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      {/* Dark Blur Overlay - Increased intensity */}
      <BlurView intensity={95} tint="dark" style={StyleSheet.absoluteFill} />

      {/* Header (Transparent Background) */}
      <SafeAreaView style={styles.headerSafeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
            <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{dummyPlaylist.title}</Text>
          <View style={styles.headerButton} />{/* Spacer */}
        </View>
      </SafeAreaView>

      {/* Affirmation Swiper */}
      <FlatList
        ref={flatListRef}
        data={dummyPlaylist.affirmations}
        renderItem={renderAffirmation}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        style={styles.swiperList}
        contentContainerStyle={styles.swiperContentContainer}
        initialScrollIndex={currentIndex} // Start at the current index
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        // Prevent manual scroll when auto-playing? (optional)
        // scrollEnabled={!isPlaying} 
      />

      {/* Bottom Controls Area (No separate background) */}
      <SafeAreaView style={styles.controlsSafeArea}>
        <View style={styles.controlsContainer}>
          {/* Top row controls */}
          <View style={styles.topControlsRow}>
            {/* Adjusted icon colors for better visibility on blur */}
            <TouchableOpacity style={styles.controlButton} onPress={() => console.log('Repeat')}>
              <Ionicons name="repeat" size={24} color="rgba(255, 255, 255, 0.8)" /> 
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton} onPress={() => console.log('Add')}>
               <Ionicons name="add-circle-outline" size={26} color="rgba(255, 255, 255, 0.8)" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton} onPress={() => console.log('More')}>
               <Ionicons name="ellipsis-horizontal" size={26} color="rgba(255, 255, 255, 0.8)" />
            </TouchableOpacity>
          </View>

          {/* Updated Play/Pause Button */}
          <TouchableOpacity 
            style={styles.playPauseButton} 
            onPress={togglePlayPause} // Use new handler
          >
            <Ionicons name={isPlaying ? "pause" : "play"} size={40} color="#000000" />
          </TouchableOpacity>

          {/* Bottom Options Row */}
          <View style={styles.bottomOptionsRow}>
            <TouchableOpacity style={styles.optionButton} onPress={() => console.log('Voice')}>
               <View style={styles.optionIconPlaceholder} />
              <Text style={styles.optionText}>Voice</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => console.log('Timer')}>
              <Ionicons name="timer-outline" size={22} color="rgba(255, 255, 255, 0.8)" style={styles.optionIcon} /> 
              <Text style={styles.optionText}>2 hours</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => console.log('Music')}>
               <View style={styles.optionIconPlaceholder} />
              <Text style={styles.optionText}>Music</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Dark fallback
  },
  headerSafeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'transparent', // Ensure header area is transparent
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: StatusBar.currentHeight || 0,
    height: 50 + (StatusBar.currentHeight || 0), // Adjust height for status bar
  },
  headerButton: {
    padding: 5,
    minWidth: 40,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  swiperList: {
    flex: 1,
  },
  swiperContentContainer: {
    // No specific styles needed here typically for vertical full screen
  },
  affirmationPage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT, // Ensure height is full screen
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    // No need for explicit margins if using full height
    // paddingBottom: 220, 
    // paddingTop: 50 + (StatusBar.currentHeight || 0),
  },
  affirmationText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 42,
    // Remove text shadow if desired on dark blur
    // textShadowColor: 'rgba(0, 0, 0, 0.5)', 
    // textShadowOffset: { width: 0, height: 1 },
    // textShadowRadius: 3,
  },
  controlsSafeArea: { // SafeAreaView for the controls at the bottom
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
  },
  controlsContainer: {
    // position: 'absolute', // Positioned by SafeAreView now
    // bottom: 0,
    // left: 0,
    // right: 0,
    height: 220,
    paddingTop: 10,
    paddingBottom: 15, // Adjusted padding
    paddingHorizontal: 30,
    alignItems: 'center',
    // backgroundColor: '#1C1C1E', // Removed background color
    // Removed border radius as it's not a separate block
    // borderTopLeftRadius: 20, 
    // borderTopRightRadius: 20,
  },
  topControlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
    marginBottom: 15,
  },
  controlButton: {
    padding: 10,
  },
  playPauseButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bottomOptionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    // Updated background for better visibility on blur
    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    gap: 8,
  },
  optionIcon: {
    opacity: 0.8, // Slightly dimmed icon
  },
  optionIconPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Adjusted placeholder
  },
  optionText: {
    color: '#FFFFFF', // White text for contrast
    fontSize: 14,
    fontWeight: '500',
  },
}); 