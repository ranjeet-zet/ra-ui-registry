import React from "react";
import {
  Pressable,
  StyleSheet,
  ViewStyle,
  PressableProps,
} from "react-native";

type Variant = "default" | "primary" | "ghost";
type Size = "sm" | "md" | "lg";

interface IconButtonProps extends PressableProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  style?: ViewStyle;
}

export function IconButton({
  children,
  variant = "default",
  size = "md",
  disabled = false,
  style,
  ...props
}: IconButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        sizeStyles[size],
        variantStyles[variant],
        pressed && variantPressedStyles[variant],
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
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});

const sizeStyles: Record<Size, ViewStyle> = {
  sm: { width: 32, height: 32 },
  md: { width: 40, height: 40 },
  lg: { width: 48, height: 48 },
};

const variantStyles: Record<Variant, ViewStyle> = {
  default: { backgroundColor: "#BABABF" },
  primary: { backgroundColor: "#f7f0ff" },
  ghost: { backgroundColor: "transparent" },
};

const variantPressedStyles: Record<Variant, ViewStyle> = {
  default: { backgroundColor: "#A2A1A8" },
  primary: { backgroundColor: "#e3c7ff" },
  ghost: { backgroundColor: "#F6F6F7" },
};
