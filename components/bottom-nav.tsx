import React from "react";
import { View, Text, Pressable, StyleSheet, ViewStyle } from "react-native";

interface BottomNavItem {
  icon: React.ReactNode;
  label: string;
  value: string;
}

interface BottomNavProps {
  items: BottomNavItem[];
  value: string;
  onChange: (value: string) => void;
  style?: ViewStyle;
}

export function BottomNav({ items, value, onChange, style }: BottomNavProps) {
  return (
    <View style={[styles.container, style]}>
      {items.map((item) => {
        const active = item.value === value;
        return (
          <Pressable key={item.value} onPress={() => onChange(item.value)} style={styles.item}>
            <View style={[styles.iconWrap, active && styles.iconActive]}>{item.icon}</View>
            <Text style={[styles.label, active && styles.labelActive]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", backgroundColor: "#FFFFFF", borderTopWidth: 1, borderTopColor: "#E4E4E7", paddingBottom: 4, paddingTop: 6 },
  item: { flex: 1, alignItems: "center", gap: 2 },
  iconWrap: { padding: 4, borderRadius: 12 },
  iconActive: { backgroundColor: "#F4F4F5" },
  label: { fontSize: 11, fontWeight: "500", color: "#71717A" },
  labelActive: { color: "#18181B", fontWeight: "600" },
});
