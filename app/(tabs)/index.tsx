import { StyleSheet, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useMyEvents, useAttendingEvents, useEvents } from '@/hooks/useEvents';
import { ScreenContainer, SectionHeader, EmptyState, AuthGuard } from '@/components/common';

export default function HomeScreen() {
  const { user } = useAuth();
  const colorScheme = useColorScheme();
  const { data: myEventsData } = useMyEvents();
  const { data: attendingEventsData } = useAttendingEvents();
  const { data: nearbyEventsData } = useEvents();

  if (!user) {
    return null;
  }

  // Combine events from different sources for "Your Events"
  const allUserEvents = [
    ...(myEventsData?.events || []).map(event => ({...event, status: 'Hosting' as const})),
    ...(attendingEventsData?.events || []).slice(0, 2).map(event => ({...event, status: 'Going' as const})),
  ].slice(0, 3); // Show max 3 events

  const getEventImage = (eventId: string) => {
    // Simple hash function to consistently assign colors/images
    const hash = eventId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const colors = ['#4CAF50', '#FF9800', '#2196F3', '#9C27B0', '#F44336'];
    const patterns = ['PUBLIQUE', 'KARAOKE', 'CLAY DATE!'];
    
    return {
      backgroundColor: colors[Math.abs(hash) % colors.length],
      pattern: patterns[Math.abs(hash) % patterns.length]
    };
  };

  const renderEventCard = (event: any) => {
    const eventImage = getEventImage(event.id);
    const isInvited = event.status === 'Going' && Math.random() > 0.5;
    const statusBadge = isInvited ? 'Invited' : event.status;
    
    return (
      <ThemedView key={event.id} style={styles.eventCard}>
        <ThemedView style={[styles.eventImage, { backgroundColor: eventImage.backgroundColor }]}>
          <ThemedText style={styles.eventPattern}>{eventImage.pattern}</ThemedText>
          <ThemedView style={[styles.statusBadge, { 
            backgroundColor: statusBadge === 'Going' ? '#4CAF50' : 
                           statusBadge === 'Invited' ? '#9C27B0' : '#FF9800' 
          }]}>
            <ThemedText style={styles.statusText}>{statusBadge}</ThemedText>
          </ThemedView>
        </ThemedView>
        
        <ThemedView style={styles.eventInfo}>
          <ThemedView style={styles.eventHeader}>
            <IconSymbol size={12} name="globe" color="#4CAF50" />
            <ThemedText style={styles.eventOrganizer}>
              {event.organizer.firstName} {event.organizer.lastName}
            </ThemedText>
          </ThemedView>
          
          <ThemedText style={styles.eventTitle}>{event.title}</ThemedText>
          
          <ThemedView style={styles.eventDateTime}>
            <IconSymbol size={12} name="clock" color="#8E8E93" />
            <ThemedText style={styles.eventTime}>
              {new Date(event.startDate).toLocaleDateString() === new Date().toLocaleDateString() 
                ? 'Today' 
                : new Date(event.startDate).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    month: 'short', 
                    day: 'numeric' 
                  })
              }, {new Date(event.startDate).toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
              })}
            </ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.eventLocation}>
            <IconSymbol size={12} name="location" color="#8E8E93" />
            <ThemedText style={styles.eventLocationText}>{event.location.name}</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    );
  };

  const getNearbyEventImage = (eventId: string) => {
    // Different images for nearby events to match the design
    const nearbyImages = [
      { backgroundColor: '#FF6B35', type: 'image', name: 'paint' },
      { backgroundColor: '#6B46C1', type: 'image', name: 'skull' },
      { backgroundColor: '#0891B2', type: 'image', name: 'nature' },
      { backgroundColor: '#DC2626', type: 'text', text: 'FLORALS OIL PAINTING' },
      { backgroundColor: '#F59E0B', type: 'image', name: 'fashion' },
    ];
    
    const hash = eventId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    return nearbyImages[Math.abs(hash) % nearbyImages.length];
  };

  const renderNearbyEventCard = (event: any, index: number) => {
    const eventImage = getNearbyEventImage(event.id);
    const prices = ['US$20', 'US$25', 'US$33', 'US$60', 'US$15', 'US$40', 'US$50', 'US$35'];
    const price = prices[index % prices.length];
    
    // Custom titles for nearby events to match the design
    const nearbyTitles = [
      'Sip + Paint Fridays',
      'DOLLHOUSE OF HORROR FILM FESTIVAL', 
      'reiki + sound bath',
      'Oil Painting Class - Florals',
      'Punch Needle Fashion: LA Book Launch Party',
      'Pottery Workshop: Beginner Friendly',
      'Jazz Night at Blue Note',
      'Underground Art Show'
    ];
    
    const displayTitle = nearbyTitles[index] || event.title;
    
    return (
      <ThemedView key={event.id} style={styles.nearbyEventCard}>
        <ThemedView style={[styles.nearbyEventImage, { backgroundColor: eventImage.backgroundColor }]}>
          {eventImage.type === 'text' ? (
            <ThemedText style={styles.nearbyEventText}>{eventImage.text}</ThemedText>
          ) : (
            <ThemedView style={styles.nearbyImagePlaceholder} />
          )}
        </ThemedView>
        
        <ThemedView style={styles.nearbyEventInfo}>
          <ThemedView style={styles.nearbyEventHeader}>
            <ThemedView style={styles.nearbyOrganizerIcon}>
              <ThemedText style={styles.nearbyOrganizerInitial}>
                {event.organizer.firstName.charAt(0)}
              </ThemedText>
            </ThemedView>
            <ThemedText style={styles.nearbyOrganizer}>
              {event.organizer.firstName} {event.organizer.lastName}
            </ThemedText>
            <ThemedView style={styles.nearbyPrice}>
              <IconSymbol size={10} name="checkmark" color="#4CAF50" />
              <ThemedText style={styles.nearbyPriceText}>Suggested: {price}</ThemedText>
            </ThemedView>
          </ThemedView>
          
          <ThemedText style={styles.nearbyEventTitle}>{displayTitle}</ThemedText>
          
          <ThemedView style={styles.nearbyEventDateTime}>
            <IconSymbol size={12} name="clock" color="#8E8E93" />
            <ThemedText style={styles.nearbyEventTime}>
              {new Date(event.startDate).toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
              })}
            </ThemedText>
            <IconSymbol size={12} name="location" color="#8E8E93" />
            <ThemedText style={styles.nearbyEventLocation}>
              {event.location.city || event.location.name}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    );
  };

  return (
    <AuthGuard>
      <ScreenContainer>
        {/* Header with profile and settings */}
        <ThemedView style={styles.header}>
          <ThemedView style={styles.profileSection}>
            <ThemedView style={styles.avatar}>
              <ThemedText style={styles.avatarText}>
                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
              </ThemedText>
            </ThemedView>
            <ThemedText style={styles.appName}>luma</ThemedText>
          </ThemedView>
          
          <Pressable style={styles.settingsButton}>
            <IconSymbol 
              size={24} 
              name="gearshape" 
              color={Colors[colorScheme ?? 'light'].text} 
            />
          </Pressable>
        </ThemedView>

        {/* Your Events Section */}
        <ThemedView style={styles.section}>
          <SectionHeader 
            title="Your Events" 
            showViewAll 
            onViewAllPress={() => router.push('/explore')}
          />

          {allUserEvents.length > 0 ? (
            <ThemedView style={styles.eventsContainer}>
              {allUserEvents.map((event) => renderEventCard(event))}
            </ThemedView>
          ) : (
            <EmptyState
              icon="calendar"
              title="No Upcoming Events"
              description="Events you are hosting or going to will show up here."
            />
          )}
        </ThemedView>

        {/* Your Calendars Section */}
        <ThemedView style={styles.section}>
          <SectionHeader 
            title="Your Calendars" 
            showViewAll 
          />

          <ThemedView style={styles.calendarsContainer}>
            <ThemedView style={[styles.calendarItem, { backgroundColor: '#FFF' }]}>
              <ThemedText style={styles.calendarText}>Drawing{'\n'}Room</ThemedText>
            </ThemedView>
            <ThemedView style={[styles.calendarItem, { backgroundColor: '#4CAF50' }]}>
              <ThemedView style={styles.calendarImagePlaceholder} />
            </ThemedView>
            <ThemedView style={[styles.calendarItem, { backgroundColor: '#E8F4FD' }]}>
              <ThemedView style={styles.calendarImagePlaceholder} />
            </ThemedView>
            <ThemedView style={[styles.calendarItem, { backgroundColor: '#FFF' }]}>
              <ThemedText style={[styles.calendarText, { color: '#F44336' }]}>third{'\n'}place{'\n'}BAR</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        {/* Nearby Events Section */}
        <ThemedView style={styles.section}>
          <ThemedView style={styles.nearbyHeader}>
            <ThemedText style={styles.nearbyTitle}>Nearby Events</ThemedText>
            <IconSymbol size={16} name="chevron.down" color="#8E8E93" />
          </ThemedView>
          <ThemedText style={styles.nearbySubtitle}>From Your Subscriptions</ThemedText>
          
          <ThemedView style={styles.nearbyDays}>
            <ThemedText style={styles.dayActive}>Tomorrow</ThemedText>
            <ThemedText style={styles.dayInactive}>Friday</ThemedText>
          </ThemedView>

          {nearbyEventsData?.events && nearbyEventsData.events.length > 0 && (
            <ThemedView style={styles.nearbyEventsContainer}>
              {nearbyEventsData.events.slice(0, 8).map((event, index) => 
                renderNearbyEventCard(event, index)
              )}
            </ThemedView>
          )}
        </ThemedView>
      </ScreenContainer>
    </AuthGuard>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 24,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  appName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
  },
  settingsButton: {
    padding: 8,
  },
  section: {
    marginBottom: 36,
    paddingHorizontal: 16,
  },
  eventsContainer: {
    gap: 16,
  },
  eventCard: {
    flexDirection: 'row',
    gap: 12,
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  eventPattern: {
    color: 'white',
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statusBadge: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  eventInfo: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  eventOrganizer: {
    fontSize: 12,
    color: '#8E8E93',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginTop: 2,
  },
  eventDateTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  eventTime: {
    fontSize: 12,
    color: '#8E8E93',
  },
  eventLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  eventLocationText: {
    fontSize: 12,
    color: '#8E8E93',
  },
  calendarsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  calendarItem: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  calendarText: {
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
    color: '#000',
    lineHeight: 12,
  },
  calendarImagePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  nearbyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  nearbyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  nearbySubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
    marginBottom: 16,
  },
  nearbyDays: {
    flexDirection: 'row',
    gap: 16,
  },
  dayActive: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  dayInactive: {
    fontSize: 16,
    color: '#8E8E93',
  },
  nearbyEventsContainer: {
    marginTop: 20,
    gap: 16,
  },
  nearbyEventCard: {
    flexDirection: 'row',
    gap: 12,
  },
  nearbyEventImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  nearbyEventText: {
    color: 'white',
    fontSize: 8,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    lineHeight: 10,
  },
  nearbyImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  nearbyEventInfo: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  nearbyEventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  nearbyOrganizerIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nearbyOrganizerInitial: {
    color: 'white',
    fontSize: 8,
    fontWeight: '600',
  },
  nearbyOrganizer: {
    fontSize: 12,
    color: '#8E8E93',
    flex: 1,
  },
  nearbyPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  nearbyPriceText: {
    fontSize: 11,
    color: '#4CAF50',
    fontWeight: '500',
  },
  nearbyEventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginTop: 4,
  },
  nearbyEventDateTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  nearbyEventTime: {
    fontSize: 12,
    color: '#8E8E93',
    marginRight: 8,
  },
  nearbyEventLocation: {
    fontSize: 12,
    color: '#8E8E93',
  },
});
