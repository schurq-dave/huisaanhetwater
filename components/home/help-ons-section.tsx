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
          className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]"
          style={{
            gap: 'clamp(2rem, 4vw, 4rem)',
            alignItems: 'start',
          }}
        >
          {/* Header + subtext (1/3) — sticky so it stays in view while scrolling */}
          <div style={{ position: 'relative', top: '0' }} className="order-1 lg:order-2 lg:sticky lg:top-[6rem]">
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

          {/* Cards (2/3) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }} className="order-2 lg:order-1">
            {data.cards.map((card, i) => (
              <div
                key={card.doelgroep}
                className="flex flex-col sm:grid sm:grid-cols-[200px_1fr_auto]"
                style={{
                  background: 'var(--color-surface)',
                  border: 'none',
                  borderRadius: '16px',
                  overflow: 'hidden',
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
                    minHeight: '200px', // Iets hoger op mobiel zodat het er beter uitziet
                  }}
                  className="sm:min-h-[140px]"
                >
                  <Image
                    src={CARD_IMAGES[i]}
                    alt=""
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 640px) 100vw, 200px"
                  />
                </div>

                {/* Text */}
                <div style={{ padding: '1.75rem 1.25rem', width: '100%' }}>
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
                <div style={{ padding: '0 1.25rem 1.75rem 1.25rem', width: '100%', display: 'flex', justifyContent: 'flex-start' }} className="sm:p-[1.75rem_1.75rem_1.75rem_0] sm:justify-end sm:w-auto">
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
        </div>
      </div>
    </section>
  );
}
