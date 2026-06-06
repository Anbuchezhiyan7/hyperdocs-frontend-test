import { ChangelogEntry, ChangelogTag } from '@/lib/store/useChangelogStore'

export const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
export const SHORT  = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
export const DAYS   = ['Su','Mo','Tu','We','Th','Fr','Sa']

export const toKey   = (d: Date) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
export const toLabel = (d: Date) => `${d.toLocaleString('en-US', { month: 'short' })} ${d.getDate()}, ${d.getFullYear()}`
export const fromKey = (k: string) => { 
  const [y,m,d] = k.split('-').map(Number)
  return new Date(y, m-1, d)
}

export function defaultContent(title: string, subtitle: string, bullets: string[]): Record<string, unknown>[] {
  const id = title.toLowerCase().replace(/[^a-z0-9]/g, '-')
  return [
    { id: `${id}-h1`, type: 'h1', children: [{ text: title }] },
    { id: `${id}-p`, type: 'p', children: [{ text: subtitle }] },
    { id: `${id}-h2`, type: 'h2', children: [{ text: 'Improvements' }] },
    {
      id: `${id}-ul`,
      type: 'ul',
      children: bullets.map((b, idx) => ({
        id: `${id}-li-${idx}`,
        type: 'li',
        children: [{ type: 'lic', children: [{ text: b }] }]
      }))
    }
  ]
}

export function defaultEntries(allTags: ChangelogTag[]): ChangelogEntry[] {
  const now = new Date()
  
  // 2026 Dates
  const d_2026_1 = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const d_2026_2 = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 15)
  const d_2026_3 = new Date(now.getFullYear(), now.getMonth() - 2, now.getDate())

  // 2025 Dates
  const d_2025_1 = new Date(2025, 11, 14)
  const d_2025_2 = new Date(2025, 4, 10)

  // 2024 Dates
  const d_2024_1 = new Date(2024, 9, 22)
  const d_2024_2 = new Date(2024, 2, 5)

  // 2023 Dates
  const d_2023_1 = new Date(2023, 10, 18)
  const d_2023_2 = new Date(2023, 3, 12)

  // 2022 Dates
  const d_2022_1 = new Date(2022, 8, 25)
  const d_2022_2 = new Date(2022, 1, 8)

  return [
    {
      dateKey: toKey(d_2026_1),
      label: toLabel(d_2026_1),
      tags: [allTags[0]],
      content: defaultContent(
        "Product update",
        "See what's new and improved in our latest update.",
        [
          "We recently released site-level permissions, to make it easier to manage permissions for all of your content.",
          "We've simplified the page width options in docs pages so you can now only apply full-width to an entire page."
        ]
      )
    },
    {
      dateKey: toKey(d_2026_2),
      label: toLabel(d_2026_2),
      tags: [allTags[1], allTags[2]],
      content: defaultContent(
        "Inheritance & Permissions",
        "Tweaking the way permissions are inherited to make them simpler and easier to manage.",
        [
          "For content linked to a site, site-level permissions now take precedence over permissions inherited from parent collections.",
          "Fixed a bug where unauthorized users could view hidden draft document sub-trees."
        ]
      )
    },
    {
      dateKey: toKey(d_2026_3),
      label: toLabel(d_2026_3),
      tags: [allTags[1]],
      content: defaultContent(
        "Search Optimization",
        "Introducing channels and enhanced indexing speed.",
        [
          "We've added a new, compact 'On this page' section for narrower screens to make navigation inside updates smoother.",
          "Auto-sync with your Git repositories is now 2x faster."
        ]
      )
    },
    {
      dateKey: toKey(d_2025_1),
      label: toLabel(d_2025_1),
      tags: [allTags[0]],
      content: defaultContent(
        "AI Assistant V2 Release",
        "Our next-generation document chat assistant is now live.",
        [
          "Ask complex questions directly inside articles and receive cited code snippets.",
          "Added support for French and German semantic context queries."
        ]
      )
    },
    {
      dateKey: toKey(d_2025_2),
      label: toLabel(d_2025_2),
      tags: [allTags[1], allTags[2]],
      content: defaultContent(
        "Table Formatting & Performance",
        "Improved layout settings for rendering data tables.",
        [
          "Added border formatting controls for rows and columns in the WYSIWYG editor.",
          "Fixed cell alignment issues on mobile Safari browsers."
        ]
      )
    },
    {
      dateKey: toKey(d_2024_1),
      label: toLabel(d_2024_1),
      tags: [allTags[1]],
      content: defaultContent(
        "Team Workspace Invites",
        "Invite colleagues with specific viewer or builder permissions.",
        [
          "Added direct Google Workspace integrations to sync organizational directories.",
          "Improved access control dashboard load speed by 40%."
        ]
      )
    },
    {
      dateKey: toKey(d_2024_2),
      label: toLabel(d_2024_2),
      tags: [allTags[0]],
      content: defaultContent(
        "Custom Callout Blocks",
        "Alert, Caution, and Tip blocks now support customizable emojis.",
        [
          "Add highlights and custom styling to draw attention to critical parts of your documentation."
        ]
      )
    },
    {
      dateKey: toKey(d_2023_1),
      label: toLabel(d_2023_1),
      tags: [allTags[2]],
      content: defaultContent(
        "Asset Loading & CDN fixes",
        "Resolving asset delays across European regions.",
        [
          "Synced help center media items with premium Cloudflare CDN edges.",
          "Fixed a layout shift when loading multiple inline SVG icons."
        ]
      )
    },
    {
      dateKey: toKey(d_2023_2),
      label: toLabel(d_2023_2),
      tags: [allTags[1]],
      content: defaultContent(
        "Navigation Flow Redesign",
        "Improved readability and spacing for the left sidebar.",
        [
          "Introduced nested collapse states for documents with multiple sub-directories."
        ]
      )
    },
    {
      dateKey: toKey(d_2022_1),
      label: toLabel(d_2022_1),
      tags: [allTags[0]],
      content: defaultContent(
        "Introducing Custom Subdomains",
        "Publish your documentation center to your own subdomain.",
        [
          "We now support full SSL provisioning and custom CNAME routing configurations.",
          "Added auto-redirect setup from HTTP to HTTPS."
        ]
      )
    },
    {
      dateKey: toKey(d_2022_2),
      label: toLabel(d_2022_2),
      tags: [allTags[2]],
      content: defaultContent(
        "Markdown Import Bugfixes",
        "Resolved parsing errors when uploading multi-nested markdown files.",
        [
          "Fixed blockquote parsing when using backticks inside list items."
        ]
      )
    }
  ]
}
