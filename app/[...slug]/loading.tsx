/**
 * Loading boundary for the [...slug] route.
 *
 * Having a loading.tsx here does two things:
 * 1. Enables Next.js to prefetch the route shell (layout up to this boundary) in production.
 * 2. Allows the client-side router cache to hold the prefetched payload for 30s
 *    (configured via staleTimes.dynamic in next.config.ts), making sidebar navigation
 *    feel instant without a round-trip to the server on every click.
 *
 * The actual page content is in the DocsContext (client-side), so there's nothing
 * meaningful to show here — the skeleton is effectively invisible.
 */
export default function Loading() {
  return null
}
