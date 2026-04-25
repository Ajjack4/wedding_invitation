import type { Metadata } from 'next'
import {
  Cormorant_Garamond,
  Great_Vibes,
  Cinzel,
  Tiro_Devanagari_Marathi,
} from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-great-vibes',
  display: 'swap',
})

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-cinzel',
  display: 'swap',
})

const tiroDevanagari = Tiro_Devanagari_Marathi({
  subsets: ['devanagari'],
  variable: '--font-devanagari',
  display: 'swap',
  weight: '400',
})

const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Prajakta & Sangram — Wedding Invitation',
  description:
    'You are cordially invited to the wedding of Prajakta Aniruddha Jadhav and Sangram Tukaram Konde on 13 May 2026.',
  openGraph: {
    title: 'Prajakta & Sangram — Wedding Invitation',
    description: 'You are cordially invited to the wedding of Prajakta Aniruddha Jadhav and Sangram Tukaram Konde on 13 May 2026.',
    images: [{ url: '/images/metadata-image.jpeg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prajakta & Sangram — Wedding Invitation',
    description: 'You are cordially invited to the wedding of Prajakta Aniruddha Jadhav and Sangram Tukaram Konde on 13 May 2026.',
    images: ['/images/metadata-image.jpeg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${greatVibes.variable} ${cinzel.variable} ${tiroDevanagari.variable}`}
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
