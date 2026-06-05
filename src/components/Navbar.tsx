import { useState, useEffect } from 'react'
import VMark from './ui/VMark'

const links = [
  { label: 'What we build', href: '#what' },
  { label: 'How it works', href: '#how' },
  { label: 'Pricing', href: '#pricing' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`} aria-label="Main navigation">
      <a className="brand" href="#top" aria-label="Virdar home">
        <VMark size={24} />
        <span className="name">Virdar</span>
      </a>
      <div className="links">
        {links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
        <a className="nav-cta" href="#book">
          Book a call
        </a>
      </div>
    </nav>
  )
}
