import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import Colors from "@/constants/Colors";

interface FilterTabsProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onTabPress: (tabId: string) => void;
  style?: ViewStyle;
}

export function FilterTabs({
  tabs,
  activeTab,
  onTabPress,
  style,
}: FilterTabsProps) {
  return (
    <View style={[styles.container, style]}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => onTabPress(tab.id)}
            style={[styles.tab, isActive && styles.activeTab]}
            activeOpacity={0.8}
          >
            <BlurView
              intensity={8}
              tint="dark"
              style={StyleSheet.absoluteFill}
            />
            <LinearGradient
              colors={
                isActive ? Colors.gradients.pillActive : Colors.gradients.pill
              }
              style={StyleSheet.absoluteFill}
              start={{ x: 0.2, y: 0 }}
              end={{ x: 0.8, y: 1 }}
            />
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.light.border,
    overflow: "hidden",
  },
  activeTab: {
    borderColor: Colors.light.primary,
  },
  tabText: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.light.text,
    opacity: 0.8,
  },
  activeTabText: {
    opacity: 1,
  },
});
