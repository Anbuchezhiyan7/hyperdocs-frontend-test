'use client'

/**
 * QueryProvider — wraps the public docs with TanStack Query + localStorage persister.
 *   - Only the ['public-docs', userId] query is persisted to localStorage.
 *   - All other queries (admin, etc.) use standard in-memory caching only.
 *
 * ReactQueryProvider — plain QueryClientProvider for the admin (private) layout.
 *   - No persister, no localStorage. Standard TanStack in-memory only.
 */

import React, { useRef } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { getQueryClient } from '@/lib/query-client'
import type { NavItem } from '@/lib/docs-context'

export const PUBLIC_DOCS_KEY = (userId: string) => ['public-docs', userId]

// ── Admin / private layout wrapper ──────────────────────────────────────────
// Plain QueryClientProvider — no persistence, no localStorage involvement.
export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

// ── Public docs wrapper ──────────────────────────────────────────────────────
// PersistQueryClientProvider with localStorage, filtered to public-docs only.
type Props = {
  children: React.ReactNode
  initialDocs: NavItem[] | null
  userId: string | null
}

export function QueryProvider({ children, initialDocs, userId }: Props) {
  const queryClient = getQueryClient()

  // Seed the query cache with server data once (only if localStorage has nothing).
  const seeded = useRef(false)
  if (!seeded.current && userId && initialDocs && initialDocs.length > 0) {
    const key = PUBLIC_DOCS_KEY(userId)
    const existing = queryClient.getQueryData(key)
    if (!existing) {
      queryClient.setQueryData(key, initialDocs)
    }
    seeded.current = true
  }

  const persister = createSyncStoragePersister({
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    key: 'hd-docs-cache',
    throttleTime: 1000,
  })

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: 24 * 60 * 60 * 1000,
        buster: '',
        // Only the public-docs query goes to localStorage — nothing else.
        dehydrateOptions: {
          shouldDehydrateQuery: (query) => query.queryKey[0] === 'public-docs',
        },
      }}
    >
      {children}
    </PersistQueryClientProvider>
  )
}
