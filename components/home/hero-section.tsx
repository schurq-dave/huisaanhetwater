'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { HomeHero } from '@/lib/types';

interface HeroSectionProps {
  data: HomeHero;
}

export default function HeroSection({ data }: HeroSectionProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if we've scrolled past a certain point (e.g., 60% of viewport height)
      if (window.scrollY > window.innerHeight * 0.6) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      aria-label="Hero"
      style={{
        position: 'relative',
        /* Extra height so the photo extends well below the viewport */
        minHeight: '115svh',
        display: 'grid',
        gridTemplateRows: '1fr auto',
        /* Allow the bottom fade to bleed into the next section */
        overflow: 'visible',
        /* Pull the next section up so it overlaps the fading tail */
        marginBottom: '-10rem',
      }}
    >
      {/* Background video — clip to this element only */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          borderRadius: 0,
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 55%',
          }}
        >
          <source src="/images/hero.mov" type="video/mp4" />
        </video>

        {/* Subtle dark overlay for text legibility — stays inside the photo bounds */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.08) 35%, rgba(0,0,0,0.38) 72%, rgba(0,0,0,0.48) 86%, rgba(0,0,0,0.52) 100%)',
          }}
        />

        {/* Left edge fade to white */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(255,255,255,0.28) 0%, transparent 20%)',
          }}
        />

        {/* Right edge fade to white */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to left, rgba(255,255,255,0.28) 0%, transparent 20%)',
          }}
        />
      </div>

      {/* White fade that bleeds out below the photo into the next section */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-10rem',
          left: 0,
          right: 0,
          /* 10rem inside the photo + 10rem below it */
          height: '20rem',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.55) 40%, #ffffff 70%, #ffffff 100%)',
          zIndex: 4,
          pointerEvents: 'none',
        }}
      />

      {/* Main content — sits above all overlays */}
      <div
        className="container-default"
        style={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          paddingTop: '8rem',
          paddingBottom: '10rem',
          boxSizing: 'border-box',
        }}
      >
        <div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h1
              style={{
                color: '#ffffff',
                maxWidth: '16ch',
                marginBottom: '1.5rem',
                textShadow: '0 2px 20px rgba(0,0,0,0.3)',
                fontWeight: 600,
                fontSize: 'clamp(2.5rem, 8vw, 65px)',
              }}
            >
              {data.heading}
            </h1>

            {data.subtext && (
              <p
                style={{
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
                  lineHeight: 1.7,
                  maxWidth: '52ch',
                  marginBottom: '2.5rem',
                  textShadow: '0 1px 8px rgba(0,0,0,0.25)',
                }}
              >
                {data.subtext}
              </p>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {data.ctaPrimary && (
                <Link href={data.ctaPrimary.href} className="btn-primary">
                  {data.ctaPrimary.label}
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6"/>
                  </svg>
                </Link>
              )}
              {data.ctaSecondary && (
                <Link href={data.ctaSecondary.href} className="btn-ghost">
                  {data.ctaSecondary.label}
                </Link>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Donate card — absolute bottom-right of hero, sits on the white fade */}
      <Link
        href="/help-ons#particulier"
        className="hidden md:flex"
        style={{
          position: 'absolute',
          bottom: '19rem',
          right: 0,
          zIndex: 10,
          flexDirection: 'column',
          gap: '0.5rem',
          background: '#ffffff',
          borderRadius: '16px 0 0 16px',
          padding: '1.5rem 2rem',
          boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
          textDecoration: 'none',
          minWidth: '220px',
          transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms ease',
          transform: isScrolled ? 'translateX(100%)' : 'translateX(0)',
          opacity: isScrolled ? 0 : 1,
          pointerEvents: isScrolled ? 'none' : 'auto',
        }}
      >
        <span
          style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--color-camel-400)',
          }}
        >
          Steun ons
        </span>
        <span
          style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            color: 'var(--color-text-base)',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
          }}
        >
          Nu doneren
        </span>
        <span
          style={{
            fontSize: '0.875rem',
            color: 'var(--color-text-muted)',
            lineHeight: 1.5,
          }}
        >
          Maak een bijzondere ervaring mogelijk
        </span>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            marginTop: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: 700,
            color: 'var(--color-willow-700)',
          }}
        >
          Doneer nu
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6"/>
          </svg>
        </span>
      </Link>

      {/* Sticky Tab - Fixed to viewport when scrolled */}
      <Link
        href="/help-ons#particulier"
        style={{
          position: 'fixed',
          top: '50%',
          right: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--color-willow-600)',
          color: '#ffffff',
          padding: '1.5rem 0.75rem',
          borderRadius: '12px 0 0 12px',
          boxShadow: '-4px 0 15px rgba(0,0,0,0.1)',
          textDecoration: 'none',
          transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms ease, background-color 200ms ease',
          transform: isScrolled ? 'translateY(-50%) translateX(0)' : 'translateY(-50%) translateX(100%)',
          opacity: isScrolled ? 1 : 0,
          pointerEvents: isScrolled ? 'auto' : 'none',
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-willow-700)'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-willow-600)'}
      >
        <span
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            transform: 'rotate(180deg)',
            fontSize: '0.9375rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          Doneer nu
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true" style={{ transform: 'rotate(90deg)' }}>
            <path d="M5 12h14M13 6l6 6-6 6"/>
          </svg>
        </span>
      </Link>

      {/* Spacer row — keeps grid layout intact */}
      <div style={{ height: '12rem' }} aria-hidden="true" />
    </section>
  );
}
