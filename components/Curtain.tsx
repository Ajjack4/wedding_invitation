'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

interface CurtainProps {
  inviteeName: string
  tagline: string
  tapText: string
  isMar: boolean
}

export default function Curtain({ inviteeName, isMar }: CurtainProps) {
  const [step, setStep] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number | null>(null)

  const launchConfetti = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    canvas.width = window.innerWidth
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
        p.x += p.vx
        p.y += p.vy
        p.rot += p.rotSpeed
        p.vy += 0.04
        if (p.y > h + 20) {
          p.y = -20
          p.x = Math.random() * w
        }
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

  const playMusic = useCallback(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ActxCtor = (window as any).AudioContext || (window as any).webkitAudioContext
      if (!ActxCtor) return
      const actx = new ActxCtor() as AudioContext
      const notes = [261.6, 293.7, 329.6, 392, 440, 523.3, 440, 392, 329.6, 293.7, 261.6,
                     293.7, 329.6, 392, 440, 392, 329.6, 261.6, 293.7, 261.6]
      const durations = [0.4, 0.3, 0.3, 0.4, 0.4, 0.5, 0.3, 0.3, 0.4, 0.3, 0.5,
                         0.3, 0.3, 0.4, 0.5, 0.3, 0.3, 0.4, 0.3, 0.6]
      let t = actx.currentTime + 0.1

      notes.forEach((freq, i) => {
        const osc = actx.createOscillator()
        const gain = actx.createGain()
        const dur = durations[i]

        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq, t)

        const lfo = actx.createOscillator()
        const lfoGain = actx.createGain()
        lfo.frequency.value = 5.5
        lfoGain.gain.value = 4
        lfo.connect(lfoGain)
        lfoGain.connect(osc.frequency)
        lfo.start(t)
        lfo.stop(t + dur)

        gain.gain.setValueAtTime(0, t)
        gain.gain.linearRampToValueAtTime(0.18, t + 0.04)
        gain.gain.setValueAtTime(0.18, t + dur - 0.06)
        gain.gain.linearRampToValueAtTime(0, t + dur)

        osc.connect(gain)
        gain.connect(actx.destination)
        osc.start(t)
        osc.stop(t + dur + 0.05)

        t += dur
      })
    } catch (_) {}
  }, [])

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    const t = (ms: number, fn: () => void) => { timers.push(setTimeout(fn, ms)) }

    t(300,  () => setStep(1))
    t(900,  () => setStep(2))
    t(1200, () => setStep(3))
    t(1600, () => { setStep(4); launchConfetti() })
    t(4200, () => { stopConfetti(); setStep(5) })
    t(5100, () => { setStep(6); playMusic() })

    return () => {
      timers.forEach(clearTimeout)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [launchConfetti, stopConfetti, playMusic])

  if (step === 6) return null

  const isFading = step === 5
  const hasName = inviteeName.length > 0
  const coupleText = isMar
    ? 'संग्राम & प्राजक्ताचा विवाह'
    : "Prajakta & Sangram's Wedding"

  return (
    <div
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

      {/* Invitee name — only when a name was provided */}
      {hasName && (
        <p
          style={{
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
          }}
        >
          {inviteeName}
        </p>
      )}

      {/* Tagline — appears at step 1 when no name, step 2 when name present */}
      <p
        style={{
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
        }}
      >
        {isMar ? 'आपणास निमंत्रण आहे' : 'You are invited to'}
      </p>

      {/* Expanding divider */}
      <div
        style={{
          height: 1,
          background: '#b8874a',
          margin: '20px auto',
          width: step >= 3 ? 120 : 0,
          transition: 'width 0.8s ease',
          position: 'relative',
          zIndex: 1,
        }}
      />

      {/* Couple names */}
      <p
        style={{
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
        }}
      >
        {coupleText}
      </p>
    </div>
  )
}
