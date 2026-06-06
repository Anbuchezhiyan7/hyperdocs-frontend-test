'use client'

import React, { useState, useEffect } from 'react'
import { Modal } from 'antd'

export type ButtonModalValues = {
  label: string
  url: string
  bgColor: string
  textColor: string
}

type Props = {
  open: boolean
  initialValues?: ButtonModalValues
  onClose: () => void
  onConfirm: (values: ButtonModalValues) => void
}

export function ButtonModal({ open, initialValues, onClose, onConfirm }: Props) {
  const [label, setLabel] = useState('Button')
  const [url, setUrl] = useState('')
  const [bgColor, setBgColor] = useState('#f26522')
  const [textColor, setTextColor] = useState('#ffffff')

  useEffect(() => {
    if (open) {
      setLabel(initialValues?.label ?? 'Button')
      setUrl(initialValues?.url ?? '')
      setBgColor(initialValues?.bgColor ?? '#f26522')
      setTextColor(initialValues?.textColor ?? '#ffffff')
    }
  }, [open, initialValues])

  function handleConfirm() {
    if (!label.trim() || !url.trim()) return
    onConfirm({ label: label.trim(), url: url.trim(), bgColor, textColor })
    onClose()
  }

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title="Insert Button"
      footer={null}
      centered
      width={560}
      styles={{ body: { paddingTop: 16 } }}
    >
      <div className="flex flex-col gap-[18px]">
        {/* Label */}
        <div>
          <label className="text-[0.85rem] text-[#1a1a1a] font-semibold block mb-1.5">
            Button Label
          </label>
          <input
            type="text"
            value={label}
            onChange={e => setLabel(e.target.value)}
            placeholder="Button text"
            autoFocus
            onKeyDown={e => { if (e.key === 'Enter') handleConfirm() }}
            className="w-full h-10 px-3 border border-[#e0e0e0] rounded-[7px] text-[0.95rem] outline-none text-[#1a1a1a] box-border focus:border-gray-400 focus:outline-none"
          />
        </div>

        {/* URL */}
        <div>
          <label className="text-[0.85rem] text-[#1a1a1a] font-semibold block mb-1.5">
            Link URL
          </label>
          <input
            type="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://..."
            onKeyDown={e => { if (e.key === 'Enter') handleConfirm() }}
            className="w-full h-10 px-3 border border-[#e0e0e0] rounded-[7px] text-[0.95rem] outline-none text-[#1a1a1a] box-border focus:border-gray-400 focus:outline-none"
          />
        </div>

        {/* Colors */}
        <div className="flex gap-4">
          {/* Background color */}
          <div className="flex-1">
            <label className="text-[0.85rem] text-[#1a1a1a] font-semibold block mb-1.5">
              Background
            </label>
            <div className="flex items-center gap-2.5">
              <div
                className="relative w-9 h-9 rounded-[7px] border border-[#e0e0e0] overflow-hidden shrink-0"
                style={{ background: bgColor }}
              >
                <input
                  type="color"
                  value={bgColor}
                  onChange={e => setBgColor(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
              </div>
              <input
                type="text"
                value={bgColor}
                onChange={e => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) setBgColor(e.target.value) }}
                className="flex-1 h-9 px-2.5 border border-[#e0e0e0] rounded-[7px] text-[0.85rem] font-mono outline-none focus:border-gray-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Text color */}
          <div className="flex-1">
            <label className="text-[0.85rem] text-[#1a1a1a] font-semibold block mb-1.5">
              Text Color
            </label>
            <div className="flex items-center gap-2.5">
              <div
                className="relative w-9 h-9 rounded-[7px] border border-[#e0e0e0] overflow-hidden shrink-0"
                style={{ background: textColor }}
              >
                <input
                  type="color"
                  value={textColor}
                  onChange={e => setTextColor(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
              </div>
              <input
                type="text"
                value={textColor}
                onChange={e => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) setTextColor(e.target.value) }}
                className="flex-1 h-9 px-2.5 border border-[#e0e0e0] rounded-[7px] text-[0.85rem] font-mono outline-none focus:border-gray-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="flex justify-center py-2 pb-1">
          <span
            className="inline-flex items-center py-2.5 px-7 rounded-lg font-semibold text-base shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
            style={{
              background: bgColor,
              color: textColor,
            }}
          >
            {label || 'Button'}
          </span>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-0.5">
          <button
            onClick={onClose}
            className="py-2 px-[18px] rounded-[7px] border border-[#e0e0e0] bg-white text-[#555] text-[0.9rem] cursor-pointer hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!label.trim() || !url.trim()}
            className={`py-2 px-[22px] rounded-[7px] border-none text-[0.9rem] font-semibold transition-colors duration-150 ${
              label.trim() && url.trim()
                ? 'bg-[#f26522] text-white cursor-pointer hover:bg-[#d85618]'
                : 'bg-[#f0f0f0] text-[#bbb] cursor-not-allowed'
            }`}
          >
            Insert Button
          </button>
        </div>
      </div>
    </Modal>
  )
}
