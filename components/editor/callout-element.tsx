'use client'

import React from 'react'
import { PlateElement } from 'platejs/react'
import type { PlateElementProps } from 'platejs/react'
import { CALLOUT_CONFIG, type CalloutVariant } from '@/lib/callout-plugin'
import {
  IconCheckCircle,
  IconInfoCircle,
  IconBulb,
  IconWarningTriangle,
  IconDangerCircle,
} from '@/components/shared/icons'
import { SuggestionDiffCard, useSuggestion } from './suggestion-diff'

export function CalloutIcon({ variant, color }: { variant: CalloutVariant; color: string }) {
  const s = { width: 18, height: 18, style: { flexShrink: 0, marginTop: 1 }, stroke: color }
  switch (variant) {
    case 'check':   return <IconCheckCircle {...s} />
    case 'info':
    case 'note':    return <IconInfoCircle {...s} />
    case 'tip':     return <IconBulb {...s} />
    case 'warning': return <IconWarningTriangle {...s} />
    case 'danger':  return <IconDangerCircle {...s} />
  }
}

export function CalloutElement({ children, ...props }: PlateElementProps) {
  const variant = ((props.element as { variant?: string }).variant ?? 'info') as CalloutVariant
  const cfg = CALLOUT_CONFIG[variant]
  const { before, afterText, hasSuggestion, handleAccept, handleDecline } = useSuggestion(props.element as any)

  return (
    <PlateElement as="div" {...props} style={{ margin: '12px 0' }}>
      {hasSuggestion && (
        <SuggestionDiffCard
          beforeText={before!}
          afterText={afterText}
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      )}

      <div
        style={{
          background: cfg.bg,
          border: `1px solid ${cfg.border}`,
          borderLeft: `4px solid ${cfg.border}`,
          borderRadius: 10,
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 10,
          color: cfg.textColor,
          outline: hasSuggestion ? `2px solid ${cfg.border}` : undefined,
          outlineOffset: hasSuggestion ? 2 : undefined,
        }}
      >
        <span contentEditable={false} style={{ marginTop: 2 }}>
          <CalloutIcon variant={variant} color={cfg.iconColor} />
        </span>
        <span style={{ flex: 1, fontSize: '0.925rem', lineHeight: 1.65 }}>
          {children}
        </span>
      </div>
    </PlateElement>
  )
}
