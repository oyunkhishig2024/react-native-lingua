// Lets TypeScript understand `import img from "@/assets/....png"`.
declare module "*.png" {
  const source: import("react-native").ImageSourcePropType;
  export default source;
}

declare module "*.svg" {
  const source: number;
  export default source;
}
