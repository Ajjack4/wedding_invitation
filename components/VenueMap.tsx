'use client'

interface VenueDict {
  venue_heading: string
  venue_name: string
  venue_address: string
  directions: string
}

const MAPS_LINK  = 'https://maps.app.goo.gl/GrNtXQgdrbAbUiUV8'
const MAPS_EMBED = 'https://maps.google.com/maps?q=Akshay+Lawns+Lawkim+Bypass+Rd+Shindewadi+Maharashtra+412801&output=embed&z=15'

export default function VenueMap({ dict, isMar }: { dict: VenueDict; isMar: boolean }) {
  return (
    <section
      style={{
        background: '#fdf6ee',
        padding: '52px 28px 56px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 12,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#b8874a',
          marginBottom: 8,
        }}
      >
        {isMar ? 'इथे या' : 'Join us at'}
      </p>
      <h2
        style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 36,
          fontWeight: 300,
          color: '#3b200a',
          marginBottom: 6,
          textAlign: 'center',
        }}
      >
        {isMar ? 'ठिकाण' : 'Venue'}
      </h2>
      <p
        style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 20,
          fontWeight: 600,
          color: '#8b5e2a',
          marginBottom: 4,
          textAlign: 'center',
        }}
      >
        {dict.venue_name}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 14,
          color: '#8b6040',
          lineHeight: 1.6,
          textAlign: 'center',
          maxWidth: 300,
          marginBottom: 28,
        }}
      >
        {dict.venue_address}
      </p>

      {/* Map embed */}
      <div
        style={{
          width: '100%',
          maxWidth: 380,
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(60,30,10,0.14)',
          marginBottom: 20,
          height: 240,
          background: '#e8ddd0',
        }}
      >
        <iframe
          src={MAPS_EMBED}
          width="100%"
          height="100%"
          style={{ border: 'none', display: 'block' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Akshay Lawns, Shirwal"
        />
      </div>

      <a
        href={MAPS_LINK}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: 'var(--font-cormorant)',
          fontSize: 15,
          letterSpacing: '0.12em',
          color: '#fff',
          background: '#b8874a',
          padding: '12px 28px',
          borderRadius: 40,
          textDecoration: 'none',
          marginTop: 8,
          boxShadow: '0 4px 16px rgba(184,135,74,0.35)',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        {dict.directions}
      </a>
    </section>
  )
}
