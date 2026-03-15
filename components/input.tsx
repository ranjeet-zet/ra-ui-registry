import React, { useState } from "react";
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from "react-native";

type Size = "sm" | "md" | "lg";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  size?: Size;
  isRequired?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  containerStyle?: ViewStyle;
}

export function Input({
  label,
  error,
  size = "md",
  isRequired = false,
  iconLeft,
  iconRight,
  containerStyle,
  style,
  ...props
}: InputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={styles.label}>
          {label}
          {isRequired && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      <View
        style={[
          styles.inputWrapper,
          sizeStyles[size],
          focused && styles.inputFocused,
          error ? styles.inputError : undefined,
        ]}
      >
        {iconLeft && <View style={styles.icon}>{iconLeft}</View>}
        <TextInput
          style={[styles.input, sizeTextStyles[size], style]}
          placeholderTextColor="#A2A1A8"
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
        {iconRight && <View style={styles.icon}>{iconRight}</View>}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
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
    marginBottom: 4,
  },
  required: {
    color: "#ff4961",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#A2A1A8",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    gap: 8,
  },
  inputFocused: {
    borderColor: "#832dc2",
  },
  inputError: {
    borderColor: "#ff4961",
  },
  input: {
    flex: 1,
    color: "#22202F",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    fontSize: 13,
    color: "#ff4961",
    marginTop: 2,
  },
});

const sizeStyles: Record<Size, ViewStyle> = {
  sm: { paddingHorizontal: 10, paddingVertical: 6 },
  md: { paddingHorizontal: 14, paddingVertical: 10 },
  lg: { paddingHorizontal: 14, paddingVertical: 14 },
};

const sizeTextStyles: Record<Size, { fontSize: number }> = {
  sm: { fontSize: 13 },
  md: { fontSize: 15 },
  lg: { fontSize: 17 },
};
