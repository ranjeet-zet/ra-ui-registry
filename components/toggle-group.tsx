import React from "react";
import { View, Pressable, StyleSheet, ViewStyle } from "react-native";

interface ToggleGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  style?: ViewStyle;
}

interface ToggleGroupItemProps {
  value: string;
  children: React.ReactNode;
}

const ToggleGroupContext = React.createContext<{ value: string; onValueChange: (v: string) => void }>({ value: "", onValueChange: () => {} });

export function ToggleGroup({ value, onValueChange, children, style }: ToggleGroupProps) {
  return (
    <ToggleGroupContext.Provider value={{ value, onValueChange }}>
      <View style={[styles.group, style]}>{children}</View>
    </ToggleGroupContext.Provider>
  );
}

export function ToggleGroupItem({ value, children }: ToggleGroupItemProps) {
  const ctx = React.useContext(ToggleGroupContext);
  const active = ctx.value === value;

  return (
    <Pressable onPress={() => ctx.onValueChange(value)} style={[styles.item, active && styles.itemActive]}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  group: { flexDirection: "row", borderWidth: 1, borderColor: "#E4E4E7", borderRadius: 6, overflow: "hidden" },
  item: { flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: 8, paddingHorizontal: 12 },
  itemActive: { backgroundColor: "#F4F4F5" },
});
