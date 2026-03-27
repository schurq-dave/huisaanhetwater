import Image from 'next/image';
import Link from 'next/link';
import type { HomeHelpOns } from '@/lib/types';

interface HelpOnsSectionProps {
  data: HomeHelpOns;
}

const CARD_IMAGES = [
  '/images/donatie-1.png',
  '/images/donatie-2.png',
  '/images/donatie-3.png',
] as const;

export default function HelpOnsSection({ data }: HelpOnsSectionProps) {
  return (
    <section
      aria-labelledby="help-ons-heading"
      className="section-padding-lg"
      style={{
        background: 'var(--color-surface-off)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="container-default">
        {/* 3-column layout: 2/3 cards left, 1/3 header right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: 'clamp(2rem, 4vw, 4rem)',
            alignItems: 'start',
          }}
        >
          {/* Left: stacked cards (2/3) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {data.cards.map((card, i) => (
              <div
                key={card.doelgroep}
                style={{
                  background: 'var(--color-surface)',
                  border: 'none',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr auto',
                  alignItems: 'center',
                  boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)',
                  transition: 'box-shadow 200ms ease, transform 200ms ease',
                }}
              >
                {/* Image — flush left, full height */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'relative',
                    alignSelf: 'stretch',
                    minHeight: '140px',
                  }}
                >
                  <Image
                    src={CARD_IMAGES[i]}
                    alt=""
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="200px"
                  />
                </div>

                {/* Text */}
                <div style={{ padding: '1.75rem 1.25rem' }}>
                  <h3
                    style={{
                      color: 'var(--color-text-base)',
                      fontSize: '1.0625rem',
                      marginBottom: '0.3rem',
                      fontWeight: 700,
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.6,
                      margin: 0,
                      fontSize: '0.9375rem',
                    }}
                  >
                    {card.description}
                  </p>
                </div>

                {/* CTA */}
                <div style={{ padding: '1.75rem 1.75rem 1.75rem 0' }}>
                  <Link
                    href={card.cta.href}
                    className="btn-primary"
                    style={{ flexShrink: 0, whiteSpace: 'nowrap' }}
                  >
                    {card.cta.label}
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6"/>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Right: heading + subtext (1/3) — sticky so it stays in view while scrolling */}
          <div style={{ position: 'sticky', top: '6rem' }}>
            <span
              style={{
                display: 'block',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-camel-400)',
                marginBottom: '1rem',
              }}
            >
              {data.label}
            </span>
            <h2 id="help-ons-heading" style={{ color: 'var(--color-text-base)', marginBottom: '1rem' }}>
              {data.heading}
            </h2>
            {data.subtext && (
              <p
                style={{
                  color: 'var(--color-text-muted)',
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {data.subtext}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
