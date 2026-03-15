import React from "react";
import { ScrollView, StyleSheet, ViewStyle } from "react-native";

interface ScrollAreaProps {
  children: React.ReactNode;
  maxHeight?: number;
  horizontal?: boolean;
  style?: ViewStyle;
}

export function ScrollArea({ children, maxHeight = 300, horizontal = false, style }: ScrollAreaProps) {
  return (
    <ScrollView
      style={[styles.container, { maxHeight }, style]}
      horizontal={horizontal}
      showsVerticalScrollIndicator={true}
      showsHorizontalScrollIndicator={true}
      bounces={false}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { borderRadius: 8, borderWidth: 1, borderColor: "#E4E4E7" },
});
