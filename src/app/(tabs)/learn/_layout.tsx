import { Stack } from "expo-router";

// A stack inside the Learn tab, so lessons open with the tab bar still visible
export default function LearnLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
