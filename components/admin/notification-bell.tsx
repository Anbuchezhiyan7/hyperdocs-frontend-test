'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useGitSyncStore } from '@/lib/store/useGitSyncStore'

export function NotificationBell() {
  const router = useRouter()
  const { pendingCommits, hasChangesDetected, setHasChangesDetected } = useGitSyncStore()
  const [showPopup, setShowPopup] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowPopup(false)
      }
    }

    if (showPopup) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showPopup])

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setShowPopup(prev => !prev)}
        className={`flex items-center justify-center w-8 h-8 rounded-lg border bg-hd-bg cursor-pointer relative transition-all duration-150 select-none ${
          hasChangesDetected
            ? 'animate-pulse text-hd-accent border-hd-accent/30 hover:bg-hd-surface'
            : 'text-hd-muted border-hd-admin-border hover:bg-hd-surface/50'
        }`}
      >
        {hasChangesDetected && (
          <span className="absolute top-1 right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ef4444] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ef4444]"></span>
          </span>
        )}
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      </button>

      {showPopup && (
        <div
          className="absolute right-0 top-full mt-2 w-56 p-4 rounded-xl border border-hd-border bg-hd-bg text-hd-text shadow-xl z-50 transition-all select-none text-center"
          style={{ background: 'var(--hd-bg)', borderColor: 'var(--hd-border)' }}
        >
          <div className="text-xs font-bold text-[#f26522] mb-1">GitHub Sync</div>
          <div className="text-[11px] text-hd-text-soft font-semibold leading-snug mb-3">
            {pendingCommits > 0 || hasChangesDetected
              ? (hasChangesDetected
                ? 'GitHub changes detected. Click below to sync.'
                : `${pendingCommits} pending update${pendingCommits > 1 ? 's' : ''} available.`)
              : 'No pending updates.'}
          </div>
          {pendingCommits > 0 || hasChangesDetected ? (
            <button
              onClick={() => {
                setShowPopup(false)
                setHasChangesDetected(false)
                router.push('/admin/git-sync')
              }}
              className="w-full py-1.5 px-3 rounded-lg border-none text-[10px] font-bold text-white bg-hd-accent hover:bg-hd-accent-hover cursor-pointer transition-all select-none"
            >
              Go to Git Sync
            </button>
          ) : (
            <button
              onClick={() => setShowPopup(false)}
              className="w-full py-1.5 px-3 rounded-lg border border-hd-border text-[10px] font-semibold text-hd-text bg-hd-bg hover:bg-hd-surface cursor-pointer transition-all select-none"
            >
              Dismiss
            </button>
          )}
          {/* Little triangle arrow at the top */}
          <div className="absolute -top-1.5 right-3 w-3 h-3 rotate-45 border-l border-t border-hd-border bg-hd-bg" style={{ background: 'var(--hd-bg)', borderColor: 'var(--hd-border)' }}></div>
        </div>
      )}
    </div>
  )
}
