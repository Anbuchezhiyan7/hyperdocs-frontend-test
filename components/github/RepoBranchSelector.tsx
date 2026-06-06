'use client'

import React, { useState, useMemo } from 'react'
import type { RepoWithBranches } from '@/lib/hooks/useGithubConnection'
import type { ConnectRepoPayload } from '@/lib/types/github'
import { IconGitHubFill } from '@/components/shared/icons/IconGitHubFill'
import { IconBranch } from '@/components/shared/icons/IconBranch'
import { IconSearchSm } from '@/components/shared/icons/IconSearch'

interface RepoBranchSelectorProps {
  reposWithBranches: RepoWithBranches[]
  onSelectBranch: (repoId: number, branch: string) => void
  onSubmit: (payload: ConnectRepoPayload[]) => void
  isSubmitting?: boolean
}

export function RepoBranchSelector({
  reposWithBranches,
  onSelectBranch,
  onSubmit,
  isSubmitting,
}: RepoBranchSelectorProps) {
  const [query, setQuery] = useState('')
  const [selectedRepoId, setSelectedRepoId] = useState<number | null>(null)

  // Set default selected repository
  React.useEffect(() => {
    if (reposWithBranches.length > 0 && !selectedRepoId) {
      setSelectedRepoId(reposWithBranches[0].repo.id)
    }
  }, [reposWithBranches, selectedRepoId])

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    if (!q) return reposWithBranches
    return reposWithBranches.filter(
      ({ repo }) =>
        repo.name.toLowerCase().includes(q) ||
        repo.full_name.toLowerCase().includes(q)
    )
  }, [reposWithBranches, query])

  const selectedRepo = reposWithBranches.find(rwb => rwb.repo.id === selectedRepoId)

  // Validation: the selected repo must have a branch selected
  const isValid = !!selectedRepo && !selectedRepo.isLoadingBranches && !!selectedRepo.selectedBranch

  const handleSubmit = () => {
    if (!isValid || isSubmitting || !selectedRepo) return
    const payload: ConnectRepoPayload[] = [{
      repo_id: selectedRepo.repo.id,
      full_name: selectedRepo.repo.full_name,
      repo_name: selectedRepo.repo.name,
      default_branch: selectedRepo.selectedBranch,
    }]
    onSubmit(payload)
  }

  const allLoading = reposWithBranches.every((r) => r.isLoadingBranches)

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 mb-3">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-[1.05rem] font-bold text-hd-text mb-1">GitHub Connected!</h3>
        <p className="text-[0.8rem] text-hd-muted">
          Select a repository and its branch to generate documentation
        </p>
      </div>

      {/* Search */}
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

      {/* Repo + branch list */}
      <div className="flex flex-col gap-2 max-h-[280px] overflow-y-auto pr-0.5">
        {allLoading ? (
          <div className="flex items-center justify-center gap-2 py-8">
            <svg className="animate-spin w-4 h-4 text-hd-accent" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="text-[0.82rem] text-hd-muted">Loading repositories…</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-6 text-[0.82rem] text-hd-muted">
            No repositories found
          </div>
        ) : (
          filtered.map(({ repo, branches, selectedBranch, isLoadingBranches, branchError }) => {
            const isSelected = selectedRepoId === repo.id
            return (
              <div
                key={repo.id}
                className={`rounded-xl border bg-hd-bg-soft overflow-hidden transition-all ${
                  isSelected ? 'border-hd-accent shadow-sm' : 'border-hd-border'
                }`}
              >
                {/* Repo info row */}
                <div
                  className={`flex items-center gap-3 px-3.5 py-3 cursor-pointer select-none ${
                    isSelected ? 'bg-hd-accent/5' : ''
                  }`}
                  onClick={() => setSelectedRepoId(repo.id)}
                >
                  {/* Radio button */}
                  <div className="shrink-0 flex items-center justify-center">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-hd-accent bg-hd-accent text-white scale-105'
                        : 'border-hd-border bg-hd-surface'
                    }`}>
                      {isSelected && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                  <div className="shrink-0 text-hd-text-soft">
                    <IconGitHubFill width={15} height={15} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[0.85rem] font-semibold text-hd-text truncate">
                        {repo.name}
                      </span>
                      {repo.private && (
                        <span className="text-[0.6rem] font-bold px-1.5 py-0.5 rounded border border-hd-border-soft bg-hd-surface text-hd-muted shrink-0">
                          Private
                        </span>
                      )}
                    </div>
                    <div className="text-[0.7rem] text-hd-muted truncate">
                      {repo.full_name}
                    </div>
                  </div>
                </div>

                {/* Branch picker row */}
                {isSelected && (
                  <div className="px-3.5 py-2.5 flex items-center gap-2 border-t border-hd-border/40">
                    <IconBranch width={13} height={13} className="text-hd-muted shrink-0" />
                    <span className="text-[0.75rem] text-hd-muted font-medium shrink-0">Branch:</span>

                    {isLoadingBranches ? (
                      <div className="flex items-center gap-1.5 ml-1">
                        <svg className="animate-spin w-3 h-3 text-hd-accent" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        <span className="text-[0.75rem] text-hd-muted">Loading…</span>
                      </div>
                    ) : branchError ? (
                      <span className="text-[0.75rem] text-red-500 ml-1">{branchError}</span>
                    ) : (
                      <div className="relative flex-1">
                        <select
                          value={selectedBranch}
                          onChange={(e) => onSelectBranch(repo.id, e.target.value)}
                          className="w-full appearance-none pl-2.5 pr-7 py-1.5 text-[0.8rem] font-medium rounded-lg border border-hd-border bg-hd-surface text-hd-text focus:outline-none focus:ring-2 focus:ring-hd-accent/20 focus:border-hd-accent transition-all cursor-pointer"
                        >
                          {branches.map((branch) => (
                            <option key={branch.name} value={branch.name}>
                              {branch.name}
                              {branch.protected ? ' 🔒' : ''}
                            </option>
                          ))}
                        </select>
                        {/* Chevron icon */}
                        <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-hd-muted">
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Summary count */}
      {selectedRepo && !allLoading && (
        <div className="flex items-center gap-1.5 px-0.5">
          <div className="w-1.5 h-1.5 rounded-full bg-hd-accent" />
          <span className="text-[0.75rem] text-hd-muted">
            1 repository will be connected
          </span>
        </div>
      )}

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={!isValid || isSubmitting || allLoading}
        className="w-full h-11 rounded-xl bg-hd-accent hover:bg-[#e05515] disabled:opacity-50 disabled:cursor-not-allowed text-white text-[0.88rem] font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-orange-500/10"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Connecting…
          </>
        ) : (
          <>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            Generate Documentation
          </>
        )}
      </button>
    </div>
  )
}
