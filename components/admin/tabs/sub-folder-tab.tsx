'use client'

import React from 'react'

export function SubFolderTab() {
  return (
    <div className="p-7 flex flex-col items-center justify-center min-h-[200px] text-center">
      <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 mb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
      </div>
      <h3 className="text-base font-bold text-hd-text m-0 mb-2">Sub-Folder Support</h3>
      <p className="text-[0.85rem] text-hd-muted max-w-[300px] m-0 leading-relaxed">
        Hosting your documentation in a sub-folder (e.g. yourcompany.com/docs) is currently in active development.
      </p>
    </div>
  )
}
