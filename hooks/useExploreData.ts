import { useQuery } from '@tanstack/react-query';
import { mockEventDataService } from '@/services/mock-event-data.service';

/**
 * Custom hooks for exploring event data
 * Provides React Query hooks for various event data fetching operations
 */

export function usePopularEvents() {
  return useQuery({
    queryKey: ['popular-events'],
    queryFn: () => mockEventDataService.getPopularEvents(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useFeaturedEvents(categories?: string[]) {
  return useQuery({
    queryKey: ['featured-events', categories],
    queryFn: () => mockEventDataService.getFeaturedEvents(categories),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useSearchEvents(query: string) {
  return useQuery({
    queryKey: ['search-events', query],
    queryFn: () => mockEventDataService.searchEvents(query),
    enabled: !!query.trim(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useEventsByLocation(location: string) {
  return useQuery({
    queryKey: ['events-by-location', location],
    queryFn: () => mockEventDataService.getEventsByLocation(location),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}