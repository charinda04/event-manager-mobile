import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors, Spacing, FontSize, FontWeight } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

interface OptionRowProps {
  icon?: string;
  label: string;
  value: string;
  onPress: () => void;
  style?: ViewStyle;
  showChevron?: boolean;
}

export function OptionRow({
  icon,
  label,
  value,
  onPress,
  style,
  showChevron = true,
}: OptionRowProps) {
  const textColor = useThemeColor({ 
    light: Colors.light.text, 
    dark: Colors.dark.text 
  }, 'text');
  
  const secondaryColor = useThemeColor({ 
    light: Colors.light.textSecondary, 
    dark: Colors.dark.textSecondary 
  }, 'text');

  return (
    <ThemedView style={[styles.container, style]}>
      <Pressable style={styles.row} onPress={onPress}>
        {icon && (
          <IconSymbol 
            size={20} 
            name={icon} 
            color={secondaryColor} 
          />
        )}
        
        <ThemedText style={[styles.label, { color: secondaryColor }]}>
          {label}
        </ThemedText>
        
        <ThemedView style={styles.valueContainer}>
          <ThemedText style={[styles.value, { color: textColor }]}>
            {value}
          </ThemedText>
          {showChevron && (
            <IconSymbol 
              size={16} 
              name="chevron.down" 
              color={secondaryColor} 
            />
          )}
        </ThemedView>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    gap: Spacing.sm + 4, // 12px
  },
  label: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.normal,
    flex: 1,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  value: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
  },
});