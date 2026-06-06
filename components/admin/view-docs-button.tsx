'use client'

import React from 'react'
import { useAppStore } from '@/lib/store/useAppStore'

export function ViewDocsButton() {
  const { settings } = useAppStore()
  const [showTooltip, setShowTooltip] = React.useState(false)

  const documentMode = settings?.general?.document_mode

  if (!documentMode) {
    return (
      <div
        className="relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* span wrapper so pointer events work even though the button is visually disabled */}
        <span
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[0.8rem] font-medium cursor-not-allowed select-none"
          style={{
            borderColor: 'var(--hd-border)',
            color: 'var(--hd-muted)',
            opacity: 0.55,
          }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
          </svg>
          View Docs
        </span>

        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute right-0 top-full mt-2.5 z-50 w-[210px]"
            style={{ filter: 'drop-shadow(0 6px 20px rgba(0,0,0,0.18))' }}>
            {/* Arrow */}
            <div
              className="absolute -top-[5px] right-5 w-2.5 h-2.5 rotate-45"
              style={{ background: 'var(--hd-surface)', border: '1px solid var(--hd-border)', borderBottomColor: 'transparent', borderRightColor: 'transparent' }}
            />
            <div
              className="relative rounded-[10px] px-3.5 py-3 border"
              style={{ background: 'var(--hd-surface)', borderColor: 'var(--hd-border)' }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0" style={{ background: 'rgba(242,101,34,0.12)' }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#f26522" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <p className="text-[0.78rem] font-[700] leading-snug" style={{ color: 'var(--hd-text)' }}>
                  Choose a document mode first
                </p>
              </div>
              <p className="text-[0.72rem] leading-relaxed" style={{ color: 'var(--hd-muted)' }}>
                Go to the Dashboard and pick how you'd like to manage your docs.
              </p>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <a
      href={settings.domain?.default ? `https://${settings.domain.default}` : '/'}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-hd-accent hover:border-hd-accent-hover text-hd-admin-text hover:text-hd-text text-[0.8rem] font-medium no-underline hover:bg-hd-surface transition-all duration-150"
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
      </svg>
      View Docs
    </a>
  )
}
