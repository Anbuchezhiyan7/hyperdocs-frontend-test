'use client'

import React from 'react'
import { IconGitHubFill } from '@/components/shared/icons/IconGitHubFill'

interface GithubWaitingStateProps {
  countdown: number // seconds remaining
}

const WAITING_STEPS = [
  'Authorize the GitHub App',
  'Select repository access',
  'Complete installation',
]

export function GithubWaitingState({ countdown }: GithubWaitingStateProps) {
  return (
    <div className="flex flex-col items-center py-2">
      {/* Animated GitHub icon */}
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-2xl bg-hd-surface border border-hd-border flex items-center justify-center">
          <IconGitHubFill width={32} height={32} className="text-hd-text" />
        </div>
        {/* Ripple effect */}
        <span className="absolute -inset-1.5 rounded-[20px] border border-hd-accent/20 animate-ping" />
      </div>

      <h3 className="text-[1.1rem] font-bold text-hd-text mb-1.5">Waiting for GitHub</h3>
      <p className="text-[0.82rem] text-hd-muted text-center leading-relaxed max-w-[260px] mb-5">
        Complete the GitHub App installation in the new tab. We&apos;ll detect it automatically.
      </p>

      {/* Steps */}
      <div className="w-full border border-hd-border rounded-xl bg-hd-bg-soft/60 px-4 py-3 mb-5">
        <p className="text-[0.7rem] font-bold text-hd-muted uppercase tracking-widest mb-2.5">
          Steps in GitHub
        </p>
        <div className="flex flex-col gap-2">
          {WAITING_STEPS.map((step, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full border-2 border-hd-border flex items-center justify-center shrink-0">
                <span className="text-[0.6rem] font-bold text-hd-muted">{i + 1}</span>
              </div>
              <span className="text-[0.8rem] text-hd-text-soft">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Connection Indicator */}
      <div className="flex items-center justify-center gap-2.5 py-2 mt-2">
        <svg className="animate-spin w-4 h-4 text-hd-accent" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <span className="text-[0.85rem] font-semibold text-hd-text-soft">Configure the GitHub</span>
      </div>
    </div>
  )
}
