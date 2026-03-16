import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ViewStyle } from "react-native";

interface ChipInputProps {
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  label?: string;
  style?: ViewStyle;
}

export function ChipInput({ values, onChange, placeholder = "Add tag...", label, style }: ChipInputProps) {
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);

  const addChip = () => {
    const trimmed = input.trim();
    if (trimmed && !values.includes(trimmed)) {
      onChange([...values, trimmed]);
    }
    setInput("");
  };

  const removeChip = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  const handleKeyPress = (key: string) => {
    if (key === "Backspace" && input === "" && values.length > 0) {
      removeChip(values.length - 1);
    }
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.wrapper, focused && styles.wrapperFocused]}>
        {values.map((chip, i) => (
          <View key={i} style={styles.chip}>
            <Text style={styles.chipText}>{chip}</Text>
            <Pressable onPress={() => removeChip(i)} style={styles.chipRemove}>
              <Text style={styles.chipRemoveText}>{"\u2715"}</Text>
            </Pressable>
          </View>
        ))}
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={addChip}
          onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key)}
          onFocus={() => setFocused(true)}
          onBlur={() => { setFocused(false); if (input.trim()) addChip(); }}
          placeholder={values.length === 0 ? placeholder : ""}
          placeholderTextColor="#A1A1AA"
          returnKeyType="done"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 6 },
  label: { fontSize: 14, fontWeight: "500", color: "#09090B" },
  wrapper: { flexDirection: "row", flexWrap: "wrap", gap: 6, borderWidth: 1, borderColor: "#E4E4E7", borderRadius: 6, padding: 8, backgroundColor: "#FFFFFF", minHeight: 40, alignItems: "center" },
  wrapperFocused: { borderColor: "#18181B", borderWidth: 2 },
  chip: { flexDirection: "row", alignItems: "center", backgroundColor: "#F4F4F5", borderRadius: 4, paddingLeft: 8, paddingRight: 4, paddingVertical: 4, gap: 4 },
  chipText: { fontSize: 13, color: "#09090B", fontWeight: "500" },
  chipRemove: { padding: 2 },
  chipRemoveText: { fontSize: 10, color: "#71717A" },
  input: { flex: 1, minWidth: 80, fontSize: 14, color: "#09090B", paddingVertical: 0 },
});
