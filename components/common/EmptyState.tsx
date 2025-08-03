import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  iconColor?: string;
}

export function EmptyState({ 
  icon, 
  title, 
  description, 
  iconColor = '#C7C7CC' 
}: EmptyStateProps) {
  return (
    <ThemedView style={styles.emptyState}>
      <ThemedView style={styles.emptyIcon}>
        <IconSymbol 
          size={28} 
          name={icon} 
          color={iconColor} 
        />
      </ThemedView>
      <ThemedView style={styles.emptyContent}>
        <ThemedText style={styles.emptyTitle}>{title}</ThemedText>
        <ThemedText style={styles.emptyDescription}>
          {description}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  emptyState: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    paddingHorizontal: 16,
    marginTop: 40,
  },
  emptyIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  emptyContent: {
    flex: 1,
    paddingTop: 2,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    marginBottom: 6,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
  },
});