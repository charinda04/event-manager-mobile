import { Event, User, EventLocation } from '@/types';

/**
 * Mock data service for events
 * Provides consistent mock data for development and testing
 */

// Mock organizers with complete User data
export const mockOrganizers: User[] = [
  {
    id: 'org-1',
    email: 'alo@example.com',
    firstName: 'Alo',
    lastName: 'Moves',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'org-2',
    email: 'startup@example.com',
    firstName: 'StartUp',
    lastName: 'Starter',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'org-3',
    email: 'fintech@example.com',
    firstName: 'LA',
    lastName: 'Fintech',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'org-4',
    email: 'green@example.com',
    firstName: 'Green',
    lastName: 'Earth',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'org-5',
    email: 'zen@example.com',
    firstName: 'Zen',
    lastName: 'Studio',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

// Mock locations with complete EventLocation data
export const mockLocations: EventLocation[] = [
  {
    id: 'loc-1',
    name: 'West Hollywood',
    address: '123 Sunset Blvd',
    city: 'Los Angeles',
    state: 'CA',
    country: 'USA',
    latitude: 34.0900,
    longitude: -118.3617,
  },
  {
    id: 'loc-2',
    name: 'Hollywood Hills',
    address: '456 Hollywood Blvd',
    city: 'Los Angeles',
    state: 'CA',
    country: 'USA',
    latitude: 34.1341,
    longitude: -118.3215,
  },
  {
    id: 'loc-3',
    name: 'Downtown LA',
    address: '789 Main St',
    city: 'Los Angeles',
    state: 'CA',
    country: 'USA',
    latitude: 34.0522,
    longitude: -118.2437,
  },
  {
    id: 'loc-4',
    name: 'Santa Monica',
    address: '321 Ocean Ave',
    city: 'Los Angeles',
    state: 'CA',
    country: 'USA',
    latitude: 34.0195,
    longitude: -118.4912,
  },
  {
    id: 'loc-5',
    name: 'Venice Beach',
    address: '654 Boardwalk',
    city: 'Los Angeles',
    state: 'CA',
    country: 'USA',
    latitude: 34.0118,
    longitude: -118.4755,
  },
];

// Mock popular events
export const mockPopularEvents: Event[] = [
  {
    id: '1',
    title: 'Alo Moves x Pause | Sound Bath with Avery Whitmore',
    description: 'Alo Moves x 1 Hotel Community Series',
    startDate: new Date('2024-11-16T11:00:00'),
    endDate: new Date('2024-11-16T12:30:00'),
    organizer: mockOrganizers[0],
    location: mockLocations[0],
    capacity: 50,
    attendees: []
  },
  {
    id: '2',
    title: 'Venture Social Club | Hollywood Hills',
    description: 'STARTUPSTARTER® networking event',
    startDate: new Date('2024-11-16T18:00:00'),
    endDate: new Date('2024-11-16T20:00:00'),
    organizer: mockOrganizers[1],
    location: mockLocations[1],
    capacity: 100,
    attendees: []
  },
  {
    id: '3',
    title: 'LA Fintech Connect Happy Hour - Sponsored by TaskUs',
    description: 'LA Fintech Connect networking happy hour',
    startDate: new Date('2024-07-17T17:30:00'),
    endDate: new Date('2024-07-17T19:30:00'),
    organizer: mockOrganizers[2],
    location: mockLocations[2],
    capacity: 75,
    attendees: []
  }
];

// Mock featured events
export const mockFeaturedEvents: Event[] = [
  {
    id: '4',
    title: 'Climate Action Workshop',
    description: 'Learn about sustainable living',
    startDate: new Date('2024-11-18T14:00:00'),
    endDate: new Date('2024-11-18T16:00:00'),
    organizer: mockOrganizers[3],
    location: mockLocations[3],
    capacity: 30,
    attendees: []
  },
  {
    id: '5',
    title: 'Morning Yoga & Meditation',
    description: 'Start your day with mindfulness',
    startDate: new Date('2024-11-17T07:00:00'),
    endDate: new Date('2024-11-17T08:30:00'),
    organizer: mockOrganizers[4],
    location: mockLocations[4],
    capacity: 25,
    attendees: []
  }
];

// Combined mock events
export const mockAllEvents: Event[] = [...mockPopularEvents, ...mockFeaturedEvents];

/**
 * Mock event data service class
 * Provides methods to simulate API calls with mock data
 */
class MockEventDataService {
  /**
   * Simulate API delay
   */
  private async simulateDelay(ms: number = 500): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get popular events
   */
  async getPopularEvents() {
    await this.simulateDelay(1000);
    return {
      events: mockPopularEvents,
      total: mockPopularEvents.length
    };
  }

  /**
   * Get featured events, optionally filtered by categories
   */
  async getFeaturedEvents(categories?: string[]) {
    await this.simulateDelay(800);
    
    // Filter by categories if provided
    let filteredEvents = mockFeaturedEvents;
    if (categories && categories.length > 0) {
      // In a real app, this would filter based on event categories
      filteredEvents = mockFeaturedEvents.slice(0, categories.length);
    }
    
    return {
      events: filteredEvents,
      total: filteredEvents.length
    };
  }

  /**
   * Search events by query string
   */
  async searchEvents(query: string) {
    if (!query.trim()) return { events: [], total: 0 };
    
    await this.simulateDelay(500);
    
    const filteredEvents = mockAllEvents.filter(event => 
      event.title.toLowerCase().includes(query.toLowerCase()) ||
      event.description.toLowerCase().includes(query.toLowerCase())
    );
    
    return {
      events: filteredEvents,
      total: filteredEvents.length
    };
  }

  /**
   * Get events by location
   */
  async getEventsByLocation(location: string) {
    await this.simulateDelay(1000);
    
    const filteredEvents = mockAllEvents.filter(event => 
      event.location.city.toLowerCase().includes(location.toLowerCase())
    );
    
    return {
      events: filteredEvents,
      total: filteredEvents.length
    };
  }
}

export const mockEventDataService = new MockEventDataService();