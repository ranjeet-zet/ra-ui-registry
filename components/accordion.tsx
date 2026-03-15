import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  ViewStyle,
} from "react-native";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

interface AccordionProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function Accordion({ children, style }: AccordionProps) {
  return <View style={[styles.accordion, style]}>{children}</View>;
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen(!open);
  };

  return (
    <View style={styles.item}>
      <Pressable onPress={toggle} style={styles.trigger}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.chevron, open && styles.chevronOpen]}>{"\u25BC"}</Text>
      </Pressable>
      {open && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  accordion: { borderWidth: 1, borderColor: "#E4E4E7", borderRadius: 8, overflow: "hidden" },
  item: { borderBottomWidth: 1, borderBottomColor: "#E4E4E7" },
  trigger: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16 },
  title: { fontSize: 15, fontWeight: "600", color: "#09090B", flex: 1 },
  chevron: { fontSize: 11, color: "#71717A", transition: "transform 0.2s" },
  chevronOpen: { transform: [{ rotate: "180deg" }] },
  content: { paddingHorizontal: 16, paddingBottom: 16 },
});
