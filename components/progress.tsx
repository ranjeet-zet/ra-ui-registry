import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

interface ProgressProps {
  value: number;
  max?: number;
  style?: ViewStyle;
}

export function Progress({ value, max = 100, style }: ProgressProps) {
  const percent = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <View style={[styles.track, style]}>
      <View style={[styles.fill, { width: `${percent}%` as unknown as number }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: 8, backgroundColor: "#F4F4F5", borderRadius: 100, overflow: "hidden", width: "100%" },
  fill: { height: "100%", backgroundColor: "#18181B", borderRadius: 100 },
});
