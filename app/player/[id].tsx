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
  ImageBackground,
  ViewToken,
} from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { PlaylistItem, Affirmation, playlists } from '@/data/playlists';

// Re-introduce dummy data for debugging
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
    // Add more dummy affirmations if needed
  ],
};

const playerBackgroundImage = dummyPlaylist.coverImage; // Use dummy image

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function PlayerScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>(); // Keep fetching id, but don't use playlist from it for now
  const flatListRef = useRef<FlatList>(null);
  const [isPlaying, setIsPlaying] = useState(false); // Start paused
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // const playlist = playlists.find((p: PlaylistItem) => p.id === id); // Temporarily disable dynamic playlist loading
  const playlist = dummyPlaylist; // Use dummy playlist data

  // Function to scroll to a specific index
  const scrollToIndex = (index: number, animated = true) => {
    // Use dummyPlaylist.affirmations.length
    if (flatListRef.current && index >= 0 && index < dummyPlaylist.affirmations.length) {
      flatListRef.current.scrollToIndex({ index, animated });
      setCurrentIndex(index);
    }
  };

  // Effect to handle auto-scrolling
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    // Use dummyPlaylist.affirmations.length
    if (isPlaying && dummyPlaylist) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          // Use dummyPlaylist.affirmations.length
          if (nextIndex < dummyPlaylist.affirmations.length) {
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
  }, [isPlaying]); // Dependency array now only includes isPlaying

  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      const newIndex = viewableItems[0].index;
      if (!isPlaying) {
         setCurrentIndex(newIndex);
      }
    }
  }, [isPlaying]);

  const viewabilityConfigCallbackPairs = useRef([{
     viewabilityConfig: { viewAreaCoveragePercentThreshold: 50 }, 
     onViewableItemsChanged 
    }]);

  const renderAffirmation = ({ item }: { item: Affirmation }) => {
    return (
      <View style={styles.affirmationPage}>
        <Text style={styles.affirmationText}>{item.title}</Text>
      </View>
    );
  };
  
  const togglePlayPause = () => {
      setIsPlaying(prevIsPlaying => {
          const newState = !prevIsPlaying;
          // Use dummyPlaylist.affirmations.length
          if (newState && currentIndex === dummyPlaylist.affirmations.length - 1) {
              scrollToIndex(0);
          }
          return newState;
      });
  };

  // Handling case where playlist is not found (Shouldn't happen with dummy data)
  // if (!playlist) { ... } // Can be temporarily commented out or kept

  // Main Player UI Render
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Stack.Screen options={{ headerShown: false }} />

      {/* Background Image from Playlist */}
      <ImageBackground
        source={{ uri: playerBackgroundImage }} // Use static dummy image
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      <BlurView intensity={95} tint="dark" style={StyleSheet.absoluteFill} />

      {/* Single SafeAreaView for all foreground content */}
      <SafeAreaView style={styles.safeAreaContainer}>
        {/* Header moved inside SafeAreaView */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
            <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>{playlist.title}</Text>
          <View style={styles.headerButton} />{/* Spacer */}
        </View>

        {/* Affirmation Swiper */}
        <FlatList
          ref={flatListRef}
          data={playlist.affirmations} // Use dummy affirmations
          renderItem={renderAffirmation}
          keyExtractor={(item) => item.id}
          pagingEnabled
          horizontal={false}
          showsVerticalScrollIndicator={false}
          style={styles.swiperList}
          contentContainerStyle={styles.swiperContentContainer}
          initialScrollIndex={currentIndex}
          onScrollToIndexFailed={(info) => {
             const wait = new Promise(resolve => setTimeout(resolve, 500));
             wait.then(() => {
               flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
             });
          }}
          viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        />

        {/* Controls moved inside SafeAreaView */}
        <View style={styles.controlsContainer}>
           <View style={styles.topControlsRow}>
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

           <TouchableOpacity style={styles.playPauseButton} onPress={togglePlayPause}>
             <Ionicons name={isPlaying ? "pause" : "play"} size={40} color="#000000" />
           </TouchableOpacity>
           
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
    backgroundColor: '#000',
  },
  safeAreaContainer: { // New style for the main SafeAreaView
      flex: 1,
      // Remove background color if needed, handled by parent View
  },
  // Header Styles (Removed SafeArea wrapper style)
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Use space-between for alignment
    alignItems: 'center',
    paddingHorizontal: 15, // Keep horizontal padding
    // Removed paddingTop and fixed height - let SafeAreaView handle top padding
    height: 50, // Keep a fixed height for the header bar itself
  },
  headerButton: {
    padding: 5,
    minWidth: 40,
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginHorizontal: 10,
  },
  // Swiper Styles (Adjusted margins/flex)
  swiperList: {
    flex: 1, // Allow FlatList to take remaining space between header and controls
    // Removed marginTop/marginBottom
  },
  swiperContentContainer: {
     // paddingBottom might be needed if content scrolls under controls
  },
  affirmationPage: {
    width: SCREEN_WIDTH,
    // Height calculation needs to adapt or be handled by flex
    // flex: 1 might work here if swiperList has flex: 1
    height: '100%', // Try letting FlatList manage height
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  affirmationText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 38,
  },
  // Controls Styles (Removed SafeArea wrapper style)
  controlsContainer: {
    height: 220, // Keep fixed height
    paddingTop: 10,
    paddingBottom: 15, // Bottom padding handled by SafeAreaView
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    // Removed position: 'absolute' - now positioned by flex layout
  },
  topControlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
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
    marginRight: 10,
  },
  optionIconPlaceholder: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  optionIcon: {
    marginRight: 5,
  },
  notFoundText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 15,
  },
  backButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  backLink: {
    color: '#BBBBBB',
    fontSize: 16,
  },
}); 