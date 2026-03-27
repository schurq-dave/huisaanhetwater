import type { SiteConfig } from '@/lib/types'

export function buildOrganizationJsonLd(config: SiteConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config.organization.name,
    legalName: config.organization.legalName,
    url: config.url,
    logo: {
      '@type': 'ImageObject',
      url: `${config.url}${config.organization.logoUrl}`,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: config.contact.phone,
      email: config.contact.email,
      contactType: 'customer service',
      availableLanguage: 'Dutch',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: config.contact.address.street,
      addressLocality: config.contact.address.city,
      postalCode: config.contact.address.postalCode,
      addressCountry: config.contact.address.countryCode,
    },
    sameAs: Object.values(config.social).filter(Boolean),
  }
}

export function buildWebPageJsonLd({
  url,
  title,
  description,
  organizationName,
  datePublished,
  dateModified,
}: {
  url: string
  title: string
  description: string
  organizationName: string
  datePublished?: string
  dateModified?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url,
    name: title,
    description,
    inLanguage: 'nl',
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    publisher: {
      '@type': 'Organization',
      name: organizationName,
    },
  }
}

export function buildFaqJsonLd(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function buildBreadcrumbJsonLd(crumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  }
}

export function buildEventJsonLd({
  name,
  startDate,
  endDate,
  location,
  description,
  url,
  organizerName,
}: {
  name: string
  startDate: string
  endDate?: string
  location?: string
  description: string
  url: string
  organizerName: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    startDate,
    ...(endDate && { endDate }),
    description,
    url,
    organizer: {
      '@type': 'Organization',
      name: organizerName,
    },
    ...(location && {
      location: {
        '@type': 'Place',
        name: location,
      },
    }),
  }
}
