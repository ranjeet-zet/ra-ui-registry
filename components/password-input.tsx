import React, { useState, forwardRef } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, TextInputProps, ViewStyle } from "react-native";

interface PasswordInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export const PasswordInput = forwardRef<TextInput, PasswordInputProps>(({ label, error, containerStyle, style, ...props }, ref) => {
  const [visible, setVisible] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputWrapper, focused && styles.focused, error && styles.error]}>
        <TextInput
          ref={ref}
          style={[styles.input, style]}
          secureTextEntry={!visible}
          placeholderTextColor="#A1A1AA"
          onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
          {...props}
        />
        <Pressable onPress={() => setVisible(!visible)} style={styles.toggleBtn}>
          <Text style={styles.toggleText}>{visible ? "Hide" : "Show"}</Text>
        </Pressable>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
});

const styles = StyleSheet.create({
  container: { gap: 6 },
  label: { fontSize: 14, fontWeight: "500", color: "#09090B" },
  inputWrapper: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#E4E4E7", borderRadius: 6, backgroundColor: "#FFFFFF", paddingRight: 4, height: 40 },
  focused: { borderColor: "#18181B", borderWidth: 2 },
  error: { borderColor: "#DC2626" },
  input: { flex: 1, fontSize: 14, color: "#09090B", paddingHorizontal: 12 },
  toggleBtn: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 4 },
  toggleText: { fontSize: 13, fontWeight: "500", color: "#71717A" },
  errorText: { fontSize: 13, color: "#DC2626" },
});
