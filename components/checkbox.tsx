import React from "react";
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from "react-native";

interface CheckboxProps {
  checked: boolean;
  onToggle: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

export function Checkbox({
  checked,
  onToggle,
  label,
  disabled = false,
  style,
}: CheckboxProps) {
  return (
    <Pressable
      onPress={() => !disabled && onToggle(!checked)}
      style={[styles.container, { opacity: disabled ? 0.5 : 1 }, style]}
    >
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked && (
          <Text style={styles.check}>{"\u2713"}</Text>
        )}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#D4D4D8",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  boxChecked: {
    backgroundColor: "#6D28D9",
    borderColor: "#6D28D9",
  },
  check: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 16,
  },
  label: {
    fontSize: 15,
    color: "#27272A",
    fontWeight: "400",
  },
});
