import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

type Variant = "default" | "secondary" | "destructive" | "outline";

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
  badge: { alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 2, borderRadius: 100 },
  text: { fontSize: 12, fontWeight: "600" },
});

const variantStyles: Record<Variant, ViewStyle> = {
  default: { backgroundColor: "#18181B" },
  secondary: { backgroundColor: "#F4F4F5" },
  destructive: { backgroundColor: "#DC2626" },
  outline: { backgroundColor: "transparent", borderWidth: 1, borderColor: "#E4E4E7" },
};

const variantTextStyles: Record<Variant, TextStyle> = {
  default: { color: "#FAFAFA" },
  secondary: { color: "#18181B" },
  destructive: { color: "#FAFAFA" },
  outline: { color: "#09090B" },
};
