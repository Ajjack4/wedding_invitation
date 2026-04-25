import { getDictionary } from './[lang]/dictionaries'
import Curtain from '../components/Curtain'
import Hero from '../components/Hero'
import EventsTimeline from '../components/EventsTimeline'
import VenueMap from '../components/VenueMap'
import CoupleSection from '../components/CoupleSection'
import RSVPSection from '../components/RSVPSection'

export default async function HomePage() {
  const dict = await getDictionary('en')
  const t = dict.invite

  return (
    <>
      <Curtain
        inviteeName=""
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
