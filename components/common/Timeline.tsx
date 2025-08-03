import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors, Spacing, FontSize, FontWeight, BorderRadius } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  time: string;
  icon: string;
  iconBg: string;
  isNew?: boolean;
  type?: string;
}

export interface TimelineSection {
  title: string;
  items: TimelineItem[];
  showNewBadge?: boolean;
  newCount?: number;
}

interface TimelineProps {
  sections: TimelineSection[];
  style?: ViewStyle;
  itemSpacing?: number;
  showConnectors?: boolean;
}

export function Timeline({
  sections,
  style,
  itemSpacing = 16,
  showConnectors = true,
}: TimelineProps) {
  const textColor = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');
  const separatorColor = useThemeColor({ light: Colors.light.separator, dark: Colors.dark.separator }, 'text');

  return (
    <ThemedView style={[styles.container, style]}>
      {sections.map((section, sectionIndex) => (
        <ThemedView key={sectionIndex} style={styles.section}>
          {/* Section Header */}
          <ThemedView style={styles.sectionHeader}>
            <ThemedText style={[styles.sectionTitle, { color: textColor }]}>
              {section.title}
            </ThemedText>
            {section.showNewBadge && section.newCount && section.newCount > 0 && (
              <ThemedView style={styles.newBadge}>
                <ThemedText style={styles.newBadgeText}>
                  {section.newCount} New
                </ThemedText>
              </ThemedView>
            )}
          </ThemedView>
          
          {/* Timeline Items */}
          <ThemedView style={styles.itemsList}>
            {section.items.map((item, itemIndex) => (
              <TimelineItemComponent
                key={item.id}
                item={item}
                showConnector={showConnectors && itemIndex < section.items.length - 1}
                spacing={itemSpacing}
                separatorColor={separatorColor}
              />
            ))}
          </ThemedView>
        </ThemedView>
      ))}
    </ThemedView>
  );
}

interface TimelineItemComponentProps {
  item: TimelineItem;
  showConnector: boolean;
  spacing: number;
  separatorColor: string;
}

function TimelineItemComponent({
  item,
  showConnector,
  spacing,
  separatorColor,
}: TimelineItemComponentProps) {
  const textColor = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');
  const textSecondary = useThemeColor({ light: Colors.light.textSecondary, dark: Colors.dark.textSecondary }, 'text');

  return (
    <ThemedView style={[styles.timelineItem, { marginBottom: spacing }]}>
      {/* Icon */}
      <ThemedView 
        style={[styles.iconContainer, { backgroundColor: item.iconBg }]}
      >
        <ThemedText style={styles.iconEmoji}>{item.icon}</ThemedText>
      </ThemedView>
      
      {/* Connector Line */}
      {showConnector && (
        <ThemedView 
          style={[
            styles.connector, 
            { 
              backgroundColor: separatorColor,
              height: spacing + 16 // Extend into the spacing
            }
          ]} 
        />
      )}
      
      {/* Content */}
      <ThemedView style={styles.content}>
        <ThemedText style={[styles.itemTitle, { color: textColor }]}>
          {item.title}
        </ThemedText>
        {item.description && (
          <ThemedText style={[styles.itemDescription, { color: textSecondary }]}>
            {item.description}
          </ThemedText>
        )}
        <ThemedText style={[styles.itemTime, { color: textSecondary }]}>
          {item.time}
        </ThemedText>
      </ThemedView>
      
      {/* New Indicator */}
      {item.isNew && (
        <ThemedView style={styles.newIndicator} />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.xxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
  },
  newBadge: {
    backgroundColor: Colors.light.error,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  newBadgeText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: 'white',
  },
  itemsList: {
    position: 'relative',
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    position: 'relative',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    marginRight: Spacing.sm + 4, // 12px
  },
  iconEmoji: {
    fontSize: 16,
  },
  connector: {
    position: 'absolute',
    left: 19, // Center of the 40px icon
    top: 40, // Start below the icon
    width: 2,
    zIndex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 2,
  },
  itemTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    marginBottom: Spacing.xs,
  },
  itemDescription: {
    fontSize: FontSize.sm,
    lineHeight: 18,
    marginBottom: Spacing.xs,
  },
  itemTime: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
  },
  newIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.light.error,
    position: 'absolute',
    top: 6,
    right: 0,
  },
});