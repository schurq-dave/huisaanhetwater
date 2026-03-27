import type { NavigationData } from '@/lib/types'

export const navigationData: NavigationData = {
  primary: [
    { label: 'Home', href: '/' },
    { label: 'Over ons', href: '/over-ons' },
    { label: 'Ons aanbod', href: '/aanbod' },
    { label: 'Agenda', href: '/agenda' },
    { label: 'Help ons', href: '/help-ons' },
    { label: 'Nieuws', href: '/nieuws' },
    { label: 'Voor zorgverleners', href: '/voor-zorgverleners' },
    { label: 'Contact', href: '/contact' },
  ],
  footer: [
    {
      title: 'Organisatie',
      items: [
        { label: 'Over ons', href: '/over-ons' },
        { label: 'Nieuws', href: '/nieuws' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Meedoen',
      items: [
        { label: 'Ons aanbod', href: '/aanbod' },
        { label: 'Agenda', href: '/agenda' },
        { label: 'Help ons', href: '/help-ons' },
      ],
    },
    {
      title: 'Professionals',
      items: [
        { label: 'Voor zorgverleners', href: '/voor-zorgverleners' },
      ],
    },
    {
      title: 'Juridisch',
      items: [
        { label: 'Privacybeleid', href: '/privacy' },
        { label: 'Cookiebeleid', href: '/cookies' },
        { label: 'Algemene voorwaarden', href: '/voorwaarden' },
      ],
    },
  ],
  cta: {
    label: 'Contact',
    href: '/contact',
  },
}
