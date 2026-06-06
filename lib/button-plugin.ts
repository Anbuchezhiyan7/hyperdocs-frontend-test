import { createSlatePlugin } from 'platejs'

export const ButtonPlugin = createSlatePlugin({
  key: 'button',
  node: { isElement: true, isVoid: true },
})

export type ButtonElement = {
  type: 'button'
  label: string
  url: string
  textColor: string
  bgColor: string
  children: [{ text: '' }]
}
