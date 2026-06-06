/**
 * lib/architecture/types.ts
 *
 * Core TypeScript types for HyperDocs.
 *
 * KEY DESIGN DECISIONS:
 *
 * 1. NavNode vs DocPage are intentionally SEPARATE types.
 *    - NavNode  → drives the sidebar tree (routing, nesting, ordering only)
 *    - DocPage  → drives the editor + renderer (Plate.js content only)
 *    This mirrors how production doc platforms (Mintlify, Gitbook) work:
 *    the navigation manifest is a tiny, fast-loading index, while page
 *    content is fetched on demand.
 *
 * 2. Heading anchors (e.g. #local-fonts) are NOT stored anywhere.
 *    They are generated dynamically from heading text at render time.
 *    Storing them would create sync problems when headings are renamed.
 *
 * 3. publishProject() only sends { projectId } — never page content.
 *    The backend fetches pages independently, allowing incremental builds
 *    and avoiding huge request payloads (critical for 1000+ page sites).
 */

// ─── Plate.js content primitives ────────────────────────────────────────────

/** A single inline text node inside a block */
export interface PlateText {
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
}

/** A block-level node in Plate.js content (paragraph, heading, table, etc.) */
export interface PlateBlock {
  id?: string
  type: string
  children: (PlateBlock | PlateText)[]
  // Indent-based list properties (Plate v53 uses indent, not nested ul/li)
  indent?: number
  listStyleType?: string
  // Optional per-block metadata
  lang?: string   // code_block language
  url?: string    // image url
  alt?: string    // image alt
  [key: string]: unknown
}

/** Full page content: an ordered array of Plate.js blocks */
export type PlateContent = PlateBlock[]

// ─── Navigation tree ────────────────────────────────────────────────────────

/**
 * NavNode represents a single item in the sidebar navigation tree.
 *
 * INTENTIONALLY contains NO content — only structural metadata.
 * This keeps the nav manifest small and fast to load/parse.
 * A site with 500 pages can load its full nav tree in one tiny request.
 */
export interface NavNode {
  id: string          // Stable unique ID, never changes (used as foreign key for content)
  slug: string        // URL segment (e.g. "fonts", "authentication")
  title: string       // Display label in sidebar
  type: 'page' | 'folder'
  order: number       // Position within parent (for drag-and-drop reordering)
  parentId: string | null  // null = root level
  children?: NavNode[]     // Populated for folders
}

// ─── Page content ───────────────────────────────────────────────────────────

/**
 * DocPage is stored and loaded INDEPENDENTLY from the nav tree.
 *
 * Each page is its own record.  When a user edits page X, only X is updated.
 * This architecture supports:
 *   - Partial saves (autosave a single page)
 *   - Static builds (render each page independently)
 *   - GitHub sync (each page maps to one .mdx file)
 *   - Multi-tenant (projectId scopes all queries)
 */
export interface DocPage {
  id: string         // Matches the corresponding NavNode.id
  projectId: string  // Tenant / project scoping
  slug: string       // Full path from root (e.g. "customize/fonts")
  title: string      // Page title (denormalised from nav for convenience)
  content: PlateContent
  updatedAt: string  // ISO timestamp
}

// ─── Save / Publish payloads ─────────────────────────────────────────────────

/**
 * SavePagePayload — sent when autosave fires for a single page.
 * Only the changed page is included.  Never the whole site.
 */
export interface SavePagePayload {
  projectId: string
  pageId: string
  content: PlateContent
  updatedAt: string
}

/**
 * PublishPayload — sent when the user clicks Publish.
 *
 * ONLY sends projectId.  The backend fetches all published pages itself,
 * computes the nav tree, generates static HTML, and deploys.
 * Sending content here would be wasteful and insecure (the backend should
 * read from its own authoritative store, not trust the client payload).
 */
export interface PublishPayload {
  projectId: string
}
