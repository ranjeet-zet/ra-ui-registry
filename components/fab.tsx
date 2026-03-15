import React from "react";
import {
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  PressableProps,
} from "react-native";

type Variant = "primary" | "success" | "error" | "warning";
type Size = "sm" | "md" | "lg";

interface FabProps extends PressableProps {
  title?: string;
  icon?: React.ReactNode;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  style?: ViewStyle;
}

export function Fab({
  title,
  icon,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  style,
  ...props
}: FabProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.fab,
        sizeStyles[size],
        variantStyles[variant],
        pressed && { opacity: 0.8 },
        disabled && { opacity: 0.5 },
        style,
      ]}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" size="small" />
      ) : (
        <>
          {icon}
          {title && (
            <Text style={[styles.text, sizeTextStyles[size]]}>{title}</Text>
          )}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});

const sizeStyles: Record<Size, ViewStyle> = {
  sm: { paddingHorizontal: 14, paddingVertical: 10, minWidth: 44, minHeight: 44 },
  md: { paddingHorizontal: 20, paddingVertical: 14, minWidth: 52, minHeight: 52 },
  lg: { paddingHorizontal: 24, paddingVertical: 16, minWidth: 60, minHeight: 60 },
};

const sizeTextStyles: Record<Size, { fontSize: number }> = {
  sm: { fontSize: 13 },
  md: { fontSize: 15 },
  lg: { fontSize: 17 },
};

const variantStyles: Record<Variant, ViewStyle> = {
  primary: { backgroundColor: "#832dc2" },
  success: { backgroundColor: "#41bc49" },
  error: { backgroundColor: "#ff4961" },
  warning: { backgroundColor: "#ffa32a" },
};
