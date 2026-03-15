import React, { useState } from "react";
import { View, Text, Pressable, Modal, StyleSheet, ViewStyle } from "react-native";

interface MenuItem {
  label: string;
  onPress: () => void;
  destructive?: boolean;
  disabled?: boolean;
}

interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: (MenuItem | "separator")[];
  style?: ViewStyle;
}

export function DropdownMenu({ trigger, items, style }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <View style={style}>
      <Pressable onPress={() => setOpen(true)}>{trigger}</Pressable>
      <Modal visible={open} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <View style={styles.menu}>
            {items.map((item, i) =>
              item === "separator" ? (
                <View key={i} style={styles.separator} />
              ) : (
                <Pressable
                  key={i}
                  onPress={() => { if (!item.disabled) { item.onPress(); setOpen(false); } }}
                  style={[styles.item, item.disabled && styles.disabled]}
                >
                  <Text style={[styles.itemText, item.destructive && styles.destructive]}>{item.label}</Text>
                </Pressable>
              )
            )}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.3)", justifyContent: "center", alignItems: "center", padding: 24 },
  menu: { backgroundColor: "#FFF", borderRadius: 8, borderWidth: 1, borderColor: "#E4E4E7", minWidth: 200, paddingVertical: 4, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 5 },
  item: { paddingHorizontal: 12, paddingVertical: 8 },
  itemText: { fontSize: 14, color: "#09090B" },
  destructive: { color: "#DC2626" },
  disabled: { opacity: 0.5 },
  separator: { height: 1, backgroundColor: "#E4E4E7", marginVertical: 4 },
});
