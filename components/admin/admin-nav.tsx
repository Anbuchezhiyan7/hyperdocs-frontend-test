'use client'

import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { apiGetAvailableRepos, apiGetRepoCommits } from '@/lib/api/github'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { useAuth } from '@/lib/auth-provider'
import { useGitSyncStore } from '@/lib/store/useGitSyncStore'
import { useAppStore } from '@/lib/store/useAppStore'
import {
  IconDashboard,
  IconEditor,
  IconDomain,
  IconGit,
  IconGeneralSettings,
  IconNavigation,
  IconSettings,
  IconSignOut,
  IconChangelog,
  IconAnalytics,
  IconHelpCenter,
  IconHome,
} from '@/components/shared/icons'

type Section = 'dashboard' | 'home' | 'editor' | 'domain' | 'git' | 'git-sync' | 'settings' | 'general' | 'navigation' | 'changelog' | 'analytics' | 'help-center'

const NAV_GROUPS: {
  title: string
  items: { key: Section; label: string; icon: React.ReactNode }[]
}[] = [
    {
      title: 'General',
      items: [
        { key: 'dashboard', label: 'Dashboard', icon: <IconDashboard /> },
      ]
    },
    {
      title: 'Content',
      items: [
        { key: 'home', label: 'Home', icon: <IconHome /> },
        { key: 'editor', label: 'Docs Editor', icon: <IconEditor /> },
        { key: 'changelog', label: 'Changelog', icon: <IconChangelog /> },
        { key: 'help-center', label: 'Help Center', icon: <IconHelpCenter /> },
      ]
    },
    {
      title: 'Git',
      items: [
        { key: 'git', label: 'Git Integration', icon: <IconGit /> },
        {
          key: 'git-sync',
          label: 'Git Sync',
          icon: (
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
          ),
        },
      ]
    },
    {
      title: 'Settings',
      items: [
        { key: 'domain', label: 'Domain Setup', icon: <IconDomain /> },
        { key: 'navigation', label: 'Navigation', icon: <IconNavigation /> },
        { key: 'general', label: 'General Settings', icon: <IconSettings /> },
        { key: 'analytics', label: 'Analytics', icon: <IconAnalytics /> },
      ]
    }
  ]


function NavBtn({
  label,
  active,
  onClick,
  icon,
  isSubItem = false,
  badge,
}: {
  label: string
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  isSubItem?: boolean
  badge?: React.ReactNode
}) {
  const [hovered, setHovered] = React.useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg border-none cursor-pointer text-[0.855rem] mb-[1px] text-left transition-colors duration-150 relative ${active
        ? 'font-bold bg-hd-accent-light text-[#f26522]'
        : hovered
          ? 'font-semibold bg-hd-surface text-hd-text'
          : 'font-semibold bg-transparent text-hd-admin-text'
        }`}
    >
      {/* Active left accent bar */}
      {active && (
        <span className="absolute left-0 top-[20%] bottom-[20%] w-[3px] rounded-sm bg-[#f26522]" />
      )}
      <span className={`shrink-0 flex items-center transition-colors duration-150 ${isSubItem ? 'ml-4' : ''} ${active ? 'text-[#f26522]' : hovered ? 'text-hd-text' : 'text-hd-admin-muted'
        }`}>
        {icon}
      </span>
      <span className="flex-1 truncate">{label}</span>
      {badge}
    </button>
  )
}

export function AdminNav({
  activeSection,
  onSectionChange,
}: {
  activeSection: string
  onSectionChange?: (s: Section) => void
}) {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [confirmSignout, setConfirmSignout] = React.useState(false)
  const [signoutHovered, setSignoutHovered] = React.useState(false)

  const { pendingCommits, hasChangesDetected, setPendingCommits, setHasChangesDetected } = useGitSyncStore()
  const { settings } = useAppStore()
  const credits = settings?.generation_credits
  const remaining = credits?.remaining ?? 0
  const total = credits?.total ?? 0
  const percentage = total > 0 ? (remaining / total) * 100 : 0

  useEffect(() => {
    const handleSyncStatus = (e: Event) => {
      const customEvent = e as CustomEvent
      setPendingCommits(customEvent.detail?.totalCommits ?? 0)
    }
    const handleDetected = () => {
      setHasChangesDetected(true)
    }
    window.addEventListener('hd_github_sync_status', handleSyncStatus as EventListener)
    window.addEventListener('hd_github_changes_detected', handleDetected)
    return () => {
      window.removeEventListener('hd_github_sync_status', handleSyncStatus as EventListener)
      window.removeEventListener('hd_github_changes_detected', handleDetected)
    }
  }, [setPendingCommits, setHasChangesDetected])

  useEffect(() => {
    if (activeSection === 'git-sync') {
      setHasChangesDetected(false)
      setPendingCommits(0)
    }
  }, [activeSection, setHasChangesDetected, setPendingCommits])



  const username = Cookies.get('username') || user?.name || 'Account'
  const email = Cookies.get('email') || user?.email || ''

  const initials = username
    ? username.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
    : '?'

  return (
    <div className="w-[240px] shrink-0 h-full bg-hd-admin-nav border-r border-hd-admin-border flex flex-col">
      {/* Nav items */}
      <nav className="flex-1 px-2 pt-2.5 pb-1 overflow-y-auto">
        {NAV_GROUPS.map((group, idx) => (
          <div key={idx} className={idx > 0 ? 'mt-4' : ''}>
            <div className="text-[0.62rem] font-bold text-hd-admin-muted uppercase tracking-wider px-3 mb-1.5 select-none">
              {group.title}
            </div>
            {group.items.map(item => (
              <NavBtn
                key={item.key}
                label={item.label}
                active={activeSection === item.key}
                onClick={() => {
                  if (item.key === 'editor') {
                    router.push('/admin/editor')
                  } else if (item.key === 'git') {
                    router.push('/admin/git-integration')
                  } else {
                    router.push(`/admin/${item.key}`)
                  }
                  if (onSectionChange) {
                    onSectionChange(item.key)
                  }
                }}
                icon={item.icon}
                badge={item.key === 'git-sync' && hasChangesDetected ? (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ef4444] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ef4444]"></span>
                  </span>
                ) : undefined}
              />
            ))}
          </div>
        ))}
      </nav>

      {/* Divider */}
      <div className="h-px bg-hd-admin-border mx-3" />

      {credits && (
        <>
          {/* AI Credits */}
          <div className="mx-3 my-2 p-2.5 rounded-xl border border-hd-admin-border bg-hd-surface/30 backdrop-blur-md select-none">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-[#f26522]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707" />
                  <path d="M10 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" />
                </svg>
                <span className="text-[10px] font-bold text-hd-admin-muted uppercase tracking-wider">AI Credits</span>
              </div>
              <span className="text-[11px] font-bold text-hd-text">
                {remaining.toLocaleString()} <span className="text-hd-admin-muted font-medium text-[9px]">/ {total.toLocaleString()}</span>
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-hd-admin-border/50 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  background: 'linear-gradient(90deg, #f26522 0%, #ff8f5a 100%)',
                  width: `${Math.min(100, Math.max(0, percentage))}%`
                }}
              />
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-hd-admin-border mx-3" />
        </>
      )}




      {/* User / Sign out */}
      <div className="px-2 pt-2.5 pb-3.5 shrink-0">
        <button
          onClick={() => setConfirmSignout(true)}
          onMouseEnter={() => setSignoutHovered(true)}
          onMouseLeave={() => setSignoutHovered(false)}
          className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg border-none cursor-pointer text-[0.855rem] text-left transition-all duration-150 ${signoutHovered ? 'bg-[#ef4444]/10' : 'bg-transparent text-hd-admin-text'}`}
        >
          {/* Avatar */}
          {user?.picture ? (
            <Image
              src={user.picture}
              alt={user.name}
              width={26}
              height={26}
              className="shrink-0 w-10 h-10 rounded-full border border-hd-admin-border object-cover"
            />
          ) : (
            <div className={`shrink-0 w-[26px] h-[26px] rounded-full border border-hd-admin-border flex items-center justify-center text-[0.65rem] font-bold transition-all duration-150 ${signoutHovered ? 'bg-[#ef4444]/15 text-[#ef4444]' : 'bg-hd-surface text-hd-admin-muted'}`}>
              {initials}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className={`text-[0.8rem] font-semibold leading-tight truncate transition-colors duration-150 ${signoutHovered ? 'text-[#ef4444]' : 'text-hd-text'}`}>
              {username}
            </div>
            <div className="text-[0.7rem] text-hd-admin-text font-medium mt-px truncate opacity-85">
              {email}
            </div>
          </div>
          <IconSignOut className={`shrink-0 transition-colors duration-150 ${signoutHovered ? 'text-[#ef4444]' : 'opacity-40'}`} />
        </button>
      </div>

      {/* Confirm sign-out dialog */}
      {confirmSignout && (
        <div className="fixed inset-0 z-1000 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-hd-bg border border-hd-border rounded-2xl pt-7 px-7 pb-6 max-w-[380px] w-[90%] shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
            <div className="w-11 h-11 rounded-xl bg-[#ef4444]/10 flex items-center justify-center mb-4">
              <IconSignOut width="22" height="22" stroke="#ef4444" />
            </div>
            <h3 className="text-base font-bold text-hd-text m-0 mb-2">Sign out?</h3>
            <p className="text-[0.82rem] text-hd-muted m-0 mb-6 leading-relaxed">
              You will be redirected to the login page.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmSignout(false)}
                className="flex-1 p-[9px] rounded-lg border border-hd-border bg-transparent text-hd-text-soft text-[0.875rem] cursor-pointer font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => { setConfirmSignout(false); signOut() }}
                className="flex-1 p-[9px] rounded-lg border-none bg-[#ef4444] text-white text-[0.875rem] cursor-pointer font-bold"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
