import type { Metadata } from 'next'
import {
  Cormorant_Garamond,
  Great_Vibes,
  Cinzel,
  Tiro_Devanagari_Marathi,
} from 'next/font/google'
import '../globals.css'

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

export const metadata: Metadata = {
  title: 'Sangram & Prajakta — Wedding Invitation',
  description:
    'You are cordially invited to the wedding of Sangram Tukaram Konde and Prajakta Aniruddha Jadhav on 13 May 2026.',
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'mar' }]
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return (
    <html
      lang={lang === 'mar' ? 'mr' : 'en'}
      className={`${cormorant.variable} ${greatVibes.variable} ${cinzel.variable} ${tiroDevanagari.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
