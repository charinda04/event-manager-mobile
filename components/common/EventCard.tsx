import { StyleSheet, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Event } from '@/types';

interface EventCardProps {
  event: Event;
  showStatus?: boolean;
  status?: 'Hosting' | 'Going' | 'Invited';
  onPress?: () => void;
  variant?: 'default' | 'nearby';
}

export function EventCard({ 
  event, 
  showStatus = false, 
  status, 
  onPress,
  variant = 'default' 
}: EventCardProps) {
  const getEventImage = (eventId: string) => {
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

  const getNearbyEventImage = (eventId: string) => {
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

  const eventImage = variant === 'nearby' ? getNearbyEventImage(event.id) : getEventImage(event.id);
  const isInvited = status === 'Going' && Math.random() > 0.5;
  const statusBadge = isInvited ? 'Invited' : status;

  const formatDateTime = (date: Date | string) => {
    const eventDate = new Date(date);
    if (new Date(eventDate).toLocaleDateString() === new Date().toLocaleDateString()) {
      return 'Today';
    }
    return eventDate.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (date: Date | string) => {
    return new Date(date).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  if (variant === 'nearby') {
    const prices = ['US$20', 'US$25', 'US$33', 'US$60', 'US$15', 'US$40', 'US$50', 'US$35'];
    const price = prices[Math.abs(parseInt(event.id)) % prices.length];
    
    return (
      <Pressable style={styles.nearbyEventCard} onPress={onPress}>
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
          
          <ThemedText style={styles.nearbyEventTitle}>{event.title}</ThemedText>
          
          <ThemedView style={styles.nearbyEventDateTime}>
            <IconSymbol size={12} name="clock" color="#8E8E93" />
            <ThemedText style={styles.nearbyEventTime}>
              {formatTime(event.startDate)}
            </ThemedText>
            <IconSymbol size={12} name="location" color="#8E8E93" />
            <ThemedText style={styles.nearbyEventLocation}>
              {event.location.city || event.location.name}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </Pressable>
    );
  }

  return (
    <Pressable style={styles.eventCard} onPress={onPress}>
      <ThemedView style={[styles.eventImage, { backgroundColor: eventImage.backgroundColor }]}>
        <ThemedText style={styles.eventPattern}>{eventImage.pattern}</ThemedText>
        {showStatus && statusBadge && (
          <ThemedView style={[styles.statusBadge, { 
            backgroundColor: statusBadge === 'Going' ? '#4CAF50' : 
                           statusBadge === 'Invited' ? '#9C27B0' : '#FF9800' 
          }]}>
            <ThemedText style={styles.statusText}>{statusBadge}</ThemedText>
          </ThemedView>
        )}
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
            {formatDateTime(event.startDate)}, {formatTime(event.startDate)}
          </ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.eventLocation}>
          <IconSymbol size={12} name="location" color="#8E8E93" />
          <ThemedText style={styles.eventLocationText}>{event.location.name}</ThemedText>
        </ThemedView>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
  // Nearby event styles
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