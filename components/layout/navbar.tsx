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

/* Left nav: Home, Over ons, Ons aanbod, Agenda */
const DESKTOP_LEFT = ['/', '/over-ons', '/aanbod', '/agenda']
/* Right nav: Voor zorgverleners, Help ons, Nieuws, Contact */
const DESKTOP_RIGHT = ['/voor-zorgverleners', '/help-ons', '/nieuws', '/contact']

const LANGUAGES = [
  { code: 'nl', label: 'NL', flag: '🇳🇱', name: 'Nederlands' },
  { code: 'en', label: 'EN', flag: '🇬🇧', name: 'English' },
  { code: 'ar', label: 'AR', flag: '🇸🇦', name: 'العربية' },
]

export default function Navbar({ data, siteName }: NavbarProps) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [activeLang, setActiveLang] = useState(LANGUAGES[0])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

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
      {/* Language switcher tab — top left */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 200,
        }}
      >
        <button
          onClick={() => setLangOpen(v => !v)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.3rem 0.75rem',
            background: 'rgba(255,255,255,0.92)',
            border: 'none',
            borderRadius: '0 0 8px 0',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--color-text-base)',
            cursor: 'pointer',
            boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
            backdropFilter: 'blur(8px)',
            letterSpacing: '0.05em',
          }}
          aria-label="Taal kiezen"
          aria-expanded={langOpen}
        >
          <span style={{ fontSize: '0.9rem' }}>{activeLang.flag}</span>
          <span>{activeLang.label}</span>
          <svg
            width="10" height="10" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
            style={{ transition: 'transform 200ms ease', transform: langOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {/* Dropdown */}
        {langOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              background: 'rgba(255,255,255,0.97)',
              backdropFilter: 'blur(12px)',
              borderRadius: '0 0 8px 8px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              minWidth: '130px',
            }}
          >
            {LANGUAGES.filter(l => l.code !== activeLang.code).map(lang => (
              <button
                key={lang.code}
                onClick={() => { setActiveLang(lang); setLangOpen(false) }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  width: '100%',
                  padding: '0.5rem 0.75rem',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--color-text-base)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 150ms ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'var(--color-willow-50)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ fontSize: '0.9rem' }}>{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <header
        role="banner"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? '0.5rem 1rem' : '0',
          transition: 'padding 300ms ease',
        }}
      >
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: scrolled ? '0 clamp(1rem, 4vw, 2.5rem)' : '1rem clamp(1rem, 4vw, 2.5rem) 0',
          background: scrolled ? 'rgba(255,255,255,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.08)' : 'none',
          borderRadius: scrolled ? '16px' : '0',
          transition: 'background 300ms ease, box-shadow 300ms ease, border-radius 300ms ease, padding 300ms ease',
        }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '72px',
              position: 'relative',
            }}
          >
            {/* Left nav */}
            <nav
              aria-label="Hoofdnavigatie links"
              style={{ display: 'none', alignItems: 'center', gap: '0.25rem', flex: 1, justifyContent: 'flex-end', paddingRight: '5rem' }}
              className="desktop-nav"
            >
              {leftItems.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`nav-link${active ? ' nav-link--active' : ''}`}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '0',
                      fontSize: '0.9375rem',
                      fontWeight: active ? 700 : 500,
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      color: scrolled
                        ? active ? 'var(--color-text-base)' : 'var(--color-text-base)'
                        : '#ffffff',
                      background: 'transparent',
                    }}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            {/* Logo — absolutely centered */}
            <Link
              href="/"
              aria-label="Huis aan het Water — naar de homepage"
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
              }}
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

            {/* Right nav + Search + Mobile */}
            <div style={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'flex-start', paddingLeft: '5rem' }}>
              <nav
                aria-label="Hoofdnavigatie rechts"
                style={{ display: 'none', alignItems: 'center', gap: '0.25rem' }}
                className="desktop-nav"
              >
                {rightItems.map((item) => {
                  const active = isActive(item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={`nav-link${active ? ' nav-link--active' : ''}`}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '0',
                        fontSize: '0.9375rem',
                        fontWeight: active ? 700 : 500,
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                        color: scrolled
                          ? active ? 'var(--color-text-base)' : 'var(--color-text-base)'
                          : '#ffffff',
                        background: 'transparent',
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

        <div style={{ marginTop: '2.5rem' }}>
          <Link href={data.cta.href} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            {data.cta.label}
          </Link>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav { display: flex !important; }
          .mobile-nav  { display: none !important; }
        }
        .nav-link {
          position: relative;
          transition: color 180ms ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 0.75rem;
          right: 0.75rem;
          height: 2px;
          border-radius: 2px;
          background: var(--color-willow-500);
          transform: scaleX(0);
          transition: transform 200ms ease;
        }
        .nav-link:hover::after,
        .nav-link--active::after {
          transform: scaleX(1);
        }
      `}</style>
    </>
  )
}
