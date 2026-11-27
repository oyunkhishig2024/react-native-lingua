import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Pressable,
  Image as RNImage,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Image } from "@/components/Image";
import { LanguageCard } from "@/components/LanguageCard";
import { images } from "@/constants/images";
import { languages } from "@/data/languages";
import { useLanguageStore } from "@/store/languageStore";
import { colors, fontFamily } from "@/theme";
import type { LanguageId } from "@/types/learning";

export default function LanguageSelection() {
  const savedId = useLanguageStore((state) => state.selectedLanguageId);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  // The tapped card is only saved when the user presses Confirm
  const [selectedId, setSelectedId] = useState<LanguageId>(savedId ?? "es");
  const [query, setQuery] = useState("");

  const search = query.trim().toLowerCase();
  const results = languages.filter(
    ({ name, nativeName }) =>
      name.toLowerCase().includes(search) ||
      nativeName.toLowerCase().includes(search),
  );

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const confirm = () => {
    setLanguage(selectedId);
    goBack();
  };

  return (
    // No bottom edge: the earth runs to the bottom of the screen
    <SafeAreaView edges={["top", "left", "right"]} style={styles.screen}>
      <StatusBar style="dark" />
      <View className="w-full max-w-[480px] flex-1 self-center">
        {/* Header */}
        <View className="mt-4 h-12 justify-center px-5">
          <Text className="language__title text-center">Choose a language</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={12}
            onPress={goBack}
            className="absolute left-5 h-10 w-10 justify-center"
          >
            <Image source={images.chevronLeft} className="h-[24px] w-[24px]" />
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="px-5">
            <View className="language__search mt-3.5">
              <Image source={images.search} className="h-[20px] w-[20px]" />
              <TextInput
                accessibilityLabel="Search languages"
                value={query}
                onChangeText={setQuery}
                placeholder="Search languages"
                placeholderTextColor="#5B6478"
                autoCorrect={false}
                returnKeyType="search"
                style={styles.input}
              />
            </View>

            <Text className="language__section mt-6">Popular</Text>

            <View accessibilityRole="radiogroup" className="mt-3.5 gap-0.5">
              {results.map((language) => (
                <LanguageCard
                  key={language.id}
                  language={language}
                  isSelected={language.id === selectedId}
                  onPress={() => setSelectedId(language.id)}
                />
              ))}
              {results.length === 0 && (
                <Text className="language__learners py-6 text-center">
                  No languages match your search.
                </Text>
              )}
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={confirm}
              className="auth__button mt-[18px]"
            >
              <Text className="auth__button-text">Confirm</Text>
            </Pressable>
          </View>

          {/* The square image has empty space around it, which this box crops */}
          <View className="mt-auto aspect-[1254/720] w-full overflow-hidden">
            <View className="-mt-[16%] aspect-square w-full">
              <RNImage
                source={images.earth}
                className="h-full! w-full!"
                resizeMode="contain"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  scrollContent: { flexGrow: 1 },
  input: {
    flex: 1,
    height: "100%",
    marginLeft: 18,
    padding: 0,
    fontFamily: fontFamily.regular,
    fontSize: 15,
    color: colors.textPrimary,
  },
});
