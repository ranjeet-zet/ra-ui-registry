import React from "react";
import { Pressable, Text, ActivityIndicator, StyleSheet, PressableProps, ViewStyle, TextStyle } from "react-native";

type Variant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type Size = "default" | "sm" | "lg" | "icon";

interface ButtonProps extends PressableProps {
  variant?: Variant;
  size?: Size;
  title?: string;
  loading?: boolean;
  children?: React.ReactNode;
}

export function Button({ variant = "default", size = "default", title, loading, disabled, children, style, ...props }: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.base, variantStyles[variant], sizeStyles[size], pressed && { opacity: 0.8 }, disabled && { opacity: 0.5 }, style as ViewStyle]}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === "default" || variant === "destructive" ? "#FFF" : "#18181B"} size="small" />
      ) : children ? children : (
        <Text style={[styles.text, variantTextStyles[variant], sizeTextStyles[size]]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 6, gap: 8 },
  text: { fontWeight: "500" },
});

const variantStyles: Record<Variant, ViewStyle> = {
  default: { backgroundColor: "#18181B" },
  destructive: { backgroundColor: "#DC2626" },
  outline: { backgroundColor: "transparent", borderWidth: 1, borderColor: "#E4E4E7" },
  secondary: { backgroundColor: "#F4F4F5" },
  ghost: { backgroundColor: "transparent" },
  link: { backgroundColor: "transparent" },
};

const variantTextStyles: Record<Variant, TextStyle> = {
  default: { color: "#FAFAFA" },
  destructive: { color: "#FAFAFA" },
  outline: { color: "#09090B" },
  secondary: { color: "#18181B" },
  ghost: { color: "#18181B" },
  link: { color: "#18181B", textDecorationLine: "underline" },
};

const sizeStyles: Record<Size, ViewStyle> = {
  default: { paddingHorizontal: 16, paddingVertical: 10, height: 40 },
  sm: { paddingHorizontal: 12, paddingVertical: 6, height: 36, borderRadius: 6 },
  lg: { paddingHorizontal: 32, paddingVertical: 12, height: 44, borderRadius: 6 },
  icon: { width: 40, height: 40 },
};

const sizeTextStyles: Record<Size, TextStyle> = {
  default: { fontSize: 14 },
  sm: { fontSize: 13 },
  lg: { fontSize: 16 },
  icon: { fontSize: 14 },
};
