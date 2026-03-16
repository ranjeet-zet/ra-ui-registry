import React from "react";
import { View, Text, Pressable, StyleSheet, ViewStyle } from "react-native";

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

export function NumberInput({ value, onChange, min = 0, max = 100, step = 1, label, disabled = false, style }: NumberInputProps) {
  const decrement = () => { if (!disabled) onChange(Math.max(min, value - step)); };
  const increment = () => { if (!disabled) onChange(Math.min(max, value + step)); };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.wrapper, disabled && styles.disabled]}>
        <Pressable onPress={decrement} style={[styles.btn, value <= min && styles.btnDisabled]}>
          <Text style={[styles.btnText, value <= min && styles.btnTextDisabled]}>−</Text>
        </Pressable>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{value}</Text>
        </View>
        <Pressable onPress={increment} style={[styles.btn, value >= max && styles.btnDisabled]}>
          <Text style={[styles.btnText, value >= max && styles.btnTextDisabled]}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 6 },
  label: { fontSize: 14, fontWeight: "500", color: "#09090B" },
  wrapper: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#E4E4E7", borderRadius: 6, overflow: "hidden", backgroundColor: "#FFFFFF" },
  disabled: { opacity: 0.5 },
  btn: { width: 40, height: 40, alignItems: "center", justifyContent: "center", backgroundColor: "#F4F4F5" },
  btnDisabled: { opacity: 0.3 },
  btnText: { fontSize: 18, fontWeight: "600", color: "#09090B" },
  btnTextDisabled: { color: "#A1A1AA" },
  valueContainer: { flex: 1, alignItems: "center", justifyContent: "center", height: 40 },
  value: { fontSize: 16, fontWeight: "600", color: "#09090B" },
});
