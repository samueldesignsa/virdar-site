import { motion } from 'framer-motion'

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' as const },
  }),
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex items-center bg-bg-dark grid-pattern overflow-hidden"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-28 md:py-36 lg:py-40">
        {/* Eyebrow */}
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fade}
          className="mb-6 text-sm font-semibold uppercase tracking-wider text-accent"
        >
          AI Systems for Operations-Heavy Businesses
        </motion.p>

        {/* Headline */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fade}
          className="heading-xl max-w-[800px] text-text-light"
        >
          We build custom AI systems that make your business run itself
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fade}
          className="body-lg mt-6 max-w-[600px] text-text-light-secondary"
        >
          Your competitors will adopt AI. The ones who do it first — and do it right — will win. We make sure that's you.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fade}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="https://calendly.com/virdar-info/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-xl bg-accent px-8 py-4 text-base font-semibold text-white no-underline transition-colors hover:bg-accent-hover"
          >
            Book a Complimentary Strategy Call&ensp;&rarr;
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center rounded-xl border border-border-dark px-8 py-4 text-base font-medium text-text-light-secondary no-underline transition-colors hover:border-text-light-secondary hover:text-text-light"
          >
            See How It Works&ensp;&darr;
          </a>
        </motion.div>

        {/* Micro-proof */}
        <motion.p
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fade}
          className="mt-8 text-sm text-text-light-secondary/60"
        >
          Serving operations-heavy businesses in Dallas, TX
        </motion.p>
      </div>
    </section>
  )
}
