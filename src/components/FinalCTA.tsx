import Reveal from './ui/Reveal'

const CALENDLY = 'https://calendly.com/virdar-info/30min'

export default function FinalCTA() {
  return (
    <section className="band final" id="book">
      <div className="bg-glow" />
      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <Reveal as="p" className="eyebrow">
          Let's talk
        </Reveal>
        <Reveal as="h2" className="big" d={1} style={{ marginTop: 18 }}>
          Find out what to automate first.
        </Reveal>
        <Reveal as="p" className="sub" d={2}>
          A 20-minute call. We'll look at your operations and tell you honestly where AI would pay off, and
          where it wouldn't. No pitch deck.
        </Reveal>
        <Reveal
          d={3}
          style={{ marginTop: 36, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a className="btn" href={CALENDLY} target="_blank" rel="noopener noreferrer">
            Book a 20-min call
          </a>
          <a className="btn ghost" href="mailto:info@virdar.co">
            Email us instead
          </a>
        </Reveal>
      </div>
    </section>
  )
}
