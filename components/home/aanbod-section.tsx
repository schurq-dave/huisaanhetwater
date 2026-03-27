'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef } from 'react';
import type { HomeAanbod } from '@/lib/types';

interface AanbodSectionProps {
  data: HomeAanbod;
}

const GAP = 24;
const PEEK = 48; // how much of the next card is visible

export default function AanbodSection({ data }: AanbodSectionProps) {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTo = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = (container.children[0] as HTMLElement)?.offsetWidth ?? 0;
    container.scrollTo({ left: index * (cardWidth + GAP), behavior: 'smooth' });
    setActive(index);
  };

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = (container.children[0] as HTMLElement)?.offsetWidth ?? 0;
    const newActive = Math.round(container.scrollLeft / (cardWidth + GAP));
    setActive(newActive);
  };

  return (
    <section
      aria-labelledby="aanbod-heading"
      className="section-padding-lg"
      style={{ background: 'var(--color-surface-off)' }}
    >
      {/* 3/5 + 2/5 grid — left text, right cards */}
      <div
        style={{
          maxWidth: '1200px',
          marginInline: 'auto',
          display: 'grid',
          gridTemplateColumns: '3fr 2fr',
          gap: 'clamp(2.5rem, 5vw, 4rem)',
          alignItems: 'center',
          overflow: 'visible',
        }}
      >
        {/* ── Left 3/5 — text + CTA ── */}
        <div>
          <span className="overline">{data.label}</span>
          <h2 id="aanbod-heading" style={{ marginBottom: 0 }}>
            {data.heading}
          </h2>
          <span className="heading-bar" />
          {data.subtext && (
            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.5vw, 1.15rem)',
                color: 'var(--color-text-muted)',
                lineHeight: 1.75,
                marginBottom: '2.5rem',
              }}
            >
              {data.subtext}
            </p>
          )}
          <Link href={data.cta.href} className="btn-primary">
            {data.cta.label}
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </Link>
        </div>

        {/* ── Right 2/5 — scrollable cards ── */}
        <div style={{ overflow: 'visible' }}>
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            style={{
              display: 'flex',
              gap: `${GAP}px`,
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              padding: '12px',
              margin: '-12px',
            }}
          >
            {data.items.map((item, i) => (
              <div
                key={item.slug}
                style={{
                  flex: `0 0 calc(100% - ${GAP + PEEK}px)`,
                  background: 'var(--color-surface)',
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  boxShadow: '4px 4px 12px 0px rgba(0, 0, 0, 0.15)',
                  scrollSnapAlign: 'start',
                  isolation: 'isolate',
                  border: 'none',
                }}
              >
                {/* Image */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16 / 9',
                    background: 'var(--color-oak-50)',
                    overflow: 'hidden',
                    borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
                  }}
                >
                  {item.image ? (
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="40vw"
                    />
                  ) : (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(135deg, var(--color-oak-50), var(--color-oak-200))',
                      }}
                    />
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: '0.875rem 1.25rem 1.25rem' }}>
                  <span
                    style={{
                      display: 'block',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--color-camel-400)',
                      marginBottom: '0.4rem',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.05rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                    {item.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Dots + arrow navigation */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
            {/* Dots */}
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {data.items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  aria-label={`Ga naar ${data.items[i].title}`}
                  style={{
                    width: i === active ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    border: 'none',
                    background: i === active ? 'var(--color-willow-700)' : 'var(--color-border)',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'width 300ms ease, background 300ms ease',
                  }}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => scrollTo(Math.max(0, active - 1))}
                aria-label="Vorige"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: '1.5px solid var(--color-border)',
                  background: 'var(--color-surface-off)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: active === 0 ? 0.35 : 1,
                  transition: 'opacity 200ms ease',
                }}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 12H5M11 6l-6 6 6 6"/>
                </svg>
              </button>
              <button
                onClick={() => scrollTo(Math.min(data.items.length - 1, active + 1))}
                aria-label="Volgende"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: '1.5px solid var(--color-border)',
                  background: 'var(--color-surface-off)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: active === data.items.length - 1 ? 0.35 : 1,
                  transition: 'opacity 200ms ease',
                }}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
