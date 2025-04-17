/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const Colors = {
  light: {
    primary: "#87CEEB", // Light sky blue
    primaryDark: "#4682B4", // Steel blue
    primaryLight: "#B0E2FF", // Lighter sky blue
    accent: "#00BFFF", // Deep sky blue
    text: "#ffffff",
    background: "#000019", // Keep very dark background
    card: "#000033",
    border: "rgba(255, 255, 255, 0.1)",
    tint: "#87CEEB",
    tabIconDefault: "#4682B4",
    tabIconSelected: "#87CEEB",
  },
  dark: {
    primary: "#87CEEB",
    primaryDark: "#4682B4",
    primaryLight: "#B0E2FF",
    accent: "#00BFFF",
    text: "#ffffff",
    background: "#000019",
    card: "#000033",
    border: "rgba(255, 255, 255, 0.15)",
    tint: "#87CEEB",
    tabIconDefault: "#4682B4",
    tabIconSelected: "#87CEEB",
  },
  gradients: {
    background: ["#000019", "#000026", "#000033"] as const,
    button: ["#87CEEB", "#00BFFF"] as const,
    card: ["rgba(135, 206, 235, 0.4)", "rgba(0, 191, 255, 0.3)"] as const,
    tabBar: [
      "rgba(135, 206, 235, 0.8)",
      "rgba(70, 130, 180, 0.9)",
      "rgba(0, 191, 255, 0.2)",
    ] as const,
  },
};

export default Colors;
