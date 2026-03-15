import React, { useRef } from "react";
import { View, TextInput, StyleSheet, ViewStyle } from "react-native";

interface InputOTPProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  style?: ViewStyle;
}

export function InputOTP({ length = 6, value, onChange, style }: InputOTPProps) {
  const inputs = useRef<(TextInput | null)[]>([]);
  const digits = value.split("").concat(Array(length - value.length).fill(""));

  const handleChange = (text: string, index: number) => {
    const newValue = digits.slice();
    newValue[index] = text.slice(-1);
    const result = newValue.join("");
    onChange(result);
    if (text && index < length - 1) inputs.current[index + 1]?.focus();
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={[styles.container, style]}>
      {digits.map((digit, i) => (
        <TextInput
          key={i}
          ref={(r) => { inputs.current[i] = r; }}
          style={[styles.cell, digit ? styles.filled : undefined]}
          value={digit}
          onChangeText={(t) => handleChange(t, i)}
          onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, i)}
          keyboardType="number-pad"
          maxLength={1}
          selectTextOnFocus
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", gap: 8, justifyContent: "center" },
  cell: { width: 40, height: 44, borderWidth: 1, borderColor: "#E4E4E7", borderRadius: 6, textAlign: "center", fontSize: 18, fontWeight: "600", color: "#09090B" },
  filled: { borderColor: "#18181B", borderWidth: 2 },
});
