import { redirect } from 'next/navigation'
import { getDictionary, hasLocale } from '../dictionaries'
import Curtain from '../../../components/Curtain'
import Hero from '../../../components/Hero'
import EventsTimeline from '../../../components/EventsTimeline'
import VenueMap from '../../../components/VenueMap'
import CoupleSection from '../../../components/CoupleSection'
import RSVPSection from '../../../components/RSVPSection'
import Footer from '../../../components/Footer'

function toTitleCase(str: string): string {
  return str
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
}

export default async function InvitationPage({
  params,
}: {
  params: Promise<{ lang: string; invitee?: string[] }>
}) {
  const { lang, invitee } = await params

  if (!hasLocale(lang)) {
    redirect('/en')
  }

  const dict = await getDictionary(lang)
  const t = dict.invite

  const inviteeName = invitee
    ? toTitleCase(invitee.join(' ').replace(/-/g, ' '))
    : t.fallback_name

  const isMar = lang === 'mar'

  return (
    <>
      <Curtain
        inviteeName={inviteeName}
        tagline={t.tagline}
        tapText={t.curtain_tap}
        isMar={isMar}
      />
      <main id="main-content" style={{ background: '#1a1008' }}>
        <Hero dict={t} isMar={isMar} />
        <EventsTimeline dict={t} isMar={isMar} />
        <CoupleSection dict={t} isMar={isMar} />
        <VenueMap dict={t} isMar={isMar} />
        <RSVPSection dict={t.rsvp} isMar={isMar} />
        {/* <Footer dict={t} lang={lang} invitee={invitee} isMar={isMar} /> */}
      </main>
    </>
  )
}
