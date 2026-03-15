import React from "react";
import { View, Text, Pressable, Modal, StyleSheet, ViewStyle } from "react-native";

interface DialogProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
}

interface DialogHeaderProps { children: React.ReactNode; }

export function Dialog({ visible, onClose, children, style }: DialogProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={[styles.dialog, style]} onPress={(e) => e.stopPropagation()}>
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function DialogHeader({ children }: DialogHeaderProps) {
  return <View style={styles.header}>{children}</View>;
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
  return <Text style={styles.title}>{children}</Text>;
}

export function DialogDescription({ children }: { children: React.ReactNode }) {
  return <Text style={styles.description}>{children}</Text>;
}

export function DialogContent({ children }: { children: React.ReactNode }) {
  return <View style={styles.content}>{children}</View>;
}

export function DialogFooter({ children }: { children: React.ReactNode }) {
  return <View style={styles.footer}>{children}</View>;
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center", padding: 16 },
  dialog: { backgroundColor: "#FFFFFF", borderRadius: 12, width: "100%", maxWidth: 420, padding: 24, gap: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 24, elevation: 10 },
  header: { gap: 4 },
  title: { fontSize: 18, fontWeight: "700", color: "#09090B" },
  description: { fontSize: 14, color: "#71717A", lineHeight: 20 },
  content: { gap: 16 },
  footer: { flexDirection: "row", justifyContent: "flex-end", gap: 8 },
});
