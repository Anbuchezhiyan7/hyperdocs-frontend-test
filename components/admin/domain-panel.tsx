'use client'

import React, { useState, useEffect } from 'react'
import { useAppStore } from '@/lib/store/useAppStore'
import { IconDot } from '@/components/shared/icons'
import { SubDomainTab } from './tabs/sub-domain-tab'
import { SubFolderTab } from './tabs/sub-folder-tab'

export function DomainPanel() {
  const { settings, setSettings } = useAppStore()
  
  const [activeTab, setActiveTab] = useState<'subdomain' | 'subfolder'>('subdomain')
  const [isLoadingSettings, setIsLoadingSettings] = useState(true)
  
  const defaultDomain = settings.domain?.default || 'your-project.hyperdocs.cloud'
  const currentSubDomain = settings.domain?.sub_domain || ''
  
  const isConnected = !!currentSubDomain
  const isVerified = currentSubDomain 
    ? settings.domain?.sub_domain_connected 
    : settings.domain?.default_connected

  // Fetch settings on mount to ensure domain connection status is fresh
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { apiGetSettings } = await import('@/lib/api/settings')
        const res = await apiGetSettings()
        if (res.success && res.data) {
          setSettings(res.data)
        }
      } finally {
        setIsLoadingSettings(false)
      }
    }
    fetchSettings()
  }, [setSettings])

  if (isLoadingSettings) {
    return (
      <div className="flex-1 overflow-y-auto bg-hd-bg-soft text-hd-text">
        <div className="max-w-[660px] mx-auto px-8 pt-10 pb-16 animate-pulse">
          <div className="mb-8">
            <div className="h-8 bg-hd-border rounded w-32 mb-3"></div>
            <div className="h-4 bg-hd-border rounded w-64"></div>
          </div>
          <div className="bg-hd-bg rounded-2xl border border-hd-border overflow-hidden shadow-sm">
             <div className="px-7 pt-5 pb-5 border-b border-hd-border-soft">
                <div className="h-5 bg-hd-border rounded w-40 mb-3"></div>
                <div className="h-3 bg-hd-border rounded w-64 mb-6"></div>
                <div className="flex gap-6">
                  <div className="h-5 bg-hd-border rounded w-24"></div>
                  <div className="h-5 bg-hd-border rounded w-24"></div>
                </div>
             </div>
             <div className="p-7">
                <div className="h-3 bg-hd-border rounded w-3/4 mb-6"></div>
                <div className="h-3 bg-hd-border rounded w-16 mb-2"></div>
                <div className="h-10 bg-hd-border rounded w-full mb-4"></div>
             </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto bg-hd-bg-soft text-hd-text">
      <div className="max-w-[660px] mx-auto px-8 pt-10 pb-16">

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1.5">Domain</h1>
          <div className="flex items-center gap-2">
            <span className="text-[0.82rem] text-hd-muted">Current Docs Address —</span>
            <a
              href={`https://${isConnected && currentSubDomain ? currentSubDomain : defaultDomain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.82rem] text-[#f26522] font-semibold no-underline"
            >
              https://{isConnected && currentSubDomain ? currentSubDomain : defaultDomain}
            </a>
            {isVerified ? (
              <span className="inline-flex items-center gap-1 text-[0.7rem] font-bold text-green-600 bg-green-50 border border-green-200 rounded-full px-2.5 py-0.5">
                <IconDot fill="#16a34a" />
                Connected
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[0.7rem] font-bold text-hd-muted bg-hd-surface border border-hd-border rounded-full px-2.5 py-0.5">
                <IconDot fill="currentColor" />
                Not Connected
              </span>
            )}
          </div>
        </div>

        {/* Card */}
        <div className="bg-hd-bg rounded-2xl border border-hd-border overflow-hidden shadow-sm">

          {/* Card header */}
          <div className="px-7 pt-5 border-b border-hd-border-soft">
            <p className="text-base font-bold text-hd-text mb-1">Custom Domains</p>
            <p className="text-xs text-hd-muted mb-4">Connect your own domain to your Hyperdocs site.</p>

            {/* Tabs */}
            <div className="flex gap-6 border-b-2 border-hd-border-soft -mb-0.5">
              <button
                type="button"
                onClick={() => setActiveTab('subdomain')}
                className={`pb-3 border-0 bg-transparent text-[0.875rem] font-bold cursor-pointer -mb-0.5 transition-colors duration-120 ${
                  activeTab === 'subdomain'
                    ? 'text-[#f26522] border-b-2 border-[#f26522]'
                    : 'text-hd-muted hover:text-hd-text border-b-2 border-transparent'
                }`}
              >
                Sub Domain
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('subfolder')}
                className={`flex flex-col items-center justify-center pb-1.5 border-0 bg-transparent text-[0.875rem] cursor-pointer -mb-0.5 transition-colors duration-120 ${
                  activeTab === 'subfolder'
                    ? 'text-[#f26522] border-b-2 border-[#f26522]'
                    : 'text-hd-muted hover:text-hd-text border-b-2 border-transparent opacity-60'
                }`}
              >
                <span className="text-[0.58rem] font-bold uppercase text-[#f26522] bg-[rgba(242,101,34,0.1)] border border-[rgba(242,101,34,0.2)] rounded px-1.5 py-0.5 tracking-wider mb-1">
                  Coming Soon
                </span>
                <span className="font-semibold">Sub-Folder</span>
              </button>
            </div>
          </div>

          {/* Tab body */}
          {activeTab === 'subdomain' ? <SubDomainTab /> : <SubFolderTab />}

        </div>
      </div>
    </div>
  )
}
