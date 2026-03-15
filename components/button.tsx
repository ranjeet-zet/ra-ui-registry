import React from "react";
import {
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
  PressableProps,
  ViewStyle,
  TextStyle,
} from "react-native";

type Variant = "primary" | "outline" | "ghost" | "error" | "success" | "warning";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends PressableProps {
  variant?: Variant;
  size?: Size;
  title: string;
  loading?: boolean;
  loaderText?: string;
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  title,
  loading = false,
  loaderText,
  fullWidth = false,
  iconLeft,
  iconRight,
  disabled,
  style,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && { width: "100%" as unknown as number },
        pressed && { opacity: 0.7 },
        disabled && { opacity: 0.5 },
        style as ViewStyle,
      ]}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <ActivityIndicator
            color={variant === "outline" || variant === "ghost" ? "#832dc2" : "#FFFFFF"}
            size="small"
          />
          {loaderText && (
            <Text style={[styles.text, variantTextStyles[variant], sizeTextStyles[size]]}>
              {loaderText}
            </Text>
          )}
        </>
      ) : (
        <>
          {iconLeft}
          <Text style={[styles.text, variantTextStyles[variant], sizeTextStyles[size]]}>
            {title}
          </Text>
          {iconRight}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    gap: 8,
  },
  text: {
    fontWeight: "600",
  },
});

const variantStyles: Record<Variant, ViewStyle> = {
  primary: { backgroundColor: "#832dc2" },
  outline: { backgroundColor: "transparent", borderWidth: 1, borderColor: "#832dc2" },
  ghost: { backgroundColor: "transparent" },
  error: { backgroundColor: "#ff4961" },
  success: { backgroundColor: "#41bc49" },
  warning: { backgroundColor: "#ffa32a" },
};

const variantTextStyles: Record<Variant, TextStyle> = {
  primary: { color: "#FFFFFF" },
  outline: { color: "#832dc2" },
  ghost: { color: "#832dc2" },
  error: { color: "#FFFFFF" },
  success: { color: "#FFFFFF" },
  warning: { color: "#FFFFFF" },
};

const sizeStyles: Record<Size, ViewStyle> = {
  sm: { paddingHorizontal: 14, paddingVertical: 8 },
  md: { paddingHorizontal: 20, paddingVertical: 12 },
  lg: { paddingHorizontal: 28, paddingVertical: 16 },
};

const sizeTextStyles: Record<Size, TextStyle> = {
  sm: { fontSize: 13 },
  md: { fontSize: 15 },
  lg: { fontSize: 17 },
};
