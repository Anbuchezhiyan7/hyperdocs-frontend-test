import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { ActionBtn, DeleteConfirm } from './shared-ui'
import { FooterSectionModal, FooterSectionFormData } from './footer-section-modal'
import { FooterSection } from '@/lib/nav-config-context'
import { useAppStore } from '@/lib/store/useAppStore'
import { IconNavPlus, IconNavTrash, IconNavEdit } from '@/components/shared/icons'
import { apiGetSettings } from '@/lib/api/auth'
import {
  apiCreateFooterSection,
  apiUpdateFooterSection,
  apiDeleteFooterSection,
} from '@/lib/api/navigation'

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

type ApiFooterItem = {
  menu_id: string
  menu_name: string
  menu_link: { link_name: string; link_url: string }[]
}

function toFooterSection(item: ApiFooterItem): FooterSection {
  return {
    id: item.menu_id,
    name: item.menu_name,
    links: (item.menu_link ?? []).map((l, idx) => ({
      id: `${item.menu_id}-${idx}`,
      label: l.link_name,
      url: l.link_url,
    })),
  }
}

export function FooterTab() {
  const { settings, setSettings } = useAppStore()
  const [editSection, setEditSection] = useState<FooterSection | null>(null)
  const [addOpen, setAddOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null)
  const [deleting, setDeleting] = useState(false)

  const apiFooter: ApiFooterItem[] = settings.navigation_footer?.footer ?? []
  const footerSections: FooterSection[] = apiFooter.map(toFooterSection)

  async function refreshSettings() {
    const res = await apiGetSettings()
    if (res.success) setSettings(res.data)
  }

  async function saveSection(data: FooterSectionFormData, menuId?: string) {
    const payload = {
      menu_name: data.name,
      menu_link: data.links.map(l => ({ link_name: l.label, link_url: l.url })),
    }
    const res = menuId
      ? await apiUpdateFooterSection(menuId, payload)
      : await apiCreateFooterSection([payload])
    if (!res.success) { toast.error(res.message); throw new Error(res.message) }
    await refreshSettings()
    fetch('/api/revalidate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tag: 'public-settings' }) })
    toast.success(menuId ? 'Footer section updated' : 'Footer section added')
  }

  async function deleteSection(menuId: string) {
    setDeleting(true)
    const res = await apiDeleteFooterSection(menuId)
    setDeleting(false)
    if (!res.success) { toast.error(res.message); return }
    setDeleteTarget(null)
    await refreshSettings()
    fetch('/api/revalidate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tag: 'public-settings' }) })
    toast.success('Footer section deleted')
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div />
        <button
          onClick={() => setAddOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f26522] hover:bg-[#d95318] text-white text-sm font-semibold border-none cursor-pointer transition-colors"
        >
          <IconNavPlus width="13" height="13" strokeWidth="2.5" />
          Add Footer Section
        </button>
      </div>

      {/* Table */}
      <div className="border border-hd-border rounded-xl overflow-hidden">
        <div className="grid grid-cols-[1.2fr_2fr_auto] items-center px-5 py-3 bg-hd-surface border-b border-hd-border">
          <span className="text-[0.72rem] font-bold uppercase tracking-wider text-hd-muted">Menu</span>
          <span className="text-[0.72rem] font-bold uppercase tracking-wider text-hd-muted">Links</span>
          <span className="text-[0.72rem] font-bold uppercase tracking-wider text-hd-muted">Actions</span>
        </div>

        {footerSections?.length === 0 && (
          <div className="py-10 text-center text-sm text-hd-muted">
            No footer sections yet. Add one to get started.
          </div>
        )}

        {footerSections?.map((section, i) => (
          <div
            key={section.id}
            className={`grid grid-cols-[1.2fr_2fr_auto] items-center px-5 py-4 ${i < (footerSections?.length || 0) - 1 ? 'border-b border-hd-border-soft' : ''
              }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-hd-text">{section.name}</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {section.links?.map(link => (
                <span
                  key={link.id}
                  className="px-2.5 py-1 rounded-lg text-[0.75rem] font-medium"
                  style={{ background: '#fff3ed', color: '#f26522' }}
                >
                  {link.label}
                </span>
              ))}
              {(!section.links || section.links?.length === 0) && (
                <span className="text-[0.78rem] text-hd-muted">No links</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <ActionBtn onClick={() => setEditSection(section)}>
                <IconNavEdit width="13" height="13" />
              </ActionBtn>
              <ActionBtn danger onClick={() => setDeleteTarget({ id: section.id, name: section.name })}>
                <IconNavTrash width="13" height="13" />
              </ActionBtn>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {addOpen && (
        <FooterSectionModal
          onSave={async data => { await saveSection(data); setAddOpen(false) }}
          onClose={() => setAddOpen(false)}
        />
      )}
      {editSection && (
        <FooterSectionModal
          initial={editSection}
          onSave={async data => { await saveSection(data, editSection.id); setEditSection(null) }}
          onClose={() => setEditSection(null)}
        />
      )}
      {deleteTarget && (
        <DeleteConfirm
          label={deleteTarget.name}
          loading={deleting}
          onConfirm={() => deleteSection(deleteTarget.id)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  )
}
