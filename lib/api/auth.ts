import { getRequest, postRequest } from '@/lib/axios';
import Cookies from 'js-cookie';

const formatRes = {
    success: (status: number, defaultMessage = 'Success', data?: any) => ({
        status,
        message: data?.message || defaultMessage,
        data,
        type: 'success' as const,
        success: true,
    }),
    error: (error: any, defaultMessage = 'Something went wrong') => {
        const status = error?.status ?? error?.response?.status ?? null;
        const data = error?.data ?? error?.response?.data ?? {};
        const message = data?.message || data?.detail || error?.message || defaultMessage;
        return { status, message, type: 'error' as const, success: false, data: {} };
    },
};

export const apiGoogleLogin = async (access_token: string) => {
    try {
        const { status, data } = await postRequest(
            'user/auth/signup',
            {},
            { headers: { Authorization: `Bearer ${access_token}` } }
        );
        Cookies.set('email', data?.email ?? '');
        Cookies.set('username', data?.name ?? '');
        return formatRes.success(status, 'Logged in successfully', data);
    } catch (error) {
        return formatRes.error(error, 'Google login failed');
    }
};

export const apiUpdateDomain = async (payload: { domain: string; domain_type: string }) => {
    try {
        const { status, data } = await postRequest('settings/domain', payload);
        return formatRes.success(status, 'Domain saved', data);
    } catch (error) {
        return formatRes.error(error, 'Failed to save domain');
    }
};

export const apiUpdateSiteDetails = async (payload: { site_address: string }) => {
    try {
        const { status, data } = await postRequest('user/auth/site_details', payload);
        return formatRes.success(status, 'Site details saved', data);
    } catch (error) {
        return formatRes.error(error, 'Failed to save site details');
    }
};

export const apiGetUserDetails = async () => {
    try {
        const { status, data } = await getRequest('user/auth/user_details');
        return formatRes.success(status, 'User details fetched', data);
    } catch (error) {
        return formatRes.error(error, 'Failed to fetch user details');
    }
};

export const apiGetSettings = async () => {
    try {
        const { status, data } = await getRequest('settings/');
        return formatRes.success(status, 'Settings fetched', data);
    } catch (error) {
        return formatRes.error(error, 'Failed to fetch settings');
    }
};

export const apiSetDocumentMode = async (payload: { document_mode: 'default' | 'blank' | 'git' }) => {
    try {
        const { status, data } = await postRequest('settings/document-mode', payload);
        return formatRes.success(status, 'Document mode saved', data);
    } catch (error) {
        return formatRes.error(error, 'Failed to save document mode');
    }
};
