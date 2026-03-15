import React from "react";
import { View, Text, Pressable, Modal, StyleSheet, ViewStyle, Dimensions } from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface SheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: "bottom" | "right";
  style?: ViewStyle;
}

export function Sheet({ visible, onClose, children, side = "bottom", style }: SheetProps) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable
          style={[side === "bottom" ? styles.sheetBottom : styles.sheetRight, style]}
          onPress={(e) => e.stopPropagation()}
        >
          {side === "bottom" && <View style={styles.handle} />}
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function SheetHeader({ children }: { children: React.ReactNode }) {
  return <View style={styles.header}>{children}</View>;
}

export function SheetTitle({ children }: { children: React.ReactNode }) {
  return <Text style={styles.title}>{children}</Text>;
}

export function SheetDescription({ children }: { children: React.ReactNode }) {
  return <Text style={styles.description}>{children}</Text>;
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" },
  sheetBottom: { backgroundColor: "#FFFFFF", borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 24, maxHeight: SCREEN_HEIGHT * 0.85 },
  sheetRight: { position: "absolute", right: 0, top: 0, bottom: 0, width: 320, backgroundColor: "#FFFFFF", padding: 24, shadowColor: "#000", shadowOffset: { width: -4, height: 0 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 10 },
  handle: { width: 36, height: 4, backgroundColor: "#D4D4D8", borderRadius: 2, alignSelf: "center", marginBottom: 16 },
  header: { gap: 4, marginBottom: 16 },
  title: { fontSize: 18, fontWeight: "700", color: "#09090B" },
  description: { fontSize: 14, color: "#71717A" },
});
