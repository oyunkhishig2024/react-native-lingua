// Lingua color tokens (from the design system).
// Keep in sync with the `--color-*` values in `theme.css`.
// Use the NativeWind classes (e.g. `bg-lingua-purple`) in UI.
// Use these values only where a class cannot be used (icons, StatusBar, etc.).

export const colors = {
  // Primary
  linguaPurple: "#6C4EF5",
  linguaDeepPurple: "#5B3BF6",
  linguaBlue: "#4D8BFF",
  linguaGreen: "#21C16B",

  // Semantic
  success: "#21C16B",
  warning: "#FFC800",
  streak: "#FF8A00",
  error: "#FF4D4F",
  info: "#4D8BFF",

  // Neutrals
  textPrimary: "#0D132B",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  surface: "#F6F7FB",
  background: "#FFFFFF",
} as const;

export type ColorToken = keyof typeof colors;
