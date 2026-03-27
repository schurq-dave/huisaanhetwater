import Link from 'next/link'
import Image from 'next/image'
import type { NavigationData, SiteConfig } from '@/lib/types'

interface FooterProps {
  data: NavigationData
  config: SiteConfig
}

export default function Footer({ data, config }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        background: 'var(--color-slate-200)',
        color: 'var(--color-text-base)',
        paddingTop: 'clamp(3rem, 8vw, 5rem)',
        paddingBottom: '2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Watermark SVG */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-10%', 
          right: '-15%',
          height: '150%', 
          width: '100%',
          opacity: 1,
          pointerEvents: 'none',
          zIndex: 0, 
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}
        className="md:bottom-[-20%] md:right-[-25%] md:h-[200%]"
      >
        <Image
          src="/images/footer-watermark.svg"
          alt=""
          width={1440}
          height={810}
          unoptimized
          style={{ 
            width: 'auto', 
            height: '100%', 
            objectFit: 'contain',
            objectPosition: 'bottom right',
            filter: 'brightness(0) invert(1) opacity(0.3)', // Weer wit gemaakt met een lichte transparantie
          }}
        />
      </div>

      <div className="container-default" style={{ position: 'relative', zIndex: 1, paddingInline: 'clamp(1.5rem, 5vw, 3rem)' }}>

        {/* Top section: logo + nav columns */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(2rem, 3vw, 4rem)',
            justifyContent: 'space-between',
            paddingBottom: '4rem',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          {/* Brand column */}
          <div style={{ flex: '1 1 200px', maxWidth: '280px' }}>
            <Link href="/" aria-label="Huis aan het Water — naar de homepage" style={{ display: 'inline-block', marginBottom: '1.25rem' }}>
              <Image
                src="/images/logo.png"
                alt="Huis aan het Water"
                width={100}
                height={80}
                style={{ height: '90px', width: 'auto' }}
              />
            </Link>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--color-text-base)' }}>
              Centrum voor leven met en na kanker.
            </p>
          </div>

          {/* Nav columns */}
          {data.footer.map((group) => (
            <div key={group.title} style={{ flex: '1 1 120px' }}>
              <p
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-base)',
                  marginBottom: '1rem',
                }}
              >
                {group.title}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="footer-link"
                    style={{
                        fontSize: '0.9375rem',
                        textDecoration: 'none',
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter column */}
          <div style={{ flex: '1 1 260px', maxWidth: '320px' }}>
            <p
              style={{
                fontSize: '0.6875rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-text-base)',
                marginBottom: '1rem',
              }}
            >
              Nieuwsbrief
            </p>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--color-text-base)', marginBottom: '1rem' }}>
              Blijf op de hoogte van ons laatste nieuws en activiteiten.
            </p>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <input
                type="email"
                placeholder="Jouw e-mailadres"
                required
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '0.375rem',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-surface)',
                  fontSize: '0.875rem',
                  color: 'var(--color-text-base)',
                  outline: 'none',
                  width: '100%',
                }}
              />
              <button
                type="submit"
                className="newsletter-button"
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '0.375rem',
                  background: 'var(--color-willow-600)',
                  color: 'white',
                  border: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                  width: '100%',
                }}
              >
                Inschrijven
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
            paddingTop: '1.5rem',
            fontSize: '0.8125rem',
            color: 'var(--color-text-base)',
          }}
        >
          <span>© {year} Stichting Huis aan het Water. Alle rechten voorbehouden.</span>
          <span style={{ color: 'var(--color-willow-600)', fontWeight: 600 }}>
            huisaanhetwater.nl
          </span>
        </div>

      </div>
    </footer>
  )
}
