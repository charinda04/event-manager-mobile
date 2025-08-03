import { useQuery } from '@tanstack/react-query';
import { Event } from '@/types';

// Mock data for popular events
const mockPopularEvents: Event[] = [
  {
    id: '1',
    title: 'Alo Moves x Pause | Sound Bath with Avery Whitmore',
    description: 'Alo Moves x 1 Hotel Community Series',
    startDate: new Date('2024-11-16T11:00:00'),
    endDate: new Date('2024-11-16T12:30:00'),
    organizer: { firstName: 'Alo', lastName: 'Moves' },
    location: { name: 'West Hollywood', city: 'Los Angeles' },
    capacity: 50,
    attendees: []
  },
  {
    id: '2',
    title: 'Venture Social Club | Hollywood Hills',
    description: 'STARTUPSTARTER® networking event',
    startDate: new Date('2024-11-16T18:00:00'),
    endDate: new Date('2024-11-16T20:00:00'),
    organizer: { firstName: 'StartUp', lastName: 'Starter' },
    location: { name: 'Hollywood Hills', city: 'Los Angeles' },
    capacity: 100,
    attendees: []
  },
  {
    id: '3',
    title: 'LA Fintech Connect Happy Hour - Sponsored by TaskUs',
    description: 'LA Fintech Connect networking happy hour',
    startDate: new Date('2024-07-17T17:30:00'),
    endDate: new Date('2024-07-17T19:30:00'),
    organizer: { firstName: 'LA', lastName: 'Fintech' },
    location: { name: 'Downtown LA', city: 'Los Angeles' },
    capacity: 75,
    attendees: []
  }
];

// Mock featured events for different categories
const mockFeaturedEvents: Event[] = [
  {
    id: '4',
    title: 'Climate Action Workshop',
    description: 'Learn about sustainable living',
    startDate: new Date('2024-11-18T14:00:00'),
    endDate: new Date('2024-11-18T16:00:00'),
    organizer: { firstName: 'Green', lastName: 'Earth' },
    location: { name: 'Santa Monica', city: 'Los Angeles' },
    capacity: 30,
    attendees: []
  },
  {
    id: '5',
    title: 'Morning Yoga & Meditation',
    description: 'Start your day with mindfulness',
    startDate: new Date('2024-11-17T07:00:00'),
    endDate: new Date('2024-11-17T08:30:00'),
    organizer: { firstName: 'Zen', lastName: 'Studio' },
    location: { name: 'Venice Beach', city: 'Los Angeles' },
    capacity: 25,
    attendees: []
  }
];

export function usePopularEvents() {
  return useQuery({
    queryKey: ['popular-events'],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        events: mockPopularEvents,
        total: mockPopularEvents.length
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useFeaturedEvents(categories?: string[]) {
  return useQuery({
    queryKey: ['featured-events', categories],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
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
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useSearchEvents(query: string) {
  return useQuery({
    queryKey: ['search-events', query],
    queryFn: async () => {
      if (!query.trim()) return { events: [], total: 0 };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simple search simulation
      const allEvents = [...mockPopularEvents, ...mockFeaturedEvents];
      const filteredEvents = allEvents.filter(event => 
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.description.toLowerCase().includes(query.toLowerCase())
      );
      
      return {
        events: filteredEvents,
        total: filteredEvents.length
      };
    },
    enabled: !!query.trim(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useEventsByLocation(location: string) {
  return useQuery({
    queryKey: ['events-by-location', location],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const allEvents = [...mockPopularEvents, ...mockFeaturedEvents];
      const filteredEvents = allEvents.filter(event => 
        event.location.city.toLowerCase().includes(location.toLowerCase())
      );
      
      return {
        events: filteredEvents,
        total: filteredEvents.length
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}