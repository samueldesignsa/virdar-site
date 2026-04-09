import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

export default function FinalCTA() {
  return (
    <section className="bg-surface py-20 md:py-28 lg:py-32 border-t border-border">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
        className="mx-auto max-w-[800px] px-6 text-center"
      >
        <h2 className="heading-lg text-text">
          Ready to See What AI Can Do for Your Business?
        </h2>
        <p className="body-lg mx-auto mt-5 max-w-[600px] text-text-secondary">
          The strategy call is complimentary. The roadmap is yours to keep. And you don't pay for anything until you've seen it work.
        </p>
        <div className="mt-10">
          <a
            href="https://calendly.com/virdar-info/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-xl bg-accent px-10 py-4 text-base font-semibold text-bg no-underline transition-colors hover:bg-accent-hover"
          >
            Book Your Complimentary Strategy Call&ensp;&rarr;
          </a>
        </div>
        <p className="mt-5 text-sm text-text-tertiary">
          30 minutes. No pressure. No jargon.
        </p>
      </motion.div>
    </section>
  )
}
