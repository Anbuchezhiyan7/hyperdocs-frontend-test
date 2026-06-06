import { NavItem } from '@/lib/docs-context'
import { getRequest, postRequest, request } from '@/lib/axios'
import apiPath from '@/lib/constants/api-path'

const formatRes = {
    success: (status: number, defaultMessage = 'Success', data?: any) => ({
        status,
        message: data?.message || defaultMessage,
        data,
        type: 'success' as const,
        success: true,
    }),
    error: (error: any, defaultMessage = 'Something went wrong') => {
        const status = error?.status ?? error?.response?.status ?? null
        const data = error?.data ?? error?.response?.data ?? {}
        const message = data?.message || data?.detail || error?.message || defaultMessage
        return { status, message, type: 'error' as const, success: false, data: {} }
    },
}

/**
 * GET /api/v1/docs/structure
 * Returns the full draft doc tree (NavItem[]).
 */
export const apiGetDocsStructure = async () => {
    try {
        const { status, data } = await getRequest(apiPath.docs.structure)
        return formatRes.success(status, 'Docs structure fetched', data)
    } catch (error) {
        return formatRes.error(error, 'Failed to fetch docs structure')
    }
}

/**
 * GET /api/v1/documents/:userId
 * Returns the public doc tree.
 */
export const apiGetPublicDocsStructure = async (userId: string) => {
    try {
        const { status, data } = await getRequest(apiPath.public.documents(userId))
        return formatRes.success(status, 'Public docs fetched', data)
    } catch (error) {
        return formatRes.error(error, 'Failed to fetch public docs')
    }
}

/**
 * Server-side native fetch for public docs.
 */
export async function fetchPublicDocs(userId: string): Promise<any | null> {
    try {
        const { BASE_URL } = await import('@/lib/definitions')
        // console.log(`[fetchPublicDocs] Calling ${BASE_URL}/api/v1/documents/${userId}`)
        const res = await fetch(`${BASE_URL}/api/v1/documents/${userId}`)
        if (!res.ok) {
            console.log(`[fetchPublicDocs] Response not ok: ${res.status}`)
            return null
        }
        const json = await res.json()
        const items = Array.isArray(json) ? json : (json?.data ?? null)
        // console.log(`[fetchPublicDocs] Data received, items count: ${items?.length}`)
        return items
    } catch (err) {
        console.error('[fetchPublicDocs] error:', err)
        return null
    }
}

/**
 * PATCH /api/v1/docs/pages/:id
 * Body: { content: unknown[] }
 */
export const apiUpdatePageContent = async (id: string, content: unknown[]) => {
    try {
        const { status, data } = await request({
            method: 'PATCH',
            url: apiPath.docs.pageContent(id),
            data: { content },
        })
        return formatRes.success(status, 'Page content updated', data)
    } catch (error) {
        return formatRes.error(error, 'Failed to update page content')
    }
}

/**
 * POST /api/v1/docs/items
 * Body: { parentId: string | null, title: string, type: 'page' | 'folder' }
 */
export const apiCreateItem = async (parentId: string | null, title: string, type: 'page' | 'folder') => {
    try {
        const { status, data } = await postRequest(apiPath.docs.items, { parentId, title, type })
        return formatRes.success(status, 'Item created', data)
    } catch (error) {
        return formatRes.error(error, 'Failed to create item')
    }
}

/**
 * DELETE /api/v1/docs/items/:id
 */
export const apiDeleteItem = async (id: string) => {
    try {
        const { status, data } = await request({
            method: 'DELETE',
            url: apiPath.docs.item(id),
        })
        return formatRes.success(status, 'Item deleted', data)
    } catch (error) {
        return formatRes.error(error, 'Failed to delete item')
    }
}

/**
 * PATCH /api/v1/docs/items/:id
 * Body: { title: string }
 */
export const apiRenameItem = async (id: string, title: string) => {
    try {
        const { status, data } = await request({
            method: 'PATCH',
            url: apiPath.docs.itemRename(id),
            data: { title },
        })
        return formatRes.success(status, 'Item renamed', data)
    } catch (error) {
        return formatRes.error(error, 'Failed to rename item')
    }
}

/**
 * PATCH /api/v1/docs/items/:id/move
 * Body: { targetId: string, position: 'before' | 'after' | 'inside' }
 */
export const apiMoveItem = async (id: string, targetId: string, position: 'before' | 'after' | 'inside') => {
    try {
        const { status, data } = await request({
            method: 'PATCH',
            url: apiPath.docs.itemMove(id),
            data: { targetId, position },
        })
        return formatRes.success(status, 'Item moved', data)
    } catch (error) {
        return formatRes.error(error, 'Failed to move item')
    }
}
/**
 * POST /api/v1/docs/publish
 * Publishes the draft tree to live documents and invalidates the CDN cache.
 */
export const apiPublishDocs = async () => {
    try {
        const { status, data } = await postRequest(apiPath.docs.publish)
        return formatRes.success(status, 'Docs published successfully', data)
    } catch (error) {
        return formatRes.error(error, 'Failed to publish docs')
    }
}
