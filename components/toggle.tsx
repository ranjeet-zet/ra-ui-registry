import React from "react";
import { Pressable, StyleSheet, ViewStyle, PressableProps } from "react-native";

type Variant = "default" | "outline";
type Size = "default" | "sm" | "lg";

interface ToggleProps extends PressableProps {
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
  style?: ViewStyle;
}

export function Toggle({ pressed, onPressedChange, variant = "default", size = "default", children, disabled, style, ...props }: ToggleProps) {
  return (
    <Pressable
      onPress={() => !disabled && onPressedChange(!pressed)}
      style={[
        styles.toggle,
        sizeStyles[size],
        pressed ? styles.pressed : variant === "outline" ? styles.outline : styles.default,
        disabled && { opacity: 0.5 },
        style,
      ]}
      disabled={disabled}
      {...props}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  toggle: { alignItems: "center", justifyContent: "center", borderRadius: 6 },
  default: { backgroundColor: "transparent" },
  outline: { backgroundColor: "transparent", borderWidth: 1, borderColor: "#E4E4E7" },
  pressed: { backgroundColor: "#F4F4F5" },
});

const sizeStyles: Record<Size, ViewStyle> = {
  default: { width: 40, height: 40 },
  sm: { width: 36, height: 36 },
  lg: { width: 44, height: 44 },
};
