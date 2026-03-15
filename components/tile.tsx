import React from "react";
import { Pressable, Text, View, StyleSheet, ViewStyle, PressableProps } from "react-native";

type Size = "md" | "lg";

interface TileProps extends PressableProps {
  children: React.ReactNode;
  subtitle?: string;
  size?: Size;
  style?: ViewStyle;
}

export function Tile({
  children,
  subtitle,
  size = "md",
  style,
  ...props
}: TileProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.tile,
        sizeStyles[size],
        pressed && { opacity: 0.8 },
        style,
      ]}
      {...props}
    >
      <View style={styles.content}>{children}</View>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E2E2E4",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  subtitle: {
    fontSize: 13,
    color: "#88878F",
    marginTop: 8,
    textAlign: "center",
  },
});

const sizeStyles: Record<Size, ViewStyle> = {
  md: { paddingVertical: 24, paddingHorizontal: 8 },
  lg: { padding: 16 },
};
