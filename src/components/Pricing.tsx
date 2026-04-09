import { motion } from 'framer-motion'
import { Compass, Code2, LineChart, Check } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

const tiers = [
  {
    name: 'Discover',
    price: 'Complimentary',
    icon: Compass,
    features: [
      '30-minute strategy call',
      'Operations audit',
      'Custom AI roadmap with projected ROI',
      'Yours to keep \u2014 whether you hire us or not',
    ],
    cta: 'Book Your Free Strategy Call',
    ctaHref: 'https://calendly.com/virdar-info/30min',
    highlight: false,
  },
  {
    name: 'Build',
    price: '$5,000 \u2013 $50,000+',
    icon: Code2,
    features: [
      'Custom AI systems built for your operations',
      'Integrated with your existing tools',
      'Live demo before any payment',
      'You don\u2019t pay until you see it working',
    ],
    note: 'Projects over $15K may require a refundable deposit',
    cta: 'Book a Strategy Call',
    ctaHref: 'https://calendly.com/virdar-info/30min',
    highlight: true,
  },
  {
    name: 'Optimize',
    price: '$1,000 \u2013 $3,000/mo',
    icon: LineChart,
    features: [
      'Ongoing monitoring and tuning',
      'New workflow expansion',
      'Monthly ROI reports',
      'Priority support',
      'Cancel anytime \u2014 no contracts',
    ],
    cta: 'Book a Strategy Call',
    ctaHref: 'https://calendly.com/virdar-info/30min',
    highlight: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="bg-bg py-20 md:py-28 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="text-center"
        >
          <h2 className="heading-lg text-text">See It Before You Pay For It</h2>
          <p className="body-lg mx-auto mt-4 max-w-[600px] text-text-secondary">
            We take the risk. You don't pay until you see the finished system running — and decide it's right for you.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const } },
              }}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                tier.highlight
                  ? 'border-accent/40 bg-surface'
                  : 'border-border bg-surface'
              }`}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-8 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-bg">
                  Most Popular
                </span>
              )}

              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent-dim">
                <tier.icon size={22} className="text-accent" aria-hidden="true" />
              </div>

              <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">{tier.name}</h3>
              <p className="mt-2 font-heading text-2xl text-text">{tier.price}</p>

              <ul className="mt-6 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-text-secondary">
                    <Check size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>

              {tier.note && (
                <p className="mt-4 text-xs text-text-tertiary italic">{tier.note}</p>
              )}

              <a
                href={tier.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 block rounded-xl py-3 text-center text-sm font-semibold no-underline transition-colors ${
                  tier.highlight
                    ? 'bg-accent text-bg hover:bg-accent-hover'
                    : 'border border-border text-text hover:border-accent hover:text-accent'
                }`}
              >
                {tier.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fadeUp}
          className="mt-12 text-center text-sm text-text-secondary"
        >
          Every business is different. These ranges reflect typical engagements. Your strategy call will give you an exact scope and number.
        </motion.p>
      </div>
    </section>
  )
}
