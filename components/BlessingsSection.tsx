'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface BlessingsDict {
  blessings: string
}

interface SparkleConfig {
  id: number; top: number; left: number
  size: number; delay: number; duration: number; color: string
}

function SparkleField() {
  const [sparkles, setSparkles] = useState<SparkleConfig[]>([])

  useEffect(() => {
    setSparkles(Array.from({ length: 28 }, (_, i) => ({
      id: i,
      top:      Math.random() * 100,
      left:     Math.random() * 100,
      size:     2 + Math.random() * 5,
      delay:    Math.random() * 4,
      duration: 2.5 + Math.random() * 3,
      color: i % 3 === 0 ? '#C9A84C' : i % 3 === 1 ? '#e8d08a' : '#7B1C1C',
    })))
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="sparkle absolute rounded-full"
          style={{
            top: `${s.top}%`, left: `${s.left}%`,
            width: s.size, height: s.size,
            background: s.color,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function BlessingsSection({ dict, isMar }: { dict: BlessingsDict; isMar: boolean }) {
  const words = dict.blessings.split(' ')

  return (
    <section
      className="relative flex min-h-64 items-center justify-center overflow-hidden px-6 py-20 text-center"
      style={{ background: '#FDF8F0' }}
    >
      <SparkleField />

      {/* Decorative side rules */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1"
        style={{ background: 'linear-gradient(180deg, transparent, #C9A84C60, transparent)' }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1"
        style={{ background: 'linear-gradient(180deg, transparent, #C9A84C60, transparent)' }} />

      <motion.div
        className="relative z-10 max-w-xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        {/* Top ornament */}
        <motion.div
          className="mx-auto mb-6 h-px max-w-48"
          style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        <p
          className="text-xs tracking-[0.35em] uppercase mb-5"
          style={{ color: '#C9A84C', fontFamily: 'var(--font-cinzel)' }}
        >
          blessings
        </p>

        {/* Word-by-word reveal */}
        <p style={{
          fontFamily: isMar ? 'var(--font-devanagari)' : 'var(--font-cormorant)',
          fontSize: isMar ? '1.5rem' : '1.85rem',
          fontStyle: isMar ? 'normal' : 'italic',
          fontWeight: 500,
          color: '#3a1a0a',
          lineHeight: 1.7,
        }}>
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.09 }}
            >
              {word}{i < words.length - 1 ? ' ' : ''}
            </motion.span>
          ))}
        </p>

        {/* Bottom ornament */}
        <motion.div
          className="mx-auto mt-6 h-px max-w-48"
          style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: words.length * 0.09 + 0.2 }}
        />
      </motion.div>
    </section>
  )
}
