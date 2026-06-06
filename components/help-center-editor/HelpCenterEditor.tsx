'use client'

/**
 * HelpCenterEditor.tsx — Plate-based editor for the Help Center page.
 * Features: editable hero (title, description, search bar with icon/placeholder),
 * full block support, card blocks, 2-column & 3-column layouts.
 */

import React, { useRef, useState } from 'react'
import { Plate, PlateContent, usePlateEditor } from 'platejs/react'
import type { PlateElementProps } from 'platejs/react'
import {
  BasicBlocksPlugin,
  BasicMarksPlugin,
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
  StrikethroughPlugin,
  CodePlugin,
  H1Plugin,
  H2Plugin,
  H3Plugin,
  BlockquotePlugin,
  HorizontalRulePlugin,
} from '@platejs/basic-nodes/react'
import { SlashPlugin, SlashInputPlugin } from '@platejs/slash-command/react'
import { CardPlugin, ColumnGroupPlugin, ColumnPlugin } from '@/lib/card-plugin'
import { TablePlugin, TableCellPlugin, TableCellHeaderPlugin, TableRowPlugin } from '@platejs/table/react'
import { ImagePlugin, MediaEmbedPlugin } from '@platejs/media/react'
import { ListPlugin } from '@platejs/list/react'
import { IndentPlugin } from '@platejs/indent/react'
import { CodeBlockPlugin, CodeLinePlugin } from '@platejs/code-block/react'
import { ButtonPlugin } from '@/lib/button-plugin'
import { CalloutPlugin } from '@/lib/callout-plugin'

import { CardElement } from '@/components/home-editor/card-element'
import { PlateElement } from 'platejs/react'
import { SlashInputElement } from '@/components/editor/slash-input-element'
import { PlusInsertButton } from '@/components/editor/plus-insert-button'
import { FloatingToolbar } from '@/components/editor/floating-toolbar'
import { TableFloatingToolbar } from '@/components/editor/table-floating-toolbar'
import { EditorModals } from '@/components/editor/editor-modals'

import {
  H1Element,
  H2Element,
  H3Element,
  ParagraphElement,
  BlockquoteElement,
  HrElement,
  TableElement,
  TableRowElement,
  TableCellElement,
  TableCellHeaderElement,
  ImageElement,
  CodeBlockElement,
  CodeLineElement,
  BoldLeaf,
  ItalicLeaf,
  UnderlineLeaf,
  StrikethroughLeaf,
  CodeLeaf,
} from '@/components/editor/plate-elements'
import { MediaEmbedElement } from '@/components/editor/media-embed-element'
import { ButtonElement } from '@/components/editor/button-element'
import { CalloutElement } from '@/components/editor/callout-element'

/* ------------------------------------------------------------------ */
/*  Column layout elements                                              */
/* ------------------------------------------------------------------ */
function ColumnGroupElement({ children, ...props }: PlateElementProps) {
  return (
    <PlateElement as="div" {...props} className="my-4">
      <div style={{ display: 'flex', gap: 16, width: '100%' }}>
        {children}
      </div>
    </PlateElement>
  )
}

function ColumnElement({ children, ...props }: PlateElementProps) {
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

/* ------------------------------------------------------------------ */
/*  Hero config types                                                   */
/* ------------------------------------------------------------------ */
export interface HeroConfig {
  title: string
  description: string
  searchPlaceholder: string
  searchIcon: string // lucide icon name
}

/* ------------------------------------------------------------------ */
/*  Default hero config                                                 */
/* ------------------------------------------------------------------ */
export const DEFAULT_HERO_CONFIG: HeroConfig = {
  title: 'How can we help you?',
  description: 'Welcome to our help center. Search or browse categories below to find answers.',
  searchPlaceholder: 'Search for articles, guides, and FAQs...',
  searchIcon: 'Search',
}

/* ------------------------------------------------------------------ */
/*  Default content for the Help Center editor body                     */
/* ------------------------------------------------------------------ */
export const HELP_CENTER_DEFAULT_CONTENT: Record<string, unknown>[] = [
  { id: 'hc-h2-featured', type: 'h2', children: [{ text: 'Featured topics' }] },

  // Row 1: 3 columns
  {
    id: 'hc-cg1',
    type: 'column_group',
    children: [
      {
        type: 'column',
        children: [
          {
            id: 'hc-c1',
            type: 'card',
            icon: 'Users',
            title: 'Account management',
            description: 'Settings related to your organization or account',
            url: '',
            children: [{ text: '' }],
          },
        ],
      },
      {
        type: 'column',
        children: [
          {
            id: 'hc-c2',
            type: 'card',
            icon: 'CreditCard',
            title: 'Billing',
            description: 'Manage invoices, payments, and subscriptions',
            url: '',
            children: [{ text: '' }],
          },
        ],
      },
      {
        type: 'column',
        children: [
          {
            id: 'hc-c3',
            type: 'card',
            icon: 'Globe',
            title: 'Custom domains',
            description: 'Connect a personalized domain to your site',
            url: '',
            children: [{ text: '' }],
          },
        ],
      },
    ],
  },

  // Row 2: 3 columns
  {
    id: 'hc-cg2',
    type: 'column_group',
    children: [
      {
        type: 'column',
        children: [
          {
            id: 'hc-c4',
            type: 'card',
            icon: 'BookOpen',
            title: 'Publishing documentation',
            description: 'Publish your content to the web',
            url: '',
            children: [{ text: '' }],
          },
        ],
      },
      {
        type: 'column',
        children: [
          {
            id: 'hc-c5',
            type: 'card',
            icon: 'Plug',
            title: 'Integrations',
            description: 'Integrate your favorite tools or services',
            url: '',
            children: [{ text: '' }],
          },
        ],
      },
      {
        type: 'column',
        children: [
          {
            id: 'hc-c6',
            type: 'card',
            icon: 'PenLine',
            title: 'Editing content',
            description: 'Create, update, and format content',
            url: '',
            children: [{ text: '' }],
          },
        ],
      },
    ],
  },

  // Row 3: 3 columns
  {
    id: 'hc-cg3',
    type: 'column_group',
    children: [
      {
        type: 'column',
        children: [
          {
            id: 'hc-c7',
            type: 'card',
            icon: 'FolderOpen',
            title: 'Organizing content',
            description: 'Move and structure your content',
            url: '',
            children: [{ text: '' }],
          },
        ],
      },
      {
        type: 'column',
        children: [
          {
            id: 'hc-c8',
            type: 'card',
            icon: 'Upload',
            title: 'Importing & exporting',
            description: 'Import or export your content from HyperDocs',
            url: '',
            children: [{ text: '' }],
          },
        ],
      },
      {
        type: 'column',
        children: [
          {
            id: 'hc-c9',
            type: 'card',
            icon: 'FileImage',
            title: 'Uploading files & assets',
            description: 'Add files, images or documents to your docs',
            url: '',
            children: [{ text: '' }],
          },
        ],
      },
    ],
  },

  { id: 'hc-p-end', type: 'p', children: [{ text: '' }] },
]

/* ------------------------------------------------------------------ */
/*  Hero section (editable in a popover-style inline editor)            */
/* ------------------------------------------------------------------ */
// @ts-ignore
import * as LucideIcons from 'lucide-react/dist/cjs/lucide-react'

function getLucideIcon(name: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (LucideIcons as any)[name] ?? (LucideIcons as any)['Search']
}

interface HeroSectionProps {
  config: HeroConfig
  onChange: (config: HeroConfig) => void
}

function HeroSection({ config, onChange }: HeroSectionProps) {
  const [editing, setEditing] = useState<null | 'title' | 'description' | 'search'>(null)
  const [draft, setDraft] = useState('')
  const [searchIconDraft, setSearchIconDraft] = useState('')
  const [iconPickerOpen, setIconPickerOpen] = useState(false)
  const [iconQuery, setIconQuery] = useState('')

  // All icon names from the CJS bundle
  const allIconNames: string[] = React.useMemo(() =>
    Object.keys(LucideIcons as any).filter((n: string) => /^[A-Z]/.test(n)).sort()
    , [])

  const filteredIconNames = allIconNames.filter(n =>
    !iconQuery || n.toLowerCase().includes(iconQuery.toLowerCase())
  ).slice(0, 120)

  function startEdit(field: 'title' | 'description' | 'search') {
    setEditing(field)
    setDraft(field === 'title' ? config.title : field === 'description' ? config.description : config.searchPlaceholder)
  }

  function commitEdit() {
    if (editing === 'title') onChange({ ...config, title: draft })
    else if (editing === 'description') onChange({ ...config, description: draft })
    else if (editing === 'search') onChange({ ...config, searchPlaceholder: draft })
    setEditing(null)
  }

  const SearchIconComp = getLucideIcon(config.searchIcon)

  return (
    <div style={{
      textAlign: 'center',
      padding: '40px 24px 32px',
      marginBottom: 16,
    }}>
      {/* Editable Title */}
      {editing === 'title' ? (
        <input
          autoFocus
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={e => { if (e.key === 'Enter') commitEdit(); if (e.key === 'Escape') setEditing(null) }}
          style={{
            fontSize: '1.8rem', fontWeight: 800, textAlign: 'center',
            background: 'transparent', border: 'none', borderBottom: '2px solid var(--hd-accent)',
            outline: 'none', color: 'var(--hd-text)', width: '100%', fontFamily: 'inherit',
          }}
        />
      ) : (
        <h1
          onClick={() => startEdit('title')}
          title="Click to edit title"
          style={{
            fontSize: '1.8rem', fontWeight: 800, color: 'var(--hd-text)',
            marginBottom: 10, cursor: 'text',
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          {config.title}
        </h1>
      )}

      {/* Editable Description */}
      {editing === 'description' ? (
        <textarea
          autoFocus
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={e => { if (e.key === 'Escape') setEditing(null) }}
          rows={2}
          style={{
            fontSize: '0.95rem', textAlign: 'center', resize: 'none',
            background: 'transparent', border: 'none', borderBottom: '2px solid var(--hd-accent)',
            outline: 'none', color: 'var(--hd-text-soft)', width: '100%', fontFamily: 'inherit',
            lineHeight: 1.6, marginBottom: 20,
          }}
        />
      ) : (
        <p
          onClick={() => startEdit('description')}
          title="Click to edit description"
          style={{
            fontSize: '0.95rem', color: 'var(--hd-text-soft)', maxWidth: 540, margin: '0 auto 24px',
            lineHeight: 1.6, cursor: 'text',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          {config.description}
        </p>
      )}

      {/* Editable Search Bar */}
      <div style={{ position: 'relative', maxWidth: 540, margin: '0 auto' }}>
        {/* Icon button (click to change) */}
        <button
          onClick={() => { setIconPickerOpen(p => !p); setIconQuery('') }}
          title="Click to change search icon"
          style={{
            position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: 'var(--hd-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 0, zIndex: 2,
          }}
        >
          <SearchIconComp size={18} strokeWidth={1.8} />
        </button>

        {/* Search placeholder input */}
        {editing === 'search' ? (
          <input
            autoFocus
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={e => { if (e.key === 'Enter') commitEdit(); if (e.key === 'Escape') setEditing(null) }}
            style={{
              width: '100%', padding: '12px 16px 12px 44px',
              background: 'var(--hd-surface)', border: '2px solid var(--hd-accent)',
              borderRadius: 12, color: 'var(--hd-text)', fontSize: '0.95rem',
              outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
            }}
          />
        ) : (
          <div
            onClick={() => startEdit('search')}
            title="Click to edit search placeholder"
            style={{
              width: '100%', padding: '12px 16px 12px 44px',
              background: 'var(--hd-surface)', border: '1px solid var(--hd-border)',
              borderRadius: 12, color: 'var(--hd-muted)', fontSize: '0.95rem',
              cursor: 'text', textAlign: 'left', userSelect: 'none',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'var(--hd-border-soft)')}
            onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'var(--hd-border)')}
          >
            {config.searchPlaceholder}
          </div>
        )}

        {/* Icon picker dropdown */}
        {iconPickerOpen && (
          <div style={{
            position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0, zIndex: 999,
            background: 'var(--hd-admin-nav)', border: '1px solid var(--hd-admin-border)',
            borderRadius: 12, boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
            padding: '10px',
          }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--hd-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>
              Choose search icon
            </div>
            <input
              autoFocus
              value={iconQuery}
              onChange={e => setIconQuery(e.target.value)}
              placeholder="Search icons..."
              style={{
                width: '100%', padding: '6px 10px', borderRadius: 8,
                border: '1px solid var(--hd-border)', background: 'var(--hd-surface)',
                color: 'var(--hd-text)', fontSize: '0.82rem', outline: 'none',
                fontFamily: 'inherit', marginBottom: 8, boxSizing: 'border-box',
              }}
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 2, maxHeight: 180, overflowY: 'auto' }}>
              {filteredIconNames.map(name => {
                const Ic = getLucideIcon(name)
                const isSelected = name === config.searchIcon
                return (
                  <button
                    key={name}
                    title={name}
                    onClick={() => { onChange({ ...config, searchIcon: name }); setIconPickerOpen(false) }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: 32, height: 32, borderRadius: 6, border: 'none',
                      background: isSelected ? 'var(--hd-accent-light)' : 'transparent',
                      color: isSelected ? 'var(--hd-accent)' : 'var(--hd-text)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'var(--hd-surface)' }}
                    onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent' }}
                  >
                    <Ic size={14} strokeWidth={1.8} />
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Edit hints */}
      <p style={{ fontSize: '0.68rem', color: 'var(--hd-muted)', marginTop: 12, opacity: 0.6 }}>
        Click on title, description, or search bar to edit • Click the icon to change it
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */
type Props = {
  initialValue: Record<string, unknown>[]
  heroConfig?: HeroConfig
  onChange?: (value: Record<string, unknown>[]) => void
  onHeroChange?: (config: HeroConfig) => void
}

/* ------------------------------------------------------------------ */
/*  The Help Center Editor                                              */
/* ------------------------------------------------------------------ */
export function HelpCenterEditor({ initialValue, heroConfig, onChange, onHeroChange }: Props) {
  const valueRef = useRef(initialValue)
  const [hero, setHero] = useState<HeroConfig>(heroConfig ?? DEFAULT_HERO_CONFIG)

  function handleHeroChange(cfg: HeroConfig) {
    setHero(cfg)
    onHeroChange?.(cfg)
  }

  const editor = usePlateEditor({
    plugins: [
      BasicBlocksPlugin,
      BasicMarksPlugin,
      ListPlugin,
      IndentPlugin.extend({
        inject: { targetPlugins: ['p', 'h1', 'h2', 'h3', 'blockquote'] },
      }),
      TablePlugin.configure({
        options: { minColumnWidth: 48, disableExpandOnInsert: true },
      }),
      TableRowPlugin,
      TableCellPlugin,
      TableCellHeaderPlugin,
      ImagePlugin,
      MediaEmbedPlugin,
      CodeBlockPlugin,
      CodeLinePlugin,
      SlashPlugin,
      SlashInputPlugin,
      ButtonPlugin,
      CalloutPlugin,
      CardPlugin,
      ColumnGroupPlugin,
      ColumnPlugin,
    ],
    override: {
      components: {
        [H1Plugin.key]: H1Element,
        [H2Plugin.key]: H2Element,
        [H3Plugin.key]: H3Element,
        p: ParagraphElement,
        [BlockquotePlugin.key]: BlockquoteElement,
        [HorizontalRulePlugin.key]: HrElement,
        [CodeBlockPlugin.key]: CodeBlockElement,
        [CodeLinePlugin.key]: CodeLineElement,
        [TablePlugin.key]: TableElement,
        [TableRowPlugin.key]: TableRowElement,
        [TableCellPlugin.key]: TableCellElement,
        [TableCellHeaderPlugin.key]: TableCellHeaderElement,
        [ImagePlugin.key]: ImageElement,
        [MediaEmbedPlugin.key]: MediaEmbedElement,
        [ButtonPlugin.key]: ButtonElement,
        [CalloutPlugin.key]: CalloutElement,
        [BoldPlugin.key]: BoldLeaf,
        [ItalicPlugin.key]: ItalicLeaf,
        [UnderlinePlugin.key]: UnderlineLeaf,
        [StrikethroughPlugin.key]: StrikethroughLeaf,
        [CodePlugin.key]: CodeLeaf,
        [SlashInputPlugin.key]: SlashInputElement,
        [CardPlugin.key]: CardElement,
        [ColumnGroupPlugin.key]: ColumnGroupElement,
        [ColumnPlugin.key]: ColumnElement,
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: (initialValue.length > 0 ? initialValue : HELP_CENTER_DEFAULT_CONTENT) as any,
  })

  return (
    <Plate
      editor={editor}
      onValueChange={({ value }) => {
        valueRef.current = value as Record<string, unknown>[]
        onChange?.(value as Record<string, unknown>[])
      }}
    >
      <div className="flex flex-col h-full" style={{ background: 'var(--hd-bg)', position: 'relative' }}>
        <div className="flex-1 overflow-y-auto pb-32" style={{ background: 'var(--hd-bg)' }}>
          <div className="max-w-4xl mx-auto px-8">
            {/* Hero Section */}
            <HeroSection config={hero} onChange={handleHeroChange} />

            {/* Editor body */}
            <PlateContent
              className="outline-none min-h-[40vh]"
              style={{ color: 'var(--hd-text)' }}
            />
          </div>
        </div>
        <FloatingToolbar />
        <PlusInsertButton />
        <TableFloatingToolbar />
        <EditorModals />
      </div>
    </Plate>
  )
}
