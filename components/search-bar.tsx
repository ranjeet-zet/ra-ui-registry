import React, { useState, forwardRef } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, TextInputProps, ViewStyle } from "react-native";

interface SearchBarProps extends TextInputProps {
  onSearch?: (query: string) => void;
  onClear?: () => void;
  containerStyle?: ViewStyle;
}

export const SearchBar = forwardRef<TextInput, SearchBarProps>(({ onSearch, onClear, containerStyle, style, ...props }, ref) => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const handleChange = (text: string) => {
    setQuery(text);
    onSearch?.(text);
  };

  const handleClear = () => {
    setQuery("");
    onClear?.();
    onSearch?.("");
  };

  return (
    <View style={[styles.container, focused && styles.focused, containerStyle]}>
      <Text style={styles.icon}>🔍</Text>
      <TextInput
        ref={ref}
        style={[styles.input, style]}
        value={query}
        onChangeText={handleChange}
        placeholder="Search..."
        placeholderTextColor="#A1A1AA"
        returnKeyType="search"
        onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
        onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
        {...props}
      />
      {query.length > 0 && (
        <Pressable onPress={handleClear} style={styles.clearBtn}>
          <Text style={styles.clearText}>{"\u2715"}</Text>
        </Pressable>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#E4E4E7", borderRadius: 8, backgroundColor: "#FFFFFF", paddingHorizontal: 12, height: 44, gap: 8 },
  focused: { borderColor: "#18181B", borderWidth: 2 },
  icon: { fontSize: 16 },
  input: { flex: 1, fontSize: 14, color: "#09090B" },
  clearBtn: { padding: 4 },
  clearText: { fontSize: 14, color: "#A1A1AA" },
});
