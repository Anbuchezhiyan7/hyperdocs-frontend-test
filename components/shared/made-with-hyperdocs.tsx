'use client'

import React from 'react'

export function MadeWithHyperdocs() {
  const [showBranding, setShowBranding] = React.useState(true)

  React.useEffect(() => {
    setShowBranding(localStorage.getItem('hd_remove_branding') !== 'true')
  }, [])

  if (!showBranding) return null

  return (
    <a
      href="https://hyperdocs.io"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1 text-[0.75rem] font-medium no-underline hover:opacity-80 transition-opacity text-hd-text-soft"
    >
      <span>Made with</span>
      <span className="font-bold text-[#f26522]">Hyperdocs</span>
    </a>
  )
}
