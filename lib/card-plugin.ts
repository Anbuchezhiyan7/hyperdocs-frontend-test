import { createSlatePlugin } from 'platejs'

/**
 * Card element plugin — a single card with icon, title, description, and optional URL.
 * Used in the Home page editor. Can also be used independently in other contexts.
 */
export const CardPlugin = createSlatePlugin({
  key: 'card',
  node: {
    isElement: true,
    isVoid: true,
  },
})

/**
 * ColumnGroup element plugin — container for layout columns.
 */
export const ColumnGroupPlugin = createSlatePlugin({
  key: 'column_group',
  node: {
    isElement: true,
  },
})

/**
 * Column element plugin — representing a single column container.
 */
export const ColumnPlugin = createSlatePlugin({
  key: 'column',
  node: {
    isElement: true,
  },
})

