import { useEffect, useRef, useState, useCallback, useMemo } from 'react'

// ─── Responsive hook ─────────────────────────────────────────────────────────
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  )

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    setIsMobile(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [breakpoint])

  return isMobile
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M2 3L14 25L26 3H20.5L14 17L7.5 3H2Z" fill="#4F8EF7" />
      </svg>
      <span style={{ fontSize: 20, fontWeight: 700, color: '#F5F5F5', letterSpacing: '-0.5px', fontFamily: 'Inter, sans-serif' }}>
        virdar
      </span>
    </div>
  )
}

// ─── Fade-in hook using Intersection Observer ────────────────────────────────
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navLinks = useMemo(() => (['Flagship', 'Services', 'How It Works', 'Pricing'] as const), [])

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: scrolled || menuOpen ? 'rgba(13,13,13,0.95)' : 'transparent',
          borderBottom: scrolled || menuOpen ? '1px solid #1E1E1E' : '1px solid transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'none',
          transition: 'all 0.3s ease',
          padding: '0 24px',
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 64,
          }}
        >
          {/* Logo */}
          <a href="#hero" style={{ textDecoration: 'none' }}>
            <Logo />
          </a>

          {/* Desktop nav */}
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
              <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                {navLinks.map((label) => {
                  const href = label === 'How It Works' ? '#how-it-works' : `#${label.toLowerCase()}`
                  return (
                    <a
                      key={label}
                      href={href}
                      style={{ fontSize: 14, color: '#888888', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 500 }}
                      onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = '#F5F5F5')}
                      onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = '#888888')}
                    >
                      {label}
                    </a>
                  )
                })}
              </div>
              <a
                href="https://calendly.com/virdar-info/30min"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  backgroundColor: '#4F8EF7',
                  color: '#fff',
                  borderRadius: 8,
                  padding: '10px 20px',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  textDecoration: 'none',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3a78e8')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4F8EF7')}
              >
                Book Your Free Call →
              </a>
            </div>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: menuOpen ? 0 : 5,
                justifyContent: 'center',
                alignItems: 'center',
                width: 40,
                height: 40,
              }}
            >
              <span style={{
                display: 'block', width: 22, height: 2, backgroundColor: '#F5F5F5', borderRadius: 1,
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: menuOpen ? 'rotate(45deg) translateY(0px)' : 'none',
              }} />
              <span style={{
                display: 'block', width: 22, height: 2, backgroundColor: '#F5F5F5', borderRadius: 1,
                transition: 'opacity 0.3s ease',
                opacity: menuOpen ? 0 : 1,
              }} />
              <span style={{
                display: 'block', width: 22, height: 2, backgroundColor: '#F5F5F5', borderRadius: 1,
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: menuOpen ? 'rotate(-45deg) translateY(0px)' : 'none',
                marginTop: menuOpen ? -2 : 0,
              }} />
            </button>
          )}
        </div>
      </nav>

      {/* Mobile menu overlay — rendered outside nav to avoid backdropFilter containing block issue */}
      {isMobile && menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 64,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99,
            backgroundColor: '#0D0D0D',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 32,
            padding: 24,
          }}
        >
          {navLinks.map((label) => {
            const href = label === 'How It Works' ? '#how-it-works' : `#${label.toLowerCase()}`
            return (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: 22,
                  color: '#F5F5F5',
                  textDecoration: 'none',
                  fontWeight: 600,
                  letterSpacing: '-0.3px',
                }}
              >
                {label}
              </a>
            )
          })}
          <a
            href="https://calendly.com/virdar-info/30min"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            style={{
              display: 'inline-block',
              backgroundColor: '#4F8EF7',
              color: '#fff',
              borderRadius: 10,
              padding: '14px 32px',
              fontSize: 17,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              textDecoration: 'none',
              marginTop: 8,
            }}
          >
            Book Your Free Call →
          </a>
        </div>
      )}
    </>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const isMobile = useIsMobile()

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: isMobile ? '100px 20px 60px' : '120px 24px 80px',
        position: 'relative',
      }}
    >
      {/* Subtle radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 400,
          background: 'radial-gradient(ellipse, rgba(79,142,247,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 780, position: 'relative' }}>
        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              border: '1px solid rgba(79,142,247,0.35)',
              borderRadius: 999,
              padding: '6px 14px',
              fontSize: 13,
              fontWeight: 500,
              color: '#4F8EF7',
              backgroundColor: 'rgba(79,142,247,0.08)',
              letterSpacing: '0.2px',
            }}
          >
            <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', backgroundColor: '#4F8EF7' }} />
            AI Automation Agency · Dallas, TX
          </span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: '#F5F5F5',
            marginBottom: 24,
            letterSpacing: '-1.5px',
          }}
        >
          We Build Your AI Automation Free.<br />
          <span style={{ color: '#4F8EF7' }}>You Pay After You See It Working.</span>
        </h1>

        <p
          style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            lineHeight: 1.6,
            color: '#888888',
            marginBottom: 40,
            maxWidth: 620,
            margin: '0 auto 40px',
          }}
        >
          Book a free 20-minute call. We map out exactly what we'd build for your business — custom, not a template. Zero cost until you love it.
        </p>

        <a
          href="https://calendly.com/virdar-info/30min"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            backgroundColor: '#4F8EF7',
            color: '#fff',
            borderRadius: 10,
            padding: '16px 36px',
            fontSize: 17,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            textDecoration: 'none',
            transition: 'background-color 0.2s ease, transform 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#3a78e8'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#4F8EF7'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Book Your Free Call →
        </a>

        {/* Trust line */}
        <p style={{ marginTop: 32, fontSize: 15, color: '#4F8EF7', fontWeight: 600, letterSpacing: '0.3px' }}>
          100% free to explore. We build first, you pay after.
        </p>

        {/* Location / availability note */}
        <p style={{ marginTop: 16, fontSize: 13, color: '#555555', letterSpacing: '0.5px' }}>
          Based in Dallas, TX · Currently accepting new clients
        </p>
      </div>
    </section>
  )
}

// ─── Problem ──────────────────────────────────────────────────────────────────
function Problem() {
  const ref = useFadeIn()
  const isMobile = useIsMobile()

  return (
    <section
      id="problem"
      style={{
        padding: isMobile ? '64px 20px' : '100px 24px',
        borderTop: '1px solid #1E1E1E',
      }}
    >
      <div ref={ref} className="fade-in" style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
        <h2
          style={{
            fontSize: 'clamp(26px, 4vw, 42px)',
            fontWeight: 700,
            color: '#F5F5F5',
            marginBottom: 32,
            letterSpacing: '-0.5px',
          }}
        >
          You're running a business,<br />not a call center.
        </h2>

        <div style={{ fontSize: 18, lineHeight: 1.9, color: '#888888' }}>
          <p>Every missed call is a missed customer.</p>
          <p>Every unanswered review is a lost referral.</p>
          <p>Every hour spent on onboarding paperwork is an hour not spent growing.</p>
        </div>

        <p
          style={{
            marginTop: 32,
            fontSize: 17,
            lineHeight: 1.8,
            color: '#aaaaaa',
          }}
        >
          Most local businesses don't have the time or team to handle all of it. Virdar builds
          the systems that do it for you — automatically, while you focus on what you're
          actually good at.
        </p>
      </div>
    </section>
  )
}

// ─── Flagship Systems ─────────────────────────────────────────────────────────
interface FlagshipCardProps {
  icon: string
  name: string
  headline: string
  body: string
  stats: string
  price: string
  delay?: string
}

function FlagshipCard({ icon, name, headline, body, stats, price, delay }: FlagshipCardProps) {
  const [hovered, setHovered] = useState(false)
  const ref = useFadeIn()

  return (
    <div
      ref={ref}
      className={`fade-in ${delay || ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: '#111111',
        border: hovered ? '1px solid rgba(79,142,247,0.5)' : '1px solid #1E1E1E',
        borderRadius: 14,
        padding: '32px 28px',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
        boxShadow: hovered ? '0 0 24px rgba(79,142,247,0.12)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        position: 'relative',
      }}
    >
      {/* FLAGSHIP BUILD badge */}
      <div
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          border: '1px solid #4F8EF7',
          borderRadius: 999,
          padding: '3px 10px',
          fontSize: 10,
          fontWeight: 700,
          color: '#4F8EF7',
          backgroundColor: 'rgba(79,142,247,0.08)',
          letterSpacing: '0.5px',
        }}
      >
        FLAGSHIP BUILD
      </div>

      {/* Icon */}
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          backgroundColor: 'rgba(79,142,247,0.1)',
          border: '1px solid rgba(79,142,247,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 22,
        }}
      >
        {icon}
      </div>

      {/* Name */}
      <h3 style={{ fontSize: 13, fontWeight: 600, color: '#888888', textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>
        {name}
      </h3>

      {/* Headline */}
      <p style={{ fontSize: 20, fontWeight: 700, color: '#F5F5F5', margin: 0, lineHeight: 1.3 }}>
        {headline}
      </p>

      {/* Body */}
      <p style={{ fontSize: 15, lineHeight: 1.7, color: '#888888', margin: 0 }}>
        {body}
      </p>

      {/* Stats */}
      <p style={{ fontSize: 13, color: '#555555', margin: 0, fontStyle: 'italic' }}>
        {stats}
      </p>

      {/* Price */}
      <p style={{ fontSize: 14, fontWeight: 500, color: '#555555', margin: 0 }}>
        {price}
      </p>
      <p style={{ fontSize: 13, fontWeight: 600, color: '#4F8EF7', margin: 0 }}>
        We build it free — you pay only if you love it.
      </p>
    </div>
  )
}

function FlagshipSystems() {
  const titleRef = useFadeIn()
  const isMobile = useIsMobile()

  const flagshipCards: FlagshipCardProps[] = [
    {
      icon: '📞',
      name: 'AI Voice Receptionist',
      headline: 'Your phone never goes unanswered again.',
      body: "An AI agent answers every inbound call — in your business's name, in your voice — around the clock. Takes reservations. Answers FAQs. Handles catering inquiries. Sends call transcripts to your phone. Your competitor just picked up at 10pm. Did you?",
      stats: 'Handles 200+ calls/month · Zero missed calls · Setup in 3 weeks',
      price: 'From $4,000',
      delay: 'fade-delay-1',
    },
    {
      icon: '🧠',
      name: 'Guest Intelligence & Loyalty System',
      headline: "You have 3,000 customers. You're ignoring 2,400 of them.",
      body: "We build a layer of intelligence on top of your POS data that tracks every guest: visit frequency, spend, favorite items, time since last visit. Drifting customers get an automated personalized reach-out. Your top 10% get recognized. Birthdays get remembered. Runs without you lifting a finger.",
      stats: 'Win-back rate 15–25% · ROI in the first month · Integrates with Toast & Square',
      price: 'From $5,500',
      delay: 'fade-delay-2',
    },
    {
      icon: '📱',
      name: 'Autonomous Social Media Manager',
      headline: 'The last time you posted was 3 weeks ago.',
      body: "We build a pipeline that generates content, writes captions, and posts for you — across Instagram, Facebook, and Google Business. When you have a special, you text us. Everything else runs on its own. Comments get replied to. DMs get answered. You stay visible without touching your phone.",
      stats: 'Posts daily · Responds to comments & DMs · Monthly performance report',
      price: 'From $4,500',
      delay: 'fade-delay-3',
    },
    {
      icon: '⭐',
      name: 'Reputation Intelligence System',
      headline: "Your reputation is your most valuable asset. Most owners don't watch it.",
      body: "Every review across Google, Yelp, TripAdvisor, and DoorDash — aggregated, responded to, and analyzed. Negative reviews flagged before they go live. Every Monday: your rating trend, competitor comparison, and what customers are actually saying. Always on top of it. Zero minutes spent.",
      stats: 'Covers 4+ platforms · Competitor benchmarking · Weekly intelligence digest',
      price: 'From $2,000',
      delay: 'fade-delay-4',
    },
  ]

  return (
    <section
      id="flagship"
      style={{
        padding: isMobile ? '64px 20px' : '100px 24px',
        borderTop: '1px solid #1E1E1E',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div ref={titleRef} className="fade-in" style={{ marginBottom: isMobile ? 36 : 56, textAlign: 'center' }}>
          <h2
            style={{
              fontSize: 'clamp(26px, 4vw, 42px)',
              fontWeight: 700,
              color: '#F5F5F5',
              letterSpacing: '-0.5px',
              marginBottom: 16,
            }}
          >
            What we build for you — custom, never a template
          </h2>
          <p style={{ fontSize: isMobile ? 15 : 17, color: '#888888', maxWidth: 640, margin: '0 auto', lineHeight: 1.7 }}>
            Every system is built specifically for your business. We build it first, demo it live, and you only pay if you love it.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: isMobile ? 20 : 24,
          }}
        >
          {flagshipCards.map((c) => (
            <FlagshipCard key={c.name} {...c} />
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 56 }}>
          <a
            href="https://calendly.com/virdar-info/30min" target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              backgroundColor: '#4F8EF7',
              color: '#fff',
              borderRadius: 10,
              padding: '16px 36px',
              fontSize: 17,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              textDecoration: 'none',
              transition: 'background-color 0.2s ease, transform 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#3a78e8'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#4F8EF7'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Book Your Free Call →
          </a>
          <p style={{ marginTop: 16, fontSize: 14, color: '#555555' }}>
            100% free to explore. We build first, you pay after.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Services ─────────────────────────────────────────────────────────────────
interface ServiceCardProps {
  icon: string
  name: string
  price: string
  description: string
  bullets: string[]
  bestFor: string
  cta?: string
  delay?: string
}

function ServiceCard({ icon, name, price, description, bullets, bestFor, cta, delay }: ServiceCardProps) {
  const [hovered, setHovered] = useState(false)
  const ref = useFadeIn()

  return (
    <div
      ref={ref}
      className={`fade-in ${delay || ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: '#111111',
        border: hovered ? '1px solid rgba(79,142,247,0.5)' : '1px solid #1E1E1E',
        borderRadius: 14,
        padding: '32px 28px',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
        boxShadow: hovered ? '0 0 24px rgba(79,142,247,0.12)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <div>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            backgroundColor: 'rgba(79,142,247,0.1)',
            border: '1px solid rgba(79,142,247,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            marginBottom: 16,
          }}
        >
          {icon}
        </div>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: '#F5F5F5', marginBottom: 6 }}>
          {name}
        </h3>
        <span style={{ fontSize: 15, fontWeight: 600, color: '#4F8EF7' }}>
          {price}
        </span>
      </div>

      <p style={{ fontSize: 15, lineHeight: 1.7, color: '#888888' }}>{description}</p>

      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {bullets.map((b, i) => (
          <li key={i} style={{ fontSize: 14, color: '#aaaaaa', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <span style={{ color: '#4F8EF7', flexShrink: 0, marginTop: 2 }}>✓</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <p style={{ fontSize: 13, color: '#555555', marginTop: 4, fontStyle: 'italic' }}>
        Best for: {bestFor}
      </p>

      {cta && (
        <a
          href="https://calendly.com/virdar-info/30min" target="_blank" rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            marginTop: 8,
            backgroundColor: 'transparent',
            border: '1px solid #4F8EF7',
            color: '#4F8EF7',
            borderRadius: 8,
            padding: '10px 18px',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            textDecoration: 'none',
            transition: 'background-color 0.2s ease, color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#4F8EF7'
            e.currentTarget.style.color = '#fff'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.color = '#4F8EF7'
          }}
        >
          {cta}
        </a>
      )}
    </div>
  )
}

function Services() {
  const titleRef = useFadeIn()
  const isMobile = useIsMobile()

  const services: ServiceCardProps[] = [
    {
      icon: '⭐',
      name: 'Review Response System',
      price: 'From $500',
      description:
        'Every Google, Yelp, and Facebook review gets a professional, personalized AI response — automatically. No more ignoring reviews or copy-pasting generic replies.',
      bullets: [
        'AI trained on your business voice and tone',
        'Automatic responses to new reviews within minutes',
        'Custom handling for negative reviews (flagged for your approval before posting)',
        'Setup + testing + handoff in 5 business days',
      ],
      bestFor: 'Restaurants, dental/medical offices, salons, retail, any business where reviews drive new customers.',
      delay: 'fade-delay-1',
    },
    {
      icon: '📲',
      name: 'Missed Call Text-Back',
      price: 'From $750',
      description:
        "When a customer calls and nobody answers, they don't leave a voicemail — they call your competitor. Missed Call Text-Back automatically sends a text to every missed call within 60 seconds.",
      bullets: [
        'Instant automated text to every missed caller',
        'Custom message with your hours, booking link, or direct reply option',
        'Works 24/7 — including nights, weekends, and holidays',
        'Setup + testing + handoff in 5 business days',
      ],
      bestFor:
        'Dental/medical offices, restaurants taking reservations, salons, contractors, any business that loses leads to voicemail.',
      delay: 'fade-delay-2',
    },
    {
      icon: '👋',
      name: 'New Customer / Patient Welcome Flow',
      price: 'From $600',
      description:
        "First impressions are automated too. When someone books or signs up, they automatically get a welcome sequence — confirmation, what to expect, what to bring, how to reach you — without you lifting a finger.",
      bullets: [
        'Automated welcome text + email on new booking/signup',
        'Custom pre-visit/pre-appointment instructions',
        'Reminder message 24 hours before',
        'Setup + testing + handoff in 5 business days',
      ],
      bestFor: 'Dental/medical offices, salons, fitness studios, any appointment-based business.',
      delay: 'fade-delay-3',
    },
    {
      icon: '⚡',
      name: 'Custom Automation (Ask Us)',
      price: 'Starting at $500 — scoped per project',
      description: "Have a specific repetitive task eating your time? We'll build the system to handle it.",
      bullets: [
        'Auto-post daily specials to Instagram + Google Business',
        'New employee onboarding document flow',
        'Appointment no-show follow-up sequence',
        'AI FAQ chat widget for your website',
      ],
      bestFor: 'Any local business with a repetitive manual process happening more than 10 times a week.',
      cta: 'Book Your Free Call →',
      delay: 'fade-delay-4',
    },
  ]

  return (
    <section
      id="services"
      style={{
        padding: isMobile ? '64px 20px' : '100px 24px',
        borderTop: '1px solid #1E1E1E',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div ref={titleRef} className="fade-in" style={{ marginBottom: isMobile ? 36 : 56, textAlign: 'center' }}>
          <h2
            style={{
              fontSize: 'clamp(26px, 4vw, 42px)',
              fontWeight: 700,
              color: '#F5F5F5',
              letterSpacing: '-0.5px',
            }}
          >
            Quick wins — live in 5 days, free until you love it
          </h2>
          <p style={{ fontSize: isMobile ? 15 : 17, color: '#888888', marginTop: 12 }}>
            We build it, demo it live, and you only pay when you're thrilled with the result. Zero risk to get started.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: isMobile ? 20 : 24,
          }}
        >
          {services.map((s) => (
            <ServiceCard key={s.name} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── How It Works ─────────────────────────────────────────────────────────────
interface StepProps {
  num: string
  title: string
  desc: string
  delayClass: string
}

function Step({ num, title, desc, delayClass }: StepProps) {
  const stepRef = useFadeIn()
  return (
    <div
      ref={stepRef}
      className={`fade-in ${delayClass}`}
      style={{ textAlign: 'center', padding: '0 12px' }}
    >
      <div
        style={{
          fontSize: 36,
          fontWeight: 800,
          color: '#4F8EF7',
          opacity: 0.6,
          marginBottom: 16,
          letterSpacing: '-1px',
        }}
      >
        {num}
      </div>
      <h3
        style={{
          fontSize: 17,
          fontWeight: 700,
          color: '#F5F5F5',
          marginBottom: 12,
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: 15, lineHeight: 1.7, color: '#888888' }}>{desc}</p>
    </div>
  )
}

function HowItWorks() {
  const titleRef = useFadeIn()
  const isMobile = useIsMobile()

  const steps: StepProps[] = [
    {
      num: '01',
      title: 'Book a free call',
      desc: '20 minutes. We learn your business, your bottlenecks, and what would move the needle.',
      delayClass: 'fade-delay-1',
    },
    {
      num: '02',
      title: 'We build it — free',
      desc: 'Custom AI automation built specifically for your business. Not a template. No charge yet.',
      delayClass: 'fade-delay-2',
    },
    {
      num: '03',
      title: 'You see it live',
      desc: 'Full demo of your working system before any payment. See exactly what it does.',
      delayClass: 'fade-delay-3',
    },
    {
      num: '04',
      title: 'You decide',
      desc: 'Transparent pricing. Setup fee + optional monthly support. It runs automatically from day one.',
      delayClass: 'fade-delay-4',
    },
  ]

  return (
    <section
      id="how-it-works"
      style={{
        padding: isMobile ? '64px 20px' : '100px 24px',
        borderTop: '1px solid #1E1E1E',
        backgroundColor: '#0a0a0a',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div ref={titleRef} className="fade-in" style={{ textAlign: 'center', marginBottom: isMobile ? 40 : 64 }}>
          <h2
            style={{
              fontSize: 'clamp(26px, 4vw, 42px)',
              fontWeight: 700,
              color: '#F5F5F5',
              letterSpacing: '-0.5px',
            }}
          >
            How it works — zero risk, every step
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: isMobile ? 24 : 32,
          }}
        >
          {steps.map((step) => (
            <Step key={step.num} {...step} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Pricing Clarity ──────────────────────────────────────────────────────────
function PricingClarity() {
  const ref = useFadeIn()
  const isMobile = useIsMobile()

  return (
    <section
      id="pricing"
      style={{
        padding: isMobile ? '64px 20px' : '100px 24px',
        borderTop: '1px solid #1E1E1E',
      }}
    >
      <div
        ref={ref}
        className="fade-in"
        style={{
          maxWidth: 680,
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(26px, 4vw, 42px)',
            fontWeight: 700,
            color: '#F5F5F5',
            marginBottom: 32,
            letterSpacing: '-0.5px',
          }}
        >
          Transparent pricing from day one.
        </h2>

        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#888888', marginBottom: 20 }}>
          Transparent pricing from day one. Custom setup fee based on your build, with optional monthly support to keep everything running and improving. You see it working before you pay anything.
        </p>

        <p
          style={{
            fontSize: 15,
            lineHeight: 1.8,
            color: '#666666',
            backgroundColor: '#111111',
            border: '1px solid #1E1E1E',
            borderRadius: 10,
            padding: '16px 24px',
          }}
        >
          Some automations use third-party tools like Twilio for SMS — those have small monthly
          costs, typically $10–30/month depending on volume. We'll tell you exactly what that is
          before you commit.
        </p>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
interface FAQItemProps {
  q: string
  a: string
}

function FAQItem({ q, a }: FAQItemProps) {
  const [open, setOpen] = useState(false)

  return (
    <div
      style={{
        borderBottom: '1px solid #1E1E1E',
        padding: '20px 0',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: 16,
          fontFamily: 'Inter, sans-serif',
          padding: 0,
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 600, color: '#F5F5F5' }}>{q}</span>
        <span
          style={{
            color: '#4F8EF7',
            fontSize: 20,
            flexShrink: 0,
            transition: 'transform 0.2s ease',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            lineHeight: 1,
          }}
        >
          +
        </span>
      </button>
      {open && (
        <p
          style={{
            marginTop: 12,
            fontSize: 15,
            lineHeight: 1.7,
            color: '#888888',
          }}
        >
          {a}
        </p>
      )}
    </div>
  )
}

function FAQ() {
  const ref = useFadeIn()
  const isMobile = useIsMobile()

  const faqs: FAQItemProps[] = [
    {
      q: 'Do I need to be technical to use any of this?',
      a: 'No. We build it, we set it up, we train it on your business. You just watch it run.',
    },
    {
      q: 'How long does it actually take?',
      a: 'Most builds are done and live within 5 business days of you approving the scope.',
    },
    {
      q: 'What if I want to make changes later?',
      a: "Minor tweaks are covered. If you want a major rebuild, we'll quote a small update fee.",
    },
    {
      q: 'How does payment work?',
      a: "We build your automation first. You see it live and working before paying anything. Setup fee is due on delivery, with an optional monthly retainer for ongoing support and updates.",
    },
    {
      q: 'What kinds of businesses do you work with?',
      a: "Restaurants, dental and medical offices, salons, contractors, retail — any local business with customers. If you're doing something manually that happens more than 10 times a week, we can probably automate it.",
    },
    {
      q: "What's the most complex thing you've built for a restaurant?",
      a: "A full guest intelligence system: integrated with their POS, tracking thousands of guests across visit frequency, spend, and behavior. Automated birthday messages, lapsed-guest win-backs, and VIP recognition — all running without any staff involvement. If you want to see what that looks like, book a call and we'll walk you through it.",
    },
    {
      q: 'Do you work with businesses outside of restaurants?',
      a: 'Yes — dental and medical offices, salons, contractors, retail. The problems are usually the same: missed calls, unanswered reviews, inconsistent follow-up. The systems just get trained differently.',
    },
  ]

  return (
    <section
      id="faq"
      style={{
        padding: isMobile ? '64px 20px' : '100px 24px',
        borderTop: '1px solid #1E1E1E',
        backgroundColor: '#0a0a0a',
      }}
    >
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div ref={ref} className="fade-in" style={{ marginBottom: 48 }}>
          <h2
            style={{
              fontSize: 'clamp(26px, 4vw, 42px)',
              fontWeight: 700,
              color: '#F5F5F5',
              letterSpacing: '-0.5px',
              textAlign: 'center',
            }}
          >
            Questions
          </h2>
        </div>

        {faqs.map((faq, i) => (
          <FAQItem key={i} {...faq} />
        ))}
      </div>
    </section>
  )
}

// ─── Contact Form ──────────────────────────────────────────────────────────────
function Contact() {
  const ref = useFadeIn()
  const isMobile = useIsMobile()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch('https://formspree.io/f/xeelnjwd', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        alert('Something went wrong. Please email us at info@virdar.co')
      }
    } catch {
      alert('Something went wrong. Please email us at info@virdar.co')
    } finally {
      setLoading(false)
    }
  }, [])

  const inputStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: '#111111',
    border: '1px solid #1E1E1E',
    borderRadius: 8,
    padding: '14px 16px',
    fontSize: 15,
    color: '#F5F5F5',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box',
  }

  return (
    <section
      id="contact"
      style={{
        padding: isMobile ? '64px 20px' : '100px 24px',
        borderTop: '1px solid #1E1E1E',
      }}
    >
      <div
        ref={ref}
        className="fade-in"
        style={{ maxWidth: 560, margin: '0 auto' }}
      >
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2
            style={{
              fontSize: 'clamp(26px, 4vw, 42px)',
              fontWeight: 700,
              color: '#F5F5F5',
              marginBottom: 16,
              letterSpacing: '-0.5px',
            }}
          >
            Book a free call
          </h2>
          <p style={{ fontSize: 16, color: '#888888', lineHeight: 1.6 }}>
            No pitch, no pressure — we'll tell you honestly if automation makes sense for your
            business.
          </p>
        </div>

        {submitted ? (
          <div
            style={{
              backgroundColor: '#111111',
              border: '1px solid rgba(79,142,247,0.4)',
              borderRadius: 12,
              padding: '40px 32px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 16 }}>✓</div>
            <p style={{ fontSize: 18, fontWeight: 600, color: '#F5F5F5', marginBottom: 8 }}>
              We'll reach out within 24 hours.
            </p>
            <p style={{ fontSize: 15, color: '#888888' }}>
              You can also email us directly at{' '}
              <a href="mailto:info@virdar.co" style={{ color: '#4F8EF7' }}>
                info@virdar.co
              </a>
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            <div>
              <label htmlFor="contact-name" style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#888888', marginBottom: 6 }}>
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                required
                placeholder="Your name"
                style={inputStyle}
                onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = '#4F8EF7')}
                onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = '#1E1E1E')}
              />
            </div>

            <div>
              <label htmlFor="contact-business" style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#888888', marginBottom: 6 }}>
                Business Type
              </label>
              <input
                id="contact-business"
                type="text"
                name="business_type"
                required
                placeholder="e.g. Restaurant, Dental Office, Salon..."
                style={inputStyle}
                onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = '#4F8EF7')}
                onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = '#1E1E1E')}
              />
            </div>

            <div>
              <label htmlFor="contact-email" style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#888888', marginBottom: 6 }}>
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                required
                placeholder="hello@yourbusiness.com"
                style={inputStyle}
                onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = '#4F8EF7')}
                onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = '#1E1E1E')}
              />
            </div>

            <div>
              <label htmlFor="contact-tasks" style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#888888', marginBottom: 6 }}>
                What are you doing manually right now?
              </label>
              <textarea
                id="contact-tasks"
                name="manual_tasks"
                required
                rows={4}
                placeholder="Describe the repetitive tasks taking up your time..."
                style={{
                  ...inputStyle,
                  resize: 'vertical',
                  minHeight: 100,
                }}
                onFocus={(e) => ((e.target as HTMLTextAreaElement).style.borderColor = '#4F8EF7')}
                onBlur={(e) => ((e.target as HTMLTextAreaElement).style.borderColor = '#1E1E1E')}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: '#4F8EF7',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '16px',
                fontSize: 16,
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'Inter, sans-serif',
                opacity: loading ? 0.7 : 1,
                transition: 'background-color 0.2s ease',
                marginTop: 4,
              }}
              onMouseEnter={(e) => {
                if (!loading) (e.target as HTMLButtonElement).style.backgroundColor = '#3a78e8'
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = '#4F8EF7'
              }}
            >
              {loading ? 'Sending...' : 'Book Your Free Call →'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

// ─── Footer CTA ───────────────────────────────────────────────────────────────
function FooterCTA() {
  const ref = useFadeIn()
  const isMobile = useIsMobile()

  return (
    <section
      style={{
        padding: isMobile ? '64px 20px' : '100px 24px',
        borderTop: '1px solid #1E1E1E',
        backgroundColor: '#080808',
        textAlign: 'center',
      }}
    >
      <div ref={ref} className="fade-in" style={{ maxWidth: 640, margin: '0 auto' }}>
        <h2
          style={{
            fontSize: 'clamp(28px, 4.5vw, 52px)',
            fontWeight: 800,
            color: '#F5F5F5',
            marginBottom: 20,
            letterSpacing: '-1px',
          }}
        >
          Ready to stop doing it manually?
        </h2>
        <p style={{ fontSize: 18, color: '#888888', lineHeight: 1.7, marginBottom: 40 }}>
          Book a free 20-minute call. No pitch, no pressure — we'll tell you honestly if
          automation makes sense for your business.
        </p>
        <a
          href="https://calendly.com/virdar-info/30min" target="_blank" rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            backgroundColor: '#4F8EF7',
            color: '#fff',
            borderRadius: 10,
            padding: '18px 40px',
            fontSize: 18,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            textDecoration: 'none',
            transition: 'background-color 0.2s ease, transform 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#3a78e8'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#4F8EF7'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Book Your Free Call →
        </a>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const isMobile = useIsMobile()

  return (
    <footer
      style={{
        padding: isMobile ? '24px 20px' : '28px 24px',
        borderTop: '1px solid #1E1E1E',
        backgroundColor: '#080808',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: isMobile ? 'center' : 'space-between',
          gap: isMobile ? 16 : 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: isMobile ? 'center' : 'center', flexDirection: isMobile ? 'column' : 'row', gap: 12 }}>
          <Logo />
          <span style={{ fontSize: 13, color: '#333333' }}>© {new Date().getFullYear()} Virdar. All rights reserved.</span>
        </div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <a
            href="https://calendly.com/virdar-info/30min" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 14, color: '#555555', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = '#888888')}
            onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = '#555555')}
          >
            Contact
          </a>
          <a
            href="mailto:info@virdar.co"
            style={{ fontSize: 14, color: '#555555', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = '#888888')}
            onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = '#555555')}
          >
            info@virdar.co
          </a>
        </div>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <FlagshipSystems />
        <Services />
        <HowItWorks />
        <PricingClarity />
        <FAQ />
        <Contact />
        <FooterCTA />
        <Footer />
      </main>
    </>
  )
}
