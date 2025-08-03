import React from 'react';
import { Pressable, StyleSheet, ViewStyle, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors, Spacing, FontSize, FontWeight } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

interface FormFieldProps {
  icon?: string;
  label?: string;
  value: string;
  placeholder: string;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
  style?: ViewStyle;
  multiline?: boolean;
  editable?: boolean;
  inputType?: 'text' | 'prompt';
}

export function FormField({
  icon,
  label,
  value,
  placeholder,
  onPress,
  onChangeText,
  style,
  multiline = false,
  editable = true,
  inputType = 'prompt',
}: FormFieldProps) {
  const textColor = useThemeColor({ 
    light: Colors.light.text, 
    dark: Colors.dark.text 
  }, 'text');
  
  const placeholderColor = useThemeColor({ 
    light: Colors.light.textSecondary, 
    dark: Colors.dark.textSecondary 
  }, 'text');

  const handlePress = () => {
    if (!editable) return;

    if (onPress) {
      onPress();
    } else if (inputType === 'prompt' && onChangeText) {
      Alert.prompt(
        label || placeholder,
        `Enter ${(label || placeholder).toLowerCase()}`,
        (text) => {
          if (text !== null) onChangeText(text);
        },
        'plain-text',
        value
      );
    }
  };

  return (
    <ThemedView style={[styles.container, style]}>
      <Pressable 
        style={styles.field}
        onPress={handlePress}
        disabled={!editable}
      >
        {icon && (
          <IconSymbol 
            size={20} 
            name={icon} 
            color={placeholderColor} 
          />
        )}
        
        <ThemedView style={styles.content}>
          {label && (
            <ThemedText style={[styles.label, { color: placeholderColor }]}>
              {label}
            </ThemedText>
          )}
          
          <ThemedText style={[
            styles.value,
            { color: value ? textColor : placeholderColor },
            !value && styles.placeholder
          ]}>
            {value || placeholder}
          </ThemedText>
        </ThemedView>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  field: {
    flexDirection: 'row',
    alignItems: multiline ? 'flex-start' : 'center',
    paddingVertical: Spacing.md,
    gap: Spacing.sm + 4, // 12px
  },
  content: {
    flex: 1,
  },
  label: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
    width: 50,
  },
  value: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
    flex: 1,
  },
  placeholder: {
    fontWeight: FontWeight.normal,
  },
});