import React, { useState } from "react";
import { View, Text, Pressable, Modal, FlatList, StyleSheet, ViewStyle } from "react-native";

interface SelectOption { label: string; value: string; }

interface SelectProps {
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  label?: string;
  onValueChange?: (value: string) => void;
  style?: ViewStyle;
}

export function Select({ options, value, placeholder = "Select...", label, onValueChange, style }: SelectProps) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <View style={[styles.wrapper, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Pressable onPress={() => setOpen(true)} style={styles.trigger}>
        <Text style={[styles.triggerText, !selected && styles.placeholder]}>{selected ? selected.label : placeholder}</Text>
        <Text style={styles.arrow}>{"\u25BC"}</Text>
      </Pressable>
      <Modal visible={open} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <View style={styles.dropdown}>
            <FlatList
              data={options}
              keyExtractor={(i) => i.value}
              renderItem={({ item }) => (
                <Pressable onPress={() => { onValueChange?.(item.value); setOpen(false); }} style={[styles.option, item.value === value && styles.optionSelected]}>
                  <Text style={[styles.optionText, item.value === value && styles.optionTextSelected]}>{item.label}</Text>
                  {item.value === value && <Text style={styles.check}>{"\u2713"}</Text>}
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 6 },
  label: { fontSize: 14, fontWeight: "500", color: "#09090B" },
  trigger: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: 1, borderColor: "#E4E4E7", borderRadius: 6, paddingHorizontal: 12, height: 40, backgroundColor: "#FFF" },
  triggerText: { fontSize: 14, color: "#09090B" },
  placeholder: { color: "#A1A1AA" },
  arrow: { fontSize: 10, color: "#71717A" },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", padding: 24 },
  dropdown: { backgroundColor: "#FFF", borderRadius: 8, maxHeight: 300, borderWidth: 1, borderColor: "#E4E4E7", elevation: 5, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12 },
  option: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#F4F4F5" },
  optionSelected: { backgroundColor: "#F4F4F5" },
  optionText: { fontSize: 14, color: "#09090B" },
  optionTextSelected: { fontWeight: "600" },
  check: { fontSize: 14, color: "#18181B", fontWeight: "700" },
});
