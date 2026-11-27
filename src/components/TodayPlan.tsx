import { Pressable, Text, View } from "react-native";

import { Image } from "@/components/Image";
import { images } from "@/constants/images";

export type PlanItem = {
  id: string;
  title: string;
  subtitle: string;
  icon: number;
  /** Background class of the icon tile. */
  tileClassName: string;
  isDone: boolean;
};

type TodayPlanProps = {
  items: PlanItem[];
  onViewAll: () => void;
};

export function TodayPlan({ items, onViewAll }: TodayPlanProps) {
  return (
    <View>
      <View className="flex-row items-center justify-between">
        <Text className="plan__heading">Today’s plan</Text>
        <Pressable accessibilityRole="button" hitSlop={12} onPress={onViewAll}>
          <Text className="plan__link">View all</Text>
        </Pressable>
      </View>

      <View className="mt-6 gap-6">
        {items.map((item) => (
          <View
            key={item.id}
            accessible
            accessibilityLabel={`${item.title}, ${item.subtitle}, ${
              item.isDone ? "done" : "not done"
            }`}
            className="flex-row items-center"
          >
            <View className={`plan__icon ${item.tileClassName}`}>
              <Image source={item.icon} className="h-[26px] w-[26px]" />
            </View>
            <View className="ml-5 flex-1">
              <Text className="plan__title">{item.title}</Text>
              <Text numberOfLines={1} className="plan__subtitle">
                {item.subtitle}
              </Text>
            </View>
            <View className="mr-3">
              {item.isDone ? (
                <Image source={images.checkCircle} className="h-[24px] w-[24px]" />
              ) : (
                <View className="plan__circle" />
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
