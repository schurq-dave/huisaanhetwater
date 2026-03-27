'use client';

import type { HomePartners } from '@/lib/types';
import Image from 'next/image';

interface PartnersSectionProps {
  data: HomePartners;
}

export default function PartnersSection({ data }: PartnersSectionProps) {
  if (!data.items || data.items.length === 0) return null;

  return (
    <section
      aria-label="Partners en sponsors"
      style={{
        paddingBlock: '4rem',
        background: 'var(--color-surface-off)',
        overflow: 'hidden',
      }}
    >
      <div className="container-default">
        {/* Label */}
        <p
          style={{
            textAlign: 'center',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--color-text-subtle)',
            marginBottom: '3rem',
          }}
        >
          {data.label}
        </p>

        {/* Marquee Wrapper */}
        <div
          style={{
            display: 'flex',
            width: 'fit-content',
            animation: 'marquee 45s linear infinite',
          }}
        >
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .sponsor-logo {
              transition: opacity 200ms ease, filter 200ms ease;
              opacity: 0.9;
            }
            .sponsor-logo:hover {
              opacity: 1;
            }
          `}} />

          {/* Render the list twice for seamless looping */}
          {[...data.items, ...data.items].map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              style={{
                flexShrink: 0,
                padding: '0 3rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {partner.href ? (
                <a
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Partner: ${partner.name}`}
                  className="sponsor-logo"
                  style={{ display: 'block', position: 'relative', width: '140px', height: '50px' }}
                >
                  <Image
                    src={partner.logoUrl}
                    alt={partner.name}
                    fill
                    sizes="140px"
                    style={{ objectFit: 'contain' }}
                    unoptimized
                  />
                </a>
              ) : (
                <div
                  className="sponsor-logo"
                  style={{ position: 'relative', width: '140px', height: '50px' }}
                >
                  <Image
                    src={partner.logoUrl}
                    alt={partner.name}
                    fill
                    sizes="140px"
                    style={{ objectFit: 'contain' }}
                    unoptimized
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
