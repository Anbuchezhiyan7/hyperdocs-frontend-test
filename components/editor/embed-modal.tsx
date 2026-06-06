'use client'

import React, { useState } from 'react'
import { Modal } from 'antd'

type Props = {
  open: boolean
  onClose: () => void
  onInsert: (url: string) => void
}

export function EmbedModal({ open, onClose, onInsert }: Props) {
  const [url, setUrl] = useState('')

  function handleInsert() {
    if (!url.trim()) return
    onInsert(url.trim())
    onClose()
    setUrl('')
  }

  function handleClose() {
    setUrl('')
    onClose()
  }

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      title="Embed"
      footer={null}
      centered
      width={460}
      styles={{ body: { paddingTop: 12 } }}
    >
      <p className="text-[0.85rem] text-[#888] m-0 mb-4">
        Paste a YouTube URL, image URL, or an iframe embed code.
      </p>

      {/* Examples */}
      {/* <div className="flex gap-2 mb-4 flex-wrap">
        {['YouTube URL', 'Image URL', '<iframe> code'].map(label => (
          <span
            key={label}
            className="text-xs px-2.5 py-0.5 rounded-full bg-hd-accent-light text-hd-accent font-medium"
          >
            {label}
          </span>
        ))}
      </div> */}

      <div className="flex gap-2">
        <input
          type="url"
          placeholder="Paste URL or <iframe> embed code..."
          value={url}
          onChange={e => setUrl(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleInsert() }}
          autoFocus
          className="flex-1 h-[38px] px-3 border border-[#e0e0e0] rounded-lg text-[0.875rem] outline-none text-[#1a1a1a] focus:outline-none"
        />
        <button
          onClick={handleInsert}
          disabled={!url.trim()}
          className={`h-[38px] px-5 rounded-lg border-none text-[0.875rem] font-semibold transition-colors duration-150 ${url.trim() ? 'bg-hd-accent text-white cursor-pointer' : 'bg-[#f0f0f0] text-[#bbb] cursor-not-allowed'}`}
        >
          Embed
        </button>
      </div>
    </Modal>
  )
}
