import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  Animated,
  Text,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useState, useRef } from "react";
import { IconSymbol } from "./IconSymbol";
import { useRouter } from "expo-router";

export default function Header() {
  const [isFocused, setIsFocused] = useState(false);
  const animatedScale = useRef(new Animated.Value(1)).current;
  const router = useRouter();

  const handleSearchPress = () => {
    router.push("/search");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.searchContainer]}
        onPress={handleSearchPress}
        activeOpacity={0.8}
      >
        <BlurView intensity={8} tint="dark" style={StyleSheet.absoluteFill}>
          <LinearGradient
            colors={Colors.gradients.card}
            style={StyleSheet.absoluteFill}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 0.8, y: 1 }}
          />
        </BlurView>
        <IconSymbol
          name="magnifyingglass"
          size={20}
          color={Colors.light.textSecondary}
        />
        <View style={styles.searchInput}>
          <Text style={styles.searchPlaceholder}>Search sessions...</Text>
        </View>
        <TouchableOpacity style={styles.timerButton}>
          <Ionicons
            name="timer-outline"
            size={22}
            color={Colors.light.textSecondary}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 12,
    marginTop: 16,
  },
  searchContainer: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.light.cardBorder,
    gap: 8,
    overflow: "hidden",
  },
  searchInput: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
  },
  searchPlaceholder: {
    color: Colors.light.textSecondary,
    fontSize: 16,
  },
  timerButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.pill,
  },
});
