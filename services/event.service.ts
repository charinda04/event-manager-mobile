import { apiClient } from '@/lib/api';
import { Event, PaginatedResponse, EventCategory } from '@/types';
import { 
  getDummyEvents, 
  getDummyMyEvents, 
  createDummyEvent, 
  getDummyEventById 
} from './dummy-data.service';

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

// Flag to use dummy data when API is not available
const USE_DUMMY_DATA = true;

class EventService {
  async getEvents(
    page: number = 1,
    limit: number = 20,
    filters?: EventFilters
  ): Promise<PaginatedResponse<Event>> {
    if (USE_DUMMY_DATA) {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return getDummyEvents(page, limit);
    }

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
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const event = getDummyEventById(id);
      if (!event) {
        throw new Error('Event not found');
      }
      return event;
    }

    const response = await apiClient.get<Event>(`/events/${id}`);
    return response.data;
  }

  async createEvent(eventData: CreateEventData): Promise<Event> {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 800));
      return createDummyEvent(eventData);
    }

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
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 400));
      return getDummyMyEvents(page, limit);
    }

    const response = await apiClient.get<PaginatedResponse<Event>>(
      `/events/my?page=${page}&limit=${limit}`
    );
    return response.data;
  }

  async getAttendingEvents(page: number = 1, limit: number = 20): Promise<PaginatedResponse<Event>> {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 400));
      // For dummy data, return a subset of all events as "attending"
      const allEvents = getDummyEvents(page, limit);
      return {
        ...allEvents,
        data: allEvents.data.slice(0, Math.ceil(allEvents.data.length / 2)), // Attending half of events
      };
    }

    const response = await apiClient.get<PaginatedResponse<Event>>(
      `/events/attending?page=${page}&limit=${limit}`
    );
    return response.data;
  }

  async joinEvent(eventId: string): Promise<void> {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      // Simulate successful join
      return;
    }

    await apiClient.post(`/events/${eventId}/join`);
  }

  async leaveEvent(eventId: string): Promise<void> {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      // Simulate successful leave
      return;
    }

    await apiClient.post(`/events/${eventId}/leave`);
  }

  async checkInToEvent(eventId: string): Promise<void> {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      // Simulate successful check-in
      return;
    }

    await apiClient.post(`/events/${eventId}/checkin`);
  }

  async inviteToEvent(eventId: string, userIds: string[]): Promise<void> {
    await apiClient.post(`/events/${eventId}/invite`, { userIds });
  }

  async getEventCategories(): Promise<EventCategory[]> {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 200));
      return [
        { id: 'cat-1', name: 'Technology', color: '#007AFF', icon: 'laptop' },
        { id: 'cat-2', name: 'Music', color: '#FF6B6B', icon: 'music.note' },
        { id: 'cat-3', name: 'Sports', color: '#4ECDC4', icon: 'sportscourt' },
        { id: 'cat-4', name: 'Food & Drink', color: '#45B7D1', icon: 'fork.knife' },
        { id: 'cat-5', name: 'Business', color: '#96CEB4', icon: 'briefcase' },
      ];
    }

    const response = await apiClient.get<EventCategory[]>('/events/categories');
    return response.data;
  }

  async searchEvents(query: string, page: number = 1): Promise<PaginatedResponse<Event>> {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const allEvents = getDummyEvents(1, 100); // Get more events for search
      const filteredEvents = allEvents.data.filter(event => 
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.description.toLowerCase().includes(query.toLowerCase()) ||
        event.category.name.toLowerCase().includes(query.toLowerCase())
      );
      
      const startIndex = (page - 1) * 10;
      const endIndex = startIndex + 10;
      const paginatedResults = filteredEvents.slice(startIndex, endIndex);
      
      return {
        data: paginatedResults,
        total: filteredEvents.length,
        page,
        limit: 10,
        hasMore: endIndex < filteredEvents.length,
      };
    }

    const response = await apiClient.get<PaginatedResponse<Event>>(
      `/events/search?q=${encodeURIComponent(query)}&page=${page}`
    );
    return response.data;
  }
}

export const eventService = new EventService();