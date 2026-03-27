import type { Metadata } from 'next'
import { voorwaardenPageData } from '@/lib/data/pages/legal'
import { buildMetadata } from '@/lib/seo/metadata'

export function generateMetadata(): Metadata {
  return buildMetadata(voorwaardenPageData.seo)
}

export default function VoorwaardenPage() {
  return (
    <div>
      {/* TODO: build Algemene voorwaarden page with legal content */}
    </div>
  )
}
