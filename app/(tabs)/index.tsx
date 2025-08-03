import { FlatList, StyleSheet, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEvents } from '@/hooks/useEvents';
import { Event } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function EventsScreen() {
  const { isAuthenticated } = useAuth();
  const { data, isLoading, refetch, fetchNextPage, hasNextPage } = useEvents();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/(auth)/login');
    }
  }, [isAuthenticated]);

  const renderEvent = ({ item }: { item: Event }) => (
    <ThemedView style={styles.eventCard}>
      <ThemedText type="subtitle">{item.title}</ThemedText>
      <ThemedText style={styles.eventDescription}>{item.description}</ThemedText>
      <ThemedText style={styles.eventDate}>
        {new Date(item.startDate).toLocaleDateString()}
      </ThemedText>
      <ThemedText style={styles.eventLocation}>{item.location.name}</ThemedText>
    </ThemedView>
  );

  if (!isAuthenticated) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>Upcoming Events</ThemedText>
        
        <FlatList
          data={data?.events || []}
          renderItem={renderEvent}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }
          onEndReached={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.1}
          ListEmptyComponent={
            <ThemedView style={styles.emptyContainer}>
              <ThemedText>No events found</ThemedText>
            </ThemedView>
          }
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 20,
  },
  eventCard: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  eventDescription: {
    marginTop: 4,
    opacity: 0.7,
  },
  eventDate: {
    marginTop: 8,
    fontSize: 12,
    opacity: 0.6,
  },
  eventLocation: {
    marginTop: 4,
    fontSize: 12,
    opacity: 0.6,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
});
