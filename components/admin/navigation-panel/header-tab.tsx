import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { ActionBtn, DeleteConfirm } from './shared-ui'
import { HeaderItemModal } from './header-item-modal'
import { CTAModal } from './cta-modal'
import { HeaderItemFormData } from './header-item-modal'
import { CTAFormData } from './cta-modal'
import { IconNavPlus, IconNavTrash, IconNavEdit, IconNavSettings } from '@/components/shared/icons'
import { useAppStore } from '@/lib/store/useAppStore'
import { apiGetSettings } from '@/lib/api/auth'
import {
  apiCreateNavItem,
  apiUpdateNavItem,
  apiDeleteNavItem,
  apiCreateHeaderCta,
  apiUpdateHeaderCta,
} from '@/lib/api/navigation'
import { NavConfig } from '@/lib/nav-config-context'

type NavItem = { menu_id: string; menu_name: string; menu_link: string }
type ApiCTA = {
  header_cta_id: string | null
  label: string | null
  buttonColor: string | null
  backgroundColor: string | null
  url: string | null
}

export function HeaderTab() {
  const { settings, setSettings } = useAppStore()
  const [editItem, setEditItem] = useState<{ id: string; label: string; url: string } | null>(null)
  const [addOpen, setAddOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; label: string } | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [ctaOpen, setCtaOpen] = useState(false)

  const navItems: NavItem[] = settings.navigation_footer?.navigation ?? []
  const apiCTA: ApiCTA = settings.navigation_footer?.headerCTA ?? {
    header_cta_id: null, label: null, buttonColor: null, backgroundColor: null, url: null,
  }

  async function refreshSettings() {
    const res = await apiGetSettings()
    if (res.success) setSettings(res.data)
  }

  async function saveItem(data: HeaderItemFormData, menuId?: string) {
    const res = menuId
      ? await apiUpdateNavItem(menuId, { menu_name: data.label, menu_link: data.url })
      : await apiCreateNavItem([{ menu_name: data.label, menu_link: data.url }])
    if (!res.success) { toast.error(res.message); throw new Error(res.message) }
    await refreshSettings()
    fetch('/api/revalidate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tag: 'public-settings' }) })
    toast.success(menuId ? 'Navigation updated successfully' : 'Navigation saved successfully')
  }

  async function deleteItem(menuId: string) {
    setDeleting(true)
    const res = await apiDeleteNavItem(menuId)
    setDeleting(false)
    if (!res.success) { toast.error(res.message); return }
    setDeleteTarget(null)
    await refreshSettings()
    fetch('/api/revalidate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tag: 'public-settings' }) })
    toast.success('Menu item deleted')
  }

  async function saveCTA(data: CTAFormData) {
    const payload = { label: data.label, url: data.url, buttonColor: data.buttonColor, backgroundColor: data.bgColor }
    const res = apiCTA.header_cta_id
      ? await apiUpdateHeaderCta(apiCTA.header_cta_id, payload)
      : await apiCreateHeaderCta(payload)
    if (!res.success) { toast.error(res.message); throw new Error(res.message) }
    await refreshSettings()
    fetch('/api/revalidate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tag: 'public-settings' }) })
    toast.success('Header CTA saved')
  }

  // Build a NavConfig['headerCTA'] shape for CTAModal
  const ctaForModal: NavConfig['headerCTA'] = {
    label: apiCTA.label ?? 'Get Started',
    url: apiCTA.url ?? 'https://hyperdocs.io',
    buttonColor: apiCTA.buttonColor ?? '#ffffff',
    bgColor: apiCTA.backgroundColor ?? '#f26522',
    enabled: true,
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Add item */}
      <button
        onClick={() => setAddOpen(true)}
        className="self-end flex items-center gap-2 px-4 py-2 rounded-xl border border-hd-border text-sm font-semibold text-hd-text bg-transparent hover:bg-hd-surface cursor-pointer transition-colors"
      >
        <IconNavPlus width="13" height="13" strokeWidth="2.5" />
        Add Menu Item
      </button>

      {/* Header Navigation Table */}
      <div className="border border-hd-border rounded-xl overflow-hidden">
        <div className="grid grid-cols-[1fr_2fr_auto] items-center px-5 py-3 bg-hd-surface border-b border-hd-border">
          <span className="text-[0.72rem] font-bold uppercase tracking-wider text-hd-muted">Menu</span>
          <span className="text-[0.72rem] font-bold uppercase tracking-wider text-hd-muted">URL</span>
          <span className="text-[0.72rem] font-bold uppercase tracking-wider text-hd-muted">Actions</span>
        </div>

        {navItems?.length === 0 && (
          <div className="py-10 text-center text-sm text-hd-muted">
            No header menu items yet.
          </div>
        )}

        {navItems?.map((item, i) => (
          <div
            key={item.menu_id}
            className={`grid grid-cols-[1fr_2fr_auto] items-center px-5 py-4 ${
              i < (navItems?.length || 0) - 1 ? 'border-b border-hd-border-soft' : ''
            }`}
          >
            <span className="text-sm font-medium text-hd-text">{item.menu_name}</span>
            <a
              href={item.menu_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium truncate max-w-[320px]"
              style={{ color: '#f26522' }}
            >
              {item.menu_link}
            </a>
            <div className="flex items-center gap-2">
              <ActionBtn onClick={() => setEditItem({ id: item.menu_id, label: item.menu_name, url: item.menu_link })}>
                <IconNavEdit width="13" height="13" />
              </ActionBtn>
              <ActionBtn danger onClick={() => setDeleteTarget({ id: item.menu_id, label: item.menu_name })}>
                <IconNavTrash width="13" height="13" />
              </ActionBtn>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-hd-border-soft" />

      {/* Header CTA */}
      <div>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-hd-text mb-1">Header CTA</h3>
            <p className="text-[0.78rem] text-hd-muted">
              One call-to-action button displayed at the top right of the navigation bar.
            </p>
          </div>
        </div>

        <div className="border border-hd-border rounded-xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="px-4 py-2 rounded-lg text-sm font-bold border-none cursor-default shrink-0"
              style={{ background: ctaForModal.bgColor, color: ctaForModal.buttonColor }}
            >
              {ctaForModal.label}
            </button>
            <div>
              <p className="text-[0.82rem] font-semibold text-hd-text mb-0.5">{ctaForModal.label}</p>
              <a
                href={ctaForModal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.78rem] truncate max-w-[240px] block"
                style={{ color: '#f26522' }}
              >
                {ctaForModal.url}
              </a>
            </div>
          </div>
          <button
            onClick={() => setCtaOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-hd-border text-[0.8rem] font-semibold text-hd-text bg-transparent hover:bg-hd-surface cursor-pointer transition-colors shrink-0"
          >
            <IconNavSettings width="12" height="12" />
            Configure
          </button>
        </div>
      </div>

      {/* Modals */}
      {addOpen && (
        <HeaderItemModal
          onSave={async data => { await saveItem(data); setAddOpen(false) }}
          onClose={() => setAddOpen(false)}
        />
      )}
      {editItem && (
        <HeaderItemModal
          initial={{ id: editItem.id, label: editItem.label, url: editItem.url }}
          onSave={async data => { await saveItem(data, editItem.id); setEditItem(null) }}
          onClose={() => setEditItem(null)}
        />
      )}
      {deleteTarget && (
        <DeleteConfirm
          label={deleteTarget.label}
          loading={deleting}
          onConfirm={() => deleteItem(deleteTarget.id)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
      {ctaOpen && (
        <CTAModal
          initial={ctaForModal}
          onSave={async data => { await saveCTA(data); setCtaOpen(false) }}
          onClose={() => setCtaOpen(false)}
        />
      )}
    </div>
  )
}
