import { DocNode } from './mock-data'

type PlateNode = Record<string, unknown>

export function docNodesToPlate(nodes: DocNode[]): PlateNode[] {
  const result: PlateNode[] = []

  for (const node of nodes) {
    switch (node.type) {
      case 'h1':
        result.push({ type: 'h1', children: [{ text: node.text }] })
        break
      case 'h2':
        result.push({ type: 'h2', children: [{ text: node.text }] })
        break
      case 'h3':
        result.push({ type: 'h3', children: [{ text: node.text }] })
        break
      case 'p':
        result.push({ type: 'p', children: [{ text: node.text }] })
        break
      case 'blockquote':
        result.push({
          type: 'blockquote',
          children: [{ type: 'p', children: [{ text: node.text }] }],
        })
        break
      case 'ul':
        for (const item of node.items) {
          result.push({
            type: 'p',
            indent: 1,
            listStyleType: 'disc',
            children: [{ text: item }],
          })
        }
        break
      case 'ol':
        for (let i = 0; i < node.items.length; i++) {
          result.push({
            type: 'p',
            indent: 1,
            listStyleType: 'decimal',
            listStart: i + 1,
            children: [{ text: node.items[i] }],
          })
        }
        break
      case 'code':
        result.push({
          type: 'code_block',
          lang: node.lang,
          children: node.text.split('\n').map((line) => ({
            type: 'code_line',
            children: [{ text: line }],
          })),
        })
        break
      case 'table': {
        const colCount = node.headers.length
        const colSize = 200
        const rows: PlateNode[] = []
        // Header row
        rows.push({
          type: 'tr',
          children: node.headers.map((h) => ({
            type: 'th',
            children: [{ type: 'p', children: [{ text: h }] }],
          })),
        })
        // Data rows
        for (const row of node.rows) {
          rows.push({
            type: 'tr',
            children: row.map((cell) => ({
              type: 'td',
              children: [{ type: 'p', children: [{ text: cell }] }],
            })),
          })
        }
        result.push({
          type: 'table',
          colSizes: Array(colCount).fill(colSize),
          children: rows,
        })
        break
      }
    }
  }

  // Ensure there's always at least one paragraph at the end
  if (result.length === 0 || result[result.length - 1].type === 'table') {
    result.push({ type: 'p', children: [{ text: '' }] })
  }

  return result
}
