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
  // const [isFocused, setIsFocused] = useState(false); // Keep if needed for actual input
  // const animatedScale = useRef(new Animated.Value(1)).current; // Keep if animations are added
  const router = useRouter();

  const handleSearchPress = () => {
    router.push("/search"); // Assuming /search route exists
  };

  const handleTimerPress = () => {
    // Add navigation or action for timer button
    console.log("Timer pressed");
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TouchableOpacity
        style={styles.searchContainer}
        onPress={handleSearchPress}
        activeOpacity={0.8}
      >
        <BlurView 
          intensity={8}
          tint="light"
          style={styles.blurViewStyle}
        >
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </BlurView>
        <IconSymbol
          name="magnifyingglass"
          size={20}
          color={Colors.light.textSecondary}
        />
        <View style={styles.searchInputView}>
          <Text style={styles.searchPlaceholder}>Search sessions...</Text>
        </View>
      </TouchableOpacity>
      
      {/* Timer Button */}
      <TouchableOpacity 
        style={styles.timerButtonContainer}
        onPress={handleTimerPress}
        activeOpacity={0.8}
      >
        <BlurView 
          intensity={8}
          tint="light"
          style={styles.blurViewStyle}
        >
             <LinearGradient
                colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']}
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
             />
        </BlurView>
         <Ionicons
          name="timer-outline"
          size={22}
          color={Colors.light.textSecondary}
        />
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
    marginBottom: 8,
  },
  searchContainer: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    gap: 10,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  searchInputView: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
  },
  searchPlaceholder: {
    color: Colors.light.textSecondary,
    fontSize: 16,
  },
  timerButtonContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    overflow: "hidden",
     ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  blurViewStyle: {
     ...StyleSheet.absoluteFillObject,
     borderRadius: 22,
     overflow: 'hidden',
  },
});
