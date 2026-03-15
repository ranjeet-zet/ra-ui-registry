import React from "react";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  PressableProps,
  ViewStyle,
} from "react-native";

type Size = "sm" | "md" | "lg";
type Type = "solid" | "outlined";

interface ChipProps extends PressableProps {
  label: string;
  size?: Size;
  type?: Type;
  icon?: React.ReactNode;
  selected?: boolean;
  style?: ViewStyle;
}

export function Chip({
  label,
  size = "md",
  type = "solid",
  icon,
  selected = false,
  style,
  ...props
}: ChipProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.chip,
        sizeStyles[size],
        type === "solid"
          ? selected ? styles.solidSelected : styles.solid
          : selected ? styles.outlinedSelected : styles.outlined,
        pressed && { opacity: 0.7 },
        style,
      ]}
      {...props}
    >
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text
        style={[
          styles.text,
          sizeTextStyles[size],
          type === "solid"
            ? selected ? styles.textSolidSelected : styles.textSolid
            : selected ? styles.textOutlinedSelected : styles.textOutlined,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    borderRadius: 100,
    gap: 6,
  },
  solid: { backgroundColor: "#F6F6F7" },
  solidSelected: { backgroundColor: "#832dc2" },
  outlined: { backgroundColor: "transparent", borderWidth: 1, borderColor: "#E2E2E4" },
  outlinedSelected: { backgroundColor: "transparent", borderWidth: 1, borderColor: "#832dc2" },
  icon: { justifyContent: "center" },
  text: { fontWeight: "500" },
  textSolid: { color: "#55535F" },
  textSolidSelected: { color: "#FFFFFF" },
  textOutlined: { color: "#55535F" },
  textOutlinedSelected: { color: "#832dc2" },
});

const sizeStyles: Record<Size, ViewStyle> = {
  sm: { paddingHorizontal: 10, paddingVertical: 4 },
  md: { paddingHorizontal: 14, paddingVertical: 7 },
  lg: { paddingHorizontal: 18, paddingVertical: 10 },
};

const sizeTextStyles: Record<Size, { fontSize: number }> = {
  sm: { fontSize: 12 },
  md: { fontSize: 14 },
  lg: { fontSize: 16 },
};
