import { useClerk } from "@clerk/expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { useLanguageStore } from "@/store/languageStore";

export default function Index() {
  const { signOut } = useClerk();
  const resetLanguage = useLanguageStore((state) => state.resetLanguage);

  // For testing: with no saved language, the app returns to language selection
  const clearStorage = async () => {
    resetLanguage();
    await AsyncStorage.clear();
  };

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="h2 text-lingua-purple">Lingua</Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => router.push("/language-selection")}
        className="mt-4 h-10 items-center justify-center rounded-[14px] bg-lingua-deep-purple px-5"
      >
        <Text className="font-montserrat-semibold text-sm text-white">
          Choose a language
        </Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        onPress={() => signOut()}
        className="mt-2 h-10 items-center justify-center px-5"
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
