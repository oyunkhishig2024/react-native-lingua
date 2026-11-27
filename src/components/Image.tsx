import { Image as ExpoImage } from "expo-image";
import { styled } from "nativewind";

// `expo-image` (which can draw our SVGs) has no `className` prop of its own.
// Import `Image` from here to size and position it with classes.
export const Image = styled(ExpoImage, { className: "style" });
