import { Pressable, Text, View } from "react-native";

import { Image } from "@/components/Image";
import { images } from "@/constants/images";

type CallControlsProps = {
  isMicOn: boolean;
  showSubtitles: boolean;
  onCameraPress: () => void;
  onToggleMic: () => void;
  onToggleSubtitles: () => void;
  onEndCall: () => void;
};

export function CallControls({
  isMicOn,
  showSubtitles,
  onCameraPress,
  onToggleMic,
  onToggleSubtitles,
  onEndCall,
}: CallControlsProps) {
  const controls = [
    {
      label: "Camera",
      icon: images.video,
      onPress: onCameraPress,
      modifier: "",
    },
    {
      label: "Mic",
      icon: isMicOn ? images.mic : images.micOff,
      onPress: onToggleMic,
      modifier: isMicOn ? "" : "call-control--off",
      isOn: isMicOn,
    },
    {
      label: "Subtitles",
      icon: images.translate,
      onPress: onToggleSubtitles,
      modifier: showSubtitles ? "" : "call-control--off",
      isOn: showSubtitles,
    },
    {
      label: "End Call",
      icon: images.endCall,
      onPress: onEndCall,
      modifier: "call-control--end",
    },
  ];

  return (
    <View className="flex-row justify-between px-[22px]">
      {controls.map((control) => (
        <View key={control.label} className="w-[68px] items-center">
          <Pressable
            accessibilityRole={control.isOn === undefined ? "button" : "switch"}
            accessibilityLabel={control.label}
            accessibilityState={
              control.isOn === undefined
                ? undefined
                : { checked: control.isOn }
            }
            onPress={control.onPress}
            className={`call-control ${control.modifier}`}
          >
            <Image source={control.icon} className="h-[28px] w-[28px]" />
          </Pressable>
          <Text numberOfLines={1} className="call-control__label">
            {control.label}
          </Text>
        </View>
      ))}
    </View>
  );
}
