export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: EventLocation;
  organizer: User;
  attendees: EventAttendee[];
  capacity?: number; // Added for backward compatibility
  maxCapacity?: number;
  isPublic?: boolean; // Made optional for mock data
  category?: EventCategory; // Made optional for mock data
  status?: EventStatus; // Made optional for mock data
  imageUrl?: string;
  createdAt?: Date; // Made optional for mock data
  updatedAt?: Date; // Made optional for mock data
}

export interface EventLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

export interface EventAttendee {
  id: string;
  user: User;
  event: Event;
  status: AttendeeStatus;
  registeredAt: Date;
  checkedInAt?: Date;
}

export interface EventCategory {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export type EventStatus = 'draft' | 'published' | 'cancelled' | 'completed';
export type AttendeeStatus = 'pending' | 'confirmed' | 'declined' | 'checked_in';

export interface Invitation {
  id: string;
  event: Event;
  invitee: User;
  inviter: User;
  status: InvitationStatus;
  sentAt: Date;
  respondedAt?: Date;
}

export type InvitationStatus = 'pending' | 'accepted' | 'declined';

export interface Notification {
  id: string;
  user: User;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  data?: Record<string, any>;
  createdAt: Date;
}

export type NotificationType = 'event_invitation' | 'event_reminder' | 'event_update' | 'check_in';

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Enhanced error handling types
export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: Record<string, any>;
}

export class ApiException extends Error {
  public readonly status: number;
  public readonly code?: string;
  public readonly details?: Record<string, any>;

  constructor(error: ApiError) {
    super(error.message);
    this.name = 'ApiException';
    this.status = error.status;
    this.code = error.code;
    this.details = error.details;
  }
}

// Utility types for better type safety and code organization
export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

// Common loading and error states for UI components
export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
}

export interface AsyncState<T> extends LoadingState {
  data?: T;
}

// Common form validation types
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState<T> {
  values: T;
  errors: ValidationError[];
  isSubmitting: boolean;
  isValid: boolean;
}

// Event-specific utility types
export type CreateEventInput = Omit<Event, 'id' | 'attendees' | 'createdAt' | 'updatedAt'> & {
  location: Omit<EventLocation, 'id'>;
  organizer: Pick<User, 'id'>;
};

export type EventSummary = Pick<Event, 'id' | 'title' | 'startDate' | 'location' | 'capacity'>;

export type UserProfile = Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'profilePicture'>;

// Query and mutation result types for consistent API responses
export interface QueryResult<T> {
  data?: T;
  isLoading: boolean;
  error?: Error;
  refetch: () => void;
}

export interface MutationResult<T> {
  mutate: (data: T) => void;
  isLoading: boolean;
  error?: Error;
  isSuccess: boolean;
}