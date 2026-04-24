'use client'

import { useEffect, useState } from 'react'

interface PetalConfig {
  id: number
  left: number
  size: number
  delay: number
  duration: number
  type: 'petal' | 'marigold' | 'leaf'
  color: string
}

function PetalSVG({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <ellipse cx="12" cy="7"  rx="4" ry="6" opacity="0.85" />
      <ellipse cx="17" cy="13" rx="4" ry="6" transform="rotate(60 17 13)"  opacity="0.75" />
      <ellipse cx="7"  cy="13" rx="4" ry="6" transform="rotate(-60 7 13)" opacity="0.75" />
    </svg>
  )
}

function MarigoldSVG({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <ellipse key={a}
          cx={14 + 8 * Math.cos((a * Math.PI) / 180)}
          cy={14 + 8 * Math.sin((a * Math.PI) / 180)}
          rx="3.5" ry="7"
          transform={`rotate(${a} ${14 + 8 * Math.cos((a * Math.PI) / 180)} ${14 + 8 * Math.sin((a * Math.PI) / 180)})`}
          fill={color} opacity="0.85"
        />
      ))}
      <circle cx="14" cy="14" r="4.5" fill="#FFD700" />
    </svg>
  )
}

function LeafSVG({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <ellipse cx="12" cy="12" rx="5" ry="10" fill="#4a8c3f" opacity="0.65" />
      <line x1="12" y1="4" x2="12" y2="20" stroke="#3a6b30" strokeWidth="0.8" opacity="0.4" />
    </svg>
  )
}

const COLORS = ['#E8534A', '#F4A340', '#C9A84C', '#e8d08a', '#FFB347']

export default function FloatingPetals() {
  const [petals, setPetals] = useState<PetalConfig[]>([])

  useEffect(() => {
    setPetals(
      Array.from({ length: 20 }, (_, i) => ({
        id:       i,
        left:     Math.random() * 98,
        size:     12 + Math.random() * 14,
        delay:    Math.random() * 10,
        duration: 9 + Math.random() * 9,
        type:     (['petal', 'marigold', 'leaf'] as const)[i % 3],
        color:    COLORS[Math.floor(Math.random() * COLORS.length)],
      }))
    )
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-1 overflow-hidden" aria-hidden>
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            left:              `${p.left}%`,
            animationDuration: `${p.duration}s`,
            animationDelay:    `${p.delay}s`,
          }}
        >
          {p.type === 'petal'    && <PetalSVG   color={p.color} size={p.size} />}
          {p.type === 'marigold' && <MarigoldSVG color={p.color} size={p.size} />}
          {p.type === 'leaf'     && <LeafSVG    size={p.size} />}
        </div>
      ))}
    </div>
  )
}
