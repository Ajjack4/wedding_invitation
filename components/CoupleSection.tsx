'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface CoupleDict {
  couple_heading: string
  bride: string
  groom: string
}

// TODO: Replace src values below with actual photo paths e.g. "/images/couple-1.jpg"
const GALLERY = [
  {
    src: 'https://placehold.co/400x500/7B1C1C/FDF8F0?text=Groom',
    label: 'Sangram',
    hint: 'groom',
  },
  {
    src: 'https://placehold.co/400x500/C9A84C/7B1C1C?text=Together',
    label: 'Together',
    hint: 'together',
  },
  {
    src: 'https://placehold.co/400x500/7B1C1C/FDF8F0?text=Bride',
    label: 'Prajakta',
    hint: 'bride',
  },
]

function OrnateFrameSVG() {
  return (
    <svg
      viewBox="0 0 340 480"
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="none"
      aria-hidden
    >
      {/* Outer gold border */}
      <rect x="3" y="3" width="334" height="474" rx="14"
        fill="none" stroke="#C9A84C" strokeWidth="2.5" opacity="0.9" />
      {/* Inner border */}
      <rect x="10" y="10" width="320" height="460" rx="11"
        fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.35" />

      {/* Corner ornaments */}
      {[
        [18, 18, 0],
        [322, 18, 90],
        [322, 462, 180],
        [18, 462, 270],
      ].map(([cx, cy, rot], i) => (
        <g key={i} transform={`rotate(${rot} ${cx} ${cy})`}>
          <circle cx={cx} cy={cy} r="14" fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
          <circle cx={cx} cy={cy} r="5"  fill="#C9A84C" opacity="0.7" />
          {[0, 90].map((a) => (
            <line key={a}
              x1={cx} y1={cy}
              x2={cx + 22 * Math.cos((a * Math.PI) / 180)}
              y2={cy + 22 * Math.sin((a * Math.PI) / 180)}
              stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
          ))}
          {[45, 135].map((a) => (
            <ellipse key={a}
              cx={cx + 17 * Math.cos((a * Math.PI) / 180)}
              cy={cy + 17 * Math.sin((a * Math.PI) / 180)}
              rx="3" ry="6"
              transform={`rotate(${a} ${cx + 17 * Math.cos((a * Math.PI) / 180)} ${cy + 17 * Math.sin((a * Math.PI) / 180)})`}
              fill="#C9A84C" opacity="0.55" />
          ))}
        </g>
      ))}

      {/* Top center ornament */}
      <path d="M155 3 Q170 -4 185 3" fill="none" stroke="#C9A84C" strokeWidth="2" />
      <circle cx="170" cy="3" r="4" fill="#C9A84C" />

      {/* Bottom center ornament */}
      <path d="M155 477 Q170 484 185 477" fill="none" stroke="#C9A84C" strokeWidth="2" />
      <circle cx="170" cy="477" r="4" fill="#C9A84C" />
    </svg>
  )
}

function ScrollDots({ count, active }: { count: number; active: number }) {
  return (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-300"
          style={{
            width:  i === active ? 20 : 7,
            height: 7,
            background: i === active ? '#7B1C1C' : '#C9A84C50',
          }}
        />
      ))}
    </div>
  )
}

export default function CoupleSection({ dict, isMar }: { dict: CoupleDict; isMar: boolean }) {
  const scrollRef   = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  function onScroll() {
    if (!scrollRef.current) return
    const idx = Math.round(
      scrollRef.current.scrollLeft / scrollRef.current.offsetWidth
    )
    setActive(idx)
  }

  return (
    <section className="py-20 px-5" style={{ background: '#FAF0DC' }}>
      {/* Section heading */}
      <motion.div
        className="mb-10 text-center"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-xs tracking-[0.35em] uppercase mb-2"
          style={{ color: '#C9A84C', fontFamily: 'var(--font-cinzel)' }}>
          the couple
        </p>
        <h2 style={{
          fontFamily: isMar ? 'var(--font-devanagari)' : 'var(--font-cinzel)',
          fontSize: isMar ? '1.6rem' : '1.9rem',
          fontWeight: 700,
          color: '#7B1C1C',
          letterSpacing: '0.08em',
        }}>
          {dict.couple_heading}
        </h2>
        <div className="flex justify-center mt-3">
          <motion.div
            className="h-0.5"
            style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }}
            initial={{ width: 0 }}
            whileInView={{ width: 160 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Ornate framed gallery */}
      <motion.div
        className="mx-auto"
        style={{ maxWidth: 320 }}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8 }}
      >
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            boxShadow: '0 12px 48px rgba(123,28,28,0.15)',
            background: '#FDF8F0',
          }}
        >
          <OrnateFrameSVG />

          {/* Scrollable inner strip */}
          <div
            ref={scrollRef}
            onScroll={onScroll}
            className="relative z-10 flex overflow-x-auto snap-x snap-mandatory"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              aspectRatio: '3/4',
            }}
          >
            {GALLERY.map(({ src, label, hint }) => (
              <div
                key={hint}
                className="relative shrink-0 w-full h-full snap-center"
              >
                {/* TODO: Replace src with actual photo path */}
                <Image
                  src={src}
                  alt={label}
                  fill
                  className="object-cover"
                  sizes="320px"
                  draggable={false}
                />
                {/* Label overlay */}
                <div
                  className="absolute bottom-0 left-0 right-0 py-4 text-center"
                  style={{ background: 'linear-gradient(to top, rgba(253,248,240,0.95) 60%, transparent)' }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-great-vibes)',
                      fontSize: '1.8rem',
                      color: '#7B1C1C',
                    }}
                  >
                    {label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll dots */}
        <ScrollDots count={GALLERY.length} active={active} />

        {/* Swipe hint */}
        <p
          className="text-center mt-2 text-xs tracking-widest"
          style={{ color: '#C9A84C80', fontFamily: 'var(--font-cinzel)' }}
        >
          swipe to see more
        </p>
      </motion.div>

      {/* Names below frame */}
      <div className="mt-8 flex justify-center items-center gap-4">
        <span style={{ fontFamily: 'var(--font-great-vibes)', fontSize: '1.6rem', color: '#7B1C1C' }}>
          {isMar ? dict.groom : 'Sangram'}
        </span>
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
          <motion.path
            d="M10 17 C10 17 2 12 2 7 C2 4.5 4 3 6 3 C7.5 3 9 4 10 5.5 C11 4 12.5 3 14 3 C16 3 18 4.5 18 7 C18 12 10 17 10 17Z"
            fill="#7B1C1C"
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '10px 10px' }}
          />
        </svg>
        <span style={{ fontFamily: 'var(--font-great-vibes)', fontSize: '1.6rem', color: '#7B1C1C' }}>
          {isMar ? dict.bride : 'Prajakta'}
        </span>
      </div>
    </section>
  )
}
