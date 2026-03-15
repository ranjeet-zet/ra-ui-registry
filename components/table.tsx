import React from "react";
import { View, Text, ScrollView, StyleSheet, ViewStyle, TextStyle } from "react-native";

interface TableProps { children: React.ReactNode; style?: ViewStyle; }

export function Table({ children, style }: TableProps) {
  return <ScrollView horizontal><View style={[styles.table, style]}>{children}</View></ScrollView>;
}

export function TableHeader({ children, style }: TableProps) {
  return <View style={[styles.headerRow, style]}>{children}</View>;
}

export function TableBody({ children, style }: TableProps) {
  return <View style={style}>{children}</View>;
}

export function TableRow({ children, style }: TableProps) {
  return <View style={[styles.row, style]}>{children}</View>;
}

export function TableHead({ children, style, width }: { children: React.ReactNode; style?: TextStyle; width?: number }) {
  return <Text style={[styles.head, width ? { width } : styles.cellFlex, style]}>{children}</Text>;
}

export function TableCell({ children, style, width }: { children: React.ReactNode; style?: TextStyle; width?: number }) {
  return <Text style={[styles.cell, width ? { width } : styles.cellFlex, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  table: { borderWidth: 1, borderColor: "#E4E4E7", borderRadius: 8, overflow: "hidden", minWidth: "100%" },
  headerRow: { flexDirection: "row", backgroundColor: "#F4F4F5", borderBottomWidth: 1, borderBottomColor: "#E4E4E7" },
  row: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#E4E4E7" },
  head: { padding: 12, fontSize: 13, fontWeight: "600", color: "#71717A" },
  cell: { padding: 12, fontSize: 14, color: "#09090B" },
  cellFlex: { flex: 1, minWidth: 100 },
});
