import type { SeoData, ImageData, CtaButton, RichTextBlock } from './shared'

// ─── 1. Home ─────────────────────────────────────────────────────────────────

/** Sectie 1 — Hero */
export interface HomeHero {
  heading: string
  subtext: string
  ctaPrimary: CtaButton
  ctaSecondary?: CtaButton
  image: ImageData
}

/** Sectie 2 — Over Stichting Huis aan het Water */
export interface HomeOverOns {
  label: string          // e.g. "Over ons"
  heading: string
  body: string
  highlights: string[]   // 3–4 korte USP-zinnen
  cta: CtaButton
  image: ImageData
}

/** Sectie 3 — Locaties split */
export type LocatieSlug = 'katwoude' | 'amsterdam-noord'

export interface Locatie {
  slug: LocatieSlug
  name: string
  tagline: string
  description: string
  aanbodPreview: string[]  // 3–4 activiteiten
  image: ImageData
  href: string
  agendaItems?: AgendaItem[]  // eerstvolgende activiteiten voor preview
}

export interface HomeLocaties {
  heading: string
  subtext?: string
  items: [Locatie, Locatie]  // altijd exact 2
}

/** Sectie 4 — Help ons */
export type HelpOnsDoelgroep = 'particulier' | 'organisatie' | 'vrijwilliger'

export interface HelpOnsCard {
  doelgroep: HelpOnsDoelgroep
  icon: string
  title: string
  description: string
  cta: CtaButton
}

export interface HomeHelpOns {
  label: string
  heading: string
  subtext?: string
  cards: [HelpOnsCard, HelpOnsCard, HelpOnsCard]  // altijd 3
}

/** Sectie 5 — Gastreviews */
export interface GastReview {
  id: string
  quote: string
  guestName: string
  guestRole?: string       // e.g. "Gast, april 2024"
  image: ImageData         // portret of sfeerbeeld
  storyHref?: string       // doorklik naar volledig verhaal
}

export interface HomeReviews {
  heading: string
  subtext?: string
  items: GastReview[]
}

/** Sectie 6 — Hoe werken wij */
export interface HoeWerkenWijStep {
  number: string           // "01", "02", …
  title: string
  description: string
}

export interface HomeHoeWerkenWij {
  label: string
  heading: string
  body: string
  steps: HoeWerkenWijStep[]
  image: ImageData
}

/** Sectie 7 — Partners / sponsors */
export interface Partner {
  name: string
  logoUrl: string
  href?: string
}

export interface HomePartners {
  label: string            // "Mede mogelijk gemaakt door"
  items: Partner[]
}

/** Sectie 8 — FAQ */
export interface FaqItem {
  question: string
  answer: string
}

export interface HomeFaq {
  heading: string
  items: FaqItem[]
}

/** Volledige homepage data */
export interface HomePageData {
  seo: SeoData
  hero: HomeHero
  overOns: HomeOverOns
  locaties: HomeLocaties
  helpOns: HomeHelpOns
  reviews: HomeReviews
  hoeWerkenWij: HomeHoeWerkenWij
  partners: HomePartners
  faq: HomeFaq
}

// ─── 2. Over ons ─────────────────────────────────────────────────────────────

export interface OverOnsPageData {
  seo: SeoData
}

// ─── 3. Ons aanbod ───────────────────────────────────────────────────────────

export interface Thema {
  slug: string
  title: string
  summary: string
  image?: ImageData
  body?: RichTextBlock
}

export interface AanbodPageData {
  seo: SeoData
  themas: Thema[]
}

// ─── 4. Agenda ───────────────────────────────────────────────────────────────

export type AgendaItemType = 'activiteit' | 'evenement' | 'bijeenkomst' | 'overig'

export interface AgendaItem {
  id: string
  title: string
  type: AgendaItemType
  date: string        // ISO 8601 date string
  endDate?: string    // ISO 8601 — for multi-day events
  time?: string       // e.g. "14:00 – 16:00"
  location?: string
  description: string
  image?: ImageData
  registrationUrl?: string
  isFull?: boolean
}

export interface AgendaPageData {
  seo: SeoData
  items: AgendaItem[]
}

// ─── 5. Help ons ─────────────────────────────────────────────────────────────

export interface HelpOnsWay {
  icon: string
  title: string
  description: string
  cta?: CtaButton
}

export interface HelpOnsPageData {
  seo: SeoData
  ways: HelpOnsWay[]
}

// ─── 6. Nieuws ───────────────────────────────────────────────────────────────

export interface NieuwsItem {
  slug: string
  title: string
  publishedAt: string  // ISO 8601
  category?: string
  excerpt: string
  image?: ImageData
  body?: RichTextBlock
}

export interface NieuwsPageData {
  seo: SeoData
  items: NieuwsItem[]
}

export interface NieuwsDetailPageData {
  seo: SeoData
  item: NieuwsItem
}

// ─── 7. Voor zorgverleners ───────────────────────────────────────────────────

export interface ZorgverlenerResource {
  title: string
  description: string
  fileUrl?: string
  externalUrl?: string
  category: string
}

export interface VoorZorgverlenerPageData {
  seo: SeoData
  resources: ZorgverlenerResource[]
}

// ─── 8. Contact ──────────────────────────────────────────────────────────────

export interface ContactPageData {
  seo: SeoData
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
}

export interface FormResponse {
  success: boolean
  message: string
}

// ─── 9. Legal pages ──────────────────────────────────────────────────────────

export interface LegalPageData {
  seo: SeoData
  title: string
  lastUpdated: string  // ISO 8601
  body: RichTextBlock
}
