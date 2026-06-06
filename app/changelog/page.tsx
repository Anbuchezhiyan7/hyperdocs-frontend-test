'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ChangelogRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    let latestYear = '2026'
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hyperdocs_changelog_entries_v2')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          if (parsed && parsed.length > 0) {
            // Find most recent year
            const years = parsed.map((e: any) => e.dateKey.split('-')[0])
            const sorted = Array.from(new Set(years)).sort() as string[]
            if (sorted.length > 0) {
              latestYear = sorted[sorted.length - 1]
            }
          }
        } catch (e) {
          // ignore
        }
      }
    }
    router.replace(`/changelog/${latestYear}-product-updates`)
  }, [router])

  return (
    <div className="min-h-screen bg-hd-bg flex items-center justify-center text-hd-text-soft" style={{ fontFamily: "var(--font-sans), sans-serif" }}>
      <span className="text-sm">Redirecting to latest updates...</span>
    </div>
  )
}
