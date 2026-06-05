import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll() {
  useEffect(() => {
    // Respect reduced motion: no smooth scroll, but still handle anchor jumps.
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let lenis: Lenis | null = null

    if (!prefersReducedMotion) {
      lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
      })

      // Connect Lenis to GSAP's ticker so ScrollTrigger stays in sync
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add((time) => lenis!.raf(time * 1000))
      gsap.ticker.lagSmoothing(0)
    }

    // In-page anchor links scroll smoothly with a fixed-nav offset.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!anchor) return
      const id = anchor.getAttribute('href')
      if (!id || id.length < 2) return
      const el = document.querySelector(id)
      if (!el) return
      e.preventDefault()
      if (lenis) {
        lenis.scrollTo(el as HTMLElement, { offset: -70 })
      } else {
        const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 70
        window.scrollTo({ top, behavior: 'auto' })
      }
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      if (lenis) {
        lenis.destroy()
        gsap.ticker.remove(lenis.raf)
      }
    }
  }, [])

  return null
}
