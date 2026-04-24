'use client'

import { motion } from 'framer-motion'
import CountdownTimer from './CountdownTimer'

interface HeroDict {
  couple: string
  date: string
  tagline: string
  countdown: { days: string; hours: string; minutes: string; seconds: string }
}

/** Top floral arch banner — mimics the reference image's decorative top */
function FloralArchBanner() {
  return (
    <div className="w-full overflow-hidden" style={{ maxHeight: 130 }}>
      <svg viewBox="0 0 390 130" className="w-full" preserveAspectRatio="xMidYMax slice" aria-hidden>
        {/* Background strip */}
        <rect width="390" height="130" fill="#FDF8F0" />

        {/* Arch shape */}
        <path d="M0 130 L0 80 Q195 -10 390 80 L390 130 Z" fill="#FDF0DC" />

        {/* Gold arch outline */}
        <path d="M0 80 Q195 -10 390 80" fill="none" stroke="#C9A84C" strokeWidth="2.5" />

        {/* Scalloped edge on arch */}
        {Array.from({ length: 13 }).map((_, i) => {
          const t   = i / 12
          const x   = t * 390
          const y   = 80 - 90 * Math.sin(Math.PI * t)
          const nx  = (i + 1) / 12 * 390
          const ny  = 80 - 90 * Math.sin(Math.PI * ((i + 1) / 12))
          const mx  = (x + nx) / 2
          const my  = (y + ny) / 2 - 8
          return <path key={i} d={`M${x} ${y} Q${mx} ${my} ${nx} ${ny}`}
            fill="none" stroke="#C9A84C" strokeWidth="1.5" opacity="0.6" />
        })}

        {/* Flower clusters */}
        {[
          { cx: 20,  cy: 100, c1: '#E8534A', c2: '#F4A340' },
          { cx: 70,  cy: 65,  c1: '#F4A340', c2: '#C9A84C' },
          { cx: 130, cy: 42,  c1: '#E8534A', c2: '#FFB347' },
          { cx: 195, cy: 30,  c1: '#C9A84C', c2: '#E8534A' },
          { cx: 260, cy: 42,  c1: '#F4A340', c2: '#E8534A' },
          { cx: 320, cy: 65,  c1: '#E8534A', c2: '#C9A84C' },
          { cx: 370, cy: 100, c1: '#F4A340', c2: '#E8534A' },
        ].map(({ cx, cy, c1, c2 }, i) => (
          <g key={i}>
            {[0, 72, 144, 216, 288].map((angle, j) => (
              <ellipse
                key={j}
                cx={cx + 11 * Math.cos((angle * Math.PI) / 180)}
                cy={cy + 11 * Math.sin((angle * Math.PI) / 180)}
                rx="5" ry="9"
                transform={`rotate(${angle} ${cx + 11 * Math.cos((angle * Math.PI) / 180)} ${cy + 11 * Math.sin((angle * Math.PI) / 180)})`}
                fill={j % 2 === 0 ? c1 : c2} opacity="0.85"
              />
            ))}
            <circle cx={cx} cy={cy} r="5" fill="#FFD700" />
          </g>
        ))}

        {/* Leaves */}
        {[45, 100, 155, 235, 290, 345].map((x, i) => (
          <g key={i}>
            <ellipse cx={x} cy={80 - 90 * Math.sin(Math.PI * x / 390) + 18}
              rx="10" ry="4"
              transform={`rotate(${-25 + i * 10} ${x} ${80 - 90 * Math.sin(Math.PI * x / 390) + 18})`}
              fill="#4a8c3f" opacity="0.65" />
          </g>
        ))}

        {/* Side tassel-like ornaments */}
        {[6, 12, 18, 24].map((y) => (
          <g key={y}>
            <line x1="0" y1={y * 4} x2="14" y2={y * 4} stroke="#C9A84C" strokeWidth="1.5" opacity="0.5" />
            <circle cx="14" cy={y * 4} r="2.5" fill="#C9A84C" opacity="0.6" />
            <line x1="390" y1={y * 4} x2="376" y2={y * 4} stroke="#C9A84C" strokeWidth="1.5" opacity="0.5" />
            <circle cx="376" cy={y * 4} r="2.5" fill="#C9A84C" opacity="0.6" />
          </g>
        ))}
      </svg>
    </div>
  )
}

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 w-full max-w-xs mx-auto">
      <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C)' }} />
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
        <path d="M12 2 L14.4 9.6 L22 12 L14.4 14.4 L12 22 L9.6 14.4 L2 12 L9.6 9.6 Z"
          fill="#C9A84C" opacity="0.9" />
      </svg>
      <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, #C9A84C, transparent)' }} />
    </div>
  )
}

export default function Hero({ dict, isMar }: { dict: HeroDict; isMar: boolean }) {
  return (
    <section
      id="main-content"
      className="relative flex flex-col items-center overflow-hidden"
      style={{ background: '#FDF8F0', minHeight: '100svh' }}
    >
      {/* Floral arch top banner */}
      <FloralArchBanner />

      {/* Main invitation content */}
      <div className="flex flex-col items-center justify-center flex-1 px-6 py-8 text-center w-full max-w-lg mx-auto">

        {/* "SAVE the DATE" header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-2"
        >
          <p
            className="tracking-[0.35em] uppercase text-xs mb-1"
            style={{ color: '#7B1C1C', fontFamily: 'var(--font-cinzel)' }}
          >
            {dict.tagline}
          </p>
          <div className="flex items-baseline justify-center gap-2">
            <span
              className="text-4xl font-black tracking-tight uppercase"
              style={{ color: '#7B1C1C', fontFamily: 'var(--font-cinzel)', fontWeight: 900 }}
            >
              SAVE
            </span>
            <span
              className="text-4xl"
              style={{ color: '#C9A84C', fontFamily: 'var(--font-great-vibes)', fontSize: '3rem' }}
            >
              the
            </span>
            <span
              className="text-4xl font-black tracking-tight uppercase"
              style={{ color: '#7B1C1C', fontFamily: 'var(--font-cinzel)', fontWeight: 900 }}
            >
              DATE
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="my-4 w-full max-w-60 mx-auto"
        >
          <GoldDivider />
        </motion.div>

        {/* Couple names */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mb-6"
        >
          {isMar ? (
            <h1
              style={{
                fontFamily: 'var(--font-devanagari)',
                fontSize: '2rem',
                color: '#7B1C1C',
                lineHeight: 1.3,
              }}
            >
              {dict.couple}
            </h1>
          ) : (
            <div className="flex flex-col items-center gap-0">
              <span
                className="text-5xl font-bold tracking-widest uppercase"
                style={{ color: '#7B1C1C', fontFamily: 'var(--font-cinzel)', letterSpacing: '0.15em' }}
              >
                {dict.couple.split('&')[0].trim()}
              </span>
              <span
                className="text-4xl my-1"
                style={{ color: '#C9A84C', fontFamily: 'var(--font-great-vibes)' }}
              >
                &amp;
              </span>
              <span
                className="text-5xl font-bold tracking-widest uppercase"
                style={{ color: '#7B1C1C', fontFamily: 'var(--font-cinzel)', letterSpacing: '0.15em' }}
              >
                {dict.couple.split('&')[1]?.trim()}
              </span>
            </div>
          )}
        </motion.div>

        {/* Date */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mb-6"
        >
          <div
            className="flex items-center gap-3 border px-4 py-2 rounded"
            style={{ borderColor: '#C9A84C', background: 'rgba(201,168,76,0.06)' }}
          >
            <div className="h-8 w-px" style={{ background: '#C9A84C' }} />
            <p
              className="text-xl font-bold tracking-widest"
              style={{
                color: '#7B1C1C',
                fontFamily: isMar ? 'var(--font-devanagari)' : 'var(--font-cinzel)',
                letterSpacing: '0.1em',
              }}
            >
              {dict.date}
            </p>
            <div className="h-8 w-px" style={{ background: '#C9A84C' }} />
          </div>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="w-full"
        >
          <CountdownTimer labels={dict.countdown} />
        </motion.div>
      </div>

      {/* Bottom decorative band */}
      <div className="w-full h-3" style={{ background: 'linear-gradient(90deg, #7B1C1C, #C9A84C, #7B1C1C)' }} />
    </section>
  )
}
