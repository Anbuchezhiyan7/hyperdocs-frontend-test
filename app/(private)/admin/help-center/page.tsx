'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  HelpCenterEditor,
  HELP_CENTER_DEFAULT_CONTENT,
  DEFAULT_HERO_CONFIG,
  type HeroConfig,
} from '@/components/help-center-editor/HelpCenterEditor'

const STORAGE_KEY = 'hd_help_center_content'
const HERO_STORAGE_KEY = 'hd_help_center_hero'

function loadContent(): Record<string, unknown>[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch { return [] }
}

function loadHero(): HeroConfig {
  if (typeof window === 'undefined') return DEFAULT_HERO_CONFIG
  try {
    const raw = localStorage.getItem(HERO_STORAGE_KEY)
    if (!raw) return DEFAULT_HERO_CONFIG
    return { ...DEFAULT_HERO_CONFIG, ...JSON.parse(raw) }
  } catch { return DEFAULT_HERO_CONFIG }
}

function saveContent(content: Record<string, unknown>[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(content)) } catch { /* ignore */ }
}

function saveHero(hero: HeroConfig) {
  try { localStorage.setItem(HERO_STORAGE_KEY, JSON.stringify(hero)) } catch { /* ignore */ }
}

/* ------------------------------------------------------------------ */
/*  Help Center page                                                    */
/* ------------------------------------------------------------------ */
export default function HelpCenterPage() {
  const [initialContent, setInitialContent] = useState<Record<string, unknown>[] | null>(null)
  const [initialHero, setInitialHero] = useState<HeroConfig | null>(null)
  const latestContent = useRef<Record<string, unknown>[]>([])

  useEffect(() => {
    const content = loadContent()
    const hero = loadHero()
    latestContent.current = content.length > 0 ? content : HELP_CENTER_DEFAULT_CONTENT
    setInitialContent(content)
    setInitialHero(hero)
  }, [])

  const handleChange = useCallback((value: Record<string, unknown>[]) => {
    latestContent.current = value
    saveContent(value)
  }, [])

  const handleHeroChange = useCallback((hero: HeroConfig) => {
    saveHero(hero)
  }, [])

  if (!initialContent || !initialHero) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-sm text-hd-muted">Loading…</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden h-full" style={{ background: 'var(--hd-bg)' }}>
      <div className="flex-1 overflow-hidden">
        <HelpCenterEditor
          initialValue={initialContent}
          heroConfig={initialHero}
          onChange={handleChange}
          onHeroChange={handleHeroChange}
        />
      </div>

      {/* Footer toolbar */}
      <div style={{ padding: '10px 24px', borderTop: '1px solid var(--hd-border)', background: 'var(--hd-bg-soft)', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={() => {
            if (confirm('Reset Help Center to defaults?')) {
              localStorage.removeItem(STORAGE_KEY)
              localStorage.removeItem(HERO_STORAGE_KEY)
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

/* ------------------------------------------------------------------ */
/*  Coming Soon — kept but commented out                               */
/* ------------------------------------------------------------------ */
/*
function ComingSoonOverlay() {
  return (
    <div className="relative flex-1 overflow-hidden h-full">
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-hd-bg/40 backdrop-blur-[2px]">
        <div className="flex flex-col items-center justify-center p-8 bg-hd-surface border border-hd-border rounded-xl shadow-lg max-w-[400px] text-center">
          <div className="w-12 h-12 rounded-full bg-[#f26522]/10 flex items-center justify-center text-[#f26522] mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          </div>
          <h2 className="text-xl font-bold text-hd-text mb-2">Help Center</h2>
          <p className="text-sm text-hd-muted mb-4">A complete hub for user support, documentation search, is actively being built.</p>
          <span className="text-[0.65rem] font-bold uppercase tracking-wider px-2 py-1 bg-[#f26522]/10 text-[#f26522] border border-[#f26522]/20 rounded">Coming Soon</span>
        </div>
      </div>
    </div>
  )
}
*/
