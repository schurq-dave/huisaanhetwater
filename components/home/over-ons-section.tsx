import Link from 'next/link';
import Image from 'next/image';
import type { HomeOverOns } from '@/lib/types';

interface OverOnsSectionProps {
  data: HomeOverOns;
}

export default function OverOnsSection({ data }: OverOnsSectionProps) {
  return (
    <section
      aria-labelledby="over-ons-heading"
      className="section-padding-lg"
      style={{ background: 'var(--color-surface)', position: 'relative', zIndex: 5, overflow: 'hidden' }}
    >
      <div className="container-default">
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr]"
          style={{
            gap: 'clamp(3rem, 6vw, 5rem)',
            alignItems: 'center',
          }}
        >
          {/* Left — text content */}
          <div>
            <span className="overline">{data.label}</span>
            <h2 id="over-ons-heading" style={{ marginBottom: 0 }}>
              {data.heading}
            </h2>
            <span className="heading-bar" />

            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.5vw, 1.15rem)',
                color: 'var(--color-text-muted)',
                lineHeight: 1.75,
                marginBottom: '2.5rem',
              }}
            >
              {data.body}
            </p>

            {data.highlights && data.highlights.length > 0 && (
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0',
                }}
              >
                {data.highlights.map((highlight, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      alignItems: 'flex-start',
                      paddingBlock: '1rem',
                      borderBottom: '1px solid var(--color-border)',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        flex: '0 0 8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: 'var(--color-willow-400)',
                        marginTop: '0.5rem',
                      }}
                    />
                    <p style={{ margin: 0, color: 'var(--color-text-muted)', lineHeight: 1.65, fontSize: '0.9375rem' }}>
                      {highlight}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            {data.cta && (
              <Link href={data.cta.href} className="btn-primary">
                {data.cta.label}
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </Link>
            )}
          </div>

          {/* Right — photo stack */}
          <div
            className="relative mt-0 mb-0 lg:-mt-24 lg:-mb-24"
            style={{
              height: 'clamp(400px, 60vw, 680px)',
            }}
          >
            {/* Main photo */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lift)',
              }}
            >
              <Image
                src="/images/team.png"
                alt="Het team van Huis aan het Water"
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
              />
            </div>

            {/* Floating smaller photo — bottom-left overlap */}
            <div
              className="absolute bottom-4 right-[-1rem] lg:bottom-10 lg:right-[-2.5rem]"
              style={{
                width: '52%',
                aspectRatio: '4 / 3',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 12px 40px rgba(0,0,0,0.22)',
                border: '4px solid #fff',
                zIndex: 2,
              }}
            >
              <Image
                src="/images/team-2.png"
                alt="Gasten van Huis aan het Water"
                fill
                sizes="30vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
