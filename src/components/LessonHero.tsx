import { Pressable, Text, View } from "react-native";

import { Image } from "@/components/Image";
import { images } from "@/constants/images";

type LessonHeroProps = {
  title: string;
  /** e.g. "Unit 2 • 3 / 6 lessons" */
  subtitle: string;
  imageUrl: string;
  onBack: () => void;
};

// The lesson screen's header, drawn over the selected lesson's artwork
export function LessonHero({
  title,
  subtitle,
  imageUrl,
  onBack,
}: LessonHeroProps) {
  return (
    <View className="lesson-hero overflow-hidden">
      <Image
        source={imageUrl}
        contentFit="cover"
        transition={200}
        className="absolute bottom-px left-0 right-0 top-[52px]"
      />
      <View className="lesson-hero__fade--top absolute left-0 right-0 top-[50px]" />
      <View className="lesson-hero__fade--bottom absolute bottom-0 left-0 right-0" />
      {/* The empty space under the fox hangs below the hero and is cut off */}
      <Image
        source={images.mascotAuth}
        className="absolute bottom-[-31px] h-[184px] w-[184px] self-center"
      />

      <View className="w-full max-w-[480px] flex-row self-center pl-3 pr-[26px] pt-5">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          hitSlop={12}
          onPress={onBack}
          className="mt-2"
        >
          <Image source={images.chevronLeft} className="h-[24px] w-[24px]" />
        </Pressable>
        <View className="ml-[21px] mr-3 flex-1">
          <Text numberOfLines={1} className="lesson-hero__title">
            {title}
          </Text>
          <Text className="lesson-hero__subtitle">{subtitle}</Text>
        </View>
        <Image source={images.bookmark} className="mt-2 h-[25px] w-[20px]" />
      </View>
    </View>
  );
}
