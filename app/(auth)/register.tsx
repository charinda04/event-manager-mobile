import { useState } from 'react';
import { View, Pressable, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/contexts/AuthContext';
import { ScreenContainer, FormInput, PrimaryButton } from '@/components/common';

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      await register({ firstName, lastName, email, password });
      router.replace('/(tabs)');
    } catch {
      Alert.alert('Registration Failed', 'Please try again');
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToLogin = () => {
    router.push('/(auth)/login');
  };

  return (
    <ScreenContainer scrollable={false} backgroundColor="#FFF">
      <ThemedView style={styles.content}>
      <ThemedText type="title" style={styles.title}>Create Account</ThemedText>
      
      <View style={styles.form}>
        <View style={styles.nameRow}>
          <FormInput
            style={styles.nameInput}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            autoComplete="given-name"
          />
          
          <FormInput
            style={styles.nameInput}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            autoComplete="family-name"
          />
        </View>
        
        <FormInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
        
        <FormInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password-new"
        />
        
        <FormInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoComplete="password-new"
        />
        
        <PrimaryButton
          title="Sign Up"
          onPress={handleRegister}
          isLoading={isLoading}
          loadingText="Creating Account..."
        />
        
        <Pressable onPress={navigateToLogin} style={styles.linkContainer}>
          <ThemedText style={styles.linkText}>
            Already have an account? Sign in
          </ThemedText>
        </Pressable>
      </View>
      </ThemedView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 40,
  },
  form: {
    gap: 16,
  },
  nameRow: {
    flexDirection: 'row',
    gap: 12,
  },
  nameInput: {
    flex: 1,
  },
  linkContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  linkText: {
    fontSize: 14,
    opacity: 0.7,
  },
});