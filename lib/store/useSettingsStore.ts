'use client';

import { StateCreator } from 'zustand';

export type DomainSettings = {
    default: string | null;
    default_connected: boolean;
    sub_domain: string | null;
    sub_domain_connected: boolean;
    main_domain: string | null;
    main_domain_connected: boolean;
    domain_connected: boolean;
};

export type GeneralSettings = {
    organization_name: string | null;
    organization_logo: {
        url: string | null;
        dark_mode_logo: { image_id: string; url: string } | null;
        light_mode_logo: { image_id: string; url: string } | null;
    } | null;
    favicon_image: { image_id: string; url: string } | null;
    accent_color: string | null;
    description: string | null;
    time_zone: string | null;
    show_hyperblog_branding: boolean | null;
    document_mode?: 'default' | 'blank' | 'git' | null;
};

export type GenerationCredits = {
    total: number;
    remaining: number;
    used: number;
};

export type AppSettings = {
    user_id: string | null;
    general: GeneralSettings;
    domain: DomainSettings;
    navigation_footer: Record<string, any>;
    generation_credits?: GenerationCredits;
};

const defaultSettings: AppSettings = {
    user_id: null,
    general: {
        organization_name: null,
        organization_logo: null,
        favicon_image: null,
        accent_color: null,
        description: null,
        time_zone: null,
        show_hyperblog_branding: null,
        document_mode: null,
    },
    domain: {
        default: null,
        default_connected: false,
        sub_domain: null,
        sub_domain_connected: false,
        main_domain: null,
        main_domain_connected: false,
        domain_connected: false,
    },
    navigation_footer: {},
    generation_credits: undefined,
};

export type UseSettingsStoreProps = {
    settings: AppSettings;
    setSettings: (data: Partial<AppSettings>) => void;
};

export const useSettingsStore: StateCreator<UseSettingsStoreProps> = (set) => ({
    settings: defaultSettings,
    setSettings: (data: Partial<AppSettings>) => {
        set((state) => ({
            settings: {
                ...state.settings,
                ...data,
                general: data.general ?? state.settings.general,
                domain: data.domain ?? state.settings.domain,
                navigation_footer: data.navigation_footer ?? state.settings.navigation_footer,
                generation_credits: data.generation_credits ?? state.settings.generation_credits,
            },
        }));
    },
});
