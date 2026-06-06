'use client'

import React, { useRef, useState } from 'react'
import { Modal } from 'antd'

type Props = {
  open: boolean
  onClose: () => void
  onInsertUrl: (url: string) => void
  onInsertFile: (file: File) => void
}

export function ImageModal({ open, onClose, onInsertUrl, onInsertFile }: Props) {
  const [url, setUrl] = useState('')
  const [dragging, setDragging] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  function handleFile(file: File) {
    onInsertFile(file)
    onClose()
    setUrl('')
  }

  function handleUrl() {
    if (!url.trim()) return
    onInsertUrl(url.trim())
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
      title="Insert Image"
      footer={null}
      centered
      width={460}
      styles={{ body: { paddingTop: 16 } }}
    >
      {/* Upload area */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => {
          e.preventDefault()
          setDragging(false)
          const file = e.dataTransfer.files[0]
          if (file && file.type.startsWith('image/')) handleFile(file)
        }}
        onClick={() => fileRef.current?.click()}
        className={`border-2 border-dashed rounded-xl py-7 px-5 text-center cursor-pointer transition-all duration-150 mb-5 ${
          dragging ? 'border-hd-accent bg-hd-accent-light' : 'border-[#e0e0e0] bg-[#fafafa]'
        }`}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke={dragging ? 'var(--hd-accent)' : '#ccc'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto mb-2.5 block"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <p className="m-0 text-[0.875rem] text-[#555] font-medium">
          Drag & drop an image here
        </p>
        <p className="mt-1 m-0 text-[0.8rem] text-[#aaa]">
          or{' '}
          <span className="text-hd-accent font-semibold">click to browse</span>
          {' '}— PNG, JPG, GIF, WebP
        </p>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
            e.target.value = ''
          }}
        />
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-[1px] bg-[#ebebeb]" />
        <span className="text-[0.7rem] text-[#ccc] font-bold tracking-[0.05em]">OR</span>
        <div className="flex-1 h-[1px] bg-[#ebebeb]" />
      </div>

      {/* URL input */}
      <div className="flex gap-2">
        <input
          type="url"
          placeholder="Paste image URL..."
          value={url}
          onChange={e => setUrl(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleUrl() }}
          className="flex-1 h-[38px] px-3 border border-[#e0e0e0] rounded-lg text-[0.875rem] outline-none text-[#1a1a1a] focus:border-gray-400 focus:outline-none"
        />
        <button
          onClick={handleUrl}
          disabled={!url.trim()}
          className={`h-[38px] px-5 rounded-lg border-none text-[0.875rem] font-semibold transition-colors duration-150 ${
            url.trim() ? 'bg-hd-accent text-white cursor-pointer' : 'bg-[#f0f0f0] text-[#bbb] cursor-not-allowed'
          }`}
        >
          Insert
        </button>
      </div>
    </Modal>
  )
}
