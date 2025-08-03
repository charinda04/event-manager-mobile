import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { eventService, CreateEventData, UpdateEventData, EventFilters } from '@/services/event.service';
import { Event, PaginatedResponse } from '@/types';

export const eventKeys = {
  all: ['events'] as const,
  lists: () => [...eventKeys.all, 'list'] as const,
  list: (filters?: EventFilters) => [...eventKeys.lists(), filters] as const,
  details: () => [...eventKeys.all, 'detail'] as const,
  detail: (id: string) => [...eventKeys.details(), id] as const,
  myEvents: () => [...eventKeys.all, 'my'] as const,
  attending: () => [...eventKeys.all, 'attending'] as const,
  categories: () => [...eventKeys.all, 'categories'] as const,
  search: (query: string) => [...eventKeys.all, 'search', query] as const,
};

export function useEvents(filters?: EventFilters) {
  return useInfiniteQuery({
    queryKey: eventKeys.list(filters),
    queryFn: ({ pageParam = 1 }) => eventService.getEvents(pageParam, 20, filters),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => 
      lastPage.hasMore ? lastPage.page + 1 : undefined,
    select: (data) => ({
      pages: data.pages,
      pageParams: data.pageParams,
      events: data.pages.flatMap(page => page.data),
    }),
  });
}

export function useEvent(id: string) {
  return useQuery({
    queryKey: eventKeys.detail(id),
    queryFn: () => eventService.getEventById(id),
    enabled: !!id,
  });
}

export function useMyEvents() {
  return useInfiniteQuery({
    queryKey: eventKeys.myEvents(),
    queryFn: ({ pageParam = 1 }) => eventService.getMyEvents(pageParam, 20),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => 
      lastPage.hasMore ? lastPage.page + 1 : undefined,
    select: (data) => ({
      pages: data.pages,
      pageParams: data.pageParams,
      events: data.pages.flatMap(page => page.data),
    }),
  });
}

export function useAttendingEvents() {
  return useInfiniteQuery({
    queryKey: eventKeys.attending(),
    queryFn: ({ pageParam = 1 }) => eventService.getAttendingEvents(pageParam, 20),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => 
      lastPage.hasMore ? lastPage.page + 1 : undefined,
    select: (data) => ({
      pages: data.pages,
      pageParams: data.pageParams,
      events: data.pages.flatMap(page => page.data),
    }),
  });
}

export function useEventCategories() {
  return useQuery({
    queryKey: eventKeys.categories(),
    queryFn: () => eventService.getEventCategories(),
  });
}

export function useSearchEvents(query: string) {
  return useInfiniteQuery({
    queryKey: eventKeys.search(query),
    queryFn: ({ pageParam = 1 }) => eventService.searchEvents(query, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => 
      lastPage.hasMore ? lastPage.page + 1 : undefined,
    enabled: query.length > 2,
    select: (data) => ({
      pages: data.pages,
      pageParams: data.pageParams,
      events: data.pages.flatMap(page => page.data),
    }),
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateEventData) => eventService.createEvent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventKeys.lists() });
      queryClient.invalidateQueries({ queryKey: eventKeys.myEvents() });
    },
  });
}

export function useUpdateEvent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: UpdateEventData) => eventService.updateEvent(data),
    onSuccess: (updatedEvent) => {
      queryClient.invalidateQueries({ queryKey: eventKeys.lists() });
      queryClient.invalidateQueries({ queryKey: eventKeys.myEvents() });
      queryClient.setQueryData(eventKeys.detail(updatedEvent.id), updatedEvent);
    },
  });
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => eventService.deleteEvent(id),
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: eventKeys.lists() });
      queryClient.invalidateQueries({ queryKey: eventKeys.myEvents() });
      queryClient.removeQueries({ queryKey: eventKeys.detail(deletedId) });
    },
  });
}

export function useJoinEvent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (eventId: string) => eventService.joinEvent(eventId),
    onSuccess: (_, eventId) => {
      queryClient.invalidateQueries({ queryKey: eventKeys.lists() });
      queryClient.invalidateQueries({ queryKey: eventKeys.attending() });
      queryClient.invalidateQueries({ queryKey: eventKeys.detail(eventId) });
    },
  });
}

export function useLeaveEvent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (eventId: string) => eventService.leaveEvent(eventId),
    onSuccess: (_, eventId) => {
      queryClient.invalidateQueries({ queryKey: eventKeys.lists() });
      queryClient.invalidateQueries({ queryKey: eventKeys.attending() });
      queryClient.invalidateQueries({ queryKey: eventKeys.detail(eventId) });
    },
  });
}

export function useCheckInToEvent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (eventId: string) => eventService.checkInToEvent(eventId),
    onSuccess: (_, eventId) => {
      queryClient.invalidateQueries({ queryKey: eventKeys.detail(eventId) });
      queryClient.invalidateQueries({ queryKey: eventKeys.attending() });
    },
  });
}