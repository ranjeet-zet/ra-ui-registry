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

interface AccordionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  style?: ViewStyle;
}

export function Accordion({
  title,
  subtitle,
  children,
  defaultOpen = false,
  style,
}: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen(!open);
  };

  return (
    <View style={[styles.container, style]}>
      <Pressable onPress={toggle} style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        <Text style={[styles.arrow, open && styles.arrowOpen]}>
          {"\u25BC"}
        </Text>
      </Pressable>
      {open && <View style={styles.body}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#E2E2E4",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  headerText: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#22202F",
  },
  subtitle: {
    fontSize: 13,
    color: "#88878F",
  },
  arrow: {
    fontSize: 12,
    color: "#88878F",
    marginLeft: 12,
  },
  arrowOpen: {
    transform: [{ rotate: "180deg" }],
  },
  body: {
    padding: 16,
    paddingTop: 0,
    backgroundColor: "#F6F6F7",
  },
});
