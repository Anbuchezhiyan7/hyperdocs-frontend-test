import React from 'react'
import { FileText, FilePlus, Globe, GitBranch } from 'lucide-react'

interface DashboardOptionsProps {
  onSelect: (mode: 'default' | 'blank' | 'git') => void
  isSubmitting: 'default' | 'blank' | 'git' | null
  greeting: string
  username: string
}

export function DashboardOptions({ onSelect, isSubmitting, greeting, username }: DashboardOptionsProps) {
  return (
    <div className="max-w-[840px] mx-auto px-8 pt-10 pb-16">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold m-0 tracking-tight">
            {greeting}, {username}
          </h1>
          <p className="text-sm text-hd-muted mt-1">
            Welcome to Hyperdocs. Please choose a starting point.
          </p>
        </div>
      </div>
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Option 1: Template Docs */}
          <button
            onClick={() => onSelect('default')}
            disabled={isSubmitting !== null}
            className={`relative flex flex-col items-start p-7 bg-hd-surface border border-hd-border shadow-[0_8px_30px_rgba(0,0,0,0.02)] rounded-3xl transition-all duration-500 text-left group overflow-hidden ${isSubmitting !== null ? 'opacity-50 cursor-not-allowed' : 'hover:border-[#f26522]/50 hover:-translate-y-1 hover:shadow-[0_24px_50px_-15px_rgba(242,101,34,0.25)] cursor-pointer'}`}
          >
            {/* Subtle Glow Overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-[#f26522]/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

            <div className="relative w-14 h-14 rounded-[1rem] bg-linear-to-br from-[#f26522]/20 to-[#f26522]/5 flex items-center justify-center text-[#f26522] mb-6 border border-[#f26522]/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-[0_0_20px_rgba(242,101,34,0.15)] group-hover:shadow-[0_0_30px_rgba(242,101,34,0.3)]">
              {isSubmitting === 'default' ? (
                <svg className="animate-spin" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
              ) : (
                <FileText size={26} strokeWidth={2.5} />
              )}
            </div>
            <h4 className="relative text-[1.15rem] font-bold text-hd-text tracking-tight m-0 mb-2">Template Docs</h4>
            <p className="relative text-[13.5px] text-hd-muted leading-relaxed m-0 max-w-[95%]">
              Select a documentation template and edit it from there. Ideal for seeing how pages, navigation, and components fit together beautifully.
            </p>
          </button>

          {/* Option 2: GitHub Integration */}
          <button
            onClick={() => onSelect('git')}
            disabled={isSubmitting !== null}
            className={`relative flex flex-col items-start p-7 bg-hd-surface border border-hd-border shadow-[0_8px_30px_rgba(0,0,0,0.02)] rounded-3xl transition-all duration-500 text-left group overflow-hidden ${isSubmitting !== null ? 'opacity-50 cursor-not-allowed' : 'hover:border-hd-text/30 hover:-translate-y-1 hover:shadow-[0_24px_50px_-15px_rgba(0,0,0,0.1)] cursor-pointer'}`}
          >
            {/* Subtle Glow Overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-hd-text/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

            <div className="relative w-14 h-14 rounded-[1rem] bg-linear-to-br from-hd-text/10 to-hd-text/5 flex items-center justify-center text-hd-text mb-6 border border-hd-text/10 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.05)] group-hover:shadow-[0_0_30px_rgba(0,0,0,0.15)]">
              {isSubmitting === 'git' ? (
                <svg className="animate-spin" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
              ) : (
                <GitBranch size={26} strokeWidth={2.5} />
              )}
            </div>
            <h4 className="relative text-[1.15rem] font-bold text-hd-text tracking-tight m-0 mb-2">GitHub Integration</h4>
            <p className="relative text-[13.5px] text-hd-muted leading-relaxed m-0 max-w-[95%]">
              Sync documentation directly from your GitHub repository with automatic build pipelines.
            </p>
          </button>

          {/* Option 3: Import Existing Docs (Coming Soon) */}
          <div className="relative flex flex-col items-start p-7 bg-hd-bg border border-hd-border shadow-[0_2px_12px_rgba(0,0,0,0.015)] rounded-3xl overflow-hidden select-none group">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(150,150,150,0.015)_50%,transparent_75%,transparent)] bg-[length:16px_16px]" />

            <div className="absolute top-6 right-6">
              <span className="text-[0.6rem] font-bold uppercase tracking-widest px-3 py-1 bg-[#f26522]/10 text-[#f26522] border border-[#f26522]/20 rounded-full shadow-sm backdrop-blur-sm">Coming Soon</span>
            </div>

            <div className="relative w-14 h-14 rounded-[1rem] bg-hd-surface border border-hd-border-soft flex items-center justify-center text-hd-muted mb-6 shadow-inner">
              <Globe size={26} strokeWidth={2} className="opacity-50" />
            </div>
            <h4 className="relative text-[1.15rem] font-bold text-hd-text-soft tracking-tight m-0 mb-2 opacity-50">Import Existing Docs</h4>
            <p className="relative text-[13.5px] text-hd-muted leading-relaxed m-0 max-w-[95%] opacity-50">
              Automatically scrape, structure, and convert your existing documentation website into Hyperdocs.
            </p>
          </div>

          {/* Option 4: Blank Doc */}
          <button
            onClick={() => onSelect('blank')}
            disabled={isSubmitting !== null}
            className={`relative flex flex-col items-start p-7 bg-hd-surface border border-hd-border shadow-[0_8px_30px_rgba(0,0,0,0.02)] rounded-3xl transition-all duration-500 text-left group overflow-hidden ${isSubmitting !== null ? 'opacity-50 cursor-not-allowed' : 'hover:border-hd-text/30 hover:-translate-y-1 hover:shadow-[0_24px_50px_-15px_rgba(0,0,0,0.1)] cursor-pointer'}`}
          >
            {/* Subtle Glow Overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-hd-text/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

            <div className="relative w-14 h-14 rounded-[1rem] bg-linear-to-br from-hd-text/10 to-hd-text/5 flex items-center justify-center text-hd-text mb-6 border border-hd-text/10 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.05)] group-hover:shadow-[0_0_30px_rgba(0,0,0,0.15)]">
              {isSubmitting === 'blank' ? (
                <svg className="animate-spin" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
              ) : (
                <FilePlus size={26} strokeWidth={2.5} />
              )}
            </div>
            <h4 className="relative text-[1.15rem] font-bold text-hd-text tracking-tight m-0 mb-2">Blank Doc</h4>
            <p className="relative text-[13.5px] text-hd-muted leading-relaxed m-0 max-w-[95%]">
              Start from scratch. Build your documentation from the ground up with complete control over the structure and styling.
            </p>
          </button>

        </div>
      </div>
    </div>
  )
}
