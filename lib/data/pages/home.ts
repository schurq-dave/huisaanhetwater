import type { HomePageData } from '@/lib/types'
import { agendaPageData } from './agenda'

function upcomingByLocation(slug: string, count = 3) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return agendaPageData.items
    .filter((item) => item.location === slug && new Date(item.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, count)
}

export const homePageData: HomePageData = {
  seo: {
    metaTitle: 'Stichting Huis aan het Water — Natuur, rust en verbinding',
    metaDescription:
      'Stichting Huis aan het Water biedt bijzondere ervaringen aan het water voor mensen die het even nodig hebben. Ontdek ons aanbod in Katwoude en Amsterdam Noord.',
    slug: '/',
    keywords: ['huis aan het water', 'stichting', 'zorg', 'natuur', 'welzijn'],
    ogImageUrl: '/images/og-home.jpg',
  },

  // ── Sectie 1: Hero ────────────────────────────────────────────────────────
  hero: {
    heading: 'Natuur, rust en verbinding voor iedereen',
    subtext:
      'Stichting Huis aan het Water biedt bijzondere ervaringen aan het water — voor mensen die even op adem willen komen.',
    ctaPrimary: {
      label: 'Ons aanbod',
      href: '/aanbod',
    },
    ctaSecondary: {
      label: 'Over ons',
      href: '/over-ons',
    },
    image: {
      src: '/images/hero.jpg',
      alt: 'Uitzicht over het water bij Huis aan het Water',
      width: 1440,
      height: 810,
    },
  },

  // ── Sectie 2: Over Stichting Huis aan het Water ───────────────────────────
  overOns: {
    label: 'Over ons',
    heading: 'Een bijzondere plek voor mensen die het nodig hebben',
    body: 'Stichting Huis aan het Water gelooft in de helende kracht van natuur en water. Wij bieden een veilige, warme omgeving waar mensen — ongeacht achtergrond of situatie — kunnen uitrusten, verbinding vinden en nieuwe energie opdoen.',
    highlights: [],
    cta: {
      label: 'Meer over ons',
      href: '/over-ons',
    },
    image: {
      src: '/images/over-ons.jpg',
      alt: 'Gasten genieten van de natuur bij Huis aan het Water',
      width: 800,
      height: 600,
    },
  },

  // ── Sectie 3: Locaties ────────────────────────────────────────────────────
  locaties: {
    heading: 'Twee locaties aan het water',
    subtext: 'Ontdek ons aanbod in Katwoude en Amsterdam Noord — elk met een eigen karakter.',
    items: [
      {
        slug: 'katwoude',
        name: 'Katwoude',
        tagline: 'Rust en ruimte in het groene hart',
        description:
          'In het schilderachtige Katwoude, aan de rand van de Purmer, vind je rust, groen en water in overvloed. De perfecte plek om tot jezelf te komen.',
        aanbodPreview: ['Kano & roeien', 'Wandelen', 'Yoga buiten', 'Vissen'],
        image: {
          src: '/images/locatie-katwoude.jpg',
          alt: 'Locatie Katwoude — water en groen',
          width: 800,
          height: 600,
        },
        href: '/aanbod#katwoude',
        agendaItems: upcomingByLocation('katwoude'),
      },
      {
        slug: 'amsterdam-noord',
        name: 'Amsterdam Noord',
        tagline: 'Stadse energie, waterrand rust',
        description:
          'Op een steenworp van de stad maar met het gevoel van weidsheid. Amsterdam Noord combineert bereikbaarheid met de kalmte van het IJ en de groene polders.',
        aanbodPreview: ['Fietsen langs het IJ', 'Creatieve workshops', 'Groepsactiviteiten', 'Stilte & bezinning'],
        image: {
          src: '/images/locatie-amsterdam-noord.jpg',
          alt: 'Locatie Amsterdam Noord — IJ-oever',
          width: 800,
          height: 600,
        },
        href: '/aanbod#amsterdam-noord',
        agendaItems: upcomingByLocation('amsterdam-noord'),
      },
    ],
  },

  // ── Sectie 4: Help ons ────────────────────────────────────────────────────
  helpOns: {
    label: 'Help ons',
    heading: 'Draag bij aan onze missie',
    subtext:
      'Met uw steun kunnen wij meer mensen een bijzondere ervaring aan het water geven. Dat kan op vele manieren.',
    cards: [
      {
        doelgroep: 'particulier',
        icon: '🤲',
        title: 'Als particulier',
        description:
          'Doneer eenmalig of word structureel donor. Elke bijdrage, groot of klein, helpt ons om meer mensen een bijzondere tijd te bieden.',
        cta: {
          label: 'Doneer nu',
          href: '/help-ons#particulier',
        },
      },
      {
        doelgroep: 'organisatie',
        icon: '🏢',
        title: 'Als organisatie',
        description:
          'Sluit een partnerschap met ons en laat uw medewerkers actief bijdragen. MVO, teambuilding en maatschappelijke impact in één.',
        cta: {
          label: 'Word partner',
          href: '/help-ons#organisatie',
        },
      },
      {
        doelgroep: 'vrijwilliger',
        icon: '💚',
        title: 'Als vrijwilliger',
        description:
          'Zet je in op de locatie, help bij activiteiten of ondersteun ons vanuit je eigen expertise. Samen maken we het verschil.',
        cta: {
          label: 'Meld je aan',
          href: '/help-ons#vrijwilliger',
        },
      },
    ],
  },

  // ── Sectie 5: Gastreviews ─────────────────────────────────────────────────
  reviews: {
    heading: 'Wat onze gasten zeggen',
    subtext: 'Echte verhalen van mensen die iets bijzonders beleefden aan het water.',
    items: [
      {
        id: '1',
        quote: 'Samen met mijn hond kon ik hier eindelijk even ademhalen. Zo bijzonder.',
        guestName: 'Ria B.',
        guestRole: 'Gast, winter 2024',
        image: { src: '/images/gasten-1.png', alt: 'Portret van Ria', width: 683, height: 1024 },
        storyHref: '/nieuws/verhaal-ria',
      },
      {
        id: '2',
        quote: 'Een plek waar je jezelf mag zijn. De begeleiding is warm en oprecht betrokken.',
        guestName: 'Emma D.',
        guestRole: 'Gast, herfst 2024',
        image: { src: '/images/gasten-2.png', alt: 'Portret van Emma', width: 683, height: 1024 },
        storyHref: '/nieuws/verhaal-emma',
      },
      {
        id: '3',
        quote: 'Het water geeft rust die je nergens anders vindt. Ik kom hier kracht opdoen.',
        guestName: 'Jan V.',
        guestRole: 'Gast, voorjaar 2025',
        image: { src: '/images/gasten-3.png', alt: 'Portret van Jan', width: 683, height: 1024 },
        storyHref: '/nieuws/verhaal-jan',
      },
      {
        id: '4',
        quote: 'Na maanden van stress was dit precies wat ik nodig had. De rust, het water, de aandacht — ik vertrok als een ander mens.',
        guestName: 'Fatima B.',
        guestRole: 'Gast, zomer 2024',
        image: { src: '/images/gasten-4.png', alt: 'Portret van Fatima', width: 683, height: 1024 },
        storyHref: '/nieuws/verhaal-fatima',
      },
      {
        id: '5',
        quote: 'Na mijn behandeling had ik dit nodig. Huis aan het Water gaf me nieuwe hoop.',
        guestName: 'Corrie M.',
        guestRole: 'Gast, zomer 2025',
        image: { src: '/images/gasten-5.png', alt: 'Portret van Corrie', width: 300, height: 400 },
        storyHref: '/nieuws/verhaal-corrie',
      },
    ],
  },

  // ── Sectie 6: Hoe werken wij ──────────────────────────────────────────────
  hoeWerkenWij: {
    label: 'Hoe werken wij',
    heading: 'Eenvoudig, persoonlijk en toegankelijk',
    body: 'Bij Huis aan het Water staat de gast centraal. Wij werken nauw samen met zorgverleners en maatschappelijke partners om de juiste mensen te bereiken.',
    steps: [
      {
        number: '01',
        title: 'Aanmelding via zorgverlener of zelfstandig',
        description:
          'Gasten kunnen zichzelf aanmelden of worden doorverwezen door een huisarts, sociaal werker of andere zorgprofessional.',
      },
      {
        number: '02',
        title: 'Persoonlijk kennismakingsgesprek',
        description:
          'We bespreken de wensen, behoeften en mogelijkheden van de gast om het verblijf zo goed mogelijk af te stemmen.',
      },
      {
        number: '03',
        title: 'Ervaar, rust en verbind',
        description:
          'De gast geniet van de locatie, de activiteiten en de natuur — op eigen tempo, met begeleiding waar gewenst.',
      },
    ],
    image: {
      src: '/images/hoe-werken-wij.jpg',
      alt: 'Begeleider en gast aan het water',
      width: 800,
      height: 600,
    },
  },

  // ── Sectie 7: Partners ────────────────────────────────────────────────────
  partners: {
    label: 'Mede mogelijk gemaakt door',
    items: [
      { name: 'KIVO Group', logoUrl: '/images/sponsors/335506888.png' },
      { name: 'Rabobank', logoUrl: '/images/sponsors/3037006687.jpg' },
      { name: 'IPSO', logoUrl: '/images/sponsors/512511656.jpg' },
      { name: 'RCOAK', logoUrl: '/images/sponsors/3561851461.png' },
      { name: 'PGP Monnickendam', logoUrl: '/images/sponsors/3589637048.png' },
      { name: 'Hoenderdos', logoUrl: '/images/sponsors/707539453.jpg' },
      { name: 'Creationz', logoUrl: '/images/sponsors/292264233.jpg' },
      { name: 'Woonstudio', logoUrl: '/images/sponsors/1578746628.jpg' },
      { name: 'Volare', logoUrl: '/images/sponsors/2827342165.jpg' },
      { name: 'Helder in Vastgoed', logoUrl: '/images/sponsors/3877457599.png' },
      { name: 'TCV', logoUrl: '/images/sponsors/logo_tcv.png' },
      { name: 'Kesbeke', logoUrl: '/images/sponsors/2190041113.jpg' },
    ],
  },

  // ── Sectie 8: FAQ ─────────────────────────────────────────────────────────
  faq: {
    heading: 'Veelgestelde vragen',
    items: [
      {
        question: 'Voor wie is Huis aan het Water bedoeld?',
        answer: 'Huis aan het Water is er voor iedereen die leeft met of na kanker, en hun naasten. Wij bieden een plek om tot rust te komen, lotgenoten te ontmoeten of gewoon even in de natuur te zijn.'
      },
      {
        question: 'Zijn er kosten verbonden aan een bezoek?',
        answer: 'Veel van onze activiteiten en bijeenkomsten zijn kosteloos of tegen een kleine vergoeding toegankelijk. Wij willen dat Huis aan het Water voor iedereen bereikbaar is.'
      },
      {
        question: 'Heb ik een verwijzing nodig van een arts?',
        answer: 'Nee, een verwijzing is niet nodig. Je kunt jezelf aanmelden voor onze activiteiten of gewoon eens langskomen tijdens onze inloopmomenten.'
      },
      {
        question: 'Kan ik iemand meenemen?',
        answer: 'Ja, naasten (partners, kinderen, vrienden) zijn ook van harte welkom. Kanker raakt immers niet alleen de patiënt, maar ook de mensen eromheen.'
      }
    ]
  }
}
