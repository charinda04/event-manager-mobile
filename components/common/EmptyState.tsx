import React from 'react';
import { StyleSheet, Pressable, ViewStyle } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors, Spacing, FontSize, FontWeight, BorderRadius } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

interface EmptyStateProps {
  icon?: string;
  emoji?: string;
  title: string;
  description: string;
  iconColor?: string;
  action?: {
    label: string;
    onPress: () => void;
  };
  layout?: 'horizontal' | 'vertical';
  style?: ViewStyle;
}

export function EmptyState({ 
  icon,
  emoji,
  title, 
  description, 
  iconColor,
  action,
  layout = 'vertical',
  style,
}: EmptyStateProps) {
  const textColor = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');
  const textSecondary = useThemeColor({ light: Colors.light.textSecondary, dark: Colors.dark.textSecondary }, 'text');
  const iconBg = useThemeColor({ light: Colors.light.gray[100], dark: Colors.dark.gray[200] }, 'background');
  const defaultIconColor = useThemeColor({ light: Colors.light.gray[400], dark: Colors.dark.gray[400] }, 'text');

  const isHorizontal = layout === 'horizontal';

  return (
    <ThemedView style={[
      isHorizontal ? styles.horizontalContainer : styles.verticalContainer,
      style
    ]} testID="empty-state">
      {/* Icon/Emoji */}
      <ThemedView style={[
        styles.iconContainer,
        { backgroundColor: iconBg }
      ]}>
        {emoji ? (
          <ThemedText style={styles.emoji}>{emoji}</ThemedText>
        ) : icon ? (
          <IconSymbol 
            size={28} 
            name={icon} 
            color={iconColor || defaultIconColor}
          />
        ) : null}
      </ThemedView>
      
      {/* Content */}
      <ThemedView style={[
        styles.content,
        isHorizontal && styles.horizontalContent
      ]}>
        <ThemedText style={[
          styles.title,
          { color: textColor },
          isHorizontal && styles.horizontalTitle
        ]}>
          {title}
        </ThemedText>
        <ThemedText style={[
          styles.description,
          { color: textSecondary },
          isHorizontal && styles.horizontalDescription
        ]}>
          {description}
        </ThemedText>
        
        {/* Action Button */}
        {action && (
          <Pressable 
            style={[
              styles.actionButton,
              { backgroundColor: textColor }
            ]}
            onPress={action.onPress}
          >
            <ThemedText style={[
              styles.actionText,
              { color: Colors.light.backgroundSecondary }
            ]}>
              {action.label}
            </ThemedText>
          </Pressable>
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  verticalContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.xxxl + 20, // 60px
    paddingHorizontal: Spacing.xxxl,
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm + 6, // 14px
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.xxxl,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 24,
  },
  content: {
    alignItems: 'center',
  },
  horizontalContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingTop: 2,
  },
  title: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.semibold,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  horizontalTitle: {
    fontSize: FontSize.lg - 1, // 17px
    textAlign: 'left',
    marginBottom: Spacing.xs + 2, // 6px
  },
  description: {
    fontSize: FontSize.sm,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  horizontalDescription: {
    textAlign: 'left',
    marginBottom: 0,
    lineHeight: 20,
  },
  actionButton: {
    borderRadius: BorderRadius.xxl,
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.sm + 4, // 12px
  },
  actionText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
  },
});