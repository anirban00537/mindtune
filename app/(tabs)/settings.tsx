import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import Colors from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

// Simple placeholder component for a settings row
const SettingsRow = ({ iconName, label, onPress }: { iconName: keyof typeof Ionicons.glyphMap, label: string, onPress?: () => void }) => (
  <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
    <BlurView intensity={20} tint="light" style={StyleSheet.absoluteFillObject} />
    <View style={styles.rowContent}>
      <Ionicons name={iconName} size={24} color={Colors.light.primary} style={styles.rowIcon} />
      <Text style={styles.rowLabel}>{label}</Text>
      <Ionicons name="chevron-forward" size={22} color={Colors.light.textSecondary} />
    </View>
  </TouchableOpacity>
);

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
       <LinearGradient
        colors={["#2A1840", "#050812", "#050812", "#050812", "#050812"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }
        ]}
      >
        <Text style={styles.headerTitle}>Settings</Text>
        
        {/* Settings Sections */}
        <View style={styles.section}>
          <SettingsRow iconName="person-circle-outline" label="Account" />
          <SettingsRow iconName="notifications-outline" label="Notifications" />
        </View>

        <View style={styles.section}>
          <SettingsRow iconName="color-palette-outline" label="Appearance" />
          <SettingsRow iconName="lock-closed-outline" label="Privacy & Security" />
        </View>

        <View style={styles.section}>
          <SettingsRow iconName="help-circle-outline" label="Help & Support" />
          <SettingsRow iconName="information-circle-outline" label="About" />
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: Colors.light.text,
    marginBottom: 32,
    letterSpacing: 0.4,
  },
  section: {
    marginBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    overflow: 'hidden',
  },
  row: {
    minHeight: 56,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
    overflow: 'hidden',
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  rowIcon: {
    marginRight: 16,
  },
  rowLabel: {
    flex: 1,
    fontSize: 17,
    color: Colors.light.text,
  },
});
