import React from "react";
import { View, Text, Pressable, StyleSheet, ViewStyle } from "react-native";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  style?: ViewStyle;
}

export function Pagination({ currentPage, totalPages, onPageChange, style }: PaginationProps) {
  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <View style={[styles.container, style]}>
      <Pressable onPress={() => onPageChange(Math.max(1, currentPage - 1))} style={[styles.btn, currentPage === 1 && styles.disabled]}>
        <Text style={styles.btnText}>{"\u25C0"} Prev</Text>
      </Pressable>

      <View style={styles.pages}>
        {pages.map((p, i) =>
          p === "..." ? (
            <Text key={`dots-${i}`} style={styles.dots}>...</Text>
          ) : (
            <Pressable key={p} onPress={() => onPageChange(p as number)} style={[styles.page, currentPage === p && styles.pageActive]}>
              <Text style={[styles.pageText, currentPage === p && styles.pageTextActive]}>{p}</Text>
            </Pressable>
          )
        )}
      </View>

      <Pressable onPress={() => onPageChange(Math.min(totalPages, currentPage + 1))} style={[styles.btn, currentPage === totalPages && styles.disabled]}>
        <Text style={styles.btnText}>Next {"\u25B6"}</Text>
      </Pressable>
    </View>
  );
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "...")[] = [1];
  if (current > 3) pages.push("...");
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
  if (current < total - 2) pages.push("...");
  pages.push(total);
  return pages;
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", gap: 4 },
  btn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6, borderWidth: 1, borderColor: "#E4E4E7" },
  btnText: { fontSize: 13, color: "#09090B", fontWeight: "500" },
  disabled: { opacity: 0.3 },
  pages: { flexDirection: "row", alignItems: "center", gap: 2 },
  page: { width: 36, height: 36, borderRadius: 6, alignItems: "center", justifyContent: "center" },
  pageActive: { backgroundColor: "#18181B" },
  pageText: { fontSize: 14, color: "#09090B" },
  pageTextActive: { color: "#FFFFFF", fontWeight: "600" },
  dots: { fontSize: 14, color: "#71717A", paddingHorizontal: 4 },
});
