import React, { useRef } from "react";
import { View, PanResponder, StyleSheet, ViewStyle, LayoutChangeEvent } from "react-native";

interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange: (value: number) => void;
  style?: ViewStyle;
}

export function Slider({ value, min = 0, max = 100, step = 1, onValueChange, style }: SliderProps) {
  const trackWidth = useRef(0);
  const percent = ((value - min) / (max - min)) * 100;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => updateValue(e.nativeEvent.locationX),
      onPanResponderMove: (e) => updateValue(e.nativeEvent.locationX),
    })
  ).current;

  const updateValue = (x: number) => {
    if (trackWidth.current === 0) return;
    const ratio = Math.max(0, Math.min(1, x / trackWidth.current));
    const raw = min + ratio * (max - min);
    const stepped = Math.round(raw / step) * step;
    onValueChange(Math.max(min, Math.min(max, stepped)));
  };

  const onLayout = (e: LayoutChangeEvent) => {
    trackWidth.current = e.nativeEvent.layout.width;
  };

  return (
    <View style={[styles.container, style]} onLayout={onLayout} {...panResponder.panHandlers}>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percent}%` as unknown as number }]} />
      </View>
      <View style={[styles.thumb, { left: `${percent}%` as unknown as number }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: 20, justifyContent: "center" },
  track: { height: 6, backgroundColor: "#F4F4F5", borderRadius: 3, overflow: "hidden" },
  fill: { height: "100%", backgroundColor: "#18181B", borderRadius: 3 },
  thumb: { position: "absolute", width: 20, height: 20, borderRadius: 10, backgroundColor: "#FFFFFF", borderWidth: 2, borderColor: "#18181B", marginLeft: -10, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.15, shadowRadius: 2, elevation: 2 },
});
