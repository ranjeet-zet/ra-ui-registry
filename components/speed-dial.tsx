import React, { useState, useRef } from "react";
import { View, Text, Pressable, Animated, StyleSheet, ViewStyle } from "react-native";

interface SpeedDialAction {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}

interface SpeedDialProps {
  actions: SpeedDialAction[];
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export function SpeedDial({ actions, icon, style }: SpeedDialProps) {
  const [open, setOpen] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;

  const toggle = () => {
    const toValue = open ? 0 : 1;
    Animated.spring(anim, { toValue, useNativeDriver: true, friction: 6 }).start();
    setOpen(!open);
  };

  const rotation = anim.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "45deg"] });

  return (
    <View style={[styles.container, style]}>
      {actions.map((action, i) => {
        const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [0, -(60 * (i + 1))] });
        const opacity = anim;
        return (
          <Animated.View key={i} style={[styles.actionWrapper, { transform: [{ translateY }], opacity }]}>
            <Pressable
              onPress={() => { action.onPress(); toggle(); }}
              style={styles.actionBtn}
            >
              {action.icon}
            </Pressable>
            <Text style={styles.actionLabel}>{action.label}</Text>
          </Animated.View>
        );
      })}
      <Pressable onPress={toggle} style={styles.fab}>
        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
          {icon || <Text style={styles.fabIcon}>+</Text>}
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { position: "absolute", bottom: 16, right: 16, alignItems: "center", zIndex: 10 },
  fab: { width: 56, height: 56, borderRadius: 28, backgroundColor: "#18181B", alignItems: "center", justifyContent: "center", elevation: 8, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8 },
  fabIcon: { fontSize: 28, color: "#FFFFFF", fontWeight: "300" },
  actionWrapper: { position: "absolute", bottom: 0, flexDirection: "row", alignItems: "center", gap: 8 },
  actionBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center", elevation: 4, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, borderWidth: 1, borderColor: "#E4E4E7" },
  actionLabel: { position: "absolute", right: 56, backgroundColor: "#18181B", color: "#FAFAFA", fontSize: 12, fontWeight: "500", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
});
