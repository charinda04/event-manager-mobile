import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Attach Reactotron devtools in development
if (__DEV__) {
  import('@/lib/reactotron').then(({ attachReactQueryDevtools }) => {
    attachReactQueryDevtools(queryClient);
  });
}