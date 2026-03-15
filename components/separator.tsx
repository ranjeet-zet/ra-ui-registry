import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  style?: ViewStyle;
}

export function Separator({ orientation = "horizontal", style }: SeparatorProps) {
  return <View style={[orientation === "horizontal" ? styles.horizontal : styles.vertical, style]} />;
}

const styles = StyleSheet.create({
  horizontal: { height: 1, width: "100%", backgroundColor: "#E4E4E7" },
  vertical: { width: 1, alignSelf: "stretch", backgroundColor: "#E4E4E7" },
});
