import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, ViewStyle } from "react-native";

interface Tab { value: string; label: string; content: React.ReactNode; }

interface TabsProps {
  tabs: Tab[];
  defaultValue?: string;
  style?: ViewStyle;
}

export function Tabs({ tabs, defaultValue, style }: TabsProps) {
  const [active, setActive] = useState(defaultValue || tabs[0]?.value);
  const activeTab = tabs.find((t) => t.value === active);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.list}>
        {tabs.map((tab) => (
          <Pressable key={tab.value} onPress={() => setActive(tab.value)} style={[styles.trigger, active === tab.value && styles.triggerActive]}>
            <Text style={[styles.triggerText, active === tab.value && styles.triggerTextActive]}>{tab.label}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.content}>{activeTab?.content}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8 },
  list: { flexDirection: "row", backgroundColor: "#F4F4F5", borderRadius: 8, padding: 4 },
  trigger: { flex: 1, paddingVertical: 8, alignItems: "center", borderRadius: 6 },
  triggerActive: { backgroundColor: "#FFFFFF", shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  triggerText: { fontSize: 14, fontWeight: "500", color: "#71717A" },
  triggerTextActive: { color: "#09090B" },
  content: { padding: 16 },
});
