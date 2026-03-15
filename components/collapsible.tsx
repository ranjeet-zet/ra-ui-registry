import React, { useState } from "react";
import { View, Pressable, Text, StyleSheet, LayoutAnimation, Platform, UIManager, ViewStyle } from "react-native";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  style?: ViewStyle;
}

export function Collapsible({ title, children, defaultOpen = false, style }: CollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen(!open);
  };

  return (
    <View style={[styles.container, style]}>
      <Pressable onPress={toggle} style={styles.trigger}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.icon}>{open ? "\u25B2" : "\u25BC"}</Text>
      </Pressable>
      {open && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8 },
  trigger: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 4 },
  title: { fontSize: 14, fontWeight: "600", color: "#09090B" },
  icon: { fontSize: 10, color: "#71717A" },
  content: { borderRadius: 8, borderWidth: 1, borderColor: "#E4E4E7", padding: 16 },
});
