import { useState } from 'react';
import { Pressable, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useCreateEvent } from '@/hooks/useEvents';
import { ScreenContainer, FormInput, PrimaryButton, AuthGuard } from '@/components/common';

export default function CreateEventScreen() {
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
    } catch {
      Alert.alert('Error', 'Failed to create event');
    }
  };

  return (
    <AuthGuard>
      <ScreenContainer>
        <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>Create Event</ThemedText>
        
        <ThemedView style={styles.form}>
          <FormInput
            placeholder="Event Title *"
            value={title}
            onChangeText={setTitle}
          />
          
          <FormInput
            variant="textarea"
            placeholder="Description *"
            value={description}
            onChangeText={setDescription}
          />
          
          <FormInput
            placeholder="Location Name *"
            value={locationName}
            onChangeText={setLocationName}
          />
          
          <FormInput
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
          />
          
          <ThemedView style={styles.row}>
            <FormInput
              style={styles.halfInput}
              placeholder="City"
              value={city}
              onChangeText={setCity}
            />
            <FormInput
              style={styles.halfInput}
              placeholder="State"
              value={state}
              onChangeText={setState}
            />
          </ThemedView>
          
          <ThemedView style={styles.row}>
            <FormInput
              style={styles.halfInput}
              placeholder="Start Date (YYYY-MM-DD) *"
              value={startDate}
              onChangeText={setStartDate}
            />
            <FormInput
              style={styles.halfInput}
              placeholder="Start Time (HH:MM) *"
              value={startTime}
              onChangeText={setStartTime}
            />
          </ThemedView>
          
          <ThemedView style={styles.row}>
            <FormInput
              style={styles.halfInput}
              placeholder="End Date (YYYY-MM-DD)"
              value={endDate}
              onChangeText={setEndDate}
            />
            <FormInput
              style={styles.halfInput}
              placeholder="End Time (HH:MM)"
              value={endTime}
              onChangeText={setEndTime}
            />
          </ThemedView>
          
          <FormInput
            placeholder="Max Capacity (optional)"
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
          
          <PrimaryButton
            title="Create Event"
            onPress={handleCreateEvent}
            isLoading={createEventMutation.isPending}
            loadingText="Creating..."
          />
          </ThemedView>
        </ThemedView>
      </ScreenContainer>
    </AuthGuard>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  title: {
    marginBottom: 20,
  },
  form: {
    gap: 16,
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
});