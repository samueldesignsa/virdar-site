import { useEffect, useState } from 'react'
import Reveal from './ui/Reveal'
import { useCursorGlow } from '../lib/useCursorGlow'

export default function Hero() {
  const glowRef = useCursorGlow<HTMLElement>()
  const [promiseIn, setPromiseIn] = useState(false)

  useEffect(() => {
    // Slide the promise lines up shortly after mount so the transition plays.
    const t = window.setTimeout(() => setPromiseIn(true), 80)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <header className="hero" id="top" ref={glowRef}>
      <div className="bg-grid" />
      <div className="bg-glow" />
      <div className="wrap hero-inner">
        <Reveal as="p" className="eyebrow">
          AI systems for operations-heavy businesses
        </Reveal>
        <h1 className={`promise${promiseIn ? ' in' : ''}`}>
          <span className="line">
            <span>We build it.</span>
          </span>
          <span className="line">
            <span className="gold">You see it working.</span>
          </span>
          <span className="line">
            <span>Then you pay.</span>
          </span>
        </h1>
        <Reveal as="p" className="sub" d={2}>
          Your competitors are already running automated follow-up, faster response, and recall campaigns
          that run without anyone managing them. You don't have to figure out the tech — we build it on
          your actual workflow and show you it working before you pay.
        </Reveal>
        <Reveal className="cta-row" d={3}>
          <a className="btn" href="#book">
            Book a 20-min call
          </a>
          <a className="btn ghost" href="#what">
            See what we build
          </a>
        </Reveal>
        <Reveal className="meta-row" d={4}>
          <div className="m">
            <div className="n">2–4 wks</div>
            <div className="l">From kickoff to live</div>
          </div>
          <div className="m">
            <div className="n">$0</div>
            <div className="l">Until it works</div>
          </div>
          <div className="m">
            <div className="n">Dallas</div>
            <div className="l">Built in Texas</div>
          </div>
        </Reveal>
      </div>
    </header>
  )
}
