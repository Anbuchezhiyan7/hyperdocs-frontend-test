import React from 'react'
import { IconProps } from '../icons'

export const IconShield = (props: IconProps) => (
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
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)
