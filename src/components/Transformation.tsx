import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Transformation() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const monitorRef = useRef<HTMLDivElement>(null)
  const oldScreenRef = useRef<HTMLDivElement>(null)
  const newScreenRef = useRef<HTMLDivElement>(null)
  const bezelRef = useRef<HTMLDivElement>(null)
  const scanlineRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: '+=180%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      })

      // Phase 1 (0–0.2): Hold with old screen visible
      tl.to({}, { duration: 0.2 })

      // Phase 2 (0.2–0.55): Zoom in, dissolve bezel + scanlines + glow tint
      tl.to(monitorRef.current, {
        scale: 2.6,
        duration: 0.35,
        ease: 'expo.inOut',
      }, 0.2)

      tl.to(bezelRef.current, {
        opacity: 0,
        scale: 1.1,
        duration: 0.2,
        ease: 'power3.in',
      }, 0.25)

      tl.to(scanlineRef.current, {
        opacity: 0,
        duration: 0.15,
        ease: 'power2.in',
      }, 0.25)

      tl.to(glowRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      }, 0.3)

      // Fade out headline
      tl.to(headlineRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.15,
        ease: 'power2.in',
      }, 0.2)

      // Phase 3 (0.45–0.7): Crossfade old → new
      tl.to(oldScreenRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.inOut',
      }, 0.45)

      tl.fromTo(newScreenRef.current, {
        opacity: 0,
      }, {
        opacity: 1,
        duration: 0.25,
        ease: 'power2.inOut',
      }, 0.5)

      // Phase 4 (0.65–0.8): Settle + show subtitle
      tl.to(monitorRef.current, {
        scale: 1.6,
        duration: 0.15,
        ease: 'power3.out',
      }, 0.65)

      tl.fromTo(subRef.current, {
        opacity: 0,
        y: 20,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.15,
        ease: 'power2.out',
      }, 0.7)

      // Phase 5 (0.85–1): Hold before unpin
      tl.to({}, { duration: 0.15 })

    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={wrapperRef}
      className="relative h-screen bg-bg overflow-hidden"
      aria-label="Visual demonstration: from manual operations to AI-powered systems"
    >
      {/* Atmospheric fog / gradient */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/80 to-bg" />
        <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-surface/30 to-transparent" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-accent/[0.03] blur-[100px]" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="heading-lg mb-10 max-w-[600px] text-center text-text"
        >
          Your operations, transformed
        </h2>

        {/* Monitor assembly */}
        <div
          ref={monitorRef}
          className="relative w-full max-w-[520px] aspect-[16/10]"
        >
          {/* Bezel — thick, chunky, retro */}
          <div
            ref={bezelRef}
            className="absolute -inset-4 md:-inset-6 rounded-xl md:rounded-2xl"
            style={{
              background: 'linear-gradient(180deg, #44403c 0%, #292524 40%, #1c1917 100%)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05) inset, 0 2px 0 rgba(255,255,255,0.08) inset',
            }}
          >
            {/* Top vent lines */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-[3px]" aria-hidden="true">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-[2px] w-3 rounded-full bg-stone-600/40" />
              ))}
            </div>
            {/* Brand badge */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-3">
              <div className="h-[3px] w-6 rounded-full bg-stone-600/30" />
              <span className="text-[8px] font-bold tracking-[0.2em] text-stone-500/40 uppercase">Analog</span>
              <div className="h-[3px] w-6 rounded-full bg-stone-600/30" />
            </div>
            {/* Power LED */}
            <div className="absolute bottom-2.5 right-5 md:right-7 h-2 w-2 rounded-full bg-amber-500/50 shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
          </div>

          {/* Stand */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-[-1]" aria-hidden="true">
            <div className="h-6 w-16 rounded-b-lg bg-gradient-to-b from-stone-700 to-stone-800" />
            <div className="mx-auto h-2 w-28 rounded-b-md bg-stone-800 shadow-[0_4px_12px_rgba(0,0,0,0.5)]" />
          </div>

          {/* Screen */}
          <div className="relative h-full w-full overflow-hidden rounded-md md:rounded-lg bg-black">
            {/* Scanlines */}
            <div
              ref={scanlineRef}
              className="pointer-events-none absolute inset-0 z-30 opacity-20"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.2) 1px, rgba(0,0,0,0.2) 3px)',
              }}
              aria-hidden="true"
            />

            {/* CRT curvature + screen edge darkening */}
            <div
              className="pointer-events-none absolute inset-0 z-20 rounded-md md:rounded-lg"
              style={{
                boxShadow: 'inset 0 0 80px rgba(0,0,0,0.5), inset 0 0 200px rgba(0,0,0,0.3)',
              }}
              aria-hidden="true"
            />

            {/* Amber screen glow (old state) */}
            <div
              ref={glowRef}
              className="pointer-events-none absolute inset-0 z-10 opacity-100"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(180,120,40,0.08) 0%, transparent 70%)',
              }}
              aria-hidden="true"
            />

            {/* ─── OLD SCREEN: minimal amber terminal ─── */}
            <div ref={oldScreenRef} className="absolute inset-0 z-[1] p-3 md:p-5 font-mono text-[9px] md:text-[11px] leading-relaxed text-amber-500/70 bg-zinc-950">
              <div className="flex items-center gap-2 text-amber-600/50 mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500/60" />
                <span>operations_log — last updated 3 days ago</span>
              </div>
              <div className="space-y-1.5 text-amber-500/50">
                <p><span className="text-red-400/70">[ALERT]</span> 23 missed calls — no follow-up assigned</p>
                <p><span className="text-amber-400/70">[WARN]&ensp;</span> Lead pipeline stale — 5 contacts &gt;72hrs no response</p>
                <p><span className="text-amber-400/70">[WARN]&ensp;</span> Invoice backlog — 14 unprocessed since Monday</p>
                <p><span className="text-red-400/70">[ALERT]</span> Staffing: no forecast — managers using last week's numbers</p>
                <p><span className="text-amber-400/70">[WARN]&ensp;</span> Maintenance requests — 3 unlogged, 1 lost</p>
                <p><span className="text-red-400/70">[ALERT]</span> Review responses overdue — 12 unanswered Google reviews</p>
                <p className="text-amber-500/30 mt-3">{'>'} system idle. awaiting manual input...</p>
                <span className="inline-block w-2 h-3.5 bg-amber-500/50 animate-pulse" />
              </div>
            </div>

            {/* ─── NEW SCREEN: clean operations dashboard ─── */}
            <div ref={newScreenRef} className="absolute inset-0 z-[2] p-3 md:p-5 bg-[#0c1117] opacity-0">
              {/* Top bar */}
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded bg-accent/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-sm bg-accent" />
                  </div>
                  <span className="text-[10px] md:text-xs font-semibold text-white/90">Operations Hub</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-accent/10 px-2 py-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="text-[8px] md:text-[10px] font-medium text-accent/80">All Active</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-1.5 md:gap-2 mb-3 md:mb-4">
                {[
                  { label: 'Calls', val: '47', sub: 'handled today' },
                  { label: 'Leads', val: '12', sub: 'qualified' },
                  { label: 'Hours', val: '26', sub: 'saved this mo' },
                ].map((s) => (
                  <div key={s.label} className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-2 md:p-2.5">
                    <p className="text-[8px] md:text-[9px] text-white/40">{s.label}</p>
                    <p className="text-sm md:text-lg font-semibold text-white/90">{s.val}</p>
                    <p className="text-[7px] md:text-[8px] text-white/25">{s.sub}</p>
                  </div>
                ))}
              </div>

              {/* Activity */}
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5 md:p-3 flex-1">
                <p className="text-[8px] md:text-[9px] font-semibold text-white/30 uppercase tracking-wider mb-2">Live</p>
                <div className="space-y-1.5 md:space-y-2">
                  {[
                    'Missed call → AI responded → lead qualified → consultation booked',
                    'Maintenance request → categorized urgent → vendor dispatched',
                    'Lead sequence complete → 2 appointments booked automatically',
                    'Daily staffing report → 340 covers forecast → crew optimized',
                  ].map((line, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                      <p className="text-[8px] md:text-[10px] text-white/50 leading-snug">{line}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtitle — fades in after transition */}
        <p
          ref={subRef}
          className="mt-12 text-sm font-medium text-accent opacity-0 text-center"
        >
          Custom AI systems, built for how your business actually works
        </p>
      </div>
    </section>
  )
}
