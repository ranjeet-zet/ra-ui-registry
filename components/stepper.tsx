import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";

type Intent = "primary" | "success" | "error" | "warning";
type Size = "sm" | "md" | "lg";

interface StepperProps {
  currentStep: number;
  totalSteps: number;
  intent?: Intent;
  size?: Size;
  showLabel?: boolean;
  style?: ViewStyle;
}

export function Stepper({
  currentStep,
  totalSteps,
  intent = "primary",
  size = "md",
  showLabel = true,
  style,
}: StepperProps) {
  const progress = Math.min(currentStep / totalSteps, 1);
  const isComplete = currentStep >= totalSteps;
  const activeIntent = isComplete ? "success" : intent;

  return (
    <View style={[styles.container, style]}>
      {showLabel && (
        <Text style={styles.label}>
          {isComplete
            ? "Complete"
            : `Step ${currentStep} of ${totalSteps}`}
        </Text>
      )}
      <View style={[styles.track, sizeStyles[size]]}>
        <View
          style={[
            styles.fill,
            sizeStyles[size],
            intentStyles[activeIntent],
            { width: `${progress * 100}%` as unknown as number },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: "#55535F",
  },
  track: {
    backgroundColor: "#E2E2E4",
    borderRadius: 100,
    overflow: "hidden",
    width: "100%",
  },
  fill: {
    borderRadius: 100,
  },
});

const sizeStyles: Record<Size, ViewStyle> = {
  sm: { height: 4 },
  md: { height: 6 },
  lg: { height: 8 },
};

const intentStyles: Record<Intent, ViewStyle> = {
  primary: { backgroundColor: "#832dc2" },
  success: { backgroundColor: "#41bc49" },
  error: { backgroundColor: "#ff4961" },
  warning: { backgroundColor: "#ffa32a" },
};
