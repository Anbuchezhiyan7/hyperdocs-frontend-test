'use client'

import React from 'react'
import { Modal, ConfigProvider, theme as antdTheme } from 'antd'
import { useTheme } from '@/lib/theme-context'

interface ConfirmDialogProps {
  open: boolean
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  danger?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  danger = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          borderRadius: 10,
          colorBgContainer: isDark ? '#1a1a1c' : '#ffffff',
          colorBgElevated: isDark ? '#1a1a1c' : '#ffffff',
          colorText: isDark ? '#e5e5e5' : '#1a1a1a',
          colorTextSecondary: isDark ? '#aaaaaa' : '#666',
          colorBorder: isDark ? '#2a2a2a' : '#e0e0e0',
          fontFamily: 'var(--font-geist-sans, Arial, sans-serif)',
        },
        components: {
          Modal: {
            titleFontSize: 16,
            titleColor: isDark ? '#e5e5e5' : '#1a1a1a',
            contentBg: isDark ? '#1a1a1c' : '#ffffff',
            headerBg: isDark ? '#1a1a1c' : '#ffffff',
            footerBg: isDark ? '#1a1a1c' : '#ffffff',
          },
        },
      }}
    >
      <Modal
        open={open}
        onOk={onConfirm}
        onCancel={onCancel}
        okText={confirmText}
        cancelText={cancelText}
        okButtonProps={{
          danger,
          style: danger
            ? { background: '#ef4444', borderColor: '#ef4444', fontWeight: 600, borderRadius: 7 }
            : { background: '#f26522', borderColor: '#f26522', fontWeight: 600, borderRadius: 7 },
        }}
        cancelButtonProps={{
          style: {
            borderRadius: 7,
            borderColor: isDark ? '#2a2a2a' : undefined,
            color: isDark ? '#aaaaaa' : undefined,
            background: isDark ? '#111113' : undefined,
          },
        }}
        title={
          <span style={{ fontSize: '1rem', fontWeight: 700, color: isDark ? '#e5e5e5' : '#1a1a1a' }}>{title}</span>
        }
        centered
        width={420}
        styles={{ body: { paddingTop: 8 } }}
      >
        {description && (
          <p style={{ fontSize: '0.875rem', color: isDark ? '#aaaaaa' : '#666', margin: 0, lineHeight: 1.6 }}>
            {description}
          </p>
        )}
      </Modal>
    </ConfigProvider>
  )
}
