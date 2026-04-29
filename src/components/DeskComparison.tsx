import { motion } from 'framer-motion'
import { ImageComparison } from './ui/image-comparison-slider'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export default function DeskComparison() {
  return (
    <section className="bg-bg py-20 md:py-28 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="mx-auto max-w-[720px] text-center"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
            Before Virdar / After Virdar
          </p>
          <h2 className="heading-lg text-text">Nights back. Weekends back. Focus back.</h2>
          <p className="body-lg mt-4 text-text-secondary">
            Stop running your business on chaos. We build AI systems that handle the busywork — so you do the work only you can do.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="mt-12 md:mt-16"
        >
          <ImageComparison
            beforeImage="/desk-before.jpg"
            afterImage="/desk-after.jpg"
            altBefore="Cluttered desk at night — piles of receipts, sticky notes across the monitor, multiple coffee cups, handwritten notebook full of scribbles"
            altAfter="Clean organized desk in daylight — single laptop showing a dashboard, one coffee cup, succulent plant, neat leather notebook"
            beforeLabel="Before"
            afterLabel="After"
            className="mx-auto aspect-[4/3] max-w-[1100px] md:aspect-[16/9]"
          />
          <p className="mt-6 text-center text-sm text-text-tertiary">
            Drag the slider to compare →
          </p>
        </motion.div>
      </div>
    </section>
  )
}
