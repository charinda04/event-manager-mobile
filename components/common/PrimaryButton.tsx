import { Pressable, StyleSheet, PressableProps, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface PrimaryButtonProps extends PressableProps {
  title: string;
  isLoading?: boolean;
  loadingText?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export function PrimaryButton({ 
  title, 
  isLoading = false, 
  loadingText, 
  variant = 'primary',
  style,
  disabled,
  ...props 
}: PrimaryButtonProps) {
  const colorScheme = useColorScheme();
  
  const getButtonStyle = () => {
    const baseStyle = [styles.button];
    
    if (variant === 'primary') {
      baseStyle.push({ backgroundColor: Colors[colorScheme ?? 'light'].tint });
    } else if (variant === 'secondary') {
      baseStyle.push({ backgroundColor: '#F0F0F0' });
    } else if (variant === 'outline') {
      baseStyle.push({ 
        backgroundColor: 'transparent', 
        borderWidth: 1, 
        borderColor: Colors[colorScheme ?? 'light'].tint 
      });
    }
    
    if (disabled || isLoading) {
      baseStyle.push({ opacity: 0.6 });
    }
    
    return baseStyle;
  };
  
  const getTextStyle = () => {
    if (variant === 'primary') {
      return { color: 'white' };
    } else if (variant === 'secondary') {
      return { color: Colors[colorScheme ?? 'light'].text };
    } else {
      return { color: Colors[colorScheme ?? 'light'].tint };
    }
  };

  return (
    <Pressable
      style={[getButtonStyle(), style]}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <ActivityIndicator size="small" color={getTextStyle().color} style={styles.loader} />}
      <ThemedText style={[styles.buttonText, getTextStyle()]}>
        {isLoading ? (loadingText || title) : title}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  loader: {
    marginRight: 8,
  },
});