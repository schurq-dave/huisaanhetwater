import type { Metadata } from 'next'
import type { SeoData } from '@/lib/types'
import { siteConfig } from '@/lib/data/site-config'

export function buildMetadata(seo: SeoData): Metadata {
  const canonicalUrl = `${siteConfig.url}${seo.slug === '/' ? '' : seo.slug}`
  const ogImage = seo.ogImageUrl
    ? `${siteConfig.url}${seo.ogImageUrl}`
    : `${siteConfig.url}/images/og-default.jpg`

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
    robots: seo.noIndex ? 'noindex, nofollow' : 'index, follow',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: seo.metaTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.metaTitle,
      description: seo.metaDescription,
      images: [ogImage],
    },
  }
}
