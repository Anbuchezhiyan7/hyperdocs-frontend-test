import React from 'react'
import { Plus, Minus } from 'lucide-react'

/**
 * Formats an ISO date string to a user-friendly date and time string.
 */
export const formatCommitDate = (isoString: string): string => {
  try {
    const date = new Date(isoString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return isoString
  }
}

/**
 * Parses and renders git patch lines with syntax highlighting using Tailwind CSS.
 */
export const renderPatchLines = (patch: string, isDark: boolean): React.ReactNode => {
  if (!patch) return null
  const lines = patch.split('\n')
  return (
    <div className="font-mono text-xs rounded-lg overflow-hidden border border-hd-border bg-hd-bg-soft select-text">
      {lines.map((line, idx) => {
        let lineBg = 'transparent'
        let lineTextColor = 'var(--hd-text-soft)'
        let prefix = ''

        if (line.startsWith('+') && !line.startsWith('+++')) {
          lineBg = isDark ? 'rgba(34, 197, 94, 0.15)' : 'rgba(34, 197, 94, 0.08)'
          lineTextColor = isDark ? '#4ade80' : '#166534'
          prefix = '+'
        } else if (line.startsWith('-') && !line.startsWith('---')) {
          lineBg = isDark ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.08)'
          lineTextColor = isDark ? '#f87171' : '#991b1b'
          prefix = '-'
        } else if (line.startsWith('@@')) {
          lineBg = isDark ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.08)'
          lineTextColor = isDark ? '#60a5fa' : '#1d4ed8'
        }

        return (
          <div
            key={idx}
            className="py-0.5 px-3 flex gap-2 font-mono whitespace-pre-wrap leading-relaxed"
            style={{ background: lineBg, color: lineTextColor }}
          >
            <span className="w-4 select-none opacity-50 shrink-0">{prefix}</span>
            <span className="flex-1">{line}</span>
          </div>
        )
      })}
    </div>
  )
}
