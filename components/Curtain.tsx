'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CurtainProps {
  inviteeName: string
  tagline: string
  tapText: string
  isMar: boolean
}

/** Ornate Mughal-arch border for the invitation card */
function ArchBorder() {
  return (
    <svg
      viewBox="0 0 320 480"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="none"
      aria-hidden
    >
      {/* Outer frame */}
      <rect x="4" y="4" width="312" height="472" rx="12"
        fill="none" stroke="#C9A84C" strokeWidth="2" opacity="0.8" />
      <rect x="10" y="10" width="300" height="460" rx="10"
        fill="none" stroke="#C9A84C" strokeWidth="0.8" opacity="0.4" />

      {/* Arch at top */}
      <path
        d="M40 140 Q40 40 160 40 Q280 40 280 140"
        fill="none" stroke="#C9A84C" strokeWidth="2.5" opacity="0.9"
      />
      {/* Scalloped arch edge */}
      {Array.from({ length: 9 }).map((_, i) => {
        const x = 40 + i * 27
        return (
          <path
            key={i}
            d={`M${x} 140 Q${x + 13.5} 125 ${x + 27} 140`}
            fill="none" stroke="#C9A84C" strokeWidth="1.5" opacity="0.7"
          />
        )
      })}

      {/* Corner florals */}
      {[
        [20, 20, 0],
        [300, 20, 90],
        [300, 460, 180],
        [20, 460, 270],
      ].map(([cx, cy, rot], i) => (
        <g key={i} transform={`rotate(${rot} ${cx} ${cy})`}>
          <circle cx={cx} cy={cy} r="12" fill="#C9A84C" opacity="0.15" />
          <circle cx={cx} cy={cy} r="6"  fill="#C9A84C" opacity="0.5" />
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse
              key={a}
              cx={cx + 14 * Math.cos((a * Math.PI) / 180)}
              cy={cy + 14 * Math.sin((a * Math.PI) / 180)}
              rx="3" ry="6"
              transform={`rotate(${a} ${cx + 14 * Math.cos((a * Math.PI) / 180)} ${cy + 14 * Math.sin((a * Math.PI) / 180)})`}
              fill="#C9A84C" opacity="0.5"
            />
          ))}
        </g>
      ))}

      {/* Side decorative bands */}
      {[60, 90, 120, 360, 390, 420].map((y) => (
        <line key={y} x1="14" y1={y} x2="30" y2={y}
          stroke="#C9A84C" strokeWidth="1" opacity="0.35" />
      ))}
      {[60, 90, 120, 360, 390, 420].map((y) => (
        <line key={y + 1000} x1="290" y1={y} x2="306" y2={y}
          stroke="#C9A84C" strokeWidth="1" opacity="0.35" />
      ))}
    </svg>
  )
}

function FloralPetals() {
  return (
    <svg viewBox="0 0 320 120" className="w-full" aria-hidden>
      {/* Colorful floral clusters at top like reference image */}
      {[
        { cx: 30, cy: 50, color: '#E8534A', petals: 6 },
        { cx: 80, cy: 30, color: '#F4A340', petals: 5 },
        { cx: 140, cy: 20, color: '#E8534A', petals: 6 },
        { cx: 180, cy: 20, color: '#C9A84C', petals: 5 },
        { cx: 240, cy: 30, color: '#F4A340', petals: 6 },
        { cx: 290, cy: 50, color: '#E8534A', petals: 5 },
      ].map(({ cx, cy, color, petals }, i) => (
        <g key={i}>
          {Array.from({ length: petals }).map((_, j) => {
            const angle = (j * 360) / petals
            return (
              <ellipse
                key={j}
                cx={cx + 10 * Math.cos((angle * Math.PI) / 180)}
                cy={cy + 10 * Math.sin((angle * Math.PI) / 180)}
                rx="5" ry="10"
                transform={`rotate(${angle} ${cx + 10 * Math.cos((angle * Math.PI) / 180)} ${cy + 10 * Math.sin((angle * Math.PI) / 180)})`}
                fill={color} opacity="0.8"
              />
            )
          })}
          <circle cx={cx} cy={cy} r="5" fill="#FFD700" opacity="0.9" />
        </g>
      ))}
      {/* Green leaves */}
      {[50, 110, 170, 210, 260].map((x, i) => (
        <ellipse key={i} cx={x} cy={70} rx="8" ry="4"
          transform={`rotate(${-20 + i * 10} ${x} 70)`}
          fill="#4a8c3f" opacity="0.6" />
      ))}
    </svg>
  )
}

export default function Curtain({ inviteeName, tagline, tapText, isMar }: CurtainProps) {
  const [isOpen, setIsOpen]   = useState(false)
  const [isGone, setIsGone]   = useState(false)
  const timerRef              = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    timerRef.current = setTimeout(() => openCurtain(), 5000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function openCurtain() {
    if (isOpen) return
    if (timerRef.current) clearTimeout(timerRef.current)
    setIsOpen(true)
    setTimeout(() => {
      setIsGone(true)
      document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' })
    }, 1100)
  }

  if (isGone) return null

  const spring = { type: 'spring' as const, stiffness: 55, damping: 16 }

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[9999] flex cursor-pointer select-none"
        onClick={openCurtain}
        role="button"
        aria-label="Open invitation"
      >
        {/* ── Left curtain panel ─────────────────── */}
        <motion.div
          className="relative flex-1 overflow-hidden"
          animate={{ x: isOpen ? '-101%' : 0 }}
          transition={spring}
          style={{
            background: 'linear-gradient(160deg, #7B1C1C 0%, #A52A2A 40%, #6B1010 100%)',
          }}
        >
          {/* Fabric folds */}
          {[15, 35, 55, 75].map((pct) => (
            <div key={pct} className="absolute inset-y-0"
              style={{ left: `${pct}%`, width: '1px', background: 'rgba(255,255,255,0.07)' }} />
          ))}
          <div className="absolute inset-y-0 right-0 w-10"
            style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.35), transparent)' }} />
          {/* Gold trim on seam */}
          <div className="absolute inset-y-0 right-0 w-1"
            style={{ background: 'linear-gradient(180deg, transparent, #C9A84C, transparent)' }} />
        </motion.div>

        {/* ── Invitation card (behind curtains) ──── */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: '#FDF8F0', zIndex: -1 }}
        >
          {/* Top floral strip */}
          <div className="absolute top-0 left-0 right-0">
            <FloralPetals />
          </div>

          {/* Card */}
          <div className="relative mx-4 w-full max-w-xs" style={{ aspectRatio: '2/3', maxHeight: '85vh' }}>
            <ArchBorder />
            <div className="relative z-10 flex h-full flex-col items-center justify-center gap-3 px-10 text-center pt-8">
              <p
                className="text-xs tracking-[0.3em] uppercase"
                style={{ color: '#7B1C1C', fontFamily: 'var(--font-cinzel)', letterSpacing: '0.25em' }}
              >
                {tagline}
              </p>

              {/* Gold line */}
              <div className="h-px w-20" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />

              {/* Invitee name */}
              <h1
                className="leading-tight"
                style={{
                  fontFamily: isMar ? 'var(--font-devanagari)' : 'var(--font-great-vibes)',
                  fontSize: isMar ? '1.5rem' : '2.2rem',
                  color: '#7B1C1C',
                  lineHeight: 1.2,
                }}
              >
                {inviteeName}
              </h1>

              <div className="h-px w-20" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />

              {/* Tap button */}
              <button
                className="btn-pulse mt-2 rounded-full px-6 py-2.5 text-sm font-semibold tracking-wider"
                style={{
                  background: 'linear-gradient(135deg, #7B1C1C, #A52A2A)',
                  color: '#FDF8F0',
                  fontFamily: 'var(--font-cinzel)',
                  boxShadow: '0 4px 20px rgba(123,28,28,0.4)',
                }}
              >
                {tapText}
              </button>
            </div>
          </div>
        </div>

        {/* ── Right curtain panel ────────────────── */}
        <motion.div
          className="relative flex-1 overflow-hidden"
          animate={{ x: isOpen ? '101%' : 0 }}
          transition={spring}
          style={{
            background: 'linear-gradient(200deg, #7B1C1C 0%, #A52A2A 40%, #6B1010 100%)',
          }}
        >
          {[15, 35, 55, 75].map((pct) => (
            <div key={pct} className="absolute inset-y-0"
              style={{ left: `${pct}%`, width: '1px', background: 'rgba(255,255,255,0.07)' }} />
          ))}
          <div className="absolute inset-y-0 left-0 w-10"
            style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.35), transparent)' }} />
          <div className="absolute inset-y-0 left-0 w-1"
            style={{ background: 'linear-gradient(180deg, transparent, #C9A84C, transparent)' }} />
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
