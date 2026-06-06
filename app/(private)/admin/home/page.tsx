'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { HomePageEditor, HOME_DEFAULT_CONTENT } from '@/components/home-editor/CardPlugin'
import { useHomeStore } from '@/lib/store/useHomeStore'

const STORAGE_KEY = 'hd_home_content'

function loadFromStorage(): Record<string, unknown>[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function saveToStorage(content: Record<string, unknown>[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
  } catch {
    // ignore
  }
}

/* ------------------------------------------------------------------ */
/*  Home page                                                            */
/* ------------------------------------------------------------------ */
export default function HomePage() {
  const [initialContent, setInitialContent] = useState<Record<string, unknown>[] | null>(null)
  const latestContent = useRef<Record<string, unknown>[]>([])
  const { saveSignal } = useHomeStore()

  // Load from localStorage on mount
  useEffect(() => {
    const stored = loadFromStorage()
    const content = stored.length > 0 ? stored : HOME_DEFAULT_CONTENT
    latestContent.current = content
    setInitialContent(content)
  }, [])

  // Save when triggered from layout header
  useEffect(() => {
    if (saveSignal === 0) return
    const content = latestContent.current
    saveToStorage(content)
    console.log('[Home Page] Saved content (Plate.js format):', JSON.stringify(content, null, 2))
  }, [saveSignal]) // eslint-disable-line

  const handleChange = useCallback((value: Record<string, unknown>[]) => {
    latestContent.current = value
  }, [])

  if (!initialContent) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-sm text-hd-muted">Loading…</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden h-full" style={{ background: 'var(--hd-bg)' }}>
      <div className="flex-1 overflow-hidden">
        <HomePageEditor
          initialValue={initialContent}
          onChange={handleChange}
        />
      </div>
      <div style={{ padding: '10px 24px', borderTop: '1px solid var(--hd-border)', background: 'var(--hd-bg-soft)', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={() => {
            if (confirm('Are you sure you want to reset the home page content to defaults? This will overwrite your current changes.')) {
              localStorage.removeItem(STORAGE_KEY)
              window.location.reload()
            }
          }}
          style={{
            fontSize: '0.78rem', padding: '5px 12px', borderRadius: 7,
            border: '1px solid var(--hd-border)', background: 'transparent',
            color: 'var(--hd-text-soft)', cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          Reset to Default Template
        </button>
      </div>
    </div>
  )
}
