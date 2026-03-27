import type { Metadata } from 'next'
import { contactPageData } from '@/lib/data/pages/contact'
import { buildMetadata } from '@/lib/seo/metadata'

export function generateMetadata(): Metadata {
  return buildMetadata(contactPageData.seo)
}

export default function ContactPage() {
  return (
    <div>
      {/* TODO: build Contact page with form */}
    </div>
  )
}
