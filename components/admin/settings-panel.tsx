'use client'

import React from 'react'
import { ThemeSelector } from '@/components/shared/theme-toggle'

export function SettingsPanel() {
  return (
    <div className="flex-1 p-10 overflow-y-auto bg-hd-bg text-hd-text">
      <h1 className="text-2xl font-bold mb-1.5">Settings</h1>
      <p className="text-sm font-semibold text-hd-text-soft mb-8">
        Manage your project settings.
      </p>

      <div className="max-w-[540px] flex flex-col gap-8">
        {/* Theme */}
        <div className="border border-hd-border rounded-xl overflow-hidden">
          <div className="p-4 bg-hd-bg-soft flex items-center justify-between">
            <div>
              <span className="text-[0.8rem] font-bold text-hd-text">Theme</span>
              <p className="text-[0.75rem] font-semibold text-hd-text-soft m-0 mt-0.5">
                Choose the admin interface appearance.
              </p>
            </div>
            <ThemeSelector />
          </div>
        </div>
      </div>
    </div>
  )
}
