import type { Metadata } from 'next'
import { nieuwsPageData } from '@/lib/data/pages/nieuws'
import { buildMetadata } from '@/lib/seo/metadata'

export function generateMetadata(): Metadata {
  return buildMetadata(nieuwsPageData.seo)
}

export default function NieuwsPage() {
  return (
    <div>
      {/* TODO: build Nieuws overview page */}
    </div>
  )
}
