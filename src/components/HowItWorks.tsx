import { motion } from 'framer-motion'
import { Search, Wrench, BarChart3 } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

const steps = [
  {
    num: '01',
    icon: Search,
    title: 'Discover',
    body: 'We start with a complimentary strategy call. We learn your business, map your operations, and identify the top 3\u20135 places where AI creates real leverage. You walk away with a custom AI roadmap \u2014 whether you hire us or not.',
  },
  {
    num: '02',
    icon: Wrench,
    title: 'Build',
    body: 'We design and build custom AI systems around your specific workflows. Not templates \u2014 systems built for how your business actually works, integrated with your existing tools. You don\u2019t pay until you see it working.',
  },
  {
    num: '03',
    icon: BarChart3,
    title: 'Optimize',
    body: 'AI systems get smarter over time \u2014 but only if someone is tuning them. We monitor performance, optimize based on real data, and expand capabilities. Monthly ROI reports show exactly what you\u2019re getting.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-bg py-20 md:py-28 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="text-center"
        >
          <h2 className="heading-lg text-text">How Virdar Works</h2>
          <p className="body-lg mx-auto mt-4 max-w-[560px] text-text-secondary">
            See it before you pay for it. We take the risk, not you.
          </p>
        </motion.div>

        <div className="relative mt-16 grid gap-8 md:grid-cols-3">
          <div className="absolute top-[60px] left-[16.67%] right-[16.67%] hidden h-px bg-border md:block" aria-hidden="true" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.12, ease: 'easeOut' as const } },
              }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 mb-6 flex h-[120px] w-[120px] flex-col items-center justify-center rounded-full border border-border bg-surface">
                <step.icon size={28} className="text-accent" aria-hidden="true" />
                <span className="mt-1.5 text-xs font-semibold uppercase tracking-widest text-text-secondary">{step.num}</span>
              </div>

              <h3 className="heading-md text-text">{step.title}</h3>
              <p className="body-md mt-3 max-w-[360px] text-text-secondary">{step.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fadeUp}
          className="mt-16 text-center text-base font-medium text-text-secondary"
        >
          No jargon. No contracts. No paying for something you haven't seen work.
        </motion.p>
      </div>
    </section>
  )
}
