import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  Image,
  Animated,
} from "react-native";
import { CardBase } from "./CardBase";
import Colors from "@/constants/Colors";
import { useRef, useCallback } from "react";

interface LastSessionCardProps {
  id: string;
  title: string;
  image: string;
  style?: ViewStyle;
  onPress?: () => void;
}

export function LastSessionCard({
  id,
  title,
  image,
  style,
  onPress,
}: LastSessionCardProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(() => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressOut = useCallback(() => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        style={[styles.container, style]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <CardBase intensity={20}>
          <View style={styles.card}>
            <Image
              source={{ uri: image }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.title}>
                {title}
              </Text>
            </View>
          </View>
        </CardBase>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 140,
    marginRight: 12,
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 16,
  },
  content: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.text,
    letterSpacing: 0.2,
  },
});
