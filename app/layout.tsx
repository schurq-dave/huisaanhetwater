import type { Metadata } from 'next'
import { Lato, Raleway } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/lib/data/site-config'
import { navigationData } from '@/lib/data/navigation'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-lato',
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['italic'],
  display: 'swap',
  variable: '--font-raleway',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className={`${lato.variable} ${raleway.variable}`}>
      <body suppressHydrationWarning>
        <Navbar data={navigationData} siteName={siteConfig.name || 'Huis aan het Water'} />
        <main id="main-content">{children}</main>
        <Footer data={navigationData} config={siteConfig} />
      </body>
    </html>
  )
}
