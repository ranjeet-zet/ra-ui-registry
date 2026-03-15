import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  StyleSheet,
  ViewStyle,
} from "react-native";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  label?: string;
  onChange?: (value: string) => void;
  error?: string;
  style?: ViewStyle;
}

export function Select({
  options,
  value,
  placeholder = "Select an option",
  label,
  onChange,
  error,
  style,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <View style={[styles.wrapper, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <Pressable
        onPress={() => setOpen(true)}
        style={[styles.trigger, error ? styles.triggerError : undefined]}
      >
        <Text
          style={[styles.triggerText, !selected && styles.placeholderText]}
        >
          {selected ? selected.label : placeholder}
        </Text>
        <Text style={styles.arrow}>{"\u25BC"}</Text>
      </Pressable>

      {error && <Text style={styles.error}>{error}</Text>}

      <Modal visible={open} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <View style={styles.dropdown}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    onChange?.(item.value);
                    setOpen(false);
                  }}
                  style={[
                    styles.option,
                    item.value === value && styles.optionSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      item.value === value && styles.optionTextSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {item.value === value && (
                    <Text style={styles.check}>{"\u2713"}</Text>
                  )}
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#22202F",
    marginBottom: 4,
  },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E2E2E4",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
  },
  triggerError: {
    borderColor: "#ff4961",
  },
  triggerText: {
    fontSize: 15,
    color: "#22202F",
  },
  placeholderText: {
    color: "#A2A1A8",
  },
  arrow: {
    fontSize: 10,
    color: "#88878F",
  },
  error: {
    fontSize: 13,
    color: "#ff4961",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 24,
  },
  dropdown: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    maxHeight: 300,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F6F6F7",
  },
  optionSelected: {
    backgroundColor: "#f7f0ff",
  },
  optionText: {
    fontSize: 15,
    color: "#22202F",
  },
  optionTextSelected: {
    color: "#832dc2",
    fontWeight: "600",
  },
  check: {
    fontSize: 16,
    color: "#832dc2",
    fontWeight: "700",
  },
});
