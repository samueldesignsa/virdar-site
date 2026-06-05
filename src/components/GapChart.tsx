import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Reveal from './ui/Reveal'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * Scroll-driven SVG line chart of real U.S. Census BTOS data: the share of
 * businesses using AI climbing 2023 to 2026 with a projection. GSAP maps scroll
 * progress to --p on the scene root; the entire draw-in (stroke-dashoffset, clip
 * width, point/callout opacities) is ported --p-driven CSS. Reduced-motion users
 * see the fully drawn chart statically (handled in CSS).
 */
export default function GapChart() {
  const sceneRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce || !sceneRef.current) return

      const scene = sceneRef.current
      const st = ScrollTrigger.create({
        trigger: scene,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          scene.style.setProperty('--p', self.progress.toFixed(4))
        },
      })
      return () => st.kill()
    },
    { scope: sceneRef },
  )

  return (
    <>
      <section className="gap-scene" ref={sceneRef}>
        <div className="gap-pin">
          <div className="gap-stage">
            <div className="gap-copy">
              <Reveal as="p" className="eyebrow">
                The shift
              </Reveal>
              <Reveal as="h2" className="h-xl" d={1} style={{ marginTop: 14 }}>
                Every month you wait, the gap gets wider.
              </Reveal>
              <Reveal as="p" className="lead" d={2} style={{ margin: '18px auto 0', maxWidth: 600 }}>
                Roughly one in five U.S. businesses already uses AI, and adoption is climbing fast. Every
                month you wait, you fall further behind the ones who moved. Scroll.
              </Reveal>
            </div>

            <Reveal as="p" className="gap-title" d={1}>
              Share of U.S. businesses using AI
            </Reveal>

            <svg
              className="gap-chart"
              viewBox="0 24 1000 452"
              role="img"
              aria-label="A line chart: the share of U.S. businesses using AI climbed from about 4 percent in 2023 to about 20 percent in 2026, and is projected to keep rising."
            >
              <defs>
                <linearGradient id="aiStroke" x1="0" y1="1" x2="0.2" y2="0">
                  <stop offset="0" stopColor="#C9A96E" />
                  <stop offset="1" stopColor="#F0D9A8" />
                </linearGradient>
                <linearGradient id="aiArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#C9A96E" stopOpacity="0.40" />
                  <stop offset="0.6" stopColor="#C9A96E" stopOpacity="0.10" />
                  <stop offset="1" stopColor="#C9A96E" stopOpacity="0" />
                </linearGradient>
                <filter id="goldGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="5" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <clipPath id="clipAI">
                  <rect className="clip-ai" y="40" height="400" />
                </clipPath>
              </defs>

              {/* y grid + % labels */}
              <g className="gap-grid">
                <line x1="90" y1="70" x2="945" y2="70" />
                <line x1="90" y1="140" x2="945" y2="140" />
                <line x1="90" y1="210" x2="945" y2="210" />
                <line x1="90" y1="280" x2="945" y2="280" />
                <line x1="90" y1="350" x2="945" y2="350" />
              </g>
              <text x="74" y="74" textAnchor="end" className="gap-yval">
                25%
              </text>
              <text x="74" y="144" textAnchor="end" className="gap-yval">
                20%
              </text>
              <text x="74" y="214" textAnchor="end" className="gap-yval">
                15%
              </text>
              <text x="74" y="284" textAnchor="end" className="gap-yval">
                10%
              </text>
              <text x="74" y="354" textAnchor="end" className="gap-yval">
                5%
              </text>
              <line className="gap-yaxis" x1="90" y1="60" x2="90" y2="420" />
              <line className="gap-base" x1="90" y1="420" x2="950" y2="420" />

              {/* x labels */}
              <text x="150" y="448" textAnchor="middle" className="gap-axis">
                2023
              </text>
              <text x="360" y="448" textAnchor="middle" className="gap-axis">
                2024
              </text>
              <text x="570" y="448" textAnchor="middle" className="gap-axis">
                2025
              </text>
              <text x="785" y="448" textAnchor="middle" className="gap-axis">
                2026
              </text>
              <text x="892" y="448" textAnchor="middle" className="gap-axis proj">
                +6 MO
              </text>

              {/* now marker */}
              <g className="gap-today">
                <line x1="785" y1="118" x2="785" y2="420" strokeDasharray="2 7" />
              </g>

              {/* area (real data) */}
              <path
                className="gap-area-ai"
                clipPath="url(#clipAI)"
                d="M150,364 C300,348 430,318 570,252 C690,196 745,162 785,140 L785,420 L150,420 Z"
              />

              {/* main line (validated, solid) */}
              <path
                className="gap-line-ai"
                pathLength={1}
                filter="url(#goldGlow)"
                d="M150,364 C300,348 430,318 570,252 C690,196 745,162 785,140"
              />
              {/* projection (dashed) */}
              <path className="gap-proj" d="M785,140 L935,84" />
              {/* traveling pulse */}
              <path
                className="gap-pulse"
                pathLength={1}
                d="M150,364 C300,348 430,318 570,252 C690,196 745,162 785,140"
              />

              {/* data points */}
              <circle className="gap-pt" cx="150" cy="364" r="3.5" />
              <circle className="gap-pt" cx="360" cy="322" r="3.5" />
              <circle className="gap-pt" cx="570" cy="252" r="3.5" />
              <circle className="gap-dot-pulse" cx="785" cy="140" r="8" />
              <circle className="gap-end-ring" cx="785" cy="140" r="11" />
              <circle className="gap-end-dot" cx="785" cy="140" r="6.5" />
              <circle className="gap-proj-dot" cx="935" cy="84" r="4" />

              {/* callouts */}
              <text x="768" y="116" textAnchor="end" className="gap-call gap-call-now">
                ≈ 1 in 5 today
              </text>
              <text x="930" y="68" textAnchor="end" className="gap-call gap-call-proj">
                and still climbing
              </text>
            </svg>

            <Reveal as="p" className="gap-source" d={2}>
              Source: U.S. Census Bureau, Business Trends &amp; Outlook Survey · 2023–2026
            </Reveal>
          </div>
        </div>
      </section>

      <section className="band-tight" style={{ border: 0, textAlign: 'center' }}>
        <div className="wrap">
          <Reveal as="p" className="lead" style={{ maxWidth: 600, margin: '0 auto', color: 'var(--text)' }}>
            Catching up is faster than you think. We build the system, you watch it work, and you're the one
            pulling ahead, not the one left behind.
          </Reveal>
        </div>
      </section>
    </>
  )
}
