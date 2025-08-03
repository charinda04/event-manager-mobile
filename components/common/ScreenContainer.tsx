import { ReactNode } from 'react';
import { StyleSheet, ScrollView, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenContainerProps {
  children: ReactNode;
  scrollable?: boolean;
  backgroundColor?: string;
  contentStyle?: ViewStyle;
  showsVerticalScrollIndicator?: boolean;
}

export function ScreenContainer({ 
  children, 
  scrollable = true, 
  backgroundColor = '#F8F8F8',
  contentStyle,
  showsVerticalScrollIndicator = false
}: ScreenContainerProps) {
  const containerStyle = [styles.container, { backgroundColor }];
  
  if (scrollable) {
    return (
      <SafeAreaView style={containerStyle} edges={['top', 'left', 'right']}>
        <ScrollView 
          style={[styles.scrollView, contentStyle]} 
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[containerStyle, contentStyle]} edges={['top', 'left', 'right']}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});