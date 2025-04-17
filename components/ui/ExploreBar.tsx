import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "./IconSymbol";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function ExploreBar() {
  const router = useRouter();

  return (
    <View style={styles.wrapper}>
      <BlurView intensity={10} tint="dark" style={styles.container}>
        <LinearGradient
          colors={["rgba(124, 58, 237, 0.15)", "rgba(99, 102, 241, 0.1)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.borderGradient}>
          <LinearGradient
            colors={["rgba(124, 58, 237, 0.3)", "rgba(99, 102, 241, 0.2)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[StyleSheet.absoluteFill, styles.borderRadius]}
          />
        </View>
        <View style={styles.content}>
          <View style={styles.searchContainer}>
            <IconSymbol
              name="magnifyingglass"
              size={22}
              color="rgba(255, 255, 255, 0.6)"
            />
            <TextInput
              style={styles.input}
              placeholder="Search meditations..."
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              onFocus={() => router.push("/explore")}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <LinearGradient
              colors={Colors.gradients.button}
              style={styles.filterGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <IconSymbol name="slider.horizontal.3" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
  },
  container: {
    height: 70,
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  borderGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderColor: "transparent",
    padding: 1,
    borderRadius: 20,
  },
  borderRadius: {
    borderRadius: 20,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 36, 0.3)",
    borderRadius: 15,
    paddingHorizontal: 16,
    height: 46,
    gap: 12,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    height: "100%",
    ...Platform.select({
      ios: {
        paddingTop: 2,
      },
    }),
  },
  filterButton: {
    width: 46,
    height: 46,
    borderRadius: 15,
    overflow: "hidden",
  },
  filterGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
