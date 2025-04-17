/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const Colors = {
  light: {
    primary: "#7C3AED",
    primaryDark: "#4682B4",
    primaryLight: "#B0E2FF",
    accent: "#00BFFF",
    text: "#ffffff",
    background: "#070a14",
    card: "#050812",
    border: "rgba(255, 255, 255, 0.1)",
    tint: "#7C3AED",
    tabIconDefault: "#ccc",
    tabIconSelected: "#7C3AED",
  },
  dark: {
    primary: "#7C3AED",
    primaryDark: "#4682B4",
    primaryLight: "#B0E2FF",
    accent: "#00BFFF",
    text: "#ffffff",
    background: "#070a14",
    card: "#050812",
    border: "rgba(255, 255, 255, 0.1)",
    tint: "#7C3AED",
    tabIconDefault: "#ccc",
    tabIconSelected: "#7C3AED",
  },
  gradients: {
    background: ["#070a14", "#080c1a", "#091021"] as const,
    button: ["#7C3AED", "#6366F1"] as const,
    card: ["rgba(124, 58, 237, 0.08)", "rgba(99, 102, 241, 0.04)"] as const,
    tabBar: ["#050812", "#060a16", "#070c1a"] as const,
  },
};

export default Colors;
