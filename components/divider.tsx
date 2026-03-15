import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";

interface DividerProps {
  direction?: "horizontal" | "vertical";
  label?: string;
  color?: string;
  style?: ViewStyle;
}

export function Divider({
  direction = "horizontal",
  label,
  color = "#E4E4E7",
  style,
}: DividerProps) {
  if (direction === "vertical") {
    return <View style={[styles.vertical, { backgroundColor: color }, style]} />;
  }

  if (label) {
    return (
      <View style={[styles.labelContainer, style]}>
        <View style={[styles.line, { backgroundColor: color }]} />
        <Text style={styles.label}>{label}</Text>
        <View style={[styles.line, { backgroundColor: color }]} />
      </View>
    );
  }

  return <View style={[styles.horizontal, { backgroundColor: color }, style]} />;
}

const styles = StyleSheet.create({
  horizontal: {
    height: 1,
    width: "100%",
  },
  vertical: {
    width: 1,
    alignSelf: "stretch",
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  line: {
    flex: 1,
    height: 1,
  },
  label: {
    fontSize: 13,
    color: "#A1A1AA",
    fontWeight: "500",
  },
});
