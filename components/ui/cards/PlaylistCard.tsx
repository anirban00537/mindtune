import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "../IconSymbol";
import Colors from "@/constants/Colors";
import { CardBase } from "./CardBase";

interface PlaylistCardProps {
  title: string;
  image: string;
  author?: string;
  duration?: string;
  style?: ViewStyle;
  onPress?: () => void;
  onOptionsPress?: () => void;
}

export function PlaylistCard({
  title,
  image,
  author = "by Innertune",
  duration,
  style,
  onPress,
  onOptionsPress,
}: PlaylistCardProps) {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <CardBase>
        <View style={styles.content}>
          <Image source={{ uri: image }} style={styles.image} />
          <View style={styles.textContent}>
            <Text numberOfLines={1} style={styles.title}>
              {title}
            </Text>
            <Text style={styles.author}>{author}</Text>
            {duration && <Text style={styles.duration}>◷ {duration}</Text>}
          </View>
          <TouchableOpacity
            style={styles.optionsButton}
            onPress={onOptionsPress}
            hitSlop={8}
          >
            <IconSymbol
              name="ellipsis"
              size={20}
              color="rgba(255, 255, 255, 0.6)"
            />
          </TouchableOpacity>
        </View>
      </CardBase>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 12,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 12,
  },
  textContent: {
    flex: 1,
    marginHorizontal: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  author: {
    fontSize: 14,
    color: Colors.light.text,
    opacity: 0.6,
    marginBottom: 2,
  },
  duration: {
    fontSize: 13,
    color: Colors.light.text,
    opacity: 0.5,
  },
  optionsButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
