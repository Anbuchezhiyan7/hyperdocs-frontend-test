'use client'

import React from 'react'
import { NavItem, useDocs } from '@/lib/docs-context'
import { useDocRouter } from '@/lib/doc-router'
import { ContentRenderer, extractHeadings } from '@/components/docs/content-renderer'
import { PageToc } from '@/components/docs/page-toc'
import { IconPage, IconArrowLeft, IconArrowRight } from '@/components/shared/icons'
import { MadeWithHyperdocs } from '@/components/shared/made-with-hyperdocs'

function flattenPages(items: NavItem[], currentPath: string[] = []): { item: NavItem; path: string[] }[] {
  let list: { item: NavItem; path: string[] }[] = []
  for (const item of items) {
    const itemPath = [...currentPath, item.slug]
    if (item.type === 'page') {
      list.push({ item, path: itemPath })
    }
    if (item.children) {
      list = list.concat(flattenPages(item.children, itemPath))
    }
  }
  return list
}

export default function DocsPage() {
  // useDocRouter().pathname is our custom synchronous path state —
  // it updates the instant navigate() is called (same frame, no RSC fetch).
  const { pathname, search, navigate } = useDocRouter()
  const highlightQuery = React.useMemo(() => new URLSearchParams(search).get('highlight') || undefined, [search])
  const { findByPath, items } = useDocs()

  // Scroll to the top of the page when pathname changes (e.g. pagination or sidebar navigation)
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [pathname])

  const slug = pathname.split('/').filter(Boolean)
  const page = findByPath(slug)

  const nodes = (page?.type === 'page' ? page.content : null) ?? []
  const headings = extractHeadings(nodes as Parameters<typeof extractHeadings>[0])

  const pageTitle = page && page.type === 'page' && page.title
    ? `${page.title} | Hyperdocs`
    : 'Hyperdocs | Public Documentation Software for SaaS Teams'

  const flatPages = flattenPages(items)
  const currentIndex = page ? flatPages.findIndex((p) => p.item.id === page.id) : -1
  const prevPage = currentIndex > 0 ? flatPages[currentIndex - 1] : null
  const nextPage = currentIndex !== -1 && currentIndex < flatPages.length - 1 ? flatPages[currentIndex + 1] : null

  const paginationLink = (href: string, label: string, title: string, dir: 'prev' | 'next') => (
    <a
      href={href}
      onClick={(e) => { e.preventDefault(); navigate(href) }}
      className={`group flex items-center ${dir === 'next' ? 'flex-row-reverse text-right' : ''} gap-4 p-5 rounded-xl border border-hd-border-soft bg-hd-bg no-underline transition-all duration-300 shadow-sm hover:border-hd-accent hover:bg-hd-accent-light hover:-translate-y-0.5 hover:shadow-md`}
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-hd-border-soft bg-hd-bg-soft text-hd-text-soft transition-all duration-300 group-hover:bg-hd-accent group-hover:text-white group-hover:border-hd-accent shrink-0">
        {dir === 'prev'
          ? <IconArrowLeft width="20" height="20" strokeWidth="2" />
          : <IconArrowRight width="20" height="20" strokeWidth="2" />}
      </div>
      <div className="flex flex-col flex-grow">
        <span className="text-[11px] font-semibold text-hd-text-soft uppercase tracking-wider">{label}</span>
        <span className="text-[15px] font-semibold text-hd-text mt-1 transition-colors duration-200 group-hover:text-hd-accent">{title}</span>
      </div>
    </a>
  )

  const paginationDisabled = (label: string, placeholder: string, dir: 'prev' | 'next') => (
    <div className={`flex items-center ${dir === 'next' ? 'flex-row-reverse text-right' : ''} gap-4 p-5 rounded-xl border border-hd-border-soft bg-hd-bg-soft/50 opacity-40 cursor-not-allowed`}>
      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-hd-border-soft bg-hd-bg-soft text-hd-muted shrink-0">
        {dir === 'prev'
          ? <IconArrowLeft width="20" height="20" strokeWidth="2" />
          : <IconArrowRight width="20" height="20" strokeWidth="2" />}
      </div>
      <div className="flex flex-col flex-grow">
        <span className="text-[11px] font-semibold text-hd-muted uppercase tracking-wider">{label}</span>
        <span className="text-[15px] font-semibold text-hd-muted mt-1">{placeholder}</span>
      </div>
    </div>
  )

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content="Hyperdocs is public documentation software for Product docs, API Docs and Help centers. Built to be easy to write, read and maintain" />

      <main className="flex-1 min-w-0 flex">
        <div className="flex-1 min-w-0 py-10 px-5 sm:px-12 max-w-[896px]">
          {page && page.type === 'page' ? (
            <>
              <ContentRenderer nodes={nodes} searchQuery={highlightQuery} />

              <div className="mt-16 pt-10 border-t border-hd-border-soft grid grid-cols-1 sm:grid-cols-2 gap-5">
                {prevPage
                  ? paginationLink(`/${prevPage.path.join('/')}`, 'Previous', prevPage.item.title, 'prev')
                  : paginationDisabled('Previous', 'First Page', 'prev')}
                {nextPage
                  ? paginationLink(`/${nextPage.path.join('/')}`, 'Next', nextPage.item.title, 'next')
                  : paginationDisabled('Next', 'Last Page', 'next')}
              </div>

              <div className="mt-12 pt-8 border-t border-hd-border-soft flex justify-center">
                <MadeWithHyperdocs />
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center py-32 text-center">
              <div>
                <IconPage className="mx-auto mb-4 opacity-20" width="48" height="48" stroke="#888" strokeWidth="1.5" />
                <p className="text-sm font-medium text-hd-muted">Page not found</p>
                <p className="text-xs mt-1 text-hd-muted-light">Select a page from the sidebar to get started.</p>
              </div>
            </div>
          )}
        </div>

        {headings.length > 0 && (
          <aside className="w-[192px] shrink-0 py-10 pr-6 hidden xl:block">
            <PageToc headings={headings} />
          </aside>
        )}
      </main>
    </>
  )
}
