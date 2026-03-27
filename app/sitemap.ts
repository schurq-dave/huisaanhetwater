import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/data/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/over-ons`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/aanbod`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/agenda`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/help-ons`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/nieuws`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/voor-zorgverleners`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    // Legal pages are noIndex — omit from sitemap
  ]
}
