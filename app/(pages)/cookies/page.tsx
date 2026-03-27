import type { Metadata } from 'next'
import { cookiesPageData } from '@/lib/data/pages/legal'
import { buildMetadata } from '@/lib/seo/metadata'

export function generateMetadata(): Metadata {
  return buildMetadata(cookiesPageData.seo)
}

export default function CookiesPage() {
  return (
    <div>
      {/* TODO: build Cookies page with legal content */}
    </div>
  )
}
