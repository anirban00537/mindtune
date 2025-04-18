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
import { useState, useRef, useCallback } from "react";

interface ExploreBarProps {
  onChangeText?: (text: string) => void;
}

export default function ExploreBar({ onChangeText }: ExploreBarProps) {
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);
  const animatedScale = useRef(new Animated.Value(1)).current;
  const inputRef = useRef<TextInput>(null);

  const handlePressIn = useCallback(() => {
    Animated.spring(animatedScale, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressOut = useCallback(() => {
    Animated.spring(animatedScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    handlePressOut();
  }, [handlePressOut]);

  const SearchContent = () => (
    <View style={styles.searchInner}>
      <IconSymbol
        name="magnifyingglass"
        size={22}
        color={isFocused ? Colors.light.primary : "rgba(255, 255, 255, 0.8)"}
      />
      <TextInput
        ref={inputRef}
        style={[styles.input, isFocused && styles.inputFocused]}
        placeholder="Search meditations..."
        placeholderTextColor="rgba(255, 255, 255, 0.6)"
        onFocus={handleFocus}
        onBlur={() => setIsFocused(false)}
        onChangeText={onChangeText}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {isFocused && (
        <Pressable
          onPress={() => {
            if (inputRef.current) {
              inputRef.current.clear();
              if (onChangeText) onChangeText("");
            }
          }}
          hitSlop={8}
        >
          <IconSymbol
            name="xmark.circle.fill"
            size={20}
            color="rgba(255, 255, 255, 0.4)"
          />
        </Pressable>
      )}
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <Pressable
        onPressIn={!isFocused ? handlePressIn : undefined}
        onPressOut={!isFocused ? handlePressOut : undefined}
        onPress={() => {
          if (!isFocused) {
            inputRef.current?.focus();
          }
        }}
      >
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
    borderRadius: 16,
    overflow: "hidden",
  },
  searchContainer: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    overflow: "hidden",
  },
  searchInner: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 48,
    gap: 12,
  },
  input: {
    flex: 1,
    color: Colors.light.text,
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
    color: Colors.light.text,
  },
});
