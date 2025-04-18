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

interface SearchResultCardProps {
  title: string;
  description: string;
  duration: string;
  image: string;
  style?: ViewStyle;
  onPress?: () => void;
}

export function SearchResultCard({
  title,
  description,
  duration,
  image,
  style,
  onPress,
}: SearchResultCardProps) {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <CardBase gradient={false}>
        <View style={styles.contentContainer}>
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.textContainer}>
            <Text numberOfLines={1} style={styles.title}>
              {title}
            </Text>
            <Text numberOfLines={2} style={styles.description}>
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
              colors={Colors.gradients.button}
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
    width: "100%",
    height: 100,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: "100%",
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  textContainer: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    color: Colors.light.text,
    fontWeight: "600",
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  description: {
    fontSize: 13,
    color: Colors.light.text,
    opacity: 0.8,
    marginBottom: 6,
    letterSpacing: 0.1,
    lineHeight: 18,
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
    borderRadius: 17,
    overflow: "hidden",
    marginRight: 12,
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
