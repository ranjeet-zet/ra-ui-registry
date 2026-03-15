import React, { useState } from "react";
import { View, Text, Pressable, Modal, StyleSheet, ViewStyle } from "react-native";

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  label?: string;
  style?: ViewStyle;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function DatePicker({ value, onChange, placeholder = "Pick a date", label, style }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const today = new Date();
  const [month, setMonth] = useState(value?.getMonth() ?? today.getMonth());
  const [year, setYear] = useState(value?.getFullYear() ?? today.getFullYear());

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);

  const isSelected = (d: number) => value && value.getDate() === d && value.getMonth() === month && value.getFullYear() === year;

  const select = (d: number) => { onChange?.(new Date(year, month, d)); setOpen(false); };
  const prev = () => { if (month === 0) { setMonth(11); setYear(year - 1); } else setMonth(month - 1); };
  const next = () => { if (month === 11) { setMonth(0); setYear(year + 1); } else setMonth(month + 1); };

  const formatted = value ? `${MONTHS[value.getMonth()]} ${value.getDate()}, ${value.getFullYear()}` : null;

  return (
    <View style={[styles.wrapper, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Pressable onPress={() => setOpen(true)} style={styles.trigger}>
        <Text style={[styles.triggerText, !formatted && styles.placeholder]}>{formatted || placeholder}</Text>
        <Text style={styles.icon}>{"\uD83D\uDCC5"}</Text>
      </Pressable>

      <Modal visible={open} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <Pressable style={styles.calendar} onPress={(e) => e.stopPropagation()}>
            <View style={styles.header}>
              <Pressable onPress={prev}><Text style={styles.nav}>{"\u25C0"}</Text></Pressable>
              <Text style={styles.monthYear}>{MONTHS[month]} {year}</Text>
              <Pressable onPress={next}><Text style={styles.nav}>{"\u25B6"}</Text></Pressable>
            </View>
            <View style={styles.weekRow}>
              {DAYS.map((d) => <Text key={d} style={styles.weekDay}>{d}</Text>)}
            </View>
            <View style={styles.grid}>
              {cells.map((d, i) => (
                <Pressable key={i} onPress={() => d && select(d)} style={[styles.cell, d && isSelected(d) && styles.selected]}>
                  {d && <Text style={[styles.cellText, isSelected(d) && styles.selectedText]}>{d}</Text>}
                </Pressable>
              ))}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 6 },
  label: { fontSize: 14, fontWeight: "500", color: "#09090B" },
  trigger: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: 1, borderColor: "#E4E4E7", borderRadius: 6, paddingHorizontal: 12, height: 40, backgroundColor: "#FFF" },
  triggerText: { fontSize: 14, color: "#09090B" },
  placeholder: { color: "#A1A1AA" },
  icon: { fontSize: 16 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center", padding: 24 },
  calendar: { backgroundColor: "#FFF", borderRadius: 12, padding: 16, width: 300 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  nav: { fontSize: 12, color: "#71717A", padding: 8 },
  monthYear: { fontSize: 15, fontWeight: "600", color: "#09090B" },
  weekRow: { flexDirection: "row", marginBottom: 8 },
  weekDay: { flex: 1, textAlign: "center", fontSize: 12, fontWeight: "500", color: "#A1A1AA" },
  grid: { flexDirection: "row", flexWrap: "wrap" },
  cell: { width: "14.28%", aspectRatio: 1, alignItems: "center", justifyContent: "center", borderRadius: 6 },
  cellText: { fontSize: 14, color: "#09090B" },
  selected: { backgroundColor: "#18181B" },
  selectedText: { color: "#FFF", fontWeight: "600" },
});
