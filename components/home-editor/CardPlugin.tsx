'use client'

/**
 * CardPlugin.tsx — Self-contained Plate editor for the Home page editor.
 * Registers only the plugins needed: basic blocks/marks, card, columns layout.
 * Does NOT import any docs-editor specific plugins (slash, image modals, etc.).
 */

import React, { useRef } from 'react'
import { Plate, PlateContent, usePlateEditor, PlateElement } from 'platejs/react'
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

import { CardElement } from './card-element'
import { SlashInputElement } from '@/components/editor/slash-input-element'
import { PlusInsertButton } from '@/components/editor/plus-insert-button'

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
import { FloatingToolbar } from '../editor/floating-toolbar'
import { TableFloatingToolbar } from '../editor/table-floating-toolbar'
import { EditorModals } from '../editor/editor-modals'

/* ------------------------------------------------------------------ */
/*  Column Group & Column Elements                                      */
/* ------------------------------------------------------------------ */
export function ColumnGroupElement({ children, ...props }: PlateElementProps) {
  return (
    <PlateElement as="div" {...props} className="my-4">
      <div style={{ display: 'flex', gap: 24, width: '100%' }}>
        {children}
      </div>
    </PlateElement>
  )
}

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
        padding: '12px 14px',
        background: 'rgba(0,0,0,0.01)',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      {children}
    </PlateElement>
  )
}

/* ------------------------------------------------------------------ */
/*  Default initial content for a fresh home page                       */
/* ------------------------------------------------------------------ */
export const HOME_DEFAULT_CONTENT: Record<string, unknown>[] = [
  { id: 'home-h1', type: 'h1', children: [{ text: 'Welcome to Hyperdocs' }] },
  { id: 'home-p1', type: 'p', children: [{ text: 'Your documentation platform, beautifully designed.' }] },

  {
    id: 'home-cg1',
    type: 'column_group',
    children: [
      {
        type: 'column',
        children: [
          {
            id: 'home-c-start',
            type: 'card',
            icon: 'Rocket',
            title: 'Start here',
            description: 'Follow our three step quickstart guide.',
            url: '',
            children: [{ text: '' }],
          },
        ],
      },
      {
        type: 'column',
        children: [
          {
            id: 'home-c-make-yours',
            type: 'card',
            icon: 'Sparkles',
            title: 'Make it yours',
            description: 'Design a docs site that looks great and empowers your users.',
            url: '',
            children: [{ text: '' }],
          },
        ],
      },
    ],
  },

  {
    id: 'home-c-edit',
    type: 'card',
    icon: 'BookOpen',
    title: 'Edit locally',
    description: 'Edit your docs locally and preview them in real time.',
    url: '',
    children: [{ text: '' }],
  },
  {
    id: 'home-c-customize',
    type: 'card',
    icon: 'Palette',
    title: 'Customize your site',
    description: 'Customize the design and colors of your site to match your brand.',
    url: '',
    children: [{ text: '' }],
  },

  {
    id: 'home-cg2',
    type: 'column_group',
    children: [
      {
        type: 'column',
        children: [
          {
            id: 'home-c-nav',
            type: 'card',
            icon: 'Map',
            title: 'Set up navigation',
            description: 'Organize your docs to help users find what they need.',
            url: '',
            children: [{ text: '' }],
          },
        ],
      },
      {
        type: 'column',
        children: [
          {
            id: 'home-c-api',
            type: 'card',
            icon: 'Terminal',
            title: 'API documentation',
            description: 'Auto-generate API docs from OpenAPI specifications.',
            url: '',
            children: [{ text: '' }],
          },
        ],
      },
    ],
  },
]

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */
type Props = {
  initialValue: Record<string, unknown>[]
  onChange?: (value: Record<string, unknown>[]) => void
}

/* ------------------------------------------------------------------ */
/*  The editor                                                           */
/* ------------------------------------------------------------------ */
export function HomePageEditor({ initialValue, onChange }: Props) {
  const valueRef = useRef(initialValue)

  const editor = usePlateEditor({
    plugins: [
      BasicBlocksPlugin,
      BasicMarksPlugin,
      ListPlugin,
      IndentPlugin.extend({
        inject: { targetPlugins: ['p', 'h1', 'h2', 'h3', 'blockquote'] },
      }),
      TablePlugin.configure({
        options: {
          minColumnWidth: 48,
          disableExpandOnInsert: true,
        },
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
    value: (initialValue.length > 0 ? initialValue : HOME_DEFAULT_CONTENT) as any,
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
        <div className="flex-1 overflow-y-auto px-12 py-10 pb-32" style={{ background: 'var(--hd-bg)' }}>
          <div className="max-w-3xl mx-auto">
            <PlateContent
              className="outline-none min-h-[60vh]"
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


