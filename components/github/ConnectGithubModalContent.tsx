'use client'

import React from 'react'
import { IconGitHubFill } from '@/components/shared/icons/IconGitHubFill'
import { IconShield } from '@/components/shared/icons/IconShield'

interface ConnectGithubModalContentProps {
  onConnect: () => void
  isLoading?: boolean
}

const FEATURES = [
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    text: 'Auto-generate documentation from your codebase',
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 3 21 3 21 8" />
        <line x1="4" y1="20" x2="21" y2="3" />
        <polyline points="21 16 21 21 16 21" />
        <line x1="15" y1="15" x2="21" y2="21" />
      </svg>
    ),
    text: 'Sync documentation updates when PRs are merged',
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    text: 'View your latest releases and changelog entries',
  },
]

export function ConnectGithubModalContent({ onConnect, isLoading }: ConnectGithubModalContentProps) {
  return (
    <div className="flex flex-col items-center">
      {/* GitHub logo badge */}
      <div className="w-16 h-16 rounded-2xl bg-hd-surface border border-hd-border flex items-center justify-center mb-5 shadow-sm">
        <IconGitHubFill width={36} height={36} className="text-hd-text" />
      </div>

      {/* Title */}
      <h2 className="text-[1.35rem] font-bold text-hd-text mb-2 text-center leading-tight">
        Connect GitHub
      </h2>

      {/* Subtitle */}
      <p className="text-[0.875rem] text-hd-muted text-center leading-relaxed max-w-[300px] mb-6">
        Let Hyperdocs understand your product and auto-generate docs when things change.
      </p>

      {/* Feature list */}
      <div className="w-full border border-hd-border rounded-xl bg-hd-bg-soft/60 px-4 py-3 mb-6">
        <p className="text-[0.7rem] font-bold text-hd-muted uppercase tracking-widest mb-3 flex items-center gap-1.5">
          <IconGitHubFill width={11} height={11} className="text-hd-muted" />
          This will let Hyperdocs
        </p>
        <div className="flex flex-col gap-4.5">
          {FEATURES.map((f, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="mt-px text-hd-muted shrink-0">{f.icon}</span>
              <span className="text-[0.82rem] text-hd-text-soft leading-snug">{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={onConnect}
        disabled={isLoading}
        className="w-full h-12 rounded-xl bg-[#f26522] hover:bg-[#e05515] disabled:opacity-60 disabled:cursor-not-allowed text-white text-[0.9rem] font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-orange-500/10"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Opening GitHub…
          </>
        ) : (
          <>
            <IconGitHubFill width={16} height={16} />
            Connect GitHub
          </>
        )}
      </button>

      {/* Security note */}
      <div className="flex items-center gap-2 mt-4">
        <span className="text-[0.72rem] text-hd-muted font-medium">Encrypted, disconnect anytime</span>
        <span className="text-hd-muted-light/60">·</span>
        <button className="text-[0.72rem] text-hd-muted font-medium underline underline-offset-2 hover:text-hd-text transition-colors bg-transparent border-none cursor-pointer p-0">
          Read our security policy
        </button>
      </div>
    </div>
  )
}
