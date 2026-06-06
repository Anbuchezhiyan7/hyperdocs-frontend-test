'use client'

import React from 'react'
import type { JobStatusResponse, JobStatus } from '@/lib/types/github'

interface DocGenerationProgressProps {
  jobStatus: JobStatusResponse | null
}

type StepDef = {
  statuses: JobStatus[]
  label: string
  description: string
  icon: React.ReactNode
}

const STEPS: StepDef[] = [
  {
    statuses: ['pending'],
    label: 'Job queued',
    description: 'Your request has been received and is waiting to start',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    statuses: ['analyzing'],
    label: 'Reading repository',
    description: 'Scanning file tree, parsing code structure from GitHub',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    statuses: ['generating'],
    label: 'Writing documentation',
    description: 'Sending code to AI, generating structured documentation pages',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    statuses: ['saving'],
    label: 'Saving documents',
    description: 'Persisting documentation to the database',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
        <polyline points="17 21 17 13 7 13 7 21" />
        <polyline points="7 3 7 8 15 8" />
      </svg>
    ),
  },
  {
    statuses: ['completed'],
    label: 'Documentation ready!',
    description: 'All pages have been generated successfully',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
]

const STATUS_ORDER: JobStatus[] = ['pending', 'analyzing', 'generating', 'saving', 'completed']

function getStepState(step: StepDef, currentStatus: JobStatus): 'done' | 'active' | 'idle' | 'error' {
  if (currentStatus === 'failed') return 'idle'
  const currentIdx = STATUS_ORDER.indexOf(currentStatus)
  const stepIdx = STATUS_ORDER.indexOf(step.statuses[0])
  if (stepIdx < currentIdx) return 'done'
  if (step.statuses.includes(currentStatus)) return 'active'
  return 'idle'
}

export function DocGenerationProgress({ jobStatus }: DocGenerationProgressProps) {
  const currentStatus = jobStatus?.status ?? 'pending'
  const progress = jobStatus?.progress ?? 0
  const isFailed = currentStatus === 'failed'
  const isCompleted = currentStatus === 'completed'

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="text-center">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 border ${
          isFailed
            ? 'bg-red-50 border-red-100 dark:bg-red-500/10 dark:border-red-500/20'
            : 'bg-orange-50 border-orange-100 dark:bg-hd-accent-light dark:border-hd-accent-mid'
        }`}>
          {isFailed ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--hd-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          )}
        </div>
        <h3 className="text-[1.05rem] font-bold text-hd-text mb-1">
          {isFailed ? 'Generation Failed' : isCompleted ? 'Docs Generated!' : 'Generating Documentation'}
        </h3>
        <p className="text-[0.78rem] text-hd-muted">
          {jobStatus?.message ?? 'Processing…'}
        </p>
      </div>

      {/* Progress bar */}
      {!isFailed && (
        <div className="w-full">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[0.7rem] text-hd-muted font-medium capitalize">{currentStatus}</span>
            <span className="text-[0.7rem] font-bold text-hd-text-soft tabular-nums">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-hd-surface rounded-full overflow-hidden border border-hd-border-soft">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                isCompleted
                  ? 'bg-gradient-to-r from-green-400 to-green-500'
                  : 'animate-progress-stripe'
              }`}
              style={{ width: `${isCompleted ? 100 : Math.max(progress, 4)}%` }}
            />
          </div>
        </div>
      )}

      {/* Step list */}
      <div className="flex flex-col gap-1.5">
        {STEPS.map((step, i) => {
          const state = getStepState(step, currentStatus)
          return (
            <div
              key={i}
              className={`flex items-start gap-3 px-3 py-2.5 rounded-lg border transition-all duration-300 ${
                state === 'active'
                  ? 'bg-orange-50/60 border-orange-100/50 dark:bg-hd-accent-light dark:border-hd-accent-mid/30 text-hd-text'
                  : state === 'done'
                  ? 'bg-hd-bg-soft/40 border-transparent text-hd-text-soft'
                  : 'opacity-40 border-transparent text-hd-muted'
              }`}
            >
              {/* Step icon circle */}
              <div
                className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5 transition-colors duration-300 ${
                  state === 'done'
                    ? 'bg-green-500 text-white'
                    : state === 'active'
                    ? 'bg-hd-accent text-white'
                    : 'bg-hd-surface text-hd-muted border border-hd-border-soft'
                }`}
              >
                {state === 'done' ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : state === 'active' ? (
                  <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-30" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <span className="text-[0.65rem] font-bold">{i + 1}</span>
                )}
              </div>

              {/* Step text */}
              <div className="flex-1 min-w-0">
                <div className={`text-[0.82rem] font-semibold transition-colors ${
                  state === 'active'
                    ? 'text-orange-700 dark:text-hd-accent'
                    : state === 'done'
                    ? 'text-hd-text-soft'
                    : 'text-hd-muted'
                }`}>
                  {step.label}
                  {state === 'active' && (
                    <span className="ml-2 inline-flex items-center gap-0.5">
                      <span className="w-1 h-1 rounded-full bg-hd-accent animate-bounce [animation-delay:0ms]" />
                      <span className="w-1 h-1 rounded-full bg-hd-accent animate-bounce [animation-delay:150ms]" />
                      <span className="w-1 h-1 rounded-full bg-hd-accent animate-bounce [animation-delay:300ms]" />
                    </span>
                  )}
                </div>
                {state !== 'idle' && (
                  <div className={`text-[0.72rem] mt-0.5 leading-snug ${
                    state === 'active' ? 'text-orange-600/80 dark:text-hd-accent/80' : 'text-hd-muted'
                  }`}>
                    {step.description}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Error message */}
      {isFailed && jobStatus?.error && (
        <div className="px-3.5 py-2.5 rounded-lg bg-red-50 border border-red-100 dark:bg-red-500/10 dark:border-red-500/20">
          <p className="text-[0.8rem] text-red-600 dark:text-red-400 font-medium">Error: {jobStatus.error}</p>
        </div>
      )}
    </div>
  )
}
