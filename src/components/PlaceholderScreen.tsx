import { Text, View } from "react-native";

// Stands in for a tab screen that has not been built yet
export function PlaceholderScreen({ title }: { title: string }) {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="h2 text-text-primary">{title}</Text>
      <Text className="body-md mt-2 text-text-secondary">Coming soon</Text>
    </View>
  );
}
