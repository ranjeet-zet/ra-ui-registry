import React from "react";
import { View, Text, Pressable, StyleSheet, ViewStyle } from "react-native";

type Variant = "default" | "destructive";

interface ToastProps {
  title: string;
  description?: string;
  variant?: Variant;
  action?: { label: string; onPress: () => void };
  onClose?: () => void;
  style?: ViewStyle;
}

export function Toast({ title, description, variant = "default", action, onClose, style }: ToastProps) {
  return (
    <View style={[styles.toast, variant === "destructive" && styles.destructive, style]}>
      <View style={styles.content}>
        <Text style={[styles.title, variant === "destructive" && styles.destructiveTitle]}>{title}</Text>
        {description && <Text style={[styles.desc, variant === "destructive" && styles.destructiveDesc]}>{description}</Text>}
      </View>
      {action && (
        <Pressable onPress={action.onPress} style={styles.actionBtn}>
          <Text style={[styles.actionText, variant === "destructive" && styles.destructiveAction]}>{action.label}</Text>
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

const styles = StyleSheet.create({
  toast: { flexDirection: "row", alignItems: "center", backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E4E4E7", borderRadius: 8, padding: 16, gap: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5 },
  destructive: { backgroundColor: "#DC2626", borderColor: "#DC2626" },
  content: { flex: 1, gap: 2 },
  title: { fontSize: 14, fontWeight: "600", color: "#09090B" },
  desc: { fontSize: 13, color: "#71717A" },
  destructiveTitle: { color: "#FFFFFF" },
  destructiveDesc: { color: "#FECACA" },
  actionBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 4, borderWidth: 1, borderColor: "#E4E4E7" },
  actionText: { fontSize: 13, fontWeight: "500", color: "#09090B" },
  destructiveAction: { color: "#FFF", borderColor: "#FFF" },
  closeBtn: { padding: 4 },
  closeText: { fontSize: 14, color: "#A1A1AA" },
});
