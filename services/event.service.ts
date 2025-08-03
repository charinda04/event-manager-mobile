import { apiClient } from '@/lib/api';
import { Event, PaginatedResponse, EventCategory } from '@/types';

export interface CreateEventData {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: {
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    latitude?: number;
    longitude?: number;
  };
  maxCapacity?: number;
  isPublic: boolean;
  categoryId: string;
  imageUrl?: string;
}

export interface UpdateEventData extends Partial<CreateEventData> {
  id: string;
}

export interface EventFilters {
  category?: string;
  startDate?: Date;
  endDate?: Date;
  location?: string;
  isPublic?: boolean;
}

class EventService {
  async getEvents(
    page: number = 1,
    limit: number = 20,
    filters?: EventFilters
  ): Promise<PaginatedResponse<Event>> {
    let endpoint = `/events?page=${page}&limit=${limit}`;
    
    if (filters) {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
      if (params.toString()) {
        endpoint += `&${params.toString()}`;
      }
    }

    const response = await apiClient.get<PaginatedResponse<Event>>(endpoint);
    return response.data;
  }

  async getEventById(id: string): Promise<Event> {
    const response = await apiClient.get<Event>(`/events/${id}`);
    return response.data;
  }

  async createEvent(eventData: CreateEventData): Promise<Event> {
    const response = await apiClient.post<Event>('/events', eventData);
    return response.data;
  }

  async updateEvent(eventData: UpdateEventData): Promise<Event> {
    const { id, ...updateData } = eventData;
    const response = await apiClient.put<Event>(`/events/${id}`, updateData);
    return response.data;
  }

  async deleteEvent(id: string): Promise<void> {
    await apiClient.delete(`/events/${id}`);
  }

  async getMyEvents(page: number = 1, limit: number = 20): Promise<PaginatedResponse<Event>> {
    const response = await apiClient.get<PaginatedResponse<Event>>(
      `/events/my?page=${page}&limit=${limit}`
    );
    return response.data;
  }

  async getAttendingEvents(page: number = 1, limit: number = 20): Promise<PaginatedResponse<Event>> {
    const response = await apiClient.get<PaginatedResponse<Event>>(
      `/events/attending?page=${page}&limit=${limit}`
    );
    return response.data;
  }

  async joinEvent(eventId: string): Promise<void> {
    await apiClient.post(`/events/${eventId}/join`);
  }

  async leaveEvent(eventId: string): Promise<void> {
    await apiClient.post(`/events/${eventId}/leave`);
  }

  async checkInToEvent(eventId: string): Promise<void> {
    await apiClient.post(`/events/${eventId}/checkin`);
  }

  async inviteToEvent(eventId: string, userIds: string[]): Promise<void> {
    await apiClient.post(`/events/${eventId}/invite`, { userIds });
  }

  async getEventCategories(): Promise<EventCategory[]> {
    const response = await apiClient.get<EventCategory[]>('/events/categories');
    return response.data;
  }

  async searchEvents(query: string, page: number = 1): Promise<PaginatedResponse<Event>> {
    const response = await apiClient.get<PaginatedResponse<Event>>(
      `/events/search?q=${encodeURIComponent(query)}&page=${page}`
    );
    return response.data;
  }
}

export const eventService = new EventService();