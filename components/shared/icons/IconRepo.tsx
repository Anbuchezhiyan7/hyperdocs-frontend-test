import React from 'react'
import { IconProps } from '../icons'

export const IconRepo = (props: IconProps) => (
  <svg
    width={props.width ?? '16'}
    height={props.height ?? '16'}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
    {...props}
  >
    <path d="M3 3h18v18H3z" />
    <path d="M3 9h18" />
    <path d="M9 21V9" />
  </svg>
)
