'use client'

import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useAppStore } from '@/lib/store/useAppStore'
import { apiConnectDomain, apiUpdateDomain, apiGetSettings, apiDisconnectDomain } from '@/lib/api/settings'
import { SubdomainInstruction } from '../subdomain-instruction'
import { IconTrash } from '@/components/shared/icons'
import { ConfirmDialog } from '@/components/shared/confirm-dialog'

export function SubDomainTab() {
  const { settings, setSettings } = useAppStore()

  const [subdomainValue, setSubdomainValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [showDisconnectConfirm, setShowDisconnectConfirm] = useState(false)

  const currentSubDomain = settings.domain?.sub_domain || ''
  const isConnected = !!currentSubDomain

  async function handleDisconnect() {
    setLoading(true)
    const res = await apiDisconnectDomain('sub_domain')
    if (res.success) {
      setSubdomainValue('')
      setShowDisconnectConfirm(false)
      toast.success('Domain disconnected')
      const settingsRes = await apiGetSettings()
      if (settingsRes.success && settingsRes.data) {
        setSettings(settingsRes.data)
      }
    } else {
      toast.error('Failed to disconnect domain')
    }
    setLoading(false)
  }

  useEffect(() => {
    if (currentSubDomain) {
      setSubdomainValue(currentSubDomain)
    }
  }, [currentSubDomain])

  async function handleConnect() {
    if (!subdomainValue.trim()) return

    setLoading(true)

    const apiCall = isConnected ? apiUpdateDomain : apiConnectDomain

    const res = await apiCall({
      domain: subdomainValue.trim(),
      domain_type: 'sub_domain'
    })

    if (res.success) {


      const settingsRes = await apiGetSettings()
      if (settingsRes.success && settingsRes.data) {
        setSettings(settingsRes.data)
        toast.success(isConnected ? 'Custom domain updated!' : 'Custom domain connected successfully!', {
          position: 'top-right',
          autoClose: 2500,
          style: { fontSize: '0.82rem' },
        })
      }
    } else {
      toast.error(res.message || 'Failed to connect domain', {
        position: 'top-right',
        autoClose: 3000,
        style: { fontSize: '0.82rem' },
      })
    }

    setLoading(false)
  }

  return (
    <div className="p-7 flex flex-col gap-5">
      <p className="text-[0.82rem] text-hd-text-soft m-0 leading-relaxed">
        Point a subdomain like docs.yourcompany.com to your Hyperdocs site using a CNAME record.
      </p>

      {!isConnected ? (
        <div>
          <label className="block text-[0.78rem] font-bold text-hd-text-soft uppercase tracking-wider mb-2">URL</label>
          <div className="flex gap-2.5">
            <div className="flex items-stretch flex-1 border border-hd-border rounded-lg overflow-hidden bg-hd-bg focus-within:border-hd-accent transition-colors">
              <div className="px-3.5 bg-hd-surface border-r border-hd-border flex items-center text-[0.85rem] text-hd-muted whitespace-nowrap shrink-0">
                https://
              </div>
              <input
                type="text"
                value={subdomainValue}
                onChange={e => setSubdomainValue(e.target.value)}
                placeholder="docs.yourcompany.com"
                className="flex-1 px-3.5 py-2.5 border-0 outline-none text-sm text-hd-text bg-hd-bg min-w-0"
                disabled={loading}
              />
            </div>
            <button
              type="button"
              onClick={handleConnect}
              disabled={loading || !subdomainValue.trim()}
              className={`px-6 rounded-lg border font-bold text-[0.875rem] shrink-0 transition-all duration-150 flex items-center gap-1.5 ${!loading && subdomainValue.trim()
                  ? 'bg-[#f26522] hover:bg-[#d95318] text-white border-0 shadow-[0_2px_8px_rgba(242,101,34,0.3)] cursor-pointer'
                  : 'bg-hd-surface text-hd-muted border border-hd-border cursor-not-allowed'
                }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-1 h-3.5 w-3.5 text-current opacity-70" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="opacity-70">Connecting...</span>
                </>
              ) : (
                'Connect'
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="border border-hd-border rounded-lg p-5 flex items-center justify-between bg-hd-surface">
          <div>
            <label className="block text-[0.78rem] font-bold text-hd-text-soft uppercase tracking-wider mb-1">Connected URL</label>
            <p className="m-0 text-sm font-semibold text-hd-text">https://{currentSubDomain}</p>
          </div>
          <button
            type="button"
            onClick={() => setShowDisconnectConfirm(true)}
            disabled={loading}
            className="px-4 py-2 rounded-lg border border-red-500/30 bg-red-500/5 hover:bg-red-500/10 text-red-500 font-bold text-[0.8rem] cursor-pointer transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <IconTrash />
            Disconnect Domain
          </button>
        </div>
      )}

      {isConnected && currentSubDomain && (
        <SubdomainInstruction domain={currentSubDomain} />
      )}

      <ConfirmDialog
        open={showDisconnectConfirm}
        title="Disconnect Domain?"
        description={`Are you sure you want to disconnect ${currentSubDomain}? Your documentation will no longer be accessible from this URL.`}
        confirmText={loading ? 'Disconnecting...' : 'Yes, Disconnect'}
        danger
        onConfirm={handleDisconnect}
        onCancel={() => setShowDisconnectConfirm(false)}
      />
    </div>
  )
}
