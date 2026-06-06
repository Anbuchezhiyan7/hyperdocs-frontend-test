'use client'

import React, { useState, useEffect } from 'react'
import { Modal, ConfigProvider, theme as antdTheme } from 'antd'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/lib/theme-context'
import { apiGetAvailableRepos, apiGetRepoCommits, apiGenerateRepoChanges, apiGetJobStatus } from '@/lib/api/github'
import type { GithubAnalyzeResponse } from '@/lib/types/github'
import { GitBranch, GitCommit, Play, Trash2, Loader2, AlertCircle, CheckCheck } from 'lucide-react'
import { toast } from 'react-toastify'
import { formatCommitDate } from './github-helpers'

export function GithubSyncAlert() {
  const router = useRouter()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const [isOpen, setIsOpen] = useState(false)
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
  const fetchSyncStatus = async (autoOpen: boolean = false) => {
    setIsLoading(true)
    try {
      const repoRes = await apiGetAvailableRepos()
      if (repoRes.success && repoRes.data && repoRes.data.length > 0) {
        const repo = repoRes.data[0]
        setRepoId(repo.id)
        const commitsRes = await apiGetRepoCommits(repo.id, repo.default_branch)
        if (commitsRes.success && commitsRes.data) {
          setData(commitsRes.data)

          const totalCommitsCount = commitsRes.data.commits?.length ?? 0

          // Dispatch status to sidebar
          window.dispatchEvent(new CustomEvent('hd_github_sync_status', {
            detail: { totalCommits: totalCommitsCount }
          }))

          if (totalCommitsCount > 0) {
            if (autoOpen) {
              setIsOpen(true)
              toast.success(`Found ${totalCommitsCount} new commit(s). Sync modal loaded.`, {
                position: 'top-right',
                autoClose: 3000,
              })
            }
          } else {
            if (autoOpen) {
              toast.info('No new updates. Codebase is up to date.', {
                position: 'top-right',
                autoClose: 2500,
              })
            }
          }
        } else {
          setData(null)
          window.dispatchEvent(new CustomEvent('hd_github_sync_status', {
            detail: { totalCommits: 0 }
          }))
          if (autoOpen) {
            toast.error('Failed to retrieve commit history.', {
              position: 'top-right',
              autoClose: 3000,
            })
          }
        }
      } else {
        setRepoId(null)
        setData(null)
        window.dispatchEvent(new CustomEvent('hd_github_sync_status', {
          detail: { totalCommits: 0 }
        }))
        if (autoOpen) {
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
      window.dispatchEvent(new CustomEvent('hd_github_sync_status', {
        detail: { totalCommits: 0 }
      }))
      if (autoOpen) {
        toast.error('Error checking updates.', {
          position: 'top-right',
          autoClose: 3000,
        })
      }
    } finally {
      setIsLoading(false)
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
              setIsOpen(false)
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

  // Fetch status on initial mount and register listener for manual check trigger
  useEffect(() => {
    fetchSyncStatus(false)

    const handleManualCheck = () => {
      fetchSyncStatus(true)
    }

    const handleOpenModal = () => {
      setIsOpen(true)
    }

    window.addEventListener('hd_check_github_sync', handleManualCheck)
    window.addEventListener('hd_open_github_sync_modal', handleOpenModal)
    return () => {
      window.removeEventListener('hd_check_github_sync', handleManualCheck)
      window.removeEventListener('hd_open_github_sync_modal', handleOpenModal)
    }
  }, [])


  const canGenerateDocs = data ? (data.is_doc_generatable || data.commits.some(commit => commit.is_doc_generatable === true)) : false

  return (
    <>

      {/* Review Modal */}
      <ConfigProvider
        theme={{
          algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
          token: {
            borderRadius: 12,
            colorBgContainer: isDark ? '#111113' : '#ffffff',
            colorBgElevated: isDark ? '#18181c' : '#ffffff',
            colorText: isDark ? '#e5e5e5' : '#1a1a1a',
            colorTextSecondary: isDark ? '#aaaaaa' : '#666666',
            colorBorder: isDark ? '#26262a' : '#e8e8e8',
            fontFamily: 'var(--font-admin, sans-serif)',
          },
          components: {
            Modal: {
              headerBg: isDark ? '#18181c' : '#ffffff',
              contentBg: isDark ? '#18181c' : '#ffffff',
              footerBg: isDark ? '#18181c' : '#ffffff',
            },
          },
        }}
      >
        <Modal
          open={isOpen}
          onCancel={() => setIsOpen(false)}
          footer={null}
          width={900}
          centered
          styles={{
            body: {
              maxHeight: '75vh',
              overflowY: 'auto',
              paddingRight: '8px',
              paddingBottom: '24px',
            },
          }}
          title={
            <div className="flex items-center gap-2.5 pb-2 border-b border-hd-border pr-6">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-hd-accent-light border border-hd-accent-mid">
                <GitBranch className="w-4 h-4 text-hd-accent" />
              </div>
              <div>
                <h3 className="text-base font-bold text-hd-text m-0">
                  Review Pending Codebase Updates
                </h3>
                <p className="text-xs text-hd-muted m-0 font-normal">
                  Inspect codebase changes before updating generated documents
                </p>
              </div>
            </div>
          }
        >
          {data ? (
            <>
              {/* Action Row - Top of Modal */}
              <div className="sticky top-0 z-20 flex items-center justify-between gap-4 py-4 border-b border-hd-border bg-hd-bg/95 backdrop-blur-sm px-3 rounded-lg mt-3 mb-6 shadow-sm">
                {showCompletedState ? (
                  <div className={`w-full flex items-start gap-3 p-4 rounded-xl border transition-all duration-300 ${
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
                      <h5 className="text-sm font-bold m-0 leading-tight">
                        {jobBudgetReached ? 'Documentation Partially Generated' : 'Documentation Generated Successfully'}
                      </h5>
                      <p className="text-xs mt-1 mb-0 opacity-90 leading-relaxed font-normal">
                        {jobMessage || (jobBudgetReached ? 'Token budget limit reached.' : 'Documentation completed.')}
                      </p>
                      <span className="text-[10px] block mt-1.5 opacity-60 font-semibold uppercase tracking-wider">
                        Redirecting to editor...
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-xs text-hd-muted max-w-[55%]">
                      {data.reason ? (
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold text-hd-text">Analysis Reason:</span>
                          <span className={!data.is_doc_generatable ? 'line-through text-hd-muted opacity-60' : 'text-hd-text-soft'}>
                            {data.reason}
                          </span>
                        </div>
                      ) : (
                        "Actions will simulate generating documents from these updates."
                      )}
                    </div>
                    {isGenerating ? (
                      <div className="flex flex-col gap-1.5 w-[42%] shrink-0">
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="text-hd-accent animate-pulse flex items-center gap-1">
                            <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
                            {jobStatus === 'pending' ? 'Queued' : 'Generating...'}
                          </span>
                          <span className="text-hd-text-soft">{jobProgress}%</span>
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
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              toast.error('Reject action triggered (Simulation only).', {
                                position: 'top-right',
                                autoClose: 2000,
                              })
                            }}
                            className="flex items-center gap-1.5 px-4 h-9 rounded-lg border border-hd-border text-xs font-semibold cursor-pointer text-hd-text-soft bg-hd-bg hover:bg-hd-surface hover:text-red-500 hover:border-red-500/30 transition-all shrink-0"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Reject Updates
                          </button>
                          <button
                            onClick={handleGenerateDocs}
                            disabled={isGenerating || isLoading}
                            className="flex items-center gap-1.5 px-4 h-9 rounded-lg border-none text-xs font-semibold cursor-pointer text-white bg-hd-accent hover:bg-hd-accent-hover shadow-sm transition-all shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Play className="w-3.5 h-3.5" />
                            Generate Docs for Updated Codebase
                          </button>
                        </div>
                      )
                    )}
                  </>
                )}
              </div>

              {/* Commits Section */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-hd-muted uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <GitCommit className="w-3.5 h-3.5 text-hd-accent" />
                  Un-synced Commits ({data.commits.length})
                </h4>
                <div className="space-y-3">
                  {data.commits.map((commit, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-hd-border bg-hd-bg flex flex-col gap-2 relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <span className="text-sm font-semibold text-hd-text">
                          {commit.message}
                        </span>
                        <span className="font-mono text-xs text-hd-muted bg-hd-surface px-2 py-0.5 rounded border border-hd-border shrink-0">
                          {commit.commit_id.substring(0, 7)}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-hd-muted flex-wrap">
                        <span className="flex items-center gap-1">
                          By <strong className="text-hd-text-soft">{commit.committed_by}</strong>
                        </span>
                        <span className="opacity-40">•</span>
                        <span>{formatCommitDate(commit.committed_at)}</span>
                      </div>
                      {commit.reason && (
                        <div className="mt-2 text-xs flex flex-col gap-0.5 border-t border-hd-border/40 pt-2">
                          <span className="font-semibold text-hd-muted">Commit Reason:</span>
                          <span className={commit.is_doc_generatable === false ? 'line-through text-hd-muted opacity-60' : 'text-hd-text-soft'}>
                            {commit.reason}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>


            </>
          ) : (
            <div className="space-y-6 py-4 animate-pulse">
              {/* Action Row Skeleton */}
              <div className="flex items-center justify-between gap-3 py-4 border border-hd-border bg-hd-bg-soft/30 px-3 rounded-lg mt-3 mb-6">
                <div className="h-4 bg-hd-surface rounded w-1/3"></div>
                <div className="flex gap-2">
                  <div className="h-9 bg-hd-surface rounded w-24"></div>
                  <div className="h-9 bg-hd-surface rounded w-36"></div>
                </div>
              </div>

              {/* Commits Section Skeleton */}
              <div>
                <div className="h-4 bg-hd-surface rounded w-28 mb-4"></div>
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <div key={i} className="p-4 rounded-xl border border-hd-border bg-hd-bg/50 flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-4">
                        <div className="h-4 bg-hd-surface rounded w-2/3"></div>
                        <div className="h-5 bg-hd-surface rounded w-16"></div>
                      </div>
                      <div className="h-3 bg-hd-surface rounded w-24"></div>
                    </div>
                  ))}
                </div>
              </div>


            </div>
          )}
        </Modal>
      </ConfigProvider>
    </>
  )
}
