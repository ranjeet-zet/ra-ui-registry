import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, ViewStyle } from "react-native";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  side?: "top" | "bottom";
  style?: ViewStyle;
}

export function Tooltip({ content, children, side = "top", style }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {visible && (
        <View style={[styles.tooltip, side === "top" ? styles.top : styles.bottom]}>
          <Text style={styles.text}>{content}</Text>
          <View style={[styles.arrow, side === "top" ? styles.arrowBottom : styles.arrowTop]} />
        </View>
      )}
      <Pressable onPressIn={() => setVisible(true)} onPressOut={() => setVisible(false)} onHoverIn={() => setVisible(true)} onHoverOut={() => setVisible(false)}>
        {children}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { position: "relative" },
  tooltip: { position: "absolute", backgroundColor: "#18181B", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, alignSelf: "center", zIndex: 50 },
  top: { bottom: "100%", marginBottom: 8 },
  bottom: { top: "100%", marginTop: 8 },
  text: { fontSize: 13, color: "#FAFAFA", fontWeight: "500" },
  arrow: { position: "absolute", alignSelf: "center", width: 0, height: 0, borderLeftWidth: 5, borderRightWidth: 5, borderLeftColor: "transparent", borderRightColor: "transparent" },
  arrowBottom: { bottom: -4, borderTopWidth: 5, borderTopColor: "#18181B" },
  arrowTop: { top: -4, borderBottomWidth: 5, borderBottomColor: "#18181B" },
});
