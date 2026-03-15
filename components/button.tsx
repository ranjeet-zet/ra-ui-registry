import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  PressableProps,
  ViewStyle,
  TextStyle,
} from "react-native";

type Variant = "default" | "outline" | "ghost" | "destructive";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends PressableProps {
  variant?: Variant;
  size?: Size;
  title: string;
}

export function Button({
  variant = "default",
  size = "md",
  title,
  style,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant],
        sizeStyles[size],
        pressed && { opacity: 0.7 },
        style as ViewStyle,
      ]}
      {...props}
    >
      <Text style={[styles.text, variantTextStyles[variant], sizeTextStyles[size]]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  text: {
    fontWeight: "600",
  },
});

const variantStyles: Record<Variant, ViewStyle> = {
  default: { backgroundColor: "#2563EB" },
  outline: { backgroundColor: "transparent", borderWidth: 1, borderColor: "#D1D5DB" },
  ghost: { backgroundColor: "transparent" },
  destructive: { backgroundColor: "#DC2626" },
};

const variantTextStyles: Record<Variant, TextStyle> = {
  default: { color: "#FFFFFF" },
  outline: { color: "#111827" },
  ghost: { color: "#111827" },
  destructive: { color: "#FFFFFF" },
};

const sizeStyles: Record<Size, ViewStyle> = {
  sm: { paddingHorizontal: 12, paddingVertical: 6 },
  md: { paddingHorizontal: 16, paddingVertical: 10 },
  lg: { paddingHorizontal: 24, paddingVertical: 14 },
};

const sizeTextStyles: Record<Size, TextStyle> = {
  sm: { fontSize: 13 },
  md: { fontSize: 15 },
  lg: { fontSize: 17 },
};
