import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

type Variant = "default" | "success" | "warning" | "error" | "info";

interface BadgeProps {
  label: string;
  variant?: Variant;
  style?: ViewStyle;
}

export function Badge({ label, variant = "default", style }: BadgeProps) {
  return (
    <View style={[styles.badge, variantStyles[variant], style]}>
      <Text style={[styles.text, variantTextStyles[variant]]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 100,
    borderWidth: 1,
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
  },
});

const variantStyles: Record<Variant, ViewStyle> = {
  default: { backgroundColor: "#F4F4F5", borderColor: "#E4E4E7" },
  success: { backgroundColor: "#F0FDF4", borderColor: "#BBF7D0" },
  warning: { backgroundColor: "#FFFBEB", borderColor: "#FDE68A" },
  error: { backgroundColor: "#FEF2F2", borderColor: "#FECACA" },
  info: { backgroundColor: "#EFF6FF", borderColor: "#BFDBFE" },
};

const variantTextStyles: Record<Variant, TextStyle> = {
  default: { color: "#3F3F46" },
  success: { color: "#166534" },
  warning: { color: "#92400E" },
  error: { color: "#991B1B" },
  info: { color: "#1E40AF" },
};
