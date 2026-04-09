import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

export default function About() {
  return (
    <section id="about" className="bg-bg py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <h2 className="heading-lg text-text max-w-[720px]">
            Built by an Engineer Who Understands Operations
          </h2>
        </motion.div>

        <div className="mt-12 flex flex-col gap-12 md:flex-row md:items-start md:gap-16">
          {/* Photo placeholder */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            className="flex-shrink-0"
          >
            <div
              className="flex h-[320px] w-[280px] items-center justify-center rounded-2xl border border-border bg-surface text-text-secondary text-sm"
              role="img"
              aria-label="Photo of Beverly, founder of Virdar"
            >
              Photo
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            className="max-w-[600px]"
          >
            <div className="space-y-5 body-md text-text-secondary">
              <p>
                I'm Beverly — the person behind Virdar. I've spent years building operational software for businesses that run on tight margins and thin teams. I've seen firsthand how much time gets lost to manual work that doesn't need a human.
              </p>
              <p>
                Virdar exists because I believe every business — not just the ones with tech departments — deserves AI that actually works for them. Not chatbots. Not dashboards. Real systems that handle the work your team shouldn't be doing manually.
              </p>
              <p>
                When I take on a project, I learn your business first. Then I build. If it doesn't deliver clear value, you don't pay. That's the deal.
              </p>
            </div>

            <a
              href="https://calendly.com/virdar-info/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center rounded-xl border border-border px-6 py-3 text-sm font-semibold text-text no-underline transition-colors hover:border-accent hover:text-accent"
            >
              Book a Strategy Call&ensp;&rarr;
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
