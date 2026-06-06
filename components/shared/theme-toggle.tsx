'use client'

import React from 'react'
import { useTheme, type ThemeMode } from '@/lib/theme-context'
import { IconMonitor, IconSun, IconMoon } from '@/components/shared/icons'

/* ------------------------------------------------------------------ */
/*  Admin: 3-way selector (System / Light / Dark)                       */
/* ------------------------------------------------------------------ */

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const currentIcon = () => {
    if (theme === 'dark') return <IconMoon width="14" height="14" />
    if (theme === 'light') return <IconSun width="14" height="14" />
    return <IconMonitor width="14" height="14" />
  }

  const options: { value: ThemeMode; label: string; icon: React.ReactNode }[] = [
    { value: 'light', label: 'Light', icon: <IconSun width="14" height="14" /> },
    { value: 'dark', label: 'Dark', icon: <IconMoon width="14" height="14" /> },
    { value: 'system', label: 'System default', icon: <IconMonitor width="14" height="14" /> },
  ]

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="flex items-center justify-center w-8 h-8 rounded-lg border border-hd-admin-border bg-hd-bg text-hd-muted hover:bg-hd-surface/50 hover:text-hd-text transition-all duration-150 cursor-pointer select-none"
        title={`Theme: ${theme}`}
      >
        {currentIcon()}
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-36 py-1.5 rounded-xl border border-hd-border bg-hd-bg text-hd-text shadow-xl z-50 transition-all select-none"
          style={{ background: 'var(--hd-bg)', borderColor: 'var(--hd-border)' }}
        >
          {options.map(opt => (
            <button
              key={opt.value}
              onClick={() => {
                setTheme(opt.value)
                setIsOpen(false)
              }}
              className={`w-full px-3 py-1.5 flex items-center gap-2 border-none text-left text-xs font-semibold cursor-pointer transition-colors duration-100 ${
                theme === opt.value
                  ? 'bg-hd-accent-light text-hd-accent'
                  : 'bg-transparent text-hd-text-soft hover:bg-hd-surface'
              }`}
            >
              <span className={theme === opt.value ? 'text-hd-accent' : 'text-hd-muted-light'}>
                {opt.icon}
              </span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Docs: simple light/dark toggle button                               */
/* ------------------------------------------------------------------ */

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        width: 34, height: 34, borderRadius: 8,
        border: `1px solid var(--hd-border)`,
        background: 'var(--hd-surface)',
        color: 'var(--hd-text-soft)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', flexShrink: 0, transition: 'all 0.12s',
      }}
    >
      {isDark ? (
        <IconSun width="15" height="15" />
      ) : (
        <IconMoon width="15" height="15" />
      )}
    </button>
  )
}
