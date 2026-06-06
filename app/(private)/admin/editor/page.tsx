'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDocs, firstPage } from '@/lib/docs-context'

export default function AdminEditorRedirectPage() {
  const router = useRouter()
  const { items, isLoading, getPathSegments, reloadStructure } = useDocs()

  useEffect(() => {
    reloadStructure()
  }, [reloadStructure])

  useEffect(() => {
    // Wait until the admin API has fully resolved before redirecting.
    // Firing early (items = []) would produce no-op or wrong path.
    if (isLoading) return

    const page = firstPage(items)
    if (page) {
      const segs = getPathSegments(page.id)
      if (segs.length > 0) {
        router.replace('/admin/editor/' + segs.join('/'))
      }
    }
  }, [isLoading, items, router, getPathSegments])

  return (
    <div className="flex-1 flex items-center justify-center" style={{ color: '#555' }}>
      <div className="text-center">
        <div className="text-3xl mb-3 opacity-20">📄</div>
        <p className="text-sm">Loading documents…</p>
      </div>
    </div>
  )
}
