import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";

export default function Onboarding() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View className="w-full max-w-[480px] flex-1 self-center px-7 pb-6">
        {/* Logo + app name */}
        <View className="flex-row items-center justify-center gap-2 pt-2">
          <Image
            source={images.mascotLogo}
            // `!` lets the size win over the image's natural size on web
            className="h-16! w-16!"
            resizeMode="contain"
          />
          <Text className="onboarding__brand">lingua</Text>
        </View>

        {/* Headline */}
        <View className="mt-8 px-3">
          <Text className="onboarding__title">Миний</Text>
          <Text className="onboarding__title">
            <Text className="text-lingua-deep-purple">шифү багш</Text>.
          </Text>
          <Text className="onboarding__subtitle mt-3">
            Харилцан ярилцдаг жинкен ми шифү!
          </Text>
        </View>

        {/* Mascot + speech bubbles */}
        <View className="flex-1 items-center justify-center">
          <View className="h-80 w-full max-w-[360px]">
            <Image
              source={images.mascot}
              className="h-full! w-full!"
              resizeMode="contain"
            />

            {/* Hello! */}
            <View className="absolute left-5 top-4 -rotate-6">
              <View className="rounded-2xl bg-[#EAF3FF] px-5 py-3.5">
                <Text className="onboarding__bubble text-text-primary">
                  Hello!
                </Text>
              </View>
              <View className="absolute -bottom-1 right-5 h-3 w-3 rotate-45 bg-[#EAF3FF]" />
            </View>

            {/* ¡Hola! */}
            <View className="absolute right-2 top-0 rotate-6">
              <View className="rounded-2xl bg-[#F1F2FE] px-8 py-3.5">
                <Text className="onboarding__bubble text-[#3B2FD9]">
                  ¡Hola!
                </Text>
              </View>
              <View className="absolute -bottom-1 left-5 h-3 w-3 rotate-45 bg-[#F1F2FE]" />
            </View>

            {/* 你好! */}
            <View className="absolute -right-2 top-24 rotate-6">
              <View className="rounded-2xl bg-[#FDEEEA] px-5 py-3.5">
                <Text className="onboarding__bubble text-[#E5483A]">你好!</Text>
              </View>
              <View className="absolute -bottom-1 left-4 h-3 w-3 rotate-45 bg-[#FDEEEA]" />
            </View>
          </View>
        </View>

        {/* Get Started */}
        <Pressable
          className="onboarding__button"
          onPress={() => router.push("/sign-up")}
        >
          <Text className="onboarding__button-text">Get started</Text>
          <Text className="onboarding__button-chevron">›</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
