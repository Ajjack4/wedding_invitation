'use client'

import { motion } from 'framer-motion'

interface EventsDict {
  presence_heading: string
  events:      { haldi: string; wedding: string; feast: string }
  event_times: { haldi: string; wedding: string; feast: string }
}

function SectionHeading({ children, isMar }: { children: React.ReactNode; isMar: boolean }) {
  return (
    <motion.div
      className="mb-12 text-center"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7 }}
    >
      <p
        className="text-xs tracking-[0.35em] uppercase mb-3"
        style={{ color: '#C9A84C', fontFamily: 'var(--font-cinzel)' }}
      >
        ceremony
      </p>
      <h2
        style={{
          fontFamily: isMar ? 'var(--font-devanagari)' : 'var(--font-cinzel)',
          fontSize: isMar ? '1.6rem' : '1.9rem',
          fontWeight: 700,
          color: '#7B1C1C',
          letterSpacing: '0.08em',
        }}
      >
        {children}
      </h2>
      {/* Animated underline */}
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
  )
}

function HaldiIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden>
      <circle cx="16" cy="16" r="14" fill="#FFD700" opacity="0.15" />
      <ellipse cx="16" cy="13" rx="5" ry="7" fill="#FFD700" opacity="0.85" />
      <path d="M9 20 Q16 28 23 20" stroke="#C9A84C" strokeWidth="2" fill="none" />
      <circle cx="16" cy="16" r="2.5" fill="#C9A84C" />
    </svg>
  )
}

function RingsIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden>
      <circle cx="12" cy="16" r="7" stroke="#7B1C1C" strokeWidth="2.5" fill="none" />
      <circle cx="20" cy="16" r="7" stroke="#C9A84C"  strokeWidth="2.5" fill="none" />
      <circle cx="12" cy="16" r="2.5" fill="#7B1C1C" opacity="0.3" />
      <circle cx="20" cy="16" r="2.5" fill="#C9A84C"  opacity="0.3" />
    </svg>
  )
}

function FeastIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden>
      <ellipse cx="16" cy="21" rx="11" ry="4.5" stroke="#7B1C1C" strokeWidth="2" fill="none" />
      <path d="M5 21 Q16 11 27 21" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
      <line x1="16" y1="7" x2="16" y2="13" stroke="#7B1C1C" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="7" x2="12" y2="13" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="7" x2="20" y2="13" stroke="#7B1C1C" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

const EVENTS = [
  { key: 'haldi'   as const, Icon: HaldiIcon, fromLeft: true  },
  { key: 'wedding' as const, Icon: RingsIcon, fromLeft: false },
  { key: 'feast'   as const, Icon: FeastIcon, fromLeft: true  },
]

export default function EventsTimeline({ dict, isMar }: { dict: EventsDict; isMar: boolean }) {
  return (
    <section className="py-20 px-5" style={{ background: '#FAF0DC' }}>
      <SectionHeading isMar={isMar}>{dict.presence_heading}</SectionHeading>

      <div className="relative mx-auto max-w-md">
        {/* Center spine */}
        <div
          className="absolute left-1/2 top-4 bottom-4 w-px -translate-x-1/2"
          style={{ background: 'linear-gradient(180deg, transparent, #C9A84C60, transparent)' }}
        />

        <div className="flex flex-col gap-6">
          {EVENTS.map(({ key, Icon, fromLeft }, idx) => (
            <motion.div
              key={key}
              className="relative flex items-center gap-4"
              style={{ flexDirection: fromLeft ? 'row' : 'row-reverse' }}
              initial={{ opacity: 0, x: fromLeft ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.65, delay: idx * 0.12 }}
            >
              {/* Card */}
              <div
                className="flex-1 rounded-2xl p-5"
                style={{
                  background: '#FDF8F0',
                  border: '1.5px solid #C9A84C50',
                  boxShadow: '0 3px 16px rgba(123,28,28,0.07)',
                }}
              >
                <div className={`flex items-center gap-3 ${fromLeft ? '' : 'flex-row-reverse'}`}>
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                    style={{ background: 'rgba(201,168,76,0.12)', border: '1.5px solid #C9A84C40' }}
                  >
                    <Icon />
                  </div>
                  <div className={fromLeft ? 'text-left' : 'text-right'}>
                    <p
                      style={{
                        fontFamily: isMar ? 'var(--font-devanagari)' : 'var(--font-cinzel)',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: '#7B1C1C',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {dict.events[key]}
                    </p>
                    <p
                      className="mt-0.5"
                      style={{
                        fontFamily: 'var(--font-cormorant)',
                        fontSize: '1.1rem',
                        color: '#C9A84C',
                        fontStyle: 'italic',
                      }}
                    >
                      {dict.event_times[key]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Spine dot */}
              <div
                className="absolute left-1/2 -translate-x-1/2 z-10 h-3.5 w-3.5 rounded-full"
                style={{ background: '#C9A84C', boxShadow: '0 0 0 3px #FAF0DC, 0 0 0 5px #C9A84C40' }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom gold rule */}
      <div className="mt-14 flex justify-center">
        <div className="h-px w-48" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />
      </div>
    </section>
  )
}
