import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function FavoritesScreen() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/(auth)/login');
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <ThemedView style={styles.header}>
          <ThemedText style={styles.title}>Favorites</ThemedText>
        </ThemedView>

        {/* Empty State */}
        <ThemedView style={styles.emptyState}>
          <ThemedView style={styles.emptyIcon}>
            <IconSymbol 
              size={32} 
              name="heart" 
              color="#C7C7CC" 
            />
          </ThemedView>
          <ThemedView style={styles.emptyContent}>
            <ThemedText style={styles.emptyTitle}>No Favorite Events</ThemedText>
            <ThemedText style={styles.emptyDescription}>
              Events you like will appear here. Tap the heart icon on any event to add it to your favorites.
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
  },
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