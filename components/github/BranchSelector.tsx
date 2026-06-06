'use client'

import React, { useState, useMemo } from 'react'
import type { GithubBranch } from '@/lib/types/github'
import { IconSearchSm } from '@/components/shared/icons/IconSearch'
import { IconBranch } from '@/components/shared/icons/IconBranch'

interface BranchSelectorProps {
  branches: GithubBranch[]
  onSelect: (branchName: string) => void
  onBack: () => void
  isLoading?: boolean
  repoName: string
}

export function BranchSelector({ branches, onSelect, onBack, isLoading, repoName }: BranchSelectorProps) {
  const [query, setQuery] = useState('')
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return branches.filter((b) => b.name.toLowerCase().includes(q))
  }, [branches, query])

  const handleSelect = (branchName: string) => {
    setSelectedBranch(branchName)
    onSelect(branchName)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="relative flex items-center justify-between pb-2 border-b border-hd-border">
        <button
          onClick={onBack}
          disabled={isLoading}
          className="flex items-center gap-1.5 text-[0.8rem] text-hd-muted hover:text-hd-text transition-colors border-none bg-transparent cursor-pointer p-0 disabled:opacity-50"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </button>
        <span className="text-[0.78rem] font-bold text-hd-muted max-w-[200px] truncate">
          {repoName}
        </span>
      </div>

      <div className="text-center">
        <h3 className="text-[1.05rem] font-bold text-hd-text mb-1">Select Branch</h3>
        <p className="text-[0.8rem] text-hd-muted">Pick a branch to generate documentation from</p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <IconSearchSm width={14} height={14} className="text-hd-muted" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search branches…"
          className="w-full pl-9 pr-4 py-2 text-[0.85rem] border border-hd-border rounded-lg bg-hd-surface text-hd-text placeholder-hd-muted/60 focus:outline-none focus:ring-2 focus:ring-hd-accent/20 focus:border-hd-accent transition-all"
        />
      </div>

      {/* Branch List */}
      <div className="flex flex-col gap-1.5 max-h-[220px] overflow-y-auto pr-1">
        {filtered.length === 0 ? (
          <div className="text-center py-6 text-[0.82rem] text-hd-muted">
            No branches found
          </div>
        ) : (
          filtered.map((branch) => (
            <button
              key={branch.name}
              onClick={() => handleSelect(branch.name)}
              disabled={isLoading}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg border transition-all duration-150 cursor-pointer group ${
                selectedBranch === branch.name
                  ? 'border-hd-accent bg-hd-accent-light'
                  : 'border-hd-border bg-hd-bg-soft hover:border-hd-border-soft hover:bg-hd-surface'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="shrink-0 text-hd-muted">
                  <IconBranch width={14} height={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[0.82rem] font-semibold text-hd-text truncate">
                      {branch.name}
                    </span>
                    {branch.is_default && (
                      <span className="text-[0.6rem] font-bold px-1.5 py-0.5 rounded bg-green-50 border border-green-100 text-green-600 dark:bg-hd-green-bg/20 dark:border-hd-green-bg/40 dark:text-green-400 shrink-0">
                        Default
                      </span>
                    )}
                    {branch.protected && (
                      <span className="text-[0.6rem] font-bold px-1.5 py-0.5 rounded bg-amber-50 border border-amber-100 text-amber-600 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400 shrink-0">
                        Protected
                      </span>
                    )}
                  </div>
                </div>
                {selectedBranch === branch.name && (
                  <div className="shrink-0">
                    <div className="w-4.5 h-4.5 rounded-full bg-hd-accent flex items-center justify-center">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </button>
          ))
        )}
      </div>

      {isLoading && (
        <div className="flex items-center justify-center gap-2 py-1.5">
          <svg className="animate-spin w-4 h-4 text-hd-accent" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-[0.82rem] text-hd-muted">Connecting repository…</span>
        </div>
      )}
    </div>
  )
}
