import type { Metadata } from 'next'
import { voorZorgverlenerPageData } from '@/lib/data/pages/voor-zorgverleners'
import { buildMetadata } from '@/lib/seo/metadata'

export function generateMetadata(): Metadata {
  return buildMetadata(voorZorgverlenerPageData.seo)
}

export default function VoorZorgverlenerPage() {
  return (
    <div>
      {/* TODO: build Voor zorgverleners page sections */}
    </div>
  )
}
