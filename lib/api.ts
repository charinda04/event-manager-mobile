import { ApiResponse, PaginatedResponse, ApiException, ApiError } from '@/types';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

interface RetryConfig {
  maxRetries: number;
  retryDelay: number;
  retryOn: number[];
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;
  private defaultRetryConfig: RetryConfig = {
    maxRetries: 3,
    retryDelay: 1000,
    retryOn: [408, 429, 500, 502, 503, 504]
  };

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  setAuthToken(token: string) {
    this.token = token;
  }

  clearAuthToken() {
    this.token = null;
  }

  /**
   * Sleep for the specified number of milliseconds
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Check if an error should trigger a retry
   */
  private shouldRetry(status: number, retryConfig: RetryConfig): boolean {
    return retryConfig.retryOn.includes(status);
  }

  /**
   * Parse error response and create ApiException
   */
  private async parseErrorResponse(response: Response): Promise<ApiException> {
    let errorData: any;
    
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: response.statusText };
    }

    const apiError: ApiError = {
      message: errorData.message || `HTTP ${response.status}: ${response.statusText}`,
      status: response.status,
      code: errorData.code,
      details: errorData.details
    };

    return new ApiException(apiError);
  }

  /**
   * Make HTTP request with retry logic and enhanced error handling
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    retryConfig: Partial<RetryConfig> = {}
  ): Promise<ApiResponse<T>> {
    const config = { ...this.defaultRetryConfig, ...retryConfig };
    const url = `${this.baseURL}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    let lastError: Error;

    for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
      try {
        const response = await fetch(url, {
          ...options,
          headers,
        });

        if (!response.ok) {
          const apiException = await this.parseErrorResponse(response);
          
          // Check if we should retry this error
          if (attempt < config.maxRetries && this.shouldRetry(response.status, config)) {
            console.warn(`API request failed (attempt ${attempt + 1}/${config.maxRetries + 1}):`, apiException.message);
            await this.sleep(config.retryDelay * Math.pow(2, attempt)); // Exponential backoff
            continue;
          }
          
          throw apiException;
        }

        return await response.json();
      } catch (error) {
        lastError = error as Error;
        
        // If it's an ApiException, don't retry unless specified
        if (error instanceof ApiException) {
          if (attempt < config.maxRetries && this.shouldRetry(error.status, config)) {
            console.warn(`API request failed (attempt ${attempt + 1}/${config.maxRetries + 1}):`, error.message);
            await this.sleep(config.retryDelay * Math.pow(2, attempt));
            continue;
          }
          throw error;
        }
        
        // For network errors, always retry
        if (attempt < config.maxRetries) {
          console.warn(`Network error (attempt ${attempt + 1}/${config.maxRetries + 1}):`, error.message);
          await this.sleep(config.retryDelay * Math.pow(2, attempt));
          continue;
        }
        
        throw error;
      }
    }

    throw lastError;
  }

  async get<T>(endpoint: string, retryConfig?: Partial<RetryConfig>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' }, retryConfig);
  }

  async post<T>(endpoint: string, data?: any, retryConfig?: Partial<RetryConfig>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }, retryConfig);
  }

  async put<T>(endpoint: string, data?: any, retryConfig?: Partial<RetryConfig>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }, retryConfig);
  }

  async delete<T>(endpoint: string, retryConfig?: Partial<RetryConfig>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' }, retryConfig);
  }

  async getPaginated<T>(
    endpoint: string,
    page: number = 1,
    limit: number = 20
  ): Promise<PaginatedResponse<T>> {
    const response = await this.get<PaginatedResponse<T>>(
      `${endpoint}?page=${page}&limit=${limit}`
    );
    return response.data;
  }
}

export const apiClient = new ApiClient(API_BASE_URL);