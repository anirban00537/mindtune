import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { IconSymbol } from "./IconSymbol";
import Colors from "@/constants/Colors";

export default function ContributionBanner() {
  return (
    <TouchableOpacity activeOpacity={0.9}>
      <BlurView intensity={15} tint="dark" style={styles.container}>
        <LinearGradient
          colors={["rgba(255, 193, 7, 0.2)", "rgba(255, 152, 0, 0.1)"]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 0.9, y: 1 }}
        />
        <View style={styles.iconContainer}>
          <LinearGradient
            colors={["#FFC107", "#FF9800"]}
            style={styles.iconBackground}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 0.9, y: 1 }}
          >
            <IconSymbol name="star.fill" size={20} color="#ffffff" />
          </LinearGradient>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Contribute and Support</Text>
          <Text style={styles.subtitle}>
            Unlock all features, no commitment
          </Text>
        </View>
        <IconSymbol
          name="chevron.right"
          size={20}
          color="rgba(255, 193, 7, 0.8)"
        />
      </BlurView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 193, 7, 0.2)",
    overflow: "hidden",
    gap: 12,
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
    fontSize: 16,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 2,
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    letterSpacing: 0.1,
  },
});
