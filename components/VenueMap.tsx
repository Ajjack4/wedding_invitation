'use client'

import { motion } from 'framer-motion'

interface VenueDict {
  venue_heading: string
  venue_name: string
  venue_address: string
  directions: string
}

const MAPS_LINK  = 'https://maps.app.goo.gl/GrNtXQgdrbAbUiUV8'
const MAPS_EMBED = 'https://maps.google.com/maps?q=Akshay+Lawns+Shirwal+Maharashtra&output=embed'

function LocationPin() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden>
      <path
        d="M18 3 C11 3 6 8.4 6 15 C6 23 18 33 18 33 C18 33 30 23 30 15 C30 8.4 25 3 18 3Z"
        fill="#7B1C1C" opacity="0.9"
      />
      <circle cx="18" cy="15" r="5" fill="#FDF8F0" />
      <circle cx="18" cy="15" r="2.5" fill="#7B1C1C" />
    </svg>
  )
}

function SectionHeader({ heading, sub, isMar }: { heading: string; sub: string; isMar: boolean }) {
  return (
    <motion.div
      className="mb-10 text-center"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7 }}
    >
      <p className="text-xs tracking-[0.35em] uppercase mb-2"
        style={{ color: '#C9A84C', fontFamily: 'var(--font-cinzel)' }}>
        {sub}
      </p>
      <h2 style={{
        fontFamily: isMar ? 'var(--font-devanagari)' : 'var(--font-cinzel)',
        fontSize: isMar ? '1.6rem' : '1.9rem',
        fontWeight: 700,
        color: '#7B1C1C',
        letterSpacing: '0.08em',
      }}>
        {heading}
      </h2>
      <div className="flex justify-center mt-3">
        <motion.div className="h-0.5"
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

export default function VenueMap({ dict, isMar }: { dict: VenueDict; isMar: boolean }) {
  return (
    <section className="py-20 px-5" style={{ background: '#FDF8F0' }}>
      <SectionHeader heading={dict.venue_heading} sub="venue" isMar={isMar} />

      <motion.div
        className="mx-auto max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8 }}
      >
        <div
          className="overflow-hidden rounded-3xl"
          style={{
            border: '2px solid #C9A84C60',
            boxShadow: '0 8px 40px rgba(123,28,28,0.1)',
          }}
        >
          {/* Venue info panel */}
          <div className="px-7 py-8 text-center" style={{ background: '#FDF8F0' }}>
            <div className="flex justify-center mb-3">
              <LocationPin />
            </div>
            <h3 style={{
              fontFamily: isMar ? 'var(--font-devanagari)' : 'var(--font-cinzel)',
              fontSize: '1.35rem',
              fontWeight: 700,
              color: '#7B1C1C',
              letterSpacing: '0.08em',
              marginBottom: '0.5rem',
            }}>
              {dict.venue_name}
            </h3>
            <p style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: '1.05rem',
              color: '#6b3a2a',
              lineHeight: 1.6,
              fontStyle: 'italic',
              marginBottom: '1.25rem',
            }}>
              {dict.venue_address}
            </p>

            {/* Gold rule */}
            <div className="mx-auto h-px w-32 mb-5"
              style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />

            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold tracking-widest transition-transform hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #7B1C1C, #A52A2A)',
                color: '#FDF8F0',
                fontFamily: 'var(--font-cinzel)',
                letterSpacing: '0.15em',
                boxShadow: '0 4px 16px rgba(123,28,28,0.35)',
              }}
            >
              {dict.directions}
            </a>
          </div>

          {/* Map */}
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={MAPS_EMBED}
              className="absolute inset-0 w-full h-full"
              style={{ border: 'none', borderTop: '2px solid #C9A84C40' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Akshay Lawns, Shirwal"
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
