import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

const examples = [
  {
    tag: 'Legal',
    title: 'Personal Injury Law Firm',
    problem: 'Their phones rang after hours. Every missed call was a potential case walking to a competitor.',
    solution: 'Built an AI system that catches every missed call, qualifies potential clients via text (accident type, injuries, timeline), and delivers scored leads to the attorney\u2019s inbox.',
    result: 'Projected 30\u201350 recovered leads per month that previously went to voicemail.',
  },
  {
    tag: 'Healthcare',
    title: 'Med Spa',
    problem: 'Front desk spent 3+ hours daily on phone tag \u2014 booking consultations, answering treatment questions, sending prep instructions.',
    solution: 'Built an AI intake system that handles inquiries 24/7, books based on treatment interest and availability, and sends personalized prep info automatically.',
    result: 'Front desk refocused on in-office experience. Booking conversion up across the board.',
  },
  {
    tag: 'Restaurant',
    title: 'Restaurant Group',
    problem: 'Managers guessed staffing levels based on gut feeling. Some nights overstaffed by 4 people, others understaffed.',
    solution: 'Built a demand forecasting system analyzing sales history, weather, local events, and seasonality to predict daily covers and recommend staffing.',
    result: '15% reduction in labor overspend in the first month.',
  },
  {
    tag: 'Property',
    title: 'Property Management Company',
    problem: 'Tenants called for every maintenance issue. Staff manually logged, categorized, and dispatched \u2014 often losing requests.',
    solution: 'Built an AI that receives maintenance requests via text, asks clarifying questions, categorizes urgency, creates work orders, and dispatches the right vendor.',
    result: 'Zero lost requests. Average resolution time cut by 40%.',
  },
  {
    tag: 'Finance',
    title: 'Mortgage Broker',
    problem: 'Broker spent hours per week on unqualified leads \u2014 people just browsing, not ready to move.',
    solution: 'Built AI lead qualification + automated onboarding. New inquiries get qualified (purchase vs refi, range, timeline, pre-approval) and receive a personalized document checklist.',
    result: 'Broker only talks to ready-to-move borrowers. Average call time cut in half.',
  },
]

const tagColors: Record<string, string> = {
  Legal: 'bg-blue-50 text-blue-700 border-blue-200',
  Healthcare: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Restaurant: 'bg-orange-50 text-orange-700 border-orange-200',
  Property: 'bg-purple-50 text-purple-700 border-purple-200',
  Finance: 'bg-amber-50 text-amber-700 border-amber-200',
}

export default function Examples() {
  return (
    <section id="examples" className="bg-bg py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="max-w-[720px]"
        >
          <h2 className="heading-lg text-text">What Custom AI Systems Look Like</h2>
          <p className="body-lg mt-4 text-text-secondary">
            Every business is different. Here's what we've built — to show you what's possible.
          </p>
        </motion.div>

        <div className="mt-14 space-y-6">
          {examples.map((ex, i) => (
            <motion.article
              key={ex.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.06, ease: 'easeOut' as const } },
              }}
              className="rounded-2xl border border-border bg-surface p-8 md:p-10"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
                {/* Left — tag + title + problem */}
                <div className="md:w-1/3">
                  <span className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${tagColors[ex.tag]}`}>
                    {ex.tag}
                  </span>
                  <h3 className="heading-md mt-3 text-text">{ex.title}</h3>
                  <p className="body-md mt-2 text-text-secondary italic">&ldquo;{ex.problem}&rdquo;</p>
                </div>

                {/* Right — solution + result */}
                <div className="md:flex-1">
                  <p className="body-md text-text-secondary">
                    <span className="font-semibold text-text">What we built:&ensp;</span>
                    {ex.solution}
                  </p>
                  <div className="mt-4 rounded-xl bg-accent-dim px-5 py-3">
                    <p className="text-sm font-semibold text-accent-hover">
                      Result:&ensp;
                      <span className="font-medium text-text">{ex.result}</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
