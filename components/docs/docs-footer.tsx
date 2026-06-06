'use client'

import React from 'react'
import Link from 'next/link'
import { useNavConfig } from '@/lib/nav-config-context'
import { useSiteConfig } from '@/lib/site-config-context'
import { useTheme } from '@/lib/theme-context'
import { MadeWithHyperdocs } from '@/components/shared/made-with-hyperdocs'

export function DocsFooter() {
  const { config } = useNavConfig()
  const { siteConfig } = useSiteConfig()
  const { resolvedTheme } = useTheme()
  const { footerSections } = config

  const activeLogo = resolvedTheme === 'dark'
    ? (siteConfig.logoUrlDark || siteConfig.logoUrl)
    : (siteConfig.logoUrlLight || siteConfig.logoUrl)

  return (
    <footer className="border-t border-hd-border bg-hd-bg mt-auto">
      {footerSections.length > 0 && (
        <div className="max-w-[1440px] mx-auto px-10 pt-10 pb-8 flex justify-between gap-8 flex-wrap">
          {/* Brand column */}
          <div>
            <Link href={siteConfig.logoLinkUrl || '/'} className="no-underline inline-block">
              <span className="font-bold text-sm text-hd-text">
                {siteConfig.organizationName || 'Hyperdocs'}
              </span>
              {/* {activeLogo ? (
                <img
                  src={activeLogo}
                  alt={siteConfig.organizationName}
                  className="h-auto w-[100px] object-contain"
                />
              ) : (
                <span className="font-bold text-sm text-hd-text">
                  {siteConfig.organizationName || 'Hyperdocs'}
                </span>
              )} */}
            </Link>
            {siteConfig.description && (
              <p className="text-[13px] text-hd-text-soft mt-2 leading-relaxed">
                {siteConfig.description}
              </p>
            )}
          </div>

          {/* Link sections */}
          <div className="flex gap-16 flex-wrap">
            {footerSections.map((section) => (
              <div key={section.id} className="min-w-[120px]">
                <p className="text-xs font-bold tracking-[0.08em] uppercase text-hd-muted-light mb-3">
                  {section.name}
                </p>
                <ul className="list-none p-0 m-0 flex flex-col gap-2">
                  {section.links.map((link) => (
                    <li key={link.id}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13.5px] text-hd-text-soft no-underline transition-colors duration-150 hover:text-hd-text"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom bar */}
      {/* <div
        className={`px-10 py-3 flex items-center justify-center ${footerSections.length > 0 ? 'border-t border-hd-border-soft' : ''
          }`}
      >
        <MadeWithHyperdocs />
      </div> */}
    </footer>
  )
}
