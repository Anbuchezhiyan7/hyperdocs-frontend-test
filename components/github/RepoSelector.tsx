'use client'

import React, { useState, useMemo } from 'react'
import type { GithubRepository } from '@/lib/types/github'
import { IconSearchSm } from '@/components/shared/icons/IconSearch'
import { IconGitHubFill } from '@/components/shared/icons/IconGitHubFill'
import { IconBranch } from '@/components/shared/icons/IconBranch'

interface RepoSelectorProps {
  repos: GithubRepository[]
  onSelect: (repo: GithubRepository) => void
  isLoading?: boolean
}

export function RepoSelector({ repos, onSelect, isLoading }: RepoSelectorProps) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<GithubRepository | null>(null)

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return repos.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.full_name.toLowerCase().includes(q) ||
        (r.description ?? '').toLowerCase().includes(q)
    )
  }, [repos, query])

  const handleSelect = (repo: GithubRepository) => {
    setSelected(repo)
    onSelect(repo)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-hd-green-bg/20 border border-hd-green-bg/40 mb-3">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-[1.05rem] font-bold text-hd-text mb-1">GitHub Connected!</h3>
        <p className="text-[0.8rem] text-hd-muted">Choose a repository to generate documentation for</p>
      </div>

      {/* Search input */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <IconSearchSm width={14} height={14} className="text-hd-muted" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search repositories…"
          className="w-full pl-9 pr-4 py-2.5 text-[0.85rem] border border-hd-border rounded-lg bg-hd-surface text-hd-text placeholder-hd-muted/60 focus:outline-none focus:ring-2 focus:ring-hd-accent/20 focus:border-hd-accent transition-all"
        />
      </div>

      {/* Repo list */}
      <div className="flex flex-col gap-1.5 max-h-[220px] overflow-y-auto pr-1">
        {filtered.length === 0 ? (
          <div className="text-center py-6 text-[0.82rem] text-hd-muted">
            No repositories found
          </div>
        ) : (
          filtered.map((repo) => (
            <button
              key={repo.id}
              onClick={() => handleSelect(repo)}
              disabled={isLoading}
              className={`w-full text-left px-3.5 py-3 rounded-lg border transition-all duration-150 cursor-pointer group ${
                selected?.id === repo.id
                  ? 'border-hd-accent bg-hd-accent-light'
                  : 'border-hd-border bg-hd-bg-soft hover:border-hd-border-soft hover:bg-hd-surface'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0 text-hd-text-soft">
                  <IconGitHubFill width={16} height={16} className="currentColor" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[0.85rem] font-semibold text-hd-text truncate">
                      {repo.name}
                    </span>
                    {repo.private && (
                      <span className="text-[0.65rem] font-bold px-1.5 py-0.5 rounded bg-hd-surface text-hd-muted border border-hd-border-soft shrink-0">
                        Private
                      </span>
                    )}
                  </div>
                  <div className="text-[0.72rem] text-hd-muted mt-0.5 truncate">
                    {repo.full_name}
                  </div>
                  {repo.description && (
                    <div className="text-[0.75rem] text-hd-text-soft mt-1 line-clamp-1">
                      {repo.description}
                    </div>
                  )}
                  <div className="flex items-center gap-1 mt-1.5">
                    <IconBranch width={11} height={11} className="text-hd-muted" />
                    <span className="text-[0.7rem] text-hd-muted font-medium">
                      {repo.default_branch}
                    </span>
                  </div>
                </div>
                {selected?.id === repo.id && (
                  <div className="shrink-0 mt-0.5">
                    <div className="w-5 h-5 rounded-full bg-hd-accent flex items-center justify-center">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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
        <div className="flex items-center justify-center gap-2 py-2">
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
