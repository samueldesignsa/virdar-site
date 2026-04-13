import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const stats = [
  { value: 62, suffix: '%', label: 'of calls to small businesses go unanswered', source: 'Forbes, 2024' },
  { value: 15, prefix: '', suffix: '\u201330 hrs', label: 'per week spent on repetitive tasks', source: 'McKinsey Global Institute' },
  { value: 57, suffix: '%', label: 'of US small businesses now invest in AI', source: 'U.S. Chamber of Commerce, 2024' },
  { value: 10, suffix: ' sec', label: 'average AI response time vs hours for manual follow-up', source: 'Harvard Business Review' },
]

function useCountUp(target: number, isVisible: boolean, duration = 1.8) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    let start = 0
    const startTime = performance.now()

    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      const eased = 1 - (1 - progress) * (1 - progress)
      const current = Math.round(eased * target)
      setCount(current)
      if (progress < 1) {
        start = requestAnimationFrame(tick)
      }
    }

    start = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(start)
  }, [isVisible, target, duration])

  return count
}

function StatItem({ stat, isVisible }: { stat: typeof stats[0]; isVisible: boolean }) {
  const count = useCountUp(stat.value, isVisible)
  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <div className="text-center">
      <p className="font-heading text-4xl md:text-5xl text-accent">
        {stat.prefix}
        {prefersReducedMotion ? stat.value : count}
        {stat.suffix}
      </p>
      <p className="mt-2 text-sm text-text-secondary max-w-[200px] mx-auto">
        {stat.label}
      </p>
      <p className="mt-1 text-xs text-text-tertiary">
        {stat.source}
      </p>
    </div>
  )
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bg-surface py-16 md:py-20 border-t border-b border-border">
      <h2 className="sr-only">Why Businesses Are Adopting AI Automation</h2>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-[1200px] px-6 grid grid-cols-2 gap-10 md:grid-cols-4"
      >
        {stats.map((stat) => (
          <StatItem key={stat.label} stat={stat} isVisible={isVisible} />
        ))}
      </motion.div>
    </section>
  )
}
