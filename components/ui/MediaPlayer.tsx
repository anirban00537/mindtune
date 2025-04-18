import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "./IconSymbol";
import Colors from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MediaPlayer() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill}>
        <LinearGradient
          colors={Colors.gradients.tabBar}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </BlurView>

      <View style={styles.progress}>
        <LinearGradient
          colors={Colors.gradients.primary}
          style={[styles.progressBar, { width: "45%" }]} // This would be dynamic in real app
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.textContent}>
          <Text style={styles.title} numberOfLines={1}>
            Awaken Your Money Power
          </Text>
          <Text style={styles.author} numberOfLines={1}>
            by Innertune
          </Text>
        </View>

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
            <IconSymbol name="play.fill" size={24} color={Colors.light.text} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.light.card,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  progress: {
    width: "100%",
    height: 2,
    backgroundColor: Colors.light.border,
  },
  progressBar: {
    height: "100%",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 16,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 2,
    letterSpacing: 0.2,
  },
  author: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    letterSpacing: 0.1,
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: "hidden",
  },
  playButtonGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
