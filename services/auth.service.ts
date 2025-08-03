import { apiClient } from '@/lib/api';
import { User } from '@/types';
import * as SecureStore from 'expo-secure-store';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'user_data';

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    
    if (response.success) {
      await this.storeAuthData(response.data);
      apiClient.setAuthToken(response.data.token);
    }
    
    return response.data;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    
    if (response.success) {
      await this.storeAuthData(response.data);
      apiClient.setAuthToken(response.data.token);
    }
    
    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      await this.clearAuthData();
      apiClient.clearAuthToken();
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await apiClient.get<User>('/auth/me');
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Failed to get current user:', error);
      return null;
    }
  }

  async refreshToken(): Promise<string | null> {
    try {
      const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
      if (!refreshToken) return null;

      const response = await apiClient.post<{ token: string }>('/auth/refresh', {
        refreshToken,
      });

      if (response.success) {
        await SecureStore.setItemAsync(TOKEN_KEY, response.data.token);
        apiClient.setAuthToken(response.data.token);
        return response.data.token;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      await this.clearAuthData();
    }
    
    return null;
  }

  async getStoredToken(): Promise<string | null> {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  }

  async getStoredUser(): Promise<User | null> {
    try {
      const userData = await SecureStore.getItemAsync(USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Failed to get stored user:', error);
      return null;
    }
  }

  private async storeAuthData(authData: AuthResponse): Promise<void> {
    await Promise.all([
      SecureStore.setItemAsync(TOKEN_KEY, authData.token),
      SecureStore.setItemAsync(REFRESH_TOKEN_KEY, authData.refreshToken),
      SecureStore.setItemAsync(USER_KEY, JSON.stringify(authData.user)),
    ]);
  }

  private async clearAuthData(): Promise<void> {
    await Promise.all([
      SecureStore.deleteItemAsync(TOKEN_KEY),
      SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY),
      SecureStore.deleteItemAsync(USER_KEY),
    ]);
  }
}

export const authService = new AuthService();