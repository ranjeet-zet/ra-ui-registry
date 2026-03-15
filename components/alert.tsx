import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";

type Variant = "default" | "destructive";

interface AlertProps {
  title: string;
  description?: string;
  variant?: Variant;
  style?: ViewStyle;
}

export function Alert({ title, description, variant = "default", style }: AlertProps) {
  return (
    <View style={[styles.alert, variant === "destructive" ? styles.destructive : styles.default, style]}>
      <Text style={[styles.title, variant === "destructive" && styles.destructiveText]}>{title}</Text>
      {description && (
        <Text style={[styles.description, variant === "destructive" && styles.destructiveDesc]}>{description}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  alert: { padding: 16, borderRadius: 8, borderWidth: 1, gap: 4 },
  default: { backgroundColor: "#FFFFFF", borderColor: "#E4E4E7" },
  destructive: { backgroundColor: "#FEF2F2", borderColor: "#FECACA" },
  title: { fontSize: 15, fontWeight: "600", color: "#09090B" },
  description: { fontSize: 14, color: "#71717A", lineHeight: 20 },
  destructiveText: { color: "#DC2626" },
  destructiveDesc: { color: "#EF4444" },
});
