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

export interface ImageAsset {
    image_id: string
    url: string
}

export interface GeneralSettingsPayload {
    organization_name: string
    description: string
    accent_color: string
    show_hyperblog_branding: boolean
    organization_logo: {
        url: string | null
        dark_mode_logo: ImageAsset | null
        light_mode_logo: ImageAsset | null
    }
    favicon_image: ImageAsset | null
}

export const apiUploadImage = async (file: File) => {
    try {
        const formData = new FormData()
        formData.append('image', file)
        const { status, data } = await postRequest(apiPath.common.uploadImage, formData)
        return formatRes.success(status, 'Image uploaded', data)
    } catch (e) { return formatRes.error(e, 'Failed to upload image') }
}

export const apiSaveGeneralSettings = async (payload: GeneralSettingsPayload) => {
    try {
        const { status, data } = await postRequest(apiPath.settings.general, payload)
        return formatRes.success(status, 'Settings saved', data)
    } catch (e) { return formatRes.error(e, 'Failed to save settings') }
}

export const apiUpdateGeneralSettings = async (payload: GeneralSettingsPayload) => {
    try {
        const { status, data } = await putRequest(apiPath.settings.general, payload)
        return formatRes.success(status, 'Settings updated', data)
    } catch (e) { return formatRes.error(e, 'Failed to update settings') }
}

export const apiDeleteImage = async (imageId: string) => {
    try {
        const { status, data } = await deleteRequest(apiPath.common.deleteImage(imageId))
        return formatRes.success(status, 'Image deleted', data)
    } catch (e) { return formatRes.error(e, 'Failed to delete image') }
}

export const apiConnectDomain = async (payload: { domain: string, domain_type: 'sub_domain' | 'main_domain' }) => {
    try {
        const { status, data } = await postRequest(apiPath.settings.domain, payload)
        return formatRes.success(status, 'Domain connected', data)
    } catch (e) { return formatRes.error(e, 'Failed to connect domain') }
}

export const apiUpdateDomain = async (payload: { domain: string, domain_type: 'sub_domain' | 'main_domain' }) => {
    try {
        const { status, data } = await putRequest(apiPath.settings.domain, payload)
        return formatRes.success(status, 'Domain updated', data)
    } catch (e) { return formatRes.error(e, 'Failed to update domain') }
}

export const apiDisconnectDomain = async (domainType: 'sub_domain' | 'main_domain' | 'default') => {
    try {
        const { status, data } = await deleteRequest(`${apiPath.settings.domain}?domain_type=${domainType}`)
        return formatRes.success(status, 'Domain disconnected', data)
    } catch (e) { return formatRes.error(e, 'Failed to disconnect domain') }
}

import { getRequest } from '@/lib/axios'

export const apiGetSettings = async () => {
    try {
        const { status, data } = await getRequest(apiPath.settings.get)
        return formatRes.success(status, 'Settings fetched', data)
    } catch (e) { return formatRes.error(e, 'Failed to fetch settings') }
}

/* ------------------------------------------------------------------ */
/*  Public (server-side) fetch — used in layout.tsx                    */
/* ------------------------------------------------------------------ */

import { HyperDocsSettings } from '@/lib/settings-types'
import { BASE_URL } from '@/lib/definitions'

export async function fetchSettings(userId: string): Promise<HyperDocsSettings | null> {
    try {
        const res = await fetch(`${BASE_URL}/api/v1/settings/${userId}`, {
            cache: 'no-store',
        })
        if (!res.ok) return null
        const data = await res.json()
        return data as HyperDocsSettings
    } catch (err) {
        console.error('[fetchSettings] error:', err)
        return null
    }
}
