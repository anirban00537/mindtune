import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { CardBase } from "@/components/ui/cards/CardBase";
import { AffirmationCard } from "@/components/ui/cards/AffirmationCard";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useState } from "react";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const COVER_IMAGE_SIZE = SCREEN_WIDTH - 64;

export default function PlaylistDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);

  // This would typically come from your data store
  const playlist = {
    id: "1",
    title: "Daily Money Affirmations",
    author: "MindTune",
    description:
      "Transform your relationship with wealth through powerful daily affirmations",
    image: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6",
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
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const HeaderImage = () => (
    <View style={styles.headerContent}>
      <View style={styles.coverContainer}>
        <CardBase intensity={15}>
          <Image
            source={{ uri: playlist.image }}
            style={styles.coverImage}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.playButton}>
            <BlurView
              intensity={20}
              tint="dark"
              style={StyleSheet.absoluteFill}
            />
            <LinearGradient
              colors={Colors.gradients.primary}
              style={styles.playButtonGradient}
              start={{ x: 0.2, y: 0 }}
              end={{ x: 0.8, y: 1 }}
            >
              <Ionicons name="play" size={32} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </CardBase>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={Colors.gradients.background}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
        <LinearGradient
          colors={Colors.gradients.pill}
          style={StyleSheet.absoluteFill}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 0.8, y: 1 }}
        />
        <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
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

      <ParallaxScrollView
        headerImage={<HeaderImage />}
        headerBackgroundColor={{
          light: Colors.light.background,
          dark: Colors.dark.background,
        }}
      >
        <View >
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

          <View style={styles.affirmationsSection}>
            <Text style={styles.sectionTitle}>Affirmations</Text>
            {playlist.affirmations.map((affirmation) => (
              <AffirmationCard
                key={affirmation.id}
                text={affirmation.text}
                style={styles.affirmationCard}
              />
            ))}
          </View>
        </View>
      </ParallaxScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  headerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  coverContainer: {
    width: COVER_IMAGE_SIZE,
    height: COVER_IMAGE_SIZE,
    borderRadius: 24,
    overflow: "hidden",
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  playButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: "hidden",
  },
  playButtonGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 48,
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
    top: 48,
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
    marginBottom: 32,
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  affirmationsSection: {
    gap: 12,
  },
  affirmationCard: {
    marginBottom: 8,
  },
});
