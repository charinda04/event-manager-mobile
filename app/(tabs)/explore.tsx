import { StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { useSearchEvents } from '@/hooks/useEvents';

export default function ExploreScreen() {
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const { data: searchResults } = useSearchEvents(searchQuery);

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
          <ThemedText style={styles.title}>Explore Events</ThemedText>
        </ThemedView>

        {/* Search Bar */}
        <ThemedView style={styles.searchSection}>
          <ThemedView style={styles.searchContainer}>
            <IconSymbol 
              size={20} 
              name="magnifyingglass" 
              color="#8E8E93" 
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search events..."
              placeholderTextColor="#8E8E93"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </ThemedView>
        </ThemedView>

        {/* Featured Categories */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Categories</ThemedText>
          
          <ThemedView style={styles.categoriesGrid}>
            {['Technology', 'Music', 'Sports', 'Food & Drink'].map((category) => (
              <Pressable key={category} style={styles.categoryCard}>
                <ThemedText style={styles.categoryText}>{category}</ThemedText>
              </Pressable>
            ))}
          </ThemedView>
        </ThemedView>

        {/* Search Results or Popular Events */}
        {searchQuery ? (
          <ThemedView style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Search Results</ThemedText>
            {searchResults?.events?.length ? (
              searchResults.events.map((event) => (
                <ThemedView key={event.id} style={styles.eventCard}>
                  <ThemedText style={styles.eventTitle}>{event.title}</ThemedText>
                  <ThemedText style={styles.eventDescription}>{event.description}</ThemedText>
                  <ThemedText style={styles.eventDate}>
                    {new Date(event.startDate).toLocaleDateString()}
                  </ThemedText>
                </ThemedView>
              ))
            ) : (
              <ThemedText style={styles.emptyText}>No events found</ThemedText>
            )}
          </ThemedView>
        ) : (
          <ThemedView style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Popular Events</ThemedText>
            <ThemedText style={styles.emptyText}>Discover trending events in your area</ThemedText>
          </ThemedView>
        )}
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
  searchSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },
  eventCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 12,
    color: '#8E8E93',
  },
  emptyText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 20,
  },
});
