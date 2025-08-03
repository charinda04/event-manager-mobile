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
  maxCapacity?: number;
  isPublic: boolean;
  category: EventCategory;
  status: EventStatus;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
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