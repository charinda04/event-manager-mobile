import { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/contexts/AuthContext';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function LoginScreen() {
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const colorScheme = useColorScheme();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      await login({ email, password });
      router.replace('/(tabs)');
    } catch (error) {
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
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
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
        <TextInput
          style={[styles.input, { color: Colors[colorScheme ?? 'light'].text }]}
          placeholder="Email"
          placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
        
        <TextInput
          style={[styles.input, { color: Colors[colorScheme ?? 'light'].text }]}
          placeholder="Password"
          placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password"
        />
        
        <Pressable
          style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <ThemedText style={styles.buttonText}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </ThemedText>
        </Pressable>
        
        <Pressable onPress={navigateToRegister} style={styles.linkContainer}>
          <ThemedText style={styles.linkText}>
            Don't have an account? Sign up
          </ThemedText>
        </Pressable>
      </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
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
  linkContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  linkText: {
    fontSize: 14,
    opacity: 0.7,
  },
});