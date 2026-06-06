'use client'

import React from 'react'
import { useEditorRef } from 'platejs/react'
import {
  H2Plugin,
  H3Plugin,
  BlockquotePlugin,
  HorizontalRulePlugin,
} from '@platejs/basic-nodes/react'
import { CodeBlockPlugin } from '@platejs/code-block/react'
import { TablePlugin } from '@platejs/table/react'
import { toggleList, ListStyleType } from '@platejs/list'
import { insertTable } from '@platejs/table'
import { OPEN_IMAGE_MODAL_EVENT, OPEN_EMBED_MODAL_EVENT, OPEN_BUTTON_MODAL_EVENT } from './editor-modals'
import { CALLOUT_CONFIG, type CalloutVariant } from '@/lib/callout-plugin'
import { CalloutIcon } from './callout-element'

/* ------------------------------------------------------------------ */
/*  Menu items                                                          */
/* ------------------------------------------------------------------ */

type InsertItem = {
  label: string
  description?: string
  icon: React.ReactNode
  action: (editor: ReturnType<typeof useEditorRef>) => void
}

type InsertGroup = { group: string; items: InsertItem[] }

import {
  IconPara,
  IconH2,
  IconH3,
  IconCode,
  IconQuote,
  IconDivider,
  IconTable,
  IconBullet,
  IconNumbered,
  IconImage,
  IconButton,
  IconEmbed,
  IconCard,
  IconTwoColumns,
  IconThreeColumns,
} from '@/components/shared/icons'

export function getInsertGroups(editor: ReturnType<typeof useEditorRef>): InsertGroup[] {
  const isHomeEditor = 'card' in editor.plugins

  const basicItems: InsertItem[] = [
    {
      label: 'Paragraph',
      icon: <IconPara />,
      action: (editor) => { editor.tf.toggleBlock('p') },
    },
    {
      label: 'Heading 2',
      icon: <IconH2 />,
      action: (editor) => { editor.tf.toggleBlock(H2Plugin.key) },
    },
    {
      label: 'Heading 3',
      icon: <IconH3 />,
      action: (editor) => { editor.tf.toggleBlock(H3Plugin.key) },
    },
  ]

  if (isHomeEditor) {
    basicItems.push(
      {
        label: 'Card',
        icon: <IconCard />,
        action: (editor) => {
          editor.tf.insertNodes(
            { type: 'card', icon: 'Sparkles', title: 'New Card', description: 'Enter your card description here', url: '', children: [{ text: '' }] } as any
          )
        },
      },
      {
        label: '2 columns',
        icon: <IconTwoColumns />,
        action: (editor) => {
          editor.tf.insertNodes(
            {
              type: 'column_group',
              children: [
                {
                  type: 'column',
                  children: [{ type: 'card', icon: 'Rocket', title: 'New Card', description: 'Enter your card description here', url: '', children: [{ text: '' }] }],
                },
                {
                  type: 'column',
                  children: [{ type: 'card', icon: 'Sparkles', title: 'New Card', description: 'Enter your card description here', url: '', children: [{ text: '' }] }],
                },
              ],
            } as any
          )
        },
      },
      {
        label: '3 columns',
        icon: <IconThreeColumns />,
        action: (editor) => {
          editor.tf.insertNodes(
            {
              type: 'column_group',
              children: [
                {
                  type: 'column',
                  children: [{ type: 'card', icon: 'BookOpen', title: 'New Card', description: 'Enter your card description here', url: '', children: [{ text: '' }] }],
                },
                {
                  type: 'column',
                  children: [{ type: 'card', icon: 'Sparkles', title: 'New Card', description: 'Enter your card description here', url: '', children: [{ text: '' }] }],
                },
                {
                  type: 'column',
                  children: [{ type: 'card', icon: 'Rocket', title: 'New Card', description: 'Enter your card description here', url: '', children: [{ text: '' }] }],
                },
              ],
            } as any
          )
        },
      }
    )
  }

  basicItems.push(
    {
      label: 'Table',
      icon: <IconTable />,
      action: (editor) => {
        insertTable(editor as Parameters<typeof insertTable>[0], { rowCount: 3, colCount: 3 }, { select: true })
      },
    },
    {
      label: 'Code',
      icon: <IconCode />,
      action: (editor) => { editor.tf.toggleBlock(CodeBlockPlugin.key) },
    },
    {
      label: 'Quote',
      icon: <IconQuote />,
      action: (editor) => { editor.tf.toggleBlock(BlockquotePlugin.key) },
    },
    {
      label: 'Divider',
      icon: <IconDivider />,
      action: (editor) => { editor.tf.toggleBlock(HorizontalRulePlugin.key) },
    },
    {
      label: 'Image',
      icon: <IconImage />,
      action: () => { document.dispatchEvent(new CustomEvent(OPEN_IMAGE_MODAL_EVENT)) },
    },
    {
      label: 'Embed',
      icon: <IconEmbed />,
      action: () => { document.dispatchEvent(new CustomEvent(OPEN_EMBED_MODAL_EVENT)) },
    },
    {
      label: 'Button',
      icon: <IconButton />,
      action: () => { document.dispatchEvent(new CustomEvent(OPEN_BUTTON_MODAL_EVENT)) },
    }
  )

  return [
    {
      group: 'Basic blocks',
      items: basicItems,
    },
    {
      group: 'Callouts',
      items: (Object.keys(CALLOUT_CONFIG) as CalloutVariant[]).map((variant) => {
        const cfg = CALLOUT_CONFIG[variant]
        return {
          label: `${cfg.label} Callout`,
          icon: <CalloutIcon variant={variant} color={cfg.iconColor} />,
          action: (editor: ReturnType<typeof useEditorRef>) => {
            editor.tf.insertNodes(
              { type: 'callout', variant, children: [{ text: '' }] } as any
            )
          },
        }
      }),
    },
    {
      group: 'Lists',
      items: [
        {
          label: 'Bulleted list',
          icon: <IconBullet />,
          action: (editor) => { toggleList(editor as Parameters<typeof toggleList>[0], { listStyleType: ListStyleType.Disc }) },
        },
        {
          label: 'Numbered list',
          icon: <IconNumbered />,
          action: (editor) => { toggleList(editor as Parameters<typeof toggleList>[0], { listStyleType: ListStyleType.Decimal }) },
        },
      ],
    },
  ]
}

/* ------------------------------------------------------------------ */
/*  Insert menu dropdown                                                */
/* ------------------------------------------------------------------ */

export function InsertMenu({
  onClose,
  filter = '',
}: {
  onClose: () => void
  filter?: string
}) {
  const editor = useEditorRef()

  function handleInsert(action: InsertItem['action']) {
    onClose()
    setTimeout(() => {
      action(editor)
      // Refocus after insertion so cursor is ready for typing
      requestAnimationFrame(() => editor.tf.focus())
    }, 0)
  }

  const lf = filter.toLowerCase()
  const groups = getInsertGroups(editor)
  const filteredGroups = groups.map(g => ({
    ...g,
    items: g.items.filter(i => !lf || i.label.toLowerCase().includes(lf)),
  })).filter(g => g.items.length > 0)

  if (filteredGroups.length === 0) return null

  return (
    <div
      style={{
        background: 'var(--hd-bg)',
        border: '1px solid var(--hd-border)',
        borderRadius: 10,
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        overflow: 'hidden',
        minWidth: 220,
        maxHeight: 360,
        overflowY: 'auto',
        padding: '6px 0',
      }}
    >
      {filteredGroups.map(group => (
        <div key={group.group}>
          <p style={{
            fontSize: '0.68rem', fontWeight: 700, color: 'var(--hd-muted)',
            textTransform: 'uppercase', letterSpacing: '0.08em',
            padding: '8px 14px 4px', margin: 0,
          }}>
            {group.group}
          </p>
          {group.items.map(item => (
            <button
              key={item.label}
              onMouseDown={e => { e.preventDefault(); handleInsert(item.action) }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                width: '100%', padding: '7px 14px',
                border: 'none', background: 'transparent',
                cursor: 'pointer', textAlign: 'left',
                fontSize: '0.875rem', color: 'var(--hd-text)',
                fontFamily: 'inherit',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--hd-bg-soft)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ color: 'var(--hd-text-soft)', display: 'flex', alignItems: 'center', width: 20, justifyContent: 'center' }}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}

