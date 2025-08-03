import { useState } from 'react';
import { View, Pressable, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/contexts/AuthContext';
import { ScreenContainer, FormInput, PrimaryButton } from '@/components/common';

export default function LoginScreen() {
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      await login({ email, password });
      router.replace('/(tabs)');
    } catch {
      Alert.alert('Login Failed', 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToRegister = () => {
    router.push('/(auth)/register');
  };

  const fillDummyCredentials = () => {
    setEmail('demo@example.com');
    setPassword('password123');
  };

  return (
    <ScreenContainer scrollable={false} backgroundColor="#FFF">
      <ThemedView style={styles.content}>
      <ThemedText type="title" style={styles.title}>Welcome Back</ThemedText>
      
      <View style={styles.demoSection}>
        <ThemedText style={styles.demoText}>Demo Credentials (pre-filled):</ThemedText>
        <ThemedText style={styles.demoCredentials}>Email: demo@example.com</ThemedText>
        <ThemedText style={styles.demoCredentials}>Password: password123</ThemedText>
        <Pressable onPress={fillDummyCredentials} style={styles.demoButton}>
          <ThemedText style={styles.demoButtonText}>Use Demo Credentials</ThemedText>
        </Pressable>
      </View>
      
      <View style={styles.form}>
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
          autoComplete="password"
        />
        
        <PrimaryButton
          title="Sign In"
          onPress={handleLogin}
          isLoading={isLoading}
          loadingText="Signing In..."
        />
        
        <Pressable onPress={navigateToRegister} style={styles.linkContainer}>
          <ThemedText style={styles.linkText}>
            Don&apos;t have an account? Sign up
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
    marginBottom: 20,
  },
  demoSection: {
    backgroundColor: '#f0f8ff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  demoText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  demoCredentials: {
    fontSize: 12,
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 4,
  },
  demoButton: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  demoButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  form: {
    gap: 16,
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