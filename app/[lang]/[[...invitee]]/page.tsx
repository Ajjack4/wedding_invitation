import { redirect } from 'next/navigation'
import { getDictionary, hasLocale } from '../dictionaries'
import Curtain from '../../../components/Curtain'
import Hero from '../../../components/Hero'
import EventsTimeline from '../../../components/EventsTimeline'
import VenueMap from '../../../components/VenueMap'
import CoupleSection from '../../../components/CoupleSection'
import RSVPSection from '../../../components/RSVPSection'

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

  // Known locale (/en or /mar) → redirect to clean URL
  if (hasLocale(lang)) {
    if (invitee && invitee.length > 0) {
      redirect('/' + invitee.join('/'))
    }
    redirect('/')
  }

  // First segment is not a locale → treat entire path as invitee name
  // e.g. /john-doe → "John Doe", /john/doe → "John Doe"
  const dict = await getDictionary('en')
  const t = dict.invite
  const nameSegments = [lang, ...(invitee ?? [])]
  const inviteeName = toTitleCase(nameSegments.join(' ').replace(/-/g, ' '))

  return (
    <>
      <Curtain
        inviteeName={inviteeName}
        tagline={t.tagline}
        tapText={t.curtain_tap}
        isMar={false}
      />
      <main id="main-content" style={{ background: '#1a1008' }}>
        <Hero dict={t} isMar={false} />
        <EventsTimeline dict={t} isMar={false} />
        <CoupleSection dict={t} isMar={false} />
        <VenueMap dict={t} isMar={false} />
        <RSVPSection dict={t.rsvp} isMar={false} />
      </main>
    </>
  )
}
