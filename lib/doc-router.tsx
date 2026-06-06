'use client'

/**
 * DocRouter — bypasses the Next.js router for within-docs navigation.
 *
 * Why: Next.js router triggers an RSC fetch on every Link click, causing
 * 700ms-1s delay even when all content is already in DocsContext.
 *
 * How: We manage the current pathname ourselves via React state + history.pushState.
 * No RSC fetch is triggered. Content renders in the same frame as the click.
 * Back/forward buttons work via the popstate event.
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

const DOC_NAV_EVENT = 'doc-nav'

type DocRouterCtx = {
  pathname: string
  search: string
  navigate: (href: string) => void
}

const DocRouterContext = createContext<DocRouterCtx>({
  pathname: '/',
  search: '',
  navigate: () => {},
})

export function DocRouterProvider({ children }: { children: React.ReactNode }) {
  const [pathname, setPathname] = useState(() =>
    typeof window !== 'undefined' ? window.location.pathname : '/'
  )
  const [search, setSearch] = useState(() =>
    typeof window !== 'undefined' ? window.location.search : ''
  )

  useEffect(() => {
    const sync = () => {
      setPathname(window.location.pathname)
      setSearch(window.location.search)
    }
    window.addEventListener(DOC_NAV_EVENT, sync)
    window.addEventListener('popstate', sync)
    return () => {
      window.removeEventListener(DOC_NAV_EVENT, sync)
      window.removeEventListener('popstate', sync)
    }
  }, [])

  const navigate = useCallback((href: string) => {
    if (typeof window === 'undefined') return
    const currentFull = window.location.pathname + window.location.search + window.location.hash
    if (currentFull === href) return
    window.history.pushState(null, '', href)
    window.dispatchEvent(new Event(DOC_NAV_EVENT))
  }, [])

  return (
    <DocRouterContext.Provider value={{ pathname, search, navigate }}>
      {children}
    </DocRouterContext.Provider>
  )
}

export function useDocRouter() {
  return useContext(DocRouterContext)
}
