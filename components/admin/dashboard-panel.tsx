'use client'

import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/lib/theme-context'
import Cookies from 'js-cookie'
import { useAuth } from '@/lib/auth-provider'
import { apiGetSettings, apiSetDocumentMode } from '@/lib/api/auth'
import { useAppStore } from '@/lib/store/useAppStore'
import { IconLink, IconArrowRightLine, IconCheckSuccess } from '@/components/shared/icons'
import { DashboardOptions } from './dashboard-options'

export function DashboardPanel() {
  const router = useRouter()
  const { resolvedTheme } = useTheme()
  const { user } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [isSubmittingMode, setIsSubmittingMode] = useState<'default' | 'blank' | 'git' | null>(null)
  const { settings, setSettings } = useAppStore()
  const username = Cookies.get('username') || user?.name || 'there'

  const { isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const response = await apiGetSettings()
      if (response.success) setSettings(response.data)
      return response.data
    },
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  // Get current hour for greeting
  const hour = new Date().getHours()
  let greeting = 'Good morning'
  if (hour >= 12 && hour < 17) greeting = 'Good afternoon'
  else if (hour >= 17) greeting = 'Good evening'

  const liveActivity = [
    { id: 1, message: 'Update title', status: 'success', time: '2 hours ago', changes: '1 file' },
    { id: 2, message: 'Fix spacing', status: 'success', time: '1 day ago', changes: '2 files' },
    { id: 3, message: 'Initial commit', status: 'success', time: '3 days ago', changes: '12 files' },
  ]

  const hasSettings = settings && settings.user_id !== null
  const hasDocumentMode = !!settings?.general?.document_mode

  if (!mounted || (isLoading && !hasSettings && !hasDocumentMode)) {
    return (
      <div className="flex-1 overflow-y-auto bg-hd-bg-soft p-8">
        <div className="max-w-[840px] mx-auto space-y-8 animate-pulse">
          <div className="h-10 bg-hd-border-soft rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-hd-border-soft rounded w-1/4"></div>
          <div className="h-64 bg-hd-border-soft rounded-2xl w-full mt-8"></div>
        </div>
      </div>
    )
  }

  const previewImage = mounted && resolvedTheme === 'dark' ? '/images/dosc-preview-dark.png' : '/images/docs-preview-light.png'

  const handleModeSelect = async (mode: 'default' | 'blank' | 'git') => {
    setIsSubmittingMode(mode)
    const res = await apiSetDocumentMode({ document_mode: mode })
    if (res.success && settings) {
      setSettings({
        ...settings,
        general: {
          ...settings.general,
          document_mode: mode
        }
      })
    }
    setIsSubmittingMode(null)
    if (mode === 'git') router.push('/admin/git-integration')
  }

  const documentMode = settings?.general?.document_mode

  if (!documentMode) {
    return (
      <div className="flex-1 overflow-y-auto bg-hd-bg-soft text-hd-text">
        <DashboardOptions onSelect={handleModeSelect} isSubmitting={isSubmittingMode} greeting={greeting} username={username} />
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto bg-hd-bg-soft text-hd-text">
      <div className="max-w-[840px] mx-auto px-8 pt-10 pb-16">

        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold m-0 tracking-tight">
              {greeting}, {username}
            </h1>
            <p className="text-sm text-hd-muted mt-1">
              Here is what's happening with your documentation.
            </p>
          </div>
        </div>

        {/* Main Starter Kit Card */}
        <div className="bg-hd-bg rounded-2xl border border-hd-border p-6 flex flex-wrap gap-6 mb-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          {/* Card Left: Neat User Preview */}
          <div className="flex-[1.5_1_360px] min-h-[220px] rounded-lg border border-hd-border-soft relative overflow-hidden bg-hd-surface">
            {mounted && (
              <Image
                src={previewImage}
                alt="Docs Preview"
                fill
                className="object-cover object-top"
              />
            )}
          </div>

          {/* Card Right: Starter Kit Info */}
          <div className="flex-[1_1_320px] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-xl font-bold m-0">Hyperdocs Starter Kit</h2>
              </div>
              <p className="text-xs text-hd-muted mt-1.5">
                Last updated 2 days ago by hyperdocs[bot]
              </p>

              {/* Action row 1: Open Editor & Refresh */}
              <div className="flex items-center gap-2 mt-5">
                <button
                  onClick={() => router.push('/admin/editor')}
                  className="px-4 py-2 rounded-lg border-none bg-[#f26522] text-white text-sm font-bold cursor-pointer shadow-[0_2px_8_rgba(242,101,34,0.2)] transition-opacity hover:opacity-90"
                >
                  Open editor
                </button>
              </div>
            </div>

            {/* Action row 2: Domain Info */}
            <div className="flex items-center justify-between border-t border-hd-border-soft pt-4 mt-5 flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <IconLink className="text-hd-muted" width="14" height="14" strokeWidth="2" />
                <a
                  href={settings.domain?.sub_domain || settings.domain?.default ? `https://${settings.domain.sub_domain || settings.domain.default}` : '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-hd-text-soft no-underline transition-colors hover:text-hd-accent"
                >
                  {settings.domain?.sub_domain || settings.domain?.default || '—'}
                </a>

                {/* Live Status Badge */}
                {(settings.domain?.sub_domain || settings.domain?.default) && !(settings.domain.sub_domain ? settings.domain.sub_domain_connected : settings.domain.default_connected) && (
                  <span className="inline-flex items-center gap-1 text-[0.65rem] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full border text-hd-muted bg-hd-surface border-hd-border">
                    <span className="w-1 h-1 rounded-full bg-hd-muted" />
                    Not Connected
                  </span>
                )}
              </div>

              {!settings.domain?.sub_domain && (
                <button
                  onClick={() => router.push('/admin/domain')}
                  className="text-[13px] font-bold text-[#f26522] bg-transparent border-none cursor-pointer p-0 flex items-center gap-1 hover:opacity-80 transition-opacity"
                >
                  Connect own domain
                  <IconArrowRightLine width="12" height="12" strokeWidth="2.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Activity Section */}
        <div>
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-bold m-0">Activity</h3>
          </div>

          {/* Activity Table */}
          <div className="bg-hd-bg rounded-xl border border-hd-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-hd-border-soft bg-hd-bg-soft">
                    <th className="px-[18px] py-[12px] font-semibold text-hd-muted">Update</th>
                    <th className="px-[18px] py-[12px] font-semibold text-hd-muted">Status</th>
                    <th className="px-[18px] py-[12px] font-semibold text-hd-muted text-right">Changes</th>
                  </tr>
                </thead>
                <tbody>
                  {liveActivity.map((activity) => (
                    <tr
                      key={activity.id}
                      className="border-b border-hd-border-soft transition-colors hover:bg-hd-bg-soft"
                    >
                      <td className="px-[18px] py-[14px]">
                        <div className="font-semibold text-hd-text">{activity.message}</div>
                        <div className="text-xs text-hd-muted mt-0.5">{activity.time}</div>
                      </td>
                      <td className="px-[18px] py-[14px]">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#16a34a]">
                          <IconCheckSuccess width="14" height="14" strokeWidth="3" />
                          Success
                        </span>
                      </td>
                      <td className="px-[18px] py-[14px] text-right font-medium text-hd-text-soft">
                        {activity.changes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
