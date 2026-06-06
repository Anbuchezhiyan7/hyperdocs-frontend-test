'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { IconSpinner } from '@/components/shared/icons'
import { apiUpdateDomain } from '@/lib/api/auth'
import { DOMAIN_SUFFIX } from '@/lib/definitions'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

const toUrlFriendly = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

export default function ConnectRepoPage() {
  const router = useRouter()
  const [orgName, setOrgName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const domainName = toUrlFriendly(orgName)

  const handleChange = (value: string) => {
    setError('')
    const cleanValue = value.toLowerCase().replace(/[^a-z0-9]/g, '')
    setOrgName(cleanValue)
  }

  const handleContinue = async () => {
    if (!domainName) return
    setLoading(true)
    setError('')

    const response = await apiUpdateDomain({
      domain: `${domainName}.${DOMAIN_SUFFIX}`,
      domain_type: 'default',
    })

    if (response.success) {
      // Mark user as published in the stored cookie
      try {
        const stored = Cookies.get('user')
        if (stored) {
          const parsed = JSON.parse(stored)
          Cookies.set('user', JSON.stringify({ ...parsed, published: true }), { expires: 30 })
        }
      } catch { }
      const fromOnboarding = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('from') === 'onboarding'
      router.push(fromOnboarding ? '/admin' : '/connect-repo')
    } else {
      setError(response.message || 'That address is unavailable. Please try another.')
      toast.error(response.message || 'Failed to save site details.')
    }

    setLoading(false)
  }

  return (
    <div
      data-theme="light"
      className="min-h-screen flex items-center justify-center bg-[linear-gradient(135deg,#fff8f4_0%,#ffffff_40%,#fff3eb_70%,#ffeedd_100%)] font-admin p-[2rem_1.5rem]"
    >
      {/* Blobs */}
      <div className="fixed -top-[160px] -left-[160px] w-[520px] h-[520px] rounded-full pointer-events-none bg-[radial-gradient(circle,_rgba(242,101,34,0.12)_0%,_transparent_70%)]" />
      <div className="fixed -bottom-[140px] -right-[140px] w-[480px] h-[480px] rounded-full pointer-events-none bg-[radial-gradient(circle,_rgba(242,101,34,0.08)_0%,_transparent_70%)]" />

      <div className="relative z-[1] w-full max-w-[420px] bg-[rgba(255,255,255,0.75)] border border-solid border-[rgba(242,101,34,0.14)] rounded-[20px] p-[2.5rem_2rem] backdrop-blur-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.04),_0_8px_32px_rgba(242,101,34,0.07)]">
        {/* Logo */}
        <div className="flex justify-center">
          <Image src="/images/logo.png" alt="Hyperdocs" width={148} height={40} className="h-auto" priority />
        </div>

        {/* Heading */}
        <h2 className="text-[1.3rem] font-[800] text-[#111] tracking-[-0.025em] mb-[1.75rem] text-center">
          Name Your Workspace
        </h2>

        {/* Organization Name field */}
        <div className="mb-[1.5rem]">
          <label className="block text-[0.85rem] font-[600] text-[#444] mb-[0.5rem]">
            Organization Name
          </label>

          <div className={`flex items-stretch border-[1.5px] border-solid rounded-[10px] overflow-hidden bg-[#fff] shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-[border-color] duration-150 ${error ? 'border-[#ef4444]' : 'border-[#e0e0e0]'}`}>
            <input
              type="text"
              placeholder="Enter organization name"
              value={orgName}
              onChange={e => handleChange(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !loading && domainName && handleContinue()}
              className="flex-1 border-none outline-none p-[0.75rem_0.875rem] text-[0.9rem] text-[#111] bg-transparent font-[inherit]"
            />
          </div>

          {error && (
            <p className="mt-[0.5rem] text-[0.8rem] text-[#ef4444]">{error}</p>
          )}

          {orgName && (
            <p className="mt-[0.5rem] text-[0.82rem] text-[#f26522] font-[600]">
              {domainName}.{DOMAIN_SUFFIX}
            </p>
          )}

          <p className="mt-[0.5rem] text-[0.78rem] text-[#999] leading-[1.6]">
            <span className="text-[#555] font-[600]">You can always connect your own domain later.</span>
          </p>
        </div>

        {/* Continue button */}
        <button
          onClick={handleContinue}
          disabled={!domainName || loading}
          className={`w-full h-[48px] rounded-[12px] border-none text-[#fff] text-[0.9375rem] font-[700] flex items-center justify-center gap-[0.5rem] transition-[background] duration-150 font-[inherit] ${!domainName || loading ? 'bg-[#fba97a] cursor-not-allowed' : 'bg-[#f26522] hover:bg-[#e05515] cursor-pointer'}`}
        >
          {loading && <IconSpinner className="w-4 h-4 text-[#fff]" />}
          {loading ? 'Saving…' : 'Continue'}
        </button>
      </div>
    </div>
  )
}
