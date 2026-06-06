'use client'

import React from 'react'
import { Plate, PlateContent, usePlateEditor } from 'platejs/react'
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
import { TablePlugin, TableCellPlugin, TableCellHeaderPlugin, TableRowPlugin } from '@platejs/table/react'
import { ImagePlugin, MediaEmbedPlugin } from '@platejs/media/react'
import { ListPlugin } from '@platejs/list/react'
import { IndentPlugin } from '@platejs/indent/react'
import { CodeBlockPlugin, CodeLinePlugin } from '@platejs/code-block/react'
import { SlashPlugin, SlashInputPlugin } from '@platejs/slash-command/react'

import { FloatingToolbar } from './floating-toolbar'
import { PlusInsertButton } from './plus-insert-button'
import { SlashInputElement } from './slash-input-element'
import { TableFloatingToolbar } from './table-floating-toolbar'
import { EditorModals } from './editor-modals'
import { MediaEmbedElement } from './media-embed-element'
import { ButtonElement } from './button-element'
import { ButtonPlugin } from '@/lib/button-plugin'
import { CalloutElement } from './callout-element'
import { CalloutPlugin } from '@/lib/callout-plugin'
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
} from './plate-elements'


type Props = {
  initialValue: Record<string, unknown>[]
  onChange?: (value: Record<string, unknown>[]) => void
}

/* Ensure the first block is always H1 */
function withH1InitialValue(value: Record<string, unknown>[]): Record<string, unknown>[] {
  if (!value || value.length === 0) {
    return [
      { type: 'h1', children: [{ text: '' }] },
      { type: 'p', children: [{ text: '' }] },
    ]
  }
  if (value[0]?.type !== 'h1') {
    return [{ type: 'h1', children: [{ text: '' }] }, ...value]
  }
  return value
}

export function PlateEditor({ initialValue, onChange }: Props) {
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
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: withH1InitialValue(initialValue) as any,
  })

  return (
    <Plate
      editor={editor}
      onValueChange={({ value }) => {
        onChange?.(value as Record<string, unknown>[])
      }}
    >
      <div className="flex flex-col h-full" style={{ background: 'var(--hd-bg)', position: 'relative' }}>
        <div className="flex-1 overflow-y-auto px-12 py-10 pb-64" style={{ background: 'var(--hd-bg)' }}>
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
