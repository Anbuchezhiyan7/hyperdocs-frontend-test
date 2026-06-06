'use client'

import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { HeaderTab } from './navigation-panel/header-tab'
import { FooterTab } from './navigation-panel/footer-tab'
import { useAppStore } from '@/lib/store/useAppStore'
import { apiGetSettings } from '@/lib/api/auth'

export function NavigationPanel() {
  const [tab, setTab] = useState<'header' | 'footer'>('header')
  const { setSettings } = useAppStore()

  useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const res = await apiGetSettings()
      if (res.success) setSettings(res.data)
      return res.data
    },
  })

  return (
    <div className="flex-1 overflow-y-auto bg-hd-bg text-hd-text">
      <div className="max-w-[860px] mx-auto px-10 py-10">
        {/* Page title */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold mb-1.5">Navigation</h1>
          <p className="text-sm font-semibold text-hd-text-soft">
            Manage header menu links, CTA button, and footer sections for your documentation site.
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-0 border-b border-hd-border w-full">
            {(['header', 'footer'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2.5 text-sm font-semibold border-none bg-transparent cursor-pointer capitalize transition-colors relative ${
                  tab === t
                    ? 'text-[#f26522]'
                    : 'text-hd-text-soft hover:text-hd-text'
                }`}
              >
                {t === 'header' ? 'Navigation' : 'Footer'}
                {tab === t && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#f26522] rounded-t-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {tab === 'header' ? <HeaderTab /> : <FooterTab />}
      </div>
    </div>
  )
}
