import type { Metadata } from 'next'
import { agendaPageData } from '@/lib/data/pages/agenda'
import { buildMetadata } from '@/lib/seo/metadata'

export function generateMetadata(): Metadata {
  return buildMetadata(agendaPageData.seo)
}

export default function AgendaPage() {
  return (
    <div>
      {/* TODO: build Agenda page sections */}
    </div>
  )
}
