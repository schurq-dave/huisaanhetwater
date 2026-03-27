import type { Metadata } from 'next'
import { helpOnsPageData } from '@/lib/data/pages/help-ons'
import { buildMetadata } from '@/lib/seo/metadata'

export function generateMetadata(): Metadata {
  return buildMetadata(helpOnsPageData.seo)
}

export default function HelpOnsPage() {
  return (
    <div>
      {/* TODO: build Help ons page sections */}
    </div>
  )
}
