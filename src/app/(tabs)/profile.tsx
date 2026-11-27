import { useClerk } from "@clerk/expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable, Text, View } from "react-native";

import { posthog } from "@/lib/posthog";
import { useLanguageStore } from "@/store/languageStore";

export default function Profile() {
  const { signOut } = useClerk();
  const resetLanguage = useLanguageStore((state) => state.resetLanguage);

  // For testing: with no saved language, the app returns to language selection
  const clearStorage = async () => {
    resetLanguage();
    await AsyncStorage.clear();
  };

  const handleSignOut = () => {
    posthog?.capture("sign_out_requested");
    return signOut();
  };

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="h2 text-text-primary">Profile</Text>
      <Text className="body-md mt-2 text-text-secondary">Coming soon</Text>
      <Pressable
        accessibilityRole="button"
        onPress={handleSignOut}
        className="mt-6 h-10 items-center justify-center px-5"
      >
        <Text className="font-montserrat-semibold text-sm text-text-secondary">
          Sign Out
        </Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        onPress={clearStorage}
        className="mt-2 h-10 items-center justify-center px-5"
      >
        <Text className="font-montserrat-semibold text-sm text-text-secondary">
          Clear Storage (testing)
        </Text>
      </Pressable>
    </View>
  );
}
