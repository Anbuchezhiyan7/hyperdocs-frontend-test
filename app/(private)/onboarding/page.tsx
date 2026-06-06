'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { FilePlus, RefreshCw, Sparkles, HelpCircle, ArrowRight, Check } from 'lucide-react'

interface Option {
  id: number
  title: string
  subtitle: string
  icon: React.ReactNode
  tag: string
  tagColor: string
  solutionTitle: string
  solutionSubtitle: string
}

export default function OnboardingPage() {
  const router = useRouter()
  const [selected, setSelected] = useState<Option | null>(null)

  const options: Option[] = [
    {
      id: 1,
      title: "We don't have documentation yet",
      subtitle: "Starting documentation from scratch is harder than it looks",
      icon: <FilePlus size={20} className="text-[#f26522]" />,
      tag: "Draft",
      tagColor: "bg-violet-50 text-violet-600",
      solutionTitle: "Generate starting docs instantly.",
      solutionSubtitle: "Most teams delay documentation because they don't know where to start. Connect your GitHub repository and Hyperdocs can generate a documentation structure and draft content based on your codebase.",
    },
    {
      id: 2,
      title: "Our documentation is outdated",
      subtitle: "Documentation falls behind faster than most teams realize",
      icon: <RefreshCw size={20} className="text-[#f26522]" />,
      tag: "Sync",
      tagColor: "bg-blue-50 text-blue-600",
      solutionTitle: "Keep docs in lockstep with code.",
      solutionSubtitle: "Features change, workflows evolve, and releases ship every week. Documentation often becomes outdated. Hyperdocs monitors changes in your GitHub repository, identifies impacted content, and suggests documentation updates so your docs stay aligned with your product.",
    },
    {
      id: 3,
      title: "We're rebuilding our documentation",
      subtitle: "Rebuilding documentation shouldn't mean starting over",
      icon: <Sparkles size={20} className="text-[#f26522]" />,
      tag: "Rebuild",
      tagColor: "bg-amber-50 text-amber-600",
      solutionTitle: "Import and upgrade existing docs.",
      solutionSubtitle: "Many teams outgrow their existing documentation. Import your existing documentation, organize it into a structured knowledge system, and let Hyperdocs identify content gaps, outdated pages, and opportunities for improvement.",
    },
    {
      id: 4,
      title: "Users can't find answers",
      subtitle: "Good documentation isn't useful if users can't find it",
      icon: <HelpCircle size={20} className="text-[#f26522]" />,
      tag: "Help",
      tagColor: "bg-emerald-50 text-emerald-600",
      solutionTitle: "Launch an AI-powered help center.",
      solutionSubtitle: "Hyperdocs includes a dedicated help center that uses your documentation as the source of truth, helping users find answers faster through search and AI-powered assistance.",
    },
  ]

  return (
    <div
      data-theme="light"
      className="min-h-screen flex items-center justify-center font-admin p-6"
      style={{ background: 'linear-gradient(135deg, #fff8f4 0%, #ffffff 40%, #fff3eb 70%, #ffeedd 100%)' }}
    >
      {/* blobs */}
      <div className="fixed -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(242,101,34,0.11) 0%, transparent 70%)' }} />
      <div className="fixed -bottom-40 -right-40 w-[460px] h-[460px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(242,101,34,0.07) 0%, transparent 70%)' }} />

      <div className="relative z-10 w-full max-w-[480px]">
        <div className="bg-white/80 backdrop-blur-sm border border-[#f26522]/14 rounded-[22px] shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_32px_rgba(242,101,34,0.07)] p-8">

          {/* Logo */}
          <div className="mb-7">
            <div className="w-11 h-11 rounded-xl bg-white shadow-sm border border-[#f26522]/14 flex items-center justify-center">
              <Image src="/images/favicon.png" alt="Hyperdocs" width={26} height={26} priority />
            </div>
          </div>

          {!selected ? (
            /* ── Questions ── */
            <>
              <h1 className="text-[1.75rem] font-[850] text-[#111] tracking-[-0.03em] leading-tight mb-1.5">
                Welcome to Hyperdocs
              </h1>
              <p className="text-[0.9rem] text-[#888] font-[500] mb-6">
                What sounds the most like you right now?
              </p>

              <div className="flex flex-col gap-3">
                {options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelected(opt)}
                    className="flex items-center gap-4 p-4 bg-white border border-[#e8e8e8] hover:border-[#f26522]/50 hover:bg-[#fff8f5] rounded-[14px] text-left transition-all duration-200 group cursor-pointer w-full"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#f26522]/8 flex items-center justify-center shrink-0 group-hover:bg-[#f26522]/14 transition-colors duration-200">
                      {opt.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[0.9rem] font-[700] text-[#111] leading-snug tracking-tight">
                          {opt.title}
                        </span>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ${opt.tagColor}`}>
                          {opt.tag}
                        </span>
                      </div>
                      <div className="text-[0.78rem] text-[#999] leading-normal">
                        {opt.subtitle}
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-[#ccc] group-hover:text-[#f26522] shrink-0 transition-colors duration-200" />
                  </button>
                ))}
              </div>
            </>
          ) : (
            /* ── Answer ── */
            <div style={{ animation: 'fadeUp 0.22s ease-out' }}>
              {/* Selected badge */}
              <div className="flex items-center gap-3 p-3 bg-[#f26522]/6 border border-[#f26522]/18 rounded-[12px] mb-6">
                <div className="w-8 h-8 rounded-lg bg-[#f26522]/12 flex items-center justify-center shrink-0">
                  {selected.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[0.8rem] font-[700] text-[#f26522] leading-snug truncate">
                    {selected.title}
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full bg-[#f26522] flex items-center justify-center shrink-0">
                  <Check size={10} className="text-white" />
                </div>
              </div>

              {/* Answer content */}
              <h2 className="text-[1.6rem] font-[850] text-[#111] tracking-[-0.03em] leading-tight mb-3">
                {selected.solutionTitle}
              </h2>
              <p className="text-[0.92rem] text-[#555] leading-relaxed mb-8">
                {selected.solutionSubtitle}
              </p>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => router.push('/site-details?from=onboarding')}
                  className="w-full h-[48px] rounded-[12px] bg-[#f26522] hover:bg-[#e05515] text-white text-[0.9rem] font-[700] flex items-center justify-center gap-2 transition-all duration-150 shadow-[0_4px_14px_rgba(242,101,34,0.3)] hover:shadow-[0_6px_20px_rgba(242,101,34,0.38)] active:scale-[0.99] cursor-pointer border-none font-[inherit]"
                >
                  Continue
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
