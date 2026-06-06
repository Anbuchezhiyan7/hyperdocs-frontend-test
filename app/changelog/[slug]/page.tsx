'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useChangelogStore, ChangelogEntry, ChangelogTag } from '@/lib/store/useChangelogStore'
import { LucideIconByName } from '@/components/home-editor/icon-picker'

/* ------------------------------------------------------------------ */
/*  Recursive Plate JSON to React HTML Renderer                         */
/* ------------------------------------------------------------------ */
function renderLeaf(textNode: any, key: string) {
  let element = <span key={key}>{textNode.text}</span>
  if (textNode.bold) {
    element = <strong key={key} className="font-bold text-hd-text">{element}</strong>
  }
  if (textNode.italic) {
    element = <em key={key} className="italic">{element}</em>
  }
  if (textNode.underline) {
    element = <u key={key} className="underline decoration-1 underline-offset-2">{element}</u>
  }
  if (textNode.strikethrough) {
    element = <s key={key} className="line-through opacity-60">{element}</s>
  }
  if (textNode.code) {
    element = (
      <code 
        key={key} 
        style={{ background: 'var(--hd-accent-light)', color: 'var(--hd-accent)', border: '1px solid var(--hd-accent-mid)' }}
        className="px-1.5 py-0.5 rounded text-[0.85em] font-mono"
      >
        {element}
      </code>
    )
  }
  return element
}

function renderChildren(children: any[]): React.ReactNode[] {
  if (!children) return []
  return children.map((child, idx) => {
    const key = `child-${idx}`
    if (typeof child.text === 'string') {
      return renderLeaf(child, key)
    }
    return renderNode(child, key)
  })
}

function renderNode(node: any, key: string): React.ReactNode {
  if (!node) return null

  switch (node.type) {
    case 'h1':
      return <h1 key={key} className="text-2xl md:text-3xl font-bold mt-7 mb-4 text-hd-text tracking-tight">{renderChildren(node.children)}</h1>
    case 'h2':
      return <h2 key={key} className="text-xl font-semibold mt-6 mb-3 text-hd-text tracking-tight border-b border-hd-border pb-1.5">{renderChildren(node.children)}</h2>
    case 'h3':
      return <h3 key={key} className="text-lg font-semibold mt-5 mb-2 text-hd-text tracking-tight">{renderChildren(node.children)}</h3>
    case 'p':
      // Avoid empty paragraph collapse
      if (node.children?.length === 1 && node.children[0].text === '') {
        return <div key={key} className="h-4" />
      }
      return <p key={key} className="my-3 leading-7 text-hd-text-soft text-[0.92rem]">{renderChildren(node.children)}</p>
    case 'ul':
      return <ul key={key} className="list-disc pl-5 my-4 flex flex-col gap-2 text-[0.92rem] text-hd-text-soft">{renderChildren(node.children)}</ul>
    case 'ol':
      return <ol key={key} className="list-decimal pl-5 my-4 flex flex-col gap-2 text-[0.92rem] text-hd-text-soft">{renderChildren(node.children)}</ol>
    case 'li':
      return <li key={key} className="leading-relaxed">{renderChildren(node.children)}</li>
    case 'lic':
      return <span key={key}>{renderChildren(node.children)}</span>
    case 'blockquote':
      return (
        <blockquote 
          key={key} 
          style={{ borderLeft: '3px solid var(--hd-accent)', background: 'var(--hd-accent-light)' }}
          className="my-5 px-5 py-3 rounded-r-xl italic text-[0.9rem] text-hd-text-soft"
        >
          {renderChildren(node.children)}
        </blockquote>
      )
    case 'hr':
      return <hr key={key} className="my-6 border-none h-px bg-hd-border" />
    case 'code_block':
      return (
        <pre key={key} className="p-4 my-4 rounded-xl overflow-x-auto text-[0.85rem] font-mono bg-neutral-900 text-neutral-200 border border-neutral-800">
          <code>{renderChildren(node.children)}</code>
        </pre>
      )
    case 'code_line':
      return <div key={key}>{renderChildren(node.children)}</div>
    case 'img':
    case 'image':
      return (
        <div key={key} className="my-5 rounded-xl overflow-hidden border border-solid border-hd-border">
          <img src={node.url} alt={node.alt || ''} className="w-full h-auto block" />
        </div>
      )
    default:
      if (node.children) {
        return <div key={key}>{renderChildren(node.children)}</div>
      }
      return null
  }
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                      */
/* ------------------------------------------------------------------ */
export default function PublicChangelogYearPage() {
  const params = useParams()
  const slug = params?.slug as string
  const activeYear = slug ? slug.split('-')[0] : '2026'

  const [entries, setEntries] = useState<ChangelogEntry[]>([])
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null)
  
  // Load data from LocalStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hyperdocs_changelog_entries_v2')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          if (parsed && parsed.length > 0) {
            setEntries(parsed)
            return
          }
        } catch (e) {
          // ignore
        }
      }
      
      // Fallback dummy entries spanning 5 years
      const now = new Date()
      const toKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
      const toLabel = (d: Date) => `${d.toLocaleString('en-US', { month: 'short' })} ${d.getDate()}, ${d.getFullYear()}`
      
      const defaultContent = (title: string, subtitle: string, bullets: string[]): Record<string, unknown>[] => {
        const id = title.toLowerCase().replace(/[^a-z0-9]/g, '-')
        return [
          { id: `${id}-h1`, type: 'h1', children: [{ text: title }] },
          { id: `${id}-p`, type: 'p', children: [{ text: subtitle }] },
          { id: `${id}-h2`, type: 'h2', children: [{ text: 'Improvements' }] },
          {
            id: `${id}-ul`,
            type: 'ul',
            children: bullets.map((b, idx) => ({
              id: `${id}-li-${idx}`,
              type: 'li',
              children: [{ type: 'lic', children: [{ text: b }] }]
            }))
          }
        ]
      }

      const d_2026_1 = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const d_2026_2 = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 15)
      const d_2026_3 = new Date(now.getFullYear(), now.getMonth() - 2, now.getDate())
      const d_2025_1 = new Date(2025, 11, 14)
      const d_2025_2 = new Date(2025, 4, 10)
      const d_2024_1 = new Date(2024, 9, 22)
      const d_2024_2 = new Date(2024, 2, 5)
      const d_2023_1 = new Date(2023, 10, 18)
      const d_2023_2 = new Date(2023, 3, 12)
      const d_2022_1 = new Date(2022, 8, 25)
      const d_2022_2 = new Date(2022, 1, 8)

      const mockEntries: ChangelogEntry[] = [
        {
          dateKey: toKey(d_2026_1),
          label: toLabel(d_2026_1),
          tags: [{ id: 'tag-new-releases', label: 'New releases', color: '#f26522', icon: 'Rocket' }],
          content: defaultContent("Product update", "See what's new and improved in our latest update.", [
            "We recently released site-level permissions, to make it easier to manage permissions for all of your content.",
            "We've simplified the page width options in docs pages so you can now only apply full-width to an entire page."
          ])
        },
        {
          dateKey: toKey(d_2026_2),
          label: toLabel(d_2026_2),
          tags: [
            { id: 'tag-improvements', label: 'Improvements', color: '#8b5cf6', icon: 'Sparkles' },
            { id: 'tag-fixes', label: 'Fixes', color: '#10b981', icon: 'Wrench' }
          ],
          content: defaultContent("Inheritance & Permissions", "Tweaking the way permissions are inherited to make them simpler and easier to manage.", [
            "For content linked to a site, site-level permissions now take precedence over permissions inherited from parent collections.",
            "Fixed a bug where unauthorized users could view hidden draft document sub-trees."
          ])
        },
        {
          dateKey: toKey(d_2026_3),
          label: toLabel(d_2026_3),
          tags: [{ id: 'tag-improvements', label: 'Improvements', color: '#8b5cf6', icon: 'Sparkles' }],
          content: defaultContent("Search Optimization", "Introducing channels and enhanced indexing speed.", [
            "We've added a new, compact 'On this page' section for narrower screens to make navigation inside updates smoother.",
            "Auto-sync with your Git repositories is now 2x faster."
          ])
        },
        {
          dateKey: toKey(d_2025_1),
          label: toLabel(d_2025_1),
          tags: [{ id: 'tag-new-releases', label: 'New releases', color: '#f26522', icon: 'Rocket' }],
          content: defaultContent("AI Assistant V2 Release", "Our next-generation document chat assistant is now live.", [
            "Ask complex questions directly inside articles and receive cited code snippets.",
            "Added support for French and German semantic context queries."
          ])
        },
        {
          dateKey: toKey(d_2025_2),
          label: toLabel(d_2025_2),
          tags: [
            { id: 'tag-improvements', label: 'Improvements', color: '#8b5cf6', icon: 'Sparkles' },
            { id: 'tag-fixes', label: 'Fixes', color: '#10b981', icon: 'Wrench' }
          ],
          content: defaultContent("Table Formatting & Performance", "Improved layout settings for rendering data tables.", [
            "Added border formatting controls for rows and columns in the WYSIWYG editor.",
            "Fixed cell alignment issues on mobile Safari browsers."
          ])
        },
        {
          dateKey: toKey(d_2024_1),
          label: toLabel(d_2024_1),
          tags: [{ id: 'tag-improvements', label: 'Improvements', color: '#8b5cf6', icon: 'Sparkles' }],
          content: defaultContent("Team Workspace Invites", "Invite colleagues with specific viewer or builder permissions.", [
            "Added direct Google Workspace integrations to sync organizational directories.",
            "Improved access control dashboard load speed by 40%."
          ])
        },
        {
          dateKey: toKey(d_2024_2),
          label: toLabel(d_2024_2),
          tags: [{ id: 'tag-new-releases', label: 'New releases', color: '#f26522', icon: 'Rocket' }],
          content: defaultContent("Custom Callout Blocks", "Alert, Caution, and Tip blocks now support customizable emojis.", [
            "Add highlights and custom styling to draw attention to critical parts of your documentation."
          ])
        },
        {
          dateKey: toKey(d_2023_1),
          label: toLabel(d_2023_1),
          tags: [{ id: 'tag-fixes', label: 'Fixes', color: '#10b981', icon: 'Wrench' }],
          content: defaultContent("Asset Loading & CDN fixes", "Resolving asset delays across European regions.", [
            "Synced help center media items with premium Cloudflare CDN edges.",
            "Fixed a layout shift when loading multiple inline SVG icons."
          ])
        },
        {
          dateKey: toKey(d_2023_2),
          label: toLabel(d_2023_2),
          tags: [{ id: 'tag-improvements', label: 'Improvements', color: '#8b5cf6', icon: 'Sparkles' }],
          content: defaultContent("Navigation Flow Redesign", "Improved readability and spacing for the left sidebar.", [
            "Introduced nested collapse states for documents with multiple sub-directories."
          ])
        },
        {
          dateKey: toKey(d_2022_1),
          label: toLabel(d_2022_1),
          tags: [{ id: 'tag-new-releases', label: 'New releases', color: '#f26522', icon: 'Rocket' }],
          content: defaultContent("Introducing Custom Subdomains", "Publish your documentation center to your own subdomain.", [
            "We now support full SSL provisioning and custom CNAME routing configurations.",
            "Added auto-redirect setup from HTTP to HTTPS."
          ])
        },
        {
          dateKey: toKey(d_2022_2),
          label: toLabel(d_2022_2),
          tags: [{ id: 'tag-fixes', label: 'Fixes', color: '#10b981', icon: 'Wrench' }],
          content: defaultContent("Markdown Import Bugfixes", "Resolved parsing errors when uploading multi-nested markdown files.", [
            "Fixed blockquote parsing when using backticks inside list items."
          ])
        }
      ]
      setEntries(mockEntries)
    }
  }, [])

  // Helper to extract year from entry
  const getYear = (entry: ChangelogEntry) => {
    return entry.dateKey.split('-')[0]
  }

  // Get distinct years in descending order
  const years = Array.from(new Set(entries.map(getYear))).sort((a, b) => b.localeCompare(a))

  // Get distinct tags
  const allUsedTags: ChangelogTag[] = []
  entries.forEach(entry => {
    entry.tags.forEach(t => {
      if (!allUsedTags.some(ut => ut.id === t.id)) {
        allUsedTags.push(t)
      }
    })
  })

  // Filter entries by selected active year AND selected tag
  const filteredEntries = entries.filter(e => {
    const yearMatch = getYear(e) === activeYear
    const tagMatch = selectedTagId ? e.tags.some(t => t.id === selectedTagId) : true
    return yearMatch && tagMatch
  })

  // Generate Table of Contents (TOC) structure
  const tocItems = filteredEntries.map(entry => {
    const content = entry.content as any[]
    // Find the H1 title text
    const h1Node = content.find(n => n.type === 'h1')
    const title = h1Node?.children?.[0]?.text || entry.label

    // Find any H2 node text
    const h2Nodes = content.filter(n => n.type === 'h2')
    const subheadings = h2Nodes.map(n => n.children?.[0]?.text).filter(Boolean) as string[]

    return {
      dateKey: entry.dateKey,
      title,
      subheadings
    }
  })

  return (
    <div className="min-h-screen bg-hd-bg text-hd-text flex flex-col" style={{ fontFamily: "var(--font-sans), sans-serif" }}>
      
      {/* ── Top Navbar ── */}
      <header className="sticky top-0 z-40 bg-hd-bg/85 backdrop-blur-md border-b border-hd-border">
        <div className="max-w-6xl mx-auto h-14 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/docs" className="flex items-center gap-2 select-none no-underline">
              <svg width="24" height="24" viewBox="0 0 36 36" fill="none">
                <rect width="36" height="36" rx="8" fill="#f26522" />
                <path d="M10 10h10a6 6 0 0 1 0 12H10V10z" fill="white" opacity="0.9" />
                <rect x="10" y="24" width="16" height="2.5" rx="1.25" fill="white" opacity="0.7" />
              </svg>
              <span className="font-bold text-base text-hd-text tracking-tight">Hyperdocs</span>
            </Link>
            <span className="text-xs text-hd-muted py-0.5 px-2 bg-hd-surface rounded-full border border-hd-border select-none">Changelog</span>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/docs" 
              className="text-xs font-semibold text-hd-text hover:text-hd-accent transition-colors no-underline flex items-center gap-1"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              Documentation
            </Link>
            <Link 
              href="/admin/changelog" 
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-hd-accent hover:opacity-90 transition-all no-underline"
            >
              Admin Editor
            </Link>
          </div>
        </div>
      </header>

      {/* ── Main Layout ── */}
      <div className="flex-1 w-full max-w-6xl mx-auto px-6 py-10 flex gap-8">
        
        {/* 1. Left Column: Years */}
        <aside className="w-44 shrink-0 hidden md:block">
          <div className="sticky top-24 flex flex-col gap-1.5">
            <div className="text-[0.65rem] font-bold text-hd-muted uppercase tracking-wider mb-2 px-2.5">
              Archive
            </div>
            {years.map(y => {
              const isActive = y === activeYear
              return (
                <Link
                  key={y}
                  href={`/changelog/${y}-product-updates`}
                  style={{ color: isActive ? 'var(--hd-accent)' : 'var(--hd-text-soft)' }}
                  className={`w-full text-left px-2.5 py-2 text-sm font-semibold rounded-lg transition-all border-none bg-transparent hover:bg-hd-surface no-underline block ${isActive ? 'bg-hd-accent-light! text-hd-accent!' : ''}`}
                >
                  {y}
                </Link>
              )
            })}
            {years.length === 0 && (
              <span className="text-xs text-hd-muted px-2.5 italic">No archives</span>
            )}
          </div>
        </aside>

        {/* 2. Main Content Column: Changelog list */}
        <main className="flex-1 min-w-0">
          <div className="max-w-2xl flex flex-col gap-16">
            
            {/* Header Title */}
            <div>
              <h1 className="text-3xl font-extrabold text-hd-text tracking-tight mb-2">{activeYear} Product Updates</h1>
              <p className="text-sm text-hd-text-soft">Latest updates, features and improvements added to the platform in {activeYear}.</p>
            </div>

            {/* Filter status */}
            {selectedTagId && (
              <div className="flex items-center gap-2 px-3 py-2 bg-hd-surface border border-hd-border rounded-lg text-xs">
                <span>Filtering by:</span>
                {allUsedTags.filter(t => t.id === selectedTagId).map(tag => (
                  <span 
                    key={tag.id} 
                    style={{ background: `${tag.color}15`, color: tag.color, borderColor: `${tag.color}25` }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-semibold border border-solid"
                  >
                    <LucideIconByName name={tag.icon} size={11} color={tag.color} />
                    <span>{tag.label}</span>
                  </span>
                ))}
                <button 
                  onClick={() => setSelectedTagId(null)}
                  className="bg-transparent border-none text-hd-accent hover:text-hd-accent-hover font-semibold cursor-pointer underline ml-auto text-xs"
                >
                  Clear Filter
                </button>
              </div>
            )}

            {/* Render Entries flatly */}
            {filteredEntries.length === 0 ? (
              <div className="py-20 text-center text-hd-muted text-sm border border-dashed border-hd-border rounded-xl">
                No updates match the selected criteria.
              </div>
            ) : (
              <div className="flex flex-col gap-12">
                {filteredEntries.map(entry => (
                  <div 
                    key={entry.dateKey} 
                    id={`entry-${entry.dateKey}`}
                    className="flex flex-col md:flex-row gap-6 border-b border-hd-border/50 pb-12 last:border-none last:pb-0"
                  >
                    {/* Entry Date & Tag Column */}
                    <div className="w-full md:w-36 shrink-0 flex flex-col items-start gap-2">
                      <span className="text-xs font-semibold text-hd-muted uppercase tracking-wider">
                        {entry.label}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {entry.tags.map(tag => (
                          <span 
                            key={tag.id}
                            style={{ background: `${tag.color}15`, color: tag.color, borderColor: `${tag.color}25` }}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[0.65rem] font-bold border border-solid"
                          >
                            <LucideIconByName name={tag.icon} size={10} color={tag.color} />
                            <span>{tag.label}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Entry Content Area */}
                    <div className="flex-1 min-w-0 prose max-w-none">
                      {entry.content.map((node, index) => renderNode(node, `node-${index}`))}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </main>

        {/* 3. Right Column: Tags & TOC */}
        <aside className="w-56 shrink-0 hidden lg:block">
          <div className="sticky top-24 flex flex-col gap-8">
            
            {/* Tag List */}
            {allUsedTags.length > 0 && (
              <div className="flex flex-col gap-3">
                {/* TAGS Header */}
                <div className="flex items-center justify-between px-1">
                  <div className="text-[0.65rem] font-bold text-hd-muted uppercase tracking-wider flex items-center gap-1.5 select-none">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-hd-muted">
                      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                      <line x1="7" y1="7" x2="7.01" y2="7" />
                    </svg>
                    <span>Tags</span>
                  </div>
                  {selectedTagId && (
                    <button
                      onClick={() => setSelectedTagId(null)}
                      className="bg-transparent border-none text-[0.68rem] text-hd-muted hover:text-hd-text font-bold cursor-pointer flex items-center gap-1 transition-colors p-0"
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                      <span>Clear</span>
                    </button>
                  )}
                </div>

                {/* Tag Pills Grid/Wrap */}
                <div className="flex flex-wrap gap-2">
                  {allUsedTags.map(tag => {
                    const isSelected = tag.id === selectedTagId
                    return (
                      <button
                        key={tag.id}
                        onClick={() => setSelectedTagId(isSelected ? null : tag.id)}
                        style={{
                          backgroundColor: isSelected ? tag.color : 'var(--hd-surface, #1e1e20)',
                          borderColor: isSelected ? tag.color : 'var(--hd-border, #2d2d30)',
                          color: isSelected ? '#ffffff' : 'var(--hd-text, #e4e4e7)'
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-solid transition-all cursor-pointer hover:opacity-90 active:scale-95"
                      >
                        <LucideIconByName name={tag.icon} size={11} color={isSelected ? '#ffffff' : 'var(--hd-text-soft, #a1a1aa)'} />
                        <span>{tag.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* On This Page TOC */}
            {tocItems.length > 0 && (
              <div className="flex flex-col gap-3">
                <div className="text-[0.65rem] font-bold text-hd-muted uppercase tracking-wider px-1">
                  On This Page
                </div>
                <nav className="flex flex-col gap-2.5 border-l border-hd-border pl-3">
                  {tocItems.map(item => (
                    <div key={item.dateKey} className="flex flex-col gap-1.5">
                      <a
                        href={`#entry-${item.dateKey}`}
                        onClick={(e) => {
                          e.preventDefault()
                          document.getElementById(`entry-${item.dateKey}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }}
                        className="text-xs text-hd-text-soft hover:text-hd-accent font-semibold transition-colors no-underline block"
                      >
                        {item.title}
                      </a>
                      {item.subheadings.map((sub, idx) => (
                        <span
                          key={idx}
                          className="text-[0.7rem] text-hd-muted pl-2.5 border-l border-hd-border py-0.5 select-none"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  ))}
                </nav>
              </div>
            )}

          </div>
        </aside>

      </div>
    </div>
  )
}
