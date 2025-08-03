import React from 'react';
import { Pressable, StyleSheet, Image, ViewStyle } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors, Spacing, BorderRadius } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

interface ImageUploadProps {
  imageUri?: string | null;
  onPress: () => void;
  height?: number;
  style?: ViewStyle;
  placeholder?: {
    icon?: string;
    text?: string;
    decorative?: boolean;
  };
}

export function ImageUpload({
  imageUri,
  onPress,
  height = 200,
  style,
  placeholder = { decorative: true },
}: ImageUploadProps) {
  const bgColor = useThemeColor({ 
    light: Colors.light.backgroundSecondary, 
    dark: Colors.dark.backgroundSecondary 
  }, 'background');

  return (
    <ThemedView style={[styles.container, style]}>
      <Pressable 
        style={[styles.uploadArea, { height }]}
        onPress={onPress}
      >
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <ThemedView style={[
            styles.placeholder,
            { backgroundColor: `${bgColor}F0` } // Add transparency
          ]}>
            {placeholder.decorative && (
              <ThemedView style={styles.decorativeElements}>
                <ThemedView style={[styles.brushStroke, { backgroundColor: Colors.light.pink }]} />
                <ThemedView style={[styles.brushStroke, { backgroundColor: Colors.light.teal }]} />
                <ThemedView style={[styles.brushStroke, { backgroundColor: Colors.light.blue }]} />
                <ThemedView style={[styles.brushStroke, { backgroundColor: Colors.light.green }]} />
              </ThemedView>
            )}
            
            <ThemedView style={styles.cameraIcon}>
              <IconSymbol 
                size={20} 
                name={placeholder.icon || "camera.circle"} 
                color="white" 
              />
            </ThemedView>
            
            {placeholder.text && (
              <ThemedView style={styles.textContainer}>
                <ThemedText style={styles.placeholderText}>
                  {placeholder.text}
                </ThemedText>
              </ThemedView>
            )}
          </ThemedView>
        )}
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl + 10, // 30px
  },
  uploadArea: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  decorativeElements: {
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
    transform: [
      { rotate: '15deg' }
    ],
  },
  cameraIcon: {
    position: 'absolute',
    bottom: Spacing.md,
    right: Spacing.md,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    bottom: Spacing.lg,
    left: Spacing.lg,
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.textSecondary,
  },
});