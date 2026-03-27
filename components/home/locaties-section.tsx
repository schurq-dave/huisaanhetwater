import Image from 'next/image';
import Link from 'next/link';
import type { HomeLocaties, AgendaItem } from '@/lib/types';

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('nl-NL', { weekday: 'short', day: 'numeric', month: 'short' })
}

const typeLabel: Record<AgendaItem['type'], string> = {
  activiteit: 'Activiteit',
  evenement: 'Evenement',
  bijeenkomst: 'Bijeenkomst',
  overig: 'Overig',
}

interface LocatiesSectionProps {
  data: HomeLocaties;
}

export default function LocatiesSection({ data }: LocatiesSectionProps) {
  return (
    <section
      aria-labelledby="locaties-heading"
      className="section-padding-lg"
      style={{
        position: 'relative',
        backgroundImage: 'url(/images/hero.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.45) 100%)',
          zIndex: 0,
        }}
      />

      <div className="container-default" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section header */}
        <div style={{ marginBottom: 'clamp(2rem, 4vw, 3.5rem)', textAlign: 'center' }}>
          <span className="overline">Onze locaties</span>
          <h2 id="locaties-heading" style={{ maxWidth: '20ch', margin: '0 auto', color: '#ffffff' }}>
            {data.heading}
          </h2>
          {data.subtext && (
            <p style={{ maxWidth: '55ch', marginTop: '1rem', fontSize: '1.1rem', margin: '1rem auto 0', color: 'rgba(255,255,255,0.85)' }}>
              {data.subtext}
            </p>
          )}
        </div>

        {/* Two-column location cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
            gap: '1.5rem',
          }}
        >
          {data.items.map((locatie) => (
            <div
              key={locatie.slug}
              className="card card-lift"
              style={{ display: 'block', textDecoration: 'none', color: 'inherit', border: 'none' }}
            >
              {/* Location image */}
              <div
                style={{
                  height: '360px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={locatie.image.src}
                  alt={locatie.image.alt}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Gradient overlay */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)',
                  }}
                />
                {/* Location name on image */}
                <span
                  style={{
                    position: 'absolute',
                    bottom: '1.5rem',
                    left: '1.75rem',
                    color: '#fff',
                    fontSize: '1.75rem',
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                  }}
                >
                  {locatie.name}
                </span>
              </div>

              {/* Card body */}
              <div style={{ padding: '2rem' }}>
                <p
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--color-camel-400)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {locatie.tagline}
                </p>

                <p style={{ marginBottom: '1.5rem', lineHeight: 1.65 }}>
                  {locatie.description}
                </p>

                {/* Agenda preview */}
                {locatie.agendaItems && locatie.agendaItems.length > 0 ? (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--color-text-muted)',
                        marginBottom: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                      }}
                    >
                      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                      </svg>
                      Eerstvolgende activiteiten
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {locatie.agendaItems.map((item, idx) => (
                        <li
                          key={item.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.65rem 0',
                            borderTop: idx === 0 ? '1px solid var(--color-border)' : undefined,
                            borderBottom: '1px solid var(--color-border)',
                          }}
                        >
                          {/* Date */}
                          <span style={{ flexShrink: 0, fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', minWidth: '4rem' }}>
                            {new Date(item.date).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' }).toUpperCase()}
                          </span>
                          {/* Title + time */}
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text-base)', lineHeight: 1.3 }}>
                              {item.title}
                            </p>
                            {item.time && (
                              <p style={{ margin: '0.1rem 0 0', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                {item.time}
                              </p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                    Binnenkort nieuwe activiteiten beschikbaar.
                  </p>
                )}

                {/* CTA agenda */}
                <Link
                  href={`/agenda?locatie=${locatie.slug}`}
                  className="btn-primary"
                >
                  Bekijk volledige agenda
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6"/>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
