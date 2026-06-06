import React, { Suspense } from 'react'
import { GitPanel } from '@/components/admin/git-panel'

export default function GitPage() {
  return (
    <Suspense fallback={null}>
      <GitPanel />
    </Suspense>
  )
}
