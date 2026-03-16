import React, { useEffect, useRef } from "react";
import { View, Text, Pressable, Animated, StyleSheet, ViewStyle } from "react-native";

interface SnackbarProps {
  visible: boolean;
  message: string;
  action?: { label: string; onPress: () => void };
  onDismiss: () => void;
  duration?: number;
  style?: ViewStyle;
}

export function Snackbar({ visible, message, action, onDismiss, duration = 4000, style }: SnackbarProps) {
  const translateY = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(translateY, { toValue: 0, useNativeDriver: true, friction: 8 }).start();
      if (duration > 0) {
        const timer = setTimeout(onDismiss, duration);
        return () => clearTimeout(timer);
      }
    } else {
      Animated.timing(translateY, { toValue: 100, duration: 200, useNativeDriver: true }).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.snackbar, { transform: [{ translateY }] }, style]}>
      <Text style={styles.message}>{message}</Text>
      {action && (
        <Pressable onPress={action.onPress} style={styles.actionBtn}>
          <Text style={styles.actionText}>{action.label}</Text>
        </Pressable>
      )}
      <Pressable onPress={onDismiss} style={styles.closeBtn}>
        <Text style={styles.closeText}>{"\u2715"}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  snackbar: { position: "absolute", bottom: 16, left: 16, right: 16, backgroundColor: "#18181B", borderRadius: 8, paddingVertical: 14, paddingHorizontal: 16, flexDirection: "row", alignItems: "center", gap: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 8 },
  message: { flex: 1, fontSize: 14, color: "#FAFAFA" },
  actionBtn: { paddingHorizontal: 8, paddingVertical: 4 },
  actionText: { fontSize: 14, fontWeight: "600", color: "#A78BFA" },
  closeBtn: { padding: 4 },
  closeText: { fontSize: 14, color: "#71717A" },
});
