import React, { useEffect, useRef } from "react";
import {
  Pressable,
  Animated,
  StyleSheet,
  ViewStyle,
} from "react-native";

type Intent = "primary" | "success" | "warning" | "error";

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  intent?: Intent;
  style?: ViewStyle;
}

export function Switch({
  value,
  onValueChange,
  disabled = false,
  intent = "primary",
  style,
}: SwitchProps) {
  const translateX = useRef(new Animated.Value(value ? 20 : 2)).current;
  const bgAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: value ? 20 : 2,
        useNativeDriver: true,
        friction: 8,
        tension: 60,
      }),
      Animated.timing(bgAnim, {
        toValue: value ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [value]);

  const backgroundColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#BABABF", intentColors[intent]],
  });

  return (
    <Pressable
      onPress={() => !disabled && onValueChange(!value)}
      style={[{ opacity: disabled ? 0.5 : 1 }, style]}
    >
      <Animated.View style={[styles.track, { backgroundColor }]}>
        <Animated.View
          style={[styles.thumb, { transform: [{ translateX }] }]}
        />
      </Animated.View>
    </Pressable>
  );
}

const intentColors: Record<Intent, string> = {
  primary: "#832dc2",
  success: "#41bc49",
  warning: "#ffa32a",
  error: "#ff4961",
};

const styles = StyleSheet.create({
  track: {
    width: 44,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
});
