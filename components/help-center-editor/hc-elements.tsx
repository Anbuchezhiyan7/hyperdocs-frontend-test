'use client'

/**
 * hc-elements.tsx — Plate element components for the Help Center editor.
 * Re-uses CardElement from home-editor. Defines column group / column for help center.
 */

import React from 'react'
import { PlateElement } from 'platejs/react'
import type { PlateElementProps } from 'platejs/react'

// Re-export CardElement from home-editor (same card plugin, same component)
export { CardElement } from '@/components/home-editor/card-element'

/* ------------------------------------------------------------------ */
/*  Column Group — wraps columns in a horizontal flex row              */
/* ------------------------------------------------------------------ */
export function ColumnGroupElement({ children, ...props }: PlateElementProps) {
  return (
    <PlateElement as="div" {...props} className="my-4">
      <div style={{ display: 'flex', gap: 16, width: '100%' }}>
        {children}
      </div>
    </PlateElement>
  )
}

/* ------------------------------------------------------------------ */
/*  Column — single flex column (cards stretch to equal heights)       */
/* ------------------------------------------------------------------ */
export function ColumnElement({ children, ...props }: PlateElementProps) {
  return (
    <PlateElement
      as="div"
      {...props}
      style={{
        flex: 1,
        minWidth: 0,
        border: '1px dashed var(--hd-border-soft)',
        borderRadius: 8,
        padding: '10px 12px',
        background: 'rgba(0,0,0,0.01)',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      {children}
    </PlateElement>
  )
}
