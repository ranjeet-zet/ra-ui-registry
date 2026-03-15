import React, { useState } from "react";
import { View, Image, Text, StyleSheet, ImageSourcePropType, ViewStyle } from "react-native";

type Size = "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  src?: ImageSourcePropType | string;
  name?: string;
  size?: Size;
  style?: ViewStyle;
}

export function Avatar({ src, name, size = "md", style }: AvatarProps) {
  const [error, setError] = useState(false);
  const dimensions = sizeMap[size];
  const showFallback = !src || error;

  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <View
      style={[
        styles.container,
        { width: dimensions, height: dimensions, borderRadius: dimensions / 2 },
        style,
      ]}
    >
      {showFallback ? (
        <Text style={[styles.initials, { fontSize: dimensions * 0.38 }]}>
          {initials}
        </Text>
      ) : (
        <Image
          source={typeof src === "string" ? { uri: src } : src}
          style={{ width: dimensions, height: dimensions, borderRadius: dimensions / 2 }}
          onError={() => setError(true)}
        />
      )}
    </View>
  );
}

const sizeMap: Record<Size, number> = {
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6D28D9",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  initials: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
