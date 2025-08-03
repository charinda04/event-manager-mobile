import { StyleSheet, Pressable, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/contexts/AuthContext';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function ProfileScreen() {
  const { user, logout, isAuthenticated } = useAuth();
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/(auth)/login');
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/(auth)/login');
          }
        }
      ]
    );
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Profile</ThemedText>
      
      <ThemedView style={styles.userInfo}>
        <ThemedView style={styles.avatar}>
          <ThemedText style={styles.avatarText}>
            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
          </ThemedText>
        </ThemedView>
        
        <ThemedText type="subtitle" style={styles.userName}>
          {user.firstName} {user.lastName}
        </ThemedText>
        
        <ThemedText style={styles.userEmail}>{user.email}</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.menu}>
        <Pressable style={styles.menuItem}>
          <ThemedText>Edit Profile</ThemedText>
        </Pressable>
        
        <Pressable style={styles.menuItem}>
          <ThemedText>Notifications</ThemedText>
        </Pressable>
        
        <Pressable style={styles.menuItem}>
          <ThemedText>Privacy Settings</ThemedText>
        </Pressable>
        
        <Pressable style={styles.menuItem}>
          <ThemedText>Help & Support</ThemedText>
        </Pressable>
      </ThemedView>
      
      <Pressable
        style={[styles.logoutButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
        onPress={handleLogout}
      >
        <ThemedText style={styles.logoutText}>Logout</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 30,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userName: {
    marginBottom: 8,
  },
  userEmail: {
    opacity: 0.6,
  },
  menu: {
    flex: 1,
    gap: 16,
  },
  menuItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  logoutButton: {
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});