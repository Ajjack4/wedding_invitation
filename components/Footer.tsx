'use client'

import { motion } from 'framer-motion'
import LanguageToggle from './LanguageToggle'

interface FooterDict {
  footer: string
  date: string
}

function DiyaIcon() {
  return (
    <svg width="24" height="30" viewBox="0 0 24 30" aria-hidden>
      <ellipse cx="12" cy="28" rx="7" ry="2"    fill="#C9A84C" opacity="0.4" />
      <path d="M5 22 Q12 28 19 22 Q16 25 12 25 Q8 25 5 22Z" fill="#C9A84C" />
      <ellipse cx="12" cy="21" rx="7" ry="2.5" fill="#8a6e24" />
      <ellipse cx="12" cy="14" rx="2.5" ry="4" fill="#FFD700" opacity="0.95" />
      <ellipse cx="12" cy="16" rx="1.2" ry="2.5" fill="#fff"   opacity="0.55" />
    </svg>
  )
}

function BotanicRule() {
  return (
    <svg viewBox="0 0 320 20" className="w-full max-w-xs mx-auto" aria-hidden>
      <line x1="0" y1="10" x2="130" y2="10" stroke="#C9A84C" strokeWidth="0.8" opacity="0.5" />
      {[0, 60, 130].map((x) => (
        <circle key={x} cx={x} cy="10" r="2.5" fill="#C9A84C" opacity="0.5" />
      ))}
      <circle cx="160" cy="10" r="5" fill="#C9A84C" opacity="0.8" />
      <ellipse cx="145" cy="10" rx="7" ry="3" transform="rotate(-30 145 10)" fill="#4a8c3f" opacity="0.5" />
      <ellipse cx="175" cy="10" rx="7" ry="3" transform="rotate(30 175 10)"  fill="#4a8c3f" opacity="0.5" />
      {[190, 260, 320].map((x) => (
        <circle key={x} cx={x} cy="10" r="2.5" fill="#C9A84C" opacity="0.5" />
      ))}
      <line x1="190" y1="10" x2="320" y2="10" stroke="#C9A84C" strokeWidth="0.8" opacity="0.5" />
    </svg>
  )
}

export default function Footer({
  dict, lang, invitee, isMar,
}: {
  dict: FooterDict
  lang: string
  invitee?: string[]
  isMar: boolean
}) {
  return (
    <motion.footer
      className="relative overflow-hidden py-14 px-5 text-center"
      style={{ background: '#FAF0DC' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <BotanicRule />

      <div className="mt-8 flex flex-col items-center gap-5">
        {/* Diya row + footer text */}
        <div className="flex items-center justify-center gap-3">
          <motion.div
            animate={{ rotate: [-4, 4, -4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <DiyaIcon />
          </motion.div>

          <p style={{
            fontFamily: isMar ? 'var(--font-devanagari)' : 'var(--font-cormorant)',
            fontSize: isMar ? '1.1rem' : '1.25rem',
            fontStyle: 'italic',
            color: '#7B1C1C',
            lineHeight: 1.5,
          }}>
            {dict.footer}
          </p>

          <motion.div
            animate={{ rotate: [4, -4, 4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <DiyaIcon />
          </motion.div>
        </div>

        {/* Wedding date */}
        <p style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: '0.75rem',
          letterSpacing: '0.3em',
          color: '#C9A84C',
        }}>
          13 · 05 · 2026
        </p>

        {/* Language toggle */}
        <LanguageToggle lang={lang} invitee={invitee} />
      </div>

      <BotanicRule />
    </motion.footer>
  )
}
