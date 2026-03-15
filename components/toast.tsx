import React from "react";
import { View, Text, Pressable, StyleSheet, ViewStyle } from "react-native";

type Intent = "success" | "error" | "warning";

interface ToastProps {
  intent?: Intent;
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  onClose?: () => void;
  style?: ViewStyle;
}

export function Toast({
  intent = "success",
  title,
  message,
  actionLabel,
  onAction,
  onClose,
  style,
}: ToastProps) {
  return (
    <View style={[styles.container, intentStyles[intent], style]}>
      <View style={[styles.border, intentBorderStyles[intent]]} />
      <Text style={styles.icon}>{iconMap[intent]}</Text>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
      {actionLabel && onAction && (
        <Pressable onPress={onAction} style={styles.actionBtn}>
          <Text style={[styles.actionText, intentActionStyles[intent]]}>
            {actionLabel}
          </Text>
        </Pressable>
      )}
      {onClose && (
        <Pressable onPress={onClose} style={styles.closeBtn}>
          <Text style={styles.closeText}>{"\u2715"}</Text>
        </Pressable>
      )}
    </View>
  );
}

const iconMap: Record<Intent, string> = {
  success: "\u2705",
  error: "\u274C",
  warning: "\u26A0\uFE0F",
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 10,
    gap: 12,
    overflow: "hidden",
  },
  border: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  icon: {
    fontSize: 18,
    marginLeft: 4,
  },
  content: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#22202F",
  },
  message: {
    fontSize: 13,
    color: "#55535F",
    lineHeight: 18,
  },
  actionBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  actionText: {
    fontSize: 13,
    fontWeight: "600",
  },
  closeBtn: {
    padding: 4,
  },
  closeText: {
    fontSize: 14,
    color: "#88878F",
  },
});

const intentStyles: Record<Intent, ViewStyle> = {
  success: { backgroundColor: "#f0faf1" },
  error: { backgroundColor: "#fef5f5" },
  warning: { backgroundColor: "#fff9f0" },
};

const intentBorderStyles: Record<Intent, ViewStyle> = {
  success: { backgroundColor: "#41bc49" },
  error: { backgroundColor: "#ff4961" },
  warning: { backgroundColor: "#ffa32a" },
};

const intentActionStyles: Record<Intent, { color: string }> = {
  success: { color: "#2b7d31" },
  error: { color: "#d30d28" },
  warning: { color: "#d88603" },
};
