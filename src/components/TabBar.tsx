import { Image } from "expo-image";
import type { BottomTabBarProps } from "expo-router/js-tabs";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

import { images } from "@/constants/images";
import { colors } from "@/theme";

const CIRCLE_SIZE = 52;
const DURATION = 300;
const INACTIVE_COLOR = "#69708F";

// Keys are the route file names inside `app/(tabs)`
const icons: Record<string, { idle: number; active: number }> = {
  index: { idle: images.tabHome, active: images.tabHomeFilled },
  learn: { idle: images.tabLearn, active: images.tabLearn },
  "ai-teacher": { idle: images.tabAiTeacher, active: images.tabAiTeacher },
  chat: { idle: images.tabChat, active: images.tabChat },
  profile: { idle: images.tabProfile, active: images.tabProfile },
};

export function TabBar({
  state,
  descriptors,
  emitter,
  navigateToTab,
  insets,
}: BottomTabBarProps) {
  // Every tab takes the same share of the width
  const tabWidth = 100 / state.routes.length;

  return (
    // The outer white view fills the area behind the rounded corners
    <View className="bg-background">
      <View
        className="rounded-t-3xl bg-background"
        style={[styles.shadow, { paddingBottom: insets.bottom }]}
      >
        <View accessibilityRole="tablist" className="tab-bar">
          {/* The circle slides to the selected tab whenever `left` changes */}
          <Animated.View
            style={[
              styles.slot,
              { width: `${tabWidth}%`, left: `${state.index * tabWidth}%` },
            ]}
          >
            <View style={styles.circle} />
          </Animated.View>

          {state.routes.map((route, index) => {
            const isActive = index === state.index;
            const title = descriptors[route.key].options.title ?? route.name;
            const icon = icons[route.name];

            const onPress = () => {
              const event = emitter.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });
              if (!isActive && !event.defaultPrevented) {
                navigateToTab(route.key);
              }
            };

            return (
              <Pressable
                key={route.key}
                accessibilityRole="tab"
                accessibilityLabel={title}
                accessibilityState={{ selected: isActive }}
                onPress={onPress}
                className="tab-bar__item"
              >
                {isActive ? (
                  // Fades in so the white icon appears as the circle arrives
                  <Animated.View entering={FadeIn.duration(DURATION)}>
                    <Image
                      source={icon.active}
                      tintColor={colors.background}
                      style={styles.icon}
                    />
                  </Animated.View>
                ) : (
                  <>
                    <Image
                      source={icon.idle}
                      tintColor={INACTIVE_COLOR}
                      style={styles.icon}
                    />
                    <Text numberOfLines={1} className="tab-bar__label">
                      {title}
                    </Text>
                  </>
                )}
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: { boxShadow: "0 -4px 16px rgba(13, 19, 43, 0.07)" },
  slot: {
    position: "absolute",
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    transitionProperty: "left",
    transitionDuration: DURATION,
    transitionTimingFunction: "ease-in-out",
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: colors.linguaDeepPurple,
  },
  icon: { width: 26, height: 26 },
});
