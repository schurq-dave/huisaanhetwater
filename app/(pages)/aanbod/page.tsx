import type { Metadata } from 'next'
import { aanbodPageData } from '@/lib/data/pages/aanbod'
import { buildMetadata } from '@/lib/seo/metadata'

export function generateMetadata(): Metadata {
  return buildMetadata(aanbodPageData.seo)
}

export default function AanbodPage() {
  return (
    <div>
      {/* TODO: build Ons aanbod page sections */}
    </div>
  )
}
