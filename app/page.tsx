import type { Metadata } from 'next'
import { homePageData } from '@/lib/data/pages/home'
import { buildMetadata } from '@/lib/seo/metadata'
import HeroSection from '@/components/home/hero-section'
import OverOnsSection from '@/components/home/over-ons-section'
import AanbodSection from '@/components/home/aanbod-section'
import LocatiesSection from '@/components/home/locaties-section'
import HelpOnsSection from '@/components/home/help-ons-section'
import ReviewsSection from '@/components/home/reviews-section'
import HoeWerkenWijSection from '@/components/home/hoe-werken-wij-section'
import PartnersSection from '@/components/home/partners-section'
import FaqSection from '@/components/home/faq-section'

export function generateMetadata(): Metadata {
  return buildMetadata(homePageData.seo)
}

export default function HomePage() {
  return (
    <>
      <HeroSection data={homePageData.hero} />
      <OverOnsSection data={homePageData.overOns} />
      <AanbodSection data={homePageData.aanbod} />
      <LocatiesSection data={homePageData.locaties} />
      <HelpOnsSection data={homePageData.helpOns} />
      <ReviewsSection data={homePageData.reviews} />
      <HoeWerkenWijSection data={homePageData.hoeWerkenWij} />
      <PartnersSection data={homePageData.partners} />
      <FaqSection data={homePageData.faq} />
    </>
  )
}
