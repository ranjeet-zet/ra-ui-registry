import React from "react";
import { Pressable, View, Text, StyleSheet, ViewStyle } from "react-native";

interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

export function Checkbox({ checked, onCheckedChange, label, disabled = false, style }: CheckboxProps) {
  return (
    <Pressable onPress={() => !disabled && onCheckedChange(!checked)} style={[styles.container, { opacity: disabled ? 0.5 : 1 }, style]}>
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked && <Text style={styles.check}>{"\u2713"}</Text>}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", gap: 8 },
  box: { width: 16, height: 16, borderRadius: 4, borderWidth: 1, borderColor: "#18181B", alignItems: "center", justifyContent: "center" },
  boxChecked: { backgroundColor: "#18181B" },
  check: { color: "#FFFFFF", fontSize: 11, fontWeight: "700", lineHeight: 13 },
  label: { fontSize: 14, color: "#09090B" },
});
