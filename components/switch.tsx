import React, { useEffect, useRef } from "react";
import {
  Pressable,
  Animated,
  StyleSheet,
  ViewStyle,
} from "react-native";

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  activeColor?: string;
  style?: ViewStyle;
}

export function Switch({
  value,
  onValueChange,
  disabled = false,
  activeColor = "#6D28D9",
  style,
}: SwitchProps) {
  const translateX = useRef(new Animated.Value(value ? 20 : 2)).current;
  const bgColor = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: value ? 20 : 2,
        useNativeDriver: true,
        friction: 8,
        tension: 60,
      }),
      Animated.timing(bgColor, {
        toValue: value ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [value]);

  const backgroundColor = bgColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["#D4D4D8", activeColor],
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
