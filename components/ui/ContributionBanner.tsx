import { StyleSheet, View, Text, TouchableOpacity, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import * as Haptics from "expo-haptics";

export default function ContributionBanner() {
  const scale = new Animated.Value(1);
  const opacity = new Animated.Value(1);
  
  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };
  
  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.9}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={{ transform: [{ scale }], opacity }}></Animated.View>
        <BlurView intensity={20} tint="dark" style={styles.container}>
          <LinearGradient
            colors={["#4A2DB8", "#7A5BD5"]}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        <View style={styles.iconContainer}>
          <LinearGradient
            colors={["#6A47E5", "#9D80FF"]}
            style={styles.iconBackground}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="sparkles" size={20} color="#FFFFFF" />
          </LinearGradient>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Premium Features</Text>
          <Text style={styles.subtitle}>
            Upgrade to unlock exclusive content
          </Text>
        </View>
        <Ionicons
          name="chevron-forward"
          size={20}
          color="rgba(255,255,255,0.9)"
        />
      </BlurView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    overflow: "hidden",
    gap: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  iconBackground: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: '#F8F8FF',
    marginBottom: 4,
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(248,248,255,0.95)',
    letterSpacing: 0.2,
  },
});
