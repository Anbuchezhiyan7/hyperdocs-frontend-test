'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import {
  apiGetGithubStatus,
  apiGetGithubConnectUrl,
  apiGetAvailableRepos,
  apiConnectRepo,
  apiGenerateDocs,
  apiGetJobStatus,
  apiGetDocuments,
  apiDisconnectGithub,
  apiGetRepoBranches,
} from '@/lib/api/github'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import type {
  GithubStatus,
  GithubRepository,
  ConnectedRepo,
  JobStatusResponse,
  GithubBranch,
  ConnectRepoPayload,
} from '@/lib/types/github'

export type FlowStep =
  | 'idle'
  | 'opening'
  | 'waiting'
  | 'select-repo'
  | 'connecting'
  | 'generating'
  | 'success'
  | 'error'

export interface RepoWithBranches {
  repo: GithubRepository
  branches: GithubBranch[]
  selectedBranch: string
  isLoadingBranches: boolean
  branchError: string | null
}

// ── Persistence keys ──────────────────────────────────────────────────────────
const SK_STEP = 'hd_github_flow_step'
const SK_JOB_ID = 'hd_github_flow_job_id'
const SK_SELECTIONS = 'hd_github_branch_selections' // JSON: Record<number, string>

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw !== null ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}
function writeStorage(key: string, value: unknown) {
  if (typeof window === 'undefined') return
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* noop */ }
}
function clearFlowStorage() {
  if (typeof window === 'undefined') return
    ;[SK_STEP, SK_JOB_ID, SK_SELECTIONS].forEach((k) => localStorage.removeItem(k))
}

const POLL_INTERVAL_MS = 10_000
const MAX_WAIT_MS = 10 * 60_000

export function useGithubConnection(onComplete?: () => void) {
  const router = useRouter()
  const [step, _setStep] = useState<FlowStep>('idle')
  const [status, setStatus] = useState<GithubStatus | null>(null)
  const [reposWithBranches, setReposWithBranches] = useState<RepoWithBranches[]>([])
  const [connectedRepos, setConnectedRepos] = useState<ConnectedRepo[]>([])
  const [jobStatus, setJobStatus] = useState<JobStatusResponse | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [countdown, setCountdown] = useState(600)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true) // suppress UI flicker on load

  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const countdownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const jobPollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef<number>(0)

  // Wrap setStep to also persist
  const setStep = useCallback((s: FlowStep) => {
    _setStep(s)
    writeStorage(SK_STEP, s)
  }, [])

  // ── Helpers ─────────────────────────────────────────────────────────────────

  const stopTimers = useCallback(() => {
    if (pollTimerRef.current) clearInterval(pollTimerRef.current)
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current)
    if (jobPollTimerRef.current) clearInterval(jobPollTimerRef.current)
    pollTimerRef.current = null
    countdownTimerRef.current = null
    jobPollTimerRef.current = null
  }, [])

  const setError = useCallback((msg: string) => {
    stopTimers()
    setErrorMsg(msg)
    setStep('error')
  }, [stopTimers, setStep])

  const handleSuccess = useCallback(async (userId?: string) => {
    stopTimers()
    if (userId) {
      await apiGetDocuments(userId).catch(() => { })
    }
    clearFlowStorage()
    setStep('success')
    toast.success('Documentation generated successfully!', {
      position: 'top-right',
      autoClose: 3000,
    })
    onComplete?.()
    router.push('/admin/editor')
  }, [stopTimers, setStep, onComplete, router])

  // ── Load repos + branches in parallel (restoring saved selections) ────────────

  const loadReposWithBranches = useCallback(async (savedSelections?: Record<number, string>) => {
    const reposRes = await apiGetAvailableRepos()
    if (!reposRes.success || !reposRes.data) {
      setError(reposRes.error ?? 'Failed to load repositories')
      return
    }

    const repos = reposRes.data

    // Seed with loading placeholders
    const initial: RepoWithBranches[] = repos.map((repo) => ({
      repo,
      branches: [],
      selectedBranch: savedSelections?.[repo.id] ?? repo.default_branch,
      isLoadingBranches: true,
      branchError: null,
    }))
    setReposWithBranches(initial)
    setStep('select-repo')

    // Fetch branches in parallel
    await Promise.all(
      repos.map(async (repo, idx) => {
        const branchRes = await apiGetRepoBranches(repo.id)
        setReposWithBranches((prev) => {
          const next = [...prev]
          if (branchRes.success && branchRes.data && branchRes.data.length > 0) {
            // Honor saved selection if it still exists; otherwise pick the default
            const saved = savedSelections?.[repo.id]
            const validSaved = saved && branchRes.data.some((b) => b.name === saved)
            const defaultBranch = validSaved
              ? saved
              : (branchRes.data.find((b) => b.is_default)?.name ?? repo.default_branch)
            next[idx] = {
              ...next[idx],
              branches: branchRes.data,
              selectedBranch: defaultBranch,
              isLoadingBranches: false,
            }
          } else {
            next[idx] = {
              ...next[idx],
              isLoadingBranches: false,
              branchError: branchRes.error ?? 'Could not load branches',
            }
          }
          return next
        })
      })
    )
  }, [setError, setStep])

  // ── Resume job polling from a persisted jobId ─────────────────────────────────

  const resumeJobPolling = useCallback(async (jobId: string) => {
    setStep('generating')

    // Fetch once immediately to get current status
    const initial = await apiGetJobStatus(jobId)
    if (initial.success && initial.data) {
      setJobStatus(initial.data)
      if (initial.data.status === 'completed') {
        await handleSuccess(initial.data.user_id)
        return
      }
      if (initial.data.status === 'failed') {
        clearFlowStorage()
        setError(initial.data.error ?? 'Documentation generation failed')
        return
      }
    }

    const doPoll = async () => {
      const res = await apiGetJobStatus(jobId)
      if (!res.success || !res.data) return
      setJobStatus(res.data)
      if (res.data.status === 'completed') {
        await handleSuccess(res.data.user_id)
      } else if (res.data.status === 'failed') {
        stopTimers()
        clearFlowStorage()
        setError(res.data.error ?? 'Documentation generation failed')
      }
    }

    jobPollTimerRef.current = setInterval(doPoll, POLL_INTERVAL_MS)
  }, [stopTimers, setError, setStep, handleSuccess])

  // ── On mount: restore persisted flow state ────────────────────────────────────

  useEffect(() => {
    let cancelled = false

    async function restore() {
      const savedStep = readStorage<FlowStep>(SK_STEP, 'idle')
      const savedJobId = readStorage<string | null>(SK_JOB_ID, null)
      const savedSelections = readStorage<Record<number, string>>(SK_SELECTIONS, {})

      // Check live GitHub connection status first
      const statusRes = await apiGetGithubStatus()
      const isConnected = statusRes.success && statusRes.data?.connected

      if (cancelled) return

      if (isConnected && statusRes.data) {
        setStatus(statusRes.data)
      }

      if (!isConnected) {
        // GitHub not connected — can't restore any in-progress step
        clearFlowStorage()
        _setStep('idle')
        setIsInitializing(false)
        return
      }

      // GitHub is connected — restore the appropriate step
      if (savedStep === 'select-repo' || savedStep === 'connecting') {
        // Re-fetch repos and branches, restoring saved selections
        await loadReposWithBranches(savedSelections)
      } else if (savedStep === 'generating' && savedJobId) {
        await resumeJobPolling(savedJobId)
      } else if (savedStep === 'waiting') {
        // GitHub is already connected (we just confirmed above), so skip
        // re-polling and go straight to repo/branch selection
        await loadReposWithBranches(savedSelections)
      } else if (savedStep === 'success') {
        _setStep('success')
      } else {
        // idle, error, opening — just go to idle
        _setStep('idle')
      }

      if (!cancelled) setIsInitializing(false)
    }

    restore()
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Step 1: Start connect flow ───────────────────────────────────────────────

  const startConnect = useCallback(async () => {
    setStep('opening')
    setErrorMsg(null)

    const urlRes = await apiGetGithubConnectUrl()
    if (!urlRes.success || !urlRes.data) {
      setError(urlRes.error ?? 'Failed to get GitHub connect URL')
      return
    }

    window.open(urlRes.data.redirect_url, '_blank')

    setStep('waiting')
    startTimeRef.current = Date.now()
    setCountdown(600)

    countdownTimerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
      const remaining = Math.max(0, 600 - elapsed)
      setCountdown(remaining)
      if (remaining === 0) {
        stopTimers()
        setError('GitHub connection timed out. Please try again.')
      }
    }, 1000)

    const doPoll = async () => {
      if (Date.now() - startTimeRef.current > MAX_WAIT_MS) {
        stopTimers()
        setError('GitHub connection timed out. Please try again.')
        return
      }
      const res = await apiGetGithubStatus()
      if (res.success && res.data?.connected) {
        stopTimers()
        setStatus(res.data)
        await loadReposWithBranches()
      }
    }

    doPoll()
    pollTimerRef.current = setInterval(doPoll, POLL_INTERVAL_MS)
  }, [stopTimers, setError, setStep, loadReposWithBranches])

  // ── Update selected branch for a single repo ──────────────────────────────────

  const selectBranchForRepo = useCallback((repoId: number, branchName: string) => {
    setReposWithBranches((prev) => {
      const next = prev.map((rwb) =>
        rwb.repo.id === repoId ? { ...rwb, selectedBranch: branchName } : rwb
      )
      // Persist updated selections
      const selections: Record<number, string> = {}
      next.forEach(({ repo, selectedBranch }) => { selections[repo.id] = selectedBranch })
      writeStorage(SK_SELECTIONS, selections)
      return next
    })
  }, [])

  // ── Generate docs ────────────────────────────────────────────────────────────

  const startGeneration = useCallback(async (userId: string) => {
    setStep('generating')
    const genRes = await apiGenerateDocs()
    if (!genRes.success || !genRes.data) {
      if ((genRes as any).status === 402) {
        toast.error('Upgrade plan to draft documents or continue using git sync', {
          position: 'top-right',
          autoClose: 6000,
        })
      }
      setError(genRes.error ?? 'Failed to start documentation generation')
      return
    }

    const jobId = genRes.data.job_id
    setJobStatus(genRes.data)
    writeStorage(SK_JOB_ID, jobId) // Persist job ID for reload recovery

    const doPoll = async () => {
      const res = await apiGetJobStatus(jobId)
      if (!res.success || !res.data) return
      setJobStatus(res.data)
      if (res.data.status === 'completed') {
        await handleSuccess(userId)
      } else if (res.data.status === 'failed') {
        stopTimers()
        clearFlowStorage()
        setError(res.data.error ?? 'Documentation generation failed')
      }
    }

    doPoll()
    jobPollTimerRef.current = setInterval(doPoll, POLL_INTERVAL_MS)
  }, [stopTimers, setError, setStep, handleSuccess])

  // ── Submit all selected repos ─────────────────────────────────────────────────

  const connectRepos = useCallback(async (payload: ConnectRepoPayload[]) => {
    setIsSubmitting(true)
    setStep('connecting')
    const res = await apiConnectRepo(payload)
    setIsSubmitting(false)
    if (!res.success || !res.data) {
      // Revert to select-repo so user can try again
      setStep('select-repo')
      setError(res.error ?? 'Failed to connect repositories')
      return
    }
    setConnectedRepos(res.data)

    const first = res.data[0]
    if (first) {
      await startGeneration(first.user_id)
    }
  }, [setError, setStep, startGeneration])

  // ── Disconnect ───────────────────────────────────────────────────────────────

  const disconnect = useCallback(async () => {
    const res = await apiDisconnectGithub()
    if (res.success) {
      clearFlowStorage()
      setStatus(null)
      setConnectedRepos([])
      setJobStatus(null)
      _setStep('idle')
    }
    return res.success
  }, [])

  const reset = useCallback(async () => {
    stopTimers()
    const savedSelections = readStorage<Record<number, string>>(SK_SELECTIONS, {})

    // Clear only job-specific storage, but KEEP connection and branch selections
    localStorage.removeItem(SK_JOB_ID)
    localStorage.removeItem(SK_STEP)

    setErrorMsg(null)
    setJobStatus(null)
    setIsSubmitting(false)

    // Check if we are connected, if so, go back to select-repo
    if (status?.connected) {
      await loadReposWithBranches(savedSelections)
    } else {
      clearFlowStorage()
      _setStep('idle')
      setReposWithBranches([])
    }
  }, [stopTimers, status, loadReposWithBranches])

  // ── Stop timers only (used on component unmount, preserves persistence) ───────

  const pauseTimers = useCallback(() => {
    stopTimers()
  }, [stopTimers])

  return {
    step,
    setStep,
    status,
    reposWithBranches,
    connectedRepos,
    connectedRepo: connectedRepos[0] ?? null,
    jobStatus,
    errorMsg,
    countdown,
    isSubmitting,
    isInitializing,
    checkStatus: useCallback(async () => {
      const res = await apiGetGithubStatus()
      if (res.success && res.data) { setStatus(res.data); return res.data }
      return null
    }, []),
    startConnect,
    selectBranchForRepo,
    connectRepos,
    disconnect,
    reset,
    pauseTimers,
  }
}
