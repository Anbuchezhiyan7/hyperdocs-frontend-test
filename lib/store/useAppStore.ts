'use client';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { useSettingsStore, UseSettingsStoreProps } from './useSettingsStore';

type UseAppStoreProps = UseSettingsStoreProps;

export const useAppStore = create<UseAppStoreProps>()(
    devtools(
        persist(
            (set, get, api) => ({
                ...useSettingsStore(set, get, api),
            }),
            {
                name: 'hyperdocs-app-settings',
            }
        ),
        { name: 'HyperdocsStore' }
    )
);
