import Reveal from './ui/Reveal'

const INDUSTRIES = [
  'Law firms',
  'Med spas & clinics',
  'Restaurants',
  'Property management',
  'Mortgage brokers',
  'Home services',
  'Dental practices',
  'Auto shops',
]

export default function Industries() {
  return (
    <section className="band">
      <div className="wrap">
        <div className="sec-head">
          <Reveal as="p" className="eyebrow">
            Who it's for
          </Reveal>
          <Reveal as="h2" className="h-xl" d={1}>
            Built for businesses that run on operations.
          </Reveal>
          <Reveal as="p" className="lead" d={2} style={{ marginTop: 18 }}>
            If your day is calls, appointments, follow-ups, and paperwork, there's busywork we can take off
            your plate.
          </Reveal>
        </div>
        <Reveal className="ind-row" d={1}>
          {INDUSTRIES.map((i) => (
            <span className="ind" key={i}>
              {i}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
