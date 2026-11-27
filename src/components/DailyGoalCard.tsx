import { Text, View } from "react-native";

import { Image } from "@/components/Image";
import { images } from "@/constants/images";

type DailyGoalCardProps = {
  xp: number;
  goal: number;
};

export function DailyGoalCard({ xp, goal }: DailyGoalCardProps) {
  const percent = Math.min(xp / goal, 1) * 100;

  return (
    <View className="daily-goal">
      <View className="flex-1">
        <Text className="daily-goal__label">Daily goal</Text>
        <Text className="daily-goal__xp mt-1.5">
          {xp} <Text className="daily-goal__total">/ {goal} XP</Text>
        </Text>
        <View
          accessibilityRole="progressbar"
          accessibilityValue={{ min: 0, max: goal, now: xp }}
          className="daily-goal__track mt-3"
        >
          <View className="daily-goal__fill" style={{ width: `${percent}%` }} />
        </View>
      </View>

      {/* The image has empty space around the chest, so it overlaps its box */}
      <View className="ml-4 h-[90px] w-[100px] items-center justify-center">
        <Image source={images.treasure} className="h-[108px] w-[108px]" />
      </View>
    </View>
  );
}
