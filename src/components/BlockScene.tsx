import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const FRAMES = [
  { id: 'block-1', src: '/scene/block-1-alive.jpg' },
  { id: 'block-2', src: '/scene/block-2-tide.jpg' },
  { id: 'block-3', src: '/scene/block-3-dark.jpg' },
  { id: 'block-4', src: '/scene/block-4-lit.jpg' },
]

/**
 * Signature scroll scene: a pinned 16:9 frame whose four keyframes cross-dissolve
 * via a diagonal mask sweep as a dark "tide" rolls across the block and one
 * building lights up gold. All visual states are pure --p-driven CSS (ported from
 * the prototype); GSAP only maps scroll progress to --p on the scene root.
 * Reduced-motion users get the final hopeful frame statically (handled in CSS).
 */
export default function BlockScene() {
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
    <section className="block-scene" ref={sceneRef} aria-label="Don't get left behind">
      <div className="block-pin">
        <div className="block-frame">
          {FRAMES.map((f) => (
            <img key={f.id} id={f.id} className="bk-img" src={f.src} alt="" aria-hidden="true" />
          ))}
          <div className="bk-bloom" aria-hidden="true" />
          <div className="bk-vignette" aria-hidden="true" />
        </div>

        <div className="block-copy block-early">
          <p className="eyebrow">The shift</p>
          <h2 className="h-lg" style={{ marginTop: 12 }}>
            One by one, the lights go out.
          </h2>
        </div>

        <div className="block-copy block-late">
          <p className="eyebrow">Don't get left behind</p>
          <h2 className="h-lg" style={{ marginTop: 12 }}>
            Be the one still lit.
          </h2>
          <p className="lead" style={{ margin: '14px auto 0', maxWidth: 520 }}>
            The businesses that move on AI pull ahead. The ones that wait quietly go dark. We make sure
            yours is the one still standing.
          </p>
        </div>
      </div>
    </section>
  )
}
