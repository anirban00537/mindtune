import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
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
  imageHeight = 120,
}: SessionCardProps) {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <CardBase gradient={false}>
        <Image
          source={{ uri: image }}
          style={[styles.image, { height: imageHeight }]}
        />
        <View style={styles.content}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.duration}>{duration}</Text>
          </View>
          <TouchableOpacity style={styles.playButton}>
            <LinearGradient
              colors={Colors.gradients.button}
              style={styles.playGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
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
  image: {
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  content: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    color: Colors.light.text,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: Colors.light.text,
    opacity: 0.8,
    marginBottom: 8,
  },
  duration: {
    fontSize: 12,
    color: Colors.light.text,
    opacity: 0.5,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  playGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  playText: {
    color: Colors.light.text,
    fontSize: 18,
  },
});
