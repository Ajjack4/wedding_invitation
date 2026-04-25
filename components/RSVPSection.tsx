'use client'

import { useRef, useState } from 'react'

interface RSVPDict {
  join_label: string
  title: string
  sub: string
  btn: string
  modal_title: string
  modal_sub: string
  name_label: string
  name_placeholder: string
  phone_label: string
  phone_placeholder: string
  guests_label: string
  guests_placeholder: string
  submit: string
  success_title: string
  success_text: string
}

const SHEET_URL = 'https://script.google.com/macros/s/AKfycby03pLfM0o_BssoyrmZrrXM8YOV95zAtP-Y6Yp-KCoXdhjb3Fch2rUf5lCI8xrHiNMeFg/exec'

export default function RSVPSection({ dict, isMar }: { dict: RSVPDict; isMar: boolean }) {
  const [open, setOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const nameRef   = useRef<HTMLInputElement>(null)
  const phoneRef  = useRef<HTMLInputElement>(null)
  const guestsRef = useRef<HTMLInputElement>(null)

  async function handleSubmit() {
    const name   = nameRef.current?.value.trim() ?? ''
    const phone  = phoneRef.current?.value.trim() ?? ''
    const guests = guestsRef.current?.value.trim() ?? ''
    if (!name || !phone || !guests) return

    setLoading(true)
    setError(false)
    try {
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ name, phone, guests }),
      })
      setSuccess(true)
      setTimeout(() => { setOpen(false); setSuccess(false) }, 2800)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-cormorant)',
    fontSize: 12,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#8b6040',
    display: 'block',
    marginBottom: 6,
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    border: '1.5px solid #e0cdb8',
    borderRadius: 10,
    fontFamily: 'var(--font-cormorant)',
    fontSize: 16,
    color: '#3b200a',
    background: '#fff',
    outline: 'none',
  }

  return (
    <>
      <section
        style={{
          background: 'linear-gradient(160deg, #3b200a 0%, #1a1008 100%)',
          padding: '60px 28px 70px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 12,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#b8874a',
            marginBottom: 10,
          }}
        >
          {dict.join_label}
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 42,
            fontWeight: 300,
            color: '#f5e8d0',
            marginBottom: 12,
            lineHeight: 1.1,
            whiteSpace: 'pre-line',
          }}
        >
          {dict.title}
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 15,
            color: '#c8a47a',
            lineHeight: 1.6,
            maxWidth: 280,
            marginBottom: 36,
          }}
        >
          {dict.sub}
        </p>
        <button
          onClick={() => setOpen(true)}
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 18,
            letterSpacing: '0.14em',
            color: '#3b200a',
            background: '#f5e8d0',
            border: 'none',
            padding: '16px 44px',
            borderRadius: 50,
            cursor: 'pointer',
            boxShadow: '0 8px 28px rgba(0,0,0,0.3)',
          }}
        >
          {dict.btn}
        </button>
      </section>

      {/* Modal backdrop */}
      <div
        onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(20,10,2,0.75)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'all' : 'none',
          transition: 'opacity 0.3s',
          backdropFilter: 'blur(4px)',
        }}
      >
        {/* Bottom-sheet modal */}
        <div
          style={{
            width: 'min(430px, 100vw)',
            background: '#fdf6ee',
            borderRadius: '24px 24px 0 0',
            padding: '32px 28px 40px',
            transform: open ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.4s cubic-bezier(0.33,1,0.68,1)',
          }}
        >
          {/* Handle */}
          <div
            style={{
              width: 40,
              height: 4,
              background: '#d4b896',
              borderRadius: 2,
              margin: '0 auto 24px',
            }}
          />

          {!success ? (
            <>
              <p
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 28,
                  fontWeight: 400,
                  color: '#3b200a',
                  marginBottom: 6,
                  textAlign: 'center',
                }}
              >
                {dict.modal_title}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 14,
                  color: '#8b6040',
                  textAlign: 'center',
                  marginBottom: 28,
                }}
              >
                {dict.modal_sub}
              </p>

              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>{dict.name_label}</label>
                <input ref={nameRef} type="text" placeholder={dict.name_placeholder} style={inputStyle} />
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>{dict.phone_label}</label>
                <input ref={phoneRef} type="tel" placeholder={dict.phone_placeholder} style={inputStyle} />
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>{dict.guests_label}</label>
                <input ref={guestsRef} type="number" min="1" max="20" placeholder={dict.guests_placeholder} style={inputStyle} />
              </div>

              {error && (
                <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 13, color: '#c0392b', textAlign: 'center', marginBottom: 8 }}>
                  Something went wrong — please try again.
                </p>
              )}
              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  width: '100%',
                  marginTop: 8,
                  padding: 15,
                  background: loading ? '#d4b896' : '#b8874a',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 12,
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 18,
                  letterSpacing: '0.1em',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s',
                }}
              >
                {loading ? '...' : dict.submit}
              </button>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: 42, marginBottom: 12 }}>🎊</div>
              <p
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 26,
                  color: '#3b200a',
                  marginBottom: 8,
                }}
              >
                {dict.success_title}
              </p>
              <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 15, color: '#8b6040' }}>
                {dict.success_text}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
