import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  Animated,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";
import { IconSymbol } from "./IconSymbol";
import { useState, useRef } from "react";

export default function Header() {
  const [isFocused, setIsFocused] = useState(false);
  const animatedScale = useRef(new Animated.Value(1)).current;

  const handleSearchFocus = () => {
    setIsFocused(true);
    Animated.spring(animatedScale, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handleSearchBlur = () => {
    setIsFocused(false);
    Animated.spring(animatedScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.searchContainer,
          { transform: [{ scale: animatedScale }] },
        ]}
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
          color={isFocused ? Colors.light.primary : Colors.light.textSecondary}
        />
        <TextInput
          placeholder="Search sessions..."
          placeholderTextColor={Colors.light.textSecondary}
          style={[styles.searchInput, isFocused && styles.searchInputFocused]}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
        />
        <TouchableOpacity style={styles.timerButton}>
          <IconSymbol
            name="timer"
            size={22}
            color={Colors.light.textSecondary}
          />
        </TouchableOpacity>
      </Animated.View>
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
  logoContainer: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  logoGlow: {
    position: "absolute",
    width: "150%",
    height: "150%",
    borderRadius: 33,
    opacity: 0.6,
    transform: [{ scale: 1.2 }],
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
    color: Colors.light.text,
    fontSize: 16,
    height: "100%",
    ...Platform.select({
      ios: {
        paddingTop: 2,
      },
    }),
  },
  searchInputFocused: {
    color: Colors.light.text,
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
