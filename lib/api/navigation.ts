import { postRequest, putRequest, deleteRequest } from '@/lib/axios'
import apiPath from '@/lib/constants/api-path'

const formatRes = {
    success: (status: number, defaultMessage = 'Success', data?: any) => ({
        status, message: data?.message || defaultMessage, data, success: true,
    }),
    error: (error: any, defaultMessage = 'Something went wrong') => {
        const data = error?.data ?? error?.response?.data ?? {}
        const message = data?.message || data?.detail || error?.message || defaultMessage
        return { status: null, message, success: false, data: {} }
    },
}

// ─── Navigation ────────────────────────────────────────────────────────────────

export const apiCreateNavItem = async (payload: { menu_name: string; menu_link: string }[]) => {
    try {
        const { status, data } = await postRequest(apiPath.settings.navigation.base, payload)
        return formatRes.success(status, 'Menu item added', data)
    } catch (e) { return formatRes.error(e, 'Failed to add menu item') }
}

export const apiUpdateNavItem = async (id: string, payload: { menu_name: string; menu_link: string }) => {
    try {
        const { status, data } = await putRequest(apiPath.settings.navigation.id(id), payload)
        return formatRes.success(status, 'Menu item updated', data)
    } catch (e) { return formatRes.error(e, 'Failed to update menu item') }
}

export const apiDeleteNavItem = async (id: string) => {
    try {
        const { status, data } = await deleteRequest(apiPath.settings.navigation.id(id))
        return formatRes.success(status, 'Menu item deleted', data)
    } catch (e) { return formatRes.error(e, 'Failed to delete menu item') }
}

// ─── Header CTA ────────────────────────────────────────────────────────────────

export interface CtaPayload {
    backgroundColor: string
    buttonColor: string
    label: string
    url: string
}

export const apiCreateHeaderCta = async (payload: CtaPayload) => {
    try {
        const { status, data } = await postRequest(apiPath.settings.headerCta.base, payload)
        return formatRes.success(status, 'Header CTA saved', data)
    } catch (e) { return formatRes.error(e, 'Failed to save header CTA') }
}

export const apiUpdateHeaderCta = async (id: string, payload: CtaPayload) => {
    try {
        const { status, data } = await putRequest(apiPath.settings.headerCta.id(id), payload)
        return formatRes.success(status, 'Header CTA updated', data)
    } catch (e) { return formatRes.error(e, 'Failed to update header CTA') }
}

export const apiDeleteHeaderCta = async (id: string) => {
    try {
        const { status, data } = await deleteRequest(apiPath.settings.headerCta.id(id))
        return formatRes.success(status, 'Header CTA deleted', data)
    } catch (e) { return formatRes.error(e, 'Failed to delete header CTA') }
}

// ─── Footer ────────────────────────────────────────────────────────────────────

export interface FooterLink {
    link_name: string
    link_url: string
}

export interface FooterSectionPayload {
    menu_name: string
    menu_link: FooterLink[]
}

export const apiCreateFooterSection = async (payload: FooterSectionPayload[]) => {
    try {
        const { status, data } = await postRequest(apiPath.settings.footer.base, payload)
        return formatRes.success(status, 'Footer section added', data)
    } catch (e) { return formatRes.error(e, 'Failed to add footer section') }
}

export const apiUpdateFooterSection = async (id: string, payload: FooterSectionPayload) => {
    try {
        const { status, data } = await putRequest(apiPath.settings.footer.id(id), payload)
        return formatRes.success(status, 'Footer section updated', data)
    } catch (e) { return formatRes.error(e, 'Failed to update footer section') }
}

export const apiDeleteFooterSection = async (id: string) => {
    try {
        const { status, data } = await deleteRequest(apiPath.settings.footer.id(id))
        return formatRes.success(status, 'Footer section deleted', data)
    } catch (e) { return formatRes.error(e, 'Failed to delete footer section') }
}
