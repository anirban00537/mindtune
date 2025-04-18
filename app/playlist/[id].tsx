import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { CardBase } from "@/components/ui/cards/CardBase";
import { AffirmationCard } from "@/components/ui/cards/AffirmationCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const COVER_IMAGE_SIZE = SCREEN_WIDTH - 64;

interface Affirmation {
  id: string;
  text: string;
}

interface PlaylistDetail {
  id: string;
  title: string;
  author: string;
  description: string;
  image: string;
  duration: string;
  affirmations: Affirmation[];
}

// Mock data following the same pattern as home screen
const playlists: Record<string, PlaylistDetail> = {
  "1": {
    id: "1",
    title: "Daily Money Affirmations",
    author: "MindTune",
    description:
      "Transform your relationship with wealth through powerful daily affirmations",
    image:
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    duration: "15 min",
    affirmations: [
      {
        id: "1",
        text: "I am a money magnet, and prosperity flows to me easily",
      },
      { id: "2", text: "I deserve abundance and welcome wealth into my life" },
      { id: "3", text: "Money comes to me in expected and unexpected ways" },
      { id: "4", text: "I am worthy of all the abundance the universe offers" },
      { id: "5", text: "My actions create constant prosperity" },
    ],
  },
};

export default function PlaylistDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isSaved, setIsSaved] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const playlist = playlists[id as string];

  if (!playlist) {
    return (
      <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.title}>Playlist not found</Text>
      </View>
    );
  }

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={Colors.gradients.background}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />

      <TouchableOpacity
        style={[styles.backButton, { marginTop: insets.top }]}
        onPress={() => router.back()}
      >
        <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
        <LinearGradient
          colors={Colors.gradients.pill}
          style={StyleSheet.absoluteFill}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 0.8, y: 1 }}
        />
        <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.saveButton, { marginTop: insets.top }]}
        onPress={handleSave}
      >
        <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
        <LinearGradient
          colors={isSaved ? Colors.gradients.pillActive : Colors.gradients.pill}
          style={StyleSheet.absoluteFill}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 0.8, y: 1 }}
        />
        <IconSymbol
          name={isSaved ? "heart.fill" : "heart"}
          size={24}
          color={isSaved ? Colors.light.primary : Colors.light.text}
        />
      </TouchableOpacity>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: insets.top + 32 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <View style={styles.coverContainer}>
            <CardBase intensity={15}>
              <Image
                source={{ uri: playlist.image }}
                style={styles.coverImage}
                resizeMode="cover"
                onLoadStart={() => setImageLoading(true)}
                onLoadEnd={() => setImageLoading(false)}
                onError={() => {
                  setImageLoading(false);
                  setImageError(true);
                }}
              />
              {imageLoading && (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator
                    size="large"
                    color={Colors.light.primary}
                  />
                </View>
              )}
              {!imageLoading && !imageError && (
                <>
                  <View style={styles.imageOverlay} />
                  <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.6)"]}
                    style={styles.gradientOverlay}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                  />
                </>
              )}
              {imageError && (
                <View style={styles.errorContainer}>
                  <IconSymbol
                    name="photo"
                    size={48}
                    color={Colors.light.textSecondary}
                  />
                  <Text style={styles.errorText}>Failed to load image</Text>
                </View>
              )}
              <TouchableOpacity style={styles.playButton}>
                <BlurView
                  intensity={25}
                  tint="dark"
                  style={StyleSheet.absoluteFill}
                />
                <LinearGradient
                  colors={Colors.gradients.primary}
                  style={StyleSheet.absoluteFill}
                  start={{ x: 0.2, y: 0 }}
                  end={{ x: 0.8, y: 1 }}
                >
                  <View style={styles.playButtonContent}>
                    <IconSymbol name="play.fill" size={32} color="#FFFFFF" />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </CardBase>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>{playlist.title}</Text>
          <Text style={styles.author}>{playlist.author}</Text>
          <Text style={styles.description}>{playlist.description}</Text>

          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <IconSymbol
                name="clock"
                size={16}
                color={Colors.light.textSecondary}
              />
              <Text style={styles.statText}>{playlist.duration}</Text>
            </View>
            <View style={styles.stat}>
              <IconSymbol
                name="text.bubble"
                size={16}
                color={Colors.light.textSecondary}
              />
              <Text style={styles.statText}>
                {playlist.affirmations.length} affirmations
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Affirmations</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>Shuffle</Text>
              <IconSymbol
                name="shuffle"
                size={16}
                color={Colors.light.primary}
              />
            </TouchableOpacity>
          </View>
          {playlist.affirmations.map((affirmation) => (
            <AffirmationCard
              key={affirmation.id}
              text={affirmation.text}
              style={styles.affirmationCard}
            />
          ))}
        </View>
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
    flexGrow: 1,
    paddingBottom: 120,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  coverContainer: {
    width: COVER_IMAGE_SIZE,
    height: COVER_IMAGE_SIZE,
    borderRadius: 24,
    overflow: "hidden",
    alignSelf: "center",
    position: "relative",
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },
  playButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  playButtonGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  playButtonContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    left: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  saveButton: {
    position: "absolute",
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  author: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    color: Colors.light.textSecondary,
    lineHeight: 22,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 16,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statText: {
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  affirmationCard: {
    marginBottom: 8,
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
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.card,
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.card,
    gap: 12,
  },
  errorText: {
    fontSize: 15,
    color: Colors.light.textSecondary,
  },
});
