'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { IconGit } from '@/components/shared/icons'
import { IconGitHubFill } from '@/components/shared/icons/IconGitHubFill'
import { GithubFlowStepper } from '@/components/github/GithubFlowStepper'
import { GithubConnected } from '@/components/github/GithubConnected'
import { ConfirmDialog } from '@/components/shared/confirm-dialog'
import { apiGetGithubStatus, apiDisconnectGithub } from '@/lib/api/github'
import type { GithubStatus } from '@/lib/types/github'

type PanelState = 'loading' | 'disconnected' | 'connected'

// Steps that mean the flow is mid-progress and the modal should auto-open
const IN_PROGRESS_STEPS = new Set(['waiting', 'select-repo', 'connecting', 'generating'])

function readSavedStep(): string {
  if (typeof window === 'undefined') return ''
  try { return localStorage.getItem('hd_github_flow_step') ?? '' } catch { return '' }
}

export function GitPanel() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [panelState, setPanelState] = useState<PanelState>('loading')
  const [githubStatus, setGithubStatus] = useState<GithubStatus | null>(null)
  const [showFlowModal, setShowFlowModal] = useState(false)
  const [showDisconnectDialog, setShowDisconnectDialog] = useState(false)
  const [disconnecting, setDisconnecting] = useState(false)
  const [stepperStep, setStepperStep] = useState<string | null>(null)

  // ── Fetch status on mount, then decide whether to auto-open the modal ─────────
  useEffect(() => {
    async function fetchStatus() {
      const returnedFromGithub = searchParams.get('connected') === 'true'

      // If this tab was opened as an OAuth popup by another tab, notify the opener
      // and close this tab so the user stays in the original flow tab.
      if (returnedFromGithub && window.opener) {
        try {
          window.opener.postMessage({ type: 'hd_github_connected' }, window.location.origin)
        } catch {
          // opener may have navigated away; fall through to normal handling
        }
        window.close()
        return
      }

      const res = await apiGetGithubStatus()
      if (res.success && res.data) {
        setGithubStatus(res.data)
        setPanelState(res.data.connected ? 'connected' : 'disconnected')
      } else {
        setPanelState('disconnected')
      }

      // Auto-open the flow modal if:
      //   (a) GitHub just redirected back with ?connected=true (no opener = direct load), OR
      //   (b) there is a persisted in-progress step (user reloaded mid-flow)
      const savedStep = readSavedStep()
      const hasInProgressStep = IN_PROGRESS_STEPS.has(savedStep)

      if (returnedFromGithub || hasInProgressStep) {
        setShowFlowModal(true)
        if (returnedFromGithub) {
          router.replace('/admin/git-integration', { scroll: false })
        }
      }
    }
    fetchStatus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Listen for OAuth callback message from the popup tab ──────────────────
  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.origin !== window.location.origin) return
      if (e.data?.type !== 'hd_github_connected') return
      // The popup tab completed OAuth — open the modal so the waiting stepper
      // can poll and advance automatically.
      setShowFlowModal(true)
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const handleFlowComplete = () => {
    setShowFlowModal(false)
    apiGetGithubStatus().then((res) => {
      if (res.success && res.data) {
        setGithubStatus(res.data)
        setPanelState(res.data.connected ? 'connected' : 'disconnected')
      }
    })
  }

  const handleDisconnect = async () => {
    setDisconnecting(true)
    const res = await apiDisconnectGithub()
    setDisconnecting(false)
    setShowDisconnectDialog(false)
    if (res.success) {
      setGithubStatus(null)
      setPanelState('disconnected')
    }
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="flex-1 overflow-y-auto bg-hd-bg-soft text-hd-text">
      <div className="max-w-[560px] mx-auto px-8 pt-10 pb-16">

        {/* Section header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-hd-surface border border-hd-border-soft flex items-center justify-center">
            <IconGit className="w-5 h-5 text-hd-text/70" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-hd-text m-0">Git Integration</h2>
            <p className="text-[0.8rem] text-hd-muted m-0">Connect GitHub to auto-generate docs from your repo</p>
          </div>
        </div>

        {/* ── Loading ── */}
        {panelState === 'loading' && (
          <div className="w-full bg-hd-bg rounded-2xl border border-hd-border p-8 flex flex-col items-center gap-3">
            <svg className="animate-spin w-6 h-6 text-hd-muted" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="text-[0.82rem] text-hd-muted">Checking GitHub connection…</span>
          </div>
        )}

        {/* ── Disconnected ── */}
        {panelState === 'disconnected' && (
          <div className="w-full bg-hd-bg rounded-2xl border border-hd-border p-8 flex flex-col items-center text-center shadow-sm relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute -top-[120px] left-[50%] -translate-x-[50%] w-[240px] h-[240px] rounded-full bg-hd-accent/5 blur-3xl pointer-events-none" />

            {/* Icon badge */}
            <div className="w-14 h-14 rounded-2xl bg-hd-surface border border-hd-border-soft flex items-center justify-center mb-5 shadow-sm">
              <IconGitHubFill className="w-7 h-7 text-hd-text/80" />
            </div>

            <h3 className="text-[1.05rem] font-bold text-hd-text mb-2">Connect GitHub</h3>
            <p className="text-[0.82rem] text-hd-muted max-w-[340px] leading-relaxed mb-6">
              Directly connect your documentation site with GitHub. We&apos;ll automatically generate and sync documentation on every push.
            </p>

            {/* Feature list */}
            <div className="w-full border border-hd-border-soft bg-hd-surface rounded-xl px-4 py-3 mb-6 text-left">
              <p className="text-[0.68rem] font-bold text-hd-muted uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                <IconGitHubFill width={10} height={10} />
                This will enable
              </p>
              <div className="flex flex-col gap-2">
                {[
                  'Auto-generate docs from your codebase',
                  'Sync documentation updates when PRs merge',
                  'View your latest releases in changelog',
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-1 h-1 rounded-full bg-hd-accent shrink-0" />
                    <span className="text-[0.78rem] text-hd-text/70">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Connect button */}
            <button
              onClick={() => setShowFlowModal(true)}
              className="flex items-center gap-2 h-11 px-6 rounded-xl bg-hd-accent hover:bg-hd-accent-hover text-white text-[0.88rem] font-bold transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] select-none"
            >
              <IconGitHubFill width={16} height={16} className="fill-white text-white" />
              Connect GitHub
            </button>

            <div className="flex items-center gap-2 mt-4">
              <span className="text-[0.7rem] text-hd-muted">Encrypted, disconnect anytime</span>
            </div>
          </div>
        )}

        {/* ── Connected ── */}
        {panelState === 'connected' && githubStatus && (
          <div className="flex flex-col gap-4">
            <GithubConnected
              status={githubStatus}
              connectedRepo={null}
              onDisconnect={() => setShowDisconnectDialog(true)}
              isDark
            />

            {/* Reconnect / regenerate section */}
            {/* <div className="w-full bg-hd-bg rounded-xl border border-hd-border p-5">
              <h4 className="text-[0.85rem] font-semibold text-hd-text mb-1">Connect another repository</h4>
              <p className="text-[0.78rem] text-hd-muted mb-3">
                You can connect a different repository or regenerate documentation at any time.
              </p>
              <button
                onClick={() => setShowFlowModal(true)}
                className="flex items-center gap-2 h-9 px-4 rounded-lg border border-hd-border bg-hd-surface text-hd-text text-[0.8rem] font-medium transition-all hover:bg-hd-bg cursor-pointer"
              >
                <IconGitHubFill width={13} height={13} />
                Change repository
              </button>
            </div> */}
          </div>
        )}
      </div>

      {/* ── GitHub Flow Modal ── */}
      {showFlowModal && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-hd-bg border border-hd-border text-hd-text rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.3)] w-full max-w-[420px] p-7 relative">
            {/* Close */}
            {stepperStep !== 'connecting' && stepperStep !== 'generating' && (
              <button
                onClick={() => setShowFlowModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-hd-muted hover:bg-hd-surface hover:text-hd-text transition-colors border-none bg-transparent cursor-pointer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}

            <GithubFlowStepper
              onComplete={handleFlowComplete}
              onReset={() => { }}
              onStepChange={setStepperStep}
            />
          </div>
        </div>
      )}

      {/* ── Disconnect confirm dialog ── */}
      <ConfirmDialog
        open={showDisconnectDialog}
        title="Disconnect GitHub?"
        description="This will remove the GitHub integration from your account. Your existing documentation will remain intact. You can reconnect anytime."
        confirmText={disconnecting ? 'Disconnecting…' : 'Disconnect'}
        cancelText="Cancel"
        danger
        onConfirm={handleDisconnect}
        onCancel={() => setShowDisconnectDialog(false)}
      />
    </div>
  )
}
