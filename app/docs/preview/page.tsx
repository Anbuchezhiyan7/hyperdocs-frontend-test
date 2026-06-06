'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { TABLE_OF_CONTENTS, DOC_SECTIONS, TocItem, DocNode } from '@/lib/mock-data'
import { IconCopy, IconLogo, IconEdit, IconSearch, IconPage, IconChevronRight } from '@/components/shared/icons'

/* -------------------- Render helpers -------------------- */

function renderNode(node: DocNode, idx: number) {
  switch (node.type) {
    case 'h1':
      return (
        <h1 key={idx} className="text-3xl font-bold mt-8 mb-4" style={{ color: 'var(--hd-text)' }}>
          {node.text}
        </h1>
      )
    case 'h2':
      return (
        <h2
          key={idx}
          className="text-2xl font-semibold mt-7 mb-3 pb-2"
          style={{ color: 'var(--hd-text)', borderBottom: '1px solid var(--hd-border)' }}
        >
          {node.text}
        </h2>
      )
    case 'h3':
      return (
        <h3 key={idx} className="text-xl font-semibold mt-5 mb-2" style={{ color: 'var(--hd-text)' }}>
          {node.text}
        </h3>
      )
    case 'p':
      return (
        <p key={idx} className="leading-7 mb-4 text-[15px]" style={{ color: 'var(--hd-text-soft)' }}>
          {node.text}
        </p>
      )
    case 'blockquote':
      return (
        <blockquote
          key={idx}
          className="my-5 px-5 py-3 text-sm rounded-r-xl italic"
          style={{
            borderLeft: '3px solid var(--hd-accent)',
            background: 'var(--hd-accent-light)',
            color: 'var(--hd-text-soft)',
          }}
        >
          {node.text}
        </blockquote>
      )
    case 'ul':
      return (
        <ul key={idx} className="my-4 space-y-1.5 pl-2">
          {node.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm leading-6" style={{ color: 'var(--hd-text-soft)' }}>
              <span
                className="mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: 'var(--hd-accent)' }}
              />
              {item}
            </li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol key={idx} className="my-4 space-y-1.5 pl-2">
          {node.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm leading-6" style={{ color: 'var(--hd-text-soft)' }}>
              <span
                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5"
                style={{ background: 'var(--hd-accent-light)', color: 'var(--hd-accent)' }}
              >
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
      )
    case 'code':
      return (
        <div key={idx} className="my-5 rounded-xl overflow-hidden" style={{ border: '1px solid var(--hd-border)' }}>
          <div
            className="flex items-center justify-between px-4 py-2 text-xs font-medium"
            style={{ background: 'var(--hd-surface)', color: 'var(--hd-muted)', borderBottom: '1px solid var(--hd-border)' }}
          >
            <span>{node.lang}</span>
            <button
              onClick={() => navigator.clipboard.writeText(node.text)}
              className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
            >
              <IconCopy />
              Copy
            </button>
          </div>
          <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed" style={{ background: '#1e1e2e', color: '#cdd6f4' }}>
            <code>{node.text}</code>
          </pre>
        </div>
      )
    case 'table':
      return (
        <div key={idx} className="my-5 overflow-x-auto rounded-xl" style={{ border: '1px solid var(--hd-border)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'var(--hd-surface)' }}>
                {node.headers.map((h, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-left font-semibold text-sm"
                    style={{ color: 'var(--hd-text)', borderBottom: '1px solid var(--hd-border)' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {node.rows.map((row, ri) => (
                <tr key={ri} style={{ borderTop: '1px solid var(--hd-border)' }}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3" style={{ color: 'var(--hd-text-soft)' }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    default:
      return null
  }
}

/* -------------------- TOC Item -------------------- */

function PreviewTocItem({
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
  const hasSection = item.id in DOC_SECTIONS
  const isActive = item.id === activeId

  return (
    <div>
      <button
        onClick={() => hasSection && onSelect(item.id)}
        className="w-full text-left py-1.5 rounded-lg px-2 transition-all text-xs"
        style={{
          paddingLeft: `${depth * 12 + 8}px`,
          background: isActive ? 'var(--hd-accent-light)' : 'transparent',
          color: isActive ? 'var(--hd-accent)' : hasSection ? 'var(--hd-text-soft)' : 'var(--hd-muted)',
          fontWeight: depth === 0 ? 600 : 400,
          cursor: hasSection ? 'pointer' : 'default',
        }}
      >
        {depth > 0 && !isActive && <span style={{ color: 'var(--hd-muted)' }}>· </span>}
        {item.title}
      </button>
      {item.children?.map((c) => (
        <PreviewTocItem key={c.id} item={c} activeId={activeId} depth={depth + 1} onSelect={onSelect} />
      ))}
    </div>
  )
}

/* -------------------- Page -------------------- */

export default function PreviewPage() {
  const [activeSectionId, setActiveSectionId] = useState('introduction')
  const section = DOC_SECTIONS[activeSectionId]
  const allSections = Object.values(DOC_SECTIONS)

  const pageTitle = section?.title
    ? `${section.title} | Preview | Hyperdocs`
    : 'Preview | Hyperdocs'

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: 'var(--hd-bg)' }}>
      <title>{pageTitle}</title>
      <meta name="description" content="Hyperdocs is public documentation software for Product docs, API Docs and Help centers. Built to be easy to write, read and maintain" />
      {/* Header */}
      <header
        className="flex items-center justify-between px-5 py-2.5 border-b flex-shrink-0"
        style={{ borderColor: 'var(--hd-border)', background: 'var(--hd-bg)' }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <IconLogo />
            <span className="font-bold text-sm" style={{ color: 'var(--hd-text)' }}>Hyperdocs</span>
          </div>
          <span className="text-xs" style={{ color: 'var(--hd-border)' }}>/</span>
          <span className="text-xs" style={{ color: 'var(--hd-text-soft)' }}>acme/backend-api</span>
          <div
            className="text-xs px-2.5 py-0.5 rounded-full font-medium"
            style={{ background: 'var(--hd-accent-light)', color: 'var(--hd-accent)' }}
          >
            Preview
          </div>
        </div>

        <Link
          href="/docs"
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90"
          style={{ background: 'var(--hd-accent)' }}
        >
          <IconEdit />
          Back to Editor
        </Link>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left TOC navigation */}
        <aside
          className="w-56 flex-shrink-0 border-r overflow-y-auto"
          style={{ borderColor: 'var(--hd-border)', background: 'var(--hd-bg)' }}
        >
          {/* Search */}
          <div className="px-3 py-3 border-b" style={{ borderColor: 'var(--hd-border)' }}>
            <div className="relative">
              <IconSearch className="absolute left-2.5 top-1/2 -translate-y-1/2" stroke="var(--hd-muted)" />
              <input
                type="text"
                placeholder="Search docs..."
                readOnly
                className="w-full pl-7 pr-3 py-1.5 rounded-lg text-xs outline-none border"
                style={{ background: 'var(--hd-bg-soft)', borderColor: 'var(--hd-border)', color: 'var(--hd-text)' }}
              />
            </div>
          </div>

          <nav className="py-2 px-2">
            {TABLE_OF_CONTENTS.map((item) => (
              <PreviewTocItem key={item.id} item={item} activeId={activeSectionId} depth={0} onSelect={setActiveSectionId} />
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto" style={{ background: 'var(--hd-bg)' }}>
          <div className="max-w-3xl mx-auto px-10 py-10">
            {section ? (
              <article>
                {section.content.map((node, i) => renderNode(node, i))}
              </article>
            ) : (
              <p style={{ color: 'var(--hd-muted)' }}>Select a section from the sidebar.</p>
            )}

            {/* All sections grid */}
            <div className="mt-16 pt-8" style={{ borderTop: '1px solid var(--hd-border)' }}>
              <h2 className="text-base font-semibold mb-5" style={{ color: 'var(--hd-text)' }}>
                All Documentation Sections
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {allSections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => setActiveSectionId(sec.id)}
                    className="flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-150 group hover:shadow-sm"
                    style={{
                      background: sec.id === activeSectionId ? 'var(--hd-accent-light)' : 'var(--hd-bg)',
                      borderColor: sec.id === activeSectionId ? 'var(--hd-accent)' : 'var(--hd-border)',
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: sec.id === activeSectionId ? 'var(--hd-accent)' : 'var(--hd-accent-light)',
                      }}
                    >
                      <IconPage
                        width="14"
                        height="14"
                        stroke={sec.id === activeSectionId ? 'white' : 'var(--hd-accent)'}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm" style={{ color: 'var(--hd-text)' }}>
                        {sec.title}
                      </p>
                      <p className="text-xs truncate mt-0.5" style={{ color: 'var(--hd-muted)' }}>
                        {(() => {
                          const p = sec.content.find((n) => n.type === 'p')
                          return p && p.type === 'p' ? p.text.slice(0, 85) + '…' : `${sec.content.length} elements`
                        })()}
                      </p>
                    </div>
                    <IconChevronRight
                      className="flex-shrink-0 transition-transform group-hover:translate-x-1"
                      width="14"
                      height="14"
                      stroke="var(--hd-muted)"
                      strokeWidth="2"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Right on-page mini TOC */}
        {section && (
          <aside className="w-44 flex-shrink-0 border-l overflow-y-auto py-5 px-4 hidden lg:block" style={{ borderColor: 'var(--hd-border)' }}>
            <p className="text-[10px] uppercase tracking-widest font-semibold mb-3" style={{ color: 'var(--hd-muted)' }}>
              On this page
            </p>
            {section.content
              .filter((n) => n.type === 'h2' || n.type === 'h3')
              .map((n, i) => (
                <div
                  key={i}
                  className="py-1 text-xs leading-5 cursor-pointer transition-all hover:opacity-100 opacity-70"
                  style={{
                    paddingLeft: n.type === 'h3' ? '0.75rem' : '0',
                    color: 'var(--hd-text-soft)',
                  }}
                >
                  {(n as { type: string; text: string }).text}
                </div>
              ))}
          </aside>
        )}
      </div>
    </div>
  )
}
