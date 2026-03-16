import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";

interface StepperStep {
  label: string;
  description?: string;
}

interface StepperProps {
  steps: StepperStep[];
  activeStep: number;
  style?: ViewStyle;
}

export function Stepper({ steps, activeStep, style }: StepperProps) {
  return (
    <View style={[styles.container, style]}>
      {steps.map((step, i) => {
        const isActive = i === activeStep;
        const isCompleted = i < activeStep;

        return (
          <View key={i} style={styles.stepRow}>
            <View style={styles.stepIndicator}>
              <View style={[styles.circle, isCompleted && styles.circleCompleted, isActive && styles.circleActive]}>
                {isCompleted ? (
                  <Text style={styles.checkmark}>{"\u2713"}</Text>
                ) : (
                  <Text style={[styles.stepNum, (isActive || isCompleted) && styles.stepNumActive]}>{i + 1}</Text>
                )}
              </View>
              {i < steps.length - 1 && (
                <View style={[styles.line, isCompleted && styles.lineCompleted]} />
              )}
            </View>
            <View style={styles.stepContent}>
              <Text style={[styles.label, isActive && styles.labelActive, isCompleted && styles.labelCompleted]}>{step.label}</Text>
              {step.description && <Text style={styles.description}>{step.description}</Text>}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 0 },
  stepRow: { flexDirection: "row", gap: 12, minHeight: 60 },
  stepIndicator: { alignItems: "center", width: 32 },
  circle: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: "#E4E4E7", alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF" },
  circleActive: { borderColor: "#18181B", backgroundColor: "#18181B" },
  circleCompleted: { borderColor: "#18181B", backgroundColor: "#18181B" },
  stepNum: { fontSize: 13, fontWeight: "600", color: "#71717A" },
  stepNumActive: { color: "#FFFFFF" },
  checkmark: { fontSize: 14, fontWeight: "700", color: "#FFFFFF" },
  line: { width: 2, flex: 1, backgroundColor: "#E4E4E7", marginVertical: 4 },
  lineCompleted: { backgroundColor: "#18181B" },
  stepContent: { flex: 1, paddingBottom: 20 },
  label: { fontSize: 14, fontWeight: "600", color: "#71717A" },
  labelActive: { color: "#09090B" },
  labelCompleted: { color: "#09090B" },
  description: { fontSize: 13, color: "#A1A1AA", marginTop: 2 },
});
