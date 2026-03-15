import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";

type Variant = "info" | "success" | "warning" | "error" | "primary";

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
  primary: "\u2728",
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
  info: { backgroundColor: "#f7f0ff", borderColor: "#e3c7ff" },
  success: { backgroundColor: "#f0faf1", borderColor: "#c6ebc9" },
  warning: { backgroundColor: "#fff9f0", borderColor: "#fee3b9" },
  error: { backgroundColor: "#fef5f5", borderColor: "#fccfd5" },
  primary: { backgroundColor: "#f7f0ff", borderColor: "#d1a3ff" },
};

const variantTitleStyles: Record<Variant, { color: string }> = {
  info: { color: "#380070" },
  success: { color: "#1f5b23" },
  warning: { color: "#7e4e02" },
  error: { color: "#820818" },
  primary: { color: "#380070" },
};

const variantMessageStyles: Record<Variant, { color: string }> = {
  info: { color: "#5700ad" },
  success: { color: "#2b7d31" },
  warning: { color: "#b06d03" },
  error: { color: "#ad0b20" },
  primary: { color: "#5700ad" },
};
