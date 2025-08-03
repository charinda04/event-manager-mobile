import { ScrollView, StyleSheet, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function HomeScreen() {
  const { isAuthenticated, user } = useAuth();
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/(auth)/login');
    }
  }, [isAuthenticated]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
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
          <ThemedView style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Your Events</ThemedText>
            <Pressable onPress={() => router.push('/(tabs)/my-events')}>
              <ThemedText style={styles.viewAllText}>View All ›</ThemedText>
            </Pressable>
          </ThemedView>

          <ThemedView style={styles.emptyState}>
            <ThemedView style={styles.emptyIcon}>
              <IconSymbol 
                size={28} 
                name="calendar" 
                color="#C7C7CC" 
              />
            </ThemedView>
            <ThemedView style={styles.emptyContent}>
              <ThemedText style={styles.emptyTitle}>No Upcoming Events</ThemedText>
              <ThemedText style={styles.emptyDescription}>
                Events you are hosting or going to will show up here.
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        {/* Your Calendars Section */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Your Calendars</ThemedText>

          <ThemedView style={styles.emptyState}>
            <ThemedView style={styles.emptyIcon}>
              <IconSymbol 
                size={28} 
                name="calendar.badge.plus" 
                color="#C7C7CC" 
              />
            </ThemedView>
            <ThemedView style={styles.emptyContent}>
              <ThemedText style={styles.emptyTitle}>No Calendars</ThemedText>
              <ThemedText style={styles.emptyDescription}>
                When you subscribe to calendars, you'll see them here.
              </ThemedText>
            </ThemedView>
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
  emptyState: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
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
