'use client'

import React, { useEffect } from 'react'
import { ConnectGithubModalContent } from './ConnectGithubModalContent'
import { GithubWaitingState } from './GithubWaitingState'
import { RepoBranchSelector } from './RepoBranchSelector'
import { DocGenerationProgress } from './DocGenerationProgress'
import { useGithubConnection } from '@/lib/hooks/useGithubConnection'

interface GithubFlowStepperProps {
  onComplete?: () => void
  onReset?: () => void
  lightMode?: boolean
  onStepChange?: (step: string) => void
}

export function GithubFlowStepper({ onComplete, onReset, onStepChange }: GithubFlowStepperProps) {
  const {
    step,
    reposWithBranches,
    connectedRepo,
    jobStatus,
    errorMsg,
    countdown,
    isSubmitting,
    isInitializing,
    startConnect,
    selectBranchForRepo,
    connectRepos,
    reset,
    pauseTimers,
  } = useGithubConnection(onComplete)

  useEffect(() => {
    onStepChange?.(step)
  }, [step, onStepChange])

  // On unmount, only stop timers — do NOT clear persistence so state survives navigation/reload
  useEffect(() => () => pauseTimers(), [pauseTimers])

  const handleReset = () => {
    reset()
    onReset?.()
  }

  // ── Initializing: check persisted state ────────────────────────────────────
  if (isInitializing) {
    return (
      <div className="flex flex-col items-center justify-center py-10 gap-3">
        <svg className="animate-spin w-6 h-6 text-hd-accent" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <span className="text-[0.82rem] text-hd-muted">Resuming your setup…</span>
      </div>
    )
  }

  // ── Success state ──────────────────────────────────────────────────────────
  if (step === 'success') {
    return (
      <div className="flex flex-col items-center py-4">
        <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-5">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-[1.2rem] font-bold mb-2 text-center text-hd-text">
          Documentation generated!
        </h3>
        <p className="text-[0.85rem] text-center leading-relaxed max-w-[280px] mb-2 text-hd-muted">
          {connectedRepo
            ? `${connectedRepo.repo_name} docs are ready. You can now access them in the dashboard.`
            : 'Your documentation is ready in the dashboard.'}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-[0.75rem] font-semibold text-green-600 dark:text-green-400">
            All pages generated successfully
          </span>
        </div>
      </div>
    )
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (step === 'error') {
    return (
      <div className="flex flex-col items-center py-4">
        <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 dark:bg-red-500/10 dark:border-red-500/20 flex items-center justify-center mb-4">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>
        <h3 className="text-[1.05rem] font-bold mb-2 text-center text-hd-text">
          Something went wrong
        </h3>
        <p className="text-[0.82rem] text-center leading-relaxed max-w-[280px] mb-5 text-hd-muted">
          {errorMsg ?? 'An unexpected error occurred.'}
        </p>
        <button
          onClick={handleReset}
          className="px-6 py-2.5 rounded-xl bg-hd-text text-hd-bg text-[0.85rem] font-semibold cursor-pointer hover:opacity-90 transition-colors"
        >
          Try again
        </button>
      </div>
    )
  }

  // ── Doc generation / connecting ────────────────────────────────────────────
  if (step === 'generating' || step === 'connecting') {
    return <DocGenerationProgress jobStatus={step === 'connecting' ? null : jobStatus} />
  }

  // ── Repo + branch selection ────────────────────────────────────────────────
  if (step === 'select-repo') {
    return (
      <RepoBranchSelector
        reposWithBranches={reposWithBranches}
        onSelectBranch={selectBranchForRepo}
        onSubmit={connectRepos}
        isSubmitting={isSubmitting}
      />
    )
  }

  // ── Waiting for GitHub ─────────────────────────────────────────────────────
  if (step === 'waiting') {
    return <GithubWaitingState countdown={countdown} />
  }

  // ── Idle / opening ─────────────────────────────────────────────────────────
  return (
    <ConnectGithubModalContent
      onConnect={startConnect}
      isLoading={step === 'opening'}
    />
  )
}
