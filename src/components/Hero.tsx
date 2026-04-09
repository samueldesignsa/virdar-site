import { motion } from 'framer-motion'
import { SplineScene } from './ui/SplineScene'
import { Spotlight } from './ui/Spotlight'

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
      className="relative min-h-screen bg-bg"
    >
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#C9A96E"
      />

      <div className="relative z-10 mx-auto flex h-screen max-w-[1400px] flex-col md:flex-row items-center px-6">
        {/* Left — Copy */}
        <div className="flex-1 flex flex-col justify-center pt-24 md:pt-0 md:pr-8">
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fade}
            className="mb-6 text-xs font-semibold uppercase tracking-[0.15em] text-accent"
          >
            AI Systems for Operations-Heavy Businesses
          </motion.p>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fade}
            className="heading-xl max-w-[600px] text-text"
          >
            We build custom AI systems that make your business run itself
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fade}
            className="body-lg mt-6 max-w-[500px] text-text-secondary"
          >
            Your competitors will adopt AI. The ones who do it first — and do it right — will win. We make sure that's you.
          </motion.p>

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
              className="inline-flex items-center rounded-xl bg-accent px-8 py-4 text-base font-semibold text-bg no-underline transition-colors hover:bg-accent-hover"
            >
              Book a Complimentary Strategy Call&ensp;&rarr;
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center rounded-xl border border-border px-8 py-4 text-base font-medium text-text-secondary no-underline transition-colors hover:border-border-hover hover:text-text"
            >
              See How It Works&ensp;&darr;
            </a>
          </motion.div>

          <motion.p
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fade}
            className="mt-8 text-sm text-text-tertiary"
          >
            Serving operations-heavy businesses in Dallas, TX
          </motion.p>
        </div>

        {/* Right — 3D Scene */}
        <div className="flex-1 relative h-[400px] md:h-full w-full md:-mr-24">
          <div className="absolute inset-0 md:-right-32 md:-top-12 md:-bottom-12">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
          {/* Bottom fade — masks the leg cutoff */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-bg via-bg/80 to-transparent z-10" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
