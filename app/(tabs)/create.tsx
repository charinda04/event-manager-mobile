import { useState } from 'react';
import { Pressable, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useCreateEvent } from '@/hooks/useEvents';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { AuthGuard } from '@/components/common';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BlurView } from 'expo-blur';


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

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setEventImage(result.assets[0].uri);
    }
  };

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
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <ThemedView style={styles.header}>
              <Pressable onPress={() => router.back()} style={styles.backButton}>
                <IconSymbol size={24} name="arrow.left" color="white" />
              </Pressable>
              <ThemedText style={styles.headerTitle}>Create Event</ThemedText>
              <ThemedView style={styles.placeholder} />
            </ThemedView>

            {/* Image Upload Section */}
            <ThemedView style={styles.imageSection}>
              <Pressable style={styles.imageUpload} onPress={pickImage}>
                {eventImage ? (
                  <Image source={{ uri: eventImage }} style={styles.uploadedImage} />
                ) : (
                  <ThemedView style={styles.imagePlaceholder}>
                    <ThemedView style={styles.brushStrokes}>
                      <ThemedView style={[styles.brushStroke, { backgroundColor: '#ff6b9d', transform: [{ rotate: '15deg' }] }]} />
                      <ThemedView style={[styles.brushStroke, { backgroundColor: '#4ecdc4', transform: [{ rotate: '-10deg' }] }]} />
                      <ThemedView style={[styles.brushStroke, { backgroundColor: '#45b7d1', transform: [{ rotate: '25deg' }] }]} />
                      <ThemedView style={[styles.brushStroke, { backgroundColor: '#96ceb4', transform: [{ rotate: '-20deg' }] }]} />
                    </ThemedView>
                    <ThemedView style={styles.cameraIcon}>
                      <IconSymbol size={20} name="camera.circle" color="white" />
                    </ThemedView>
                  </ThemedView>
                )}
              </Pressable>
            </ThemedView>

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
              <Pressable 
                style={[styles.createButton, createEventMutation.isPending && styles.createButtonDisabled]}
                onPress={handleCreateEvent}
                disabled={createEventMutation.isPending}
              >
                <ThemedText style={styles.createButtonText}>
                  {createEventMutation.isPending ? 'Creating...' : 'Create Event'}
                </ThemedText>
              </Pressable>
            </ThemedView>

            {/* Date and Time */}
            <ThemedView style={styles.section}>
              <Pressable 
                style={styles.dateTimeRow}
                onPress={() => setShowStartDatePicker(true)}
              >
                <IconSymbol size={20} name="clock" color="rgba(255,255,255,0.7)" />
                <ThemedText style={styles.dateTimeLabel}>Start</ThemedText>
                <ThemedText style={styles.dateTimeValue}>
                  {formatDate(startDate)} at {formatTime(startDate)}
                </ThemedText>
              </Pressable>
              
              <Pressable 
                style={styles.dateTimeRow}
                onPress={() => setShowEndTimePicker(true)}
              >
                <IconSymbol size={20} name="clock" color="rgba(255,255,255,0.7)" />
                <ThemedText style={styles.dateTimeLabel}>End</ThemedText>
                <ThemedText style={styles.dateTimeValue}>
                  {formatTime(endDate)}
                </ThemedText>
              </Pressable>
            </ThemedView>

            {/* Location */}
            <ThemedView style={styles.section}>
              <Pressable 
                style={styles.locationRow}
                onPress={() => {
                  Alert.prompt('Location', 'Enter event location', (text) => {
                    if (text !== null) setLocationName(text);
                  }, 'plain-text', locationName);
                }}
              >
                <IconSymbol size={20} name="location" color="rgba(255,255,255,0.7)" />
                <ThemedText style={styles.locationText}>
                  {locationName || 'Choose Location'}
                </ThemedText>
              </Pressable>
            </ThemedView>

            {/* Description */}
            <ThemedView style={styles.section}>
              <Pressable 
                style={styles.descriptionRow}
                onPress={() => {
                  Alert.prompt('Description', 'Enter event description', (text) => {
                    if (text !== null) setDescription(text);
                  }, 'plain-text', description);
                }}
              >
                <IconSymbol size={20} name="text.alignleft" color="rgba(255,255,255,0.7)" />
                <ThemedText style={styles.descriptionText}>
                  {description || 'Add Description'}
                </ThemedText>
              </Pressable>
            </ThemedView>

            {/* Options */}
            <ThemedView style={styles.optionsSection}>
              <ThemedText style={styles.optionsTitle}>Options</ThemedText>
              
              <ThemedView style={styles.optionRow}>
                <IconSymbol size={20} name="eye" color="rgba(255,255,255,0.7)" />
                <ThemedText style={styles.optionLabel}>Visibility</ThemedText>
                <Pressable 
                  style={styles.optionValue}
                  onPress={() => setIsPublic(!isPublic)}
                >
                  <ThemedText style={styles.optionValueText}>
                    {isPublic ? 'Public' : 'Private'}
                  </ThemedText>
                  <IconSymbol size={16} name="chevron.down" color="rgba(255,255,255,0.7)" />
                </Pressable>
              </ThemedView>
              
              <ThemedView style={styles.optionRow}>
                <IconSymbol size={20} name="person.2" color="rgba(255,255,255,0.7)" />
                <ThemedText style={styles.optionLabel}>Capacity</ThemedText>
                <Pressable 
                  style={styles.optionValue}
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
                >
                  <ThemedText style={styles.optionValueText}>
                    {isUnlimited ? 'Unlimited' : maxCapacity}
                  </ThemedText>
                  <IconSymbol size={16} name="chevron.down" color="rgba(255,255,255,0.7)" />
                </Pressable>
              </ThemedView>
            </ThemedView>

            <ThemedView style={styles.bottomPadding} />
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
    backgroundColor: '#6c5ce7',
  },
  blurContainer: {
    flex: 1,
    backgroundColor: 'rgba(108, 92, 231, 0.7)',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  placeholder: {
    width: 40,
  },
  imageSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  imageUpload: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  brushStrokes: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brushStroke: {
    position: 'absolute',
    width: 80,
    height: 12,
    borderRadius: 6,
    opacity: 0.8,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  inputContainer: {
    position: 'relative',
  },
  inputPlaceholder: {
    fontSize: 24,
    fontWeight: '300',
    color: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 16,
  },
  invisibleInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  dateTimeLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    width: 50,
  },
  dateTimeValue: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  locationText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  descriptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  descriptionText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    flex: 1,
  },
  optionsSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  optionsTitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 20,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  optionLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    flex: 1,
  },
  optionValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  optionValueText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  },
  bottomPadding: {
    height: 100,
  },
  createButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 20,
  },
  createButtonDisabled: {
    opacity: 0.6,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});