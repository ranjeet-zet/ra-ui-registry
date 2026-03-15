import React, { useState, forwardRef } from "react";
import { TextInput, Text, View, StyleSheet, TextInputProps, ViewStyle } from "react-native";

interface TextareaProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export const Textarea = forwardRef<TextInput, TextareaProps>(({ label, error, containerStyle, style, ...props }, ref) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        ref={ref}
        multiline
        textAlignVertical="top"
        style={[styles.input, focused && styles.focused, error && styles.error, style]}
        placeholderTextColor="#A1A1AA"
        onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
        onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
});

const styles = StyleSheet.create({
  container: { gap: 6 },
  label: { fontSize: 14, fontWeight: "500", color: "#09090B" },
  input: { borderWidth: 1, borderColor: "#E4E4E7", borderRadius: 6, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, color: "#09090B", backgroundColor: "#FFFFFF", minHeight: 80 },
  focused: { borderColor: "#18181B", borderWidth: 2 },
  error: { borderColor: "#DC2626" },
  errorText: { fontSize: 13, color: "#DC2626" },
});
