'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import type { NavigationData } from '@/lib/types'

interface NavbarProps {
  data: NavigationData
  siteName: string
}

/* Left nav: Home, Over ons, Ons aanbod, Voor zorgverleners */
const DESKTOP_LEFT = ['/', '/over-ons', '/aanbod', '/voor-zorgverleners']
/* Right nav: Agenda, Help ons, Nieuws, Contact */
const DESKTOP_RIGHT = ['/agenda', '/help-ons', '/nieuws', '/contact']

export default function Navbar({ data, siteName }: NavbarProps) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  /* Add backdrop/shadow once user scrolls */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Close menu on route change */
  useEffect(() => { setMenuOpen(false) }, [pathname])

  /* Prevent body scroll when menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const leftItems = data.primary.filter(i => DESKTOP_LEFT.includes(i.href))
  const rightItems = data.primary.filter(i => DESKTOP_RIGHT.includes(i.href))

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      <header
        role="banner"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'background 300ms ease, box-shadow 300ms ease',
          background: scrolled
            ? 'rgba(255,255,255,0.96)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.08)' : 'none',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem clamp(1rem, 4vw, 2.5rem) 0' }}>
          {/* ── Main row: left nav | logo | right nav ── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              alignItems: 'center',
              height: '72px',
            }}
          >
            {/* Left nav: Home, Over ons, Ons aanbod */}
            <nav
              aria-label="Hoofdnavigatie links"
              style={{ display: 'none', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}
              className="desktop-nav"
            >
              {leftItems.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    style={{
                      padding: '0.5rem 0.875rem',
                      borderRadius: '8px',
                      fontSize: '0.9375rem',
                      fontWeight: active ? 700 : 500,
                      textDecoration: 'none',
                      transition: 'background 180ms ease, color 180ms ease',
                      color: scrolled
                        ? active ? 'var(--color-willow-700)' : 'var(--color-text-base)'
                        : active ? '#ffffff' : 'rgba(255,255,255,0.85)',
                      background: active && scrolled
                        ? 'var(--color-willow-50)'
                        : active && !scrolled
                        ? 'rgba(255,255,255,0.15)'
                        : 'transparent',
                    }}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            {/* Logo — center, symmetric gap on both sides */}
            <Link
              href="/"
              aria-label="Huis aan het Water — naar de homepage"
              style={{ display: 'flex', alignItems: 'center', padding: '0 2rem' }}
            >
              <Image
                src="/images/logo.png"
                alt="Huis aan het Water"
                width={90}
                height={72}
                style={{ height: '52px', width: 'auto' }}
                priority
              />
            </Link>

            {/* Right nav + mobile hamburger */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '0.5rem' }}>
              <nav
                aria-label="Hoofdnavigatie rechts"
                style={{ display: 'none', alignItems: 'center', gap: '0.5rem' }}
                className="desktop-nav"
              >
                {rightItems.map((item) => {
                  const active = isActive(item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      style={{
                        padding: '0.5rem 0.875rem',
                        borderRadius: '8px',
                        fontSize: '0.9375rem',
                        fontWeight: active ? 700 : 500,
                        textDecoration: 'none',
                        transition: 'background 180ms ease, color 180ms ease',
                        color: scrolled
                          ? active ? 'var(--color-willow-700)' : 'var(--color-text-base)'
                          : active ? '#ffffff' : 'rgba(255,255,255,0.85)',
                        background: active && scrolled
                          ? 'var(--color-willow-50)'
                          : active && !scrolled
                          ? 'rgba(255,255,255,0.15)'
                          : 'transparent',
                      }}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </nav>

              {/* Mobile hamburger */}
              <button
                type="button"
                aria-label={menuOpen ? 'Sluit menu' : 'Open menu'}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMenuOpen(v => !v)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: '5px',
                  width: '44px',
                  height: '44px',
                  padding: '10px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  marginLeft: 'auto',
                }}
                className="mobile-nav"
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    aria-hidden="true"
                    style={{
                      display: 'block',
                      height: '2px',
                      borderRadius: '2px',
                      background: scrolled ? 'var(--color-text-base)' : '#ffffff',
                      transition: 'transform 250ms ease, opacity 250ms ease, width 250ms ease',
                      width: i === 1 ? (menuOpen ? '100%' : '70%') : '100%',
                      transformOrigin: 'center',
                      transform:
                        menuOpen && i === 0 ? 'translateY(7px) rotate(45deg)' :
                        menuOpen && i === 2 ? 'translateY(-7px) rotate(-45deg)' :
                        menuOpen && i === 1 ? 'scaleX(0)' :
                        'none',
                      opacity: menuOpen && i === 1 ? 0 : 1,
                    }}
                  />
                ))}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile menu overlay ── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigatiemenu"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99,
          background: 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          display: 'flex',
          flexDirection: 'column',
          padding: 'clamp(5rem, 12vw, 6rem) clamp(1.5rem, 6vw, 3rem) 3rem',
          transform: menuOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 350ms cubic-bezier(0.32, 0.72, 0, 1)',
          overflowY: 'auto',
        }}
      >
        <nav aria-label="Mobiele navigatie">
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {data.primary.map((item, i) => {
              const active = isActive(item.href)
              return (
                <li
                  key={item.href}
                  style={{
                    borderBottom: i < data.primary.length - 1
                      ? '1px solid var(--color-border)'
                      : 'none',
                    transform: menuOpen ? 'translateY(0)' : 'translateY(-12px)',
                    opacity: menuOpen ? 1 : 0,
                    transition: `transform 350ms ease ${i * 40}ms, opacity 350ms ease ${i * 40}ms`,
                  }}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingBlock: '1.25rem',
                      fontSize: 'clamp(1.25rem, 4vw, 1.625rem)',
                      fontWeight: active ? 900 : 700,
                      textDecoration: 'none',
                      color: active ? 'var(--color-willow-700)' : 'var(--color-text-base)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {item.label}
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6"/>
                    </svg>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* CTA at bottom of mobile menu */}
        <div style={{ marginTop: '2.5rem' }}>
          <Link href={data.cta.href} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            {data.cta.label}
          </Link>
        </div>
      </div>

      {/* Responsive styles via style tag — avoids Tailwind purge issues */}
      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav { display: flex !important; }
          .mobile-nav  { display: none !important; }
        }
      `}</style>
    </>
  )
}
