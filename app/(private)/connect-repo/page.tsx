'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { IconArrowRightLine } from '@/components/shared/icons'
import { apiGetGithubStatus } from '@/lib/api/github'
import { apiDisconnectGithub } from '@/lib/api/github'
import { GithubFlowStepper } from '@/components/github/GithubFlowStepper'
import { ConfirmDialog } from '@/components/shared/confirm-dialog'
import type { GithubStatus } from '@/lib/types/github'

type PageView = 'check' | 'connect' | 'flow' | 'connected'

export default function ConnectRepoPage() {
  const router = useRouter()
  const [view, setView] = useState<PageView>('check')
  const [githubStatus, setGithubStatus] = useState<GithubStatus | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showDisconnectDialog, setShowDisconnectDialog] = useState(false)
  const [disconnecting, setDisconnecting] = useState(false)
  const [stepperStep, setStepperStep] = useState<string | null>(null)

  // ── On mount: check GitHub status ─────────────────────────────────────────
  useEffect(() => {
    async function checkStatus() {
      const res = await apiGetGithubStatus()
      if (res.success && res.data) {
        setGithubStatus(res.data)
        setView(res.data.connected ? 'connected' : 'connect')
      } else {
        setView('connect')
      }
    }
    checkStatus()
  }, [])

  const handleSkip = () => router.push('/admin')

  const handleFlowComplete = () => {
    setShowModal(false)
    // Navigate to admin after a brief delay to show success
    setTimeout(() => router.push('/admin'), 1800)
  }

  const handleDisconnect = async () => {
    setDisconnecting(true)
    const res = await apiDisconnectGithub()
    setDisconnecting(false)
    setShowDisconnectDialog(false)
    if (res.success) {
      setGithubStatus(null)
      setView('connect')
    }
  }

  // ── Loading / checking ─────────────────────────────────────────────────────
  if (view === 'check') {
    return (
      <div
        data-theme="light"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff8f4] via-white to-[#ffeedd]"
      >
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin w-7 h-7 text-[#f26522]/60" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-sm text-slate-400">Checking connection…</span>
        </div>
      </div>
    )
  }

  // ── Already connected ──────────────────────────────────────────────────────
  if (view === 'connected' && githubStatus?.connected) {
    return (
      <>
        <div
          data-theme="light"
          className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden bg-gradient-to-br from-[#fff8f4] via-white to-[#ffeedd] select-none font-admin"
        >
          {/* Background Blobs */}
          <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full pointer-events-none bg-radial from-[rgba(242,101,34,0.10)] to-transparent" />
          <div className="absolute -bottom-40 -right-40 w-[480px] h-[480px] rounded-full pointer-events-none bg-radial from-[rgba(242,101,34,0.07)] to-transparent" />

          <div className="relative z-10 w-full max-w-[460px] bg-white border border-[rgba(242,101,34,0.14)] rounded-3xl p-10 shadow-2xl shadow-[rgba(242,101,34,0.06)] flex flex-col items-center text-center">
            {/* Logo */}
            <div className="mb-8">
              <Image src="/images/logo.png" alt="Hyperdocs" width={148} height={40} className="h-auto" priority />
            </div>

            {/* Connected badge */}
            <div className="w-16 h-16 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center mb-5">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
              GitHub Connected
            </h2>
            <p className="text-[0.875rem] text-slate-500 mb-1">
              Signed in as{' '}
              <span className="font-semibold text-slate-700">@{githubStatus.github_username}</span>
            </p>
            <p className="text-[0.8rem] text-slate-400 mb-8 leading-relaxed max-w-[320px]">
              Your repository is connected. Head to the dashboard to view your generated documentation.
            </p>

            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={handleSkip}
                className="group flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-[#f26522] hover:bg-[#e05515] text-white text-[14px] font-bold transition-all duration-300 shadow-md shadow-orange-500/10 cursor-pointer"
              >
                <span>Go to Dashboard</span>
                <IconArrowRightLine className="w-4 h-4 transition-transform group-hover:translate-x-1" width="16" height="16" />
              </button>

              <button
                onClick={() => setShowDisconnectDialog(true)}
                className="w-full h-10 rounded-xl border border-slate-200 text-slate-500 hover:border-red-200 hover:text-red-500 hover:bg-red-50/50 text-[13px] font-medium transition-all duration-200 cursor-pointer bg-white"
              >
                Disconnect GitHub
              </button>
            </div>
          </div>
        </div>

        {/* Disconnect confirmation */}
        <ConfirmDialog
          open={showDisconnectDialog}
          title="Disconnect GitHub?"
          description="This will remove the GitHub connection from your account. You can reconnect at any time from Settings → Git Integration."
          confirmText={disconnecting ? 'Disconnecting…' : 'Disconnect'}
          cancelText="Cancel"
          danger
          onConfirm={handleDisconnect}
          onCancel={() => setShowDisconnectDialog(false)}
        />
      </>
    )
  }

  // ── Not connected: show connect page ──────────────────────────────────────
  return (
    <>
      <div
        data-theme="light"
        className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden bg-gradient-to-br from-[#fff8f4] via-white to-[#ffeedd] text-slate-900 select-none font-admin"
      >
        {/* Background Blobs */}
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full pointer-events-none bg-radial from-[rgba(242,101,34,0.12)] to-transparent" />
        <div className="absolute -bottom-40 -right-40 w-[480px] h-[480px] rounded-full pointer-events-none bg-radial from-[rgba(242,101,34,0.08)] to-transparent" />

        {/* Main Card */}
        <div className="relative z-10 w-full max-w-[480px] bg-white border border-[rgba(242,101,34,0.15)] rounded-3xl p-10 shadow-2xl shadow-[rgba(242,101,34,0.06)] flex flex-col items-center text-center">
          {/* Logo */}
          <div className="mb-7">
            <Image src="/images/logo.png" alt="Hyperdocs" width={148} height={40} className="h-auto" priority />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-3">
            Git Repository Integration
          </h2>

          {/* Subtitle */}
          <p className="text-[14px] leading-relaxed text-slate-500 max-w-[360px] mb-8">
            Connect your GitHub repository to auto-generate and keep your documentation in sync with every push.
          </p>

          {/* GitHub card — clickable */}
          <div className="w-full max-w-[300px] mb-7 mx-auto">
            <button
              onClick={() => setShowModal(true)}
              className="w-full relative flex flex-col items-center p-6 rounded-2xl border border-slate-100 bg-white/80 shadow-sm hover:shadow-md hover:border-[rgba(242,101,34,0.25)] hover:bg-[rgba(242,101,34,0.02)] transition-all duration-300 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] flex items-center justify-center text-white mb-3 group-hover:scale-105 transition-transform duration-200">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </div>
              <span className="text-sm font-bold text-slate-800">GitHub</span>
              <span className="text-[10px] text-slate-400 font-semibold mt-1 uppercase tracking-wider">Click to connect</span>
            </button>
          </div>

          {/* OR Divider */}
          <div className="flex items-center justify-center w-full max-w-[360px] mb-6">
            <div className="flex-grow border-t border-slate-200" />
            <span className="px-3 text-xs font-bold text-slate-400 tracking-wider">OR</span>
            <div className="flex-grow border-t border-slate-200" />
          </div>

          {/* Skip */}
          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={handleSkip}
              className="group flex items-center justify-center gap-2 w-full h-12 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300 text-[14px] font-semibold transition-all duration-300 cursor-pointer"
            >
              <span>Skip for now</span>
              <IconArrowRightLine className="w-4 h-4 transition-transform group-hover:translate-x-1" width="16" height="16" />
            </button>
            <div className="text-[11px] text-slate-400 font-semibold mt-1 uppercase tracking-wide">
              You can connect your repo later from settings
            </div>
          </div>
        </div>
      </div>

      {/* GitHub Flow Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-hd-bg border border-hd-border text-hd-text rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.18)] w-full max-w-[420px] p-7 relative">
            {/* Close button */}
            {stepperStep !== 'connecting' && stepperStep !== 'generating' && (
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-hd-muted hover:bg-hd-surface hover:text-hd-text transition-colors border-none bg-transparent cursor-pointer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}

            <GithubFlowStepper
              lightMode
              onComplete={handleFlowComplete}
              onReset={() => {}}
              onStepChange={setStepperStep}
            />
          </div>
        </div>
      )}
    </>
  )
}
