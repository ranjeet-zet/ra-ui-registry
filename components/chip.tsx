import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  PressableProps,
  ViewStyle,
} from "react-native";

interface ChipProps extends PressableProps {
  label: string;
  selected?: boolean;
  style?: ViewStyle;
}

export function Chip({ label, selected = false, style, ...props }: ChipProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.chip,
        selected ? styles.chipSelected : styles.chipDefault,
        pressed && { opacity: 0.7 },
        style,
      ]}
      {...props}
    >
      <Text style={[styles.text, selected ? styles.textSelected : styles.textDefault]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 100,
    borderWidth: 1,
  },
  chipDefault: {
    backgroundColor: "#FFFFFF",
    borderColor: "#D4D4D8",
  },
  chipSelected: {
    backgroundColor: "#6D28D9",
    borderColor: "#6D28D9",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
  },
  textDefault: {
    color: "#3F3F46",
  },
  textSelected: {
    color: "#FFFFFF",
  },
});
