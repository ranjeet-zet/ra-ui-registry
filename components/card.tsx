import React from "react";
import { View, Text, StyleSheet, ViewProps } from "react-native";

interface CardProps extends ViewProps { children: React.ReactNode; }

export function Card({ style, children, ...props }: CardProps) {
  return <View style={[styles.card, style]} {...props}>{children}</View>;
}

export function CardHeader({ style, children, ...props }: CardProps) {
  return <View style={[styles.header, style]} {...props}>{children}</View>;
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return <Text style={styles.title}>{children}</Text>;
}

export function CardDescription({ children }: { children: React.ReactNode }) {
  return <Text style={styles.description}>{children}</Text>;
}

export function CardContent({ style, children, ...props }: CardProps) {
  return <View style={[styles.content, style]} {...props}>{children}</View>;
}

export function CardFooter({ style, children, ...props }: CardProps) {
  return <View style={[styles.footer, style]} {...props}>{children}</View>;
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#FFFFFF", borderRadius: 12, borderWidth: 1, borderColor: "#E4E4E7", shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 1 },
  header: { padding: 24, paddingBottom: 8, gap: 4 },
  title: { fontSize: 18, fontWeight: "700", color: "#09090B" },
  description: { fontSize: 14, color: "#71717A" },
  content: { padding: 24, paddingTop: 0 },
  footer: { padding: 24, paddingTop: 0, flexDirection: "row", alignItems: "center", gap: 8 },
});
