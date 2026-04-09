import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  PhoneOff, Clock, AlertTriangle,
  CheckCircle2, Phone, Users, BarChart3, Zap,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ── Old "chaos" screen contents ─────────────────────────────────────────── */
function ChaosScene() {
  return (
    <div className="absolute inset-0 flex flex-col gap-2 p-4 md:p-6 overflow-hidden font-[monospace] text-[10px] md:text-xs">
      {/* Fake title bar */}
      <div className="flex items-center justify-between rounded bg-amber-900/60 px-3 py-1.5 text-amber-200/80">
        <span>operations_tracker.xls</span>
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/50" />
        </div>
      </div>

      {/* Fake spreadsheet */}
      <div className="flex-1 overflow-hidden rounded border border-amber-700/30 bg-amber-950/40">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-amber-700/30 text-left text-amber-300/60">
              <th className="px-2 py-1">Task</th>
              <th className="px-2 py-1">Status</th>
              <th className="px-2 py-1">Assigned</th>
              <th className="hidden md:table-cell px-2 py-1">Due</th>
            </tr>
          </thead>
          <tbody className="text-amber-200/50">
            {[
              ['Return calls (23)', 'OVERDUE', 'Maria', '9:00 AM'],
              ['Enter invoices', 'IN PROGRESS', 'Front desk', '11:00 AM'],
              ['Follow up leads', 'NOT STARTED', '???', 'Yesterday'],
              ['Schedule staff', 'MANUAL', 'Manager', 'EOD'],
              ['Send reminders', 'FORGOT', 'Nobody', 'Last week'],
              ['Update records', 'BACKLOGGED', 'Intern', 'N/A'],
              ['Process reviews', 'IGNORED', 'Nobody', '2 weeks ago'],
            ].map(([task, status, assigned, due], i) => (
              <tr key={i} className="border-b border-amber-700/20">
                <td className="px-2 py-1">{task}</td>
                <td className={`px-2 py-1 ${status === 'OVERDUE' || status === 'FORGOT' ? 'text-red-400/70' : ''}`}>
                  {status}
                </td>
                <td className="px-2 py-1">{assigned}</td>
                <td className="hidden md:table-cell px-2 py-1">{due}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Floating notification popups */}
      <div className="absolute right-3 top-14 md:right-6 md:top-16 flex flex-col gap-2 w-[140px] md:w-[180px]">
        <div className="rounded-lg bg-red-900/80 border border-red-700/50 px-3 py-2 shadow-lg">
          <div className="flex items-center gap-1.5">
            <PhoneOff size={12} className="text-red-400" />
            <span className="text-red-300 font-semibold">23 Missed Calls</span>
          </div>
          <p className="text-red-400/60 mt-0.5">Since yesterday</p>
        </div>
        <div className="rounded-lg bg-amber-900/80 border border-amber-700/50 px-3 py-2 shadow-lg">
          <div className="flex items-center gap-1.5">
            <AlertTriangle size={12} className="text-amber-400" />
            <span className="text-amber-300 font-semibold">5 Leads Gone Cold</span>
          </div>
          <p className="text-amber-400/60 mt-0.5">No follow-up in 72hrs</p>
        </div>
        <div className="rounded-lg bg-orange-900/80 border border-orange-700/50 px-3 py-2 shadow-lg">
          <div className="flex items-center gap-1.5">
            <Clock size={12} className="text-orange-400" />
            <span className="text-orange-300 font-semibold">4.5 hrs</span>
          </div>
          <p className="text-orange-400/60 mt-0.5">Spent on data entry today</p>
        </div>
      </div>

      {/* Sticky notes */}
      <div className="absolute bottom-3 left-3 md:bottom-6 md:left-6 -rotate-3 rounded bg-yellow-300/90 p-2 shadow-md text-yellow-900 w-[90px] md:w-[110px]">
        <p className="font-bold text-[9px] md:text-[10px]">REMINDER:</p>
        <p className="text-[8px] md:text-[9px]">Call back Mrs. Johnson!!</p>
        <p className="text-[8px] md:text-[9px] mt-1">- From 3 days ago</p>
      </div>
      <div className="absolute bottom-12 left-16 md:bottom-20 md:left-28 rotate-2 rounded bg-yellow-200/90 p-2 shadow-md text-yellow-900 w-[80px] md:w-[100px]">
        <p className="text-[8px] md:text-[9px]">Where is the vendor invoice???</p>
      </div>
    </div>
  )
}

/* ── New "AI reality" screen contents ────────────────────────────────────── */
function AIScene() {
  return (
    <div className="absolute inset-0 flex flex-col gap-3 p-4 md:p-6 overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-accent/20 flex items-center justify-center">
            <Zap size={14} className="text-accent" />
          </div>
          <span className="text-sm font-semibold text-text-light">Virdar Operations Hub</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-medium text-emerald-400">All Systems Active</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: Phone, label: 'Calls Handled', value: '47', sub: 'today' },
          { icon: Users, label: 'Leads Qualified', value: '12', sub: 'this week' },
          { icon: BarChart3, label: 'Hours Saved', value: '26', sub: 'this month' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border-dark bg-bg-dark-subtle/50 p-2.5 md:p-3">
            <div className="flex items-center gap-1.5 text-text-light-secondary">
              <stat.icon size={12} />
              <span className="text-[9px] md:text-[10px]">{stat.label}</span>
            </div>
            <p className="mt-1 text-lg md:text-xl font-semibold text-text-light">{stat.value}</p>
            <p className="text-[9px] text-text-light-secondary/50">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Activity feed */}
      <div className="flex-1 overflow-hidden rounded-xl border border-border-dark bg-bg-dark-subtle/30 p-3">
        <p className="text-[10px] font-semibold text-text-light-secondary uppercase tracking-wider mb-2">Live Activity</p>
        <div className="space-y-2">
          {[
            { time: '2 min ago', text: 'Missed call from (214) 555-0187 — AI responded, qualified as new lead, booked consultation for Thursday', ok: true },
            { time: '8 min ago', text: 'Maintenance request received — categorized as "plumbing/urgent", work order created, vendor dispatched', ok: true },
            { time: '15 min ago', text: 'Lead follow-up sequence completed — 3 of 5 responded, 2 appointments booked', ok: true },
            { time: '1 hr ago', text: 'Daily staffing report generated — tomorrow forecast: 340 covers, recommended: 6 FOH / 4 BOH', ok: true },
            { time: '2 hrs ago', text: 'Invoice data extracted and entered — 14 invoices processed, $23,847 total', ok: true },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-emerald-400/80" />
              <div>
                <p className="text-[10px] md:text-[11px] text-text-light/80 leading-snug">{item.text}</p>
                <p className="text-[9px] text-text-light-secondary/40 mt-0.5">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Main transformation component ───────────────────────────────────────── */
export default function Transformation() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const monitorRef = useRef<HTMLDivElement>(null)
  const chaosRef = useRef<HTMLDivElement>(null)
  const aiRef = useRef<HTMLDivElement>(null)
  const bezelRef = useRef<HTMLDivElement>(null)
  const scanlineRef = useRef<HTMLDivElement>(null)
  const labelOldRef = useRef<HTMLDivElement>(null)
  const labelNewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      // Phase 1 (0-0.15): Hold — let user see the old screen
      tl.to({}, { duration: 0.15 })

      // Phase 2 (0.15-0.5): Zoom into the screen, fade bezel + scanlines
      tl.to(monitorRef.current, {
        scale: 1.8,
        duration: 0.35,
        ease: 'power2.inOut',
      }, 0.15)

      tl.to(bezelRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      }, 0.2)

      tl.to(scanlineRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      }, 0.2)

      // Fade out the "old way" label
      tl.to(labelOldRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.15,
        ease: 'power2.in',
      }, 0.15)

      // Phase 3 (0.4-0.65): Crossfade chaos → AI
      tl.to(chaosRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.inOut',
      }, 0.4)

      tl.fromTo(aiRef.current, {
        opacity: 0,
      }, {
        opacity: 1,
        duration: 0.25,
        ease: 'power2.inOut',
      }, 0.45)

      // Phase 4 (0.6-0.8): Settle into final view
      tl.to(monitorRef.current, {
        scale: 1.15,
        duration: 0.2,
        ease: 'power2.out',
      }, 0.6)

      // Fade in "new way" label
      tl.fromTo(labelNewRef.current, {
        opacity: 0,
        y: 20,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: 'power2.out',
      }, 0.65)

      // Phase 5 (0.8-1): Hold final state before unpin
      tl.to({}, { duration: 0.2 })

    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={wrapperRef}
      className="relative min-h-screen bg-bg-dark overflow-hidden"
      aria-label="Visual demonstration: from manual operations to AI-powered systems"
    >
      <div className="flex h-screen flex-col items-center justify-center px-6">
        {/* "Old way" label — above monitor */}
        <div
          ref={labelOldRef}
          className="mb-6 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-400/70">
            This is how most businesses still operate
          </p>
        </div>

        {/* Monitor */}
        <div
          ref={monitorRef}
          className="relative w-full max-w-[700px] aspect-[4/3]"
        >
          {/* Bezel */}
          <div
            ref={bezelRef}
            className="absolute -inset-3 md:-inset-5 rounded-2xl md:rounded-3xl bg-gradient-to-b from-zinc-600 to-zinc-800 shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
          >
            {/* Monitor stand hint */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-4 w-24 rounded-b-lg bg-zinc-700" />
            {/* Power LED */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-amber-400/60 shadow-[0_0_6px_rgba(251,191,36,0.4)]" />
          </div>

          {/* Screen */}
          <div className="relative h-full w-full overflow-hidden rounded-lg md:rounded-xl bg-zinc-900">
            {/* Scanlines overlay */}
            <div
              ref={scanlineRef}
              className="pointer-events-none absolute inset-0 z-20 opacity-30"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
              }}
              aria-hidden="true"
            />

            {/* Screen curvature / glow */}
            <div
              className="pointer-events-none absolute inset-0 z-10 rounded-lg md:rounded-xl"
              style={{
                boxShadow: 'inset 0 0 60px rgba(0,0,0,0.4), inset 0 0 120px rgba(0,0,0,0.2)',
              }}
              aria-hidden="true"
            />

            {/* Chaos scene (old) */}
            <div ref={chaosRef} className="absolute inset-0 z-[1] bg-amber-950/20">
              <ChaosScene />
            </div>

            {/* AI scene (new) */}
            <div ref={aiRef} className="absolute inset-0 z-[2] bg-bg-dark opacity-0">
              <AIScene />
            </div>
          </div>
        </div>

        {/* "New way" label — below monitor */}
        <div
          ref={labelNewRef}
          className="mt-6 text-center opacity-0"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            This is what your operations look like with Virdar
          </p>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-light-secondary/30">
          <span className="text-xs">Scroll to transform</span>
          <div className="h-8 w-5 rounded-full border border-text-light-secondary/20 flex items-start justify-center p-1">
            <div className="h-1.5 w-1.5 rounded-full bg-text-light-secondary/30 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
