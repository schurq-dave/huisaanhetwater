'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef } from 'react';
import type { HomeReviews, GastReview } from '@/lib/types';

interface ReviewsSectionProps {
  data: HomeReviews;
}

const CARD_LARGE = 560;
const CARD_SMALL = 280;
const GAP = 24;
const DURATION = 500;

function ReviewCard({
  review,
  width,
  onClick,
}: {
  review: GastReview;
  width: number;
  onClick?: () => void;
}) {
  const isLarge = width === CARD_LARGE;

  return (
    <div
      onClick={onClick}
      style={{
        width: `${width}px`,
        minWidth: `${width}px`,
        height: '420px',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '16px',
        cursor: onClick ? 'pointer' : 'default',
        transition: `width ${DURATION}ms cubic-bezier(0.4,0,0.2,1), min-width ${DURATION}ms cubic-bezier(0.4,0,0.2,1), box-shadow ${DURATION}ms ease`,
        boxShadow: isLarge
          ? '4px 4px 12px 0px rgba(0, 0, 0, 0.15)'
          : '4px 4px 12px 0px rgba(0, 0, 0, 0.15)',
      }}
    >
      <Image
        src={review.image.src}
        alt={review.image.alt}
        fill
        style={{ objectFit: 'cover', objectPosition: 'center top' }}
        sizes="560px"
      />

      {/* Base gradient */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)',
        }}
      />

      {/* Large overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(10, 25, 15, 0.50)',
          opacity: isLarge ? 1 : 0,
          transition: `opacity ${DURATION}ms ease`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '2rem',
          gap: '0.75rem',
          pointerEvents: isLarge ? 'auto' : 'none',
        }}
      >
        <div>
          <strong style={{ display: 'block', color: '#fff', fontSize: '1rem', fontWeight: 700, textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}>
            {review.guestName}
          </strong>
          {review.guestRole && (
            <span style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', marginTop: '0.15rem' }}>
              {review.guestRole}
            </span>
          )}
        </div>
        <p style={{ margin: 0, color: 'rgba(255,255,255,0.92)', fontSize: '0.9375rem', fontStyle: 'italic', lineHeight: 1.65 }}>
          "{review.quote}"
        </p>
        {review.storyHref && (
          <Link
            href={review.storyHref}
            className="btn-ghost"
            style={{ alignSelf: 'flex-start', fontSize: '0.8125rem' }}
            onClick={(e) => e.stopPropagation()}
            tabIndex={isLarge ? 0 : -1}
          >
            Lees verhaal
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </Link>
        )}
      </div>

      {/* Small name tag */}
      <div
        style={{
          position: 'absolute',
          bottom: '1.25rem',
          left: '1.25rem',
          opacity: isLarge ? 0 : 1,
          transition: `opacity ${DURATION}ms ease`,
          pointerEvents: 'none',
        }}
      >
        <strong style={{ display: 'block', color: '#fff', fontSize: '0.875rem', fontWeight: 700, textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}>
          {review.guestName}
        </strong>
        {review.guestRole && (
          <span style={{ display: 'block', color: 'rgba(255,255,255,0.72)', fontSize: '0.75rem', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
            {review.guestRole}
          </span>
        )}
      </div>
    </div>
  );
}

export default function ReviewsSection({ data }: ReviewsSectionProps) {
  const items = data.items;
  const total = items.length;

  // offset = index of first visible card
  const [offset, setOffset] = useState(0);
  const [slideX, setSlideX] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  // widths[i] = current animated width for position i
  const [widths, setWidths] = useState([CARD_LARGE, CARD_SMALL, CARD_SMALL, CARD_SMALL]);
  const busy = useRef(false);

  // 4 indices rendered (3 visible + 1 for seamless slide)
  const indices = Array.from({ length: 4 }, (_, i) => (offset + i) % total);

  const navigate = (dir: 'next' | 'prev') => {
    if (busy.current) return;
    busy.current = true;

    if (dir === 'next') {
      // Animate: pos 0 shrinks to small, pos 1 grows to large, slide left
      setWidths([CARD_SMALL, CARD_LARGE, CARD_SMALL, CARD_SMALL]);
      setIsSliding(true);
      setSlideX(-(CARD_SMALL + GAP));
    } else {
      // Animate: pos 0 stays large but we bring in new card from left
      // Simulate: pos 3 grows to large, pos 0 shrinks, slide right
      setWidths([CARD_SMALL, CARD_SMALL, CARD_SMALL, CARD_LARGE]);
      setIsSliding(true);
      setSlideX(CARD_SMALL + GAP);
    }

    setTimeout(() => {
      // Snap to new offset, reset animation state without transition
      const newOffset = dir === 'next'
        ? (offset + 1) % total
        : (offset - 1 + total) % total;
      setOffset(newOffset);
      setSlideX(0);
      setIsSliding(false);
      setWidths([CARD_LARGE, CARD_SMALL, CARD_SMALL, CARD_SMALL]);
      busy.current = false;
    }, DURATION);
  };

  return (
    <section
      aria-labelledby="reviews-heading"
      className="section-padding-lg"
      style={{ background: 'var(--color-surface)' }}
    >
      <div className="container-default">
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '2rem',
            flexWrap: 'wrap',
            marginBottom: 'clamp(2rem, 3vw, 3rem)',
          }}
        >
          <div>
            {data.label && <span className="overline">{data.label}</span>}
            <h2 id="reviews-heading" style={{ marginBottom: 0 }}>{data.heading}</h2>
            {data.subtext && (
              <p style={{ maxWidth: '48ch', fontSize: '1.05rem', margin: '0.75rem 0 0' }}>
                {data.subtext}
              </p>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
            <button
              onClick={() => navigate('prev')}
              aria-label="Vorige"
              style={{
                width: '44px', height: '44px', borderRadius: '50%',
                border: '1.5px solid var(--color-border)',
                background: 'var(--color-surface-off)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M19 12H5M11 6l-6 6 6 6"/>
              </svg>
            </button>
            <button
              onClick={() => navigate('next')}
              aria-label="Volgende"
              style={{
                width: '44px', height: '44px', borderRadius: '50%',
                border: '1.5px solid var(--color-border)',
                background: 'var(--color-surface-off)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Viewport */}
        <div style={{ overflow: 'hidden', background: 'transparent', paddingBlock: '16px', marginBlock: '-16px' }}>
          <div
            style={{
              display: 'flex',
              gap: `${GAP}px`,
              transform: `translateX(${slideX}px)`,
              transition: isSliding
                ? `transform ${DURATION}ms cubic-bezier(0.4,0,0.2,1)`
                : 'none',
              willChange: 'transform',
            }}
          >
            {indices.map((itemIdx, pos) => (
              <ReviewCard
                key={`${offset}-${pos}`}
                review={items[itemIdx]}
                width={widths[pos]}
                onClick={pos === 0 ? undefined : () => navigate('next')}
              />
            ))}
          </div>
        </div>

        {/* Dots — below first card, left-aligned */}
        <div style={{
          display: 'flex',
          gap: '0.4rem',
          marginTop: '1rem',
          paddingLeft: '0',
        }}>
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setOffset(i)}
              aria-label={`Ga naar review ${i + 1}`}
              style={{
                width: i === offset ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                border: 'none',
                background: i === offset ? 'var(--color-willow-700)' : 'var(--color-border)',
                cursor: 'pointer',
                padding: 0,
                transition: 'width 300ms ease, background 300ms ease',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
