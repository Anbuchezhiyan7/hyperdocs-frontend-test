'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useAuth } from '@/lib/auth-provider'
import { useAppStore } from '@/lib/store/useAppStore'
import { apiGetSettings } from '@/lib/api/auth'
import { apiUploadImage, apiSaveGeneralSettings, apiUpdateGeneralSettings, apiDeleteImage, ImageAsset } from '@/lib/api/settings'
import { ImageUploadSection } from './general-panel/image-upload-section'
import { AccentColorField } from './general-panel/accent-color-field'

interface GeneralSettingsInput {
  organizationName: string
  accentColor: string
  removeBranding: boolean
  description: string
  logoUrl: string
}

export function GeneralPanel() {
  const MAX_LOGO_SIZE = 2 * 1024 * 1024 // 2 MB

  const [saving, setSaving] = useState(false)
  const [faviconUploading, setFaviconUploading] = useState(false)
  const [darkLogoUploading, setDarkLogoUploading] = useState(false)
  const [lightLogoUploading, setLightLogoUploading] = useState(false)
  const [favicon, setFavicon] = useState<ImageAsset | null>(null)
  const [darkLogo, setDarkLogo] = useState<ImageAsset | null>(null)
  const [lightLogo, setLightLogo] = useState<ImageAsset | null>(null)
  const savedImages = useRef({ favicon: null as ImageAsset | null, darkLogo: null as ImageAsset | null, lightLogo: null as ImageAsset | null })

  const { user } = useAuth()
  const { settings, setSettings } = useAppStore()
  const faviconInputRef = useRef<HTMLInputElement>(null)
  const darkLogoInputRef = useRef<HTMLInputElement>(null)
  const lightLogoInputRef = useRef<HTMLInputElement>(null)

  const { register, handleSubmit, control, formState: { errors, isDirty }, reset } = useForm<GeneralSettingsInput>({
    defaultValues: { organizationName: '', accentColor: '#f26522', removeBranding: false, description: '', logoUrl: '' }
  })

  const { isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const res = await apiGetSettings()
      if (res.success) setSettings(res.data)
      return res.data
    },
  })

  useEffect(() => {
    const g = settings?.general || ({} as any)
    reset({
      organizationName: g?.organization_name ?? user?.name ?? '',
      accentColor: g?.accent_color ?? '#f26522',
      removeBranding: g?.show_hyperblog_branding === false,
      description: g?.description ?? '',
      logoUrl: g?.organization_logo?.url ?? '',
    })
    if (g?.accent_color) document.documentElement.style.setProperty('--hd-accent', g.accent_color)
    const faviconAsset = g?.favicon_image?.url ? { image_id: g.favicon_image.image_id, url: g.favicon_image.url } : null
    const dark = g?.organization_logo?.dark_mode_logo
    const light = g?.organization_logo?.light_mode_logo
    const darkAsset = dark?.url ? { image_id: dark.image_id!, url: dark.url } : null
    const lightAsset = light?.url ? { image_id: light.image_id!, url: light.url } : null
    setFavicon(faviconAsset)
    setDarkLogo(darkAsset)
    setLightLogo(lightAsset)
    savedImages.current = { favicon: faviconAsset, darkLogo: darkAsset, lightLogo: lightAsset }
  }, [settings?.general])

  async function handleImageUpload(
    file: File,
    setUploading: (v: boolean) => void,
    setAsset: (a: ImageAsset) => void,
    maxSize = Infinity,
  ) {
    if (file.size > maxSize) {
      toast.error(`File size must not exceed ${Math.round(maxSize / 1024 / 1024)} MB`)
      return
    }
    setUploading(true)
    const res = await apiUploadImage(file)
    setUploading(false)
    if (res.success) setAsset({ image_id: res.data.image_id, url: res.data.url })
    else toast.error(res.message)
  }

  async function removeAsset(asset: ImageAsset | null, setAsset: (a: ImageAsset | null) => void, inputRef: React.RefObject<HTMLInputElement | null>) {
    if (asset?.image_id) await apiDeleteImage(asset.image_id)
    setAsset(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  async function refreshSettings() {
    const res = await apiGetSettings()
    if (res.success) setSettings(res.data)
  }

  const imagesChanged =
    favicon?.image_id !== savedImages.current.favicon?.image_id ||
    darkLogo?.image_id !== savedImages.current.darkLogo?.image_id ||
    lightLogo?.image_id !== savedImages.current.lightLogo?.image_id
  const hasChanges = isDirty || imagesChanged

  const onSubmit = async (data: GeneralSettingsInput) => {
    setSaving(true)
    const payload = {
      organization_name: data.organizationName,
      description: data.description,
      accent_color: data.accentColor,
      show_hyperblog_branding: !data.removeBranding,
      organization_logo: {
        url: data.logoUrl || null,
        dark_mode_logo: darkLogo,
        light_mode_logo: lightLogo,
      },
      favicon_image: favicon,
    }
    const isNew = !settings?.general?.organization_name
    const res = isNew ? await apiSaveGeneralSettings(payload) : await apiUpdateGeneralSettings(payload)
    setSaving(false)
    if (res.success) {
      document.documentElement.style.setProperty('--hd-accent', data.accentColor)
      savedImages.current = { favicon, darkLogo, lightLogo }
      fetch('/api/revalidate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tag: 'public-settings' }) })
      toast.success('General settings saved successfully')
      refreshSettings()
    } else {
      toast.error(res.message)
    }
  }

  if (isLoading) return <GeneralPanelSkeleton />

  return (
    <div className="flex-1 overflow-y-auto bg-hd-bg text-hd-text">
      <div className="max-w-[660px] mx-auto px-6 py-10 md:px-8 flex flex-col">
        <h1 className="text-2xl font-bold mb-1.5">General Settings</h1>
        <p className="text-sm font-semibold text-hd-text-soft mb-8">
          Manage your organization details, logos, favicon, and brand colors.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">

          {/* Organization Name */}
          <div>
            <label className="block text-[0.82rem] font-bold text-hd-text mb-2">
              Organization Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your organization name"
              {...register('organizationName', { required: 'Organization name is required' })}
              className={`w-full px-3.5 py-2.5 rounded-lg border bg-hd-bg text-hd-text text-sm outline-none transition-colors ${errors.organizationName ? 'border-red-500' : 'border-hd-border focus:border-[#f26522]'}`}
            />
            {errors.organizationName && <p className="text-red-500 text-[0.75rem] mt-1 font-medium">{errors.organizationName.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-[0.82rem] font-bold text-hd-text mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              placeholder="Enter your site description"
              {...register('description', { required: 'Description is required' })}
              className={`w-full px-3.5 py-2.5 rounded-lg border bg-hd-bg text-hd-text text-sm outline-none transition-colors ${errors.description ? 'border-red-500' : 'border-hd-border focus:border-[#f26522]'}`}
            />
            {errors.description && <p className="text-red-500 text-[0.75rem] mt-1 font-medium">{errors.description.message}</p>}
          </div>

          <div className="h-px bg-hd-border-soft" />

          {/* Email */}
          <div>
            <label className="block text-[0.82rem] font-bold text-hd-text mb-1.5">Email</label>
            <div className="text-sm text-hd-muted py-1">{user?.email || 'N/A'}</div>
          </div>

          <div className="h-px bg-hd-border-soft" />

          <ImageUploadSection
            label="Logo — Dark Mode"
            hint="Shown when the site is in dark mode. Overrides the default logo. (Preferred: transparent PNG, max 2 MB)"
            uploadLabel="Click to upload dark mode logo"
            asset={darkLogo}
            uploading={darkLogoUploading}
            onFileChange={e => { const f = e.target.files?.[0]; if (f) handleImageUpload(f, setDarkLogoUploading, setDarkLogo, MAX_LOGO_SIZE) }}
            onRemove={() => removeAsset(darkLogo, setDarkLogo, darkLogoInputRef)}
            inputRef={darkLogoInputRef}
          />

          <ImageUploadSection
            label="Logo — Light Mode"
            hint="Shown when the site is in light mode. Overrides the default logo. (Preferred: transparent PNG, max 2 MB)"
            uploadLabel="Click to upload light mode logo"
            asset={lightLogo}
            uploading={lightLogoUploading}
            onFileChange={e => { const f = e.target.files?.[0]; if (f) handleImageUpload(f, setLightLogoUploading, setLightLogo, MAX_LOGO_SIZE) }}
            onRemove={() => removeAsset(lightLogo, setLightLogo, lightLogoInputRef)}
            inputRef={lightLogoInputRef}
          />

          {/* Logo Link URL */}
          <div>
            <label className="block text-[0.82rem] font-bold text-hd-text mb-1">Logo Link URL</label>
            <p className="text-[0.82rem] text-hd-muted mb-2">
              This URL will be linked to the logo in the header and footer.
            </p>
            <input
              type="url"
              placeholder="https://example.com"
              {...register('logoUrl')}
              className="w-full px-3.5 py-2.5 rounded-lg border border-hd-border bg-hd-bg text-hd-text text-sm outline-none transition-colors focus:border-[#f26522]"
            />
          </div>

          <ImageUploadSection
            label="Favicon"
            hint="Shown in the browser tab. (Preferred: square transparent PNG/ICO)"
            uploadLabel="Click to upload favicon"
            asset={favicon}
            uploading={faviconUploading}
            onFileChange={e => { const f = e.target.files?.[0]; if (f) handleImageUpload(f, setFaviconUploading, setFavicon) }}
            onRemove={() => removeAsset(favicon, setFavicon, faviconInputRef)}
            inputRef={faviconInputRef}
          />

          <div className="h-px bg-hd-border-soft" />

          <AccentColorField control={control} name="accentColor" />

          <div className="h-px bg-hd-border-soft" />

          {/* Remove Branding */}
          <div className="flex items-center justify-between py-2">
            <div>
              <label className="block text-sm font-bold text-hd-text m-0">Remove Hyperdocs branding</label>
              <span className="text-[0.78rem] text-hd-muted">Upgrade to remove logo</span>
            </div>
            <Controller
              name="removeBranding"
              control={control}
              render={({ field }) => (
                <button
                  type="button"
                  onClick={() => field.onChange(!field.value)}
                  className={`w-11 h-6 rounded-full relative border-0 cursor-pointer transition-colors duration-200 p-0 flex items-center ${field.value ? 'bg-[#f26522]' : 'bg-hd-border'}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white absolute transition-all duration-200 shadow-sm ${field.value ? 'left-[22px]' : 'left-0.5'}`} />
                </button>
              )}
            />
          </div>

          <div className="h-px bg-hd-border-soft" />

          {/* Actions */}
          <div className="flex items-center gap-3 justify-end mt-2">
            <button
              type="submit"
              disabled={saving || !hasChanges}
              className="px-6 py-2.5 rounded-lg bg-[#f26522] hover:bg-[#d95318] disabled:opacity-50 text-white border-0 font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {saving && (
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              )}
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

function Bone({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-lg bg-hd-border-soft ${className}`} />
}

function GeneralPanelSkeleton() {
  return (
    <div className="flex-1 overflow-y-auto bg-hd-bg text-hd-text">
      <div className="max-w-[660px] mx-auto px-6 py-10 md:px-8 flex flex-col gap-7">
        {/* Header */}
        <div className="flex flex-col gap-2 mb-1">
          <Bone className="h-7 w-48" />
          <Bone className="h-4 w-72" />
        </div>

        {/* Organization Name */}
        <div className="flex flex-col gap-2">
          <Bone className="h-3.5 w-36" />
          <Bone className="h-10 w-full" />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <Bone className="h-3.5 w-24" />
          <Bone className="h-20 w-full" />
        </div>

        <div className="h-px bg-hd-border-soft" />

        {/* Email */}
        <div className="flex flex-col gap-2">
          <Bone className="h-3.5 w-12" />
          <Bone className="h-4 w-48" />
        </div>

        <div className="h-px bg-hd-border-soft" />

        {/* Dark logo */}
        <div className="flex flex-col gap-2">
          <Bone className="h-3.5 w-36" />
          <Bone className="h-3 w-80" />
          <Bone className="h-[100px] w-[320px]" />
        </div>

        {/* Light logo */}
        <div className="flex flex-col gap-2">
          <Bone className="h-3.5 w-36" />
          <Bone className="h-3 w-80" />
          <Bone className="h-[100px] w-[320px]" />
        </div>

        {/* Logo URL */}
        <div className="flex flex-col gap-2">
          <Bone className="h-3.5 w-28" />
          <Bone className="h-3 w-64" />
          <Bone className="h-10 w-full" />
        </div>

        {/* Favicon */}
        <div className="flex flex-col gap-2">
          <Bone className="h-3.5 w-16" />
          <Bone className="h-3 w-56" />
          <Bone className="h-[100px] w-[320px]" />
        </div>

        <div className="h-px bg-hd-border-soft" />

        {/* Accent color */}
        <div className="flex flex-col gap-2">
          <Bone className="h-3.5 w-24" />
          <Bone className="h-10 w-40" />
        </div>

        <div className="h-px bg-hd-border-soft" />

        {/* Branding toggle */}
        <div className="flex items-center justify-between py-2">
          <div className="flex flex-col gap-2">
            <Bone className="h-4 w-44" />
            <Bone className="h-3 w-32" />
          </div>
          <Bone className="h-6 w-11 rounded-full" />
        </div>

        <div className="h-px bg-hd-border-soft" />

        {/* Save button */}
        <div className="flex justify-end mt-2">
          <Bone className="h-10 w-20" />
        </div>
      </div>
    </div>
  )
}
