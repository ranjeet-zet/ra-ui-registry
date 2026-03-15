import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  PressableProps,
} from "react-native";

interface SelectableChipProps extends PressableProps {
  label: string;
  selected?: boolean;
  style?: ViewStyle;
}

export function SelectableChip({
  label,
  selected = false,
  style,
  ...props
}: SelectableChipProps) {
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
      <Text
        style={[
          styles.text,
          selected ? styles.textSelected : styles.textDefault,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  chipDefault: {
    backgroundColor: "#F6F6F7",
    borderColor: "#E2E2E4",
  },
  chipSelected: {
    backgroundColor: "#f7f0ff",
    borderColor: "#832dc2",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
  },
  textDefault: {
    color: "#55535F",
  },
  textSelected: {
    color: "#832dc2",
  },
});
