'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/store/useAppStore'
import { apiGetGithubStatus } from '@/lib/api/github'

export function EditorOverlay() {
  const router = useRouter()
  const { settings } = useAppStore()
  const documentMode = settings?.general?.document_mode
  const [gitConnected, setGitConnected] = React.useState<boolean | null>(null)

  useEffect(() => {
    if (documentMode === 'git') {
      apiGetGithubStatus().then(res => {
        setGitConnected(res.success && res.data?.connected === true)
      })
    }
  }, [documentMode])

  // If settings haven't loaded yet or the API call failed, do not show any overlay
  if (!settings?.user_id) {
    return null
  }

  // Settings are loaded. If documentMode is null or falsy, show the choose mode overlay
  if (!documentMode) {
    // fall through to render "choose mode" overlay
  } else if (documentMode !== 'git') {
    return null
  } else if (documentMode === 'git' && gitConnected === null) {
    return null // still loading
  } else if (documentMode === 'git' && gitConnected === true) {
    return null // git connected, no overlay
  }

  const isGitNotConnected = documentMode === 'git' && gitConnected === false

  return (
    <div
      style={{
        position: 'absolute', inset: 0, zIndex: 30,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        background: 'var(--hd-overlay-bg, rgba(255,255,255,0.6))',
      }}
    >
      {/* Card */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', maxWidth: 380, padding: '2.5rem 2rem',
        borderRadius: 20,
        background: 'var(--hd-bg)',
        border: '1px solid var(--hd-border)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
      }}>
        {/* Icon ring */}
        <div style={{
          width: 64, height: 64, borderRadius: 18, marginBottom: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(242,101,34,0.10)',
          border: '1px solid rgba(242,101,34,0.18)',
        }}>
          {isGitNotConnected ? (
            /* GitHub mark */
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f26522" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          ) : (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f26522" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
          )}
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: '1.18rem', fontWeight: 800, color: 'var(--hd-text)',
          marginBottom: 10, letterSpacing: '-0.02em',
        }}>
          {isGitNotConnected ? 'GitHub not connected' : 'Choose a document mode first'}
        </h2>

        {/* Body */}
        <p style={{
          fontSize: '0.875rem', color: 'var(--hd-text-soft)',
          lineHeight: 1.65, marginBottom: 24, maxWidth: 300,
        }}>
          {isGitNotConnected
            ? 'Your docs are synced from GitHub. Connect your repository to start editing and publishing content.'
            : 'Your editor is almost ready. Head to the Dashboard, pick how you\'d like to manage your docs, and you\'ll be writing in seconds.'}
        </p>

        {/* CTA */}
        <button
          onClick={() => router.push(isGitNotConnected ? '/admin/git-integration' : '/admin/dashboard')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '10px 22px', borderRadius: 10, border: 'none',
            background: '#f26522', color: '#fff',
            fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(242,101,34,0.35)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          {isGitNotConnected ? 'Connect GitHub' : 'Go to Dashboard'}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  )
}
