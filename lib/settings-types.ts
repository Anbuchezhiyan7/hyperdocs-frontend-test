export interface OrgLogo {
  image_id: string | null
  url: string | null
}

export interface GeneralSettings {
  organization_name: string
  organization_logo: {
    url: string | null
    dark_mode_logo: OrgLogo | null
    light_mode_logo: OrgLogo | null
  }
  accent_color: string
  description: string
  favicon_image: string | null
  show_hyperblog_branding: boolean
  document_mode?: 'default' | 'blank' | 'git' | null
}

export interface NavMenuItem {
  menu_id: string
  menu_name: string
  menu_link: string
}

export interface FooterMenuLink {
  link_name: string
  link_url: string
}

export interface FooterMenuItem {
  menu_id: string
  menu_name: string
  menu_link: FooterMenuLink[]
}

export interface HeaderCTASettings {
  header_cta_id: string
  label: string
  buttonColor: string
  backgroundColor: string
  url: string
}

export interface NavigationFooterSettings {
  navigation: NavMenuItem[]
  footer: FooterMenuItem[]
  headerCTA: HeaderCTASettings
}

export interface HyperDocsSettings {
  user_id: string
  general: GeneralSettings
  navigation_footer: NavigationFooterSettings
}
