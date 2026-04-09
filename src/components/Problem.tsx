import { motion } from 'framer-motion'
import { PhoneOff, Clock, TrendingUp } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

const cards = [
  {
    icon: PhoneOff,
    title: 'Missed Calls = Missed Revenue',
    body: '62% of calls to small businesses go unanswered. Each one is $200\u2013$2,000 in lost revenue. Your competitor with an AI system? They respond in 10 seconds, 24/7.',
  },
  {
    icon: Clock,
    title: 'Manual Work Eats Your Margins',
    body: 'The average SMB wastes 15\u201330 hours per week on tasks AI handles in minutes \u2014 scheduling, data entry, follow-ups, reporting. That\u2019s $40K\u2013$80K a year in labor on work that doesn\u2019t need a human.',
  },
  {
    icon: TrendingUp,
    title: 'Your Competitors Are Already Moving',
    body: '57% of US small businesses now invest in AI. The gap between businesses that adopt and those that don\u2019t will only widen. The question isn\u2019t whether to start \u2014 it\u2019s whether you\u2019ll be ahead or behind.',
  },
]

export default function Problem() {
  return (
    <section className="bg-bg py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="max-w-[720px]"
        >
          <h2 className="heading-lg text-text">The businesses that move first, win</h2>
          <p className="body-lg mt-4 text-text-secondary">
            Every day your team spends on manual tasks — answering phones, chasing leads, managing schedules, entering data — is a day your competitors are automating it.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const } },
              }}
              className="rounded-2xl border border-border bg-surface p-8"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-dim">
                <card.icon size={24} className="text-accent" aria-hidden="true" />
              </div>
              <h3 className="heading-md text-text">{card.title}</h3>
              <p className="body-md mt-3 text-text-secondary">{card.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
