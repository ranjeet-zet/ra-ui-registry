import React from "react";
import { View, Text, Pressable, Modal, StyleSheet, ViewStyle } from "react-native";

interface AlertDialogProps {
  visible: boolean;
  title: string;
  description?: string;
  cancelLabel?: string;
  actionLabel?: string;
  onCancel: () => void;
  onAction: () => void;
  destructive?: boolean;
  style?: ViewStyle;
}

export function AlertDialog({
  visible,
  title,
  description,
  cancelLabel = "Cancel",
  actionLabel = "Continue",
  onCancel,
  onAction,
  destructive = false,
}: AlertDialogProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <Text style={styles.title}>{title}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
          <View style={styles.actions}>
            <Pressable onPress={onCancel} style={styles.cancelBtn}>
              <Text style={styles.cancelText}>{cancelLabel}</Text>
            </Pressable>
            <Pressable onPress={onAction} style={[styles.actionBtn, destructive && styles.destructiveBtn]}>
              <Text style={styles.actionText}>{actionLabel}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center", padding: 24 },
  dialog: { backgroundColor: "#FFFFFF", borderRadius: 12, padding: 24, width: "100%", maxWidth: 400, gap: 8 },
  title: { fontSize: 18, fontWeight: "700", color: "#09090B" },
  description: { fontSize: 14, color: "#71717A", lineHeight: 20 },
  actions: { flexDirection: "row", justifyContent: "flex-end", gap: 8, marginTop: 16 },
  cancelBtn: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 6, borderWidth: 1, borderColor: "#E4E4E7" },
  cancelText: { fontSize: 14, fontWeight: "500", color: "#09090B" },
  actionBtn: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 6, backgroundColor: "#18181B" },
  destructiveBtn: { backgroundColor: "#DC2626" },
  actionText: { fontSize: 14, fontWeight: "500", color: "#FFFFFF" },
});
