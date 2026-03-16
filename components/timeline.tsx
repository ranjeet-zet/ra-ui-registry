import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";

interface TimelineItem {
  title: string;
  description?: string;
  time?: string;
  icon?: React.ReactNode;
  active?: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
  style?: ViewStyle;
}

export function Timeline({ items, style }: TimelineProps) {
  return (
    <View style={[styles.container, style]}>
      {items.map((item, i) => (
        <View key={i} style={styles.item}>
          <View style={styles.lineColumn}>
            <View style={[styles.dot, item.active && styles.dotActive]}>
              {item.icon || null}
            </View>
            {i < items.length - 1 && <View style={styles.line} />}
          </View>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={[styles.title, item.active && styles.titleActive]}>{item.title}</Text>
              {item.time && <Text style={styles.time}>{item.time}</Text>}
            </View>
            {item.description && <Text style={styles.description}>{item.description}</Text>}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 0 },
  item: { flexDirection: "row", gap: 12, minHeight: 60 },
  lineColumn: { alignItems: "center", width: 20 },
  dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: "#E4E4E7", borderWidth: 2, borderColor: "#E4E4E7" },
  dotActive: { backgroundColor: "#18181B", borderColor: "#18181B" },
  line: { width: 2, flex: 1, backgroundColor: "#E4E4E7", marginVertical: 4 },
  content: { flex: 1, paddingBottom: 24 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
  title: { fontSize: 14, fontWeight: "600", color: "#09090B" },
  titleActive: { color: "#18181B" },
  time: { fontSize: 12, color: "#A1A1AA" },
  description: { fontSize: 13, color: "#71717A", lineHeight: 18 },
});
