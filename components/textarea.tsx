import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from "react-native";

interface TextareaProps extends TextInputProps {
  label?: string;
  error?: string;
  maxLength?: number;
  showCount?: boolean;
  isRequired?: boolean;
  style?: ViewStyle;
}

export function Textarea({
  label,
  error,
  maxLength,
  showCount = false,
  isRequired = false,
  value,
  style,
  ...props
}: TextareaProps) {
  const [focused, setFocused] = useState(false);
  const count = value?.length || 0;

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={styles.label}>
          {label}
          {isRequired && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          focused && styles.inputFocused,
          error ? styles.inputError : undefined,
        ]}
        multiline
        textAlignVertical="top"
        placeholderTextColor="#A2A1A8"
        maxLength={maxLength}
        value={value}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        {...props}
      />
      <View style={styles.footer}>
        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          <View />
        )}
        {showCount && maxLength && (
          <Text style={styles.count}>
            {count}/{maxLength}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#22202F",
  },
  required: {
    color: "#ff4961",
  },
  input: {
    borderWidth: 1,
    borderColor: "#A2A1A8",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#22202F",
    backgroundColor: "#FFFFFF",
    minHeight: 120,
  },
  inputFocused: {
    borderColor: "#832dc2",
  },
  inputError: {
    borderColor: "#ff4961",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  error: {
    fontSize: 13,
    color: "#ff4961",
  },
  count: {
    fontSize: 12,
    color: "#88878F",
  },
});
