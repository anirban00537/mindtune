import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ViewStyle,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import Colors from "@/constants/Colors";
import { CardBase } from "./CardBase";

interface SessionCardProps {
  title: string;
  description: string;
  duration: string;
  image: string;
  style?: ViewStyle;
  onPress?: () => void;
  imageHeight?: number;
}

export function SessionCard({
  title,
  description,
  duration,
  image,
  style,
  onPress,
  imageHeight = 100,
}: SessionCardProps) {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <CardBase gradient={false}>
        <Image
          source={{ uri: image }}
          style={[styles.image, { height: imageHeight }]}
          resizeMode="cover"
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.6)"]}
          style={styles.imageOverlay}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 0.2, y: 1 }}
        />
        <View style={styles.content}>
          <View style={styles.textContent}>
            <Text numberOfLines={1} style={styles.title}>
              {title}
            </Text>
            <Text numberOfLines={1} style={styles.description}>
              {description}
            </Text>
            <View style={styles.durationContainer}>
              <Text style={styles.duration}>◷ {duration}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.playButton}>
            <BlurView
              intensity={20}
              tint="dark"
              style={StyleSheet.absoluteFill}
            />
            <LinearGradient
              colors={["rgba(124, 58, 237, 0.9)", "rgba(99, 102, 241, 0.9)"]}
              style={styles.playGradient}
              start={{ x: 0.2, y: 0 }}
              end={{ x: 0.8, y: 1 }}
            >
              <Text style={styles.playText}>▶</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </CardBase>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    borderRadius: 16,
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
    borderRadius: 16,
  },
  content: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContent: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 15,
    color: Colors.light.text,
    fontWeight: "600",
    marginBottom: 2,
    letterSpacing: 0.2,
  },
  description: {
    fontSize: 13,
    color: Colors.light.text,
    opacity: 0.8,
    marginBottom: 6,
    letterSpacing: 0.1,
  },
  durationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  duration: {
    fontSize: 12,
    color: Colors.light.text,
    opacity: 0.6,
    letterSpacing: 0.2,
  },
  playButton: {
    width: 34,
    height: 34,
    borderRadius: 12,
    overflow: "hidden",
  },
  playGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  playText: {
    color: Colors.light.text,
    fontSize: 15,
  },
});
