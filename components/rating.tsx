import React from "react";
import { View, Pressable, Text, StyleSheet, ViewStyle } from "react-native";

interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: number;
  readOnly?: boolean;
  style?: ViewStyle;
}

export function Rating({ value, onChange, max = 5, size = 28, readOnly = false, style }: RatingProps) {
  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: max }, (_, i) => {
        const filled = i < value;
        return (
          <Pressable
            key={i}
            onPress={() => !readOnly && onChange?.(i + 1)}
            disabled={readOnly}
            style={styles.star}
          >
            <Text style={{ fontSize: size, color: filled ? "#FACC15" : "#E4E4E7" }}>
              {"\u2605"}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", gap: 2 },
  star: { padding: 2 },
});
