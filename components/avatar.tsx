import React, { useState } from "react";
import { View, Image, Text, StyleSheet, ImageSourcePropType, ViewStyle } from "react-native";

type Size = "sm" | "md" | "lg";

interface AvatarProps {
  src?: ImageSourcePropType | string;
  fallback?: string;
  size?: Size;
  style?: ViewStyle;
}

export function Avatar({ src, fallback = "?", size = "md", style }: AvatarProps) {
  const [error, setError] = useState(false);
  const dim = sizeMap[size];
  const showFallback = !src || error;

  return (
    <View style={[styles.container, { width: dim, height: dim, borderRadius: dim / 2 }, style]}>
      {showFallback ? (
        <View style={[styles.fallback, { width: dim, height: dim, borderRadius: dim / 2 }]}>
          <Text style={[styles.fallbackText, { fontSize: dim * 0.4 }]}>{fallback.slice(0, 2).toUpperCase()}</Text>
        </View>
      ) : (
        <Image
          source={typeof src === "string" ? { uri: src } : src}
          style={{ width: dim, height: dim, borderRadius: dim / 2 }}
          onError={() => setError(true)}
        />
      )}
    </View>
  );
}

const sizeMap: Record<Size, number> = { sm: 32, md: 40, lg: 56 };

const styles = StyleSheet.create({
  container: { overflow: "hidden" },
  fallback: { backgroundColor: "#F4F4F5", alignItems: "center", justifyContent: "center" },
  fallbackText: { color: "#71717A", fontWeight: "600" },
});
