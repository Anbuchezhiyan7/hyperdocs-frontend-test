'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { IncomingChange } from '@/lib/docs-context'
import { ConfirmDialog } from '@/components/shared/confirm-dialog'

interface Props {
  changes: IncomingChange[]
  onReject: (changeId: string) => void
  onDismissAll: () => void
  onClose: () => void
}

function timeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export function BranchUpdatesModal({ changes, onReject, onDismissAll, onClose }: Props) {
  const router = useRouter()
  const [confirmSkip, setConfirmSkip] = useState<string | null>(null)

  if (changes.length === 0) return null

  const { branchName, commitSha, commitMessage, timestamp } = changes[0]

  function handleReview(change: IncomingChange) {
    onClose()
    router.push('/admin/editor/' + change.pagePath.join('/'))
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.65)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#111113', border: '1px solid #222226', borderRadius: 14,
          width: 480, maxWidth: '90vw', overflow: 'hidden',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid #1e1e1e' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 9, flexShrink: 0, marginTop: 2,
                background: 'rgba(242,101,34,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#f26522" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="6" y1="3" x2="6" y2="15" />
                  <circle cx="18" cy="6" r="3" />
                  <circle cx="6" cy="18" r="3" />
                  <path d="M18 9a9 9 0 0 1-9 9" />
                </svg>
              </div>
              <div>
                <p style={{ fontSize: '0.95rem', fontWeight: 700, color: '#e5e5e5', margin: '0 0 4px' }}>
                  Branch push detected
                </p>
                <p style={{ fontSize: '0.75rem', color: '#555', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <code style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 4, padding: '1px 6px', color: '#888', fontSize: '0.72rem' }}>
                    {branchName}
                  </code>
                  <span style={{ color: '#f26522', fontFamily: 'monospace', fontSize: '0.72rem' }}>{commitSha}</span>
                  <span>·</span>
                  <span>{timeAgo(timestamp)}</span>
                </p>
                <p style={{ fontSize: '0.8rem', color: '#777', margin: 0, fontStyle: 'italic' }}>
                  &ldquo;{commitMessage}&rdquo;
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#444', padding: 4, flexShrink: 0 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Changes list */}
        <div style={{ maxHeight: 340, overflowY: 'auto' }}>
          <p style={{
            fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase',
            letterSpacing: '0.08em', color: '#444', padding: '14px 24px 6px',
          }}>
            {changes.length} page{changes.length !== 1 ? 's' : ''} updated
          </p>

          {changes.map((change) => (
            <div
              key={change.id}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 24px', gap: 12,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: 500, color: '#e5e5e5', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {change.pageTitle}
                  </p>
                  <p style={{ fontSize: '0.72rem', color: '#555', margin: 0, fontFamily: 'monospace' }}>
                    {change.pagePath.join('/')}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                <button
                  onClick={() => setConfirmSkip(change.id)}
                  style={{
                    padding: '5px 12px', borderRadius: 6, border: '1px solid #222',
                    background: 'transparent', color: '#555', fontSize: '0.78rem', cursor: 'pointer',
                  }}
                >
                  Skip
                </button>
                <button
                  onClick={() => handleReview(change)}
                  style={{
                    padding: '5px 14px', borderRadius: 6, border: 'none',
                    background: '#f26522', color: '#fff', fontSize: '0.78rem',
                    fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>

        <ConfirmDialog
          open={confirmSkip !== null}
          title="Skip this change?"
          description="This will reject the incoming changes for this page. You won't be able to review them again."
          confirmText="Skip"
          cancelText="Cancel"
          danger
          onConfirm={() => { if (confirmSkip) onReject(confirmSkip); setConfirmSkip(null) }}
          onCancel={() => setConfirmSkip(null)}
        />

        {/* Footer */}
        <div style={{ padding: '12px 24px 16px', borderTop: '1px solid #1a1a1a', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={onDismissAll}
            style={{
              padding: '6px 16px', borderRadius: 6, border: '1px solid #222',
              background: 'transparent', color: '#555', fontSize: '0.8rem', cursor: 'pointer',
            }}
          >
            Dismiss all
          </button>
        </div>
      </div>
    </div>
  )
}
