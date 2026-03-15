import React from "react";
import { View, Pressable, Text, StyleSheet, ViewStyle } from "react-native";

interface RadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  style?: ViewStyle;
}

interface RadioGroupItemProps {
  value: string;
  label: string;
  disabled?: boolean;
}

const RadioContext = React.createContext<{ value: string; onValueChange: (v: string) => void }>({ value: "", onValueChange: () => {} });

export function RadioGroup({ value, onValueChange, children, style }: RadioGroupProps) {
  return (
    <RadioContext.Provider value={{ value, onValueChange }}>
      <View style={[styles.group, style]}>{children}</View>
    </RadioContext.Provider>
  );
}

export function RadioGroupItem({ value, label, disabled }: RadioGroupItemProps) {
  const ctx = React.useContext(RadioContext);
  const selected = ctx.value === value;

  return (
    <Pressable onPress={() => !disabled && ctx.onValueChange(value)} style={[styles.item, { opacity: disabled ? 0.5 : 1 }]}>
      <View style={[styles.circle, selected && styles.circleSelected]}>
        {selected && <View style={styles.dot} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  group: { gap: 8 },
  item: { flexDirection: "row", alignItems: "center", gap: 8 },
  circle: { width: 16, height: 16, borderRadius: 8, borderWidth: 1, borderColor: "#18181B", alignItems: "center", justifyContent: "center" },
  circleSelected: { borderColor: "#18181B" },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#18181B" },
  label: { fontSize: 14, color: "#09090B" },
});
