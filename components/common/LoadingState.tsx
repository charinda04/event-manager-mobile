import React from 'react';
import { ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors, Spacing, FontSize, FontWeight } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

interface LoadingStateProps {
  message?: string;
  size?: 'small' | 'large';
  color?: string;
  style?: ViewStyle;
  inline?: boolean;
}

export function LoadingState({
  message = 'Loading...',
  size = 'large',
  color,
  style,
  inline = false,
}: LoadingStateProps) {
  const textColor = useThemeColor({ light: Colors.light.textSecondary, dark: Colors.dark.textSecondary }, 'text');
  const themeIndicatorColor = useThemeColor({ light: Colors.light.tint, dark: Colors.dark.tint }, 'tint');
  const indicatorColor = color || themeIndicatorColor;

  if (inline) {
    return (
      <ThemedView style={[styles.inlineContainer, style]}>
        <ActivityIndicator size={size} color={indicatorColor} />
        {message && (
          <ThemedText style={[styles.inlineText, { color: textColor }]}>
            {message}
          </ThemedText>
        )}
      </ThemedView>
    );
  }

  return (
    <ThemedView style={[styles.container, style]} testID="loading-state">
      <ActivityIndicator size={size} color={indicatorColor} />
      {message && (
        <ThemedText style={[styles.message, { color: textColor }]}>
          {message}
        </ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxxl,
    paddingHorizontal: Spacing.lg,
  },
  message: {
    marginTop: Spacing.sm + 4, // 12px
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    textAlign: 'center',
  },
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  inlineText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
});