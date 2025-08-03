import { StyleSheet, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface SectionHeaderProps {
  title: string;
  showViewAll?: boolean;
  viewAllText?: string;
  onViewAllPress?: () => void;
}

export function SectionHeader({ 
  title, 
  showViewAll = false, 
  viewAllText = "View All ›", 
  onViewAllPress 
}: SectionHeaderProps) {
  return (
    <ThemedView style={styles.sectionHeader}>
      <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
      {showViewAll && (
        <Pressable onPress={onViewAllPress}>
          <ThemedText style={styles.viewAllText}>{viewAllText}</ThemedText>
        </Pressable>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  viewAllText: {
    fontSize: 15,
    color: '#999',
    fontWeight: '400',
  },
});