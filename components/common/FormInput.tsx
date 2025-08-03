import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface FormInputProps extends TextInputProps {
  variant?: 'default' | 'textarea';
}

export function FormInput({ variant = 'default', style, ...props }: FormInputProps) {
  const colorScheme = useColorScheme();
  
  const inputStyle = [
    styles.input,
    variant === 'textarea' && styles.textArea,
    { color: Colors[colorScheme ?? 'light'].text },
    style
  ];

  const placeholderTextColor = props.placeholderTextColor || 
    Colors[colorScheme ?? 'light'].tabIconDefault;

  return (
    <TextInput
      style={inputStyle}
      placeholderTextColor={placeholderTextColor}
      {...props}
      {...(variant === 'textarea' && {
        multiline: true,
        numberOfLines: 4,
        textAlignVertical: 'top'
      })}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
  },
  textArea: {
    height: 100,
  },
});