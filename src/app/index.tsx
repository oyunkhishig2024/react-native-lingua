import { useClerk } from "@clerk/expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { getLanguageById } from "@/data/languages";
import { useLanguageStore } from "@/store/languageStore";

export default function Index() {
  const { signOut } = useClerk();
  const selectedId = useLanguageStore((state) => state.selectedLanguageId);
  const resetLanguage = useLanguageStore((state) => state.resetLanguage);
  const language = selectedId ? getLanguageById(selectedId) : undefined;

  // For testing: with no saved language, the app returns to language selection
  const clearStorage = async () => {
    resetLanguage();
    await AsyncStorage.clear();
  };

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="h2 text-lingua-purple">Lingua</Text>
      {language && (
        <View className="mt-3 flex-row items-center gap-3">
          <View className="language__flag">
            <Image
              source={language.flagUrl}
              style={styles.flag}
              // China's stars sit on the left edge, so don't crop that side
              contentPosition={language.id === "zh" ? "left" : "center"}
            />
          </View>
          <Text className="language__name">Learning {language.name}</Text>
        </View>
      )}
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

const styles = StyleSheet.create({
  flag: { width: "100%", height: "100%" },
});
