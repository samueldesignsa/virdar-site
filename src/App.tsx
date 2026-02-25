import { useEffect, useRef, useState, useCallback } from 'react'

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: scrolled ? 'rgba(13,13,13,0.95)' : 'transparent',
        borderBottom: scrolled ? '1px solid #1E1E1E' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
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

        {/* Nav links + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            {(['Services', 'How It Works', 'Pricing'] as const).map((label) => {
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
          <a href="#contact">
            <button
              style={{
                backgroundColor: '#4F8EF7',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '10px 20px',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.backgroundColor = '#3a78e8')}
              onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.backgroundColor = '#4F8EF7')}
            >
              Book a Call →
            </button>
          </a>
        </div>
      </div>
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
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
        padding: '120px 24px 80px',
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
          Stop losing money to<br />
          <span style={{ color: '#4F8EF7' }}>manual busywork.</span>
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
          Virdar builds AI automations for local businesses — custom-built systems that reply
          to customers, follow up on missed calls, and handle repetitive tasks automatically.
          One-time fee. Done in a week.
        </p>

        <a href="#contact">
          <button
            style={{
              backgroundColor: '#4F8EF7',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              padding: '16px 36px',
              fontSize: 17,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              transition: 'background-color 0.2s ease, transform 0.15s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.target as HTMLButtonElement
              el.style.backgroundColor = '#3a78e8'
              el.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              const el = e.target as HTMLButtonElement
              el.style.backgroundColor = '#4F8EF7'
              el.style.transform = 'translateY(0)'
            }}
          >
            Get a Free Demo →
          </button>
        </a>

        {/* Location / availability note */}
        <p style={{ marginTop: 48, fontSize: 13, color: '#555555', letterSpacing: '0.5px' }}>
          Based in Dallas, TX · Currently accepting new clients
        </p>
      </div>
    </section>
  )
}

// ─── Problem ──────────────────────────────────────────────────────────────────
function Problem() {
  const ref = useFadeIn()

  return (
    <section
      id="problem"
      style={{
        padding: '100px 24px',
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
        <a href="#contact" style={{ marginTop: 8 }}>
          <button
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #4F8EF7',
              color: '#4F8EF7',
              borderRadius: 8,
              padding: '10px 18px',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              transition: 'background-color 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.target as HTMLButtonElement
              el.style.backgroundColor = '#4F8EF7'
              el.style.color = '#fff'
            }}
            onMouseLeave={(e) => {
              const el = e.target as HTMLButtonElement
              el.style.backgroundColor = 'transparent'
              el.style.color = '#4F8EF7'
            }}
          >
            {cta}
          </button>
        </a>
      )}
    </div>
  )
}

function Services() {
  const titleRef = useFadeIn()

  const services: ServiceCardProps[] = [
    {
      icon: '⭐',
      name: 'Review Response System',
      price: '$500 one-time',
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
      price: '$750 one-time',
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
      price: '$600 one-time',
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
      cta: 'Tell us what you need →',
      delay: 'fade-delay-4',
    },
  ]

  return (
    <section
      id="services"
      style={{
        padding: '100px 24px',
        borderTop: '1px solid #1E1E1E',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div ref={titleRef} className="fade-in" style={{ marginBottom: 56, textAlign: 'center' }}>
          <h2
            style={{
              fontSize: 'clamp(26px, 4vw, 42px)',
              fontWeight: 700,
              color: '#F5F5F5',
              letterSpacing: '-0.5px',
            }}
          >
            What we build
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
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

  const steps: StepProps[] = [
    {
      num: '01',
      title: 'Book a free 20-min call',
      desc: "Tell us about your business and what's eating your time.",
      delayClass: 'fade-delay-1',
    },
    {
      num: '02',
      title: 'We scope it out',
      desc: "We'll tell you exactly what we can build and what it costs. No surprises.",
      delayClass: 'fade-delay-2',
    },
    {
      num: '03',
      title: 'We build it',
      desc: 'Done in 5 business days. We handle setup, testing, and walkthrough.',
      delayClass: 'fade-delay-3',
    },
    {
      num: '04',
      title: 'You own it',
      desc: 'No monthly fees. No subscriptions. It runs automatically from day one.',
      delayClass: 'fade-delay-4',
    },
  ]

  return (
    <section
      id="how-it-works"
      style={{
        padding: '100px 24px',
        borderTop: '1px solid #1E1E1E',
        backgroundColor: '#0a0a0a',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div ref={titleRef} className="fade-in" style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2
            style={{
              fontSize: 'clamp(26px, 4vw, 42px)',
              fontWeight: 700,
              color: '#F5F5F5',
              letterSpacing: '-0.5px',
            }}
          >
            Simple process. Fast delivery.
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 32,
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

  return (
    <section
      id="pricing"
      style={{
        padding: '100px 24px',
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
          One-time fee. No subscriptions. No surprises.
        </h2>

        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#888888', marginBottom: 20 }}>
          We charge a flat one-time fee to build and set up your automation. You own it. You
          keep it. There are no monthly fees from Virdar.
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
      q: 'Do I pay upfront?',
      a: "50% upfront, 50% when it's live and you're happy with it.",
    },
    {
      q: 'What kinds of businesses do you work with?',
      a: "Restaurants, dental and medical offices, salons, contractors, retail — any local business with customers. If you're doing something manually that happens more than 10 times a week, we can probably automate it.",
    },
  ]

  return (
    <section
      id="faq"
      style={{
        padding: '100px 24px',
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
        alert('Something went wrong. Please email us at hello@virdar.co')
      }
    } catch {
      alert('Something went wrong. Please email us at hello@virdar.co')
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
        padding: '100px 24px',
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
              <a href="mailto:hello@virdar.co" style={{ color: '#4F8EF7' }}>
                hello@virdar.co
              </a>
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#888888', marginBottom: 6 }}>
                Name
              </label>
              <input
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
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#888888', marginBottom: 6 }}>
                Business Type
              </label>
              <input
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
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#888888', marginBottom: 6 }}>
                Email
              </label>
              <input
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
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#888888', marginBottom: 6 }}>
                What are you doing manually right now?
              </label>
              <textarea
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
              {loading ? 'Sending...' : 'Book a Free Call →'}
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

  return (
    <section
      style={{
        padding: '100px 24px',
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
        <a href="#contact">
          <button
            style={{
              backgroundColor: '#4F8EF7',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              padding: '18px 40px',
              fontSize: 18,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              transition: 'background-color 0.2s ease, transform 0.15s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.target as HTMLButtonElement
              el.style.backgroundColor = '#3a78e8'
              el.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              const el = e.target as HTMLButtonElement
              el.style.backgroundColor = '#4F8EF7'
              el.style.transform = 'translateY(0)'
            }}
          >
            Book a Free Call →
          </button>
        </a>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      style={{
        padding: '28px 24px',
        borderTop: '1px solid #1E1E1E',
        backgroundColor: '#080808',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Logo />
          <span style={{ fontSize: 13, color: '#333333' }}>© {new Date().getFullYear()} Virdar. All rights reserved.</span>
        </div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <a
            href="#contact"
            style={{ fontSize: 14, color: '#555555', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = '#888888')}
            onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = '#555555')}
          >
            Contact
          </a>
          <a
            href="mailto:hello@virdar.co"
            style={{ fontSize: 14, color: '#555555', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = '#888888')}
            onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = '#555555')}
          >
            hello@virdar.co
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
