export const queryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 0, // Disable retry for failed queries
      refetchOnWindowFocus: false, // Disable automatic refetching on window focus
    },
    mutations: {
      retry: 0, // Disable retry for failed mutations
    },
  },
};
