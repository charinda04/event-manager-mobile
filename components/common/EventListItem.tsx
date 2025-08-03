import React, { memo } from 'react';
import { StyleSheet, Pressable, ViewStyle, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors, Spacing, FontSize, FontWeight, BorderRadius } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Event } from '@/types';

interface EventListItemProps {
  event: Event;
  onPress?: () => void;
  style?: ViewStyle;
  showWaitlist?: boolean;
  imageProps?: {
    backgroundColor?: string;
    content?: string;
    type?: 'text' | 'emoji' | 'image';
  };
  variant?: 'compact' | 'detailed';
}

export const EventListItem = memo(function EventListItem({
  event,
  onPress,
  style,
  showWaitlist = false,
  imageProps,
  variant = 'compact',
}: EventListItemProps) {
  const textColor = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');
  const textSecondary = useThemeColor({ light: Colors.light.textSecondary, dark: Colors.dark.textSecondary }, 'text');

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getEventInitials = (title: string) => {
    return title
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <Pressable 
      style={[styles.container, style]}
      onPress={onPress}
      accessible
      accessibilityRole="button"
      accessibilityLabel={`Event: ${event.title}`}
    >
      <ThemedView style={styles.content}>
        {/* Event Image/Icon */}
        <ThemedView style={styles.imageContainer}>
          <ThemedView style={[
            styles.eventImage,
            { backgroundColor: imageProps?.backgroundColor || Colors.light.accent }
          ]}>
            {imageProps?.type === 'image' && imageProps.content ? (
              <Image source={{ uri: imageProps.content }} style={styles.image} />
            ) : imageProps?.type === 'emoji' ? (
              <ThemedText style={styles.emoji}>{imageProps.content}</ThemedText>
            ) : (
              <ThemedText style={styles.initials}>
                {imageProps?.content || getEventInitials(event.title)}
              </ThemedText>
            )}
          </ThemedView>
          
          {/* Waitlist Button */}
          {showWaitlist && (
            <Pressable style={styles.waitlistButton}>
              <IconSymbol size={12} name="clock" color={Colors.light.info} />
              <ThemedText style={styles.waitlistText}>Waitlist</ThemedText>
            </Pressable>
          )}
        </ThemedView>

        {/* Event Details */}
        <ThemedView style={styles.details}>
          {/* Organizer */}
          <ThemedView style={styles.organizerRow}>
            <ThemedText style={[styles.organizer, { color: textSecondary }]}>
              {event.organizer.firstName} {event.organizer.lastName}
            </ThemedText>
          </ThemedView>
          
          {/* Title */}
          <ThemedText 
            style={[styles.title, { color: textColor }]}
            numberOfLines={2}
          >
            {event.title}
          </ThemedText>
          
          {/* Time and Location */}
          <ThemedView style={styles.metaRow}>
            <IconSymbol size={12} name="clock" color={textSecondary} />
            <ThemedText style={[styles.metaText, { color: textSecondary }]}>
              {formatDate(event.startDate)}, {formatTime(event.startDate)}
            </ThemedText>
          </ThemedView>
          
          {variant === 'detailed' && (
            <ThemedView style={styles.metaRow}>
              <IconSymbol size={12} name="location" color={textSecondary} />
              <ThemedText 
                style={[styles.metaText, { color: textSecondary }]}
                numberOfLines={1}
              >
                {event.location.name}
              </ThemedText>
            </ThemedView>
          )}
        </ThemedView>
      </ThemedView>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  content: {
    flexDirection: 'row',
    gap: Spacing.sm + 4, // 12px
  },
  imageContainer: {
    position: 'relative',
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  emoji: {
    fontSize: 24,
  },
  initials: {
    color: 'white',
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
  },
  waitlistButton: {
    position: 'absolute',
    top: -Spacing.sm,
    right: -Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.light.backgroundSecondary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.lg,
    ...Colors.light.shadow?.md,
  },
  waitlistText: {
    fontSize: FontSize.xs,
    color: Colors.light.info,
    fontWeight: FontWeight.medium,
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
  },
  organizerRow: {
    marginBottom: Spacing.xs,
  },
  organizer: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
  },
  title: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  metaText: {
    fontSize: FontSize.xs,
    flex: 1,
  },
});