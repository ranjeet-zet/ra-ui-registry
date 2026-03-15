import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

type Variant = "primary" | "success" | "error" | "warning" | "info" | "neutral";
type Size = "sm" | "md";

interface TagProps {
  label: string;
  variant?: Variant;
  size?: Size;
  rounded?: boolean;
  style?: ViewStyle;
}

export function Tag({
  label,
  variant = "primary",
  size = "sm",
  rounded = true,
  style,
}: TagProps) {
  return (
    <View
      style={[
        styles.tag,
        sizeStyles[size],
        variantBgStyles[variant],
        rounded ? styles.rounded : styles.roundedSm,
        style,
      ]}
    >
      <Text style={[styles.text, sizeTextStyles[size], variantTextStyles[variant]]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    alignSelf: "flex-start",
  },
  rounded: {
    borderRadius: 100,
  },
  roundedSm: {
    borderRadius: 4,
  },
  text: {
    fontWeight: "600",
    textAlign: "center",
  },
});

const sizeStyles: Record<Size, ViewStyle> = {
  sm: { paddingHorizontal: 8, paddingVertical: 3 },
  md: { paddingHorizontal: 12, paddingVertical: 5 },
};

const sizeTextStyles: Record<Size, TextStyle> = {
  sm: { fontSize: 10 },
  md: { fontSize: 12 },
};

const variantBgStyles: Record<Variant, ViewStyle> = {
  primary: { backgroundColor: "#f7f0ff" },
  success: { backgroundColor: "#f0faf1" },
  error: { backgroundColor: "#fef5f5" },
  warning: { backgroundColor: "#fff9f0" },
  info: { backgroundColor: "#f7f0ff" },
  neutral: { backgroundColor: "#F6F6F7" },
};

const variantTextStyles: Record<Variant, TextStyle> = {
  primary: { color: "#832dc2" },
  success: { color: "#2b7d31" },
  error: { color: "#d30d28" },
  warning: { color: "#d88603" },
  info: { color: "#832dc2" },
  neutral: { color: "#55535F" },
};
