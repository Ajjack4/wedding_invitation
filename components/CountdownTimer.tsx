'use client'

import { useEffect, useState } from 'react'

const TARGET = new Date('2026-05-13T18:24:00+05:30').getTime()

interface CountdownLabels {
  days: string
  hours: string
  minutes: string
  seconds: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(): TimeLeft {
  const diff = Math.max(0, TARGET - Date.now())
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function Unit({ value, label }: { value: number; label: string }) {
  const [prev, setPrev]       = useState(value)
  const [flipping, setFlip]   = useState(false)

  useEffect(() => {
    if (value !== prev) {
      setFlip(true)
      const t = setTimeout(() => { setPrev(value); setFlip(false) }, 350)
      return () => clearTimeout(t)
    }
  }, [value, prev])

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="relative flex items-center justify-center rounded-xl overflow-hidden"
        style={{
          width: 64,
          height: 64,
          background: 'linear-gradient(160deg, #FDF8F0, #FAF0DC)',
          border: '1.5px solid #C9A84C',
          boxShadow: '0 2px 12px rgba(201,168,76,0.2), inset 0 1px 0 rgba(255,255,255,0.8)',
        }}
      >
        {/* Top/bottom split line for flip-card look */}
        <div className="absolute inset-x-0 top-1/2 h-px" style={{ background: 'rgba(201,168,76,0.25)' }} />
        <span
          className={flipping ? 'flip-in' : ''}
          style={{
            fontFamily: 'var(--font-cinzel)',
            fontSize: '1.75rem',
            fontWeight: 700,
            color: '#7B1C1C',
            lineHeight: 1,
          }}
        >
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span
        style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: '0.6rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#C9A84C',
        }}
      >
        {label}
      </span>
    </div>
  )
}

export default function CountdownTimer({ labels }: { labels: CountdownLabels }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    setTimeLeft(getTimeLeft())
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const skeleton = (
    <div className="flex gap-3 justify-center">
      {[labels.days, labels.hours, labels.minutes, labels.seconds].map((label) => (
        <div key={label} className="flex flex-col items-center gap-1.5">
          <div
            className="rounded-xl"
            style={{
              width: 64, height: 64,
              background: '#FAF0DC',
              border: '1.5px solid #C9A84C',
            }}
          />
          <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.6rem',
            letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9A84C' }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  )

  if (!timeLeft) return skeleton

  return (
    <div className="flex gap-3 justify-center">
      <Unit value={timeLeft.days}    label={labels.days} />
      <Unit value={timeLeft.hours}   label={labels.hours} />
      <Unit value={timeLeft.minutes} label={labels.minutes} />
      <Unit value={timeLeft.seconds} label={labels.seconds} />
    </div>
  )
}
