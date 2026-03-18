import React from "react";
import {
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
  PressableProps,
  ViewStyle,
  TextStyle,
  StyleProp,
} from "react-native";

type Variant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type Size = "default" | "sm" | "lg" | "icon";

interface ButtonProps extends PressableProps {
  variant?: Variant;
  size?: Size;
  title?: string;
  loading?: boolean;
  activeScale?: number;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

export function Button({
  variant = "default",
  size = "default",
  title,
  loading,
  disabled,
  activeScale = 0.96,
  children,
  style,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      disabled={disabled }
      style={({ pressed }: { pressed: boolean }): StyleProp<ViewStyle> => [
        styles.base,
        variantStyles[variant],
        sizeStyles[size],
        {
          transform: [{ scale: pressed && !disabled ? activeScale : 1 }],
          opacity: (pressed || disabled) && variant !== "link" ? 0.7 : 1,
        },
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "default" || variant === "destructive" ? "#FFF" : "#18181B"}
          size="small"
        />
      ) : children ? (
        children
      ) : (
        <Text selectable={false} style={[styles.text, variantTextStyles[variant], sizeTextStyles[size]]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    gap: 8,
  },
  text: {
    fontWeight: "500",
  },
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
  sm: { paddingHorizontal: 12, paddingVertical: 6, height: 36 },
  lg: { paddingHorizontal: 32, paddingVertical: 12, height: 44 },
  icon: { width: 40, height: 40 },
};

const sizeTextStyles: Record<Size, TextStyle> = {
  default: { fontSize: 14 },
  sm: { fontSize: 13 },
  lg: { fontSize: 16 },
  icon: { fontSize: 14 },
};