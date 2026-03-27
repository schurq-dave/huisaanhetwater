'use client'

import { useState } from 'react'
import type { HomeFaq } from '@/lib/types'

interface FaqSectionProps {
  data: HomeFaq
}

export default function FaqSection({ data }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="section-padding" style={{ background: 'var(--color-surface)' }}>
      <div className="container-default" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>{data.heading}</h2>
          <span className="heading-bar" style={{ margin: '0 auto' }} />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {data.items.map((item, index) => {
            const isOpen = openIndex === index
            
            return (
              <div 
                key={index}
                style={{ 
                  borderBottom: '1px solid var(--color-border)',
                  borderTop: index === 0 ? '1px solid var(--color-border)' : 'none',
                  overflow: 'hidden',
                  transition: 'background-color 300ms ease',
                  backgroundColor: isOpen ? 'var(--color-surface)' : 'transparent',
                }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  style={{
                    width: '100%',
                    padding: '1.5rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  aria-expanded={isOpen}
                >
                  <span style={{ 
                    fontWeight: 600, 
                    fontSize: '1.125rem', 
                    color: 'var(--color-text-base)',
                    paddingRight: '2rem'
                  }}>
                    {item.question}
                  </span>
                  <span 
                    style={{ 
                      flexShrink: 0,
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: isOpen ? 'var(--color-willow-100)' : 'var(--color-surface)',
                      color: isOpen ? 'var(--color-willow-700)' : 'var(--color-text-muted)',
                      transition: 'all 300ms ease',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 2V12M2 7H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: isOpen ? 'none' : 'block' }}/>
                      <path d="M2 7H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: isOpen ? 'block' : 'none' }}/>
                    </svg>
                  </span>
                </button>
                
                <div 
                  style={{
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows 300ms ease-in-out, opacity 300ms ease-in-out',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ 
                      padding: '0 1rem 1.5rem 1rem',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.7
                    }}>
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
