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
        style={styles.searchContainer} // Apply shadow/elevation here
        onPress={handleSearchPress}
        activeOpacity={0.8}
      >
        <BlurView 
          intensity={60} // Match standard intensity
          tint="dark" 
          style={StyleSheet.absoluteFill} // Blur covers the whole container
        >
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']} // Match standard gradient
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }} // Adjust gradient direction if needed
            end={{ x: 1, y: 1 }}
          />
        </BlurView>
        <IconSymbol
          name="magnifyingglass"
          size={20}
          color={Colors.light.textSecondary} // Correct color
        />
        <View style={styles.searchInputView}> {/* Use View instead of TextInput for placeholder */} 
          <Text style={styles.searchPlaceholder}>Search sessions...</Text>
        </View>
      </TouchableOpacity>
      
      {/* Timer Button */}
      <TouchableOpacity 
        style={styles.timerButtonContainer} // Apply shadow/elevation here
        onPress={handleTimerPress}
        activeOpacity={0.8}
      >
        <BlurView 
          intensity={60} // Match standard intensity
          tint="dark" 
          style={StyleSheet.absoluteFill} // Blur covers the button
          >
             {/* Optional subtle gradient for button */}
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
          color={Colors.light.textSecondary} // Use secondary color for icon
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
    marginTop: 16, // Keep margin or adjust as needed
    marginBottom: 8, // Add margin below header
  },
  searchContainer: {
    flex: 1,
    height: 44,
    borderRadius: 22, // Circular ends
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16, // Adjust padding
    borderWidth: 1, // Match standard border
    borderColor: 'rgba(255, 255, 255, 0.2)', // Match standard border color
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Match standard background
    gap: 10, // Adjust gap
    overflow: "hidden", // Important for BlurView/borderRadius
    ...Platform.select({ // Apply standard shadow/elevation
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
  searchInputView: { // Changed from searchInput
    flex: 1,
    height: "100%",
    justifyContent: "center",
  },
  searchPlaceholder: {
    color: Colors.light.textSecondary, // Correct color
    fontSize: 16,
  },
  timerButtonContainer: { // Changed from timerButton for clarity
    width: 44, // Make button same height as search bar
    height: 44,
    borderRadius: 22, // Make it circular
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: Colors.light.pill, // Removed solid background
    borderWidth: 1, // Match standard border
    borderColor: 'rgba(255, 255, 255, 0.2)', // Match standard border color
    overflow: "hidden", // Important for BlurView/borderRadius
     ...Platform.select({ // Apply standard shadow/elevation
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
});
