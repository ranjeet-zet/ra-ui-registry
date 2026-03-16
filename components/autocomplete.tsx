import React, { useState, useMemo } from "react";
import { View, Text, TextInput, Pressable, FlatList, StyleSheet, ViewStyle } from "react-native";

interface AutocompleteOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface AutocompleteProps {
  options: AutocompleteOption[];
  value?: string;
  onSelect?: (option: AutocompleteOption) => void;
  placeholder?: string;
  label?: string;
  freeSolo?: boolean;
  onChangeText?: (text: string) => void;
  style?: ViewStyle;
}

export function Autocomplete({
  options,
  value,
  onSelect,
  placeholder = "Search...",
  label,
  freeSolo = false,
  onChangeText,
  style,
}: AutocompleteProps) {
  const [query, setQuery] = useState(value || "");
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);

  const filtered = useMemo(() => {
    if (!query) return options;
    return options.filter((o) =>
      o.label.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, options]);

  const handleSelect = (option: AutocompleteOption) => {
    if (option.disabled) return;
    setQuery(option.label);
    setOpen(false);
    onSelect?.(option);
  };

  const handleChange = (text: string) => {
    setQuery(text);
    setOpen(true);
    onChangeText?.(text);
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputWrapper, focused && styles.inputFocused]}>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={handleChange}
          onFocus={() => { setFocused(true); setOpen(true); }}
          onBlur={() => { setFocused(false); setTimeout(() => setOpen(false), 200); }}
          placeholder={placeholder}
          placeholderTextColor="#A1A1AA"
        />
        {query.length > 0 && (
          <Pressable onPress={() => { setQuery(""); setOpen(false); }} style={styles.clearBtn}>
            <Text style={styles.clearText}>{"\u2715"}</Text>
          </Pressable>
        )}
      </View>
      {open && filtered.length > 0 && (
        <View style={styles.dropdown}>
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.value}
            keyboardShouldPersistTaps="handled"
            style={{ maxHeight: 200 }}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handleSelect(item)}
                style={[styles.option, item.disabled && styles.optionDisabled]}
              >
                <Text style={[styles.optionText, item.value === value && styles.optionSelected, item.disabled && styles.optionDisabledText]}>
                  {item.label}
                </Text>
              </Pressable>
            )}
          />
        </View>
      )}
      {open && filtered.length === 0 && !freeSolo && (
        <View style={styles.dropdown}>
          <Text style={styles.noResults}>No results found.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 6, zIndex: 10 },
  label: { fontSize: 14, fontWeight: "500", color: "#09090B" },
  inputWrapper: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#E4E4E7", borderRadius: 6, backgroundColor: "#FFFFFF", paddingHorizontal: 12, height: 40 },
  inputFocused: { borderColor: "#18181B", borderWidth: 2 },
  input: { flex: 1, fontSize: 14, color: "#09090B" },
  clearBtn: { padding: 4 },
  clearText: { fontSize: 14, color: "#A1A1AA" },
  dropdown: { borderWidth: 1, borderColor: "#E4E4E7", borderRadius: 8, backgroundColor: "#FFFFFF", marginTop: 4, elevation: 5, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12 },
  option: { paddingHorizontal: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#F4F4F5" },
  optionText: { fontSize: 14, color: "#09090B" },
  optionSelected: { fontWeight: "600" },
  optionDisabled: { opacity: 0.5 },
  optionDisabledText: { color: "#A1A1AA" },
  noResults: { padding: 12, fontSize: 14, color: "#A1A1AA", textAlign: "center" },
});
