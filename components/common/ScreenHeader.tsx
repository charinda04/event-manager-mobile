import React from 'react';
import { Pressable, StyleSheet, ViewStyle, TextStyle, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors, Spacing, FontSize, FontWeight, Shadow } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

interface ScreenHeaderProps {
  title: string;
  leftAction?: {
    icon?: string;
    onPress: () => void;
    accessibilityLabel?: string;
  };
  rightAction?: {
    icon?: string;
    text?: string;
    onPress: () => void;
    accessibilityLabel?: string;
  };
  subtitle?: string;
  avatar?: {
    source?: { uri: string };
    fallbackIcon?: string;
    size?: number;
  };
  backgroundColor?: string;
  style?: ViewStyle;
  titleStyle?: TextStyle;
}

export function ScreenHeader({
  title,
  leftAction,
  rightAction,
  subtitle,
  avatar,
  backgroundColor,
  style,
  titleStyle,
}: ScreenHeaderProps) {
  const bgColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');
  const textColor = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');
  const iconColor = useThemeColor({ light: Colors.light.icon, dark: Colors.dark.icon }, 'text');
  const borderColor = useThemeColor({ light: Colors.light.border, dark: Colors.dark.border }, 'text');

  return (
    <ThemedView style={[
      styles.container,
      { backgroundColor: backgroundColor || bgColor },
      style
    ]}>
      <ThemedView style={styles.content}>
        {/* Left side with avatar/action and title */}
        <ThemedView style={styles.leftSection}>
          {avatar && (
            <ThemedView style={[
              styles.avatar, 
              { 
                width: avatar.size || 40, 
                height: avatar.size || 40,
                backgroundColor: borderColor,
              }
            ]}>
              {avatar.source ? (
                <Image source={avatar.source} style={styles.avatarImage} />
              ) : (
                <IconSymbol 
                  size={20} 
                  name={avatar.fallbackIcon || "person.circle"} 
                  color={iconColor} 
                />
              )}
            </ThemedView>
          )}
          
          {leftAction && (
            <Pressable 
              style={styles.actionButton}
              onPress={leftAction.onPress}
              accessibilityLabel={leftAction.accessibilityLabel}
            >
              <IconSymbol size={24} name={leftAction.icon || "arrow.left"} color={textColor} />
            </Pressable>
          )}
          
          <ThemedView style={styles.titleContainer}>
            <ThemedText style={[
              styles.title,
              { color: textColor },
              titleStyle
            ]}>
              {title}
            </ThemedText>
            {subtitle && (
              <ThemedText style={[styles.subtitle, { color: iconColor }]}>
                {subtitle}
              </ThemedText>
            )}
          </ThemedView>
        </ThemedView>

        {/* Right action */}
        {rightAction && (
          <Pressable 
            style={[styles.rightAction, rightAction.icon && !rightAction.text && styles.rightActionCircle]}
            onPress={rightAction.onPress}
            accessibilityLabel={rightAction.accessibilityLabel}
          >
            {rightAction.icon && (
              <IconSymbol size={20} name={rightAction.icon} color={textColor} />
            )}
            {rightAction.text && (
              <ThemedText style={[styles.actionText, { color: textColor }]}>
                {rightAction.text}
              </ThemedText>
            )}
          </Pressable>
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: Spacing.sm + 4, // 12px
  },
  avatar: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.bold,
  },
  subtitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.normal,
    marginTop: 2,
  },
  rightAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    minWidth: 32,
    justifyContent: 'center',
  },
  rightActionCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.backgroundSecondary,
    ...Shadow.md,
  },
  actionText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
  },
});