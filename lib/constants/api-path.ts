const apiPath = {
    auth: {
        user: 'user/auth/user_details',
        signup: 'user/auth/signup',
        site: 'user/auth/site_details',
    },
    common: {
        uploadImage: 'common/media_uploader/image',
        deleteImage: (id: string) => `common/media_uploader/image/${id}`,
    },
    settings: {
        get: 'settings/',
        general: 'settings/general',
        domain: 'settings/domain',
        navigation: {
            base: 'settings/navigation_footer/navigation',
            id: (id: string) => `settings/navigation_footer/navigation/${id}`,
        },
        headerCta: {
            base: 'settings/navigation_footer/header_cta',
            id: (id: string) => `settings/navigation_footer/header_cta/${id}`,
        },
        footer: {
            base: 'settings/navigation_footer/footer',
            id: (id: string) => `settings/navigation_footer/footer/${id}`,
        },
    },
    docs: {
        /** GET /api/v1/docs/structure — fetch the full draft doc tree */
        structure: 'docs/structure',
        /** PATCH /api/v1/docs/pages/:id — update page content blocks */
        pageContent: (id: string) => `docs/pages/${id}`,
        /** POST /api/v1/docs/items — create a page or folder */
        items: 'docs/items',
        /** DELETE /api/v1/docs/items/:id — delete a page or folder */
        item: (id: string) => `docs/items/${id}`,
        /** PATCH /api/v1/docs/items/:id — rename a page or folder */
        itemRename: (id: string) => `docs/items/${id}`,
        /** PATCH /api/v1/docs/items/:id/move — move relative to a target node */
        itemMove: (id: string) => `docs/items/${id}/move`,
        /** POST /api/v1/docs/publish — publish draft tree to live documents */
        publish: 'docs/publish',
    },
    public: {
        documents: (userId: string) => `documents/${userId}`,
    }
}

export default apiPath
