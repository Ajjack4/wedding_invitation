'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

interface HeroDict {
  couple: string
  date: string
  tagline: string
  countdown: { days: string; hours: string; minutes: string; seconds: string }
}

export default function Hero({ dict, isMar }: { dict: HeroDict; isMar: boolean }) {
  const [revealed, setRevealed] = useState(false)
  const [showHint, setShowHint] = useState(false)

  // Reveal content ~200ms after intro screen disappears (intro gone at 5100ms)
  useEffect(() => {
    const t1 = setTimeout(() => setRevealed(true), 5300)
    const t2 = setTimeout(() => setShowHint(true), 7100)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const parts = dict.couple.split('&').map((s) => s.trim())
  const firstName = parts[0] ?? ''
  const secondName = parts[1] ?? ''

  return (
    <section
      id="main-content"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100svh',
        background: '#1a1008',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background photo */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Image
          src="/images/wedding_arch1.jpeg"
          alt="Wedding arch"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
          sizes="100vw"
        />
      </div>

      {/* Radial warm overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 60% 52% at 50% 30%, rgba(255,245,240,0.18) 0%, rgba(255,245,240,0.06) 60%, transparent 100%)',
        }}
      />

      {/* Content layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: '8%',
          textAlign: 'center',
          padding: '8% 20px 0',
        }}
      >
        {/* Tagline */}
        <p
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 15,
            fontWeight: 400,
            color: '#5a3a1a',
            letterSpacing: '0.03em',
            lineHeight: 1.55,
            maxWidth: 220,
            textShadow: '0 1px 4px rgba(255,245,230,0.7)',
            marginBottom: 18,
            marginTop: 115,
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(18px)',
            transition: 'opacity 1s ease 0.1s, transform 1s ease 0.1s',
          }}
        >
          {isMar
            ? 'आपल्या उपस्थितीने हा सोहळा साजरा करा'
            : 'Mark your calendars to\nrejoice in the wedding of'}
        </p>

        {/* Couple names */}
        {isMar ? (
          <p
            style={{
              fontFamily: 'var(--font-devanagari)',
              fontSize: 'clamp(2.5rem, 11vw, 3.625rem)',
              fontWeight: 400,
              color: '#3b200a',
              lineHeight: 1.0,
              textShadow: '0 2px 12px rgba(255,240,210,0.8)',
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'translateY(0)' : 'translateY(18px)',
              transition: 'opacity 1s ease 0.4s, transform 1s ease 0.4s',
            }}
          >
            {dict.couple}
          </p>
        ) : (
          <div
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2.8rem, 12vw, 3.625rem)',
              fontWeight: 300,
              color: '#3b200a',
              lineHeight: 1.0,
              textShadow: '0 2px 12px rgba(255,240,210,0.8)',
              letterSpacing: '0.01em',
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'translateY(0)' : 'translateY(18px)',
              transition: 'opacity 1s ease 0.4s, transform 1s ease 0.4s',
            }}
          >
            {firstName}
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(2.2rem, 9vw, 2.875rem)',
                fontStyle: 'italic',
                fontWeight: 300,
                color: '#8b5e2a',
                margin: '6px 0',
                textShadow: '0 2px 8px rgba(255,230,180,0.6)',
              }}
            >
              &amp;
            </span>
            {secondName}
          </div>
        )}

        {/* Diamond divider */}
        <div
          style={{
            margin: '18px auto',
            width: 160,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(18px)',
            transition: 'opacity 1s ease 0.8s, transform 1s ease 0.8s',
          }}
        >
          <div
            style={{
              flex: 1,
              height: 1,
              background: 'linear-gradient(to right, transparent, #b8874a, transparent)',
            }}
          />
          <div
            style={{
              width: 7,
              height: 7,
              background: '#b8874a',
              transform: 'rotate(45deg)',
              flexShrink: 0,
            }}
          />
          <div
            style={{
              flex: 1,
              height: 1,
              background: 'linear-gradient(to right, transparent, #b8874a, transparent)',
            }}
          />
        </div>

        {/* Day of week */}
        <p
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 18,
            letterSpacing: '0.22em',
            fontWeight: 500,
            color: '#7a4e20',
            textTransform: 'uppercase',
            textShadow: '0 1px 6px rgba(255,240,210,0.8)',
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(18px)',
            transition: 'opacity 1s ease 1s, transform 1s ease 1s',
          }}
        >
          {isMar ? 'बुधवार' : 'Wednesday'}
        </p>

        {/* Date */}
        <p
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 22,
            fontWeight: 600,
            color: '#3b200a',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginTop: 5,
            textShadow: '0 1px 6px rgba(255,240,210,0.8)',
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(18px)',
            transition: 'opacity 1s ease 1.2s, transform 1s ease 1.2s',
          }}
        >
          {dict.date}
        </p>
      </div>

      {/* Scroll hint */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          opacity: showHint ? 1 : 0,
          transition: 'opacity 0.6s',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 11,
            letterSpacing: '0.2em',
            color: '#7a4e20',
            textTransform: 'uppercase',
          }}
        >
          {isMar ? 'कार्यक्रम' : 'Events'}
        </span>
        <div
          style={{
            width: 18,
            height: 18,
            borderRight: '1.5px solid #b8874a',
            borderBottom: '1.5px solid #b8874a',
            animation: 'bounce 1.4s infinite',
          }}
        />
      </div>
    </section>
  )
}
