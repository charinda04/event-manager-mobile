import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface SearchBarProps extends TextInputProps {
  iconColor?: string;
}

export function SearchBar({ 
  placeholder = "Search...", 
  iconColor = "#8E8E93",
  style,
  ...props 
}: SearchBarProps) {
  return (
    <ThemedView style={[styles.searchContainer, style]}>
      <IconSymbol 
        size={20} 
        name="magnifyingglass" 
        color={iconColor} 
      />
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor="#8E8E93"
        {...props}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
});