'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface CoupleDict {
  couple_heading: string
  bride: string
  groom: string
  couple: string
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.18 }
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return { ref, visible }
}

function PhotoRowLeft({ src, alt, name, caption }: { src: string; alt: string; name: string; caption: string }) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '0 28px',
        marginBottom: 28,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-60px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      <div
        style={{
          width: 160,
          height: 210,
          borderRadius: 12,
          overflow: 'hidden',
          flexShrink: 0,
          boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
          position: 'relative',
        }}
      >
        <Image src={src} alt={alt} fill style={{ objectFit: 'cover', objectPosition: 'center top' }} sizes="160px" />
      </div>
      <div style={{ flex: 1, padding: '0 20px', textAlign: 'left' }}>
        <div
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 28,
            fontStyle: 'italic',
            fontWeight: 300,
            color: '#f5e8d0',
            lineHeight: 1.1,
            marginBottom: 8,
          }}
        >
          {name}
        </div>
        <div style={{ width: 30, height: 1, background: '#b8874a', marginBottom: 8 }} />
        <div
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 13,
            color: '#c8a47a',
            lineHeight: 1.6,
          }}
        >
          {caption}
        </div>
      </div>
    </div>
  )
}

function PhotoRowRight({ src, alt, name, caption }: { src: string; alt: string; name: string; caption: string }) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        padding: '0 28px',
        marginBottom: 28,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(60px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      <div
        style={{
          width: 160,
          height: 210,
          borderRadius: 12,
          overflow: 'hidden',
          flexShrink: 0,
          boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
          position: 'relative',
        }}
      >
        <Image src={src} alt={alt} fill style={{ objectFit: 'cover', objectPosition: 'center top' }} sizes="160px" />
      </div>
      <div style={{ flex: 1, padding: '0 20px', textAlign: 'right' }}>
        <div
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 28,
            fontStyle: 'italic',
            fontWeight: 300,
            color: '#f5e8d0',
            lineHeight: 1.1,
            marginBottom: 8,
          }}
        >
          {name}
        </div>
        <div style={{ width: 30, height: 1, background: '#b8874a', marginBottom: 8, marginLeft: 'auto' }} />
        <div
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 13,
            color: '#c8a47a',
            lineHeight: 1.6,
          }}
        >
          {caption}
        </div>
      </div>
    </div>
  )
}

function PhotoCenter({ src, alt }: { src: string; alt: string }) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 28,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
      }}
    >
      <div
        style={{
          width: 280,
          height: 360,
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
          position: 'relative',
        }}
      >
        <Image src={src} alt={alt} fill style={{ objectFit: 'cover', objectPosition: 'center top' }} sizes="280px" />
      </div>
    </div>
  )
}

export default function CoupleSection({ dict, isMar }: { dict: CoupleDict; isMar: boolean }) {
  const parts = dict.couple.split('&').map((s) => s.trim())
  const firstName = parts[0] ?? (isMar ? 'प्राजक्ता' : 'Prajakta')
  const secondName = parts[1] ?? (isMar ? 'संग्राम' : 'Sangram')

  return (
    <section
      style={{
        background: '#1a1008',
        padding: '60px 0 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 12,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#b8874a',
          marginBottom: 10,
        }}
      >
        {isMar ? 'वधू आणि वर' : 'The Couple'}
      </p>
      <h2
        style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 36,
          fontWeight: 300,
          color: '#f5e8d0',
          marginBottom: 48,
          textAlign: 'center',
          padding: '0 20px',
        }}
      >
        {isMar ? dict.couple_heading : `${firstName} & ${secondName}`}
      </h2>

      <PhotoRowLeft
        src="/images/photo_prajakta.png"
        alt="Prajakta"
        name={firstName}
        caption={isMar ? 'तेजस्वी, सुंदर\nआणि प्रेमाने भरलेली' : 'Radiant, graceful\nand full of love'}
      />

      <PhotoCenter src="/images/photo_couple.png" alt="Couple together" />

      <PhotoRowRight
        src="/images/photo_sangram.png"
        alt="Sangram"
        name={isMar ? 'एकत्र\nसदैव' : 'Together\nforever'}
        caption={isMar ? '१३ मे २०२६\nअक्षय लॉन्स' : '13 May 2026\nAkshay Lawns'}
      />
    </section>
  )
}
