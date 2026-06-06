import { createSlatePlugin } from 'platejs'

export const CalloutPlugin = createSlatePlugin({
  key: 'callout',
  node: { isElement: true },
})

export type CalloutVariant = 'check' | 'info' | 'note' | 'tip' | 'warning' | 'danger'

export type CalloutElement = {
  type: 'callout'
  variant: CalloutVariant
  children: { text: string }[]
}

export const CALLOUT_CONFIG: Record<CalloutVariant, {
  label: string
  bg: string
  border: string
  iconColor: string
  textColor: string
  icon: string // svg path key
}> = {
  check: {
    label: 'Check',
    bg: '#f0fdf4',
    border: '#22c55e',
    iconColor: '#16a34a',
    textColor: '#14532d',
    icon: 'check',
  },
  info: {
    label: 'Info',
    bg: '#eff6ff',
    border: '#3b82f6',
    iconColor: '#2563eb',
    textColor: '#1e3a8a',
    icon: 'info',
  },
  note: {
    label: 'Note',
    bg: '#f5f3ff',
    border: '#8b5cf6',
    iconColor: '#7c3aed',
    textColor: '#4c1d95',
    icon: 'note',
  },
  tip: {
    label: 'Tip',
    bg: '#f0fdfa',
    border: '#10b981',
    iconColor: '#059669',
    textColor: '#064e3b',
    icon: 'tip',
  },
  warning: {
    label: 'Warning',
    bg: '#fffbeb',
    border: '#f59e0b',
    iconColor: '#d97706',
    textColor: '#78350f',
    icon: 'warning',
  },
  danger: {
    label: 'Danger',
    bg: '#fef2f2',
    border: '#ef4444',
    iconColor: '#dc2626',
    textColor: '#7f1d1d',
    icon: 'danger',
  },
}
