// ─── Shared building blocks ───────────────────────────────────────────────────

export interface SeoData {
  metaTitle: string
  metaDescription: string
  slug: string
  keywords?: string[]
  ogImageUrl?: string
  noIndex?: boolean
}

export interface SiteConfig {
  name: string
  tagline: string
  description: string
  url: string
  locale: string
  contact: ContactInfo
  social: SocialLinks
  organization: OrganizationInfo
}

export interface ContactInfo {
  email: string
  phone: string
  address: AddressInfo
}

export interface AddressInfo {
  street: string
  city: string
  postalCode: string
  country: string
  countryCode: string
}

export interface SocialLinks {
  facebook?: string
  instagram?: string
  linkedin?: string
  twitter?: string
}

export interface OrganizationInfo {
  name: string
  legalName?: string
  foundingYear?: number
  logoUrl: string
}

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export interface NavigationData {
  primary: NavItem[]
  footer: FooterNavGroup[]
  cta: CtaButton
}

export interface FooterNavGroup {
  title: string
  items: NavItem[]
}

export interface CtaButton {
  label: string
  href: string
}

export interface ImageData {
  src: string
  alt: string
  width: number
  height: number
}

export interface RichTextBlock {
  // Placeholder for future Sanity Portable Text
  // Will be replaced by PortableTextBlock[] when migrating to Sanity
  html: string
}
