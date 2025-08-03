import { useState } from 'react';
import { ScrollView, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useCreateEvent } from '@/hooks/useEvents';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

export default function CreateEventScreen() {
  const { isAuthenticated } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [locationName, setLocationName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  
  const createEventMutation = useCreateEvent();
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/(auth)/login');
    }
  }, [isAuthenticated]);

  const handleCreateEvent = async () => {
    if (!title || !description || !locationName || !startDate || !startTime) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      const startDateTime = new Date(`${startDate}T${startTime}`);
      const endDateTime = endDate && endTime 
        ? new Date(`${endDate}T${endTime}`)
        : new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000); // Default 2 hours

      await createEventMutation.mutateAsync({
        title,
        description,
        startDate: startDateTime,
        endDate: endDateTime,
        location: {
          name: locationName,
          address,
          city,
          state,
          country: 'US', // Default for now
        },
        maxCapacity: maxCapacity ? parseInt(maxCapacity) : undefined,
        isPublic,
        categoryId: '1', // Default category for now
      });

      Alert.alert('Success', 'Event created successfully!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to create event');
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>Create Event</ThemedText>
        
        <ThemedView style={styles.form}>
          <TextInput
            style={[styles.input, { color: Colors[colorScheme ?? 'light'].text }]}
            placeholder="Event Title *"
            placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
            value={title}
            onChangeText={setTitle}
          />
          
          <TextInput
            style={[styles.input, styles.textArea, { color: Colors[colorScheme ?? 'light'].text }]}
            placeholder="Description *"
            placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
          
          <TextInput
            style={[styles.input, { color: Colors[colorScheme ?? 'light'].text }]}
            placeholder="Location Name *"
            placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
            value={locationName}
            onChangeText={setLocationName}
          />
          
          <TextInput
            style={[styles.input, { color: Colors[colorScheme ?? 'light'].text }]}
            placeholder="Address"
            placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
            value={address}
            onChangeText={setAddress}
          />
          
          <ThemedView style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput, { color: Colors[colorScheme ?? 'light'].text }]}
              placeholder="City"
              placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
              value={city}
              onChangeText={setCity}
            />
            <TextInput
              style={[styles.input, styles.halfInput, { color: Colors[colorScheme ?? 'light'].text }]}
              placeholder="State"
              placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
              value={state}
              onChangeText={setState}
            />
          </ThemedView>
          
          <ThemedView style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput, { color: Colors[colorScheme ?? 'light'].text }]}
              placeholder="Start Date (YYYY-MM-DD) *"
              placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
              value={startDate}
              onChangeText={setStartDate}
            />
            <TextInput
              style={[styles.input, styles.halfInput, { color: Colors[colorScheme ?? 'light'].text }]}
              placeholder="Start Time (HH:MM) *"
              placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
              value={startTime}
              onChangeText={setStartTime}
            />
          </ThemedView>
          
          <ThemedView style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput, { color: Colors[colorScheme ?? 'light'].text }]}
              placeholder="End Date (YYYY-MM-DD)"
              placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
              value={endDate}
              onChangeText={setEndDate}
            />
            <TextInput
              style={[styles.input, styles.halfInput, { color: Colors[colorScheme ?? 'light'].text }]}
              placeholder="End Time (HH:MM)"
              placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
              value={endTime}
              onChangeText={setEndTime}
            />
          </ThemedView>
          
          <TextInput
            style={[styles.input, { color: Colors[colorScheme ?? 'light'].text }]}
            placeholder="Max Capacity (optional)"
            placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
            value={maxCapacity}
            onChangeText={setMaxCapacity}
            keyboardType="numeric"
          />
          
          <Pressable
            style={styles.toggleButton}
            onPress={() => setIsPublic(!isPublic)}
          >
            <ThemedText>Public Event: {isPublic ? 'Yes' : 'No'}</ThemedText>
          </Pressable>
          
          <Pressable
            style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
            onPress={handleCreateEvent}
            disabled={createEventMutation.isPending}
          >
            <ThemedText style={styles.buttonText}>
              {createEventMutation.isPending ? 'Creating...' : 'Create Event'}
            </ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    marginBottom: 20,
  },
  form: {
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  toggleButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  button: {
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});