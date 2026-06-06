'use client'

import React from 'react'
import { IconSearch } from '@/components/shared/icons'

interface SearchTriggerProps {
  onClick: () => void
  variant?: 'hero' | 'navbar'
}

export function SearchTrigger({ onClick, variant = 'hero' }: SearchTriggerProps) {
  const isNavbar = variant === 'navbar'

  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: isNavbar ? '8px' : '10px',
        width: '100%',
        maxWidth: isNavbar ? '360px' : '520px',
        margin: isNavbar ? '0' : '0 auto',
        padding: isNavbar ? '6px 12px' : '12px 18px',
        background: isNavbar ? 'transparent' : 'color-mix(in srgb, var(--hd-surface) 80%, transparent)',
        border: isNavbar ? '1px solid var(--hd-border)' : '1.5px solid var(--hd-border)',
        borderRadius: '999px',
        cursor: 'pointer',
        textAlign: 'left',
        backdropFilter: isNavbar ? 'none' : 'blur(8px)',
        transition: 'border-color 0.15s, box-shadow 0.15s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--hd-accent)'
        e.currentTarget.style.boxShadow = isNavbar 
          ? '0 0 0 2px color-mix(in srgb, var(--hd-accent) 12%, transparent)'
          : '0 0 0 3px color-mix(in srgb, var(--hd-accent) 12%, transparent)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--hd-border)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <IconSearch width={isNavbar ? "14" : "16"} height={isNavbar ? "14" : "16"} stroke="var(--hd-muted)" strokeWidth="2" style={{ flexShrink: 0 }} />

      <span style={{ flex: 1, fontSize: isNavbar ? '13px' : '14.5px', color: 'var(--hd-muted)', userSelect: 'none' }}>
        Search...
      </span>

      <kbd
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '2px',
          padding: isNavbar ? '2px 5px' : '3px 7px',
          fontSize: isNavbar ? '10px' : '11px',
          fontFamily: 'inherit',
          fontWeight: 500,
          color: 'var(--hd-muted)',
          background: 'var(--hd-bg)',
          border: '1px solid var(--hd-border)',
          borderRadius: '5px',
          letterSpacing: '0.02em',
          flexShrink: 0,
        }}
      >
        Ctrl K
      </kbd>
    </button>
  )
}
