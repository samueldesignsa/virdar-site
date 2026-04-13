import { motion } from 'framer-motion'
import { Shield, Target, Zap } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
}

const pillars = [
  {
    icon: Target,
    title: 'Operations First, Technology Second',
    body: 'Most AI projects fail because they start with the technology and look for a problem to solve. We start with your operations. We map how your business actually runs: where time gets wasted, where leads get lost, where manual work creates bottlenecks. Only then do we decide what to build. If AI isn\u2019t the right answer for a particular workflow, we\u2019ll tell you.',
  },
  {
    icon: Shield,
    title: 'You See It Working Before You Pay',
    body: 'We don\u2019t ask for trust upfront. We earn it by building first and billing second. Every system we create gets a live demonstration with your real workflows before any payment changes hands. If it doesn\u2019t deliver measurable value (hours saved, leads captured, errors eliminated), you don\u2019t pay. That\u2019s the deal.',
  },
  {
    icon: Zap,
    title: 'Built for Your Business, Not Everyone\u2019s',
    body: 'Off-the-shelf AI tools are designed for the average business. The problem is, no business is average. The way a Dallas law firm handles intake is different from how a med spa books consultations, which is different from how a property manager dispatches vendors. We build systems around your specific workflows, your existing tools, and your team. Not a one-size-fits-all template.',
  },
]

export default function WhyVirdar() {
  return (
    <section className="bg-bg py-20 md:py-28 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="max-w-[720px]"
        >
          <h2 className="heading-lg text-text">Why Businesses Choose Virdar</h2>
          <p className="body-lg mt-4 text-text-secondary">
            We\u2019re not a general-purpose AI agency. We\u2019re a specialist practice focused on one thing: building custom AI automation systems that handle the operational work your team shouldn\u2019t be doing manually. Based in Dallas, serving operations-heavy businesses across the DFW metroplex and beyond.
          </p>
        </motion.div>

        <div className="mt-14 space-y-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.08, ease: 'easeOut' as const } },
              }}
              className="flex gap-6 md:gap-8 items-start"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-dim mt-1">
                <pillar.icon size={24} className="text-accent" aria-hidden="true" />
              </div>
              <div>
                <h3 className="heading-md text-text">{pillar.title}</h3>
                <p className="body-md mt-2 text-text-secondary">{pillar.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
