'use client'

import React from 'react'
import type { GithubStatus, ConnectedRepo } from '@/lib/types/github'
import { IconGitHubFill } from '@/components/shared/icons/IconGitHubFill'
import { IconBranch } from '@/components/shared/icons/IconBranch'
import { IconUnlink } from '@/components/shared/icons/IconUnlink'

interface GithubConnectedProps {
  status: GithubStatus
  connectedRepo?: ConnectedRepo | null
  onDisconnect: () => void
  /** In dark admin context, pass isDark=true */
  isDark?: boolean
}

export function GithubConnected({ status, connectedRepo, onDisconnect, isDark = false }: GithubConnectedProps) {
  const cardClass = isDark
    ? 'border-hd-border bg-hd-surface rounded-xl p-4'
    : 'border border-slate-100 bg-white rounded-xl p-4 shadow-sm'

  const titleClass = isDark ? 'text-hd-text' : 'text-slate-800'
  const subtitleClass = isDark ? 'text-hd-muted' : 'text-slate-500'
  const badgeBg = isDark ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-green-50 border border-green-100 text-green-600'

  return (
    <div className={`flex flex-col gap-4 ${isDark ? '' : 'w-full'}`}>
      {/* Connected account */}
      <div className={`flex items-center gap-3 border ${cardClass}`}>
        <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] flex items-center justify-center shrink-0">
          <IconGitHubFill width={20} height={20} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className={`text-[0.88rem] font-bold ${titleClass} flex items-center gap-2`}>
            {status.github_username ?? 'GitHub'}
            <span className={`text-[0.65rem] font-bold px-2 py-0.5 rounded-full ${badgeBg}`}>
              ● Connected
            </span>
          </div>
          <div className={`text-[0.75rem] ${subtitleClass} mt-0.5`}>GitHub account linked</div>
        </div>
        <button
          onClick={onDisconnect}
          className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[0.78rem] font-semibold transition-all border cursor-pointer ${
            isDark
              ? 'border-hd-border text-hd-muted hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 bg-transparent'
              : 'border-slate-200 text-slate-500 hover:bg-red-50 hover:text-red-500 hover:border-red-200 bg-white'
          }`}
        >
          <IconUnlink width={13} height={13} />
          Disconnect
        </button>
      </div>

      {/* Connected repo */}
      {connectedRepo && (
        <div className={`flex items-start gap-3 border ${cardClass}`}>
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${isDark ? 'bg-hd-bg' : 'bg-slate-50'}`}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isDark ? 'text-hd-muted' : 'text-slate-500'}>
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className={`text-[0.85rem] font-semibold ${titleClass}`}>{connectedRepo.repo_name}</div>
            <div className={`text-[0.72rem] ${subtitleClass} mt-0.5 flex items-center gap-1.5`}>
              <IconBranch width={11} height={11} />
              {connectedRepo.default_branch}
              <span className="opacity-40">·</span>
              <span className="truncate">{connectedRepo.full_name}</span>
            </div>
            {connectedRepo.last_generated_at && (
              <div className={`text-[0.68rem] mt-1 ${subtitleClass} opacity-70`}>
                Last generated: {new Date(connectedRepo.last_generated_at).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
