import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { images } from "@/constants/images";
import type { Language } from "@/types/learning";

type LanguageCardProps = {
  language: Language;
  isSelected: boolean;
  onPress: () => void;
};

export function LanguageCard({
  language,
  isSelected,
  onPress,
}: LanguageCardProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: isSelected }}
      onPress={onPress}
      className={`language__card ${
        isSelected ? "language__card--selected" : "language__card--idle"
      }`}
    >
      <View className="language__flag">
        <Image
          source={language.flagUrl}
          style={styles.flag}
          // China's stars sit on the left edge, so don't crop that side
          contentPosition={language.id === "zh" ? "left" : "center"}
        />
      </View>

      <View className="ml-5 flex-1">
        <Text className="language__name">{language.name}</Text>
        <Text className="language__learners">{language.learners}</Text>
      </View>

      {isSelected ? (
        <View className="language__check">
          <Image source={images.check} style={styles.check} />
        </View>
      ) : (
        <Image source={images.chevronRight} style={styles.chevron} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flag: { width: "100%", height: "100%" },
  check: { width: 16, height: 16 },
  chevron: { width: 20, height: 20 },
});
