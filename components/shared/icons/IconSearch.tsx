import React from 'react'
import { IconProps } from '../icons'

export const IconSearchSm = (props: IconProps) => (
  <svg
    width={props.width ?? '14'}
    height={props.height ?? '14'}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
    {...props}
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)
