import React, { useRef, useState } from "react";
import { View, ScrollView, Pressable, Text, StyleSheet, Dimensions, NativeSyntheticEvent, NativeScrollEvent, ViewStyle } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface CarouselProps {
  children: React.ReactNode[];
  itemWidth?: number;
  gap?: number;
  showDots?: boolean;
  showArrows?: boolean;
  style?: ViewStyle;
}

export function Carousel({ children, itemWidth = SCREEN_WIDTH - 64, gap = 12, showDots = true, showArrows = true, style }: CarouselProps) {
  const scrollRef = useRef<ScrollView>(null);
  const [active, setActive] = useState(0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const idx = Math.round(x / (itemWidth + gap));
    setActive(idx);
  };

  const scrollTo = (idx: number) => {
    scrollRef.current?.scrollTo({ x: idx * (itemWidth + gap), animated: true });
  };

  return (
    <View style={[styles.container, style]}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled={false}
        snapToInterval={itemWidth + gap}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ gap, paddingHorizontal: 4 }}
      >
        {children.map((child, i) => (
          <View key={i} style={{ width: itemWidth }}>{child}</View>
        ))}
      </ScrollView>

      {showArrows && children.length > 1 && (
        <View style={styles.arrows}>
          <Pressable onPress={() => scrollTo(Math.max(0, active - 1))} style={[styles.arrow, active === 0 && styles.arrowDisabled]}>
            <Text style={styles.arrowText}>{"\u25C0"}</Text>
          </Pressable>
          <Pressable onPress={() => scrollTo(Math.min(children.length - 1, active + 1))} style={[styles.arrow, active === children.length - 1 && styles.arrowDisabled]}>
            <Text style={styles.arrowText}>{"\u25B6"}</Text>
          </Pressable>
        </View>
      )}

      {showDots && children.length > 1 && (
        <View style={styles.dots}>
          {children.map((_, i) => (
            <View key={i} style={[styles.dot, i === active && styles.dotActive]} />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12 },
  arrows: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 4 },
  arrow: { width: 32, height: 32, borderRadius: 6, borderWidth: 1, borderColor: "#E4E4E7", alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF" },
  arrowDisabled: { opacity: 0.3 },
  arrowText: { fontSize: 10, color: "#71717A" },
  dots: { flexDirection: "row", justifyContent: "center", gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#E4E4E7" },
  dotActive: { backgroundColor: "#18181B" },
});
