import { Pressable, Text, View } from "react-native";

import { Image } from "@/components/Image";
import { images } from "@/constants/images";

type ContinueLearningCardProps = {
  languageName: string;
  /** e.g. "A1 • Unit 2" */
  subtitle: string;
  buttonLabel: string;
  onPress: () => void;
};

export function ContinueLearningCard({
  languageName,
  subtitle,
  buttonLabel,
  onPress,
}: ContinueLearningCardProps) {
  return (
    <View className="continue-card">
      {/* Gradient sky and mountains, then the palace on top */}
      <Image
        source={images.continueCardBg}
        contentFit="cover"
        contentPosition="right"
        className="absolute inset-0"
      />
      {/* Larger than it looks: the card crops the empty space around it */}
      <Image
        source={images.palace}
        className="absolute right-[-32px] top-[2px] h-[204px] w-[204px]"
      />

      <Text className="continue-card__label">Continue learning</Text>
      <Text className="continue-card__title mt-1.5">{languageName}</Text>
      <Text className="continue-card__label mt-0.5">{subtitle}</Text>
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        className="continue-card__button mt-3"
      >
        <Text className="continue-card__button-text">{buttonLabel}</Text>
      </Pressable>
    </View>
  );
}
