import type { Metadata } from 'next'
import { overOnsPageData } from '@/lib/data/pages/over-ons'
import { buildMetadata } from '@/lib/seo/metadata'

export function generateMetadata(): Metadata {
  return buildMetadata(overOnsPageData.seo)
}

export default function OverOnsPage() {
  return (
    <div>
      {/* TODO: build Over ons page sections */}
    </div>
  )
}
