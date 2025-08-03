import React, { useState, useCallback } from 'react';
import { Pressable, StyleSheet, Alert, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useCreateEvent } from '@/hooks/useEvents';
import { 
  AuthGuard, 
  ScreenHeader,
  ImageUpload,
  FormField,
  OptionRow,
  PrimaryButton
} from '@/components/common';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BlurView } from 'expo-blur';
import { Colors, Spacing, FontSize, FontWeight } from '@/constants/Colors';


export default function CreateEventScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [locationName, setLocationName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(Date.now() + 60 * 60 * 1000));
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [isUnlimited, setIsUnlimited] = useState(true);
  const [maxCapacity, setMaxCapacity] = useState('');
  const [eventImage, setEventImage] = useState<string | null>(null);
  
  const createEventMutation = useCreateEvent();

  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setEventImage(result.assets[0].uri);
    }
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleCreateEvent = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter an event name');
      return;
    }

    try {
      await createEventMutation.mutateAsync({
        title: title.trim(),
        description: description.trim(),
        startDate,
        endDate,
        location: {
          name: locationName.trim() || 'To be determined',
          address: '',
          city: '',
          state: '',
          country: 'US',
        },
        maxCapacity: isUnlimited ? undefined : parseInt(maxCapacity) || undefined,
        isPublic,
        categoryId: '1',
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
      <ThemedView style={styles.container}>
        <BlurView intensity={20} style={styles.blurContainer}>
          {/* Header */}
          <ScreenHeader
            title="Create Event"
            leftAction={{
              icon: "arrow.left",
              onPress: () => router.back(),
              accessibilityLabel: "Go back"
            }}
            backgroundColor="transparent"
            titleStyle={{ color: 'white' }}
          />

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Image Upload */}
            <ImageUpload
              imageUri={eventImage}
              onPress={pickImage}
              style={{ paddingHorizontal: Spacing.lg }}
            />

            {/* Event Name */}
            <ThemedView style={styles.section}>
              <ThemedView style={styles.inputContainer}>
                <ThemedText style={styles.inputPlaceholder}>
                  {title || 'Event Name'}
                </ThemedText>
                <Pressable 
                  style={styles.invisibleInput}
                  onPress={() => {
                    Alert.prompt('Event Name', 'Enter event name', (text) => {
                      if (text) setTitle(text);
                    }, 'plain-text', title);
                  }}
                />
              </ThemedView>
            </ThemedView>

            {/* Create Button */}
            <ThemedView style={styles.section}>
              <PrimaryButton
                title={createEventMutation.isPending ? 'Creating...' : 'Create Event'}
                onPress={handleCreateEvent}
                disabled={createEventMutation.isPending}
                loading={createEventMutation.isPending}
                style={styles.createButton}
              />
            </ThemedView>

            {/* Date and Time */}
            <FormField
              icon="clock"
              label="Start"
              value={`${formatDate(startDate)} at ${formatTime(startDate)}`}
              placeholder="Select start date and time"
              onPress={() => setShowStartDatePicker(true)}
            />
            
            <FormField
              icon="clock"
              label="End"
              value={formatTime(endDate)}
              placeholder="Select end time"
              onPress={() => setShowEndTimePicker(true)}
            />

            {/* Location */}
            <FormField
              icon="location"
              value={locationName}
              placeholder="Choose Location"
              onChangeText={setLocationName}
            />

            {/* Description */}
            <FormField
              icon="text.alignleft"
              value={description}
              placeholder="Add Description"
              onChangeText={setDescription}
              multiline
            />

            {/* Options */}
            <ThemedView style={styles.optionsSection}>
              <ThemedText style={styles.optionsTitle}>Options</ThemedText>
              
              <OptionRow
                icon="eye"
                label="Visibility"
                value={isPublic ? 'Public' : 'Private'}
                onPress={() => setIsPublic(!isPublic)}
              />
              
              <OptionRow
                icon="person.2"
                label="Capacity"
                value={isUnlimited ? 'Unlimited' : maxCapacity}
                onPress={() => {
                  if (isUnlimited) {
                    Alert.prompt('Capacity', 'Enter max capacity', (text) => {
                      if (text && !isNaN(parseInt(text))) {
                        setMaxCapacity(text);
                        setIsUnlimited(false);
                      }
                    }, 'numeric');
                  } else {
                    setIsUnlimited(true);
                    setMaxCapacity('');
                  }
                }}
              />
            </ThemedView>

            <ThemedView style={{ height: 100 }} />
          </ScrollView>
        </BlurView>

        {/* Date/Time Pickers */}
        {showStartDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="datetime"
            display="default"
            onChange={(event, selectedDate) => {
              setShowStartDatePicker(false);
              if (selectedDate) {
                setStartDate(selectedDate);
                // Auto-set end date to 1 hour later
                setEndDate(new Date(selectedDate.getTime() + 60 * 60 * 1000));
              }
            }}
          />
        )}
        
        {showEndTimePicker && (
          <DateTimePicker
            value={endDate}
            mode="time"
            display="default"
            onChange={(event, selectedDate) => {
              setShowEndTimePicker(false);
              if (selectedDate) {
                const newEndDate = new Date(startDate);
                newEndDate.setHours(selectedDate.getHours());
                newEndDate.setMinutes(selectedDate.getMinutes());
                setEndDate(newEndDate);
              }
            }}
          />
        )}
      </ThemedView>
    </AuthGuard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.purple,
  },
  blurContainer: {
    flex: 1,
    backgroundColor: 'rgba(108, 92, 231, 0.7)',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  inputContainer: {
    position: 'relative',
  },
  inputPlaceholder: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.light,
    color: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: Spacing.md,
  },
  invisibleInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  optionsSection: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
  },
  optionsTitle: {
    fontSize: FontSize.lg,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: Spacing.lg,
    fontWeight: FontWeight.medium,
  },
  createButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginTop: Spacing.lg,
  },
});