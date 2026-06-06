'use client'

import React, { useState, useEffect, useRef } from 'react'
import { apiGetAvailableRepos, apiGetRepoCommits, apiGenerateRepoChanges, apiGetJobStatus, apiAcknowledgeChanges, apiGetGithubStatus } from '@/lib/api/github'
import type { GithubAnalyzeResponse } from '@/lib/types/github'
import { GitBranch, GitCommit, Play, Trash2, Loader2, RefreshCw, CheckCheck, AlertCircle } from 'lucide-react'
import { toast } from 'react-toastify'
import { formatCommitDate } from '@/components/github/github-helpers'
import { useGitSyncStore } from '@/lib/store/useGitSyncStore'
import { useRouter } from 'next/navigation'
import { GithubUnconnected } from '@/components/admin/github-unconnected'

export default function GitSyncPage() {
  const router = useRouter()
  const isFetchingRef = useRef(false)
  const [githubStatus, setGithubStatus] = useState<{ connected: boolean; github_username: string | null } | null>(null)
  const [data, setData] = useState<GithubAnalyzeResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [repoId, setRepoId] = useState<number | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeJobId, setActiveJobId] = useState<string | null>(null)
  const [jobProgress, setJobProgress] = useState<number>(0)
  const [jobMessage, setJobMessage] = useState<string>('')
  const [jobStatus, setJobStatus] = useState<string>('')
  const [showCompletedState, setShowCompletedState] = useState(false)
  const [jobBudgetReached, setJobBudgetReached] = useState(false)

  // Fetch repositories and commits
  const fetchSyncStatus = async (showToast = false) => {
    if (isFetchingRef.current) return
    isFetchingRef.current = true
    setIsLoading(true)
    try {
      const statusRes = await apiGetGithubStatus()
      if (statusRes.success && statusRes.data) {
        setGithubStatus(statusRes.data)
        if (!statusRes.data.connected) {
          setRepoId(null)
          setData(null)
          useGitSyncStore.getState().setPendingCommits(0)
          return
        }
      } else {
        setGithubStatus({ connected: false, github_username: null })
        setRepoId(null)
        setData(null)
        useGitSyncStore.getState().setPendingCommits(0)
        return
      }

      const repoRes = await apiGetAvailableRepos()
      if (repoRes.success && repoRes.data && repoRes.data.length > 0) {
        const repo = repoRes.data[0]
        setRepoId(repo.id)
        const commitsRes = await apiGetRepoCommits(repo.id, repo.default_branch)
        if (commitsRes.success && commitsRes.data) {
          setData(commitsRes.data)
          const totalCommitsCount = commitsRes.data.commits?.length ?? 0

          // Acknowledge changes if all commits are not doc-generatable
          if (
            totalCommitsCount > 0 &&
            commitsRes.data.commits.every((commit: any) => commit.is_doc_generatable === false)
          ) {
            apiAcknowledgeChanges(repo.id).then((ackRes) => {
              if (ackRes.success) {


              }
            })
          }

          // Update status in Zustand store
          useGitSyncStore.getState().setPendingCommits(totalCommitsCount)

          if (showToast) {
            if (totalCommitsCount > 0) {
              toast.success(`Found ${totalCommitsCount} pending commit(s).`, {
                position: 'top-right',
                autoClose: 3000,
              })
            } else {
              toast.info('No new updates. Codebase is up to date.', {
                position: 'top-right',
                autoClose: 2500,
              })
            }
          }
        } else {
          setData(null)
          useGitSyncStore.getState().setPendingCommits(0)
          if (showToast) {
            toast.error('Failed to retrieve commit history.', {
              position: 'top-right',
              autoClose: 3000,
            })
          }
        }
      } else {
        setRepoId(null)
        setData(null)
        useGitSyncStore.getState().setPendingCommits(0)
        if (showToast) {
          toast.info('No connected repositories to check.', {
            position: 'top-right',
            autoClose: 2500,
          })
        }
      }
    } catch (err) {
      console.error('Error fetching GitHub sync status:', err)
      setRepoId(null)
      setData(null)
      useGitSyncStore.getState().setPendingCommits(0)
      if (showToast) {
        toast.error('Error checking updates.', {
          position: 'top-right',
          autoClose: 3000,
        })
      }
    } finally {
      setIsLoading(false)
      isFetchingRef.current = false
    }
  }

  const handleGenerateDocs = async () => {
    if (!repoId) {
      toast.error('Repository ID not found. Cannot generate documentation.', {
        position: 'top-right',
        autoClose: 3000,
      })
      return
    }

    setIsGenerating(true)
    setJobProgress(0)
    setJobStatus('pending')
    setJobMessage('Queuing job...')
    setShowCompletedState(false)
    setJobBudgetReached(false)

    try {
      const res = await apiGenerateRepoChanges(repoId)
      if (res.success && res.data) {
        const job = res.data
        setActiveJobId(job.job_id)
        setJobProgress(job.progress)
        setJobStatus(job.status)
        setJobMessage(job.message || 'Job queued')

        toast.info('Documentation generation queued.', {
          position: 'top-right',
          autoClose: 3000,
        })
      } else {
        if ((res as any).status === 402) {
          toast.error('Upgrade plan to draft documents or continue using git sync', {
            position: 'top-right',
            autoClose: 6000,
          })
        } else {
          toast.error(res.error || 'Failed to start documentation generation.', {
            position: 'top-right',
            autoClose: 4000,
          })
        }
        setIsGenerating(false)
      }
    } catch (err) {
      console.error('Error generating docs:', err)
      toast.error('An unexpected error occurred.', {
        position: 'top-right',
        autoClose: 4000,
      })
      setIsGenerating(false)
    }
  }

  // Poll job status every 5 seconds when activeJobId is set
  useEffect(() => {
    if (!activeJobId) return

    let intervalId = setInterval(async () => {
      try {
        const res = await apiGetJobStatus(activeJobId)
        if (res.success && res.data) {
          const job = res.data
          setJobProgress(job.progress)
          setJobMessage(job.message || '')
          setJobStatus(job.status)

          if (job.status === 'completed' || job.progress >= 100) {
            if (repoId) {
              await apiAcknowledgeChanges(repoId)
            }
            const budgetReached = !!(job as any).token_usage?.budget_reached
            setJobBudgetReached(budgetReached)
            setShowCompletedState(true)
            clearInterval(intervalId)

            if (budgetReached) {
              toast.warning(job.message || 'Documentation partially generated — token budget reached.', {
                position: 'top-right',
                autoClose: 3000,
              })
            } else {
              toast.success(job.message || 'Documentation generation completed successfully!', {
                position: 'top-right',
                autoClose: 3000,
              })
            }

            setTimeout(() => {
              setIsGenerating(false)
              setActiveJobId(null)
              setShowCompletedState(false)
              fetchSyncStatus(false)
              router.push('/admin/editor')
            }, 3000)
          } else if (job.status === 'failed' || job.error) {
            toast.error(job.error || 'Documentation generation failed.', {
              position: 'top-right',
              autoClose: 4000,
            })
            setIsGenerating(false)
            setActiveJobId(null)
            clearInterval(intervalId)
          }
        } else {
          console.error('Failed to fetch job status:', res.error)
        }
      } catch (err) {
        console.error('Error fetching job status:', err)
      }
    }, 5000)

    return () => clearInterval(intervalId)
  }, [activeJobId, router])

  // Fetch status on initial mount
  useEffect(() => {
    fetchSyncStatus(false)
  }, [])

  const canGenerateDocs = data ? (data.is_doc_generatable || data.commits.some(commit => commit.is_doc_generatable === true)) : false
  const totalCommitsCount = data?.commits?.length ?? 0
  const isAllMinor = data && data.commits && data.commits.length > 0 && data.commits.every(commit => commit.is_doc_generatable === false)

  if (githubStatus && !githubStatus.connected) {
    return <GithubUnconnected onConnect={() => router.push('/admin/git-integration')} />
  }

  return (
    <div className="flex-1 w-full min-h-screen bg-hd-bg-soft/40 p-6 md:p-10 text-hd-text overflow-y-auto relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-hd-accent/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-hd-accent/3 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <GitBranch size={16} className="text-hd-accent animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider text-hd-accent">Git Synchronization</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-hd-text">
            Git Sync Studio
          </h1>
          <p className="text-hd-muted text-sm mt-1">
            Review codebase modifications, analyze documentation impact, and synchronize updates.
          </p>
        </div>

        <div>
          <button
            onClick={() => fetchSyncStatus(true)}
            disabled={isLoading || isGenerating}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-hd-border bg-hd-bg hover:bg-hd-surface text-hd-text text-sm font-semibold transition-all shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none"
          >
            <RefreshCw className={`w-4 h-4 shrink-0 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Checking...' : 'Check Updates'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 relative z-10">
        {isLoading && !data ? (
          /* Loading Skeleton */
          <div className="space-y-6 animate-pulse">
            <div className="p-6 rounded-2xl border border-hd-border bg-hd-bg flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 w-2/3">
                <div className="h-4 bg-hd-surface rounded w-1/4"></div>
                <div className="h-3 bg-hd-surface rounded w-3/4"></div>
              </div>
              <div className="h-10 bg-hd-surface rounded w-32 shrink-0"></div>
            </div>
            <div className="space-y-4">
              <div className="h-4 bg-hd-surface rounded w-32"></div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 rounded-2xl border border-hd-border bg-hd-bg/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-4 bg-hd-surface rounded w-1/3"></div>
                    <div className="h-4 bg-hd-surface rounded w-20"></div>
                  </div>
                  <div className="h-3 bg-hd-surface rounded w-1/4"></div>
                </div>
              ))}
            </div>
          </div>
        ) : data && totalCommitsCount > 0 ? (
          /* Main Content */
          <div className="space-y-6">
            {/* Status & Sync Panel */}
            <div className="p-6 rounded-[24px] border border-hd-border bg-hd-bg shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-2">
                    {/* <div className="w-2.5 h-2.5 rounded-full bg-hd-accent animate-ping"></div> */}
                    <h3 className="text-lg font-bold text-hd-text">
                      {isAllMinor ? 'Minor Updates Detected (No Sync Required)' : 'Updates Pending Synchronization'}
                    </h3>
                  </div>
                  {data.reason && (
                    <div className="flex flex-col gap-1 border-t border-hd-border/40 pt-2">
                      <span className="text-xs font-bold text-hd-muted uppercase tracking-wider">Analysis Reason</span>
                      <p className={`text-sm m-0 ${!data.is_doc_generatable ? 'line-through text-hd-muted opacity-60' : 'text-hd-text-soft'}`}>
                        {data.reason}
                      </p>
                    </div>
                  )}
                </div>

                {showCompletedState ? (
                  <div className={`w-full md:w-80 flex items-start gap-3 p-4 rounded-xl border transition-all duration-300 ${
                    jobBudgetReached 
                      ? 'bg-amber-500/10 border-amber-500/20 text-amber-800 dark:text-amber-200' 
                      : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-800 dark:text-emerald-200'
                  }`}>
                    {jobBudgetReached ? (
                      <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    ) : (
                      <CheckCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-bold m-0 leading-tight">
                        {jobBudgetReached ? 'Documentation Partially Generated' : 'Documentation Generated Successfully'}
                      </h5>
                      <p className="text-[10px] mt-1 mb-0 opacity-90 leading-relaxed font-normal">
                        {jobMessage || (jobBudgetReached ? 'Token budget limit reached.' : 'Documentation completed.')}
                      </p>
                      <span className="text-[9px] block mt-1.5 opacity-60 font-semibold uppercase tracking-wider">
                        Redirecting to editor...
                      </span>
                    </div>
                  </div>
                ) : isGenerating ? (
                  <div className="flex flex-col gap-2 w-full md:w-80 shrink-0 border border-hd-border bg-hd-bg-soft/40 p-4 rounded-xl">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-hd-accent animate-pulse flex items-center gap-1">
                        <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
                        {jobStatus === 'pending' ? 'Queued' : 'Generating...'}
                      </span>
                      <span className="text-hd-text">{jobProgress}%</span>
                    </div>
                    <div className="w-full bg-hd-border rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-hd-accent h-full transition-all duration-500 rounded-full"
                        style={{ width: `${jobProgress}%` }}
                      ></div>
                    </div>
                    {jobMessage && (
                      <span className="text-[10px] text-hd-muted truncate block" title={jobMessage}>
                        {jobMessage}
                      </span>
                    )}
                  </div>
                ) : (
                  canGenerateDocs && (
                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        onClick={() => {
                          toast.error('Reject action triggered (Simulation only).', {
                            position: 'top-right',
                            autoClose: 2000,
                          })
                        }}
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-hd-border text-xs font-semibold cursor-pointer text-hd-text-soft bg-hd-bg hover:bg-hd-surface hover:text-red-500 hover:border-red-500/30 transition-all shadow-sm select-none"
                      >
                        <Trash2 className="w-4 h-4" />
                        Reject Updates
                      </button>
                      <button
                        onClick={handleGenerateDocs}
                        disabled={isGenerating || isLoading}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-none text-xs font-bold cursor-pointer text-white bg-hd-accent hover:bg-hd-accent-hover shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all select-none disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        Generate Docs for Updated Codebase
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Commits List */}
            <div>
              <h2 className="text-sm font-bold text-hd-muted uppercase tracking-wider mb-4">
                {isAllMinor ? 'Skipped Commits' : 'Commits to Review'} ({totalCommitsCount})
              </h2>

              <div className="space-y-4">
                {data.commits.map((commit, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-hd-border bg-hd-bg hover:border-hd-border-soft hover:shadow-sm transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Left side */}
                      <div className="flex gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-hd-surface flex items-center justify-center shrink-0 border border-hd-border/80">
                          <GitCommit className="w-4 h-4 text-hd-accent" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-hd-text m-0 mb-1 leading-snug truncate">
                            {commit.message}
                          </h4>
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-hd-muted font-medium">
                            <span className="font-semibold text-hd-text-soft">@{commit.committed_by}</span>
                            <span>•</span>
                            <span>{formatCommitDate(commit.committed_at)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right side */}
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-[11px] font-mono font-bold bg-hd-surface px-2.5 py-1 rounded-lg border border-hd-border/60 text-hd-muted-light select-all">
                          {commit.commit_id.slice(0, 7)}
                        </span>
                        {commit.is_doc_generatable === false ? (
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-red-500 select-none">
                            Skipped
                          </span>
                        ) : (
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 select-none">
                            Doc Ready
                          </span>
                        )}
                      </div>
                    </div>

                    {commit.reason && (
                      <div className="mt-3 text-xs flex flex-col gap-0.5 border-t border-hd-border/40 pt-3">
                        <span className="font-bold text-hd-muted uppercase tracking-wider text-[10px]">Analysis Result</span>
                        <p className={`m-0 leading-relaxed ${commit.is_doc_generatable === false ? 'line-through text-hd-muted opacity-60' : 'text-hd-text-soft'}`}>
                          {commit.reason}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Empty / Fully Synced State */
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-hd-bg border border-hd-border rounded-[32px] text-center max-w-2xl mx-auto shadow-sm mt-8">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mb-6">
              <CheckCheck size={28} />
            </div>
            <h2 className="text-xl font-bold text-hd-text mb-2">Codebase Fully Synchronized</h2>
            <p className="text-sm text-hd-muted max-w-sm">
              No pending commit updates detected. Your documentation is in perfect sync with the connected repository branch.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
