import {
  StyleSheet,
  TextInput,
  View,
  Platform,
  Pressable,
  Animated,
} from "react-native";
import { IconSymbol } from "./IconSymbol";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";
import { useState, useRef } from "react";

export default function ExploreBar() {
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);
  const animatedScale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(animatedScale, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const SearchContent = () => (
    <View style={styles.searchInner}>
      <IconSymbol
        name="magnifyingglass"
        size={24}
        color="rgba(255, 255, 255, 0.8)"
      />
      <TextInput
        style={[styles.input, isFocused && styles.inputFocused]}
        placeholder="Find your perfect meditation..."
        placeholderTextColor="rgba(255, 255, 255, 0.6)"
        onFocus={() => {
          setIsFocused(true);
          router.push("/explore");
        }}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Animated.View
          style={[
            styles.animatedContainer,
            { transform: [{ scale: animatedScale }] },
          ]}
        >
          <BlurView intensity={10} tint="dark" style={styles.searchContainer}>
            <LinearGradient
              colors={Colors.gradients.card}
              style={StyleSheet.absoluteFill}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            <SearchContent />
          </BlurView>
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  animatedContainer: {
    borderRadius: 20,
    overflow: "hidden",
  },
  searchContainer: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    overflow: "hidden",
  },
  searchInner: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    height: 54,
    gap: 14,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    height: "100%",
    ...Platform.select({
      ios: {
        paddingTop: 2,
      },
    }),
  },
  inputFocused: {
    color: "#fff",
  },
});
