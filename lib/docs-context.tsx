'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { apiGetDocsStructure, apiGetPublicDocsStructure, apiCreateItem, apiDeleteItem, apiRenameItem, apiMoveItem, apiUpdatePageContent } from '@/lib/api/docs'
import { useDocsChangesStore } from '@/lib/store/useDocsChangesStore'
import { PUBLIC_DOCS_KEY } from '@/lib/query-provider'

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export type NavItem = {
  id: string
  title: string
  slug: string
  type: 'page' | 'folder'
  children?: NavItem[]       // folders only
  content?: unknown[]        // pages only — Plate.js nodes
}

type DocsContextValue = {
  items: NavItem[]

  /* CRUD */
  createPage: (parentId: string | null, title: string) => { item: NavItem, req: Promise<any> }
  createFolder: (parentId: string | null, title: string) => { item: NavItem, req: Promise<any> }
  deleteItem: (id: string) => Promise<any>
  renameItem: (id: string, title: string) => Promise<any>
  updateContent: (id: string, content: unknown[]) => void
  moveItem: (draggedId: string, targetId: string, position: 'before' | 'after' | 'inside') => Promise<any>

  /* Helpers */
  findByPath: (segments: string[]) => NavItem | null
  findById: (id: string) => NavItem | null
  getPathSegments: (id: string) => string[]  // slugs from root → item

  /* Incoming changes */
  pendingChanges: IncomingChange[]
  acceptChange: (changeId: string) => void
  rejectChange: (changeId: string) => void
  dismissAllChanges: () => void

  /* Global saving state */
  saveStatus: 'idle' | 'saving' | 'saved'

  /* Loading state */
  isLoading: boolean
  reloadStructure: () => Promise<void>
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

function findInTree(items: NavItem[], id: string): NavItem | null {
  for (const item of items) {
    if (item.id === id) return item
    if (item.children) {
      const found = findInTree(item.children, id)
      if (found) return found
    }
  }
  return null
}

function findByPathInTree(items: NavItem[], segments: string[]): NavItem | null {
  if (segments.length === 0) return null
  const [head, ...rest] = segments
  const match = items.find((i) => i.slug === head)
  if (!match) return null
  if (rest.length === 0) return match
  if (match.children) return findByPathInTree(match.children, rest)
  return null
}

function getPathSegmentsInTree(items: NavItem[], targetId: string, prefix: string[] = []): string[] | null {
  for (const item of items) {
    const current = [...prefix, item.slug]
    if (item.id === targetId) return current
    if (item.children) {
      const found = getPathSegmentsInTree(item.children, targetId, current)
      if (found) return found
    }
  }
  return null
}

function moveItemInTree(
  items: NavItem[],
  draggedId: string,
  targetId: string,
  position: 'before' | 'after' | 'inside'
): NavItem[] {
  // Step 1: extract dragged item
  let dragged: NavItem | null = null
  function extract(list: NavItem[]): NavItem[] {
    return list
      .filter(i => { if (i.id === draggedId) { dragged = i; return false } return true })
      .map(i => ({ ...i, children: i.children ? extract(i.children) : undefined }))
  }
  const withoutDragged = extract(items)
  if (!dragged) return items

  // Step 2: insert at target position
  function insert(list: NavItem[]): NavItem[] {
    const result: NavItem[] = []
    for (const item of list) {
      if (item.id === targetId) {
        if (position === 'before') {
          result.push(dragged!, item)
        } else if (position === 'after') {
          result.push(item, dragged!)
        } else if (position === 'inside' && item.type === 'folder') {
          result.push({ ...item, children: [...(item.children ?? []), dragged!] })
        } else {
          result.push(item)
        }
      } else {
        result.push({ ...item, children: item.children ? insert(item.children) : undefined })
      }
    }
    return result
  }
  return insert(withoutDragged)
}

function removeFromTree(items: NavItem[], id: string): NavItem[] {
  return items
    .filter((i) => i.id !== id)
    .map((i) => ({
      ...i,
      children: i.children ? removeFromTree(i.children, id) : undefined,
    }))
}

function addChildToParent(items: NavItem[], parentId: string, newItem: NavItem): NavItem[] {
  return items.map((i) => {
    if (i.id === parentId) {
      return { ...i, children: [...(i.children ?? []), newItem] }
    }
    if (i.children) {
      return { ...i, children: addChildToParent(i.children, parentId, newItem) }
    }
    return i
  })
}

function updateItemInTree(
  items: NavItem[],
  id: string,
  updater: (item: NavItem) => NavItem
): NavItem[] {
  return items.map((i) => {
    if (i.id === id) return updater(i)
    if (i.children) return { ...i, children: updateItemInTree(i.children, id, updater) }
    return i
  })
}

/* ------------------------------------------------------------------ */
/*  Initial data                                                        */
/* ------------------------------------------------------------------ */

const defaultContent = (title: string): unknown[] => [
  { type: 'h1', children: [{ text: title }] },
  {
    type: 'p',
    children: [
      { text: `Welcome to the ${title} section. This content was auto-generated by Hyperdocs and is ready for you to edit.` },
    ],
  },
  { type: 'p', children: [{ text: '' }] },
]

export const INITIAL_ITEMS: NavItem[] = [
  {
    id: 'f-getting-started',
    title: 'Getting Started',
    slug: 'getting-started',
    type: 'folder',
    children: [
      {
        id: 'p-introduction',
        title: 'Introduction',
        slug: 'introduction',
        type: 'page',
        content: [
          { type: 'h1', children: [{ text: 'Introduction' }] },
          { type: 'p', children: [{ text: 'Hyperdocs is an AI-powered documentation platform that automatically generates, syncs, and publishes beautiful docs from your codebase. Whether you are a solo developer or a team of hundreds, Hyperdocs keeps your documentation always up to date — without any manual effort.' }] },
          { type: 'p', children: [{ text: 'Traditional documentation workflows break down quickly. Docs live in a separate repo, get out of sync with the code, and nobody has time to update them. Hyperdocs solves this by treating documentation as a first-class output of your development process.' }] },

          { type: 'h2', children: [{ text: 'Key Features' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'Auto-generate docs from source code, comments, and OpenAPI specs using AI' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'Real-time sync with GitHub, GitLab, and Bitbucket on every push' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'Rich block editor — headings, code, tables, callouts, images' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'Versioned docs with full history and diff viewer' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'Custom domains with automatic SSL provisioning' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'Full-text search powered by a dedicated indexing engine' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'Access controls — public, private, or password-protected docs' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'REST API and SDKs for JavaScript, Python, and Go' }] },

          { type: 'h2', children: [{ text: 'How It Works' }] },
          { type: 'p', children: [{ text: 'Hyperdocs connects directly to your repository via a lightweight webhook. On every push to your configured branch, the sync engine diffs only the changed files and updates the affected doc pages. No full rebuilds — even large monorepos stay fast.' }] },
          { type: 'p', children: [{ text: 'The AI layer reads your source code, inline comments, JSDoc/TSDoc annotations, and any existing markdown files. It structures this into a navigable doc site with sections, headings, and code examples already in place. You can then edit, rearrange, or extend any part of the output.' }] },

          { type: 'h2', children: [{ text: 'Architecture Overview' }] },
          { type: 'p', children: [{ text: 'At a high level, Hyperdocs consists of four layers:' }] },
          { type: 'p', indent: 1, listStyleType: 'decimal', children: [{ text: 'Ingestion — your repo is cloned and parsed on each sync event' }] },
          { type: 'p', indent: 1, listStyleType: 'decimal', children: [{ text: 'AI Generation — changed files are sent to the generation pipeline which produces structured blocks' }] },
          { type: 'p', indent: 1, listStyleType: 'decimal', children: [{ text: 'Storage — blocks are stored in a versioned content graph, not raw markdown' }] },
          { type: 'p', indent: 1, listStyleType: 'decimal', children: [{ text: 'Delivery — the rendered docs site is served via a global CDN with sub-50ms TTFB' }] },

          { type: 'h2', children: [{ text: 'Supported Stacks' }] },
          { type: 'p', children: [{ text: 'Hyperdocs parses documentation from a wide range of languages and frameworks out of the box:' }] },
          {
            type: 'table', children: [
              { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'Language' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Comment Style' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Extras' }] }] }] },
              { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'TypeScript / JavaScript' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'JSDoc, TSDoc' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'OpenAPI v3, GraphQL SDL' }] }] }] },
              { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'Python' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Docstrings (Google, NumPy)' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'FastAPI auto-schema' }] }] }] },
              { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'Go' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'GoDoc comments' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'go doc output' }] }] }] },
              { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'Rust' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'rustdoc (///)' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'cargo doc output' }] }] }] },
              { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'Java / Kotlin' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Javadoc, KDoc' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Spring annotations' }] }] }] },
            ]
          },

          { type: 'h2', children: [{ text: 'Quick Example' }] },
          { type: 'p', children: [{ text: 'Here is all it takes to publish your first docs site:' }] },
          {
            type: 'code_block', lang: 'bash', children: [
              { type: 'code_line', children: [{ text: '# 1. Install the CLI' }] },
              { type: 'code_line', children: [{ text: 'npm install -g @hyperdocs/cli' }] },
              { type: 'code_line', children: [{ text: '' }] },
              { type: 'code_line', children: [{ text: '# 2. Authenticate' }] },
              { type: 'code_line', children: [{ text: 'hyperdocs login' }] },
              { type: 'code_line', children: [{ text: '' }] },
              { type: 'code_line', children: [{ text: '# 3. Initialise a project in your repo root' }] },
              { type: 'code_line', children: [{ text: 'hyperdocs init' }] },
              { type: 'code_line', children: [{ text: '' }] },
              { type: 'code_line', children: [{ text: '# 4. Generate docs from source' }] },
              { type: 'code_line', children: [{ text: 'hyperdocs generate' }] },
              { type: 'code_line', children: [{ text: '' }] },
              { type: 'code_line', children: [{ text: '# 5. Publish' }] },
              { type: 'code_line', children: [{ text: 'hyperdocs deploy' }] },
            ]
          },

          { type: 'h2', children: [{ text: 'Pricing' }] },
          { type: 'p', children: [{ text: 'Hyperdocs is free for open-source projects and individual developers. Paid plans unlock private docs, custom domains, team access controls, and priority support.' }] },
          {
            type: 'table', children: [
              { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'Plan' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Price' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Projects' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Team Members' }] }] }] },
              { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'Free' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: '$0 / mo' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: '3' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: '1' }] }] }] },
              { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'Pro' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: '$19 / mo' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Unlimited' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: '5' }] }] }] },
              { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'Team' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: '$49 / mo' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Unlimited' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: '25' }] }] }] },
              { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'Enterprise' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Custom' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Unlimited' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Unlimited' }] }] }] },
            ]
          },

          { type: 'h2', children: [{ text: 'Security' }] },
          { type: 'p', children: [{ text: 'All data is encrypted at rest (AES-256) and in transit (TLS 1.3). API keys are hashed with bcrypt and never stored in plaintext. Hyperdocs is SOC 2 Type II certified and GDPR compliant.' }] },
          { type: 'blockquote', children: [{ type: 'p', children: [{ text: 'We never store your source code beyond the time needed to generate documentation. Parsed ASTs are discarded after each sync.' }] }] },

          { type: 'h2', children: [{ text: 'Callout Examples' }] },
          { type: 'p', children: [{ text: 'Callouts help highlight important information at a glance.' }] },
          { type: 'callout', variant: 'check', children: [{ text: 'Your API key has been verified and your account is ready to use.' }] },
          { type: 'callout', variant: 'info', children: [{ text: 'Hyperdocs supports OpenAPI v3, GraphQL SDL, and AsyncAPI out of the box.' }] },
          { type: 'callout', variant: 'note', children: [{ text: 'Rate limits are applied per API key, not per IP address.' }] },
          { type: 'callout', variant: 'tip', children: [{ text: 'Use the hyperdocs generate --watch flag during development to auto-regenerate docs on file changes.' }] },
          { type: 'callout', variant: 'warning', children: [{ text: 'Rotating your API key will immediately invalidate the old key. Update all integrations before rotating.' }] },
          { type: 'callout', variant: 'danger', children: [{ text: 'Deleting a project is permanent and cannot be undone. All pages, history, and settings will be lost.' }] },

          { type: 'h2', children: [{ text: 'Getting Help' }] },
          { type: 'p', children: [{ text: 'We are here to help. Choose the channel that works best for you:' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'GitHub Issues — bug reports and feature requests' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'Discord — real-time community support' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'Email support@hyperdocs.io — Pro and Enterprise customers' }] },
          { type: 'blockquote', children: [{ type: 'p', children: [{ text: 'If you run into issues, open a GitHub issue or reach out on Discord. We respond within 24 hours.' }] }] },
        ],
      },
      {
        id: 'p-quickstart',
        title: 'Quickstart',
        slug: 'quickstart',
        type: 'page',
        content: [
          { type: 'h1', children: [{ text: 'Quickstart' }] },
          { type: 'p', children: [{ text: 'Get your first documentation site live in under 5 minutes.' }] },
          { type: 'h2', children: [{ text: 'Step 1 — Connect your repository' }] },
          { type: 'p', children: [{ text: 'Sign in with GitHub and select the repository you want to document.' }] },
          { type: 'h2', children: [{ text: 'Step 2 — Generate docs' }] },
          { type: 'p', children: [{ text: 'Click "Generate" and our AI will analyse your code and produce structured documentation automatically.' }] },
          { type: 'h2', children: [{ text: 'Step 3 — Publish' }] },
          { type: 'p', children: [{ text: 'Hit Publish. Your docs are live instantly on your Hyperdocs subdomain.' }] },
          { type: 'code_block', lang: 'bash', children: [{ type: 'code_line', children: [{ text: '# Install the CLI (optional)' }] }, { type: 'code_line', children: [{ text: 'npm install -g @hyperdocs/cli' }] }, { type: 'code_line', children: [{ text: 'hyperdocs deploy' }] }] },
        ],
      },
      {
        id: 'p-installation',
        title: 'CLI Installation',
        slug: 'installation',
        type: 'page',
        content: [
          { type: 'h1', children: [{ text: 'CLI Installation' }] },
          { type: 'p', children: [{ text: 'The Hyperdocs CLI is the easiest way to manage, sync, and deploy your documentation sites directly from your local terminal or within CI/CD pipelines.' }] },
          { type: 'callout', variant: 'info', children: [{ text: 'Before installing the CLI, ensure you have Node.js version 18.0.0 or higher installed on your machine.' }] },
          { type: 'h2', children: [{ text: 'How to Install' }] },
          { type: 'p', children: [{ text: 'You can install the CLI globally on your system using your preferred package manager:' }] },
          {
            type: 'table', children: [
              { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'Package Manager' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Installation Command' }] }] }] },
              { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'npm' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'npm install -g @hyperdocs/cli' }] }] }] },
              { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'yarn' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'yarn global add @hyperdocs/cli' }] }] }] },
              { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'pnpm' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'pnpm add -g @hyperdocs/cli' }] }] }] },
            ]
          },
          { type: 'h2', children: [{ text: 'Verification' }] },
          { type: 'p', children: [{ text: 'To verify that the installation was successful, run the following command to check the installed version:' }] },
          {
            type: 'code_block', lang: 'bash', children: [
              { type: 'code_line', children: [{ text: 'hyperdocs --version' }] },
            ]
          },
          { type: 'callout', variant: 'tip', children: [{ text: 'You can run "hyperdocs --help" or append "--help" to any command to see detailed usage information.' }] },
        ],
      },
      {
        id: 'p-concepts',
        title: 'Core Concepts',
        slug: 'core-concepts',
        type: 'page',
        content: [
          { type: 'h1', children: [{ text: 'Core Concepts' }] },
          { type: 'p', children: [{ text: 'Understanding a few key ideas will help you get the most out of Hyperdocs.' }] },
          { type: 'h2', children: [{ text: 'Projects' }] },
          { type: 'p', children: [{ text: 'A project represents one documentation site. Each project maps to a single repository and has its own custom domain, navigation structure, and access controls.' }] },
          { type: 'h2', children: [{ text: 'Versions' }] },
          { type: 'p', children: [{ text: 'Every time you publish, Hyperdocs creates a versioned snapshot. You can expose multiple versions simultaneously and let readers switch between them.' }] },
          { type: 'h2', children: [{ text: 'Blocks' }] },
          { type: 'p', children: [{ text: 'Content is stored as structured blocks (headings, paragraphs, code, tables, callouts) rather than raw markdown. This enables rich editing, search indexing, and AI re-generation without loss of formatting.' }] },
          { type: 'h2', children: [{ text: 'Sync Engine' }] },
          { type: 'p', children: [{ text: 'The sync engine listens for webhook events from your Git provider. On each push, it diffs only the changed files and updates the affected doc pages, keeping build times fast even in large repos.' }] },
        ],
      },
    ],
  },
  {
    id: 'f-api-reference',
    title: 'API Reference',
    slug: 'api-reference',
    type: 'folder',
    children: [
      {
        id: 'p-authentication',
        title: 'Authentication',
        slug: 'authentication',
        type: 'page',
        content: [
          { type: 'h1', children: [{ text: 'Authentication' }] },
          { type: 'p', children: [{ text: 'All API requests require a Bearer token in the Authorization header.' }] },
          { type: 'code_block', lang: 'bash', children: [{ type: 'code_line', children: [{ text: 'curl -H "Authorization: Bearer YOUR_API_KEY" \\' }] }, { type: 'code_line', children: [{ text: '     https://api.hyperdocs.io/v1/projects' }] }] },
          { type: 'h2', children: [{ text: 'Generating an API Key' }] },
          { type: 'p', indent: 1, listStyleType: 'decimal', children: [{ text: 'Log in to your Hyperdocs dashboard' }] },
          { type: 'p', indent: 1, listStyleType: 'decimal', children: [{ text: 'Navigate to Settings → API Keys' }] },
          { type: 'p', indent: 1, listStyleType: 'decimal', children: [{ text: 'Click "Generate New Key"' }] },
          { type: 'p', indent: 1, listStyleType: 'decimal', children: [{ text: 'Copy and store the key securely — it will only be shown once' }] },
          { type: 'h2', children: [{ text: 'Rate Limits' }] },
          { type: 'table', children: [{ type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'Plan' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Requests / min' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Requests / day' }] }] }] }, { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'Free' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: '60' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: '1,000' }] }] }] }, { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'Pro' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: '300' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: '50,000' }] }] }] }, { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'Enterprise' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Unlimited' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Unlimited' }] }] }] }] },
        ],
      },
      {
        id: 'p-errors',
        title: 'Error Codes',
        slug: 'error-codes',
        type: 'page',
        content: [
          { type: 'h1', children: [{ text: 'Error Codes' }] },
          { type: 'p', children: [{ text: 'The Hyperdocs API uses conventional HTTP response codes. Codes in the 2xx range indicate success, 4xx indicate a client error, and 5xx indicate a server error.' }] },
          { type: 'h2', children: [{ text: 'Error Response Shape' }] },
          { type: 'code_block', lang: 'json', children: [{ type: 'code_line', children: [{ text: '{' }] }, { type: 'code_line', children: [{ text: '  "error": {' }] }, { type: 'code_line', children: [{ text: '    "code": "not_found",' }] }, { type: 'code_line', children: [{ text: '    "message": "The requested resource was not found.",' }] }, { type: 'code_line', children: [{ text: '    "status": 404' }] }, { type: 'code_line', children: [{ text: '  }' }] }, { type: 'code_line', children: [{ text: '}' }] }] },
          { type: 'h2', children: [{ text: 'Common Codes' }] },
          { type: 'table', children: [{ type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'Code' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'HTTP Status' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Description' }] }] }] }, { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'unauthorized' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: '401' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Missing or invalid API key' }] }] }] }, { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'forbidden' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: '403' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Insufficient permissions' }] }] }] }, { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'not_found' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: '404' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Resource does not exist' }] }] }] }, { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'rate_limited' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: '429' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Too many requests' }] }] }] }] },
        ],
      },
      {
        id: 'f-endpoints',
        title: 'Endpoints',
        slug: 'endpoints',
        type: 'folder',
        children: [
          {
            id: 'p-users',
            title: 'Users',
            slug: 'users',
            type: 'page',
            content: [
              { type: 'h1', children: [{ text: 'Users API' }] },
              { type: 'p', children: [{ text: 'Manage users in your organization.' }] },
              { type: 'h2', children: [{ text: 'List Users' }] },
              { type: 'p', children: [{ text: 'Returns all users in the organization.' }] },
              { type: 'code_block', lang: 'http', children: [{ type: 'code_line', children: [{ text: 'GET /v1/users' }] }] },
              { type: 'h2', children: [{ text: 'Create User' }] },
              { type: 'code_block', lang: 'http', children: [{ type: 'code_line', children: [{ text: 'POST /v1/users' }] }] },
            ],
          },
          {
            id: 'p-projects',
            title: 'Projects',
            slug: 'projects',
            type: 'page',
            content: [
              { type: 'h1', children: [{ text: 'Projects API' }] },
              { type: 'p', children: [{ text: 'Create, update, and manage documentation projects.' }] },
              { type: 'h2', children: [{ text: 'List Projects' }] },
              { type: 'code_block', lang: 'http', children: [{ type: 'code_line', children: [{ text: 'GET /v1/projects' }] }] },
              { type: 'h2', children: [{ text: 'Create Project' }] },
              { type: 'code_block', lang: 'http', children: [{ type: 'code_line', children: [{ text: 'POST /v1/projects' }] }] },
              { type: 'code_block', lang: 'json', children: [{ type: 'code_line', children: [{ text: '{' }] }, { type: 'code_line', children: [{ text: '  "name": "My Project",' }] }, { type: 'code_line', children: [{ text: '  "repo": "github.com/acme/backend",' }] }, { type: 'code_line', children: [{ text: '  "branch": "main"' }] }, { type: 'code_line', children: [{ text: '}' }] }] },
            ],
          },
          {
            id: 'p-webhooks',
            title: 'Webhooks',
            slug: 'webhooks',
            type: 'page',
            content: [
              { type: 'h1', children: [{ text: 'Webhooks' }] },
              { type: 'p', children: [{ text: 'Receive real-time notifications when documentation events occur.' }] },
              { type: 'h2', children: [{ text: 'Available Events' }] },
              { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'page.published — a page was published' }] },
              { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'page.updated — a page was edited' }] },
              { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'project.synced — a repo sync completed' }] },
              { type: 'h2', children: [{ text: 'Register a Webhook' }] },
              { type: 'code_block', lang: 'http', children: [{ type: 'code_line', children: [{ text: 'POST /v1/webhooks' }] }] },
              { type: 'code_block', lang: 'json', children: [{ type: 'code_line', children: [{ text: '{' }] }, { type: 'code_line', children: [{ text: '  "url": "https://yourapp.com/webhooks/hyperdocs",' }] }, { type: 'code_line', children: [{ text: '  "events": ["page.published", "project.synced"]' }] }, { type: 'code_line', children: [{ text: '}' }] }] },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'f-guides',
    title: 'Guides',
    slug: 'guides',
    type: 'folder',
    children: [
      {
        id: 'p-deployment',
        title: 'Deployment',
        slug: 'deployment',
        type: 'page',
        content: [
          { type: 'h1', children: [{ text: 'Deployment' }] },
          { type: 'p', children: [{ text: 'Deploy your documentation site using the Hyperdocs CLI or connect your CI/CD pipeline for automatic publishing on every push.' }] },
          { type: 'h2', children: [{ text: 'Using the CLI' }] },
          { type: 'code_block', lang: 'bash', children: [{ type: 'code_line', children: [{ text: 'npx hyperdocs deploy --env production' }] }] },
          { type: 'h2', children: [{ text: 'GitHub Actions' }] },
          { type: 'code_block', lang: 'yaml', children: [{ type: 'code_line', children: [{ text: 'name: Deploy Docs' }] }, { type: 'code_line', children: [{ text: 'on:' }] }, { type: 'code_line', children: [{ text: '  push:' }] }, { type: 'code_line', children: [{ text: '    branches: [main]' }] }, { type: 'code_line', children: [{ text: 'jobs:' }] }, { type: 'code_line', children: [{ text: '  deploy:' }] }, { type: 'code_line', children: [{ text: '    runs-on: ubuntu-latest' }] }, { type: 'code_line', children: [{ text: '    steps:' }] }, { type: 'code_line', children: [{ text: '      - uses: hyperdocs/deploy-action@v2' }] }, { type: 'code_line', children: [{ text: '        with:' }] }, { type: 'code_line', children: [{ text: '          api-key: ${{ secrets.HYPERDOCS_API_KEY }}' }] }] },
          { type: 'h2', children: [{ text: 'Environment Variables' }] },
          { type: 'table', children: [{ type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'Variable' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Required' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Description' }] }] }] }, { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'HYPERDOCS_API_KEY' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Yes' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Your API key' }] }] }] }, { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'HYPERDOCS_PROJECT_ID' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Yes' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Your project ID' }] }] }] }] },
        ],
      },
      {
        id: 'p-configuration',
        title: 'Configuration',
        slug: 'configuration',
        type: 'page',
        content: [
          { type: 'h1', children: [{ text: 'Configuration' }] },
          { type: 'p', children: [{ text: 'Configure Hyperdocs using a hyperdocs.config.ts file in the root of your repository.' }] },
          { type: 'code_block', lang: 'typescript', children: [{ type: 'code_line', children: [{ text: "import { defineConfig } from '@hyperdocs/sdk'" }] }, { type: 'code_line', children: [{ text: '' }] }, { type: 'code_line', children: [{ text: 'export default defineConfig({' }] }, { type: 'code_line', children: [{ text: "  name: 'My API Docs'," }] }, { type: 'code_line', children: [{ text: "  logo: '/logo.svg'," }] }, { type: 'code_line', children: [{ text: "  primaryColor: '#f26522'," }] }, { type: 'code_line', children: [{ text: "  domain: 'docs.myapp.com'," }] }, { type: 'code_line', children: [{ text: '  nav: [' }] }, { type: 'code_line', children: [{ text: "    { label: 'Docs', href: '/getting-started' }," }] }, { type: 'code_line', children: [{ text: "    { label: 'API', href: '/api-reference' }," }] }, { type: 'code_line', children: [{ text: '  ],' }] }, { type: 'code_line', children: [{ text: '})' }] }] },
          { type: 'h2', children: [{ text: 'Config Options' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'name — the display name of your docs site' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'logo — path to your logo image' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'primaryColor — brand hex color' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'domain — custom domain for your docs' }] },
        ],
      },
      {
        id: 'p-custom-domain',
        title: 'Custom Domain',
        slug: 'custom-domain',
        type: 'page',
        content: [
          { type: 'h1', children: [{ text: 'Custom Domain' }] },
          { type: 'p', children: [{ text: 'Point your own domain to your Hyperdocs site in three steps.' }] },
          { type: 'h2', children: [{ text: 'Step 1 — Add the domain' }] },
          { type: 'p', children: [{ text: 'Go to your project Settings → Domains and enter your custom domain.' }] },
          { type: 'h2', children: [{ text: 'Step 2 — Configure DNS' }] },
          { type: 'p', children: [{ text: 'Add a CNAME record pointing to your Hyperdocs subdomain.' }] },
          { type: 'table', children: [{ type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'Type' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Name' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Value' }] }] }] }, { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'CNAME' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'docs' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'your-project.hyperdocs.io' }] }] }] }] },
          { type: 'h2', children: [{ text: 'Step 3 — SSL' }] },
          { type: 'p', children: [{ text: 'SSL is provisioned automatically via Let\'s Encrypt within a few minutes of DNS propagation.' }] },
        ],
      },
      {
        id: 'p-search',
        title: 'Search',
        slug: 'search',
        type: 'page',
        content: [
          { type: 'h1', children: [{ text: 'Search' }] },
          { type: 'p', children: [{ text: 'Hyperdocs provides full-text search across all pages. No additional configuration is required — search is enabled by default for all projects.' }] },
          { type: 'h2', children: [{ text: 'How It Works' }] },
          { type: 'p', children: [{ text: 'Content is indexed automatically after each publish. The search index is updated incrementally — only changed pages are re-indexed, keeping publish times fast.' }] },
          { type: 'h2', children: [{ text: 'Keyboard Shortcut' }] },
          { type: 'p', children: [{ text: 'Press ⌘K (Mac) or Ctrl+K (Windows) anywhere on your docs site to open the search modal.' }] },
        ],
      },
    ],
  },
  {
    id: 'f-tutorials',
    title: 'Tutorials',
    slug: 'tutorials',
    type: 'folder',
    children: [
      {
        id: 'p-tut-first-site',
        title: 'Build Your First Docs Site',
        slug: 'first-docs-site',
        type: 'page',
        content: [
          { type: 'h1', children: [{ text: 'Build Your First Docs Site' }] },
          { type: 'p', children: [{ text: 'This tutorial walks you through creating a complete documentation site from scratch using Hyperdocs, from connecting your repository to publishing a live URL.' }] },
          { type: 'h2', children: [{ text: 'Prerequisites' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'A GitHub account with at least one repository' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'Node.js 18+ installed locally' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'A free Hyperdocs account' }] },
          { type: 'h2', children: [{ text: 'Step 1 — Create a Project' }] },
          { type: 'p', children: [{ text: 'Log in to your Hyperdocs dashboard and click New Project. Enter a name and select your repository from the GitHub integration list.' }] },
          { type: 'h2', children: [{ text: 'Step 2 — Run the Generator' }] },
          { type: 'p', children: [{ text: 'Once your project is linked, click Generate. The AI pipeline will scan your repository and produce an initial doc structure within a few minutes.' }] },
          { type: 'h2', children: [{ text: 'Step 3 — Edit and Organise' }] },
          { type: 'p', children: [{ text: 'Use the editor to review the generated pages. Drag and drop items in the sidebar to reorganise, and click any page to edit its content.' }] },
          { type: 'h2', children: [{ text: 'Step 4 — Publish' }] },
          { type: 'code_block', lang: 'bash', children: [{ type: 'code_line', children: [{ text: 'hyperdocs deploy --env production' }] }] },
        ],
      },
      {
        id: 'p-tut-cicd',
        title: 'CI/CD Integration',
        slug: 'cicd-integration',
        type: 'page',
        content: [
          { type: 'h1', children: [{ text: 'CI/CD Integration' }] },
          { type: 'p', children: [{ text: 'Automate your documentation deployment so docs are always published on every merge to main.' }] },
          { type: 'h2', children: [{ text: 'GitHub Actions' }] },
          { type: 'code_block', lang: 'yaml', children: [{ type: 'code_line', children: [{ text: 'name: Publish Docs' }] }, { type: 'code_line', children: [{ text: 'on: { push: { branches: [main] } }' }] }, { type: 'code_line', children: [{ text: 'jobs:' }] }, { type: 'code_line', children: [{ text: '  publish:' }] }, { type: 'code_line', children: [{ text: '    runs-on: ubuntu-latest' }] }, { type: 'code_line', children: [{ text: '    steps:' }] }, { type: 'code_line', children: [{ text: '      - uses: actions/checkout@v4' }] }, { type: 'code_line', children: [{ text: '      - uses: hyperdocs/deploy-action@v2' }] }, { type: 'code_line', children: [{ text: '        with: { api-key: "${{ secrets.HYPERDOCS_KEY }}" }' }] }] },
          { type: 'h2', children: [{ text: 'GitLab CI' }] },
          { type: 'code_block', lang: 'yaml', children: [{ type: 'code_line', children: [{ text: 'deploy-docs:' }] }, { type: 'code_line', children: [{ text: '  stage: deploy' }] }, { type: 'code_line', children: [{ text: '  only: [main]' }] }, { type: 'code_line', children: [{ text: '  script:' }] }, { type: 'code_line', children: [{ text: '    - npm install -g @hyperdocs/cli' }] }, { type: 'code_line', children: [{ text: '    - hyperdocs deploy' }] }] },
        ],
      },
      {
        id: 'p-tut-team',
        title: 'Team Workflow',
        slug: 'team-workflow',
        type: 'page',
        content: [
          { type: 'h1', children: [{ text: 'Team Workflow' }] },
          { type: 'p', children: [{ text: 'Hyperdocs is built for teams. Multiple people can edit docs simultaneously, with changes synced in real time and a full audit trail.' }] },
          { type: 'h2', children: [{ text: 'Inviting Team Members' }] },
          { type: 'p', children: [{ text: 'Go to Project Settings → Team and invite members by email. You can assign one of three roles:' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'Viewer — read-only access to all pages' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'Editor — can create and edit pages' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'Admin — full access including publishing and settings' }] },
          { type: 'h2', children: [{ text: 'Review & Approval' }] },
          { type: 'p', children: [{ text: 'Enable the review flow in Settings → Publishing. Editors submit pages for review, and admins approve before publication.' }] },
        ],
      },
      {
        id: 'p-tut-migrate',
        title: 'Migrating from GitBook',
        slug: 'migrate-from-gitbook',
        type: 'page',
        content: [
          { type: 'h1', children: [{ text: 'Migrating from GitBook' }] },
          { type: 'p', children: [{ text: 'Moving from GitBook to Hyperdocs takes about 15 minutes using the migration CLI.' }] },
          { type: 'h2', children: [{ text: 'Export from GitBook' }] },
          { type: 'p', children: [{ text: 'In GitBook, go to Integrations → Export and download your content as a ZIP archive.' }] },
          { type: 'h2', children: [{ text: 'Import to Hyperdocs' }] },
          { type: 'code_block', lang: 'bash', children: [{ type: 'code_line', children: [{ text: 'npx @hyperdocs/migrate --from gitbook --file export.zip --project proj_abc' }] }] },
          { type: 'h2', children: [{ text: 'What Gets Migrated' }] },
          { type: 'table', children: [{ type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'Content Type' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Migrated?' }] }] }] }, { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'Pages and headings' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Yes' }] }] }] }, { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'Code blocks' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Yes' }] }] }] }, { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'Images' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Yes (re-uploaded)' }] }] }] }, { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'Comments' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'No' }] }] }] }] },
        ],
      },
      {
        id: 'p-tut-openapi',
        title: 'OpenAPI Integration',
        slug: 'openapi-integration',
        type: 'page',
        content: [
          { type: 'h1', children: [{ text: 'OpenAPI Integration' }] },
          { type: 'p', children: [{ text: 'Point Hyperdocs at your OpenAPI spec and it will generate a complete, interactive API reference automatically.' }] },
          { type: 'h2', children: [{ text: 'Linking Your Spec' }] },
          { type: 'p', children: [{ text: 'Add the openapi key to your config file:' }] },
          { type: 'code_block', lang: 'typescript', children: [{ type: 'code_line', children: [{ text: 'export default defineConfig({' }] }, { type: 'code_line', children: [{ text: "  openapi: { src: './openapi.yaml', path: '/api-reference' }," }] }, { type: 'code_line', children: [{ text: '})' }] }] },
          { type: 'h2', children: [{ text: 'Supported Formats' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'OpenAPI 3.0 and 3.1 (YAML or JSON)' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'Swagger 2.0 (auto-upgraded)' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'Postman Collection v2.1 (converted on import)' }] },
        ],
      },
    ],
  },
  {
    id: 'f-reference',
    title: 'Reference',
    slug: 'reference',
    type: 'folder',
    children: [
      {
        id: 'p-ref-config',
        title: 'Config Reference',
        slug: 'config-reference',
        type: 'page',
        content: [
          { type: 'h1', children: [{ text: 'Config Reference' }] },
          { type: 'p', children: [{ text: 'Full reference for every option in hyperdocs.config.ts.' }] },
          { type: 'h2', children: [{ text: 'Top-Level Options' }] },
          { type: 'table', children: [{ type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'Option' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Type' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Default' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Description' }] }] }] }, { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'name' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'string' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: '—' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Display name of your docs site' }] }] }] }, { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'primaryColor' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'string' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: '#f26522' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Brand hex color' }] }] }] }, { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'domain' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'string' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'auto' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Custom domain' }] }] }] }, { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'private' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'boolean' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'false' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Password-protect the site' }] }] }] }] },
        ],
      },
      {
        id: 'p-ref-cli',
        title: 'CLI Reference',
        slug: 'cli-reference',
        type: 'page',
        content: [
          { type: 'h1', children: [{ text: 'CLI Reference' }] },
          { type: 'p', children: [{ text: 'Complete reference for all hyperdocs CLI commands.' }] },
          { type: 'h2', children: [{ text: 'hyperdocs init' }] },
          { type: 'p', children: [{ text: 'Initialises a new Hyperdocs project in the current directory, creating hyperdocs.config.ts.' }] },
          { type: 'code_block', lang: 'bash', children: [{ type: 'code_line', children: [{ text: 'hyperdocs init [--name <name>] [--template <template>]' }] }] },
          { type: 'h2', children: [{ text: 'hyperdocs generate' }] },
          { type: 'p', children: [{ text: 'Runs the AI generation pipeline against your source code and writes output to the local project store.' }] },
          { type: 'code_block', lang: 'bash', children: [{ type: 'code_line', children: [{ text: 'hyperdocs generate [--watch] [--only <glob>]' }] }] },
          { type: 'h2', children: [{ text: 'hyperdocs deploy' }] },
          { type: 'p', children: [{ text: 'Publishes your local project to the Hyperdocs CDN.' }] },
          { type: 'code_block', lang: 'bash', children: [{ type: 'code_line', children: [{ text: 'hyperdocs deploy [--env <env>] [--dry-run]' }] }] },
          { type: 'h2', children: [{ text: 'hyperdocs dev' }] },
          { type: 'p', children: [{ text: 'Starts a local preview server at http://localhost:4000.' }] },
          { type: 'code_block', lang: 'bash', children: [{ type: 'code_line', children: [{ text: 'hyperdocs dev [--port <port>]' }] }] },
        ],
      },
      {
        id: 'p-ref-env',
        title: 'Environment Variables',
        slug: 'environment-variables',
        type: 'page',
        content: [
          { type: 'h1', children: [{ text: 'Environment Variables' }] },
          { type: 'p', children: [{ text: 'All environment variables recognised by the Hyperdocs CLI and SDK.' }] },
          { type: 'table', children: [{ type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'Variable' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Required' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Description' }] }] }] }, { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'HYPERDOCS_API_KEY' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Yes' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Your API key from the dashboard' }] }] }] }, { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'HYPERDOCS_PROJECT_ID' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Yes' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Your project identifier' }] }] }] }, { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'HYPERDOCS_ENV' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'No' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Deployment target (default: production)' }] }] }] }, { type: 'tr', children: [{ type: 'td', children: [{ type: 'p', children: [{ text: 'HYPERDOCS_DEBUG' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'No' }] }] }, { type: 'td', children: [{ type: 'p', children: [{ text: 'Enable verbose logging (1 or true)' }] }] }] }] },
        ],
      },
      {
        id: 'p-ref-blocks',
        title: 'Block Types',
        slug: 'block-types',
        type: 'page',
        content: [
          { type: 'h1', children: [{ text: 'Block Types' }] },
          { type: 'p', children: [{ text: 'Hyperdocs content is composed of blocks. Each block type has its own rendering rules and editor behaviour.' }] },
          { type: 'h2', children: [{ text: 'Text Blocks' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'Paragraph — plain text, supports inline bold/italic/code' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'Heading 1 / 2 / 3 — section headings, auto-linked for TOC' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'Blockquote — styled callout for notes and tips' }] },
          { type: 'h2', children: [{ text: 'Code Blocks' }] },
          { type: 'p', children: [{ text: 'Code blocks support 40+ languages with syntax highlighting. Specify the language after the opening fence.' }] },
          { type: 'code_block', lang: 'typescript', children: [{ type: 'code_line', children: [{ text: 'const greet = (name: string) => `Hello, ${name}!`' }] }] },
          { type: 'h2', children: [{ text: 'Structural Blocks' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'Table — multi-column data with header row' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'Ordered list — numbered steps' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'Unordered list — bullet points' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'Image — with alt text and optional caption' }] },
        ],
      },
    ],
  },
  {
    id: 'f-sdks',
    title: 'SDKs & Libraries',
    slug: 'sdks',
    type: 'folder',
    children: [
      {
        id: 'p-sdk-js',
        title: 'JavaScript / TypeScript',
        slug: 'javascript',
        type: 'page',
        content: [
          { type: 'h1', children: [{ text: 'JavaScript / TypeScript SDK' }] },
          { type: 'p', children: [{ text: 'The official Hyperdocs JS SDK works in Node.js and modern browsers.' }] },
          { type: 'code_block', lang: 'bash', children: [{ type: 'code_line', children: [{ text: 'npm install @hyperdocs/sdk' }] }] },
          { type: 'h2', children: [{ text: 'Basic Usage' }] },
          { type: 'code_block', lang: 'typescript', children: [{ type: 'code_line', children: [{ text: "import { Hyperdocs } from '@hyperdocs/sdk'" }] }, { type: 'code_line', children: [{ text: '' }] }, { type: 'code_line', children: [{ text: 'const hd = new Hyperdocs({ apiKey: process.env.HYPERDOCS_KEY })' }] }, { type: 'code_line', children: [{ text: 'const pages = await hd.pages.list({ projectId: "proj_abc" })' }] }] },
        ],
      },
      {
        id: 'p-sdk-python',
        title: 'Python',
        slug: 'python',
        type: 'page',
        content: [
          { type: 'h1', children: [{ text: 'Python SDK' }] },
          { type: 'p', children: [{ text: 'The official Hyperdocs Python SDK supports Python 3.9 and above.' }] },
          { type: 'code_block', lang: 'bash', children: [{ type: 'code_line', children: [{ text: 'pip install hyperdocs' }] }] },
          { type: 'h2', children: [{ text: 'Basic Usage' }] },
          { type: 'code_block', lang: 'python', children: [{ type: 'code_line', children: [{ text: 'import hyperdocs' }] }, { type: 'code_line', children: [{ text: '' }] }, { type: 'code_line', children: [{ text: 'client = hyperdocs.Client(api_key="YOUR_KEY")' }] }, { type: 'code_line', children: [{ text: 'pages = client.pages.list(project_id="proj_abc")' }] }] },
        ],
      },
      {
        id: 'p-sdk-go',
        title: 'Go',
        slug: 'go',
        type: 'page',
        content: [
          { type: 'h1', children: [{ text: 'Go SDK' }] },
          { type: 'p', children: [{ text: 'The official Go client for the Hyperdocs API.' }] },
          { type: 'code_block', lang: 'bash', children: [{ type: 'code_line', children: [{ text: 'go get github.com/hyperdocs/hyperdocs-go' }] }] },
          { type: 'h2', children: [{ text: 'Basic Usage' }] },
          { type: 'code_block', lang: 'go', children: [{ type: 'code_line', children: [{ text: 'client := hyperdocs.NewClient("YOUR_API_KEY")' }] }, { type: 'code_line', children: [{ text: 'pages, err := client.Pages.List(ctx, "proj_abc")' }] }] },
        ],
      },
    ],
  },
  {
    id: 'f-changelog',
    title: 'Changelog',
    slug: 'changelog',
    type: 'folder',
    children: [
      {
        id: 'p-v3',
        title: 'v3.0 — May 2025',
        slug: 'v3-0',
        type: 'page',
        content: [
          { type: 'h1', children: [{ text: 'v3.0 — May 2025' }] },
          { type: 'h2', children: [{ text: 'New Features' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'AI block regeneration — right-click any block to regenerate with AI' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'Versioned docs — expose multiple doc versions simultaneously' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'Custom domain SSL auto-provisioning' }] },
          { type: 'h2', children: [{ text: 'Bug Fixes' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'Fixed code block syntax highlighting for Rust and Go' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'Resolved search index delay after publish' }] },
        ],
      },
      {
        id: 'p-v2',
        title: 'v2.4 — Feb 2025',
        slug: 'v2-4',
        type: 'page',
        content: [
          { type: 'h1', children: [{ text: 'v2.4 — February 2025' }] },
          { type: 'h2', children: [{ text: 'Improvements' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'Drag-and-drop page reordering in the editor sidebar' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'Webhook retry logic with exponential backoff' }] },
          { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'Python SDK initial release' }] },
        ],
      },
    ],
  },
]

/* ------------------------------------------------------------------ */
/*  Incoming changes (branch push simulation)                          */
/* ------------------------------------------------------------------ */

export type IncomingChange = {
  id: string
  pageId: string
  pageTitle: string
  pagePath: string[]
  branchName: string
  commitSha: string
  commitMessage: string
  timestamp: string
  newContent: unknown[]
}

const MOCK_INCOMING_CHANGES: IncomingChange[] = [
  {
    id: 'change-introduction-v31',
    pageId: 'p-introduction',
    pageTitle: 'Introduction',
    pagePath: ['getting-started', 'introduction'],
    branchName: 'main',
    commitSha: 'a3f8c12',
    commitMessage: 'docs: add v3.1 release notes and update intro',
    timestamp: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
    newContent: [
      ...(INITIAL_ITEMS[0].children![0].content as unknown[]),
      { type: 'h2', children: [{ text: "What's New in v3.1" }] },
      { type: 'p', children: [{ text: 'Version 3.1 introduces AI-powered content suggestions, real-time collaborative editing with up to 50 simultaneous editors, and an improved semantic search experience powered by vector embeddings.' }] },
      { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'AI content suggestions — smart recommendations as you write documentation' }] },
      { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'Real-time collaboration — edit simultaneously with your entire team' }] },
      { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'Semantic search — find content by meaning, not just exact keyword matches' }] },
      { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'Performance improvements — 3× faster page loads on the published docs site' }] },
    ],
  },
  {
    id: 'change-authentication-oauth',
    pageId: 'p-authentication',
    pageTitle: 'Authentication',
    pagePath: ['api-reference', 'authentication'],
    branchName: 'main',
    commitSha: 'a3f8c12',
    commitMessage: 'docs: add v3.1 release notes and update intro',
    timestamp: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
    newContent: [
      ...(INITIAL_ITEMS[1].children![0].content as unknown[]),
      { type: 'h2', children: [{ text: 'OAuth 2.0' }] },
      { type: 'p', children: [{ text: 'Hyperdocs now supports OAuth 2.0 for user-level authentication. This is the recommended flow for applications that act on behalf of individual users rather than using a shared API key.' }] },
      {
        type: 'code_block', lang: 'bash', children: [
          { type: 'code_line', children: [{ text: '# Step 1 — Redirect user to authorise' }] },
          { type: 'code_line', children: [{ text: 'GET https://auth.hyperdocs.io/oauth/authorize' }] },
          { type: 'code_line', children: [{ text: '  ?client_id=YOUR_CLIENT_ID' }] },
          { type: 'code_line', children: [{ text: '  &redirect_uri=https://yourapp.com/callback' }] },
          { type: 'code_line', children: [{ text: '  &response_type=code&scope=read:pages write:pages' }] },
          { type: 'code_line', children: [{ text: '' }] },
          { type: 'code_line', children: [{ text: '# Step 2 — Exchange code for token' }] },
          { type: 'code_line', children: [{ text: 'POST https://auth.hyperdocs.io/oauth/token' }] },
        ]
      },
      { type: 'p', children: [{ text: 'Tokens expire after 1 hour. Use the refresh_token to obtain a new access token without re-prompting the user.' }] },
    ],
  },
]

/* ------------------------------------------------------------------ */
/*  Context                                                             */
/* ------------------------------------------------------------------ */

const DocsContext = createContext<DocsContextValue | null>(null)

const STORAGE_KEY = 'hyperdocs_structure_v4'

let lastFetchedTime = 0

export function DocsProvider({
  children,
  initialDocs,
  userId = null,
  mode = 'public',
}: {
  children: React.ReactNode
  initialDocs?: NavItem[] | null
  userId?: string | null
  /** 'admin' — API only, no localStorage.
   *  'public' — server-seeded data, re-fetches from API on focus to stay fresh. */
  mode?: 'admin' | 'public'
}) {
  const startingItems = initialDocs && initialDocs?.length > 0 ? initialDocs : (mode === 'admin' ? [] : INITIAL_ITEMS)
  const [items, setItems] = useState<NavItem[]>(startingItems)
  const [hydrated, setHydrated] = useState(false)
  const [pendingChanges, setPendingChanges] = useState<IncomingChange[]>(MOCK_INCOMING_CHANGES)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle')
  const hasInitialData = Array.isArray(initialDocs) && initialDocs.length > 0
  const [isLoading, setIsLoading] = useState(
    mode === 'admin' ? !hasInitialData : (mode === 'public' && !initialDocs)
  )

  const withSaveStatus = useCallback(async <T,>(apiCall: Promise<T>): Promise<T> => {
    setSaveStatus('saving')
    try {
      const res = await apiCall
      setSaveStatus('saved')
      return res
    } catch (e) {
      setSaveStatus('idle')
      throw e
    }
  }, [])

  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  // ── Public mode: useQuery drives the docs data ──────────────────────────────
  // Behavior:
  //   • localStorage data shows INSTANTLY (placeholderData = previous cached value)
  //   • staleTime: 0 → always considered stale → always refetches on page refresh/mount
  //   • refetchOnWindowFocus: false → no API call on every tab switch
  //   • When fetch completes, TanStack updates the cache → UI updates silently
  //   • No loading state ever shown
  const { data: queryDocs } = useQuery<NavItem[]>({
    queryKey: userId ? PUBLIC_DOCS_KEY(userId) : ['public-docs-anon'],
    queryFn: async () => {
      const res = await apiGetPublicDocsStructure(userId!)
      if (res?.success && Array.isArray(res?.data) && res?.data?.length > 0) {
        return res.data as NavItem[]
      }
      return items // keep current data if fetch fails
    },
    enabled: mode === 'public' && !!userId && !isAdmin,
    placeholderData: (prev) => prev, // show previous data while fetching — no blank
    staleTime: 0,                    // always stale → always refetch on mount/refresh
    gcTime: 24 * 60 * 60 * 1000,    // keep in localStorage for 24h
    refetchOnWindowFocus: false,     // don't call API on every tab switch
    refetchOnMount: true,            // always fetch on page refresh/mount
  })

  // Sync query data into items state whenever TanStack returns fresh data
  useEffect(() => {
    if (queryDocs && queryDocs.length > 0) {
      setItems(queryDocs)
      setIsLoading(false)
    }
  }, [queryDocs])

  // Mark hydrated
  useEffect(() => { setHydrated(true) }, [])

  const addChange = useDocsChangesStore((s) => s.addChange)

  // Always-fresh ref so callbacks don't go stale on items
  const itemsRef = useRef(items)
  useEffect(() => { itemsRef.current = items }, [items])

  const createPage = useCallback((parentId: string | null, title: string) => {
    const tempId = uid()
    const newPage: NavItem = {
      id: tempId,
      title,
      slug: slugify(title),
      type: 'page',
      content: defaultContent(title),
    }
    setItems((prev) =>
      parentId ? addChildToParent(prev, parentId, newPage) : [...prev, newPage]
    )
    // After the API responds, swap the client-generated temp ID for the
    // real server-assigned ID so that future saves/deletes use the correct ID.
    const apiCall = apiCreateItem(parentId, title, 'page').then((res) => {
      if (res.success && res.data?.id && res.data.id !== tempId) {
        setItems((prev) =>
          updateItemInTree(prev, tempId, (existing) => ({
            ...existing,
            id: res.data.id,
            slug: res.data.slug ?? existing.slug,
            content: res.data.content ?? existing.content,
          }))
        )
      }
      return res
    })
    const req = withSaveStatus(apiCall)
    addChange({ id: tempId, title, itemType: 'page', changeType: 'created' })
    return { item: newPage, req }
  }, [addChange, withSaveStatus])

  const createFolder = useCallback((parentId: string | null, title: string) => {
    const tempId = uid()
    const newFolder: NavItem = {
      id: tempId,
      title,
      slug: slugify(title),
      type: 'folder',
      children: [],
    }
    setItems((prev) =>
      parentId ? addChildToParent(prev, parentId, newFolder) : [...prev, newFolder]
    )
    // Swap temp ID for real server ID after creation.
    const apiCall = apiCreateItem(parentId, title, 'folder').then((res) => {
      if (res.success && res.data?.id && res.data.id !== tempId) {
        setItems((prev) =>
          updateItemInTree(prev, tempId, (existing) => ({
            ...existing,
            id: res.data.id,
            slug: res.data.slug ?? existing.slug,
          }))
        )
      }
      return res
    })
    const req = withSaveStatus(apiCall)
    addChange({ id: tempId, title, itemType: 'folder', changeType: 'created' })
    return { item: newFolder, req }
  }, [addChange, withSaveStatus])

  const deleteItem = useCallback((id: string) => {
    // Capture title + type BEFORE removing from the tree
    const target = findInTree(itemsRef?.current, id)
    setItems((prev) => removeFromTree(prev, id))
    const req = withSaveStatus(apiDeleteItem(id))
    if (target) {
      addChange({ id, title: target.title, itemType: target.type, changeType: 'deleted' })
    }
    return req
  }, [addChange, withSaveStatus])

  const renameItem = useCallback((id: string, title: string) => {
    const target = findInTree(itemsRef.current, id)
    setItems((prev) =>
      updateItemInTree(prev, id, (item) => ({ ...item, title, slug: slugify(title) }))
    )
    const req = withSaveStatus(apiRenameItem(id, title))
    if (target) {
      addChange({ id, title, itemType: target.type, changeType: 'renamed' })
    }
    return req
  }, [addChange, withSaveStatus])

  const updateContent = useCallback((id: string, content: unknown[]) => {
    const target = findInTree(itemsRef.current, id)
    setItems((prev) =>
      updateItemInTree(prev, id, (item) => ({ ...item, content }))
    )
    withSaveStatus(apiUpdatePageContent(id, content))
    if (target) {
      addChange({ id, title: target.title, itemType: 'page', changeType: 'modified' })
    }
  }, [addChange])

  const moveItem = useCallback((draggedId: string, targetId: string, position: 'before' | 'after' | 'inside') => {
    const target = findInTree(itemsRef.current, draggedId)
    setItems((prev) => moveItemInTree(prev, draggedId, targetId, position))
    const req = withSaveStatus(apiMoveItem(draggedId, targetId, position))
    if (target) {
      addChange({ id: target.id, title: target.title, itemType: target.type, changeType: 'moved' })
    }
    return req
  }, [withSaveStatus, addChange])

  const acceptChange = useCallback((changeId: string) => {
    setPendingChanges((prev) => {
      const change = prev.find((c) => c.id === changeId)
      if (change) {
        setItems((items) => updateItemInTree(items, change.pageId, (item) => ({ ...item, content: change.newContent })))
      }
      return prev.filter((c) => c.id !== changeId)
    })
  }, [])

  const rejectChange = useCallback((changeId: string) => {
    setPendingChanges((prev) => prev.filter((c) => c.id !== changeId))
  }, [])

  const dismissAllChanges = useCallback(() => {
    setPendingChanges([])
  }, [])

  const findByPath = useCallback(
    (segments: string[]) => findByPathInTree(items, segments),
    [items]
  )

  const findById = useCallback(
    (id: string) => findInTree(items, id),
    [items]
  )

  const getPathSegments = useCallback(
    (id: string) => getPathSegmentsInTree(items, id) ?? [],
    [items]
  )

  const reloadStructure = useCallback(async () => {
    const now = Date.now()
    if (now - lastFetchedTime < 2000) return
    lastFetchedTime = now

    const shouldShowLoading = itemsRef.current.length === 0
    if (shouldShowLoading) {
      setIsLoading(true)
    }

    try {
      const res = await apiGetDocsStructure()
      if (res?.success && Array.isArray(res?.data) && res?.data?.length > 0) {
        setItems(res.data as NavItem[])
      }
    } finally {
      if (shouldShowLoading) {
        setIsLoading(false)
      }
    }
  }, [])

  return (
    <DocsContext.Provider
      value={{
        items,
        createPage,
        createFolder,
        deleteItem,
        renameItem,
        updateContent,
        moveItem,
        findByPath,
        findById,
        getPathSegments,
        pendingChanges,
        acceptChange,
        rejectChange,
        dismissAllChanges,
        saveStatus,
        isLoading,
        reloadStructure,
      }}
    >
      {children}
    </DocsContext.Provider>
  )
}

export function useDocs() {
  const ctx = useContext(DocsContext)
  if (!ctx) throw new Error('useDocs must be used within DocsProvider')
  return ctx
}

/* Helper: first leaf page in the tree */
export function firstPage(items: NavItem[]): NavItem | null {
  for (const item of items) {
    if (item.type === 'page') return item
    if (item.children) {
      const found = firstPage(item.children)
      if (found) return found
    }
  }
  return null
}

/* Helper: full URL path of the first page in the tree (e.g. "getting-started/introduction") */
export function getFirstPagePath(items: NavItem[]): string | null {
  const page = firstPage(items)
  if (!page) return null
  const segs = getPathSegmentsInTree(items, page.id)
  return segs ? segs.join('/') : null
}

/* Helper: flatten all pages */
export function flatPages(items: NavItem[]): NavItem[] {
  const result: NavItem[] = []
  for (const item of items) {
    if (item.type === 'page') result.push(item)
    if (item.children) result.push(...flatPages(item.children))
  }
  return result
}
