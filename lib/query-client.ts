import { QueryClient } from '@tanstack/react-query'

let browserQueryClient: QueryClient | undefined = undefined

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // No global staleTime — each query sets its own.
        // Keep data in memory for 5 minutes by default.
        gcTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false, // per-query will opt in if needed
        refetchOnMount: true,
        retry: 1,
      },
    },
  })
}

/** Always returns the same QueryClient instance in the browser. */
export function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: new instance per request (no shared state between SSR requests)
    return makeQueryClient()
  }
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient()
  }
  return browserQueryClient
}
