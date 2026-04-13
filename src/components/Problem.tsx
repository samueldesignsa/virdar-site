import { motion } from 'framer-motion'
import { PhoneOff, Clock, TrendingUp } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
}

const cards = [
  {
    icon: PhoneOff,
    title: 'Missed Calls = Missed Revenue',
    body: '62% of calls to small businesses go unanswered. For a law firm, that\u2019s a case. For a med spa, that\u2019s a $500 consultation. For a restaurant, that\u2019s a catering inquiry. Every missed call is revenue walking straight to a competitor who picks up. An AI automation system responds in seconds, qualifies the caller, and captures the lead. 24/7, including nights and weekends.',
    source: 'Forbes, 2024',
  },
  {
    icon: Clock,
    title: 'Manual Work Eats Your Margins',
    body: 'The average SMB spends 15\u201330 hours per week on tasks AI handles in minutes: scheduling appointments, entering invoice data, following up with leads, generating reports, responding to routine inquiries. That\u2019s $40K\u2013$80K a year in labor costs going to work that doesn\u2019t require human judgment. Custom automation reclaims those hours for the work that actually grows your business.',
    source: 'McKinsey Global Institute',
  },
  {
    icon: TrendingUp,
    title: 'Your Competitors Are Already Moving',
    body: '57% of US small businesses now invest in AI automation. The early adopters are already seeing results: faster response times, lower operational costs, better lead conversion. The gap between businesses that automate and those that don\u2019t will only widen as AI tools become more capable. The question isn\u2019t whether to start. It\u2019s whether you\u2019ll be ahead or behind when your industry fully shifts.',
    source: 'U.S. Chamber of Commerce, 2024',
  },
]

export default function Problem() {
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
          <h2 className="heading-lg text-text">The businesses that automate first, win</h2>
          <p className="body-lg mt-4 text-text-secondary">
            Every day your team spends on manual tasks (answering phones, chasing leads, managing schedules, entering data) is a day your competitors are automating it.
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
              <div className="mb-5 flex h-3 w-8 rounded-full bg-accent/20">
                <div className="h-full w-full rounded-full bg-accent/40" />
              </div>
              <div className="mb-4 text-accent">
                <card.icon size={24} aria-hidden="true" />
              </div>
              <h3 className="heading-md text-text">{card.title}</h3>
              <p className="body-md mt-3 text-text-secondary">{card.body}</p>
              <p className="mt-3 text-xs text-text-tertiary">{card.source}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
