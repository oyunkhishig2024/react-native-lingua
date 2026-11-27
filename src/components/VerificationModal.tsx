import { type ComponentRef, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CODE_LENGTH = 6;

type VerificationModalProps = {
  email: string;
  onClose: () => void;
  onComplete: () => void;
};

// UI only: any 6 digits are accepted.
export function VerificationModal({
  email,
  onClose,
  onComplete,
}: VerificationModalProps) {
  const [code, setCode] = useState("");
  const inputRef = useRef<ComponentRef<typeof TextInput>>(null);
  const insets = useSafeAreaInsets();

  const handleChange = (text: string) => {
    const digits = text.replace(/\D/g, "").slice(0, CODE_LENGTH);
    setCode(digits);

    if (digits.length === CODE_LENGTH && code.length < CODE_LENGTH) {
      onComplete();
    }
  };

  return (
    <Modal
      visible
      transparent
      animationType="fade"
      statusBarTranslucent
      navigationBarTranslucent
      onShow={() => inputRef.current?.focus()}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Pressable
          accessibilityLabel="Close verification"
          onPress={onClose}
          className="flex-1"
        />
        <View
          className="w-full max-w-[480px] self-center rounded-t-[28px] bg-background px-[26px] pt-6"
          style={{ paddingBottom: insets.bottom + 16 }}
        >
          <Text className="h2 text-center text-text-primary">
            Check your email
          </Text>
          <Text className="auth__subtitle mt-2 text-center">
            We sent a verification code to {email || "your email"}. Enter the
            6-digit code below.
          </Text>

          {/* One invisible input on top of six boxes */}
          <View className="mt-6">
            <View className="flex-row gap-2">
              {Array.from({ length: CODE_LENGTH }, (_, index) => (
                <View
                  key={index}
                  className={`auth__code-box ${index === code.length ? "border-lingua-deep-purple" : "border-border"}`}
                >
                  <Text className="h2 text-text-primary">{code[index]}</Text>
                </View>
              ))}
            </View>
            <TextInput
              ref={inputRef}
              accessibilityLabel="Verification code"
              value={code}
              onChangeText={handleChange}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              autoComplete="one-time-code"
              caretHidden
              style={styles.hiddenInput}
            />
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={onClose}
            className="mt-4 items-center py-2"
          >
            <Text className="auth__link">Cancel</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "rgba(13, 19, 43, 0.45)" },
  // Nearly transparent: Android ignores taps on fully transparent inputs
  hiddenInput: {
    ...StyleSheet.absoluteFill,
    opacity: 0.01,
    color: "transparent",
  },
});
