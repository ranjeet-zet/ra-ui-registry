import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";

interface LabelProps {
  children: React.ReactNode;
  required?: boolean;
  style?: TextStyle;
}

export function Label({ children, required, style }: LabelProps) {
  return (
    <Text style={[styles.label, style]}>
      {children}
      {required && <Text style={styles.required}> *</Text>}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 14, fontWeight: "500", color: "#09090B" },
  required: { color: "#DC2626" },
});
