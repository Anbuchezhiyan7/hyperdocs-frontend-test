'use client'

import React from 'react'
import { IconGitHubFill } from '@/components/shared/icons/IconGitHubFill'

interface GithubUnconnectedProps {
  onConnect: () => void
}

export function GithubUnconnected({ onConnect }: GithubUnconnectedProps) {
  return (
    <div className="flex-1 w-full min-h-screen bg-hd-bg-soft/40 p-6 md:p-10 text-hd-text overflow-y-auto relative flex flex-col justify-center items-center">
      {/* Background decoration */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-hd-accent/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-hd-accent/3 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-[560px] bg-hd-bg rounded-[32px] border border-hd-border p-10 flex flex-col items-center text-center shadow-xl relative overflow-hidden z-10">
        {/* Subtle background glow */}
        <div className="absolute -top-[120px] left-[50%] -translate-x-[50%] w-[240px] h-[240px] rounded-full bg-hd-accent/10 blur-3xl pointer-events-none" />

        {/* Icon badge */}
        <div className="w-16 h-16 rounded-2xl bg-hd-surface border border-hd-border-soft flex items-center justify-center mb-6 shadow-md">
          <IconGitHubFill className="w-9 h-9 text-hd-text/80" />
        </div>

        <h2 className="text-2xl font-black tracking-tight text-hd-text mb-3">GitHub Account Not Connected</h2>
        <p className="text-sm text-hd-muted max-w-[400px] leading-relaxed mb-8">
          Please connect your GitHub account under Git Integration to sync repositories and review codebase modifications.
        </p>

        {/* Connect button */}
        <button
          onClick={onConnect}
          className="flex items-center gap-2.5 h-12 px-8 rounded-xl bg-hd-accent hover:bg-hd-accent-hover text-white text-[0.92rem] font-bold transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] select-none"
        >
          <IconGitHubFill width={18} height={18} className="fill-white text-white" />
          Connect GitHub
        </button>
      </div>
    </div>
  )
}
