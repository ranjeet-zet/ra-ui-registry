import React, { useState, useMemo } from "react";
import { View, Text, Pressable, StyleSheet, ViewStyle } from "react-native";

interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date) => void;
  style?: ViewStyle;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function Calendar({ selected, onSelect, style }: CalendarProps) {
  const today = new Date();
  const [month, setMonth] = useState(selected?.getMonth() ?? today.getMonth());
  const [year, setYear] = useState(selected?.getFullYear() ?? today.getFullYear());

  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (number | null)[] = Array(firstDay).fill(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [month, year]);

  const prev = () => { if (month === 0) { setMonth(11); setYear(year - 1); } else setMonth(month - 1); };
  const next = () => { if (month === 11) { setMonth(0); setYear(year + 1); } else setMonth(month + 1); };

  const isSelected = (d: number) => selected && selected.getDate() === d && selected.getMonth() === month && selected.getFullYear() === year;
  const isToday = (d: number) => today.getDate() === d && today.getMonth() === month && today.getFullYear() === year;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Pressable onPress={prev} style={styles.navBtn}><Text style={styles.navText}>{"\u25C0"}</Text></Pressable>
        <Text style={styles.monthYear}>{MONTHS[month]} {year}</Text>
        <Pressable onPress={next} style={styles.navBtn}><Text style={styles.navText}>{"\u25B6"}</Text></Pressable>
      </View>
      <View style={styles.weekRow}>
        {DAYS.map((d) => <Text key={d} style={styles.weekDay}>{d}</Text>)}
      </View>
      <View style={styles.grid}>
        {days.map((d, i) => (
          <Pressable key={i} onPress={() => d && onSelect?.(new Date(year, month, d))} style={[styles.cell, d && isSelected(d) && styles.selected, d && isToday(d) && !isSelected(d) && styles.today]}>
            {d && <Text style={[styles.cellText, isSelected(d) && styles.selectedText]}>{d}</Text>}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#FFFFFF", borderRadius: 12, borderWidth: 1, borderColor: "#E4E4E7", padding: 16 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  navBtn: { padding: 8 },
  navText: { fontSize: 12, color: "#71717A" },
  monthYear: { fontSize: 15, fontWeight: "600", color: "#09090B" },
  weekRow: { flexDirection: "row", marginBottom: 8 },
  weekDay: { flex: 1, textAlign: "center", fontSize: 12, fontWeight: "500", color: "#A1A1AA" },
  grid: { flexDirection: "row", flexWrap: "wrap" },
  cell: { width: "14.28%", aspectRatio: 1, alignItems: "center", justifyContent: "center", borderRadius: 6 },
  cellText: { fontSize: 14, color: "#09090B" },
  selected: { backgroundColor: "#18181B" },
  selectedText: { color: "#FFFFFF", fontWeight: "600" },
  today: { borderWidth: 1, borderColor: "#E4E4E7" },
});
