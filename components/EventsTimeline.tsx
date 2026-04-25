'use client'

import { useState } from 'react'
import Image from 'next/image'

type CardKey = 'haldi' | 'wedding' | 'feast'

interface EventsDict {
  presence_heading: string
  events: { haldi: string; wedding: string; feast: string }
  event_times: { haldi: string; wedding: string; feast: string }
}

const CARDS: { key: CardKey; img: string; alt: string }[] = [
  { key: 'wedding', img: '/images/wedding_ceremony.png', alt: 'Wedding Ceremony' },
  { key: 'haldi',   img: '/images/haldi.png',            alt: 'Haldi Ceremony' },
  { key: 'feast',   img: '/images/feast.png',            alt: 'Feast & Reception' },
]

function stackTransform(position: number): string {
  if (position === 0) return 'rotate(0deg) translateY(0) scale(1)'
  if (position === 1) return 'rotate(2.5deg) translateY(6px) scale(0.97)'
  return 'rotate(-4deg) translateY(12px) scale(0.94)'
}

export default function EventsTimeline({ dict, isMar }: { dict: EventsDict; isMar: boolean }) {
  // order[position] = cardIdx: order[0] is always on top
  const [order, setOrder] = useState([0, 1, 2])
  const [busy, setBusy] = useState(false)
  const [flyCardIdx, setFlyCardIdx] = useState<number | null>(null)
  const [flyPhase, setFlyPhase] = useState<0 | 1 | 2>(0)

  function cardTransform(cardIdx: number, position: number): string {
    if (cardIdx === flyCardIdx) {
      if (flyPhase === 1) return 'rotate(-10deg) translateY(-50px) translateX(-20px) scale(0.9)'
      if (flyPhase === 2) return 'rotate(5deg) translateY(60px) scale(0.88)'
    }
    return stackTransform(position)
  }

  function cardZIndex(cardIdx: number, position: number): number {
    if (cardIdx === flyCardIdx) return 10
    return 3 - position
  }

  function cardTransition(cardIdx: number): string {
    if (cardIdx === flyCardIdx && flyPhase === 1) return 'none'
    if (cardIdx === flyCardIdx && flyPhase === 2) return 'transform 0.4s ease'
    return 'transform 0.5s ease'
  }

  function shuffle() {
    if (busy) return
    const topIdx = order[0]
    setBusy(true)
    setFlyCardIdx(topIdx)
    setFlyPhase(1)

    setTimeout(() => {
      setFlyPhase(2)
      setTimeout(() => {
        setOrder((prev) => [...prev.slice(1), prev[0]])
        setFlyCardIdx(null)
        setFlyPhase(0)
        setBusy(false)
      }, 400)
    }, 220)
  }

  return (
    <section
      style={{
        background: '#fdf6ee',
        padding: '52px 24px 60px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 13,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: '#b8874a',
          marginBottom: 8,
        }}
      >
        {isMar ? 'आपणास निमंत्रण' : 'You are invited'}
      </p>
      <h2
        style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 38,
          fontWeight: 300,
          color: '#3b200a',
          marginBottom: 6,
          textAlign: 'center',
        }}
      >
        {isMar ? 'विवाह कार्यक्रम' : 'Wedding Events'}
      </h2>
      <p
        style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 14,
          color: '#8b6040',
          letterSpacing: '0.12em',
          marginBottom: 44,
        }}
      >
        {isMar ? 'बुधवार · १३ मे २०२६' : 'Wednesday · 13 May 2026'}
      </p>

      {/* Card deck */}
      <div
        style={{ position: 'relative', width: 300, height: 420, margin: '0 auto', cursor: 'pointer' }}
        onClick={shuffle}
      >
        {order.map((cardIdx, position) => {
          const card = CARDS[cardIdx]
          const isTop = position === 0

          return (
            <div
              key={cardIdx}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: '0 12px 40px rgba(60,30,10,0.18)',
                cursor: 'pointer',
                userSelect: 'none',
                transformOrigin: 'bottom center',
                background: '#fff',
                willChange: 'transform',
                zIndex: cardZIndex(cardIdx, position),
                transform: cardTransform(cardIdx, position),
                transition: cardTransition(cardIdx),
              }}
            >
              <div style={{ width: '100%', height: '62%', position: 'relative' }}>
                <Image
                  src={card.img}
                  alt={card.alt}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  sizes="300px"
                />
              </div>
              <div style={{ padding: '20px 22px 18px', background: '#fff' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: 26,
                    fontWeight: 400,
                    color: '#3b200a',
                    lineHeight: 1.1,
                    marginBottom: 8,
                  }}
                >
                  {dict.events[card.key]}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: 14,
                    color: '#b8874a',
                    letterSpacing: '0.08em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <div style={{ width: 18, height: 1, background: '#b8874a', flexShrink: 0 }} />
                  {dict.event_times[card.key]}
                </div>
                {isTop && (
                  <span
                    style={{
                      display: 'inline-block',
                      marginTop: 10,
                      fontFamily: 'var(--font-cormorant)',
                      fontSize: 11,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: '#fff',
                      background: '#b8874a',
                      padding: '3px 10px',
                      borderRadius: 20,
                    }}
                  >
                    {isMar ? 'पुढे पाहण्यासाठी टॅप करा' : 'Tap to reveal next'}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 18 }}>
        {CARDS.map((_, i) => {
          const isActive = order[0] === i
          return (
            <div
              key={i}
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: isActive ? '#b8874a' : '#d4b896',
                transform: isActive ? 'scale(1.3)' : 'scale(1)',
                transition: 'background 0.3s, transform 0.3s',
              }}
            />
          )
        })}
      </div>

      <p
        style={{
          textAlign: 'center',
          marginTop: 18,
          fontFamily: 'var(--font-cormorant)',
          fontSize: 13,
          letterSpacing: '0.12em',
          color: '#c8a47a',
        }}
      >
        {isMar ? 'कार्डवर टॅप करा' : 'Tap the card to shuffle'}
      </p>
    </section>
  )
}
