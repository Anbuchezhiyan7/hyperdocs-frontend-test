'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export type ThemeMode = 'light' | 'dark' | 'system'

type ThemeContextType = {
  theme: ThemeMode
  setTheme: (t: ThemeMode) => void
  resolvedTheme: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  setTheme: () => {},
  resolvedTheme: 'light',
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>('system')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

  function applyTheme(mode: ThemeMode) {
    const isDark =
      mode === 'dark' ||
      (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    setResolvedTheme(isDark ? 'dark' : 'light')
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }

  function setTheme(mode: ThemeMode) {
    setThemeState(mode)
    localStorage.setItem('hd-theme', mode)
    applyTheme(mode)
  }

  useEffect(() => {
    const saved = (localStorage.getItem('hd-theme') as ThemeMode) || 'system'
    setThemeState(saved)
    applyTheme(saved)

    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      if (saved === 'system') applyTheme('system')
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
