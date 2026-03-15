import React from "react";
import { View, Text, Pressable, StyleSheet, ViewStyle } from "react-native";

interface BreadcrumbItem {
  label: string;
  onPress?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string;
  style?: ViewStyle;
}

export function Breadcrumb({ items, separator = "/", style }: BreadcrumbProps) {
  return (
    <View style={[styles.container, style]}>
      {items.map((item, i) => (
        <View key={i} style={styles.row}>
          {i > 0 && <Text style={styles.separator}>{separator}</Text>}
          {item.onPress ? (
            <Pressable onPress={item.onPress}>
              <Text style={styles.link}>{item.label}</Text>
            </Pressable>
          ) : (
            <Text style={styles.current}>{item.label}</Text>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" },
  row: { flexDirection: "row", alignItems: "center" },
  separator: { marginHorizontal: 8, fontSize: 14, color: "#A1A1AA" },
  link: { fontSize: 14, color: "#71717A" },
  current: { fontSize: 14, color: "#09090B", fontWeight: "500" },
});
