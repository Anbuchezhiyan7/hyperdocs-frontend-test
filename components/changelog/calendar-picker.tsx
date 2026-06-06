import React, { useEffect, useState, useRef } from 'react'
import { MONTHS, DAYS } from '@/lib/utils/changelog-date'

type CalView = 'day' | 'month' | 'year'

interface CalendarPickerProps {
  initialDate: Date
  anchorTop: number
  anchorLeft: number
  onConfirm: (d: Date) => void
  onCancel: () => void
  confirmLabel?: string
}

export function CalendarPicker({
  initialDate,
  anchorTop,
  anchorLeft,
  onConfirm,
  onCancel,
  confirmLabel = 'Confirm'
}: CalendarPickerProps) {
  const [view, setView] = useState<CalView>('day')
  const [vy, setVy] = useState(initialDate.getFullYear())
  const [vm, setVm] = useState(initialDate.getMonth())
  const [sel, setSel] = useState(initialDate)
  const [yrBase, setYrBase] = useState(initialDate.getFullYear() - 5)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onCancel()
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [onCancel])

  const top = Math.min(anchorTop, (typeof window !== 'undefined' ? window.innerHeight : 800) - 360 - 16)
  const left = Math.min(anchorLeft, (typeof window !== 'undefined' ? window.innerWidth : 1200) - 280 - 16)

  // Day grid cells
  const fwd = new Date(vy, vm, 1).getDay()
  const dim = new Date(vy, vm + 1, 0).getDate()
  const pmd = new Date(vy, vm, 0).getDate()
  
  type Cell = { day: number; inMonth: boolean; date: Date }
  const cells: Cell[] = []
  
  for (let i = fwd - 1; i >= 0; i--) {
    cells.push({ day: pmd - i, inMonth: false, date: new Date(vy, vm - 1, pmd - i) })
  }
  for (let d = 1; d <= dim; d++) {
    cells.push({ day: d, inMonth: true, date: new Date(vy, vm, d) })
  }
  let nd = 1
  while (cells.length < 42) {
    cells.push({ day: nd, inMonth: false, date: new Date(vy, vm + 1, nd++) })
  }

  const isSel = (c: Cell) => c.date.toDateString() === sel.toDateString()

  const prevM = () => {
    if (vm === 0) {
      setVm(11)
      setVy(y => y - 1)
    } else {
      setVm(m => m - 1)
    }
  }
  
  const nextM = () => {
    if (vm === 11) {
      setVm(0)
      setVy(y => y + 1)
    } else {
      setVm(m => m + 1)
    }
  }

  const years = Array.from({ length: 12 }, (_, i) => yrBase + i)

  const navBtn: React.CSSProperties = {
    width: 28,
    height: 28,
    borderRadius: 8,
    border: 'none',
    background: 'var(--hd-surface)',
    color: 'var(--hd-text)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
  
  const headerBtn: React.CSSProperties = {
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '0.88rem',
    color: 'var(--hd-text)',
    padding: '0 4px',
    borderRadius: 6,
    fontFamily: 'inherit',
    transition: 'color 0.12s',
  }

  return (
    <div ref={ref} style={{
      position: 'fixed',
      top,
      left,
      zIndex: 9999,
      width: 264,
      background: 'var(--hd-admin-nav)',
      border: '1px solid var(--hd-admin-border)',
      borderRadius: 12,
      boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
      overflow: 'hidden',
      fontSize: '0.82rem',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid var(--hd-admin-border)', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 2 }}>
          <button style={headerBtn} onClick={() => setView(v => v === 'month' ? 'day' : 'month')}
            onMouseEnter={e => (e.currentTarget.style.color = '#f26522')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--hd-text)')}>
            {MONTHS[vm]}
          </button>
          <button style={headerBtn} onClick={() => setView(v => v === 'year' ? 'day' : 'year')}
            onMouseEnter={e => (e.currentTarget.style.color = '#f26522')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--hd-text)')}>
            {vy}
          </button>
        </div>

        <div style={{ display: 'flex', gap: 4 }}>
          <button style={navBtn}
            onClick={() => { if (view === 'day') prevM(); else if (view === 'year') setYrBase(b => b - 12) }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--hd-border)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--hd-surface)')}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button style={navBtn}
            onClick={() => { if (view === 'day') nextM(); else if (view === 'year') setYrBase(b => b + 12) }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--hd-border)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--hd-surface)')}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>

      {/* Day view */}
      {view === 'day' && <>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', padding: '10px 12px 4px' }}>
          {DAYS.map(d => <div key={d} style={{ textAlign: 'center', fontSize: '0.7rem', fontWeight: 600, color: 'var(--hd-admin-muted,#6b7280)' }}>{d}</div>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', padding: '0 12px 8px', gap: '2px 0' }}>
          {cells.map((c, i) => {
            const s = isSel(c)
            return <button key={i}
              onClick={() => { if (c.inMonth) { setSel(c.date) } }}
              style={{
                height: 32, width: '100%', borderRadius: 8, border: 'none',
                background: s ? '#f26522' : 'transparent',
                color: s ? '#fff' : c.inMonth ? 'var(--hd-text)' : 'var(--hd-admin-muted,#4b5563)',
                cursor: c.inMonth ? 'pointer' : 'default',
                fontWeight: s ? 700 : 400, fontSize: '0.8rem', fontFamily: 'inherit',
                transition: 'background 0.1s',
              }}
              onMouseEnter={e => { if (!s && c.inMonth) e.currentTarget.style.background = 'var(--hd-surface)' }}
              onMouseLeave={e => { if (!s) e.currentTarget.style.background = 'transparent' }}
            >{c.day}</button>
          })}
        </div>
      </>}

      {/* Month view */}
      {view === 'month' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6, padding: '12px' }}>
          {MONTHS.map((name, idx) => {
            const active = idx === vm
            return <button key={name}
              onClick={() => { setVm(idx); setView('day') }}
              style={{
                padding: '8px 4px', borderRadius: 8, border: 'none', cursor: 'pointer',
                background: active ? '#f26522' : 'var(--hd-surface)',
                color: active ? '#fff' : 'var(--hd-text)',
                fontWeight: active ? 700 : 500, fontSize: '0.78rem', fontFamily: 'inherit',
                transition: 'background 0.1s',
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--hd-border)' }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'var(--hd-surface)' }}
            >{name.slice(0, 3)}</button>
          })}
        </div>
      )}

      {/* Year view */}
      {view === 'year' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6, padding: '12px' }}>
          {years.map(y => {
            const active = y === vy
            return <button key={y}
              onClick={() => { setVy(y); setView('month') }}
              style={{
                padding: '8px 4px', borderRadius: 8, border: 'none', cursor: 'pointer',
                background: active ? '#f26522' : 'var(--hd-surface)',
                color: active ? '#fff' : 'var(--hd-text)',
                fontWeight: active ? 700 : 500, fontSize: '0.78rem', fontFamily: 'inherit',
                transition: 'background 0.1s',
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--hd-border)' }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'var(--hd-surface)' }}
            >{y}</button>
          })}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8, padding: '8px 12px 12px', borderTop: '1px solid var(--hd-admin-border)' }}>
        <button onClick={onCancel} style={{ flex: 1, padding: '8px 0', borderRadius: 8, border: '1px solid var(--hd-admin-border)', background: 'transparent', color: 'var(--hd-admin-text)', fontSize: '0.78rem', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
        <button onClick={() => onConfirm(sel)} style={{ flex: 1, padding: '8px 0', borderRadius: 8, border: 'none', background: '#f26522', color: '#fff', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>{confirmLabel}</button>
      </div>
    </div>
  )
}
