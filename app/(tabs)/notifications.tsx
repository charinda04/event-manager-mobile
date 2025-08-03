import React, { useMemo } from 'react';
import { ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { 
  AuthGuard, 
  ScreenHeader, 
  Timeline, 
  EmptyState,
  type TimelineSection 
} from '@/components/common';
import { Colors, Spacing } from '@/constants/Colors';

export default function NotificationsScreen() {
  const timelineSections: TimelineSection[] = useMemo(() => {
    const notifications = [
      {
        id: '1',
        type: 'event_reminder',
        title: 'Event starts in 1 hour',
        description: 'Tech Meetup Downtown',
        time: '2 hours ago',
        icon: '🔔',
        iconBg: Colors.light.pink,
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
        iconBg: Colors.light.teal,
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
        iconBg: Colors.light.orange,
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
        iconBg: Colors.light.purple,
        isNew: false,
        section: 'lastWeek'
      }
    ];

    const todayNotifications = notifications.filter(n => n.section === 'today');
    const lastWeekNotifications = notifications.filter(n => n.section === 'lastWeek');
    const newCount = notifications.filter(n => n.isNew).length;

    return [
      {
        title: 'Today',
        items: todayNotifications,
        showNewBadge: true,
        newCount,
      },
      {
        title: 'Last Week',
        items: lastWeekNotifications,
      },
    ];
  }, []);

  return (
    <AuthGuard>
      <ThemedView style={{ flex: 1, backgroundColor: Colors.light.background }}>
        {/* Header */}
        <ScreenHeader
          title="Notifications"
          avatar={{
            fallbackIcon: "person.circle",
          }}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Timeline */}
          <Timeline 
            sections={timelineSections}
            style={{ paddingTop: Spacing.lg }}
          />

          {/* Empty State */}
          <EmptyState
            title="No Notifications"
            description="Notifications about your events and friends will show up here."
            layout="vertical"
            style={{ marginTop: Spacing.xxl }}
          />

          <ThemedView style={{ height: 100 }} />
        </ScrollView>
      </ThemedView>
    </AuthGuard>
  );
}

