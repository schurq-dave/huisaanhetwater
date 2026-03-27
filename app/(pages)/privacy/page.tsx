import type { Metadata } from 'next'
import { privacyPageData } from '@/lib/data/pages/legal'
import { buildMetadata } from '@/lib/seo/metadata'

export function generateMetadata(): Metadata {
  return buildMetadata(privacyPageData.seo)
}

export default function PrivacyPage() {
  return (
    <div>
      {/* TODO: build Privacy page with legal content */}
    </div>
  )
}
