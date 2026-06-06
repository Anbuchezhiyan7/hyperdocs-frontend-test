import { HyperDocsSettings } from '@/lib/settings-types'
import { NavConfig } from '@/lib/nav-config-context'
import { SiteConfig } from '@/lib/site-config-context'

export function mapSettingsToNavConfig(s: HyperDocsSettings): NavConfig {
  const { navigation_footer } = s

  const headerItems = (navigation_footer.navigation ?? []).map((item) => ({
    id: item.menu_id,
    label: item.menu_name,
    url: item.menu_link,
  }))

  const cta = navigation_footer.headerCTA
  const headerCTA = {
    label: cta?.label ?? 'Get Started',
    url: cta?.url ?? '',
    buttonColor: cta?.buttonColor ?? '#ffffff',
    bgColor: cta?.backgroundColor ?? '#f26522',
    enabled: !!cta,
  }

  const footerSections = (navigation_footer.footer ?? []).map((section) => ({
    id: section.menu_id,
    name: section.menu_name,
    links: (section.menu_link ?? []).map((link, i) => ({
      id: `${section.menu_id}-${i}`,
      label: link.link_name,
      url: link.link_url,
    })),
  }))

  return { headerItems, headerCTA, footerSections }
}

function safeUrl(val: string | null | undefined): string {
  return val && typeof val === 'string' && val.trim() !== '' ? val : ''
}

export function mapSettingsToSiteConfig(s: HyperDocsSettings): SiteConfig {
  const { general } = s
  return {
    organizationName: general.organization_name || 'Hyperdocs',
    logoUrl: '',
    logoUrlDark: safeUrl(general.organization_logo?.dark_mode_logo?.url),
    logoUrlLight: safeUrl(general.organization_logo?.light_mode_logo?.url),
    logoLinkUrl: safeUrl(general.organization_logo?.url),
    faviconUrl: safeUrl(general.favicon_image),
    description: general.description ?? '',
  }
}
