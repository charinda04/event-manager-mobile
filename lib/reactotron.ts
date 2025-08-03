import Reactotron from 'reactotron-react-native';
import { QueryClient } from '@tanstack/react-query';

declare global {
  interface Console {
    tron: typeof Reactotron;
  }
}

const reactotron = Reactotron
  .configure({
    name: 'Event Manager Mobile',
  })
  .useReactNative({
    asyncStorage: false, // there are more options to the async storage.
    networking: {
      // optionally, you can turn it off with false.
      ignoreUrls: /symbolicate/,
    },
    editor: false, // there are more options to editor
    errors: { veto: (stackFrame) => false }, // or turn it off with false
    overlay: false, // just turning off overlay
  })
  .connect();

if (__DEV__) {
  // make reactotron available globally in development
  console.tron = reactotron;
}

export default reactotron;

// React Query plugin integration
export const attachReactQueryDevtools = (queryClient: QueryClient) => {
  if (__DEV__ && reactotron) {
    // Add custom React Query logging
    queryClient.getQueryCache().subscribe((event) => {
      if (event?.type) {
        reactotron.log({
          name: `React Query: ${event.type}`,
          preview: event.query?.queryKey?.join(' > ') || 'Unknown query',
          value: {
            queryKey: event.query?.queryKey,
            state: event.query?.state,
            type: event.type,
          },
        });
      }
    });

    queryClient.getMutationCache().subscribe((event) => {
      if (event?.type) {
        reactotron.log({
          name: `React Query Mutation: ${event.type}`,
          preview: event.mutation?.options?.mutationKey?.join(' > ') || 'Unknown mutation',
          value: {
            mutationKey: event.mutation?.options?.mutationKey,
            state: event.mutation?.state,
            type: event.type,
          },
        });
      }
    });
  }
};