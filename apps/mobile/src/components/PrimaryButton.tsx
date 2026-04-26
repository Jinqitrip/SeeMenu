import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "@/design/colors";

export function PrimaryButton({
  children,
  onPress,
  tone = "dark",
  disabled = false
}: {
  children: ReactNode;
  onPress?: () => void;
  tone?: "dark" | "accent" | "light";
  disabled?: boolean;
}) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      hitSlop={8}
      style={({ pressed }) => [
        styles.button,
        tone === "accent" && styles.accent,
        tone === "light" && styles.light,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed
      ]}
    >
      <Text style={[styles.text, tone === "light" && styles.lightText]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: colors.ink
  },
  accent: {
    backgroundColor: colors.accent
  },
  light: {
    backgroundColor: colors.bg2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line
  },
  disabled: {
    opacity: 0.45
  },
  pressed: {
    transform: [{ scale: 0.98 }]
  },
  text: {
    color: colors.bg,
    fontSize: 15,
    fontWeight: "700"
  },
  lightText: {
    color: colors.ink
  }
});
