import Image from 'next/image';
import type { HomeHoeWerkenWij } from '@/lib/types';

interface HoeWerkenWijSectionProps {
  data: HomeHoeWerkenWij;
}

export default function HoeWerkenWijSection({ data }: HoeWerkenWijSectionProps) {
  return (
    <section
      aria-labelledby="hoe-werken-wij-heading"
      className="section-padding-lg"
      style={{ background: 'var(--color-surface)' }}
    >
      <div className="container-default">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
            gap: 'clamp(3rem, 6vw, 5rem)',
            alignItems: 'center',
          }}
        >
          {/* Left — text + steps */}
          <div>
            <span className="overline">{data.label}</span>
            <h2 id="hoe-werken-wij-heading">{data.heading}</h2>
            <span className="heading-bar" />
            <p style={{ fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '2.5rem', color: 'var(--color-text-muted)' }}>
              {data.body}
            </p>

            {/* Numbered steps */}
            <ol
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0',
              }}
            >
              {data.steps.map((step) => (
                <li
                  key={step.number}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '3.5rem 1fr',
                    gap: '1.25rem',
                    paddingBlock: '1.5rem',
                    borderBottom: '1px solid var(--color-border)',
                    alignItems: 'start',
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      fontSize: '1.75rem',
                      fontWeight: 900,
                      lineHeight: 1,
                      color: 'var(--color-willow-300)',
                      letterSpacing: '-0.03em',
                    }}
                  >
                    {step.number}
                  </span>
                  <div>
                    <h3
                      style={{
                        fontSize: '1rem',
                        marginBottom: '0.3rem',
                        fontWeight: 700,
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '0.9rem',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.6,
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Right — atmospheric photo block */}
          <div
            style={{
              position: 'relative',
              marginTop: '-3rem',
              marginBottom: '-3rem',
              height: 'clamp(480px, 60vw, 680px)',
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
                src="/images/hoe-werken-wij-1.jpg"
                alt="Medewerkers en gasten in gesprek"
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>

            {/* Floating smaller photo — bottom-left overlap */}
            <div
              style={{
                position: 'absolute',
                bottom: '2.5rem',
                left: '-2.5rem',
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
                src="/images/hoe-werken-wij-2.jpg"
                alt="Gasten aan de eettafel"
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
