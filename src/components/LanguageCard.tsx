import { Pressable, Text, View } from "react-native";

import { Image } from "@/components/Image";
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
          className="h-full w-full"
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
          <Image source={images.check} className="h-[16px] w-[16px]" />
        </View>
      ) : (
        <Image source={images.chevronRight} className="h-[20px] w-[20px]" />
      )}
    </Pressable>
  );
}
