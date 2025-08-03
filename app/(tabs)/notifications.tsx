import { StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { AuthGuard } from '@/components/common';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function NotificationsScreen() {
  const notifications = [
    {
      id: '1',
      type: 'event_reminder',
      title: 'Event starts in 1 hour',
      description: 'Tech Meetup Downtown',
      time: '2 hours ago',
      icon: '🔔',
      iconBg: '#ff6b9d',
      isNew: true,
      section: 'today'
    },
    {
      id: '2',
      type: 'friend_joined',
      title: 'Sarah joined your event',
      description: 'Coffee & Code Session',
      time: '4 hours ago',
      icon: '👤',
      iconBg: '#4ecdc4',
      isNew: true,
      section: 'today'
    },
    {
      id: '3',
      type: 'event_update',
      title: 'Event location changed',
      description: 'Design Workshop',
      time: '3 days ago',
      icon: '📍',
      iconBg: '#ff9f43',
      isNew: false,
      section: 'lastWeek'
    },
    {
      id: '4',
      type: 'new_follower',
      title: 'Alex started following you',
      description: '',
      time: '5 days ago',
      icon: '👥',
      iconBg: '#6c5ce7',
      isNew: false,
      section: 'lastWeek'
    }
  ];

  const todayNotifications = notifications.filter(n => n.section === 'today');
  const lastWeekNotifications = notifications.filter(n => n.section === 'lastWeek');
  const newCount = notifications.filter(n => n.isNew).length;

  return (
    <AuthGuard>
      <ThemedView style={styles.container}>
        {/* Header */}
        <ThemedView style={styles.header}>
          <ThemedView style={styles.headerLeft}>
            <ThemedView style={styles.avatar}>
              <IconSymbol size={20} name="person.circle" color="#8E8E93" />
            </ThemedView>
            <ThemedText style={styles.headerTitle}>Notifications</ThemedText>
          </ThemedView>
        </ThemedView>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Timeline Section */}
          <ThemedView style={styles.timelineContainer}>
            {/* Today Section */}
            <ThemedView style={styles.timelineSection}>
              <ThemedView style={styles.sectionHeader}>
                <ThemedText style={styles.sectionTitle}>Today</ThemedText>
                {newCount > 0 && (
                  <ThemedView style={styles.newBadge}>
                    <ThemedText style={styles.newBadgeText}>{newCount} New</ThemedText>
                  </ThemedView>
                )}
              </ThemedView>
              
              <ThemedView style={styles.notificationsList}>
                {todayNotifications.map((notification, index) => (
                  <ThemedView key={notification.id} style={styles.notificationItem}>
                    <ThemedView style={[styles.notificationIcon, { backgroundColor: notification.iconBg }]}>
                      <ThemedText style={styles.notificationEmoji}>{notification.icon}</ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.notificationLine} />
                  </ThemedView>
                ))}
              </ThemedView>
            </ThemedView>

            {/* Last Week Section */}
            <ThemedView style={styles.timelineSection}>
              <ThemedView style={styles.sectionHeader}>
                <ThemedText style={styles.sectionTitle}>Last Week</ThemedText>
              </ThemedView>
              
              <ThemedView style={styles.notificationsList}>
                {lastWeekNotifications.map((notification, index) => (
                  <ThemedView key={notification.id} style={styles.notificationItem}>
                    <ThemedView style={[styles.notificationIcon, { backgroundColor: notification.iconBg }]}>
                      <ThemedText style={styles.notificationEmoji}>{notification.icon}</ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.notificationLine} />
                  </ThemedView>
                ))}
              </ThemedView>
            </ThemedView>
          </ThemedView>

          {/* Empty State */}
          <ThemedView style={styles.emptyState}>
            <ThemedText style={styles.emptyTitle}>No Notifications</ThemedText>
            <ThemedText style={styles.emptyDescription}>
              Notifications about your events and{"\n"}friends will show up here.
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.bottomPadding} />
        </ScrollView>
      </ThemedView>
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
    backgroundColor: '#E5E5E7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
  },
  scrollView: {
    flex: 1,
  },
  timelineContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  timelineSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  newBadge: {
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  newBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  notificationsList: {
    position: 'relative',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  notificationEmoji: {
    fontSize: 16,
  },
  notificationLine: {
    position: 'absolute',
    left: 19,
    top: 40,
    width: 2,
    height: 32,
    backgroundColor: '#E5E5E7',
    zIndex: 1,
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 22,
  },
  bottomPadding: {
    height: 100,
  },
});

