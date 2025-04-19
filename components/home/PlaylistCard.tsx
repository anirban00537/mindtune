import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { PlaylistItem } from '@/data/playlists';

interface PlaylistCardProps {
  item: PlaylistItem;
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({ item }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/playlist/dummy`);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Image 
        source={{ uri: item.coverImage }} 
        style={styles.coverImage}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.metaText} numberOfLines={1}>
          {item.affirmationCount} affirmations • {item.duration}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#E0E0E0',
  },
  coverImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    gap: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  metaText: {
    fontSize: 12,
    color: '#E0E0E0',
    opacity: 0.9,
  },
}); 