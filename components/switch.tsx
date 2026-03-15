import React, { useEffect, useRef } from "react";
import { Pressable, Animated, StyleSheet, ViewStyle } from "react-native";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export function Switch({ checked, onCheckedChange, disabled = false, style }: SwitchProps) {
  const translateX = useRef(new Animated.Value(checked ? 18 : 2)).current;
  const bgAnim = useRef(new Animated.Value(checked ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateX, { toValue: checked ? 18 : 2, useNativeDriver: true, friction: 8, tension: 60 }),
      Animated.timing(bgAnim, { toValue: checked ? 1 : 0, duration: 150, useNativeDriver: false }),
    ]).start();
  }, [checked]);

  const bg = bgAnim.interpolate({ inputRange: [0, 1], outputRange: ["#E4E4E7", "#18181B"] });

  return (
    <Pressable onPress={() => !disabled && onCheckedChange(!checked)} style={[{ opacity: disabled ? 0.5 : 1 }, style]}>
      <Animated.View style={[styles.track, { backgroundColor: bg }]}>
        <Animated.View style={[styles.thumb, { transform: [{ translateX }] }]} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: { width: 40, height: 22, borderRadius: 11, justifyContent: "center" },
  thumb: { width: 18, height: 18, borderRadius: 9, backgroundColor: "#FFFFFF", shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.15, shadowRadius: 2, elevation: 2 },
});
