import React, { useState } from "react";
import { View, Image, Text, StyleSheet, ImageSourcePropType, ViewStyle } from "react-native";

type Size = "sm" | "md" | "lg" | "xl" | "2xl";

interface AvatarProps {
  src?: ImageSourcePropType | string;
  name?: string;
  size?: Size;
  backgroundColor?: string;
  style?: ViewStyle;
}

interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  size?: Size;
}

function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = hash % 360;
  return `hsl(${h}, 50%, 45%)`;
}

export function Avatar({ src, name, size = "md", backgroundColor, style }: AvatarProps) {
  const [error, setError] = useState(false);
  const dim = sizeMap[size];
  const showFallback = !src || error;
  const bg = backgroundColor || (name ? stringToColor(name) : "#832dc2");

  const initials = name
    ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <View
      style={[
        styles.container,
        { width: dim, height: dim, borderRadius: dim / 2, backgroundColor: showFallback ? bg : "transparent" },
        style,
      ]}
    >
      {showFallback ? (
        <Text style={[styles.initials, { fontSize: dim * 0.38 }]}>{initials}</Text>
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

export function AvatarGroup({ children, max = 4, size = "md" }: AvatarGroupProps) {
  const dim = sizeMap[size];
  const childArray = React.Children.toArray(children);
  const visible = childArray.slice(0, max);
  const remaining = childArray.length - max;

  return (
    <View style={styles.group}>
      {visible.map((child, i) => (
        <View key={i} style={[styles.groupItem, { marginLeft: i > 0 ? -(dim * 0.25) : 0 }]}>
          {child}
        </View>
      ))}
      {remaining > 0 && (
        <View
          style={[
            styles.container,
            styles.remaining,
            { width: dim, height: dim, borderRadius: dim / 2, marginLeft: -(dim * 0.25) },
          ]}
        >
          <Text style={[styles.remainingText, { fontSize: dim * 0.3 }]}>+{remaining}</Text>
        </View>
      )}
    </View>
  );
}

const sizeMap: Record<Size, number> = {
  sm: 28,
  md: 40,
  lg: 52,
  xl: 68,
  "2xl": 88,
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  initials: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  group: {
    flexDirection: "row",
    alignItems: "center",
  },
  groupItem: {
    borderWidth: 2,
    borderColor: "#FFFFFF",
    borderRadius: 100,
  },
  remaining: {
    backgroundColor: "#E2E2E4",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  remainingText: {
    color: "#55535F",
    fontWeight: "600",
  },
});
