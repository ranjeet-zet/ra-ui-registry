import React, { useState } from "react";
import { View, Pressable, Modal, StyleSheet, ViewStyle, Dimensions } from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  style?: ViewStyle;
}

export function Popover({ trigger, children, style }: PopoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <View style={style}>
      <Pressable onPress={() => setOpen(!open)}>{trigger}</Pressable>
      <Modal visible={open} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <View style={styles.popover}>
            {children}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.2)", justifyContent: "center", alignItems: "center", padding: 24 },
  popover: { backgroundColor: "#FFFFFF", borderRadius: 8, borderWidth: 1, borderColor: "#E4E4E7", padding: 16, minWidth: 200, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 5 },
});
