import { useEffect, useRef } from 'react'

/**
 * Tracks the pointer over an element and exposes its position as the CSS
 * variables --mx / --my (percentages), which the gold glow gradients read.
 * No-ops under prefers-reduced-motion.
 */
export function useCursorGlow<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const onMove = (ev: PointerEvent) => {
      const b = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${((ev.clientX - b.left) / b.width) * 100}%`)
      el.style.setProperty('--my', `${((ev.clientY - b.top) / b.height) * 100}%`)
    }
    el.addEventListener('pointermove', onMove)
    return () => el.removeEventListener('pointermove', onMove)
  }, [])

  return ref
}
