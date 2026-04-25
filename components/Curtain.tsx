'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

interface CurtainProps {
  inviteeName: string
  tagline: string
  tapText: string
  isMar: boolean
}

export default function Curtain({ inviteeName, isMar }: CurtainProps) {
  const [step,  setStep]  = useState(0)
  const [muted, setMuted] = useState(false)

  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const animRef      = useRef<number | null>(null)
  const audioRef     = useRef<HTMLAudioElement | null>(null)
  const dismissedRef = useRef(false)

  const launchConfetti = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight

    const colors = ['#b8874a', '#f5e8d0', '#d4403a', '#e8c06a', '#7a3b8a', '#ffffff', '#f0a050']
    const pieces = Array.from({ length: 140 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.5,
      w: 6 + Math.random() * 8,
      h: 3 + Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.12,
      vx: (Math.random() - 0.5) * 2.5,
      vy: 2.5 + Math.random() * 3.5,
      opacity: 0.85 + Math.random() * 0.15,
    }))

    const w = canvas.width
    const h = canvas.height
    function draw() {
      ctx.clearRect(0, 0, w, h)
      pieces.forEach((p) => {
        ctx.save()
        ctx.globalAlpha = p.opacity
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
        p.x += p.vx; p.y += p.vy; p.rot += p.rotSpeed; p.vy = Math.min(p.vy + 0.012, 4.5)
        if (p.y > h + 20) { p.y = -20; p.x = Math.random() * w }
      })
      animRef.current = requestAnimationFrame(draw)
    }
    draw()
  }, [])

  const stopConfetti = useCallback(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current)
    const canvas = canvasRef.current
    if (canvas) canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height)
  }, [])

  const dismiss = useCallback(() => {
    if (dismissedRef.current) return
    dismissedRef.current = true
    stopConfetti()
    setStep(5)

    try {
      const audio = new Audio('/songs/Navrai_Maajhi_English_Vinglish.mp3')
      audio.volume = 0.75
      audioRef.current = audio
      audio.play().catch(() => {})
    } catch (_) {}

    setTimeout(() => setStep(6), 900)
  }, [stopConfetti])

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    const t = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms))

    t(300,   () => setStep(1))
    t(900,   () => setStep(2))
    t(1200,  () => setStep(3))
    t(1600,  () => { setStep(4); launchConfetti() })
    t(12000, dismiss) // auto-dismiss after 12 s

    return () => {
      timers.forEach(clearTimeout)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [launchConfetti, dismiss])

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setMuted((prev) => {
      const next = !prev
      if (audioRef.current) audioRef.current.muted = next
      return next
    })
  }, [])

  // After curtain gone: only the mute button remains
  if (step === 6) {
    return <MuteButton muted={muted} onClick={toggleMute} />
  }

  const isFading  = step === 5
  const hasName   = inviteeName.length > 0
  const coupleText = isMar ? 'संग्राम & प्राजक्ताचा विवाह' : "Prajakta & Sangram's Wedding"

  return (
    <div
      onClick={step >= 1 ? dismiss : undefined}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        background: '#120a02',
        cursor: step >= 1 ? 'pointer' : 'default',
        pointerEvents: isFading ? 'none' : 'all',
        opacity: isFading ? 0 : 1,
        transform: isFading ? 'scale(1.06)' : 'scale(1)',
        transition: isFading ? 'opacity 0.9s ease, transform 0.9s ease' : undefined,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      />

      {hasName && (
        <p style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(1.6rem, 7vw, 2.25rem)',
          fontWeight: 300,
          color: '#f5e8d0',
          letterSpacing: '0.02em',
          position: 'relative',
          zIndex: 1,
          opacity: step >= 1 ? 1 : 0,
          transform: step >= 1 ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}>
          {inviteeName}
        </p>
      )}

      <p style={{
        fontFamily: 'var(--font-cormorant)',
        fontSize: hasName ? 'clamp(0.75rem, 3vw, 1rem)' : 'clamp(1.2rem, 5vw, 1.5rem)',
        letterSpacing: hasName ? '0.22em' : '0.18em',
        textTransform: 'uppercase',
        color: '#b8874a',
        marginTop: hasName ? 14 : 0,
        position: 'relative',
        zIndex: 1,
        opacity: step >= (hasName ? 2 : 1) ? 1 : 0,
        transform: step >= (hasName ? 2 : 1) ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}>
        {isMar ? 'आपणास निमंत्रण आहे' : 'You are cordially invited'}
      </p>

      <div style={{
        height: 1,
        background: '#b8874a',
        margin: '20px auto',
        width: step >= 3 ? 120 : 0,
        transition: 'width 0.8s ease',
        position: 'relative',
        zIndex: 1,
      }} />

      <p style={{
        fontFamily: 'var(--font-cormorant)',
        fontSize: 'clamp(1.8rem, 8vw, 3rem)',
        fontStyle: 'italic',
        fontWeight: 300,
        color: '#f5e8d0',
        letterSpacing: '0.02em',
        lineHeight: 1.1,
        position: 'relative',
        zIndex: 1,
        opacity: step >= 4 ? 1 : 0,
        transform: step >= 4 ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}>
        {coupleText}
      </p>

      {/* Tap-to-skip hint — flows directly below couple names */}
      <p style={{
        fontFamily: 'var(--font-cormorant)',
        fontSize: 11,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: '#b8874a',
        marginTop: 28,
        opacity: step >= 4 ? 0.7 : 0,
        transition: 'opacity 1s ease',
        position: 'relative',
        zIndex: 1,
        pointerEvents: 'none',
      }}>
        {isMar ? 'पुढे जाण्यासाठी स्पर्श करा' : 'Tap anywhere to continue'}
      </p>
    </div>
  )
}

function MuteButton({ muted, onClick }: { muted: boolean; onClick: (e: React.MouseEvent) => void }) {
  return (
    <button
      onClick={onClick}
      title={muted ? 'Unmute' : 'Mute'}
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 100,
        width: 44,
        height: 44,
        borderRadius: '50%',
        background: 'rgba(59,32,10,0.82)',
        border: '1px solid rgba(184,135,74,0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        backdropFilter: 'blur(6px)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
        padding: 0,
      }}
    >
      {muted ? (
        // Speaker muted
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b8874a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        // Speaker on
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b8874a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      )}
    </button>
  )
}
