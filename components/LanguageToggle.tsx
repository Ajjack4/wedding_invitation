'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

interface LanguageToggleProps {
  lang: string
  invitee?: string[]
}

export default function LanguageToggle({ lang, invitee }: LanguageToggleProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function switchLang(newLang: string) {
    if (newLang === lang) return
    const inviteePath = invitee && invitee.length > 0 ? `/${invitee.join('/')}` : ''
    startTransition(() => { router.push(`/${newLang}${inviteePath}`) })
  }

  return (
    <div
      className="flex items-center overflow-hidden rounded-full"
      style={{ border: '1.5px solid #C9A84C60', background: '#FDF8F0' }}
      aria-label="Language selector"
    >
      {(['en', 'mar'] as const).map((l, i) => (
        <button
          key={l}
          onClick={() => switchLang(l)}
          disabled={isPending}
          className="px-5 py-2 text-sm font-semibold tracking-widest transition-all"
          style={{
            fontFamily: l === 'mar' ? 'var(--font-devanagari)' : 'var(--font-cinzel)',
            background: lang === l ? 'linear-gradient(135deg, #7B1C1C, #A52A2A)' : 'transparent',
            color:      lang === l ? '#FDF8F0' : '#7B1C1C',
            borderRight: i === 0 ? '1.5px solid #C9A84C40' : 'none',
          }}
          aria-pressed={lang === l}
        >
          {l === 'en' ? 'EN' : 'मर'}
        </button>
      ))}
    </div>
  )
}
