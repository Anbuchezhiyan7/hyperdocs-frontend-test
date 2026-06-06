'use client'

import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import { TABLE_OF_CONTENTS, DOC_SECTIONS, INITIAL_SECTION_ID, TocItem } from '@/lib/mock-data'
import { docNodesToPlate } from '@/lib/plate-utils'
import { PlateEditor } from '@/components/editor/plate-editor'

/* -------------------- TOC Item -------------------- */

function TocItemRow({
  item,
  activeId,
  depth,
  onSelect,
}: {
  item: TocItem
  activeId: string
  depth: number
  onSelect: (id: string) => void
}) {
  const isActive = item.id === activeId
  const hasSection = item.id in DOC_SECTIONS

  return (
    <div>
      <button
        onClick={() => hasSection && onSelect(item.id)}
        className="w-full flex items-center gap-2 py-1.5 rounded-lg text-left transition-all duration-100"
        style={{
          paddingLeft: `${0.5 + depth * 0.75}rem`,
          paddingRight: '0.5rem',
          background: isActive ? 'var(--hd-accent-light)' : 'transparent',
          color: isActive ? 'var(--hd-accent)' : hasSection ? 'var(--hd-text-soft)' : 'var(--hd-muted)',
          cursor: hasSection ? 'pointer' : 'default',
          fontSize: depth === 0 ? '0.8rem' : '0.75rem',
          fontWeight: depth === 0 ? 600 : 400,
        }}
      >
        {isActive && depth > 0 && (
          <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--hd-accent)' }} />
        )}
        {item.title}
      </button>
      {item.children?.map((child) => (
        <TocItemRow key={child.id} item={child} activeId={activeId} depth={depth + 1} onSelect={onSelect} />
      ))}
    </div>
  )
}

/* -------------------- Main page -------------------- */

export default function DocsPage() {
  const [activeSectionId, setActiveSectionId] = useState(INITIAL_SECTION_ID)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle')
  const [editorValues, setEditorValues] = useState<Record<string, Record<string, unknown>[]>>({})

  const section = DOC_SECTIONS[activeSectionId]
  const initialValue = docNodesToPlate(section?.content ?? [])

  const handleEditorChange = useCallback(
    (value: Record<string, unknown>[]) => {
      setEditorValues((prev) => ({ ...prev, [activeSectionId]: value }))
    },
    [activeSectionId]
  )

  function handleSave() {
    setSaveStatus('saving')
    setTimeout(() => {
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2000)
    }, 600)
  }

  const currentValue = editorValues[activeSectionId] ?? initialValue

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: 'var(--hd-bg)' }}>
      {/* Top nav — matches hyperdocs editor screenshot */}
      <header
        className="flex items-center justify-between px-4 py-2 border-b flex-shrink-0 z-20"
        style={{ borderColor: 'var(--hd-border)', background: 'var(--hd-bg)' }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-gray-100"
            style={{ color: 'var(--hd-muted)' }}
            title="Toggle sidebar"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="8" fill="#f26522" />
              <path d="M10 10h10a6 6 0 0 1 0 12H10V10z" fill="white" opacity="0.9" />
              <rect x="10" y="24" width="16" height="2.5" rx="1.25" fill="white" opacity="0.7" />
            </svg>
            <span className="font-bold text-sm" style={{ color: 'var(--hd-text)' }}>Hyperdocs</span>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-xs" style={{ color: 'var(--hd-muted)' }}>
            <span>/</span>
            <span style={{ color: 'var(--hd-text-soft)' }}>acme/backend-api</span>
            <span>/</span>
            <span style={{ color: 'var(--hd-muted)' }}>{section?.title}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Branch badge */}
          <div
            className="hidden sm:flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border"
            style={{ borderColor: 'var(--hd-border)', color: 'var(--hd-muted)' }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" />
            </svg>
            main
          </div>

          {/* Synced badge */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs" style={{ color: 'var(--hd-muted)' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
            Synced
          </div>

          <Link
            href="/docs/preview"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border hover:bg-gray-50"
            style={{ borderColor: 'var(--hd-border)', color: 'var(--hd-text-soft)' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
            </svg>
            Preview
          </Link>

          <button
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90"
            style={{
              background: saveStatus === 'saved' ? '#22c55e' : 'var(--hd-accent)',
              opacity: saveStatus === 'saving' ? 0.7 : 1,
            }}
          >
            {saveStatus === 'saving' ? (
              <>
                <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Saving…
              </>
            ) : saveStatus === 'saved' ? (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                Saved
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
                </svg>
                Publish
              </>
            )}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar — Navigation panel */}
        {sidebarOpen && (
          <aside
            className="w-60 flex-shrink-0 flex flex-col border-r overflow-hidden"
            style={{ borderColor: 'var(--hd-border)', background: 'var(--hd-bg)' }}
          >
            {/* Search docs */}
            <div className="px-3 py-3 border-b" style={{ borderColor: 'var(--hd-border)' }}>
              <div className="relative">
                <svg className="absolute left-2.5 top-1/2 -translate-y-1/2" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--hd-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search docs..."
                  className="w-full pl-7 pr-3 py-1.5 rounded-lg text-xs outline-none border"
                  style={{
                    background: 'var(--hd-bg-soft)',
                    borderColor: 'var(--hd-border)',
                    color: 'var(--hd-text)',
                  }}
                />
              </div>
            </div>

            {/* Navigation label */}
            <div className="px-3 py-2 flex items-center justify-between">
              <span className="text-xs font-semibold" style={{ color: 'var(--hd-muted)' }}>Navigation</span>
            </div>

            {/* TOC */}
            <nav className="flex-1 overflow-y-auto py-1 px-2">
              {TABLE_OF_CONTENTS.map((item) => (
                <TocItemRow key={item.id} item={item} activeId={activeSectionId} depth={0} onSelect={setActiveSectionId} />
              ))}
            </nav>

            {/* Footer */}
            <div className="px-3 py-3 border-t" style={{ borderColor: 'var(--hd-border)' }}>
              <Link
                href="/connect-repo"
                className="flex items-center gap-2 text-xs transition-colors hover:opacity-80"
                style={{ color: 'var(--hd-muted)' }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
                </svg>
                Add repository
              </Link>
            </div>
          </aside>
        )}

        {/* Editor area */}
        <main className="flex-1 overflow-hidden flex flex-col">
          {section ? (
            <PlateEditor
              key={activeSectionId}
              initialValue={currentValue}
              onChange={handleEditorChange}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center" style={{ color: 'var(--hd-muted)' }}>
              <div className="text-center">
                <svg className="mx-auto mb-3 opacity-30" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                </svg>
                <p className="text-sm">Select a section to start editing</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
