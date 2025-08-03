import { StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { useSearchEvents, useEvents } from '@/hooks/useEvents';
import { AuthGuard, EventCard, SectionHeader } from '@/components/common';
import { IconSymbol } from '@/components/ui/IconSymbol';

const mockEvents = [
  {
    id: '1',
    title: 'Alo Moves x Pause | Sound Bath with Avery Whitmore',
    description: 'Alo Moves x 1 Hotel Comm...',
    startDate: new Date('2024-11-16T11:00:00'),
    endDate: new Date('2024-11-16T12:30:00'),
    organizer: { firstName: 'Alo', lastName: 'Moves' },
    location: { name: 'Los Angeles', city: 'Los Angeles' },
    capacity: 50,
    attendees: []
  },
  {
    id: '2',
    title: 'Venture Social Club | Hollywood Hills',
    description: 'STARTUPSTARTER®',
    startDate: new Date('2024-11-16T18:00:00'),
    endDate: new Date('2024-11-16T20:00:00'),
    organizer: { firstName: 'StartUp', lastName: 'Starter' },
    location: { name: 'Hollywood Hills', city: 'Los Angeles' },
    capacity: 100,
    attendees: []
  },
  {
    id: '3',
    title: 'LA Fintech Connect Happy Hour - Sponsored by TaskUs',
    description: 'LA Fintech Connect',
    startDate: new Date('2024-07-17T17:30:00'),
    endDate: new Date('2024-07-17T19:30:00'),
    organizer: { firstName: 'LA', lastName: 'Fintech' },
    location: { name: 'Downtown LA', city: 'Los Angeles' },
    capacity: 75,
    attendees: []
  }
];

const categories = [
  { name: 'Climate', icon: '🌱', color: '#4CAF50' },
  { name: 'Fitness', icon: '🏃', color: '#FF5722' },
  { name: 'Wellness', icon: '🧘', color: '#9C27B0' }
];

const cities = [
  { name: 'Los Angeles', image: '#2196F3' },
  { name: 'San Francisco', image: '#FF9800' }
];

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: searchResults } = useSearchEvents(searchQuery);
  const { data: events } = useEvents();

  const displayEvents = events?.events || mockEvents;

  return (
    <AuthGuard>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <ThemedView style={styles.header}>
          <ThemedView style={styles.headerLeft}>
            <ThemedView style={styles.avatar}>
              <Image 
                source={{ uri: 'https://via.placeholder.com/40x40/333/fff?text=U' }}
                style={styles.avatarImage}
              />
            </ThemedView>
            <ThemedView>
              <ThemedText style={styles.discoverText}>Discover</ThemedText>
            </ThemedView>
          </ThemedView>
          <Pressable style={styles.mapButton}>
            <IconSymbol size={24} name="map" color="#000" />
          </Pressable>
        </ThemedView>

        {/* Location */}
        <ThemedView style={styles.locationSection}>
          <ThemedText style={styles.locationTitle}>Los Angeles</ThemedText>
        </ThemedView>

        {/* Popular Events */}
        <ThemedView style={styles.section}>
          <SectionHeader 
            title="Popular Events" 
            showViewAll={true}
            viewAllText="View All ›"
          />
          
          <ThemedView style={styles.eventsContainer}>
            {displayEvents.slice(0, 3).map((event, index) => (
              <ThemedView key={event.id} style={styles.eventWrapper}>
                <ThemedView style={styles.eventImageContainer}>
                  <ThemedView style={[
                    styles.eventImage,
                    { backgroundColor: index === 0 ? '#87CEEB' : index === 1 ? '#333' : '#FF6B35' }
                  ]}>
                    {index === 0 && (
                      <ThemedView style={styles.eventImageContent}>
                        <ThemedText style={styles.eventImageText}>alo</ThemedText>
                      </ThemedView>
                    )}
                    {index === 1 && (
                      <ThemedView style={styles.eventImageContent}>
                        <ThemedText style={styles.eventImageLabel}>S</ThemedText>
                      </ThemedView>
                    )}
                    {index === 2 && (
                      <ThemedView style={styles.eventImageContent}>
                        <ThemedView style={styles.fintechLogo} />
                      </ThemedView>
                    )}
                  </ThemedView>
                  
                  {/* Waitlist button for first event */}
                  {index === 0 && (
                    <Pressable style={styles.waitlistButton}>
                      <IconSymbol size={12} name="clock" color="#007AFF" />
                      <ThemedText style={styles.waitlistText}>Waitlist</ThemedText>
                    </Pressable>
                  )}
                </ThemedView>
                
                <ThemedView style={styles.eventDetails}>
                  <ThemedView style={styles.eventHeader}>
                    <ThemedText style={styles.eventOrganizer}>
                      {index === 0 ? 'alo' : index === 1 ? 'S' : ''} {event.title.split(' ')[0]}
                    </ThemedText>
                  </ThemedView>
                  
                  <ThemedText style={styles.eventTitle} numberOfLines={2}>
                    {event.title}
                  </ThemedText>
                  
                  <ThemedView style={styles.eventMeta}>
                    <IconSymbol size={12} name="clock" color="#8E8E93" />
                    <ThemedText style={styles.eventTime}>
                      {event.startDate.toLocaleDateString('en-US', { weekday: 'long' })}, {event.startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                    </ThemedText>
                  </ThemedView>
                </ThemedView>
              </ThemedView>
            ))}
          </ThemedView>
        </ThemedView>

        {/* Categories */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Categories</ThemedText>
          
          <ThemedView style={styles.categoriesContainer}>
            {categories.map((category) => (
              <Pressable key={category.name} style={styles.categoryCard}>
                <ThemedView style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                  <ThemedText style={styles.categoryEmoji}>{category.icon}</ThemedText>
                </ThemedView>
                <ThemedText style={styles.categoryName}>{category.name}</ThemedText>
              </Pressable>
            ))}
          </ThemedView>
        </ThemedView>

        {/* Cities */}
        <ThemedView style={styles.section}>
          <SectionHeader 
            title="Cities" 
            showViewAll={true}
            viewAllText="View All ›"
          />
          
          <ThemedView style={styles.citiesContainer}>
            {cities.map((city) => (
              <Pressable key={city.name} style={styles.cityCard}>
                <ThemedView style={[styles.cityImage, { backgroundColor: city.image }]} />
              </Pressable>
            ))}
          </ThemedView>
        </ThemedView>
        
        <ThemedView style={styles.bottomPadding} />
      </ScrollView>
    </AuthGuard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#F8F9FA',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  discoverText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
  },
  mapButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  locationTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  eventsContainer: {
    gap: 16,
  },
  eventWrapper: {
    flexDirection: 'row',
    gap: 12,
  },
  eventImageContainer: {
    position: 'relative',
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventImageContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventImageText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  eventImageLabel: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
  },
  fintechLogo: {
    width: 40,
    height: 24,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 4,
  },
  waitlistButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  waitlistText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  eventDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  eventHeader: {
    marginBottom: 4,
  },
  eventOrganizer: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    lineHeight: 20,
    marginBottom: 8,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  eventTime: {
    fontSize: 12,
    color: '#8E8E93',
  },
  categoriesContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  categoryCard: {
    alignItems: 'center',
    gap: 8,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryEmoji: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  citiesContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  cityCard: {
    flex: 1,
  },
  cityImage: {
    height: 120,
    borderRadius: 12,
  },
  bottomPadding: {
    height: 100,
  },
});
