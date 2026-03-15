import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";

type Variant = "info" | "success" | "warning" | "error";

interface AlertProps {
  title: string;
  message?: string;
  variant?: Variant;
  style?: ViewStyle;
}

export function Alert({ title, message, variant = "info", style }: AlertProps) {
  return (
    <View style={[styles.container, variantStyles[variant], style]}>
      <Text style={styles.icon}>{iconMap[variant]}</Text>
      <View style={styles.content}>
        <Text style={[styles.title, variantTitleStyles[variant]]}>{title}</Text>
        {message && (
          <Text style={[styles.message, variantMessageStyles[variant]]}>
            {message}
          </Text>
        )}
      </View>
    </View>
  );
}

const iconMap: Record<Variant, string> = {
  info: "\u2139\uFE0F",
  success: "\u2705",
  warning: "\u26A0\uFE0F",
  error: "\u274C",
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    gap: 12,
    alignItems: "flex-start",
  },
  icon: {
    fontSize: 18,
    marginTop: 1,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
  },
});

const variantStyles: Record<Variant, ViewStyle> = {
  info: { backgroundColor: "#EFF6FF", borderColor: "#BFDBFE" },
  success: { backgroundColor: "#F0FDF4", borderColor: "#BBF7D0" },
  warning: { backgroundColor: "#FFFBEB", borderColor: "#FDE68A" },
  error: { backgroundColor: "#FEF2F2", borderColor: "#FECACA" },
};

const variantTitleStyles: Record<Variant, { color: string }> = {
  info: { color: "#1E40AF" },
  success: { color: "#166534" },
  warning: { color: "#92400E" },
  error: { color: "#991B1B" },
};

const variantMessageStyles: Record<Variant, { color: string }> = {
  info: { color: "#1E3A8A" },
  success: { color: "#14532D" },
  warning: { color: "#78350F" },
  error: { color: "#7F1D1D" },
};
